const fs = require('fs');
const path = require('path');
const {
  isPathInside,
  readJsonBody,
  requireBasicAuth,
  sendJson
} = require('../../shared/routeHelpers');

const PUBLIC_DIR = path.join(__dirname, 'public');
const STORAGE_PASSWORD = process.env.STORAGE_PASSWORD;
const DEFAULT_DATA_PATH = process.env.WEBSITE_SITE_NAME && process.env.HOME
  ? path.join(process.env.HOME, 'data', 'game-theory-data.json')
  : path.join(__dirname, 'data', 'game-theory-data.json');
const GAME_THEORY_DATA_PATH = process.env.GAME_THEORY_DATA_PATH
  ? path.resolve(process.env.GAME_THEORY_DATA_PATH)
  : DEFAULT_DATA_PATH;
const MAX_CONTENT_BYTES = 6 * 1024 * 1024;
const MAX_SECTIONS = 160;
const MAX_SECTION_BYTES = 750 * 1024;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp'
};

function sendText(res, statusCode, text) {
  res.writeHead(statusCode, {
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': 'no-store'
  });
  res.end(text);
}

function readContent() {
  try {
    const parsed = JSON.parse(fs.readFileSync(GAME_THEORY_DATA_PATH, 'utf8'));
    if (parsed && parsed.sections && typeof parsed.sections === 'object' && !Array.isArray(parsed.sections)) {
      return {
        version: 1,
        updatedAt: parsed.updatedAt || null,
        sections: parsed.sections
      };
    }
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.error('Failed to read Game Theory content:', error);
    }
  }

  return { version: 1, updatedAt: null, sections: {} };
}

function normalizeContent(payload) {
  if (!payload || !payload.sections || typeof payload.sections !== 'object' || Array.isArray(payload.sections)) {
    return null;
  }

  const entries = Object.entries(payload.sections);
  if (entries.length > MAX_SECTIONS) return null;

  const sections = {};
  let totalBytes = 0;
  for (const [key, html] of entries) {
    if (!/^section-\d{1,3}$/.test(key) || typeof html !== 'string') return null;
    const bytes = Buffer.byteLength(html);
    if (bytes > MAX_SECTION_BYTES) return null;
    totalBytes += bytes;
    if (totalBytes > MAX_CONTENT_BYTES) return null;
    sections[key] = html;
  }

  return {
    version: 1,
    updatedAt: new Date().toISOString(),
    sections
  };
}

function writeContent(payload) {
  fs.mkdirSync(path.dirname(GAME_THEORY_DATA_PATH), { recursive: true });
  const temporaryPath = `${GAME_THEORY_DATA_PATH}.${process.pid}.${Date.now()}.tmp`;
  fs.writeFileSync(temporaryPath, JSON.stringify(payload, null, 2));
  fs.renameSync(temporaryPath, GAME_THEORY_DATA_PATH);
}

function handle(req, res) {
  const pathname = new URL(req.url, 'http://localhost').pathname;

  if (pathname === '/game-theory/api/content' && req.method === 'GET') {
    sendJson(res, 200, readContent());
    return;
  }

  if (pathname === '/game-theory/api/admin/verify' && req.method === 'POST') {
    if (!requireBasicAuth(req, res, STORAGE_PASSWORD, 'Game Theory Admin', 'Game Theory admin password required')) return;
    sendJson(res, 200, { ok: true });
    return;
  }

  if (pathname === '/game-theory/api/content' && req.method === 'PUT') {
    if (!requireBasicAuth(req, res, STORAGE_PASSWORD, 'Game Theory Admin', 'Game Theory admin password required')) return;
    readJsonBody(req, { maxBytes: MAX_CONTENT_BYTES + 256 * 1024 }).then(body => {
      const normalized = normalizeContent(body);
      if (!normalized) {
        sendJson(res, 400, { ok: false, error: 'Invalid or oversized Game Theory content' });
        return;
      }

      try {
        writeContent(normalized);
        sendJson(res, 200, { ok: true, updatedAt: normalized.updatedAt });
      } catch (error) {
        console.error('Failed to save Game Theory content:', error);
        sendJson(res, 500, { ok: false, error: 'Game Theory content could not be saved' });
      }
    }).catch(error => {
      sendJson(res, error.statusCode || 400, { ok: false, error: error.message || 'Invalid request body' });
    });
    return;
  }

  if (pathname.startsWith('/game-theory/api/')) {
    sendJson(res, 404, { ok: false, error: 'Game Theory API route not found' });
    return;
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    sendText(res, 405, 'Method not allowed');
    return;
  }

  const relativePath = pathname === '/game-theory' || pathname === '/game-theory/'
    ? 'index.html'
    : pathname.replace(/^\/game-theory\/?/, '');
  const filePath = path.resolve(PUBLIC_DIR, relativePath);

  if (!isPathInside(PUBLIC_DIR, filePath)) {
    sendText(res, 403, 'Forbidden');
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      sendText(res, 404, 'Game Theory file not found');
      return;
    }

    const extension = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[extension] || 'application/octet-stream';
    const cacheControl = ['.html', '.css', '.js'].includes(extension)
      ? 'no-store'
      : 'public, max-age=86400';
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': cacheControl
    });
    res.end(req.method === 'HEAD' ? undefined : data);
  });
}

module.exports = { handle };
