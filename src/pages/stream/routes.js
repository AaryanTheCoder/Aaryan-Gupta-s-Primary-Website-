const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');
const { isPathInside, requireBasicAuth } = require('../../shared/routeHelpers');

const PUBLIC_DIR = path.join(__dirname, 'public');
const STREAM_PASSWORD = process.env.STORAGE_PASSWORD;
const IS_MANAGED_PRODUCTION = Boolean(process.env.WEBSITE_SITE_NAME || process.env.NODE_ENV === 'production');
const MAX_FRAME_BYTES = 1024 * 1024;
const MAX_VIEWER_BUFFER_BYTES = 2 * 1024 * 1024;
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8'
};

// Frames are never saved. A received frame is immediately sent to connected
// viewers and then becomes eligible for garbage collection.
let broadcaster = null;
const viewers = new Set();
const wss = new WebSocket.Server({ noServer: true, maxPayload: MAX_FRAME_BYTES, perMessageDeflate: false });

function sendText(res, statusCode, text) {
  res.writeHead(statusCode, {
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': 'no-store'
  });
  res.end(text);
}

function requireStreamAuth(req, res) {
  if (STREAM_PASSWORD) {
    return requireBasicAuth(req, res, STREAM_PASSWORD, 'Private Stream', 'Private Stream password required');
  }

  if (!IS_MANAGED_PRODUCTION) return true;

  sendText(res, 503, 'Set STORAGE_PASSWORD before using Private Stream.');
  return false;
}

function servePublicFile(req, res, pathname) {
  const relativePath = pathname === '/stream' || pathname === '/stream/'
    ? 'index.html'
    : pathname.replace(/^\/stream\/?/, '');
  const filePath = path.resolve(PUBLIC_DIR, relativePath);

  if (!isPathInside(PUBLIC_DIR, filePath)) {
    sendText(res, 403, 'Forbidden');
    return;
  }

  const extension = path.extname(filePath).toLowerCase();
  if (!MIME_TYPES[extension] || !fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    sendText(res, 404, 'Stream file not found');
    return;
  }

  res.writeHead(200, {
    'Content-Type': MIME_TYPES[extension],
    'Cache-Control': extension === '.html' ? 'no-store' : 'public, max-age=3600'
  });
  res.end(req.method === 'HEAD' ? undefined : fs.readFileSync(filePath));
}

function handle(req, res) {
  const pathname = new URL(req.url, 'http://localhost').pathname;
  if (!requireStreamAuth(req, res)) return;

  if (pathname.startsWith('/stream/api/')) {
    sendText(res, 404, 'Stream API route not found');
    return;
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    sendText(res, 405, 'Method not allowed');
    return;
  }

  servePublicFile(req, res, pathname);
}

function sendJson(ws, payload) {
  if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify(payload));
}

function broadcastStatus(payload) {
  for (const viewer of viewers) sendJson(viewer, payload);
  if (broadcaster) sendJson(broadcaster, payload);
}

function viewerCount() {
  return viewers.size - (broadcaster && viewers.has(broadcaster) ? 1 : 0);
}

function publishViewerCount() {
  broadcastStatus({ type: 'viewerCount', count: viewerCount() });
}

function stopBroadcaster(ws) {
  if (broadcaster !== ws) return;
  broadcaster = null;
  broadcastStatus({ type: 'broadcastEnded' });
}

wss.on('connection', ws => {
  viewers.add(ws);
  sendJson(ws, { type: 'ready', broadcasting: Boolean(broadcaster), viewerCount: viewerCount() });
  publishViewerCount();

  ws.on('message', (data, isBinary) => {
    if (!isBinary) {
      let message;
      try {
        message = JSON.parse(data.toString());
      } catch {
        sendJson(ws, { type: 'error', error: 'Invalid stream command.' });
        return;
      }

      if (message.type === 'startBroadcast') {
        if (broadcaster && broadcaster !== ws) {
          sendJson(ws, { type: 'error', error: 'Another device is already broadcasting.' });
          return;
        }
        broadcaster = ws;
        sendJson(ws, { type: 'broadcasterClaimed' });
        broadcastStatus({ type: 'broadcastStarted' });
        publishViewerCount();
        return;
      }

      if (message.type === 'stopBroadcast') {
        stopBroadcaster(ws);
        publishViewerCount();
        return;
      }

      return;
    }

    if (ws !== broadcaster) return;
    if (data.length > MAX_FRAME_BYTES) {
      sendJson(ws, { type: 'error', error: 'Frame is too large.' });
      return;
    }

    // Slow viewers skip old frames instead of making the server keep a queue.
    for (const viewer of viewers) {
      if (viewer !== ws && viewer.readyState === WebSocket.OPEN && viewer.bufferedAmount < MAX_VIEWER_BUFFER_BYTES) {
        viewer.send(data, { binary: true, compress: false });
      }
    }
  });

  ws.on('close', () => {
    viewers.delete(ws);
    stopBroadcaster(ws);
    publishViewerCount();
  });

  ws.on('error', () => {});
});

function rejectUpgrade(socket) {
  socket.write('HTTP/1.1 401 Unauthorized\r\nWWW-Authenticate: Basic realm="Private Stream"\r\nConnection: close\r\n\r\n');
  socket.destroy();
}

function isUpgradeAuthenticated(req) {
  if (!STREAM_PASSWORD) return !IS_MANAGED_PRODUCTION;
  const auth = req.headers.authorization || '';
  if (!auth.startsWith('Basic ')) return false;
  const credentials = Buffer.from(auth.slice(6), 'base64').toString();
  const colonIndex = credentials.indexOf(':');
  const suppliedPassword = colonIndex >= 0 ? credentials.slice(colonIndex + 1) : '';
  const supplied = Buffer.from(suppliedPassword);
  const expected = Buffer.from(STREAM_PASSWORD);
  return supplied.length === expected.length && require('crypto').timingSafeEqual(supplied, expected);
}

function handleUpgrade(req, socket, head) {
  const pathname = new URL(req.url, 'http://localhost').pathname;
  if (pathname !== '/stream/ws') return false;

  if (!isUpgradeAuthenticated(req)) {
    rejectUpgrade(socket);
    return true;
  }

  wss.handleUpgrade(req, socket, head, ws => {
    wss.emit('connection', ws, req);
  });
  return true;
}

module.exports = { handle, handleUpgrade };
