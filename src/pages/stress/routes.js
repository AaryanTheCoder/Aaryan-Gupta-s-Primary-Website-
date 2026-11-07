const fs = require('fs');
const path = require('path');

// An explicit asset list also prevents requests from reading other server files.
const TYPES = {
  'index.html': 'text/html', 'stress.css': 'text/css',
  'stress.js': 'application/javascript', 'metrics.js': 'application/javascript',
  'cpu-kernels.js': 'application/javascript', 'cpu-worker.js': 'application/javascript',
  'gpu.js': 'application/javascript'
};

function handle(req, res) {
  const pathname = req.url.split('?')[0];
  const name = pathname === '/stress' || pathname === '/stress/'
    ? 'index.html' : pathname.slice('/stress/'.length);
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' });
    res.end('Method not allowed');
    return;
  }
  if (!Object.hasOwn(TYPES, name)) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Stress test asset not found');
    return;
  }
  fs.readFile(path.join(__dirname, 'public', name), (error, data) => {
    res.writeHead(error ? 404 : 200, {
      'Content-Type': `${error ? 'text/plain' : TYPES[name]}; charset=utf-8`,
      'Cache-Control': 'no-store'
    });
    res.end(req.method === 'HEAD' ? undefined : error ? 'Not found' : data);
  });
}

module.exports = { handle };
