const assert = require('assert/strict');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const crypto = require('crypto');
const { indexedDB, IDBKeyRange } = require('fake-indexeddb');

// Exercise the actual checked-in WASM, archive extraction, grammar, and model.
// This is a worker test with an in-memory IndexedDB, not a browser/mic test.
async function main() {
  const { RANK_GRAMMAR, parseRank } = await import('../src/pages/cards/public/ranks.mjs');
  const root = path.join(__dirname, '../src/pages/cards/public/voice-assets');
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json')));
  for (const [file, digest] of Object.entries(manifest.sha256)) {
    assert.equal(
      crypto
        .createHash('sha256')
        .update(fs.readFileSync(path.join(root, file)))
        .digest('hex'),
      digest,
      `Voice asset changed: ${file}`
    );
  }
  const messages = [];
  const listeners = [];
  const context = vm.createContext({
    console: { log() {}, warn() {}, error: (...args) => console.error(...args) },
    URL,
    TextDecoder,
    TextEncoder,
    WebAssembly,
    indexedDB,
    IDBKeyRange,
    Date,
    Uint8Array,
    Int8Array,
    Uint16Array,
    Int16Array,
    Uint32Array,
    Int32Array,
    Float32Array,
    Float64Array,
    ArrayBuffer,
    DataView,
    crypto: crypto.webcrypto,
    performance,
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval,
    location: { href: 'https://cards.test/cards/voice-assets/vosk-worker-0.0.8.js' },
    addEventListener(type, callback) {
      if (type === 'message') listeners.push(callback);
    },
    postMessage(message) {
      if (message) messages.push(message);
    },
    close() {},
    // WASM is embedded as a data URI. Throwing here uses its built-in data decoder.
    XMLHttpRequest: class {
      open() {
        throw new Error('No external requests in the worker test.');
      }
    },
    async fetch(url) {
      assert.equal(
        String(url),
        'https://cards.test/cards/voice-assets/vosk-model-small-en-us-0.15.tar.gz'
      );
      const data = fs.readFileSync(path.join(root, 'vosk-model-small-en-us-0.15.tar.gz'));
      return new Response(data, { headers: { 'Content-Length': String(data.length) } });
    }
  });
  context.self = context;
  vm.runInContext(fs.readFileSync(path.join(root, 'vosk-worker-0.0.8.js'), 'utf8'), context);
  const send = (data) => listeners.forEach((listener) => listener({ data }));
  async function until(predicate) {
    const deadline = Date.now() + 45000;
    while (Date.now() < deadline) {
      const error = messages.find((message) => message.event === 'error');
      if (error) throw new Error(error.error);
      const result = messages.find(predicate);
      if (result) return result;
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
    throw new Error('Voice worker timed out.');
  }
  send({ action: 'set', key: 'logLevel', value: -2 });
  send({ action: 'load', modelUrl: '/cards/voice-assets/vosk-model-small-en-us-0.15.tar.gz' });
  assert.equal((await until((message) => message.event === 'load')).result, true);
  send({
    action: 'create',
    recognizerId: 'rank-test',
    sampleRate: 16000,
    grammar: JSON.stringify(RANK_GRAMMAR)
  });
  send({ action: 'set', recognizerId: 'rank-test', key: 'words', value: true });
  let data = new Float32Array(16000 * 2);
  const samplePath = process.env.CARDS_VOICE_SAMPLE;
  if (samplePath) {
    const wav = fs.readFileSync(samplePath);
    assert.equal(wav.toString('ascii', 0, 4), 'RIFF');
    let offset = 12;
    let pcm;
    while (offset + 8 <= wav.length) {
      const id = wav.toString('ascii', offset, offset + 4);
      const size = wav.readUInt32LE(offset + 4);
      if (id === 'fmt ') {
        assert.equal(wav.readUInt16LE(offset + 8), 1);
        assert.equal(wav.readUInt16LE(offset + 10), 1);
        assert.equal(wav.readUInt32LE(offset + 12), 16000);
        assert.equal(wav.readUInt16LE(offset + 22), 16);
      }
      if (id === 'data') pcm = wav.subarray(offset + 8, offset + 8 + size);
      offset += 8 + size + (size % 2);
    }
    assert.ok(pcm);
    data = new Float32Array(pcm.length / 2 + 16000);
    for (let i = 0; i < pcm.length / 2; i++) data[i] = pcm.readInt16LE(i * 2);
  }
  for (let i = 0; i < data.length; i += 4096)
    send({
      action: 'audioChunk',
      recognizerId: 'rank-test',
      sampleRate: 16000,
      data: data.slice(i, i + 4096)
    });
  send({ action: 'retrieveFinalResult', recognizerId: 'rank-test' });
  await until((message) => message.event === 'result');
  const texts = messages
    .filter((message) => message.event === 'result')
    .map((message) => message.result.text)
    .filter(Boolean);
  if (samplePath) {
    const valid = texts
      .map((text) =>
        parseRank(
          text,
          Array.from({ length: 13 }, (_, i) => i + 1)
        )
      )
      .filter(Boolean);
    assert.ok(valid.length, `No rank recognised from sample: ${texts.join('; ')}`);
    if (process.env.CARDS_EXPECT_RANK)
      assert.ok(valid.includes(Number(process.env.CARDS_EXPECT_RANK)));
    console.log(`Voice sample recognised: ${texts.join('; ')}`);
  } else assert.equal(texts.length, 0, 'Silence must not become a rank.');
  send({ action: 'terminate' });
  console.log(
    'Real Vosk runtime passed: verified assets, archive/model loading, rank grammar, and silence rejection.'
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
