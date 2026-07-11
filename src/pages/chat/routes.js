const crypto = require('crypto');
const fs = require('fs');
const mime = require('mime-types');
const path = require('path');
const { isPathInside, readJsonBody, sendJson } = require('../../shared/routeHelpers');

const PUBLIC_DIR = path.join(__dirname, 'public');
const DEFAULT_DATA_DIR = process.env.WEBSITE_SITE_NAME && process.env.HOME
  ? path.join(process.env.HOME, 'data', 'public-chat')
  : path.join(__dirname, 'data');
const DATA_DIR = path.resolve(process.env.CHAT_DATA_DIR || DEFAULT_DATA_DIR);
const FILES_DIR = path.join(DATA_DIR, 'files');
const MESSAGES_PATH = path.join(DATA_DIR, 'messages.json');
const MAX_FILE_BYTES = 500 * 1024 * 1024;
const MAX_TEXT_CHARS = 4000;
const MAX_NAME_CHARS = 32;
const MAX_FILENAME_CHARS = 180;
const folderUploads = new Map();

const PUBLIC_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8'
};

function cleanSingleLine(value, maxLength) {
  return String(value || '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, maxLength);
}

function readMessages() {
  try {
    const messages = JSON.parse(fs.readFileSync(MESSAGES_PATH, 'utf8'));
    return Array.isArray(messages) ? messages : [];
  } catch (error) {
    if (error.code !== 'ENOENT') console.error('Could not read public chat messages:', error);
    return [];
  }
}

function writeMessages(messages) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const temporaryPath = `${MESSAGES_PATH}.${process.pid}.${Date.now()}.tmp`;
  fs.writeFileSync(temporaryPath, JSON.stringify(messages, null, 2));
  fs.renameSync(temporaryPath, MESSAGES_PATH);
}

function addMessage(message) {
  const messages = readMessages();
  messages.push(message);
  writeMessages(messages);
}

function makeBaseMessage(name, type) {
  return {
    id: crypto.randomUUID(),
    name,
    type,
    createdAt: new Date().toISOString()
  };
}

function servePublicFile(req, res, pathname) {
  const relativePath = pathname === '/chat' || pathname === '/chat/'
    ? 'index.html'
    : pathname.slice('/chat/'.length);
  const filePath = path.resolve(PUBLIC_DIR, relativePath);

  if (!isPathInside(PUBLIC_DIR, filePath)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Forbidden');
    return;
  }

  const extension = path.extname(filePath).toLowerCase();
  if (!PUBLIC_TYPES[extension] || !fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Chat page file not found');
    return;
  }

  const stat = fs.statSync(filePath);
  res.writeHead(200, {
    'Content-Type': PUBLIC_TYPES[extension],
    'Content-Length': stat.size,
    'Cache-Control': extension === '.html' ? 'no-store' : 'public, max-age=3600'
  });
  if (req.method === 'HEAD') res.end();
  else fs.createReadStream(filePath).pipe(res);
}

function uploadFile(req, res, url) {
  const name = cleanSingleLine(url.searchParams.get('name'), MAX_NAME_CHARS);
  const originalName = cleanSingleLine(url.searchParams.get('filename'), MAX_FILENAME_CHARS);
  const contentLength = Number(req.headers['content-length'] || 0);

  if (!name || !originalName) {
    sendJson(res, 400, { ok: false, error: 'Your name and a file name are required.' });
    return;
  }
  if (contentLength > MAX_FILE_BYTES) {
    sendJson(res, 413, { ok: false, error: 'Files must be 500 MB or smaller.' });
    return;
  }

  fs.mkdirSync(FILES_DIR, { recursive: true });
  const message = makeBaseMessage(name, 'file');
  const storedName = message.id;
  const temporaryPath = path.join(FILES_DIR, `.upload-${storedName}`);
  const finalPath = path.join(FILES_DIR, storedName);
  const output = fs.createWriteStream(temporaryPath, { flags: 'wx' });
  let receivedBytes = 0;
  let finished = false;

  function removeTemporaryFile() {
    try {
      fs.unlinkSync(temporaryPath);
    } catch (error) {
      if (error.code !== 'ENOENT') console.error('Could not clean up chat upload:', error);
    }
  }

  function fail(statusCode, error) {
    if (finished) return;
    finished = true;
    output.destroy();
    removeTemporaryFile();
    if (!res.headersSent) sendJson(res, statusCode, { ok: false, error });
  }

  req.on('data', chunk => {
    receivedBytes += chunk.length;
    if (receivedBytes > MAX_FILE_BYTES) {
      fail(413, 'Files must be 500 MB or smaller.');
      req.destroy();
    }
  });
  req.on('aborted', () => fail(499, 'The upload was cancelled.'));
  req.on('error', () => fail(500, 'The upload could not be received.'));
  output.on('error', () => fail(500, 'The file could not be saved.'));

  output.on('finish', () => {
    if (finished) return;
    try {
      fs.renameSync(temporaryPath, finalPath);
      message.file = {
        name: originalName,
        size: receivedBytes,
        mimeType: cleanSingleLine(req.headers['content-type'], 120) || 'application/octet-stream'
      };
      addMessage(message);
      finished = true;
      sendJson(res, 201, { ok: true, message });
    } catch (error) {
      console.error('Could not finish chat upload:', error);
      fail(500, 'The uploaded file could not be saved.');
    }
  });

  req.pipe(output);
}

function safeFolderPath(value) {
  const cleaned = String(value || '').replace(/\\/g, '/').replace(/^\/+/, '');
  if (!cleaned || cleaned.includes('\0') || cleaned.split('/').some(part => !part || part === '.' || part === '..')) return '';
  return cleaned.slice(0, 500);
}

async function startFolderUpload(req, res) {
  try {
    const body = await readJsonBody(req, { maxBytes: 16 * 1024 });
    const name = cleanSingleLine(body.name, MAX_NAME_CHARS);
    const folderName = cleanSingleLine(body.folderName, MAX_FILENAME_CHARS);
    const totalSize = Number(body.totalSize);
    const fileCount = Number(body.fileCount);
    if (!name || !folderName || !Number.isSafeInteger(totalSize) || totalSize < 0 || totalSize > MAX_FILE_BYTES ||
        !Number.isSafeInteger(fileCount) || fileCount < 1 || fileCount > 10000) {
      sendJson(res, 400, { ok: false, error: 'Choose a valid folder no larger than 500 MB.' });
      return;
    }
    const uploadId = crypto.randomUUID();
    const temporaryDirectory = path.join(FILES_DIR, `.upload-folder-${uploadId}`);
    fs.mkdirSync(temporaryDirectory, { recursive: true });
    folderUploads.set(uploadId, { name, folderName, totalSize, fileCount, receivedBytes: 0, files: [], temporaryDirectory });
    sendJson(res, 201, { ok: true, uploadId });
  } catch (error) {
    sendJson(res, error.statusCode || 500, { ok: false, error: error.message });
  }
}

function uploadFolderFile(req, res, uploadId, url) {
  const upload = folderUploads.get(uploadId);
  const relativePath = safeFolderPath(url.searchParams.get('path'));
  const contentLength = Number(req.headers['content-length'] || 0);
  if (!upload || !relativePath) {
    sendJson(res, 404, { ok: false, error: 'Folder upload not found or file path is invalid.' });
    return;
  }
  if (upload.files.some(file => file.path === relativePath) || contentLength < 0 || upload.receivedBytes + contentLength > MAX_FILE_BYTES) {
    sendJson(res, 413, { ok: false, error: 'The folder must be 500 MB or smaller and cannot contain duplicate paths.' });
    return;
  }

  const finalPath = path.resolve(upload.temporaryDirectory, relativePath);
  if (!isPathInside(upload.temporaryDirectory, finalPath)) {
    sendJson(res, 400, { ok: false, error: 'Invalid folder file path.' });
    return;
  }
  fs.mkdirSync(path.dirname(finalPath), { recursive: true });
  const temporaryPath = `${finalPath}.upload`;
  const output = fs.createWriteStream(temporaryPath, { flags: 'wx' });
  let receivedBytes = 0;
  let finished = false;

  const fail = (statusCode, error) => {
    if (finished) return;
    finished = true;
    output.destroy();
    fs.rmSync(temporaryPath, { force: true });
    if (!res.headersSent) sendJson(res, statusCode, { ok: false, error });
  };
  req.on('data', chunk => {
    receivedBytes += chunk.length;
    if (upload.receivedBytes + receivedBytes > MAX_FILE_BYTES) {
      fail(413, 'The folder must be 500 MB or smaller.');
      req.destroy();
    }
  });
  req.on('aborted', () => fail(499, 'The upload was cancelled.'));
  req.on('error', () => fail(500, 'The file could not be received.'));
  output.on('error', () => fail(500, 'The file could not be saved.'));
  output.on('finish', () => {
    if (finished) return;
    fs.renameSync(temporaryPath, finalPath);
    upload.receivedBytes += receivedBytes;
    upload.files.push({ path: relativePath, size: receivedBytes });
    finished = true;
    sendJson(res, 201, { ok: true });
  });
  req.pipe(output);
}

function finishFolderUpload(res, uploadId) {
  const upload = folderUploads.get(uploadId);
  if (!upload || upload.files.length !== upload.fileCount || upload.receivedBytes !== upload.totalSize) {
    sendJson(res, 400, { ok: false, error: 'The folder upload is incomplete.' });
    return;
  }
  const message = makeBaseMessage(upload.name, 'folder');
  const finalDirectory = path.join(FILES_DIR, message.id);
  try {
    fs.renameSync(upload.temporaryDirectory, finalDirectory);
    message.folder = { name: upload.folderName, size: upload.receivedBytes, fileCount: upload.files.length, files: upload.files };
    addMessage(message);
    folderUploads.delete(uploadId);
    sendJson(res, 201, { ok: true, message });
  } catch (error) {
    sendJson(res, 500, { ok: false, error: 'The folder could not be saved.' });
  }
}

function serveFolderFile(req, res, id, url) {
  const relativePath = safeFolderPath(url.searchParams.get('path'));
  const message = readMessages().find(item => item.id === id && item.type === 'folder');
  const item = message && message.folder && message.folder.files.find(file => file.path === relativePath);
  const folderDirectory = path.join(FILES_DIR, id);
  const filePath = path.resolve(folderDirectory, relativePath || '');
  if (!item || !isPathInside(folderDirectory, filePath) || !fs.existsSync(filePath)) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Folder file not found');
    return;
  }
  const fileName = path.basename(relativePath);
  const safeAsciiName = fileName.replace(/[^\x20-\x7e]/g, '_').replace(/["\\]/g, '_');
  const stat = fs.statSync(filePath);
  res.writeHead(200, {
    'Content-Type': mime.lookup(fileName) || 'application/octet-stream',
    'Content-Length': stat.size,
    'Content-Disposition': `attachment; filename="${safeAsciiName}"; filename*=UTF-8''${encodeURIComponent(fileName)}`
  });
  if (req.method === 'HEAD') res.end();
  else fs.createReadStream(filePath).pipe(res);
}

function serveUploadedFile(req, res, id) {
  if (!/^[0-9a-f-]{36}$/i.test(id)) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('File not found');
    return;
  }

  const message = readMessages().find(item => item.id === id && item.type === 'file');
  const filePath = path.join(FILES_DIR, id);
  if (!message || !message.file || !fs.existsSync(filePath)) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('File not found');
    return;
  }

  const stat = fs.statSync(filePath);
  const safeAsciiName = message.file.name.replace(/[^\x20-\x7e]/g, '_').replace(/["\\]/g, '_');
  const encodedName = encodeURIComponent(message.file.name);
  res.writeHead(200, {
    'Content-Type': mime.lookup(message.file.name) || 'application/octet-stream',
    'Content-Length': stat.size,
    'Content-Disposition': `attachment; filename="${safeAsciiName}"; filename*=UTF-8''${encodedName}`,
    'Cache-Control': 'private, max-age=3600'
  });
  if (req.method === 'HEAD') res.end();
  else fs.createReadStream(filePath).pipe(res);
}

function clearChat(res) {
  try {
    fs.mkdirSync(FILES_DIR, { recursive: true });
    for (const fileName of fs.readdirSync(FILES_DIR)) {
      if (!fileName.startsWith('.upload-')) {
        fs.rmSync(path.join(FILES_DIR, fileName), { force: true, recursive: true });
      }
    }
    writeMessages([]);
    sendJson(res, 200, { ok: true });
  } catch (error) {
    console.error('Could not clear public chat:', error);
    sendJson(res, 500, { ok: false, error: 'The chat could not be cleared.' });
  }
}

async function handle(req, res) {
  const url = new URL(req.url, 'http://localhost');
  const { pathname } = url;

  if (pathname === '/chat/api/messages' && req.method === 'GET') {
    sendJson(res, 200, { messages: readMessages() });
    return;
  }

  if (pathname === '/chat/api/messages' && req.method === 'POST') {
    try {
      const body = await readJsonBody(req, { maxBytes: 16 * 1024 });
      const name = cleanSingleLine(body.name, MAX_NAME_CHARS);
      const text = typeof body.text === 'string' ? body.text.trim().slice(0, MAX_TEXT_CHARS) : '';
      if (!name || !text) {
        sendJson(res, 400, { ok: false, error: 'Your name and a message are required.' });
        return;
      }
      const message = { ...makeBaseMessage(name, 'text'), text };
      addMessage(message);
      sendJson(res, 201, { ok: true, message });
    } catch (error) {
      sendJson(res, error.statusCode || 500, { ok: false, error: error.message });
    }
    return;
  }

  if (pathname === '/chat/api/files' && req.method === 'POST') {
    uploadFile(req, res, url);
    return;
  }

  if (pathname === '/chat/api/folders' && req.method === 'POST') {
    await startFolderUpload(req, res);
    return;
  }

  const folderUploadMatch = pathname.match(/^\/chat\/api\/folders\/([0-9a-f-]{36})\/files$/i);
  if (folderUploadMatch && req.method === 'POST') {
    uploadFolderFile(req, res, folderUploadMatch[1], url);
    return;
  }

  const folderFinishMatch = pathname.match(/^\/chat\/api\/folders\/([0-9a-f-]{36})\/finish$/i);
  if (folderFinishMatch && req.method === 'POST') {
    finishFolderUpload(res, folderFinishMatch[1]);
    return;
  }

  const folderDownloadMatch = pathname.match(/^\/chat\/folders\/([0-9a-f-]{36})$/i);
  if (folderDownloadMatch && (req.method === 'GET' || req.method === 'HEAD')) {
    serveFolderFile(req, res, folderDownloadMatch[1], url);
    return;
  }

  if (pathname.startsWith('/chat/files/') && (req.method === 'GET' || req.method === 'HEAD')) {
    serveUploadedFile(req, res, pathname.slice('/chat/files/'.length));
    return;
  }

  if (pathname === '/chat/api/messages' && req.method === 'DELETE') {
    clearChat(res);
    return;
  }

  if ((req.method === 'GET' || req.method === 'HEAD') &&
      (pathname === '/chat' || pathname === '/chat/' || pathname === '/chat/styles.css' || pathname === '/chat/app.js')) {
    servePublicFile(req, res, pathname);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Chat route not found');
}

module.exports = { handle };
