const assert = require('assert');
const http = require('http');
const WebSocket = require('ws');

process.env.STORAGE_PASSWORD = 'test-password';
const streamRoutes = require('../src/pages/stream/routes');

function listen(server) {
  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      server.off('error', reject);
      resolve(server.address().port);
    });
  });
}

function openSocket(url) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(url, {
      headers: { authorization: `Basic ${Buffer.from(':test-password').toString('base64')}` }
    });
    ws.once('open', () => resolve(ws));
    ws.once('error', reject);
  });
}

function waitForMessage(ws, predicate, label) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error(`Timed out waiting for ${label}`)), 2000);
    const onMessage = (data, isBinary) => {
      const message = isBinary ? data : JSON.parse(data.toString());
      if (!predicate(message, isBinary)) return;
      clearTimeout(timeout);
      ws.off('message', onMessage);
      resolve(message);
    };
    ws.on('message', onMessage);
  });
}

(async () => {
  const server = http.createServer((req, res) => streamRoutes.handle(req, res));
  server.on('upgrade', (req, socket, head) => {
    if (streamRoutes.handleUpgrade(req, socket, head)) return;
    socket.destroy();
  });

  let port;
  try {
    port = await listen(server);
  } catch (error) {
    if (error.code === 'EPERM') {
      console.log('Stream relay smoke test skipped: localhost listen is blocked in this environment');
      return;
    }
    throw error;
  }

  const url = `ws://127.0.0.1:${port}/stream/ws`;
  const broadcaster = await openSocket(url);
  const viewer = await openSocket(url);
  try {
    const claimed = waitForMessage(broadcaster, message => message.type === 'broadcasterClaimed', 'broadcaster claim');
    broadcaster.send(JSON.stringify({ type: 'startBroadcast' }));
    await claimed;

    const receivedFrame = waitForMessage(viewer, (message, isBinary) => isBinary && Buffer.from(message).equals(Buffer.from([1, 2, 3])), 'relayed frame');
    broadcaster.send(Buffer.from([1, 2, 3]));
    await receivedFrame;
  } finally {
    broadcaster.close();
    viewer.close();
    await new Promise(resolve => server.close(resolve));
  }

  console.log('Stream relay tests passed.');
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
