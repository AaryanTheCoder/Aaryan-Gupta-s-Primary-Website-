const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { Readable } = require('stream');

const chatDataDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'chat-file-share-safety-'));
process.env.CHAT_DATA_DIR = chatDataDirectory;
const chatRoutes = require('../src/pages/chat/routes');

function invoke(pathname, options = {}) {
  return new Promise((resolve, reject) => {
    const body = options.body === undefined ? '' : options.body;
    const buffer = Buffer.isBuffer(body) ? body : Buffer.from(String(body));
    const req = Readable.from(buffer.length ? [buffer] : []);
    req.url = pathname;
    req.method = options.method || 'GET';
    req.headers = {
      ...(buffer.length ? { 'content-length': String(buffer.length) } : {}),
      ...(options.headers || {})
    };

    const chunks = [];
    const res = {
      statusCode: 200,
      headers: {},
      headersSent: false,
      writeHead(statusCode, headers = {}) {
        this.statusCode = statusCode;
        this.headers = headers;
        this.headersSent = true;
      },
      end(chunk) {
        if (chunk) chunks.push(Buffer.from(String(chunk)));
        resolve({
          statusCode: this.statusCode,
          headers: this.headers,
          body: Buffer.concat(chunks).toString()
        });
      }
    };

    Promise.resolve(chatRoutes.handle(req, res)).catch(reject);
  });
}

(async () => {
  try {
    const start = await invoke('/chat/api/folders', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: 'Tester', folderName: 'project', totalSize: 5, fileCount: 1 })
    });
    assert.strictEqual(start.statusCode, 201);
    const uploadId = JSON.parse(start.body).uploadId;

    const upload = await invoke(`/chat/api/folders/${uploadId}/files?path=notes%2Fhello.txt`, {
      method: 'POST',
      body: 'hello'
    });
    assert.strictEqual(upload.statusCode, 201);

    const overlappingPath = await invoke(`/chat/api/folders/${uploadId}/files?path=notes`, {
      method: 'POST',
      body: ''
    });
    assert.strictEqual(overlappingPath.statusCode, 409);
    assert.match(JSON.parse(overlappingPath.body).error, /overlapping/i);

    const duplicateLiveFiles = await invoke('/chat/api/streams', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        name: 'Tester',
        title: 'project',
        kind: 'folder',
        totalSize: 0,
        fileCount: 2,
        files: [
          { path: 'notes.txt', size: 0 },
          { path: 'notes.txt', size: 0 }
        ]
      })
    });
    assert.strictEqual(duplicateLiveFiles.statusCode, 400);

    const overlappingLiveFiles = await invoke('/chat/api/streams', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        name: 'Tester',
        title: 'project',
        kind: 'folder',
        totalSize: 0,
        fileCount: 2,
        files: [
          { path: 'notes', size: 0 },
          { path: 'notes/today.txt', size: 0 }
        ]
      })
    });
    assert.strictEqual(overlappingLiveFiles.statusCode, 400);

    const chatClient = fs.readFileSync(path.join(__dirname, '../src/pages/chat/public/app.js'), 'utf8');
    assert.match(chatClient, /parts\.slice\(1\)\.join\('\/'\)/);

    console.log('File-share safety tests passed.');
  } finally {
    fs.rmSync(chatDataDirectory, { force: true, recursive: true });
  }
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
