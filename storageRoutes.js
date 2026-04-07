const fs = require('fs');
const path = require('path');

const STORAGE_PASSWORD = process.env.STORAGE_PASSWORD;
const STORAGE_DIR = path.join(__dirname, 'storage_uploads');

if (!fs.existsSync(STORAGE_DIR)) {
  fs.mkdirSync(STORAGE_DIR, { recursive: true });
}

function sanitizeFileName(fileName) {
  const base = path.basename(String(fileName || '').trim());
  return base.replace(/[^a-zA-Z0-9._ -]/g, '_') || `upload-${Date.now()}`;
}

function isAuthorized(req) {
  if (!STORAGE_PASSWORD) return false;

  const auth = req.headers.authorization || '';
  if (!auth.startsWith('Basic ')) return false;

  const decoded = Buffer.from(auth.slice(6), 'base64').toString();
  const colonIndex = decoded.indexOf(':');
  const password = colonIndex >= 0 ? decoded.slice(colonIndex + 1) : '';

  return password === STORAGE_PASSWORD;
}

function requireAuth(req, res) {
  if (isAuthorized(req)) return true;

  res.writeHead(401, {
    'Content-Type': 'text/plain; charset=utf-8',
    'WWW-Authenticate': 'Basic realm="Storage"'
  });
  res.end('Storage password required');
  return false;
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, ch => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[ch]));
}

function listFilesHtml() {
  const files = fs.readdirSync(STORAGE_DIR);

  if (!files.length) return '<p>No files yet</p>';

  return files.map(f => {
    const enc = encodeURIComponent(f);
    return `
      <div style="margin-bottom:10px;">
        <b>${escapeHtml(f)}</b><br>
        <a href="/storage/files/${enc}">View</a> |
        <a href="/storage/download/${enc}">Download</a>
      </div>
    `;
  }).join('');
}

function handle(req, res) {
  if (req.url === '/storage' && req.method === 'GET') {
    if (!requireAuth(req, res)) return;

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
      <h1>💾 Aaryan Storage</h1>

      <input type="file" id="f">
      <button onclick="upload()">Upload</button>
      <p id="status"></p>

      <hr>
      ${listFilesHtml()}

      <script>
        async function upload() {
          const file = document.getElementById('f').files[0];
          const status = document.getElementById('status');

          if (!file) {
            status.textContent = 'Pick a file first.';
            return;
          }

          status.textContent = 'Uploading...';

          try {
            const res = await fetch('/storage/upload', {
              method: 'POST',
              credentials: 'same-origin',
              headers: {
                'X-File-Name': encodeURIComponent(file.name),
                'Content-Type': 'application/octet-stream'
              },
              body: file
            });

            const text = await res.text();
            console.log('Upload response:', res.status, text);

            if (!res.ok) {
              status.textContent = 'Upload failed: ' + text;
              return;
            }

            status.textContent = 'Upload complete.';
            location.reload();
          } catch (error) {
            status.textContent = 'Upload error: ' + error.message;
          }
        }
      </script>
    `);
    return;
  }

  if (req.url === '/storage/upload' && req.method === 'POST') {
    if (!requireAuth(req, res)) return;

    const name = sanitizeFileName(
      decodeURIComponent(req.headers['x-file-name'] || 'file')
    );
    const filePath = path.join(STORAGE_DIR, name);
    const chunks = [];

    req.on('data', chunk => {
      chunks.push(chunk);
    });

    req.on('end', () => {
      try {
        fs.writeFileSync(filePath, Buffer.concat(chunks));
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ ok: true, file: name }));
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ ok: false, error: error.message }));
      }
    });

    req.on('error', error => {
      res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ ok: false, error: error.message }));
    });

    return;
  }

  if (req.url.startsWith('/storage/files/') && req.method === 'GET') {
    if (!requireAuth(req, res)) return;

    const name = sanitizeFileName(decodeURIComponent(req.url.split('/').pop()));
    const filePath = path.join(STORAGE_DIR, name);

    if (!fs.existsSync(filePath)) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('File not found');
      return;
    }

    fs.createReadStream(filePath).pipe(res);
    return;
  }

  if (req.url.startsWith('/storage/download/') && req.method === 'GET') {
    if (!requireAuth(req, res)) return;

    const name = sanitizeFileName(decodeURIComponent(req.url.split('/').pop()));
    const filePath = path.join(STORAGE_DIR, name);

    if (!fs.existsSync(filePath)) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('File not found');
      return;
    }

    res.setHeader('Content-Disposition', `attachment; filename="${name}"`);
    fs.createReadStream(filePath).pipe(res);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Storage route not found');
}

module.exports = { handle };