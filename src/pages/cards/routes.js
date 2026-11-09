const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');
const { GameHub } = require('./rooms');

const PUBLIC_DIR = path.join(__dirname, 'public');
const FILES = {
  'index.html': 'text/html; charset=utf-8',
  'style.css': 'text/css; charset=utf-8',
  'app.js': 'application/javascript; charset=utf-8',
  'media.js': 'application/javascript; charset=utf-8'
};
const hub = new GameHub();
const wss = new WebSocket.Server({ noServer: true, maxPayload: 65536, perMessageDeflate: false });

function handle(req, res) {
  // Override only this page's policy. Other pages keep their existing policy.
  res.setHeader('Permissions-Policy', 'camera=(self), microphone=(self), geolocation=()');
  res.setHeader('Cache-Control', 'no-store');
  // Spell out the same-host socket sources for browsers that do not map
  // connect-src 'self' to WebSockets. Only hostname characters may enter CSP.
  const host = req.headers?.host || '';
  const socketSources =
    host.length <= 255 && /^[a-z0-9.:[\]-]+$/i.test(host) ? ` ws://${host} wss://${host}` : '';
  res.setHeader(
    'Content-Security-Policy',
    `default-src 'self'; script-src 'self'; style-src 'self'; connect-src 'self'${socketSources}; img-src 'self' data:; media-src 'self' blob:; object-src 'none'; base-uri 'none'; frame-ancestors 'self'`
  );
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' });
    res.end('Method not allowed');
    return;
  }
  const pathname = req.url.split('?')[0];
  const file =
    pathname === '/cards' || pathname === '/cards/'
      ? 'index.html'
      : pathname.slice('/cards/'.length);
  if (!Object.hasOwn(FILES, file)) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Cards file not found');
    return;
  }
  res.writeHead(200, { 'Content-Type': FILES[file] });
  res.end(req.method === 'HEAD' ? undefined : fs.readFileSync(path.join(PUBLIC_DIR, file)));
}

function handleUpgrade(req, socket, head) {
  if (req.url.split('?')[0] !== '/cards/ws') return false;
  let validOrigin = false;
  try {
    const origin = new URL(req.headers.origin);
    validOrigin = ['http:', 'https:'].includes(origin.protocol) && origin.host === req.headers.host;
  } catch {}
  if (!validOrigin) {
    socket.write('HTTP/1.1 403 Forbidden\r\nConnection: close\r\n\r\n');
    socket.destroy();
    return true;
  }
  wss.handleUpgrade(req, socket, head, (ws) => wss.emit('connection', ws));
  return true;
}

wss.on('connection', (ws) => {
  const peer = hub.connect(
    (message) => {
      if (ws.readyState !== WebSocket.OPEN) return;
      if (ws.bufferedAmount > 1024 * 1024) {
        ws.close(1008, 'Connection too slow');
        return;
      }
      ws.send(JSON.stringify(message));
    },
    () => ws.close(1000, 'Session moved')
  );
  ws.alive = true;
  ws.on('pong', () => {
    ws.alive = true;
  });
  let windowStart = Date.now();
  let count = 0;
  ws.on('message', (data, binary) => {
    if (Date.now() - windowStart >= 10000) {
      windowStart = Date.now();
      count = 0;
    }
    if (++count > 250 || binary) {
      ws.close(1008, 'Invalid or excessive messages');
      return;
    }
    try {
      hub.receive(peer, JSON.parse(data.toString()));
    } catch {
      peer.send({ type: 'error', error: 'Invalid JSON command.' });
    }
  });
  ws.on('close', () => hub.disconnect(peer));
  ws.on('error', () => {});
  ws.peer = peer;
});

setInterval(() => hub.tick(), 250).unref();
setInterval(() => {
  for (const ws of wss.clients) {
    if (!ws.alive || (!ws.peer.sessionId && Date.now() - ws.peer.joinedAt > 120000)) ws.terminate();
    else {
      ws.alive = false;
      ws.ping();
    }
  }
}, 30000).unref();

module.exports = { handle, handleUpgrade };
