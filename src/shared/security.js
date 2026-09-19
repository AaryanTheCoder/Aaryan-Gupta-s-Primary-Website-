const { requireBasicAuth } = require('./routeHelpers');

function sendText(res, statusCode, message) {
  res.writeHead(statusCode, {
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': 'no-store'
  });
  res.end(message);
}

function requirePassword(req, res, password, realm, configurationName) {
  if (!password) {
    sendText(res, 503, `Set ${configurationName || 'STORAGE_PASSWORD'} before using this feature.`);
    return false;
  }

  return requireBasicAuth(req, res, password, realm, `${realm} password required`);
}

function getClientKey(req) {
  const forwardedFor = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  const address = forwardedFor || req.socket?.remoteAddress || 'unknown';
  return String(address).slice(0, 200);
}

function createRateLimiter({ windowMs, maxRequests, message = 'Too many requests. Please wait and try again.' }) {
  const requests = new Map();

  return function allowRequest(req, res) {
    const now = Date.now();
    const key = getClientKey(req);
    const cutoff = now - windowMs;
    const recent = (requests.get(key) || []).filter(timestamp => timestamp > cutoff);

    if (recent.length >= maxRequests) {
      const retryAfterSeconds = Math.max(1, Math.ceil((recent[0] + windowMs - now) / 1000));
      res.writeHead(429, {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
        'Retry-After': String(retryAfterSeconds)
      });
      res.end(JSON.stringify({ ok: false, error: message }));
      return false;
    }

    recent.push(now);
    requests.set(key, recent);

    if (requests.size > 5000) {
      for (const [storedKey, timestamps] of requests.entries()) {
        const active = timestamps.filter(timestamp => timestamp > cutoff);
        if (active.length) requests.set(storedKey, active);
        else requests.delete(storedKey);
      }
    }

    return true;
  };
}

function addSecurityHeaders(res) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(self), microphone=(), geolocation=()');
}

module.exports = {
  addSecurityHeaders,
  createRateLimiter,
  requirePassword
};
