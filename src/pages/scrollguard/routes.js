const fs = require('fs');
const path = require('path');
const { isPathInside } = require('../../shared/routeHelpers');

const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8'
};

function sendText(res, statusCode, text) {
  res.writeHead(statusCode, {
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': 'no-store'
  });
  res.end(text);
}

function handle(req, res) {
  const pathname = new URL(req.url, 'http://localhost').pathname;

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    sendText(res, 405, 'Method not allowed');
    return;
  }

  const relativePath = pathname === '/scrollguard' || pathname === '/scrollguard/'
    ? 'index.html'
    : pathname.replace(/^\/scrollguard\/?/, '');
  const filePath = path.resolve(PUBLIC_DIR, relativePath);

  if (!isPathInside(PUBLIC_DIR, filePath)) {
    sendText(res, 403, 'Forbidden');
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      sendText(res, 404, 'ScrollGuard guide file not found');
      return;
    }

    const contentType = MIME_TYPES[path.extname(filePath).toLowerCase()]
      || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=3600'
    });
    res.end(req.method === 'HEAD' ? undefined : data);
  });
}

module.exports = { handle };
