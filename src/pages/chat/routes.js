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
        fs.rmSync(path.join(FILES_DIR, fileName), { force: true });
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
