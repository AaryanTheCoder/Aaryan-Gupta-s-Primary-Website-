const assert = require('node:assert/strict');
const server = require('../src/server');
const handler = server.listeners('request')[0];

function request(url, method = 'GET') {
  return new Promise((resolve, reject) => {
    // Fail if a handler forgets to finish its response.
    const timer = setTimeout(() => reject(new Error(`No response: ${url}`)), 2000);
    const headers = {};
    const res = {
      setHeader(name, value) { headers[name.toLowerCase()] = value; },
      writeHead(status, values = {}) {
        this.status = status;
        for (const [key, value] of Object.entries(values)) this.setHeader(key, value);
      },
      end(body) {
        clearTimeout(timer);
        resolve({ status: this.status, headers, body: body ? Buffer.from(body) : Buffer.alloc(0) });
      }
    };
    handler({ url, method, headers: {} }, res);
  });
}

(async () => {
  for (const url of ['/badui', '/badui/', '/badui?test=1']) {
    const response = await request(url);
    assert.equal(response.status, 200);
    assert.match(response.body.toString(), /Broken Thermometer/);
    assert.match(response.body.toString(), /<base href="\/badui\/">/);
    assert.doesNotMatch(response.body.toString(), /gemini-widget/);
  }
  for (const file of ['BrokenThermometer.js', 'thermometer.css', 'pushup-counter.js',
    'repair-puzzle.js', 'models/pose_landmarker_lite.task', 'shooter-game/',
    'shooter-game/game.js', 'shooter-game/engine.js', 'shooter-game/style.css', 'shooter-game/peter.webp']) {
    const response = await request('/badui/' + file);
    assert.equal(response.status, 200, file);
    assert.ok(response.body.length > 0, file);
    const head = await request('/badui/' + file, 'HEAD');
    assert.equal(head.status, 200);
    assert.equal(head.body.length, 0);
    assert.equal(head.headers['content-type'], response.headers['content-type']);
  }
  const shooter = await request('/badui/shooter-game/');
  assert.match(shooter.body.toString(), /src="\/badui\/shooter-game\/peter.webp"/);
  assert.doesNotMatch(shooter.body.toString(), /(?:src|href)="\/shooter-game\//);
  for (const url of ['/badui/missing.js', '/badui/pushup_server.py', '/badui/%2e%2e/server.js', '/badui/models/']) {
    assert.equal((await request(url)).status, 404, url);
  }
  const post = await request('/badui/', 'POST');
  assert.equal(post.status, 405);
  assert.equal(post.headers.allow, 'GET, HEAD');
  assert.match((await request('/')).body.toString(), /href="\/badui"/);
  console.log('Bad UI route tests passed.');
})().catch(error => { console.error(error); process.exitCode = 1; });
