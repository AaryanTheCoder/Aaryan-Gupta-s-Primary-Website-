const fs = require('fs');
const path = require('path');
const {
  isPathInside,
  readJsonBody,
  requireBasicAuth,
  sendJson
} = require('../../shared/routeHelpers');

const PUBLIC_DIR = path.join(__dirname, 'public');
const WORKSPACE_PASSWORD = process.env.CODE_COPY_PASTE_PASSWORD || process.env.STORAGE_PASSWORD;
const IS_MANAGED_PRODUCTION = Boolean(process.env.WEBSITE_SITE_NAME || process.env.NODE_ENV === 'production');
const DEFAULT_DATA_PATH = process.env.WEBSITE_SITE_NAME && process.env.HOME
  ? path.join(process.env.HOME, 'data', 'code-copy-paste.json')
  : path.join(__dirname, 'data', 'code-copy-paste.json');
const DATA_PATH = process.env.CODE_COPY_PASTE_DATA_PATH
  ? path.resolve(process.env.CODE_COPY_PASTE_DATA_PATH)
  : DEFAULT_DATA_PATH;
const MAX_CODE_BYTES = 1024 * 1024;
const LANGUAGES = new Set(['javascript', 'html', 'css', 'json', 'python', 'java', 'cpp', 'sql', 'markdown']);
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8'
};

function sendText(res, statusCode, text) {
  res.writeHead(statusCode, {
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': 'no-store'
  });
  res.end(text);
}

function requireWorkspaceAuth(req, res) {
  if (WORKSPACE_PASSWORD) {
    return requireBasicAuth(
      req,
      res,
      WORKSPACE_PASSWORD,
      'Code Copy Paste',
      'Code Copy Paste password required'
    );
  }

  if (!IS_MANAGED_PRODUCTION) return true;

  sendText(res, 503, 'Set CODE_COPY_PASTE_PASSWORD or STORAGE_PASSWORD before using Code Copy Paste.');
  return false;
}

function emptyDocument() {
  return { language: 'javascript', code: '' };
}

function readDocument() {
  try {
    const stored = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
    if (stored && stored.document && LANGUAGES.has(stored.document.language) && typeof stored.document.code === 'string') {
      return {
        exists: true,
        updatedAt: stored.updatedAt || null,
        document: stored.document
      };
    }
  } catch (error) {
    if (error.code !== 'ENOENT') console.error('Could not read Code Copy Paste data:', error);
  }

  return { exists: false, updatedAt: null, document: emptyDocument() };
}

function normaliseDocument(document) {
  if (!document || !LANGUAGES.has(document.language) || typeof document.code !== 'string') return null;
  if (Buffer.byteLength(document.code, 'utf8') > MAX_CODE_BYTES) return null;
  return { language: document.language, code: document.code };
}

function writeDocument(document) {
  const saved = { updatedAt: new Date().toISOString(), document };
  fs.mkdirSync(path.dirname(DATA_PATH), { recursive: true });
  const temporaryPath = `${DATA_PATH}.${process.pid}.${Date.now()}.tmp`;
  fs.writeFileSync(temporaryPath, JSON.stringify(saved, null, 2));
  fs.renameSync(temporaryPath, DATA_PATH);
  return saved;
}

function servePublicFile(req, res, pathname) {
  const relativePath = pathname === '/code-copy-paste' || pathname === '/code-copy-paste/'
    ? 'index.html'
    : pathname.replace(/^\/code-copy-paste\/?/, '');
  const filePath = path.resolve(PUBLIC_DIR, relativePath);

  if (!isPathInside(PUBLIC_DIR, filePath)) {
    sendText(res, 403, 'Forbidden');
    return;
  }

  const extension = path.extname(filePath).toLowerCase();
  if (!MIME_TYPES[extension] || !fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    sendText(res, 404, 'Code Copy Paste file not found');
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

  if (!requireWorkspaceAuth(req, res)) return;

  if (pathname === '/code-copy-paste/api/document' && req.method === 'GET') {
    sendJson(res, 200, readDocument());
    return;
  }

  if (pathname === '/code-copy-paste/api/document' && req.method === 'PUT') {
    readJsonBody(req, { maxBytes: MAX_CODE_BYTES + 4096 }).then(body => {
      const document = normaliseDocument(body.document);
      if (!document) {
        sendJson(res, 400, { ok: false, error: 'Choose a supported language and keep code under 1 MB.' });
        return;
      }

      try {
        const saved = writeDocument(document);
        sendJson(res, 200, { ok: true, updatedAt: saved.updatedAt });
      } catch (error) {
        console.error('Could not save Code Copy Paste data:', error);
        sendJson(res, 500, { ok: false, error: 'The code could not be saved.' });
      }
    }).catch(error => {
      sendJson(res, error.statusCode || 400, { ok: false, error: error.message || 'Invalid request body.' });
    });
    return;
  }

  if (pathname.startsWith('/code-copy-paste/api/')) {
    sendJson(res, 404, { ok: false, error: 'Code Copy Paste API route not found.' });
    return;
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    sendText(res, 405, 'Method not allowed');
    return;
  }

  servePublicFile(req, res, pathname);
}

module.exports = { handle };
