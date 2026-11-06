const fs = require('fs');
const path = require('path');

// Only these public files can be requested through /badui.
const files = new Map([
  ['', 'BrokenThermometer.html'],
  ['/', 'BrokenThermometer.html'],
  ...['BrokenThermometer.html', 'BrokenThermometer.js', 'thermometer.css',
    'pushup-counter.js', 'repair-puzzle.js', 'models/pose_landmarker_lite.task',
    'shooter-game/index.html', 'shooter-game/game.js', 'shooter-game/engine.js',
    'shooter-game/style.css', 'shooter-game/peter.webp'].map(file => ['/' + file, file]),
  ['/shooter-game/', 'shooter-game/index.html']
]);
const types = { '.html': 'text/html; charset=utf-8', '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.webp': 'image/webp', '.task': 'application/octet-stream' };

function handle(req, res) {
  const pathname = new URL(req.url, 'http://localhost').pathname;
  const reply = (status, body, headers = {}) => {
    res.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8', ...headers });
    res.end(req.method === 'HEAD' ? undefined : body);
  };
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return reply(405, 'Method not allowed', { Allow: 'GET, HEAD' });
  }
  if (pathname !== '/badui' && !pathname.startsWith('/badui/')) return reply(404, 'Not found');
  const file = files.get(pathname.slice('/badui'.length));
  if (!file) return reply(404, 'Not found');
  fs.readFile(path.join(__dirname, 'public', file), (error, data) => {
    if (error) return reply(404, 'Not found');
    reply(200, data, {
      'Content-Type': types[path.extname(file)],
      'Cache-Control': file.endsWith('.task') || file.endsWith('.webp') ? 'public, max-age=86400' : 'no-cache'
    });
  });
}

module.exports = { handle };
