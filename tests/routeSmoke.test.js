const assert = require('assert');
const { Readable } = require('stream');

process.env.STORAGE_PASSWORD = process.env.STORAGE_PASSWORD || 'test-password';

const server = require('../Server2');
const requestHandler = server.listeners('request')[0];

function basicAuth(password = process.env.STORAGE_PASSWORD) {
  return `Basic ${Buffer.from(`:${password}`).toString('base64')}`;
}

function invoke(pathname, options = {}) {
  return new Promise((resolve, reject) => {
    const body = options.body || '';
    const req = Readable.from(body ? [body] : []);
    req.url = pathname;
    req.method = options.method || 'GET';
    req.headers = options.headers || {};

    const chunks = [];
    const res = {
      statusCode: 200,
      headers: {},
      setHeader(name, value) {
        this.headers[name.toLowerCase()] = value;
      },
      writeHead(statusCode, headers = {}) {
        this.statusCode = statusCode;
        for (const [name, value] of Object.entries(headers)) {
          this.headers[name.toLowerCase()] = value;
        }
      },
      write(chunk) {
        if (chunk) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk)));
      },
      end(chunk) {
        if (chunk) this.write(chunk);
        resolve({
          statusCode: this.statusCode,
          headers: this.headers,
          body: Buffer.concat(chunks).toString()
        });
      },
      on() {
        return this;
      }
    };

    try {
      requestHandler(req, res);
    } catch (error) {
      reject(error);
    }
  });
}

(async () => {
  const sandbox = await invoke('/sandbox');
  assert.strictEqual(sandbox.statusCode, 200);
  assert.match(sandbox.body, /\/sandbox\/assets\//);

  const sandboxCss = await invoke('/sandbox/assets/index-BQ2BYKP8.css');
  assert.strictEqual(sandboxCss.statusCode, 200);
  assert.match(sandboxCss.headers['content-type'], /^text\/css/);

  const traversal = await invoke('/sandbox/../sandboxRoutes.js');
  assert.strictEqual(traversal.statusCode, 403);

  const shooterTraversal = await invoke('/shooter-game/../Server2.js');
  assert.notStrictEqual(shooterTraversal.statusCode, 200);

  const gameTheory = await invoke('/game-theory');
  assert.strictEqual(gameTheory.statusCode, 200);
  assert.match(gameTheory.body, /Game Theory Arcade/);

  const gameTheoryJs = await invoke('/game-theory/app.js');
  assert.strictEqual(gameTheoryJs.statusCode, 200);
  assert.match(gameTheoryJs.headers['content-type'], /^application\/javascript/);

  const gameTheoryTraversal = await invoke('/game-theory/../Server2.js');
  assert.notStrictEqual(gameTheoryTraversal.statusCode, 200);

  const simulatorTraversal = await invoke('/simulator/../simulatorRoutes.js', {
    headers: { authorization: basicAuth() }
  });
  assert.strictEqual(simulatorTraversal.statusCode, 404);

  const cloudUnauthed = await invoke('/cloudconsole');
  assert.strictEqual(cloudUnauthed.statusCode, 200);

  const execute = await invoke('/api/cloudconsole/execute', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      language: 'javascript',
      code: 'console.log(2 + 2)'
    })
  });
  assert.strictEqual(execute.statusCode, 200);
  assert.deepStrictEqual(JSON.parse(execute.body), { success: true, output: '4\n' });

  const bashUnauthed = await invoke('/api/cloudconsole/execute', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      language: 'bash',
      code: 'echo blocked'
    })
  });
  assert.strictEqual(bashUnauthed.statusCode, 401);

  const bashAuthed = await invoke('/api/cloudconsole/execute', {
    method: 'POST',
    headers: {
      authorization: basicAuth(),
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      language: 'bash',
      code: 'echo allowed'
    })
  });
  assert.strictEqual(bashAuthed.statusCode, 200);
  assert.deepStrictEqual(JSON.parse(bashAuthed.body), { success: true, output: 'allowed\n' });

  const unknown = await invoke('/not-a-real-route');
  assert.strictEqual(unknown.statusCode, 404);

  console.log('Route smoke tests passed');
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
