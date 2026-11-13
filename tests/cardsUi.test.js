const assert = require('assert/strict');
const fs = require('fs');
const path = require('path');
const { JSDOM, VirtualConsole } = require('jsdom');
const { GameHub } = require('../src/pages/cards/rooms');
const { makeDeck } = require('../src/pages/cards/deck');
const root = path.join(__dirname, '../src/pages/cards/public');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const flush = () => new Promise((resolve) => setTimeout(resolve, 15));
let checks = 0;
async function test(name, fn) {
  try {
    await fn();
    checks++;
  } catch (error) {
    error.message = `${name}: ${error.message}`;
    throw error;
  }
}
class Track {
  constructor(kind) {
    this.kind = kind;
    this.readyState = 'live';
  }
  stop() {
    this.readyState = 'ended';
  }
}
class Stream {
  constructor(tracks = []) {
    this.tracks = tracks.slice();
  }
  addTrack(track) {
    this.tracks.push(track);
  }
  removeTrack(track) {
    this.tracks = this.tracks.filter((t) => t !== track);
  }
  getTracks() {
    return this.tracks.slice();
  }
  getVideoTracks() {
    return this.tracks.filter((t) => t.kind === 'video');
  }
  getAudioTracks() {
    return this.tracks.filter((t) => t.kind === 'audio');
  }
}
class AudioNode {
  constructor() {
    this.port = {};
    this.gain = { value: 1 };
  }
  connect(node) {
    return node;
  }
  disconnect() {}
}
function moduleSource(file) {
  return fs
    .readFileSync(path.join(root, file), 'utf8')
    .replace(/^import\s[\s\S]*?from ['"][^'"]+['"];\s*/gm, '')
    .replace(/\bexport /g, '');
}
function evaluateModule(w, file, names) {
  w.eval(
    `Object.assign(window, (() => { ${moduleSource(file)}\n return { ${names.join(',')} }; })());`
  );
}

async function fixture(count = 3, options = {}) {
  let clock = Date.now();
  const hub = new GameHub({ now: () => clock });
  const clients = [];
  const errors = [];
  async function add(name, settings = {}) {
    const virtualConsole = new VirtualConsole();
    virtualConsole.on('jsdomError', (error) => errors.push(error));
    const dom = new JSDOM(html, {
      url: 'https://cards.test/cards',
      runScripts: 'outside-only',
      pretendToBeVisual: true,
      virtualConsole
    });
    const w = dom.window;
    const $ = (selector) => w.document.querySelector(selector);
    const client = {
      w,
      $,
      settings,
      requests: [],
      tracks: [],
      models: [],
      recognizers: [],
      contexts: []
    };
    clients.push(client);
    w.HTMLDialogElement.prototype.showModal = function () {
      this.open = true;
    };
    w.HTMLDialogElement.prototype.close = function (value = '') {
      this.returnValue = value;
      this.open = false;
      this.dispatchEvent(new w.Event('close'));
    };
    w.HTMLMediaElement.prototype.play = function () {
      if (client.blockAudio && !this.muted) return Promise.reject(new Error('Autoplay blocked'));
      Object.defineProperty(this, 'paused', { value: false, configurable: true });
      return Promise.resolve();
    };
    w.MediaStream = Stream;
    if (settings.phone)
      Object.defineProperty(w.navigator, 'userAgent', {
        value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)'
      });
    Object.defineProperty(w.navigator, 'mediaDevices', {
      value: {
        getUserMedia: async (constraints) => {
          client.requests.push(constraints);
          const kind = constraints.audio ? 'audio' : 'video';
          if (kind === 'audio' && settings.denyAudio) throw new Error('Permission denied');
          const track = new Track(kind);
          client.tracks.push(track);
          const stream = new Stream([track]);
          if (kind === 'audio' && client.pauseAudio) {
            client.pauseAudio = false;
            await new Promise((resolve) => {
              client.resolveAudio = resolve;
            });
          }
          return stream;
        }
      }
    });
    w.RTCPeerConnection = class {
      constructor() {
        this.transceivers = [];
        this.signalingState = 'stable';
      }
      addTransceiver(track) {
        const kind = typeof track === 'string' ? track : track.kind;
        this.transceivers.push({
          receiver: { track: { kind } },
          sender: { replaceTrack: () => Promise.resolve() }
        });
      }
      getTransceivers() {
        return this.transceivers;
      }
      close() {
        this.signalingState = 'closed';
      }
    };
    w.AudioContext = class {
      constructor() {
        this.state = 'running';
        this.sampleRate = 48000;
        this.destination = new AudioNode();
        this.audioWorklet = {
          addModule: async (url) => {
            assert.equal(url, '/cards/rank-audio-worklet.js');
          }
        };
        client.contexts.push(this);
      }
      resume() {
        return Promise.resolve();
      }
      close() {
        this.state = 'closed';
        return Promise.resolve();
      }
      createMediaStreamSource(stream) {
        this.stream = stream;
        return new AudioNode();
      }
      createGain() {
        return new AudioNode();
      }
    };
    w.AudioWorkletNode = AudioNode;
    w.Vosk = {
      Model: class {
        constructor(url) {
          assert.equal(url, '/cards/voice-assets/vosk-model-small-en-us-0.15.tar.gz');
          client.models.push(this);
          this.listeners = {};
          this.worker = {
            terminate: () => {
              this.terminated = true;
            }
          };
          this.KaldiRecognizer = class {
            constructor(sampleRate, grammar) {
              this.listeners = {};
              this.grammar = JSON.parse(grammar);
              client.recognizers.push(this);
            }
            on(name, fn) {
              this.listeners[name] = fn;
            }
            setWords(value) {
              this.words = value;
            }
            acceptWaveformFloat() {}
            retrieveFinalResult() {
              this.emit('');
            }
            remove() {
              this.removed = true;
            }
            emit(text, conf = 0.99) {
              this.listeners.result?.({
                result: { text, result: text ? [{ word: text, conf }] : [] }
              });
            }
          };
          queueMicrotask(() =>
            settings.failModel
              ? this.listeners.error?.({ error: 'failed' })
              : this.listeners.load?.({ result: true })
          );
        }
        on(name, fn) {
          this.listeners[name] = fn;
        }
      }
    };
    w.WebSocket = class extends w.EventTarget {
      static OPEN = 1;
      constructor() {
        super();
        client.socket = this;
        this.readyState = 0;
        this.peer = hub.connect(
          (message) =>
            queueMicrotask(() =>
              this.dispatchEvent(new w.MessageEvent('message', { data: JSON.stringify(message) }))
            ),
          () => this.close()
        );
        queueMicrotask(() => {
          this.readyState = 1;
          this.dispatchEvent(new w.Event('open'));
        });
      }
      send(data) {
        hub.receive(this.peer, JSON.parse(data));
      }
      close() {
        this.readyState = 3;
        hub.disconnect(this.peer);
        this.dispatchEvent(new w.Event('close'));
      }
    };
    // Module boundaries are kept in separate closures. Only imports/exports are
    // bridged for this DOM-only test; the production module bodies run unchanged.
    evaluateModule(w, 'ranks.mjs', [
      'parseRank',
      'RANK_GRAMMAR',
      'RANK_NAMES',
      'cardsForDrag',
      'canDropCards'
    ]);
    evaluateModule(w, 'media.js', ['TableCall']);
    evaluateModule(w, 'phone.js', ['BluffPhoneLayout']);
    evaluateModule(w, 'voice.js', ['VoiceDeclaration']);
    w.eval(`(() => { ${moduleSource('app.js')} })();`);
    await flush();
    $('#nickname').value = name;
    $('#joinForm').dispatchEvent(new w.Event('submit', { bubbles: true, cancelable: true }));
    await flush();
    client.id = [...hub.sessions.values()].find((s) => s.name === name).id;
    return client;
  }
  for (let i = 0; i < count; i++) await add(`Player ${i}`, options[i] || {});
  const f = {
    hub,
    clients,
    errors,
    async create(type = 'bluff', voiceMode = false) {
      const host = clients[0];
      const radio = host.$(`input[name="game"][value="${type}"]`);
      radio.checked = true;
      radio.dispatchEvent(new host.w.Event('change', { bubbles: true }));
      host.$('#voiceMode').checked = voiceMode;
      for (const client of clients.slice(1)) {
        const input = host.$(`[data-player="${client.id}"]`);
        input.checked = true;
        input.dispatchEvent(new host.w.Event('change', { bubbles: true }));
      }
      host
        .$('#createForm')
        .dispatchEvent(new host.w.Event('submit', { bubbles: true, cancelable: true }));
      await flush();
      for (const client of clients.slice(1)) {
        client.$('[data-accept="true"]').click();
        await flush();
      }
      f.room = [...hub.rooms.values()][0];
    },
    async start() {
      clients[0].$('[data-command="start"]').click();
      await flush();
    },
    async advance(ms) {
      clock += ms;
      hub.tick();
      if (f.room) hub.broadcastRoom(f.room);
      await flush();
    },
    select(client, count = 1) {
      [...client.$('#hand').children].slice(0, count).forEach((card) => card.click());
    },
    close() {
      for (const client of clients) {
        client.w.dispatchEvent(new client.w.Event('pagehide'));
        client.w.close();
      }
      assert.equal(errors.length, 0, errors.map((e) => e.stack).join('\n'));
    }
  };
  return f;
}

function pointer(client, node, type, x, y) {
  const event = new client.w.Event(type, { bubbles: true, cancelable: true });
  Object.assign(event, { pointerId: 1, button: 0, clientX: x, clientY: y });
  node.dispatchEvent(event);
}
function geometry(client) {
  client.$('#hand').getBoundingClientRect = () => ({
    left: 0,
    right: 800,
    top: 300,
    bottom: 500,
    width: 800,
    height: 200
  });
  client.$('.felt').getBoundingClientRect = () => ({
    left: 100,
    right: 700,
    top: 80,
    bottom: 250,
    width: 600,
    height: 170
  });
  [...client.$('#hand').children].forEach((card, i) => {
    card.getBoundingClientRect = () => ({
      left: i * 40,
      right: i * 40 + 35,
      top: 300,
      bottom: 390,
      width: 35,
      height: 90
    });
  });
}

async function main() {
  await test('Bluff default media, table video identity, group drops, and persistent calls', async () => {
    const f = await fixture();
    try {
      await f.create();
      const [a, b, c] = f.clients;
      assert.equal(a.$('#tableActivity').hidden, true);
      assert.equal(a.$('#callPanel').hidden, true);
      for (const client of f.clients) {
        assert.equal(client.models.length, 0);
        assert.equal(client.requests.length, 2);
        assert.equal(client.$('#cameraButton').getAttribute('aria-pressed'), 'true');
        assert.equal(client.$('#micButton').getAttribute('aria-pressed'), 'true');
        assert.equal(client.$('#audioButton').getAttribute('aria-pressed'), 'true');
      }
      const preview = a.$(`[data-seat-id="${a.id}"] video`);
      assert.ok(preview.muted);
      await f.start();
      f.select(a, 2);
      geometry(a);
      const dragged = a.$('#hand').children[0];
      pointer(a, dragged, 'pointerdown', 15, 350);
      pointer(a, dragged, 'pointermove', 200, 160);
      assert.ok(a.$('.felt').classList.contains('drop-ready'));
      pointer(a, dragged, 'pointerup', 200, 160);
      await flush();
      assert.equal(f.room.game.lastPlay.cards.length, 2);
      assert.equal(f.room.game.players[f.room.game.turnIndex].id, b.id);
      assert.ok(b.$('[data-move="play"]'));
      assert.ok(c.$('[data-move="bluff"]'));
      await f.advance(8000);
      assert.equal(c.$('[data-move="bluff"]').hidden, false);
      assert.equal(a.$(`[data-seat-id="${a.id}"] video`), preview);
      a.$('#cameraButton').click();
      a.$('#audioButton').click();
      await flush();
      const requests = a.requests.length;
      f.hub.broadcastRoom(f.room);
      await flush();
      assert.equal(a.requests.length, requests);
      assert.equal(a.$('#cameraButton').getAttribute('aria-pressed'), 'false');
      assert.equal(a.$('#audioButton').getAttribute('aria-pressed'), 'false');
    } finally {
      f.close();
    }
  });

  await test('Cancelled drops restore cards; phone panes preserve video and show complete hand grids', async () => {
    const f = await fixture(6);
    try {
      await f.create();
      await f.start();
      const [a] = f.clients;
      f.select(a);
      const order = [...a.$('#hand').children].map((card) => card.dataset.card);
      geometry(a);
      const dragged = a.$('#hand').children[0];
      pointer(a, dragged, 'pointerdown', 15, 350);
      pointer(a, dragged, 'pointermove', 200, 160);
      pointer(a, dragged, 'pointerup', 900, 40);
      assert.equal(f.room.game.lastPlay, null);
      assert.deepEqual(
        [...a.$('#hand').children].map((card) => card.dataset.card),
        order
      );
      const video = a.$(`[data-seat-id="${a.id}"] video`);
      a.$('#phoneModeButton').click();
      assert.ok(a.w.document.body.classList.contains('phone-mode'));
      assert.equal(a.$('#seats').parentElement.id, 'phoneVideoSeats');
      assert.equal(a.$('#phoneVideoPage').hidden, true);
      pointer(a, a.$('#gameSurface'), 'pointerdown', 70, 100);
      pointer(a, a.$('#gameSurface'), 'pointerup', 190, 105);
      assert.equal(a.$('#phoneVideoPage').hidden, false);
      assert.equal(a.$('#gameSurface').hidden, true);
      assert.equal(a.$(`[data-seat-id="${a.id}"] video`), video);
      pointer(a, a.$('#phoneVideoPage'), 'pointerdown', 200, 100);
      pointer(a, a.$('#phoneVideoPage'), 'pointerup', 70, 105);
      assert.equal(a.$('#gameSurface').hidden, false);
      // This snapshot deliberately stresses the hand display, not game rules.
      f.room.game.players[0].hand = makeDeck(2);
      f.hub.broadcastRoom(f.room);
      await flush();
      for (const [width, height] of [
        [320, 568],
        [360, 640],
        [390, 844]
      ]) {
        Object.defineProperty(a.w, 'innerWidth', { value: width, configurable: true });
        Object.defineProperty(a.w, 'innerHeight', { value: height, configurable: true });
        a.w.dispatchEvent(new a.w.Event('resize'));
        const columns = Number(a.$('#hand').style.getPropertyValue('--hand-columns'));
        const rows = Number(a.$('#hand').style.getPropertyValue('--hand-rows'));
        assert.ok(columns * rows >= 54);
        assert.equal(a.$('#hand').children.length, 54);
      }
      a.$('#phoneModeButton').click();
      assert.equal(a.$('#seats').parentElement.id, 'tableStage');
      assert.equal(a.$(`[data-seat-id="${a.id}"] video`), video);
    } finally {
      f.close();
    }
  });

  await test('Reconnect preserves deliberate camera/audio mute choices', async () => {
    const f = await fixture(2);
    try {
      await f.create();
      await f.start();
      const [a] = f.clients;
      a.$('#cameraButton').click();
      a.$('#audioButton').click();
      await flush();
      const cameras = a.requests.filter((request) => request.video).length;
      a.socket.close();
      assert.ok(a.tracks.every((track) => track.readyState === 'ended'));
      await new Promise((resolve) => setTimeout(resolve, 600));
      assert.equal(a.$('#cameraButton').getAttribute('aria-pressed'), 'false');
      assert.equal(a.$('#audioButton').getAttribute('aria-pressed'), 'false');
      assert.equal(a.$('#micButton').getAttribute('aria-pressed'), 'true');
      assert.equal(a.requests.filter((request) => request.video).length, cameras);
    } finally {
      f.close();
    }
  });

  await test('Final acceptance ends early and a rematch does not recreate video feeds', async () => {
    const f = await fixture(2);
    try {
      await f.create();
      await f.start();
      const [a, b] = f.clients;
      const video = a.$(`[data-seat-id="${a.id}"] video`);
      const requests = a.requests.length;
      f.room.game.players[0].hand = [f.room.game.players[0].hand[0]];
      f.hub.broadcastRoom(f.room);
      await flush();
      f.select(a);
      a.$('[data-move="play"]').click();
      await flush();
      assert.equal(f.room.game.phase, 'final');
      assert.ok(b.$('[data-move="bluff"]'));
      b.$('[data-move="acceptFinal"]').click();
      await flush();
      assert.equal(f.room.game.winnerId, a.id);
      a.$('[data-command="reset"]').click();
      await flush();
      assert.equal(f.room.game, null);
      assert.equal(a.$(`[data-seat-id="${a.id}"] video`), video);
      assert.equal(a.requests.length, requests);
    } finally {
      f.close();
    }
  });

  await test('Phone detection prompts once and remembers the choice', async () => {
    const f = await fixture(2, { 0: { phone: true } });
    try {
      await f.create();
      const a = f.clients[0];
      assert.equal(a.$('#phoneDialog').open, true);
      a.$('#phoneYes').click();
      assert.equal(a.w.localStorage.getItem('cards.bluffPhoneMode'), 'on');
      f.hub.broadcastRoom(f.room);
      await flush();
      assert.equal(a.$('#phoneDialog').open, false);
      assert.ok(a.w.document.body.classList.contains('phone-mode'));
    } finally {
      f.close();
    }
  });

  await test('Voice grammar, invalid speech, confirmation, and stale declarations', async () => {
    const f = await fixture();
    try {
      await f.create('bluff', true);
      await f.start();
      const [a, b, c] = f.clients;
      assert.equal(a.models.length, 1);
      assert.match(a.$('#voiceStatus').textContent, /ready/);
      f.select(a, 2);
      a.$('[data-move="play"]').click();
      await flush();
      assert.equal(a.$('#voiceDialog').open, true);
      assert.equal(a.$('#claimRank'), null);
      const count = f.room.game.players[0].hand.length;
      let recognizer = a.recognizers.at(-1);
      assert.ok(recognizer.grammar.includes('[unk]'));
      recognizer.emit('two kings');
      assert.equal(a.$('#voiceDeclare').disabled, true);
      assert.equal(a.$('#voiceManual').open, true);
      a.$('#voiceRetry').click();
      await flush();
      a.recognizers.at(-1).emit('queen', 0.2);
      assert.equal(a.$('#voiceDeclare').disabled, true);
      a.$('#voiceRetry').click();
      await flush();
      a.recognizers.at(-1).emit('queen');
      assert.match(a.$('#voiceRank').textContent, /Queen/);
      assert.equal(f.room.game.players[0].hand.length, count);
      a.$('#voiceDeclare').click();
      await flush();
      assert.equal(f.room.game.lastPlay.rank, 12);
      assert.equal(f.room.game.lastPlay.cards.length, 2);
      assert.equal(f.room.game.players[0].hand.length, count - 2);
      f.select(b);
      b.$('[data-move="play"]').click();
      await flush();
      const late = b.recognizers.at(-1);
      late.emit('ace');
      assert.equal(b.$('#voiceDeclare').disabled, true);
      c.$('[data-move="bluff"]').click();
      await flush();
      assert.equal(b.$('#voiceDialog').open, false);
      late.emit('queen');
      assert.equal(f.room.game.lastPlay, null);
      assert.ok(b.contexts.every((context) => context.state === 'closed'));
    } finally {
      f.close();
    }
  });

  await test('Voice uses a temporary mic without changing mute, and cancels late permissions', async () => {
    const f = await fixture(2);
    try {
      await f.create('bluff', true);
      await f.start();
      const [a] = f.clients;
      a.$('#micButton').click();
      await flush();
      f.select(a);
      a.$('[data-move="play"]').click();
      await flush();
      const temporary = a.tracks.at(-1);
      assert.equal(a.$('#micButton').getAttribute('aria-pressed'), 'false');
      assert.equal(f.hub.sessions.get(a.id).media.microphone, false);
      a.$('#voiceCancel').click();
      assert.equal(temporary.readyState, 'ended');
      assert.equal(a.tracks.find((t) => t.kind === 'video').readyState, 'live');
      a.pauseAudio = true;
      a.$('[data-move="play"]').click();
      await flush();
      const lateTrack = a.tracks.at(-1);
      a.$('#voiceCancel').click();
      a.resolveAudio();
      await flush();
      assert.equal(lateTrack.readyState, 'ended');
      assert.equal(f.room.game.lastPlay, null);
      assert.equal(a.$('#micButton').getAttribute('aria-pressed'), 'false');
    } finally {
      f.close();
    }
  });

  await test('Denied microphone and failed model both permit confirmed rank buttons', async () => {
    for (const settings of [{ denyAudio: true }, { failModel: true }]) {
      const f = await fixture(2, { 0: settings });
      try {
        await f.create('bluff', true);
        await f.start();
        const [a] = f.clients;
        f.select(a);
        a.$('[data-move="play"]').click();
        await flush();
        assert.equal(a.$('#voiceManual').open, true);
        assert.equal(a.$('#voiceDeclare').disabled, true);
        a.$('[data-rank="1"]').click();
        assert.equal(f.room.game.lastPlay, null);
        a.$('#voiceDeclare').click();
        await flush();
        assert.equal(f.room.game.lastPlay.rank, 1);
      } finally {
        f.close();
      }
    }
  });

  await test('Turn expiry closes the voice popup and rejects a late result', async () => {
    const f = await fixture(2);
    try {
      await f.create('bluff', true);
      await f.start();
      const [a] = f.clients;
      f.select(a);
      a.$('[data-move="play"]').click();
      await flush();
      const recognizer = a.recognizers.at(-1);
      await f.advance(60000);
      assert.equal(a.$('#voiceDialog').open, false);
      recognizer.emit('ace');
      assert.equal(f.room.game.lastPlay, null);
      assert.ok(a.contexts.every((context) => context.state === 'closed'));
    } finally {
      f.close();
    }
  });

  await test('Poker retains opt-in calls, original controls, and thirty-second turns', async () => {
    const f = await fixture(2, { 0: { phone: true } });
    try {
      await f.create('poker');
      await f.start();
      const [a, b] = f.clients;
      assert.equal(a.models.length, 0);
      assert.equal(a.requests.length, 0);
      assert.equal(a.$('#tableActivity').hidden, false);
      assert.equal(a.$('#callPanel').hidden, false);
      assert.equal(a.$('#phoneDialog').open, false);
      assert.equal(a.$('#mediaControls').parentElement.id, 'pokerMediaControls');
      assert.match(a.$('#moveDuration').textContent, /30/);
      a.$('#callJoin').click();
      b.$('#callJoin').click();
      await flush();
      assert.equal(a.requests.length, 0);
      a.$('#micButton').click();
      await flush();
      assert.equal(a.requests.length, 1);
      for (let i = 0; f.room.game.phase === 'playing' && i < 20; i++) {
        const id = f.room.game.players[f.room.game.turnIndex].id;
        const actor = f.clients.find((client) => client.id === id);
        (actor.$('[data-move="check"]') || actor.$('[data-move="call"]')).click();
        await flush();
      }
      assert.equal(f.room.game.phase, 'between');
    } finally {
      f.close();
    }
  });

  const { parseRank, RANK_GRAMMAR, cardsForDrag, canDropCards } =
    await import('../src/pages/cards/public/ranks.mjs');
  await test('Rank aliases and drop validation reject unrelated or illegal input', async () => {
    const all = Array.from({ length: 13 }, (_, i) => i + 1);
    for (const [word, rank] of [
      ['aces', 1],
      ['one', 1],
      ['sixes', 6],
      ['10', 10],
      ['jacks', 11],
      ['twelve', 12],
      ['kings', 13]
    ])
      assert.equal(parseRank(word, all), rank);
    for (const word of ['', 'hello', 'two kings', '[unk]', 'joker', 'ace banana', '14'])
      assert.equal(parseRank(word, all), null);
    assert.equal(parseRank('king', [1]), null);
    assert.ok(RANK_GRAMMAR.includes('[unk]'));
    assert.deepEqual(cardsForDrag('a', ['a', 'b']), ['a', 'b']);
    assert.deepEqual(cardsForDrag('c', ['a', 'b']), ['c']);
    const game = {
      type: 'bluff',
      phase: 'playing',
      turnPlayerId: 'me',
      deadline: 100,
      hand: [{ id: 'a' }, { id: 'b' }]
    };
    assert.equal(canDropCards(game, 'me', ['a', 'b'], 99), true);
    assert.equal(canDropCards(game, 'other', ['a'], 99), false);
    assert.equal(canDropCards(game, 'me', ['a'], 100), false);
    assert.equal(canDropCards(game, 'me', ['a', 'a'], 99), false);
    assert.equal(canDropCards({ ...game, type: 'poker' }, 'me', ['a'], 99), false);
  });
  console.log(
    `Cards UI tests passed (${checks} groups; simulated devices and DOM, without visual layout or actual media).`
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
