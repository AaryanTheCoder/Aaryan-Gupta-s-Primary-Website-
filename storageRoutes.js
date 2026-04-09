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

// Allow safe nested relative paths like "folder/sub/file.txt" while
// preventing path traversal and normalizing separators.
function sanitizeRelativePath(p) {
  let rel = String(p || '').replace(/\\/g, '/');
  // Strip leading slashes and collapse .. and . segments
  rel = rel.replace(/^\/+/, '');
  const parts = rel.split('/').filter(Boolean).map(sanitizeFileName);
  const safe = parts.join('/');
  // Prevent navigating above STORAGE_DIR
  const full = path.resolve(STORAGE_DIR, safe);
  if (!full.startsWith(path.resolve(STORAGE_DIR))) return '';
  return safe;
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

function listFilesHtml(currentRelPath = '') {
  const baseDir = path.resolve(STORAGE_DIR, sanitizeRelativePath(currentRelPath));
  const inRoot = baseDir === path.resolve(STORAGE_DIR);
  const entries = fs.readdirSync(baseDir, { withFileTypes: true }).filter(d => !d.name.startsWith('.upload-'));

  if (!entries.length) {
    return `
      <div class="empty-state">
        <div class="empty-icon">📂</div>
        <h3>No files yet</h3>
        <p>Upload your first file to get started.</p>
      </div>
    `;
  }

  return `
    ${!inRoot ? `<p><a href="/storage?path=${encodeURIComponent(escapeHtml(path.dirname(currentRelPath)))}">⬅ Back</a></p>` : ''}
    <div class="file-grid">
      ${entries.map(d => {
        const name = d.name;
        const rel = currentRelPath ? currentRelPath.replace(/\/$/, '') + '/' + name : name;
        const enc = encodeURIComponent(rel);
        const icon = d.isDirectory() ? '📁' : '📄';
        const actions = d.isDirectory()
          ? `<a href="/storage?path=${enc}">Open</a>`
          : `<a href="/storage/files/${enc}">View</a><a href="/storage/download/${enc}">Download</a>`;
        return `
          <div class="file-card">
            <div class="file-icon">${icon}</div>
            <div class="file-name">${escapeHtml(name)}</div>
            <div class="file-actions">
              ${actions}
              <button class="danger" onclick="deletePath('${enc}')">Delete</button>
            </div>
          </div>`;
      }).join('')}
    </div>
  `;
}

function handle(req, res) {
  if (req.url.startsWith('/storage') && req.method === 'GET' && (req.url === '/storage' || req.url.startsWith('/storage?'))) {
    if (!requireAuth(req, res)) return;
    let currentRelPath = '';
    try {
      const u = new URL(req.url, 'http://local');
      currentRelPath = sanitizeRelativePath(safeDecode(u.searchParams.get('path')));
    } catch {}
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

    .file-actions button {
      border: none;
      cursor: pointer;
      padding: 10px 14px;
      border-radius: 12px;
      font-weight: bold;
      color: #08111f;
      background: linear-gradient(135deg, var(--accent), #ffffff);
    }

    .file-actions button.danger {
      background: linear-gradient(135deg, #ff9aa7, #ff6b6b);
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
      <h2 class="section-title">Upload files or folders</h2>
      <div class="upload-panel">
        <div class="upload-controls">
          <input type="file" id="f" multiple webkitdirectory directory>
          <button onclick="upload()">Upload</button>
        </div>

        <div class="file-meta" id="fileMeta">No files selected yet.</div>
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
      <h2 class="section-title">Your files${currentRelPath ? ' — ' + escapeHtml(currentRelPath) : ''}</h2>
      ${listFilesHtml(currentRelPath)}
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
      const files = Array.from(fileInput.files || []);
      if (!files.length) {
        fileMeta.textContent = 'No files selected yet.';
        transferMeta.textContent = 'No upload in progress.';
        return;
      }
      const total = files.reduce((s, f) => s + (f.size || 0), 0);
      fileMeta.textContent = 'Selected ' + files.length + ' item(s) • ' + formatBytes(total);
      transferMeta.textContent = 'Ready to upload. Folder selection is supported.';
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
      const files = Array.from(fileInput.files || []);
      if (!files.length) {
        status.textContent = 'Pick file(s) or a folder first.';
        transferMeta.textContent = 'No upload in progress.';
        progressWrap.classList.remove('show');
        return;
      }

      progressWrap.classList.add('show');
      const totalBytes = files.reduce((s, f) => s + (f.size || 0), 0);
      let uploadedBytes = 0;
      let index = 0;

      function uploadNext() {
        if (index >= files.length) {
          setProgress(100, 'All uploads complete');
          status.textContent = 'All uploads complete.';
          transferMeta.textContent = formatBytes(totalBytes) + ' uploaded successfully.';
          setTimeout(() => location.reload(), 700);
          return;
        }

        const file = files[index];
        const xhr = new XMLHttpRequest();
        const startedAt = Date.now();
        let lastLoaded = 0;
        let lastTimestamp = startedAt;
        let smoothedSpeed = 0;

        xhr.open('POST', '/storage/upload');
        xhr.withCredentials = true;
        const rel = file.webkitRelativePath || file.name;
        xhr.setRequestHeader('X-File-Path', encodeURIComponent(rel));
        xhr.setRequestHeader('Content-Type', 'application/octet-stream');

        setProgress(Math.round((uploadedBytes / totalBytes) * 100), 'Uploading ' + (index + 1) + '/' + files.length + ': ' + file.name + '...');

        xhr.upload.onprogress = function (event) {
          if (!event.lengthComputable) {
            progressText.textContent = 'Uploading ' + (index + 1) + '/' + files.length + ': ' + file.name + '...';
            return;
          }
          const now = Date.now();
          const loaded = event.loaded;
          const deltaBytes = loaded - lastLoaded;
          uploadedBytes += Math.max(0, deltaBytes);

          const percentTotal = Math.round((uploadedBytes / totalBytes) * 100);
          const elapsedSeconds = Math.max((now - startedAt) / 1000, 0.001);
          const averageSpeed = loaded / elapsedSeconds;
          const deltaSeconds = Math.max((now - lastTimestamp) / 1000, 0.001);
          const instantSpeed = deltaBytes / deltaSeconds;
          smoothedSpeed = smoothedSpeed === 0 ? averageSpeed : (smoothedSpeed * 0.75) + (instantSpeed * 0.25);
          const remainingBytes = totalBytes - uploadedBytes;
          const etaSeconds = smoothedSpeed > 0 ? remainingBytes / smoothedSpeed : Infinity;
          setProgress(percentTotal, 'Uploading ' + (index + 1) + '/' + files.length + ': ' + file.name + '...');
          transferMeta.textContent = formatBytes(uploadedBytes) + ' / ' + formatBytes(totalBytes) + ' • ' + formatSpeed(smoothedSpeed) + ' • ' + formatDuration(etaSeconds);
          lastLoaded = loaded;
          lastTimestamp = now;
        };

        xhr.onload = function () {
          if (xhr.status >= 200 && xhr.status < 300) {
            index += 1;
            uploadNext();
            return;
          }
          status.textContent = 'Upload failed: ' + xhr.responseText;
          transferMeta.textContent = 'Upload failed on ' + file.name + '.';
          setProgress(Math.round((uploadedBytes / totalBytes) * 100), 'Upload failed');
        };

        xhr.onerror = function () {
          status.textContent = 'Upload error. Please try again.';
          transferMeta.textContent = 'A network error interrupted the upload.';
          setProgress(Math.round((uploadedBytes / totalBytes) * 100), 'Upload error');
        };

        xhr.send(file);
      }

      status.textContent = 'Preparing upload...';
      transferMeta.textContent = 'Uploading ' + files.length + ' item(s).';
      uploadNext();
    }

    function deletePath(encodedRel) {
      const prettyName = decodeURIComponent(encodedRel || '');
      if (!encodedRel) return;
      if (!confirm('Delete "' + prettyName + '"? This cannot be undone.')) return;

      status.textContent = 'Deleting ' + prettyName + '...';
      fetch('/storage/delete/' + encodedRel, { method: 'POST', credentials: 'include' })
        .then(async (r) => {
          const data = await r.json().catch(() => ({}));
          if (r.ok) {
            status.textContent = 'Deleted ' + prettyName + '.';
            setTimeout(() => location.reload(), 400);
          } else {
            status.textContent = 'Delete failed: ' + (data.error || ('HTTP ' + r.status));
          }
        })
        .catch(() => {
          status.textContent = 'Delete error. Please try again.';
        });
    }
  </script>
</body>
</html>`);
    return;
  }

  if (req.url === '/storage/upload' && req.method === 'POST') {
    if (!requireAuth(req, res)) return;

    const headerPath = safeDecode(req.headers['x-file-path'] || req.headers['x-file-name'] || 'file');
    const relPath = sanitizeRelativePath(headerPath);
    const filePath = path.resolve(STORAGE_DIR, relPath || sanitizeFileName('file'));
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
        const dir = path.dirname(filePath);
        fs.mkdirSync(dir, { recursive: true });
        fs.renameSync(tempPath, filePath);
        finished = true;
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ ok: true, file: relPath }));
      } catch (error) {
        sendError(500, error.message);
      }
    });

    req.pipe(writeStream);

    return;
  }

  // Delete a file or directory (recursive)
  if ((req.url.startsWith('/storage/delete/') && (req.method === 'POST' || req.method === 'DELETE'))) {
    if (!requireAuth(req, res)) return;
    const raw = safeDecode(req.url.split('/').pop());
    const rel = sanitizeRelativePath(raw);
    const filePath = path.resolve(STORAGE_DIR, rel);

    try {
      if (!fs.existsSync(filePath)) {
        res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ ok: false, error: 'File not found' }));
        return;
      }
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        fs.rmSync(filePath, { recursive: true, force: false });
      } else {
        fs.unlinkSync(filePath);
      }
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ ok: true, deleted: rel }));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ ok: false, error: error.message }));
    }
    return;
  }

  if (req.url.startsWith('/storage/files/') && req.method === 'GET') {
    if (!requireAuth(req, res)) return;
    const raw = safeDecode(req.url.split('/').pop());
    const rel = sanitizeRelativePath(raw);
    const filePath = path.resolve(STORAGE_DIR, rel);

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
    const raw = safeDecode(req.url.split('/').pop());
    const rel = sanitizeRelativePath(raw);
    const filePath = path.resolve(STORAGE_DIR, rel);

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
      'Content-Disposition': `attachment; filename="${path.basename(rel)}"`,
      'Accept-Ranges': 'bytes'
    });

    fs.createReadStream(filePath).pipe(res);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Storage route not found');
}

module.exports = { handle };
