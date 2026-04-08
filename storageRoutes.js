const fs = require('fs');

const mime = require('mime-types');
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

function safeDecode(value) {
  try {
    return decodeURIComponent(String(value || ''));
  } catch {
    return String(value || '');
  }
}

function listFilesHtml() {
  const files = fs.readdirSync(STORAGE_DIR).filter(name => !name.startsWith('.upload-'));

  if (!files.length) {
    return `
      <div class="empty-state">
        <div class="empty-icon">📂</div>
        <h3>No files yet</h3>
        <p>Upload your first file to get started.</p>
      </div>
    `;
  }

  return `
    <div class="file-grid">
      ${files.map(f => {
        const enc = encodeURIComponent(f);
        return `
          <div class="file-card">
            <div class="file-icon">📄</div>
            <div class="file-name">${escapeHtml(f)}</div>
            <div class="file-actions">
              <a href="/storage/files/${enc}">View</a>
              <a href="/storage/download/${enc}">Download</a>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function handle(req, res) {
  if (req.url === '/storage' && req.method === 'GET') {
    if (!requireAuth(req, res)) return;

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Aaryan Storage</title>
  <style>
    :root {
      --bg-1: #07111f;
      --bg-2: #13213a;
      --panel: rgba(255, 255, 255, 0.10);
      --panel-border: rgba(255, 255, 255, 0.16);
      --text: #f7fbff;
      --muted: #d7e5f4;
      --accent: #8ed8ff;
      --accent-2: #b69cff;
      --success: #8ff0b5;
      --shadow: 0 24px 80px rgba(0, 0, 0, 0.35);
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      min-height: 100vh;
      font-family: Arial, Helvetica, sans-serif;
      color: var(--text);
      background:
        radial-gradient(circle at top left, rgba(142, 216, 255, 0.22), transparent 28%),
        radial-gradient(circle at top right, rgba(182, 156, 255, 0.18), transparent 30%),
        linear-gradient(135deg, var(--bg-1), var(--bg-2));
    }

    .page {
      width: min(1150px, calc(100% - 32px));
      margin: 0 auto;
      padding: 32px 0 56px;
    }

    .hero,
    .section {
      background: var(--panel);
      border: 1px solid var(--panel-border);
      border-radius: 28px;
      box-shadow: var(--shadow);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
    }

    .hero {
      padding: 30px;
      position: relative;
      overflow: hidden;
      margin-bottom: 22px;
    }

    .hero::after {
      content: '';
      position: absolute;
      right: -50px;
      top: -50px;
      width: 220px;
      height: 220px;
      background: radial-gradient(circle, rgba(142, 216, 255, 0.20), transparent 68%);
      pointer-events: none;
    }

    .eyebrow {
      display: inline-block;
      margin-bottom: 14px;
      padding: 8px 14px;
      border-radius: 999px;
      background: rgba(255,255,255,0.11);
      border: 1px solid rgba(255,255,255,0.16);
      color: var(--accent);
      font-size: 0.9rem;
      font-weight: bold;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    h1 {
      margin: 0 0 12px;
      font-size: clamp(2rem, 5vw, 3.5rem);
      line-height: 1.05;
    }

    .hero p {
      margin: 0;
      max-width: 760px;
      color: var(--muted);
      line-height: 1.8;
      font-size: 1.03rem;
    }

    .section {
      padding: 24px;
      margin-bottom: 22px;
    }

    .section-title {
      margin: 0 0 16px;
      font-size: 1.3rem;
    }

    .upload-panel {
      display: grid;
      gap: 16px;
    }

    .upload-controls {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      align-items: center;
    }

    input[type="file"] {
      max-width: 100%;
      padding: 14px;
      border-radius: 16px;
      border: 1px solid rgba(255,255,255,0.18);
      background: rgba(255,255,255,0.08);
      color: var(--text);
    }

    button {
      border: none;
      border-radius: 16px;
      padding: 14px 22px;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
      background: linear-gradient(135deg, var(--accent), var(--accent-2));
      color: #08111f;
      transition: transform 0.16s ease, box-shadow 0.16s ease;
      box-shadow: 0 10px 24px rgba(142, 216, 255, 0.18);
    }

    button:hover {
      transform: translateY(-2px);
    }

    .file-meta {
      color: var(--muted);
      font-size: 0.96rem;
    }

    .progress-wrap {
      display: none;
      gap: 10px;
    }

    .progress-wrap.show {
      display: grid;
    }

    .progress-bar {
      width: 100%;
      height: 16px;
      border-radius: 999px;
      overflow: hidden;
      background: rgba(255,255,255,0.10);
      border: 1px solid rgba(255,255,255,0.14);
    }

    .progress-fill {
      height: 100%;
      width: 0%;
      border-radius: 999px;
      background: linear-gradient(90deg, var(--accent), var(--success));
      transition: width 0.15s linear;
    }

    .progress-label-row {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      color: var(--muted);
      font-size: 0.95rem;
    }

    #status {
      min-height: 24px;
      margin: 0;
      color: var(--muted);
      font-size: 0.98rem;
    }

    .file-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 18px;
    }

    .file-card,
    .empty-state {
      background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.14);
      border-radius: 22px;
      padding: 20px;
    }

    .file-card {
      display: flex;
      flex-direction: column;
      gap: 14px;
      min-height: 180px;
    }

    .file-icon,
    .empty-icon {
      font-size: 2rem;
    }

    .file-name {
      font-weight: bold;
      line-height: 1.5;
      word-break: break-word;
    }

    .file-actions {
      margin-top: auto;
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    .file-actions a {
      text-decoration: none;
      color: #08111f;
      background: linear-gradient(135deg, var(--accent), #ffffff);
      padding: 10px 14px;
      border-radius: 12px;
      font-weight: bold;
    }

    .empty-state h3 {
      margin: 12px 0 8px;
    }

    .empty-state p {
      margin: 0;
      color: var(--muted);
      line-height: 1.7;
    }

    @media (max-width: 720px) {
      .page {
        width: min(100% - 18px, 100%);
        padding-top: 18px;
      }

      .hero,
      .section {
        border-radius: 22px;
      }

      .hero,
      .section {
        padding: 20px;
      }

      .upload-controls {
        flex-direction: column;
        align-items: stretch;
      }

      button {
        width: 100%;
      }

      .progress-label-row {
        flex-direction: column;
      }
    }
  </style>
</head>
<body>
  <div class="page">
    <section class="hero">
      <div class="eyebrow">Private storage</div>
      <h1>💾 Aaryan Storage</h1>
      <p>Upload files, keep them organized, and quickly open or download them from one place.</p>
    </section>

    <section class="section">
      <h2 class="section-title">Upload a file</h2>
      <div class="upload-panel">
        <div class="upload-controls">
          <input type="file" id="f">
          <button onclick="upload()">Upload file</button>
        </div>

        <div class="file-meta" id="fileMeta">No file selected yet.</div>
        <div class="file-meta" id="transferMeta">No upload in progress.</div>

        <div class="progress-wrap" id="progressWrap">
          <div class="progress-label-row">
            <span id="progressText">Waiting to upload...</span>
            <span id="progressPercent">0%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" id="progressFill"></div>
          </div>
        </div>

        <p id="status"></p>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">Your files</h2>
      ${listFilesHtml()}
    </section>
  </div>

  <script>
    const fileInput = document.getElementById('f');
    const fileMeta = document.getElementById('fileMeta');
    const transferMeta = document.getElementById('transferMeta');
    const status = document.getElementById('status');
    const progressWrap = document.getElementById('progressWrap');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const progressPercent = document.getElementById('progressPercent');

    fileInput.addEventListener('change', () => {
      const file = fileInput.files[0];
      if (!file) {
        fileMeta.textContent = 'No file selected yet.';
        transferMeta.textContent = 'No upload in progress.';
        return;
      }

      fileMeta.textContent = 'Selected: ' + file.name + ' (' + formatBytes(file.size) + ')';
      transferMeta.textContent = 'Ready to upload.';
    });

    function formatBytes(bytes) {
      if (!Number.isFinite(bytes) || bytes <= 0) return '0 B';
      const units = ['B', 'KB', 'MB', 'GB', 'TB'];
      let value = bytes;
      let unitIndex = 0;

      while (value >= 1024 && unitIndex < units.length - 1) {
        value /= 1024;
        unitIndex += 1;
      }

      const decimals = value >= 100 || unitIndex === 0 ? 0 : value >= 10 ? 1 : 2;
      return value.toFixed(decimals) + ' ' + units[unitIndex];
    }

    function formatSpeed(bytesPerSecond) {
      if (!Number.isFinite(bytesPerSecond) || bytesPerSecond <= 0) return 'Calculating speed...';
      return formatBytes(bytesPerSecond) + '/s';
    }

    function formatDuration(seconds) {
      if (!Number.isFinite(seconds) || seconds < 0) return 'Estimating time...';
      if (seconds < 1) return 'Less than 1s remaining';
      if (seconds < 60) return Math.ceil(seconds) + 's remaining';

      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.ceil(seconds % 60);
      if (minutes < 60) return minutes + 'm ' + remainingSeconds + 's remaining';

      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return hours + 'h ' + remainingMinutes + 'm remaining';
    }

    function setProgress(value, label) {
      const safeValue = Math.max(0, Math.min(100, value));
      progressFill.style.width = safeValue + '%';
      progressPercent.textContent = safeValue + '%';
      progressText.textContent = label;
    }

    function upload() {
      const file = fileInput.files[0];

      if (!file) {
        status.textContent = 'Pick a file first.';
        transferMeta.textContent = 'No upload in progress.';
        progressWrap.classList.remove('show');
        return;
      }

      status.textContent = 'Preparing upload...';
      transferMeta.textContent = 'Starting upload for ' + file.name + ' (' + formatBytes(file.size) + ').';
      progressWrap.classList.add('show');
      setProgress(0, 'Starting upload...');

      const xhr = new XMLHttpRequest();
      const startedAt = Date.now();
      let lastLoaded = 0;
      let lastTimestamp = startedAt;
      let smoothedSpeed = 0;

      xhr.open('POST', '/storage/upload');
      xhr.withCredentials = true;
      xhr.setRequestHeader('X-File-Name', encodeURIComponent(file.name));
      xhr.setRequestHeader('Content-Type', 'application/octet-stream');

      xhr.upload.onprogress = function (event) {
        if (!event.lengthComputable) {
          setProgress(0, 'Uploading...');
          transferMeta.textContent = 'Uploading...';
          return;
        }

        const now = Date.now();
        const loaded = event.loaded;
        const total = event.total;
        const percent = Math.round((loaded / total) * 100);
        const elapsedSeconds = Math.max((now - startedAt) / 1000, 0.001);
        const averageSpeed = loaded / elapsedSeconds;

        const deltaBytes = loaded - lastLoaded;
        const deltaSeconds = Math.max((now - lastTimestamp) / 1000, 0.001);
        const instantSpeed = deltaBytes / deltaSeconds;

        smoothedSpeed = smoothedSpeed === 0
          ? averageSpeed
          : (smoothedSpeed * 0.75) + (instantSpeed * 0.25);

        const remainingBytes = total - loaded;
        const etaSeconds = smoothedSpeed > 0 ? remainingBytes / smoothedSpeed : Infinity;

        setProgress(percent, 'Uploading ' + file.name + '...');
        transferMeta.textContent =
          formatBytes(loaded) + ' / ' + formatBytes(total) +
          ' • ' + formatSpeed(smoothedSpeed) +
          ' • ' + formatDuration(etaSeconds);

        lastLoaded = loaded;
        lastTimestamp = now;
      };

      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          setProgress(100, 'Upload complete');
          status.textContent = 'Upload complete.';
          transferMeta.textContent = formatBytes(file.size) + ' uploaded successfully and saved to storage.';
          setTimeout(() => location.reload(), 700);
          return;
        }

        status.textContent = 'Upload failed: ' + xhr.responseText;
        transferMeta.textContent = 'Upload failed before completion.';
        setProgress(0, 'Upload failed');
      };

      xhr.onerror = function () {
        status.textContent = 'Upload error. Please try again.';
        transferMeta.textContent = 'A network error interrupted the upload.';
        setProgress(0, 'Upload error');
      };

      xhr.send(file);
    }
  </script>
</body>
</html>`);
    return;
  }

  if (req.url === '/storage/upload' && req.method === 'POST') {
    if (!requireAuth(req, res)) return;

    const name = sanitizeFileName(
      safeDecode(req.headers['x-file-name'] || 'file')
    );
    const filePath = path.join(STORAGE_DIR, name);
    const tempPath = path.join(
      STORAGE_DIR,
      `.upload-${Date.now()}-${Math.random().toString(36).slice(2)}.tmp`
    );
    const writeStream = fs.createWriteStream(tempPath);
    let finished = false;

    function cleanupTempFile() {
      try {
        if (fs.existsSync(tempPath)) {
          fs.unlinkSync(tempPath);
        }
      } catch (_) {
      }
    }

    function sendError(statusCode, message) {
      if (finished) return;
      finished = true;
      cleanupTempFile();
      res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ ok: false, error: message }));
    }

    writeStream.on('error', error => {
      sendError(500, error.message);
    });

    req.on('error', error => {
      writeStream.destroy();
      sendError(500, error.message);
    });

    req.on('aborted', () => {
      writeStream.destroy();
      sendError(499, 'Upload was aborted before completion');
    });

    writeStream.on('finish', () => {
      if (finished) return;

      try {
        fs.renameSync(tempPath, filePath);
        finished = true;
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ ok: true, file: name }));
      } catch (error) {
        sendError(500, error.message);
      }
    });

    req.pipe(writeStream);

    return;
  }

  if (req.url.startsWith('/storage/files/') && req.method === 'GET') {
    if (!requireAuth(req, res)) return;

    const name = sanitizeFileName(safeDecode(req.url.split('/').pop()));
    const filePath = path.join(STORAGE_DIR, name);

    if (!fs.existsSync(filePath)) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('File not found');
      return;
    }

    const stat = fs.statSync(filePath);
    const contentType = mime.lookup(filePath) || 'application/octet-stream';
    const range = req.headers.range;

    if (range) {
      const match = /bytes=(\d*)-(\d*)/.exec(range);

      if (!match) {
        res.writeHead(416, {
          'Content-Type': 'text/plain; charset=utf-8',
          'Content-Range': `bytes */${stat.size}`
        });
        res.end('Invalid range');
        return;
      }

      let start = match[1] ? parseInt(match[1], 10) : 0;
      let end = match[2] ? parseInt(match[2], 10) : stat.size - 1;

      if (Number.isNaN(start) || start < 0) start = 0;
      if (Number.isNaN(end) || end >= stat.size) end = stat.size - 1;
      if (start > end || start >= stat.size) {
        res.writeHead(416, {
          'Content-Type': 'text/plain; charset=utf-8',
          'Content-Range': `bytes */${stat.size}`
        });
        res.end('Requested range not satisfiable');
        return;
      }

      res.writeHead(206, {
        'Content-Type': contentType,
        'Content-Length': end - start + 1,
        'Content-Range': `bytes ${start}-${end}/${stat.size}`,
        'Accept-Ranges': 'bytes'
      });

      fs.createReadStream(filePath, { start, end }).pipe(res);
      return;
    }

    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': stat.size,
      'Accept-Ranges': 'bytes'
    });

    fs.createReadStream(filePath).pipe(res);
    return;
  }

  if (req.url.startsWith('/storage/download/') && req.method === 'GET') {
    if (!requireAuth(req, res)) return;

    const name = sanitizeFileName(safeDecode(req.url.split('/').pop()));
    const filePath = path.join(STORAGE_DIR, name);

    if (!fs.existsSync(filePath)) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('File not found');
      return;
    }

    const stat = fs.statSync(filePath);
    const contentType = mime.lookup(filePath) || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': stat.size,
      'Content-Disposition': `attachment; filename="${name}"`,
      'Accept-Ranges': 'bytes'
    });

    fs.createReadStream(filePath).pipe(res);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Storage route not found');
}

module.exports = { handle };