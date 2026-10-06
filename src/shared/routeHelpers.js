const crypto = require('crypto');
const path = require('path');

function safeDecode(value) {
  try {
    return decodeURIComponent(String(value || ''));
  } catch {
    return String(value || '');
  }
}

function getBasicAuthPassword(req) {
  const auth = req.headers.authorization || '';
  if (!auth.startsWith('Basic ')) return '';

  const decoded = Buffer.from(auth.slice(6), 'base64').toString();
  const colonIndex = decoded.indexOf(':');
  return colonIndex >= 0 ? decoded.slice(colonIndex + 1) : '';
}

function safeEqual(left, right) {
  const leftBuffer = Buffer.from(String(left || ''));
  const rightBuffer = Buffer.from(String(right || ''));
  if (leftBuffer.length !== rightBuffer.length) return false;
  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

function requireBasicAuth(req, res, password, realm, message) {
  if (password && safeEqual(getBasicAuthPassword(req), password)) return true;

  res.writeHead(401, {
    'Content-Type': 'text/plain; charset=utf-8',
    'WWW-Authenticate': `Basic realm="${realm}"`
  });
  res.end(message);
  return false;
}

function readJsonBody(req, options = {}) {
  const maxBytes = options.maxBytes || 128 * 1024;

  return new Promise((resolve, reject) => {
    const chunks = [];
    let totalBytes = 0;
    let settled = false;

    function rejectOnce(error) {
      if (settled) return;
      settled = true;
      reject(error);
    }

    req.on('data', chunk => {
      if (settled) return;
      const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk));
      totalBytes += buffer.length;
      if (totalBytes > maxBytes) {
        const error = new Error('Payload too large');
        error.statusCode = 413;
        rejectOnce(error);
        // Keep consuming the rest of the request so the route can send its
        // JSON error response instead of leaving the client waiting forever.
        req.resume?.();
        return;
      }
      chunks.push(buffer);
    });

    req.on('end', () => {
      if (settled) return;
      const raw = Buffer.concat(chunks).toString().trim();
      if (!raw) {
        settled = true;
        resolve({});
        return;
      }

      try {
        const parsed = JSON.parse(raw);
        settled = true;
        resolve(parsed);
      } catch {
        const error = new Error('Invalid JSON body');
        error.statusCode = 400;
        rejectOnce(error);
      }
    });

    req.on('error', error => {
      rejectOnce(error);
    });
  });
}

function sendJson(res, statusCode, payload, headers = {}) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    ...headers
  });
  res.end(JSON.stringify(payload));
}

function isPathInside(rootPath, targetPath) {
  const relative = path.relative(path.resolve(rootPath), path.resolve(targetPath));
  return relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative));
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, ch => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[ch]));
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, '&#96;');
}

module.exports = {
  escapeAttr,
  escapeHtml,
  isPathInside,
  readJsonBody,
  requireBasicAuth,
  safeDecode,
  sendJson
};
