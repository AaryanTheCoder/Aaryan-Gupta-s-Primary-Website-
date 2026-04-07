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
  const password = decoded.split(':')[1];

  return password === STORAGE_PASSWORD;
}

function requireAuth(req, res) {
  if (isAuthorized(req)) return true;

  res.writeHead(401, {
    'WWW-Authenticate': 'Basic realm="Storage"'
  });

  res.end('Storage password required');
  return false;
}

function listFilesHtml() {
  const files = fs.readdirSync(STORAGE_DIR);

  if (!files.length) return '<p>No files yet</p>';

  return files.map(f => {
    const enc = encodeURIComponent(f);
    return `
      <div style="margin-bottom:10px;">
        <b>${f}</b><br>
        <a href="/storage/files/${enc}">View</a> |
        <a href="/storage/download/${enc}">Download</a>
      </div>
    `;
  }).join('');
}

function handle(req, res) {
  if (!requireAuth(req, res)) return;

  if (req.url === '/storage' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
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
          if (!file) return;

          document.getElementById('status').textContent = 'Uploading...';

          const res = await fetch('/storage/upload', {
            method: 'POST',
            headers: {
              'X-File-Name': file.name
            },
            body: file
          });

          location.reload();
        }
      </script>
    `);
    return;
  }

  if (req.url === '/storage/upload' && req.method === 'POST') {
    const name = sanitizeFileName(
      decodeURIComponent(req.headers['x-file-name'] || 'file')
    );

    const filePath = path.join(STORAGE_DIR, name);

    const chunks = [];
    req.on('data', c => chunks.push(c));
    req.on('end', () => {
      fs.writeFileSync(filePath, Buffer.concat(chunks));
      res.end(JSON.stringify({ ok: true }));
    });

    return;
  }

  if (req.url.startsWith('/storage/files/')) {
    const name = sanitizeFileName(
      decodeURIComponent(req.url.split('/').pop())
    );

    fs.createReadStream(path.join(STORAGE_DIR, name)).pipe(res);
    return;
  }

  if (req.url.startsWith('/storage/download/')) {
    const name = sanitizeFileName(
      decodeURIComponent(req.url.split('/').pop())
    );

    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${name}"`
    );

    fs.createReadStream(path.join(STORAGE_DIR, name)).pipe(res);
    return;
  }
}

module.exports = { handle };