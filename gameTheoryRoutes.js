const fs = require('fs');
const path = require('path');
const { isPathInside } = require('./routeHelpers');

const PUBLIC_DIR = path.join(__dirname, 'game-theory');

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

function handle(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    sendText(res, 405, 'Method not allowed');
    return;
  }

  const pathname = new URL(req.url, 'http://localhost').pathname;
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
