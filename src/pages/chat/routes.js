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
const MAX_FILE_BYTES = 200 * 1024 * 1024;
const LIVE_CHUNK_BYTES = 32 * 1024 * 1024;
const LIVE_TRANSFER_TTL_MS = 6 * 60 * 60 * 1000;
const MAX_TEXT_CHARS = 4000;
const MAX_NAME_CHARS = 32;
const MAX_FILENAME_CHARS = 180;
const folderUploads = new Map();
const liveTransfers = new Map();

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

function updateMessage(id, updater) {
  const messages = readMessages();
  const index = messages.findIndex(message => message.id === id);
  if (index < 0) return null;
  const next = updater(messages[index]);
  messages[index] = next || messages[index];
  writeMessages(messages);
  return messages[index];
}

function makeBaseMessage(name, type) {
  return {
    id: crypto.randomUUID(),
    name,
    type,
    createdAt: new Date().toISOString()
  };
}

function hashPin(pin) {
  return crypto.createHash('sha256').update(String(pin)).digest('hex');
}

function cleanPin(value) {
  const pin = String(value || '').trim();
  return /^\d{4}$/.test(pin) ? pin : '';
}

function cleanLiveFilePath(value) {
  const cleaned = String(value || '')
    .replace(/\\/g, '/')
    .replace(/^\/+/, '')
    .split('/')
    .map(part => cleanSingleLine(part, 120))
    .filter(part => part && part !== '.' && part !== '..')
    .join('/');
  return cleaned.slice(0, 500);
}

function cleanLiveFiles(files) {
  if (!Array.isArray(files)) return [];
  return files.slice(0, 10000).map((file, index) => {
    const pathName = cleanLiveFilePath(file && file.path) || `file-${index + 1}`;
    const size = Number(file && file.size);
    return {
      path: pathName,
      size: Number.isSafeInteger(size) && size >= 0 ? size : 0
    };
  });
}

function setLiveMessageStatus(id, status, extras = {}) {
  updateMessage(id, message => {
    if (!message.stream) return message;
    return {
      ...message,
      stream: {
        ...message.stream,
        ...extras,
        status
      }
    };
  });
}

function cleanupLiveTransfers() {
  const cutoff = Date.now() - LIVE_TRANSFER_TTL_MS;
  for (const [id, transfer] of liveTransfers.entries()) {
    if (transfer.updatedAt >= cutoff && !['completed', 'cancelled', 'failed'].includes(transfer.status)) continue;
    if (transfer.pendingReceiver) {
      transfer.pendingReceiver.res.writeHead(410, { 'Content-Type': 'text/plain; charset=utf-8' });
      transfer.pendingReceiver.res.end('Live transfer is no longer available');
    }
    liveTransfers.delete(id);
  }
}

setInterval(cleanupLiveTransfers, 10 * 60 * 1000).unref?.();

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
    sendJson(res, 413, { ok: false, error: 'Saved uploads must be 200 MB or smaller. Use live transfer for bigger files.' });
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
      fail(413, 'Saved uploads must be 200 MB or smaller. Use live transfer for bigger files.');
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
      sendJson(res, 400, { ok: false, error: 'Choose a valid saved folder no larger than 200 MB, or use live transfer.' });
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
    sendJson(res, 413, { ok: false, error: 'The saved folder must be 200 MB or smaller and cannot contain duplicate paths.' });
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
      fail(413, 'The saved folder must be 200 MB or smaller.');
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

async function createLiveStreamInvite(req, res) {
  try {
    cleanupLiveTransfers();
    const body = await readJsonBody(req, { maxBytes: 1024 * 1024 });
    const name = cleanSingleLine(body.name, MAX_NAME_CHARS);
    const title = cleanSingleLine(body.title, MAX_FILENAME_CHARS);
    const kind = body.kind === 'folder' ? 'folder' : 'file';
    const totalSize = Number(body.totalSize);
    const fileCount = Number(body.fileCount);
    const files = cleanLiveFiles(body.files);
    const pin = cleanPin(body.pin);

    if (!name || !title || !Number.isSafeInteger(totalSize) || totalSize < 0 ||
        !Number.isSafeInteger(fileCount) || fileCount < 1 || fileCount !== files.length) {
      sendJson(res, 400, { ok: false, error: 'Choose a valid live transfer.' });
      return;
    }

    const calculatedSize = files.reduce((sum, file) => sum + file.size, 0);
    if (calculatedSize !== totalSize) {
      sendJson(res, 400, { ok: false, error: 'The live transfer size does not match the selected files.' });
      return;
    }

    const message = makeBaseMessage(name, 'stream');
    const senderToken = crypto.randomBytes(32).toString('hex');
    const transfer = {
      id: message.id,
      senderToken,
      receiverToken: '',
      receiverName: '',
      status: 'waiting',
      pinHash: pin ? hashPin(pin) : '',
      title,
      kind,
      totalSize,
      fileCount,
      files,
      nextSeq: 0,
      currentChunk: null,
      pendingReceiver: null,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    liveTransfers.set(message.id, transfer);
    message.stream = {
      title,
      kind,
      totalSize,
      fileCount,
      files,
      pinRequired: Boolean(pin),
      status: 'waiting',
      chunkBytes: LIVE_CHUNK_BYTES
    };
    addMessage(message);
    sendJson(res, 201, { ok: true, message, senderToken, chunkBytes: LIVE_CHUNK_BYTES });
  } catch (error) {
    sendJson(res, error.statusCode || 500, { ok: false, error: error.message });
  }
}

function getLiveTransfer(id) {
  cleanupLiveTransfers();
  return liveTransfers.get(id);
}

function requireLiveSender(req, res, transfer) {
  if (transfer && transfer.senderToken === req.headers['x-sender-token']) return true;
  sendJson(res, 403, { ok: false, error: 'Live transfer sender token is invalid.' });
  return false;
}

function liveStreamStatus(req, res, id) {
  const transfer = getLiveTransfer(id);
  if (!transfer) {
    sendJson(res, 404, { ok: false, error: 'Live transfer not found.' });
    return;
  }
  if (!requireLiveSender(req, res, transfer)) return;
  transfer.updatedAt = Date.now();
  sendJson(res, 200, {
    ok: true,
    status: transfer.status,
    receiverName: transfer.receiverName,
    nextSeq: transfer.nextSeq,
    chunkBytes: LIVE_CHUNK_BYTES
  });
}

async function acceptLiveStream(req, res, id) {
  try {
    const transfer = getLiveTransfer(id);
    const body = await readJsonBody(req, { maxBytes: 16 * 1024 });
    const name = cleanSingleLine(body.name, MAX_NAME_CHARS);
    const pin = cleanPin(body.pin);

    if (!transfer) {
      sendJson(res, 404, { ok: false, error: 'Live transfer not found. The sender may need to share it again.' });
      return;
    }
    if (!name) {
      sendJson(res, 400, { ok: false, error: 'Your name is required.' });
      return;
    }
    if (transfer.status !== 'waiting') {
      sendJson(res, 409, { ok: false, error: 'This live transfer has already been accepted or ended.' });
      return;
    }
    if (transfer.pinHash && hashPin(pin) !== transfer.pinHash) {
      sendJson(res, 403, { ok: false, error: 'Incorrect PIN.' });
      return;
    }

    transfer.receiverToken = crypto.randomBytes(32).toString('hex');
    transfer.receiverName = name;
    transfer.status = 'accepted';
    transfer.updatedAt = Date.now();
    setLiveMessageStatus(id, 'accepted', { acceptedBy: name });
    sendJson(res, 200, {
      ok: true,
      receiverToken: transfer.receiverToken,
      stream: {
        title: transfer.title,
        kind: transfer.kind,
        totalSize: transfer.totalSize,
        fileCount: transfer.fileCount,
        files: transfer.files,
        chunkBytes: LIVE_CHUNK_BYTES
      }
    });
  } catch (error) {
    sendJson(res, error.statusCode || 500, { ok: false, error: error.message });
  }
}

function collectLiveChunk(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let totalBytes = 0;
    let oversized = false;

    req.on('data', chunk => {
      const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
      totalBytes += buffer.length;
      if (totalBytes > LIVE_CHUNK_BYTES) {
        oversized = true;
        req.destroy();
        return;
      }
      chunks.push(buffer);
    });

    req.on('end', () => {
      if (!oversized) resolve(Buffer.concat(chunks));
    });

    req.on('error', error => {
      if (oversized) {
        const tooLarge = new Error('Live transfer chunks must be 32 MB or smaller.');
        tooLarge.statusCode = 413;
        reject(tooLarge);
        return;
      }
      reject(error);
    });
  });
}

function sendLiveChunkResponse(res, chunk, transfer) {
  res.writeHead(200, {
    'Content-Type': 'application/octet-stream',
    'Content-Length': chunk.data.length,
    'Cache-Control': 'no-store',
    'X-Stream-Seq': String(chunk.seq),
    'X-File-Index': String(chunk.fileIndex),
    'X-File-Path': encodeURIComponent(chunk.filePath),
    'X-File-Offset': String(chunk.offset),
    'X-File-Done': chunk.fileDone ? '1' : '0',
    'X-Transfer-Done': chunk.transferDone ? '1' : '0'
  });
  res.end(chunk.data, () => {
    if (transfer.currentChunk === chunk) transfer.currentChunk = null;
    if (chunk.resolveConsumed) chunk.resolveConsumed();
  });
}

function waitForChunkConsumed(transfer, chunk) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      if (transfer.currentChunk === chunk) transfer.currentChunk = null;
      reject(new Error('The receiver stopped taking live transfer chunks.'));
    }, 120000);
    timeout.unref?.();
    chunk.resolveConsumed = () => {
      clearTimeout(timeout);
      resolve();
    };
  });
}

async function uploadLiveChunk(req, res, id, url) {
  try {
    const transfer = getLiveTransfer(id);
    if (!transfer) {
      sendJson(res, 404, { ok: false, error: 'Live transfer not found.' });
      return;
    }
    if (!requireLiveSender(req, res, transfer)) return;
    if (transfer.status !== 'accepted') {
      sendJson(res, 409, { ok: false, error: 'Wait for someone to accept this live transfer first.' });
      return;
    }
    if (transfer.currentChunk) {
      sendJson(res, 429, { ok: false, error: 'The receiver is still downloading the previous live chunk.' });
      return;
    }

    const seq = Number(url.searchParams.get('seq'));
    const fileIndex = Number(url.searchParams.get('fileIndex'));
    const offset = Number(url.searchParams.get('offset'));
    const fileDone = url.searchParams.get('fileDone') === '1';
    const transferDone = url.searchParams.get('transferDone') === '1';
    const file = transfer.files[fileIndex];

    if (!Number.isSafeInteger(seq) || seq !== transfer.nextSeq ||
        !Number.isSafeInteger(fileIndex) || !file ||
        !Number.isSafeInteger(offset) || offset < 0) {
      sendJson(res, 409, { ok: false, error: 'Live transfer chunk order is invalid.' });
      return;
    }

    const data = await collectLiveChunk(req);
    const chunk = {
      seq,
      fileIndex,
      filePath: file.path,
      offset,
      fileDone,
      transferDone,
      data
    };

    transfer.nextSeq += 1;
    transfer.updatedAt = Date.now();
    const consumedPromise = waitForChunkConsumed(transfer, chunk);

    if (transfer.pendingReceiver && transfer.pendingReceiver.expectedSeq === seq) {
      const pending = transfer.pendingReceiver;
      transfer.pendingReceiver = null;
      clearTimeout(pending.timeout);
      sendLiveChunkResponse(pending.res, chunk, transfer);
    } else {
      transfer.currentChunk = chunk;
    }

    await consumedPromise;
    if (transferDone) {
      transfer.status = 'completed';
      setLiveMessageStatus(id, 'completed', { completedAt: new Date().toISOString() });
    }
    sendJson(res, 200, { ok: true, seq });
  } catch (error) {
    sendJson(res, error.statusCode || 500, { ok: false, error: error.message });
  }
}

function nextLiveChunk(req, res, id, url) {
  const transfer = getLiveTransfer(id);
  const receiverToken = url.searchParams.get('receiverToken') || '';
  const expectedSeq = Number(url.searchParams.get('seq'));

  if (!transfer || transfer.receiverToken !== receiverToken) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Live transfer not found');
    return;
  }
  if (!Number.isSafeInteger(expectedSeq) || expectedSeq < 0) {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Invalid live transfer sequence');
    return;
  }
  if (transfer.status === 'cancelled' || transfer.status === 'failed') {
    res.writeHead(410, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Live transfer ended');
    return;
  }
  if (transfer.currentChunk && transfer.currentChunk.seq === expectedSeq) {
    const chunk = transfer.currentChunk;
    sendLiveChunkResponse(res, chunk, transfer);
    return;
  }
  if (transfer.status === 'completed' && expectedSeq >= transfer.nextSeq) {
    res.writeHead(204, { 'Cache-Control': 'no-store' });
    res.end();
    return;
  }

  if (transfer.pendingReceiver) {
    transfer.pendingReceiver.res.writeHead(409, { 'Content-Type': 'text/plain; charset=utf-8' });
    transfer.pendingReceiver.res.end('Another receiver request replaced this one');
    clearTimeout(transfer.pendingReceiver.timeout);
  }

  const timeout = setTimeout(() => {
    if (transfer.pendingReceiver && transfer.pendingReceiver.res === res) {
      transfer.pendingReceiver = null;
      res.writeHead(204, { 'Cache-Control': 'no-store' });
      res.end();
    }
  }, 25000);
  timeout.unref?.();
  transfer.pendingReceiver = { res, expectedSeq, timeout };
  transfer.updatedAt = Date.now();
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
    for (const transfer of liveTransfers.values()) {
      if (transfer.pendingReceiver) {
        transfer.pendingReceiver.res.writeHead(410, { 'Content-Type': 'text/plain; charset=utf-8' });
        transfer.pendingReceiver.res.end('Chat was cleared');
      }
    }
    liveTransfers.clear();
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

  if (pathname === '/chat/api/streams' && req.method === 'POST') {
    await createLiveStreamInvite(req, res);
    return;
  }

  const streamStatusMatch = pathname.match(/^\/chat\/api\/streams\/([0-9a-f-]{36})\/status$/i);
  if (streamStatusMatch && req.method === 'GET') {
    liveStreamStatus(req, res, streamStatusMatch[1]);
    return;
  }

  const streamAcceptMatch = pathname.match(/^\/chat\/api\/streams\/([0-9a-f-]{36})\/accept$/i);
  if (streamAcceptMatch && req.method === 'POST') {
    await acceptLiveStream(req, res, streamAcceptMatch[1]);
    return;
  }

  const streamChunkMatch = pathname.match(/^\/chat\/api\/streams\/([0-9a-f-]{36})\/chunks$/i);
  if (streamChunkMatch && req.method === 'POST') {
    await uploadLiveChunk(req, res, streamChunkMatch[1], url);
    return;
  }

  const streamNextMatch = pathname.match(/^\/chat\/api\/streams\/([0-9a-f-]{36})\/chunks\/next$/i);
  if (streamNextMatch && req.method === 'GET') {
    nextLiveChunk(req, res, streamNextMatch[1], url);
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
