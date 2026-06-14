const fs = require('fs');
const mime = require('mime-types');
const path = require('path');

const STORAGE_PASSWORD = process.env.STORAGE_PASSWORD;
const STORAGE_DIR = path.join(__dirname, 'storage_uploads');
const MAX_STORAGE_UPLOAD_BYTES = Number(process.env.MAX_STORAGE_UPLOAD_BYTES || 200 * 1024 * 1024);

if (!fs.existsSync(STORAGE_DIR)) {
  fs.mkdirSync(STORAGE_DIR, { recursive: true });
}

function sanitizePathSegment(segment, fallback = 'item') {
  const base = path.basename(String(segment || '').trim());
  const cleaned = base.replace(/[^a-zA-Z0-9._ -]/g, '_').replace(/^\.+$/, '');
  return cleaned || fallback;
}

function sanitizeRelativePath(input, options = {}) {
  const { allowEmpty = false, fallback = `upload-${Date.now()}` } = options;
  const raw = safeDecode(input || '').replace(/\\/g, '/');
  const parts = raw
    .split('/')
    .map(part => part.trim())
    .filter(part => part && part !== '.' && part !== '..')
    .map((part, index) => sanitizePathSegment(part, `${fallback}-${index + 1}`));

  if (!parts.length) {
    return allowEmpty ? '' : sanitizePathSegment(fallback, fallback);
  }

  return parts.join('/');
}

function resolveStoragePath(relativePath, options = {}) {
  const cleanedRelativePath = sanitizeRelativePath(relativePath, options);
  const absolutePath = cleanedRelativePath
    ? path.resolve(STORAGE_DIR, cleanedRelativePath)
    : path.resolve(STORAGE_DIR);
  const rootPath = path.resolve(STORAGE_DIR);

  if (absolutePath !== rootPath && !absolutePath.startsWith(rootPath + path.sep)) {
    return null;
  }

  return {
    relativePath: cleanedRelativePath,
    absolutePath
  };
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
  return `${value.toFixed(decimals)} ${units[unitIndex]}`;
}

function countVisibleChildren(directoryPath) {
  try {
    return fs.readdirSync(directoryPath).filter(name => !name.startsWith('.upload-')).length;
  } catch {
    return 0;
  }
}

function getDirectoryEntries(relativeDirectory) {
  const resolved = resolveStoragePath(relativeDirectory, { allowEmpty: true });
  if (!resolved || !fs.existsSync(resolved.absolutePath)) return null;

  const stat = fs.statSync(resolved.absolutePath);
  if (!stat.isDirectory()) return null;

  return fs.readdirSync(resolved.absolutePath, { withFileTypes: true })
    .filter(entry => !entry.name.startsWith('.upload-'))
    .map(entry => {
      const entryRelativePath = resolved.relativePath
        ? `${resolved.relativePath}/${entry.name}`
        : entry.name;
      const entryAbsolutePath = path.join(resolved.absolutePath, entry.name);
      const entryStat = fs.statSync(entryAbsolutePath);
      const isDirectory = entry.isDirectory();

      return {
        name: entry.name,
        relativePath: entryRelativePath,
        isDirectory,
        itemCount: isDirectory ? countVisibleChildren(entryAbsolutePath) : 0,
        size: isDirectory ? 0 : entryStat.size
      };
    })
    .sort((left, right) => {
      if (left.isDirectory !== right.isDirectory) {
        return left.isDirectory ? -1 : 1;
      }

      return left.name.localeCompare(right.name, undefined, { sensitivity: 'base' });
    });
}

function buildStorageLink(relativePath) {
  return relativePath ? `/storage?path=${encodeURIComponent(relativePath)}` : '/storage';
}

function buildBreadcrumbsHtml(relativeDirectory) {
  if (!relativeDirectory) {
    return '<div class="breadcrumbs"><span>Root</span></div>';
  }

  const parts = relativeDirectory.split('/');
  let accumulated = '';
  const crumbs = [`<a href="/storage">Root</a>`];

  for (const part of parts) {
    accumulated = accumulated ? `${accumulated}/${part}` : part;
    crumbs.push(`<a href="${buildStorageLink(accumulated)}">${escapeHtml(part)}</a>`);
  }

  return `<div class="breadcrumbs">${crumbs.join('<span>/</span>')}</div>`;
}

function listFilesHtml(relativeDirectory) {
  const entries = getDirectoryEntries(relativeDirectory);
  if (!entries) {
    return `
      <div class="empty-state">
        <div class="empty-icon">📂</div>
        <h3>Folder not found</h3>
        <p>The folder you requested no longer exists.</p>
      </div>
    `;
  }

  if (!entries.length) {
    return `
      <div class="empty-state">
        <div class="empty-icon">📂</div>
        <h3>${relativeDirectory ? 'This folder is empty' : 'No files yet'}</h3>
        <p>${relativeDirectory ? 'Upload something into this folder to populate it.' : 'Upload your first file or folder to get started.'}</p>
      </div>
    `;
  }

  return `
    <div class="file-grid">
      ${entries.map(entry => {
        const encodedPath = encodeURIComponent(entry.relativePath);

        if (entry.isDirectory) {
          const itemLabel = entry.itemCount === 1 ? '1 item' : `${entry.itemCount} items`;
          return `
            <div class="file-card folder-card">
              <div class="file-icon">📁</div>
              <div class="file-name">${escapeHtml(entry.name)}</div>
              <div class="file-subtitle">${itemLabel}</div>
              <div class="file-actions">
                <a href="${buildStorageLink(entry.relativePath)}">Open</a>
                <button class="danger" onclick="deleteEntry('${encodedPath}', 'folder')">Delete</button>
              </div>
            </div>
          `;
        }

        return `
          <div class="file-card">
            <div class="file-icon">📄</div>
            <div class="file-name">${escapeHtml(entry.name)}</div>
            <div class="file-subtitle">${formatBytes(entry.size)}</div>
            <div class="file-actions">
              <a href="/storage/files/${encodedPath}">View</a>
              <a href="/storage/download/${encodedPath}">Download</a>
              <button class="danger" onclick="deleteEntry('${encodedPath}', 'file')">Delete</button>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function getRouteRelativePath(pathname, prefix) {
  const raw = pathname.startsWith(prefix) ? pathname.slice(prefix.length) : '';
  return sanitizeRelativePath(raw, { allowEmpty: true });
}

function renderPage(relativeDirectory) {
  const entries = getDirectoryEntries(relativeDirectory);
  const currentDirectory = entries ? relativeDirectory : '';
  const parentDirectory = currentDirectory.includes('/')
    ? currentDirectory.slice(0, currentDirectory.lastIndexOf('/'))
    : '';

  return `<!DOCTYPE html>
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

    .section-head {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 16px;
      margin-bottom: 16px;
    }

    .section-title {
      margin: 0 0 10px;
      font-size: 1.3rem;
    }

    .breadcrumbs {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      color: var(--muted);
      font-size: 0.95rem;
      line-height: 1.5;
    }

    .breadcrumbs a {
      color: var(--accent);
      text-decoration: none;
    }

    .folder-nav {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      color: #08111f;
      background: linear-gradient(135deg, var(--accent), #ffffff);
      padding: 12px 16px;
      border-radius: 14px;
      font-weight: bold;
      white-space: nowrap;
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

    .picker-input {
      display: none;
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

    .secondary-button {
      background: rgba(255,255,255,0.10);
      color: var(--text);
      border: 1px solid rgba(255,255,255,0.18);
      box-shadow: none;
    }

    .file-meta {
      color: var(--muted);
      font-size: 0.96rem;
      line-height: 1.7;
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

    .folder-card {
      border-color: rgba(142, 216, 255, 0.24);
      background: linear-gradient(180deg, rgba(142, 216, 255, 0.10), rgba(255,255,255,0.06));
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

    .file-subtitle {
      color: var(--muted);
      font-size: 0.95rem;
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
      box-shadow: none;
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

      .section-head,
      .upload-controls,
      .progress-label-row {
        flex-direction: column;
        align-items: stretch;
      }

      button,
      .folder-nav {
        width: 100%;
      }
    }
  </style>
</head>
<body>
  <div class="page">
    <section class="hero">
      <div class="eyebrow">Private storage</div>
      <h1>💾 Aaryan Storage</h1>
      <p>Upload files or entire folders, keep the structure intact, and browse everything without the top level turning into a mess.</p>
    </section>

    <section class="section">
      <h2 class="section-title">Upload files or folders</h2>
      <div class="upload-panel">
        <div class="upload-controls">
          <input class="picker-input" type="file" id="fileInput" multiple>
          <input class="picker-input" type="file" id="folderInput" webkitdirectory directory multiple>
          <button class="secondary-button" onclick="pickFiles()">Choose files</button>
          <button class="secondary-button" onclick="pickFolder()">Choose folder</button>
          <button onclick="upload()">Upload selection</button>
        </div>

        <div class="file-meta" id="fileMeta">No files or folders selected yet.</div>
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
      <div class="section-head">
        <div>
          <h2 class="section-title">Your storage</h2>
          ${buildBreadcrumbsHtml(currentDirectory)}
        </div>
        ${currentDirectory ? `<a class="folder-nav" href="${buildStorageLink(parentDirectory)}">Up one level</a>` : ''}
      </div>
      ${listFilesHtml(currentDirectory)}
    </section>
  </div>

  <script>
    const currentDirectory = ${JSON.stringify(currentDirectory)};
    const fileInput = document.getElementById('fileInput');
    const folderInput = document.getElementById('folderInput');
    const fileMeta = document.getElementById('fileMeta');
    const transferMeta = document.getElementById('transferMeta');
    const status = document.getElementById('status');
    const progressWrap = document.getElementById('progressWrap');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const progressPercent = document.getElementById('progressPercent');

    let selectedFiles = [];
    let selectionMode = '';

    function pickFiles() {
      fileInput.click();
    }

    function pickFolder() {
      folderInput.click();
    }

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

    function summariseSelection(files, mode) {
      if (!files.length) {
        fileMeta.textContent = 'No files or folders selected yet.';
        transferMeta.textContent = 'No upload in progress.';
        return;
      }

      const totalSize = files.reduce((sum, file) => sum + file.size, 0);

      if (mode === 'folder') {
        const roots = Array.from(new Set(files
          .map(file => (file.webkitRelativePath || '').split('/')[0])
          .filter(Boolean)));
        const folderLabel = roots.length === 1 ? roots[0] : roots.length + ' folders';
        const preview = files
          .slice(0, 4)
          .map(file => file.webkitRelativePath || file.name)
          .join(', ');
        const extraCount = Math.max(0, files.length - 4);

        fileMeta.textContent = 'Selected folder upload: ' + folderLabel + ' with ' + files.length + ' file(s) (' + formatBytes(totalSize) + ').';
        transferMeta.textContent = 'Includes: ' + preview + (extraCount ? ' +' + extraCount + ' more' : '');
        return;
      }

      const preview = files.slice(0, 4).map(file => file.name).join(', ');
      const extraCount = Math.max(0, files.length - 4);
      fileMeta.textContent = 'Selected ' + files.length + ' file(s) (' + formatBytes(totalSize) + ').';
      transferMeta.textContent = 'Includes: ' + preview + (extraCount ? ' +' + extraCount + ' more' : '');
    }

    fileInput.addEventListener('change', () => {
      selectedFiles = Array.from(fileInput.files || []);
      selectionMode = selectedFiles.length ? 'files' : '';
      folderInput.value = '';
      summariseSelection(selectedFiles, selectionMode);
    });

    folderInput.addEventListener('change', () => {
      selectedFiles = Array.from(folderInput.files || []);
      selectionMode = selectedFiles.length ? 'folder' : '';
      fileInput.value = '';
      summariseSelection(selectedFiles, selectionMode);
    });

    function upload() {
      if (!selectedFiles.length) {
        status.textContent = 'Pick files or a folder first.';
        transferMeta.textContent = 'No upload in progress.';
        progressWrap.classList.remove('show');
        return;
      }

      const totalSize = selectedFiles.reduce((sum, file) => sum + file.size, 0);
      let uploadedSize = 0;
      let failedCount = 0;
      const startedAt = Date.now();

      status.textContent = 'Starting upload of ' + selectedFiles.length + ' file(s)...';
      progressWrap.classList.add('show');
      setProgress(0, 'Uploading file 1 of ' + selectedFiles.length + '...');

      async function uploadFile(file, index) {
        return new Promise((resolve) => {
          const xhr = new XMLHttpRequest();
          let lastLoaded = 0;
          let lastTimestamp = startedAt;
          let smoothedSpeed = 0;
          const relativePath = file.webkitRelativePath || file.name;

          xhr.open('POST', '/storage/upload');
          xhr.withCredentials = true;
          xhr.setRequestHeader('X-File-Name', encodeURIComponent(file.name));
          xhr.setRequestHeader('X-Relative-Path', encodeURIComponent(relativePath));
          xhr.setRequestHeader('X-Target-Directory', encodeURIComponent(currentDirectory));
          xhr.setRequestHeader('Content-Type', 'application/octet-stream');

          xhr.upload.onprogress = function (event) {
            if (!event.lengthComputable) return;

            const now = Date.now();
            const loaded = event.loaded;
            const deltaBytes = loaded - lastLoaded;
            const deltaSeconds = Math.max((now - lastTimestamp) / 1000, 0.001);
            const instantSpeed = deltaBytes / deltaSeconds;

            smoothedSpeed = smoothedSpeed === 0
              ? (uploadedSize + loaded) / Math.max((now - startedAt) / 1000, 0.001)
              : (smoothedSpeed * 0.75) + (instantSpeed * 0.25);

            const currentOverallLoaded = uploadedSize + loaded;
            const overallPercent = Math.round((currentOverallLoaded / totalSize) * 100);
            const remainingBytes = totalSize - currentOverallLoaded;
            const etaSeconds = smoothedSpeed > 0 ? remainingBytes / smoothedSpeed : Infinity;

            setProgress(overallPercent, 'Uploading file ' + (index + 1) + ' of ' + selectedFiles.length + ': ' + relativePath + '...');
            transferMeta.textContent =
              formatBytes(currentOverallLoaded) + ' / ' + formatBytes(totalSize) +
              ' • ' + formatSpeed(smoothedSpeed) +
              ' • ' + formatDuration(etaSeconds);

            lastLoaded = loaded;
            lastTimestamp = now;
          };

          xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
              uploadedSize += file.size;
              resolve({ ok: true });
            } else {
              failedCount += 1;
              status.textContent = 'Failed to upload ' + relativePath + ': ' + xhr.responseText;
              resolve({ ok: false });
            }
          };

          xhr.onerror = function () {
            failedCount += 1;
            status.textContent = 'Error uploading ' + relativePath + '. Continuing with next file...';
            resolve({ ok: false });
          };

          xhr.send(file);
        });
      }

      (async () => {
        for (let i = 0; i < selectedFiles.length; i++) {
          await uploadFile(selectedFiles[i], i);
        }

        const successCount = selectedFiles.length - failedCount;
        if (failedCount === 0) {
          setProgress(100, 'Upload complete');
          status.textContent = 'All ' + successCount + ' file(s) uploaded successfully.';
          transferMeta.textContent = formatBytes(totalSize) + ' uploaded successfully and saved to storage.';
          setTimeout(() => location.reload(), 700);
        } else if (successCount === 0) {
          setProgress(0, 'Upload failed');
          status.textContent = 'Failed to upload all ' + selectedFiles.length + ' file(s).';
          transferMeta.textContent = 'All uploads failed.';
        } else {
          setProgress(100, 'Completed with errors');
          status.textContent = 'Uploaded ' + successCount + ' of ' + selectedFiles.length + ' file(s). ' + failedCount + ' failed.';
          transferMeta.textContent = successCount + ' file(s) saved. ' + failedCount + ' failed.';
          setTimeout(() => location.reload(), 1400);
        }
      })();
    }

    function deleteEntry(encodedPath, entryType) {
      const prettyName = decodeURIComponent(encodedPath || '');
      if (!encodedPath) return;

      status.textContent = 'Deleting ' + prettyName + '...';
      fetch('/storage/delete/' + encodedPath, { method: 'POST', credentials: 'include' })
        .then(async (response) => {
          const data = await response.json().catch(() => ({}));
          if (response.ok) {
            status.textContent = 'Deleted ' + prettyName + '.';
            setTimeout(() => {
              if (currentDirectory && prettyName === currentDirectory) {
                location.href = '/storage';
                return;
              }
              location.reload();
            }, 400);
          } else {
            status.textContent = 'Delete failed: ' + (data.error || ('HTTP ' + response.status));
          }
        })
        .catch(() => {
          status.textContent = 'Delete error. Please try again.';
        });
    }
  </script>
</body>
</html>`;
}

function handle(req, res) {
  const url = new URL(req.url, 'http://localhost');
  const pathname = url.pathname;

  if (pathname === '/storage' && req.method === 'GET') {
    if (!requireAuth(req, res)) return;

    const currentDirectory = sanitizeRelativePath(url.searchParams.get('path') || '', { allowEmpty: true });
    const directoryEntries = getDirectoryEntries(currentDirectory);

    if (currentDirectory && !directoryEntries) {
      res.writeHead(302, { Location: '/storage' });
      res.end();
      return;
    }

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(renderPage(currentDirectory));
    return;
  }

  if (pathname === '/storage/upload' && req.method === 'POST') {
    if (!requireAuth(req, res)) return;

    const contentLength = Number(req.headers['content-length'] || 0);
    if (contentLength > MAX_STORAGE_UPLOAD_BYTES) {
      res.writeHead(413, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ ok: false, error: 'Upload is too large' }));
      return;
    }

    const targetDirectory = sanitizeRelativePath(req.headers['x-target-directory'] || '', { allowEmpty: true });
    const uploadedRelativePath = safeDecode(
      req.headers['x-relative-path'] ||
      req.headers['x-file-name'] ||
      'file'
    );
    const requestedPath = [targetDirectory, uploadedRelativePath].filter(Boolean).join('/');
    const resolvedPath = resolveStoragePath(requestedPath, {
      fallback: safeDecode(req.headers['x-file-name'] || 'file')
    });

    if (!resolvedPath) {
      res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ ok: false, error: 'Invalid upload path' }));
      return;
    }

    const parentDirectory = path.dirname(resolvedPath.absolutePath);
    const tempPath = path.join(
      STORAGE_DIR,
      `.upload-${Date.now()}-${Math.random().toString(36).slice(2)}.tmp`
    );
    const writeStream = fs.createWriteStream(tempPath);
    let finished = false;
    let receivedBytes = 0;

    try {
      fs.mkdirSync(parentDirectory, { recursive: true });
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ ok: false, error: error.message }));
      return;
    }

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

    req.on('data', chunk => {
      receivedBytes += chunk.length;
      if (receivedBytes > MAX_STORAGE_UPLOAD_BYTES) {
        writeStream.destroy();
        sendError(413, 'Upload is too large');
        req.destroy();
      }
    });

    req.on('aborted', () => {
      writeStream.destroy();
      if (!finished) {
        sendError(receivedBytes > MAX_STORAGE_UPLOAD_BYTES ? 413 : 499, receivedBytes > MAX_STORAGE_UPLOAD_BYTES ? 'Upload is too large' : 'Upload was aborted before completion');
      }
    });

    writeStream.on('finish', () => {
      if (finished) return;

      try {
        if (fs.existsSync(resolvedPath.absolutePath) && fs.statSync(resolvedPath.absolutePath).isDirectory()) {
          sendError(400, 'A folder already exists with that name');
          return;
        }

        fs.renameSync(tempPath, resolvedPath.absolutePath);
        finished = true;
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ ok: true, file: resolvedPath.relativePath }));
      } catch (error) {
        sendError(500, error.message);
      }
    });

    req.pipe(writeStream);
    return;
  }

  if (pathname.startsWith('/storage/delete/') && (req.method === 'POST' || req.method === 'DELETE')) {
    if (!requireAuth(req, res)) return;

    const relativePath = getRouteRelativePath(pathname, '/storage/delete/');
    const resolvedPath = resolveStoragePath(relativePath, { allowEmpty: true });

    if (!resolvedPath || !resolvedPath.relativePath) {
      res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ ok: false, error: 'Invalid path' }));
      return;
    }

    try {
      if (!fs.existsSync(resolvedPath.absolutePath)) {
        res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ ok: false, error: 'File or folder not found' }));
        return;
      }

      const stat = fs.statSync(resolvedPath.absolutePath);
      if (stat.isDirectory()) {
        fs.rmSync(resolvedPath.absolutePath, { recursive: true, force: false });
      } else {
        fs.unlinkSync(resolvedPath.absolutePath);
      }

      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({
        ok: true,
        deleted: resolvedPath.relativePath,
        type: stat.isDirectory() ? 'folder' : 'file'
      }));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ ok: false, error: error.message }));
    }
    return;
  }

  if (pathname.startsWith('/storage/files/') && req.method === 'GET') {
    if (!requireAuth(req, res)) return;

    const relativePath = getRouteRelativePath(pathname, '/storage/files/');
    const resolvedPath = resolveStoragePath(relativePath, { allowEmpty: true });

    if (!resolvedPath || !resolvedPath.relativePath || !fs.existsSync(resolvedPath.absolutePath)) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('File not found');
      return;
    }

    const stat = fs.statSync(resolvedPath.absolutePath);
    if (stat.isDirectory()) {
      res.writeHead(302, { Location: buildStorageLink(resolvedPath.relativePath) });
      res.end();
      return;
    }

    const contentType = mime.lookup(resolvedPath.absolutePath) || 'application/octet-stream';
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

      fs.createReadStream(resolvedPath.absolutePath, { start, end }).pipe(res);
      return;
    }

    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': stat.size,
      'Accept-Ranges': 'bytes'
    });

    fs.createReadStream(resolvedPath.absolutePath).pipe(res);
    return;
  }

  if (pathname.startsWith('/storage/download/') && req.method === 'GET') {
    if (!requireAuth(req, res)) return;

    const relativePath = getRouteRelativePath(pathname, '/storage/download/');
    const resolvedPath = resolveStoragePath(relativePath, { allowEmpty: true });

    if (!resolvedPath || !resolvedPath.relativePath || !fs.existsSync(resolvedPath.absolutePath)) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('File not found');
      return;
    }

    const stat = fs.statSync(resolvedPath.absolutePath);
    if (stat.isDirectory()) {
      res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Folder download is not supported yet');
      return;
    }

    const contentType = mime.lookup(resolvedPath.absolutePath) || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': stat.size,
      'Content-Disposition': `attachment; filename="${path.basename(resolvedPath.relativePath)}"`,
      'Accept-Ranges': 'bytes'
    });

    fs.createReadStream(resolvedPath.absolutePath).pipe(res);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Storage route not found');
}

module.exports = { handle };
