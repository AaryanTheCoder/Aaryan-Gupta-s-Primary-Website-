const assert = require('assert');
const http = require('http');
const WebSocket = require('ws');
const tablockerRoutes = require('../tablockerRoutes');

function listen(server) {
  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      server.off('error', reject);
      resolve(server.address().port);
    });
  });
}

function close(server) {
  return new Promise(resolve => server.close(resolve));
}

function requestJson(port, path, options = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: '127.0.0.1',
      port,
      path,
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    }, res => {
      let body = '';
      res.on('data', chunk => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          resolve({
            statusCode: res.statusCode,
            body: JSON.parse(body || '{}')
          });
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', reject);
    if (options.body) req.write(JSON.stringify(options.body));
    req.end();
  });
}

function waitForMessage(ws, predicate, label) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      cleanup();
      reject(new Error(`Timed out waiting for ${label}`));
    }, 3000);

    function cleanup() {
      clearTimeout(timeout);
      ws.off('message', onMessage);
      ws.off('error', onError);
    }

    function onError(error) {
      cleanup();
      reject(error);
    }

    function onMessage(raw) {
      const message = JSON.parse(String(raw));
      if (predicate(message)) {
        cleanup();
        resolve(message);
      }
    }

    ws.on('message', onMessage);
    ws.on('error', onError);
  });
}

function openSocket(url) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(url);
    ws.once('open', () => resolve(ws));
    ws.once('error', reject);
  });
}

(async () => {
  const server = http.createServer((req, res) => {
    if (req.url === '/tablocker' || req.url.startsWith('/tablocker/')) {
      tablockerRoutes.handle(req, res);
      return;
    }
    res.writeHead(404);
    res.end();
  });

  server.on('upgrade', (req, socket, head) => {
    if (tablockerRoutes.handleUpgrade(req, socket, head)) return;
    socket.destroy();
  });

  let port;
  try {
    port = await listen(server);
  } catch (error) {
    if (error.code === 'EPERM') {
      console.log('TabLocker backend smoke tests skipped: localhost listen is blocked in this environment');
      return;
    }
    throw error;
  }

  try {
    const health = await requestJson(port, '/tablocker/health');
    assert.strictEqual(health.statusCode, 200);
    assert.strictEqual(health.body.ok, true);

    const created = await requestJson(port, '/tablocker/api/rooms', {
      method: 'POST',
      body: {}
    });
    assert.strictEqual(created.statusCode, 201);
    assert.match(created.body.code, /^\d{6}$/);
    assert.ok(created.body.hostToken);

    const wsUrl = `ws://127.0.0.1:${port}/tablocker/ws`;
    const host = await openSocket(wsUrl);
    const student = await openSocket(wsUrl);

    host.send(JSON.stringify({
      type: 'joinHost',
      code: created.body.code,
      hostToken: created.body.hostToken
    }));
    await waitForMessage(host, message => message.type === 'roster', 'initial host roster');

    student.send(JSON.stringify({
      type: 'joinStudent',
      code: created.body.code,
      studentId: 'student-1',
      name: 'Smoke Student'
    }));

    await waitForMessage(host, message => (
      message.type === 'roster' &&
      message.students.some(student => student.id === 'student-1')
    ), 'student roster update');

    host.send(JSON.stringify({
      type: 'lockStudent',
      code: created.body.code,
      hostToken: created.body.hostToken,
      studentId: 'student-1',
      command: {
        action: 'remoteStartLock',
        seconds: 60
      }
    }));

    const command = await waitForMessage(student, message => (
      message.type === 'command' &&
      message.command?.action === 'remoteStartLock'
    ), 'student lock command');

    assert.strictEqual(command.command.seconds, 60);
    host.close();
    student.close();
  } finally {
    await close(server);
  }

  console.log('TabLocker backend smoke tests passed');
})().catch(error => {
  console.error(error);
  process.exit(1);
});
