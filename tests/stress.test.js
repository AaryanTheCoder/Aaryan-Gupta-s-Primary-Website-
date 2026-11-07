const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const M = require('../src/pages/stress/public/metrics');
const { createKernel } = require('../src/pages/stress/public/cpu-kernels');
const routes = require('../src/pages/stress/routes');
const publicDir = path.join(__dirname, '../src/pages/stress/public');
const source = name => fs.readFileSync(path.join(publicDir, name), 'utf8');
const tick = () => new Promise(resolve => setImmediate(resolve));

async function route(url, method = 'GET') {
  return new Promise(resolve => {
    const res = { writeHead(status, headers) { this.status = status; this.headers = headers; },
      end(body) { resolve({ status: this.status, headers: this.headers, body: body?.toString() || '' }); } };
    routes.handle({ url, method }, res);
  });
}

// Tiny DOM/worker doubles exercise the actual page controller without stressing hardware.
function page(options = {}) {
  const elements = {};
  const documentEvents = {};
  const workers = [];
  const storage = new Map();
  let gpuRuns = 0;
  let gpuDisposals = 0;
  class Element {
    constructor() {
      this.children = []; this.listeners = {}; this.disabled = false; this.value = '';
      this.checked = false; this.textContent = ''; this.firstChild = { textContent: '' };
      this.classList = { add() {}, remove() {} };
    }
    addEventListener(name, handler) { this.listeners[name] = handler; }
    appendChild(child) { this.children.push(child); }
    replaceChildren() { this.children = []; }
    replaceWith(element) { elements[this.id] = element; }
    setAttribute() {}
    getContext() { return { clearRect() {}, beginPath() {}, moveTo() {}, lineTo() {}, stroke() {} }; }
  }
  const html = source('index.html');
  for (const match of html.matchAll(/id="([^"]+)"/g)) { const el = new Element(); el.id = match[1]; elements[el.id] = el; }
  elements.mode.value = options.mode || 'full'; elements.preset.value = 'quick';
  elements.graphics.value = options.profile || 'auto';
  const document = { hidden: false, getElementById: id => elements[id], createElement: () => new Element(),
    addEventListener(name, fn) { documentEvents[name] = fn; } };
  class Worker {
    constructor() { this.terminated = false; workers.push(this); }
    postMessage(data) {
      if (data.type === 'prepare') {
        this.kind = data.kind;
        queueMicrotask(() => this.onmessage({ data: { type: 'ready' } }));
      } else if (!options.holdWorkers) {
        queueMicrotask(() => {
          if (this.terminated) return;
          if (options.workerError) { this.onerror(); return; }
          this.onmessage({ data: { type: 'sample', rate: M.REFERENCES[this.kind] * 2, elapsed: 500 } });
          this.onmessage({ data: { type: 'done', units: M.REFERENCES[this.kind] * 6,
            errors: options.calculationError ? 1 : 0, startedAt: 1000, endedAt: 4000, elapsed: 3000 } });
        });
      }
    }
    terminate() { this.terminated = true; }
  }
  class GPU {
    constructor(_canvas, config) {
      if (options.noGPU) throw new Error('WebGL unavailable');
      this.renderer = options.software ? 'llvmpipe' : 'Test GPU'; this.timer = null;
      this.api = options.webgl1 ? 'WebGL1' : 'WebGL2';
      this.rendererType = options.software ? 'software' : 'driver';
      this.width = config.profile === 'maximum' ? 1920 : options.software ? 320 : 1280;
      this.height = this.width * 9 / 16;
      this.profile = `${this.api} / ${this.rendererType} / ${this.width}×${this.height}`;
    }
    async run(kind, duration, signal, onSample, onReady) {
      gpuRuns++;
      if (options.gpuError) throw new Error('GPU context lost');
      signal.throwIfAborted(); onReady(); onSample(M.REFERENCES[kind] * 2);
      return { kind, rate: M.REFERENCES[kind] * 2, elapsed: duration, frames: 10,
        frameTimes: [10, 11, 10, 12, 10, 11, 10, 12, 10, 11], gpuTimes: [],
        profile: this.profile, rendererType: this.rendererType,
        samples: Array.from({ length: 6 }, (_, i) => ({ elapsed: i * 500, rate: M.REFERENCES[kind] * 2 })) };
    }
    dispose() { gpuDisposals++; }
  }
  const context = { window: { StressMetrics: M, StressGPU: GPU, Worker, addEventListener() {} },
    document, Worker, navigator: { hardwareConcurrency: 2, userAgent: 'Test Chromium', deviceMemory: 8 },
    localStorage: { getItem: k => storage.get(k) || null, setItem: (k, v) => storage.set(k, v), removeItem: k => storage.delete(k) },
    performance, AbortController, Blob, URL, setTimeout, clearTimeout, setInterval, clearInterval };
  vm.runInNewContext(source('stress.js'), context);
  return { elements, workers, storage, document, documentEvents, gpuRuns: () => gpuRuns, gpuDisposals: () => gpuDisposals,
    start() { elements.consent.checked = true; return elements.start.listeners.click(); } };
}

async function testController() {
  const full = page();
  assert.strictEqual(full.workers.length, 0, 'Page load must never start CPU work');
  assert.strictEqual(full.gpuRuns(), 0, 'Page load must never start GPU work');
  assert(full.elements.start.disabled, 'Start needs heat/load acknowledgment');
  await full.start();
  assert.strictEqual(full.elements['run-state'].textContent, 'COMPLETE');
  assert.strictEqual(full.elements['results-body'].children.length, 8);
  assert.strictEqual(full.gpuRuns(), 2);
  assert.strictEqual(full.gpuDisposals(), 1);
  assert(full.workers.every(w => w.terminated));
  assert(!full.elements.download.disabled);
  const history = JSON.parse([...full.storage.values()][0]);
  assert(Math.abs(history[0].scores.single - 2000) < 1e-6);
  assert(Math.abs(history[0].scores.multi - 4000) < 1e-6);
  assert(Math.abs(history[0].scores.overall - M.geometricMean([2000, 4000, 2000])) < 1e-6);

  const cpu = page({ mode: 'cpu', noGPU: true });
  await cpu.start();
  assert.strictEqual(cpu.elements['run-state'].textContent, 'COMPLETE', 'CPU-only must work without WebGL');
  assert.strictEqual(cpu.gpuRuns(), 0);
  assert.strictEqual(cpu.elements['overall-score'].textContent, '—');

  const graphics = page({ mode: 'gpu' });
  await graphics.start();
  assert.strictEqual(graphics.workers.length, 0);
  assert.strictEqual(graphics.elements.errors.textContent, 'N/A');
  assert.strictEqual(graphics.elements['run-state'].textContent, 'COMPLETE');

  const combined = page({ mode: 'combined' });
  await combined.start();
  assert.strictEqual(combined.elements['run-state'].textContent, 'COMPLETE');
  assert.strictEqual(combined.elements['overall-score'].textContent, '—');
  assert.strictEqual(combined.elements['results-body'].children.length, 2);

  const software = page({ mode: 'full', software: true });
  await software.start();
  assert.strictEqual(software.elements['run-state'].textContent, 'COMPLETE');
  assert.strictEqual(software.elements['graphics-label'].textContent, 'GRAPHICS · SOFTWARE');
  assert.match(software.elements['renderer-note'].textContent, /CPU draws/);
  assert.strictEqual(software.elements['render-resolution'].textContent, '320 × 180');
  const savedSoftware = JSON.parse([...software.storage.values()][0])[0];
  assert.strictEqual(savedSoftware.system.rendererType, 'software');
  assert.match(savedSoftware.settings.resolvedGraphicsProfile, /software/);
  assert(savedSoftware.scores.overall > 0, 'Software rendering still receives clearly labeled scores');
  const maximum = page({ mode: 'gpu', profile: 'maximum' });
  await maximum.start();
  assert.strictEqual(maximum.elements['render-resolution'].textContent, '1920 × 1080');

  for (const hidden of [false, true]) {
    const pending = page({ mode: 'cpu', holdWorkers: true });
    const running = pending.start(); await tick();
    if (hidden) { pending.document.hidden = true; pending.documentEvents.visibilitychange(); }
    else pending.elements.stop.listeners.click();
    await running;
    assert(pending.workers.every(w => w.terminated), 'Cancellation must terminate every worker');
    assert.strictEqual(pending.elements['run-state'].textContent, 'INCOMPLETE');
    assert.strictEqual(pending.storage.size, 0, 'Canceled runs must not be saved');
    assert(pending.elements.download.disabled);
    assert(!pending.elements.settings.disabled);
  }

  for (const options of [{ workerError: true }, { calculationError: true }, { noGPU: true },
    { mode: 'combined', holdWorkers: true, gpuError: true }]) {
    const failed = page(options); await failed.start();
    assert.strictEqual(failed.elements['run-state'].textContent, 'INCOMPLETE');
    assert.strictEqual(failed.storage.size, 0);
    assert(failed.workers.every(w => w.terminated), 'Failure must cancel sibling CPU work');
    assert(failed.elements.download.disabled);
  }
  const rerun = page({ mode: 'cpu' });
  await rerun.start(); await rerun.start();
  assert.strictEqual(JSON.parse([...rerun.storage.values()][0]).length, 2);
}

function testWorker() {
  const messages = [];
  let time = 0;
  const scope = { importScripts() {}, StressKernels: { createKernel }, self: { postMessage: m => messages.push(m) },
    performance: { timeOrigin: 0, now: () => time += 100 }, setTimeout: fn => fn() };
  vm.runInNewContext(source('cpu-worker.js'), scope);
  for (const kind of ['integer', 'float', 'memory']) {
    messages.length = 0;
    scope.self.onmessage({ data: { type: 'prepare', kind } });
    assert.strictEqual(messages[0].type, 'ready');
    scope.self.onmessage({ data: { type: 'start', startAt: 0, duration: 100 } });
    assert(messages.some(m => m.type === 'done' && m.errors === 0 && m.units > 0));
  }
  scope.StressKernels.createKernel = () => ({ units: 1, run: () => -1 });
  messages.length = 0;
  scope.self.onmessage({ data: { type: 'prepare', kind: 'integer' } });
  assert.strictEqual(messages[0].type, 'error', 'Bad arithmetic must fail before scoring');
}

async function testGPU() {
  async function run(options = {}) {
    let time = 0;
    let lost = false;
    let deletedQueries = 0;
    let queries = 0;
    const ext = { TIME_ELAPSED_EXT: 201, GPU_DISJOINT_EXT: 202 };
    const gl = {};
    for (const [i, name] of ['VERTEX_SHADER', 'FRAGMENT_SHADER', 'COMPILE_STATUS', 'LINK_STATUS', 'TEXTURE_2D',
      'RGBA', 'UNSIGNED_BYTE', 'TEXTURE_MIN_FILTER', 'TEXTURE_MAG_FILTER', 'LINEAR', 'RENDERER',
      'QUERY_RESULT_AVAILABLE', 'QUERY_RESULT', 'TRIANGLES', 'SYNC_GPU_COMMANDS_COMPLETE',
      'WAIT_FAILED', 'TIMEOUT_EXPIRED', 'HIGH_FLOAT', 'ARRAY_BUFFER', 'STATIC_DRAW', 'FLOAT', 'SCISSOR_TEST'].entries()) gl[name] = i + 1;
    gl.NO_ERROR = 0;
    for (const name of ['shaderSource', 'compileShader', 'attachShader', 'linkProgram', 'useProgram',
      'bindVertexArray', 'bindTexture', 'texImage2D', 'texParameteri', 'viewport', 'uniform1i', 'uniform1f', 'uniform2f',
      'drawArrays', 'endQuery', 'flush', 'deleteSync', 'deleteTexture', 'deleteVertexArray', 'deleteProgram', 'deleteShader',
      'bindBuffer', 'bufferData', 'enableVertexAttribArray', 'vertexAttribPointer', 'deleteBuffer', 'enable', 'disable', 'scissor']) gl[name] = () => {};
    for (const name of ['createProgram', 'createShader', 'createVertexArray', 'createTexture', 'getUniformLocation', 'fenceSync', 'createBuffer']) gl[name] = () => ({});
    gl.getShaderPrecisionFormat = () => ({ precision: options.lowPrecision ? 0 : 23 });
    gl.getAttribLocation = () => 0;
    const shaderSources = [];
    gl.shaderSource = (_shader, source) => shaderSources.push(source);
    gl.getShaderParameter = () => !options.badShader;
    gl.getProgramParameter = () => true;
    gl.isContextLost = () => options.contextLost || lost;
    gl.getError = () => options.glError ? 99 : 0;
    const readbacks = [];
    gl.readPixels = (_x, _y, w, h, _format, _type, pixels) => {
      assert(pixels.length >= w * h * 4, 'Readback buffer must fit every tile pixel');
      readbacks.push([w, h]); pixels[3] = 255;
    };
    gl.clientWaitSync = () => options.waitFail ? gl.WAIT_FAILED : 999;
    gl.createQuery = () => { queries++; return {}; };
    gl.deleteQuery = () => { deletedQueries++; };
    gl.beginQuery = () => {};
    gl.getQueryParameter = (_q, what) => what === gl.QUERY_RESULT_AVAILABLE ? true : 2e6;
    gl.getParameter = what => what === ext.GPU_DISJOINT_EXT ? Boolean(options.disjoint) : options.software ? 'SwiftShader' : 'Test GPU';
    gl.getExtension = name => name === 'WEBGL_lose_context' ? { loseContext() { lost = true; } }
      : name === 'EXT_disjoint_timer_query_webgl2' && options.timer ? ext : null;
    const scope = { window: {}, performance: { now: () => time += 50 },
      setTimeout: callback => queueMicrotask(callback) };
    vm.runInNewContext(source('gpu.js'), scope);
    const contextRequests = [];
    const canvas = { getContext: (name, attributes) => {
      contextRequests.push(name);
      assert.strictEqual(attributes.failIfMajorPerformanceCaveat, false, 'Do not block software contexts');
      if (name === 'webgl2' && options.throwWebGL2) throw new Error('Unsupported context');
      return options.unavailable || options.webgl1 && name === 'webgl2' ? null : gl;
    } };
    const gpu = new scope.window.StressGPU(canvas, { profile: options.profile });
    if (gpu.api === 'WebGL1') {
      assert(contextRequests.includes('webgl'));
      assert.match(shaderSources[0], /attribute vec2 aPosition/);
      assert.match(shaderSources[1], /gl_FragColor/);
      assert.match(shaderSources[1], /texture2D\(/);
      assert.doesNotMatch(shaderSources[1], /#version|out vec4 color|\btexture\(/);
    }
    let result;
    try {
      const controller = new AbortController();
      if (options.abort) controller.abort(new Error('Stopped'));
      result = await gpu.run('raymarch', options.longer ? 10000 : 1000, controller.signal,
        () => { if (options.abortDuring) controller.abort(new Error('Stopped')); }, () => {});
      assert((result.completedPixels > 0 || result.frames > 0) && result.rate > 0);
      assert.strictEqual(result.resolution.join('x'), `${gpu.width}x${gpu.height}`);
      if (gpu.tiled) {
        assert(readbacks.every(([w, h]) => w > 1 && w <= 64 && h > 1 && h <= 64));
        assert(result.completedPixels >= result.frames * gpu.width * gpu.height);
        assert(result.completedPixels < (result.frames + 1) * gpu.width * gpu.height);
      }
    } finally { gpu.dispose(); }
    assert(lost, 'Release the GPU context');
    assert.strictEqual(queries, deletedQueries, 'Every query must be released');
    return result;
  }
  assert((await run()).gpuTimes.length === 0, 'Optional GPU timers must not be required');
  assert((await run({ timer: true })).gpuTimes.length > 0);
  const disjoint = await run({ timer: true, disjoint: true });
  assert(disjoint.discardedTimers > 0 && disjoint.gpuTimes.length === 0);
  const software = await run({ software: true });
  assert.strictEqual(software.rendererType, 'software');
  assert.strictEqual(software.resolution.join('x'), '320x180');
  assert.strictEqual(software.timingMethod, 'tiled-readback-64');
  assert.strictEqual(software.frames, 0, 'A partial slow frame still produces a completed-pixel measurement');
  assert.strictEqual((await run({ webgl1: true, lowPrecision: true })).precision, 'mediump');
  assert.strictEqual((await run({ throwWebGL2: true })).api, 'WebGL1');
  assert((await run({ webgl1: true, longer: true })).frames > 0);
  assert.strictEqual((await run({ software: true, profile: 'maximum' })).resolution.join('x'), '1920x1080');
  for (const options of [{ unavailable: true }, { badShader: true }, { profile: 'invalid' },
    { webgl1: true, abortDuring: true }, { software: true, abortDuring: true },
    { contextLost: true }, { waitFail: true }, { glError: true }, { abort: true }]) {
    await assert.rejects(run(options));
  }
}

(async () => {
  assert(Math.abs(M.cpuScore(M.REFERENCES) - 1000) < 1e-8);
  const doubled = Object.fromEntries(Object.entries(M.REFERENCES).map(([k, v]) => [k, v * 2]));
  assert(Math.abs(M.cpuScore(doubled) - 2000) < 1e-8, 'Doubling all rates must double the score');
  for (const values of [[], [0], [null], [undefined], [NaN], [-1], [Infinity]]) assert.strictEqual(M.geometricMean(values), null);
  assert.strictEqual(M.cpuScore({ integer: 1, float: 1 }), null, 'Missing workloads must not receive a score');
  assert.strictEqual(M.percentile([4, 2, 1, 3], .5), 2);
  assert.strictEqual(M.summarize([]), null);
  assert.strictEqual(M.summarize([100, 100, 100, 50, 50, 50]).retentionPercent, 50);
  assert.strictEqual(M.summarize([1, 2]).retentionPercent, null, 'Do not infer retention from too few samples');
  assert.strictEqual(M.summarize([10, 10, 10]).cvPercent, 0);
  const expected = { integer: 3454037081, float: 1.3295804189183849, memory: 3833200640 };
  // Only two tiny blocks per kernel; never run a real stress suite in CI.
  for (const kind of Object.keys(expected)) {
    const kernel = createKernel(kind);
    for (let i = 0; i < 2; i++) {
      const value = kernel.run();
      if (kind === 'float') assert(Math.abs(value - expected[kind]) < 1e-10);
      else assert.strictEqual(value, expected[kind]);
    }
  }
  for (const url of ['/stress', '/stress/', '/stress?view=1']) {
    const result = await route(url); assert.strictEqual(result.status, 200); assert.match(result.body, /Stress Lab/);
  }
  for (const name of ['stress.js', 'stress.css', 'metrics.js', 'cpu-worker.js', 'cpu-kernels.js', 'gpu.js']) {
    const result = await route(`/stress/${name}?v=1`); assert.strictEqual(result.status, 200);
    assert.match(result.headers['Content-Type'], name.endsWith('.js') ? /javascript/ : /text\/css/);
  }
  assert.strictEqual((await route('/stress', 'HEAD')).body, '');
  assert.strictEqual((await route('/stress/stress.js', 'HEAD')).body, '');
  assert.strictEqual((await route('/stress', 'POST')).status, 405);
  for (const url of ['/stress/nope', '/stress/../routes.js', '/stress/%2e%2e/routes.js', '/stress/toString', '/stress/__proto__']) {
    assert.strictEqual((await route(url)).status, 404);
  }
  testWorker();
  await testGPU();
  await testController();
  console.log('Stress tests passed (tiny kernels and simulated workloads; no sustained CPU/GPU load).');
})().catch(error => { console.error(error); process.exitCode = 1; });
