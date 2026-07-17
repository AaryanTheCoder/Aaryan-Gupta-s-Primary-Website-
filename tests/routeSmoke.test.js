const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { Readable } = require('stream');

process.env.STORAGE_PASSWORD = process.env.STORAGE_PASSWORD || 'test-password';
const gameTheoryDataPath = path.join(os.tmpdir(), `game-theory-route-smoke-${process.pid}.json`);
const plannerDataDirectory = path.join(os.tmpdir(), `planner-route-smoke-${process.pid}`);
const plannerDataPath = path.join(plannerDataDirectory, 'planner-data.json');
const holidayPlannerDataPath = path.join(plannerDataDirectory, 'holiday-planner-data.json');
const chatDataDirectory = path.join(os.tmpdir(), `chat-route-smoke-${process.pid}`);
process.env.GAME_THEORY_DATA_PATH = gameTheoryDataPath;
process.env.PLANNER_DATA_PATH = plannerDataPath;
process.env.HOLIDAY_PLANNER_DATA_PATH = holidayPlannerDataPath;
process.env.CHAT_DATA_DIR = chatDataDirectory;

const server = require('../src/server');
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
  const home = await invoke('/');
  assert.strictEqual(home.statusCode, 200);
  assert.match(home.body, /Welcome to my website/);
  assert.match(home.body, /src="\/assets\/gemini-widget\.js\?v=gpt5"/);

  const geminiWidget = await invoke('/assets/gemini-widget.js');
  assert.strictEqual(geminiWidget.statusCode, 200);
  assert.match(geminiWidget.headers['content-type'], /^application\/javascript/);
  assert.match(geminiWidget.body, /getDisplayMedia/);
  assert.match(geminiWidget.body, /'\/api\/gemini'/);
  assert.match(geminiWidget.body, /fetch\(isQwen \? '\/api\/qwen' : '\/api\/gemini'/);
  assert.match(geminiWidget.body, /data-provider="gpt5"/);
  assert.match(geminiWidget.body, /data-provider="qwen"/);

  const selfie = await invoke('/Selfie.JPG');
  assert.strictEqual(selfie.statusCode, 200);
  assert.match(selfie.headers['content-type'], /^image\/jpeg/);

  const sitemap = await invoke('/sitemap');
  assert.strictEqual(sitemap.statusCode, 200);
  assert.match(sitemap.headers['content-type'], /^application\/xml/);

  const googleVerification = await invoke('/google39fdc9cf51b98b51.html');
  assert.strictEqual(googleVerification.statusCode, 200);
  assert.match(googleVerification.body, /google-site-verification/);

  const pongDownload = await invoke('/games/pong.py');
  assert.strictEqual(pongDownload.statusCode, 200);
  assert.match(pongDownload.headers['content-type'], /^text\/x-python/);

  const kaomoji = await invoke('/kaomoji');
  assert.strictEqual(kaomoji.statusCode, 200);
  assert.match(kaomoji.body, /Simple Kaomoji Table/);
  assert.match(kaomoji.body, /src="\/assets\/gemini-widget\.js\?v=gpt5"/);

  const gemini = await invoke('/gemini');
  assert.strictEqual(gemini.statusCode, 200);
  assert.match(gemini.body, /Gemini AI Chat/);
  assert.match(gemini.body, /src="\/assets\/gemini-widget\.js\?v=gpt5"/);

  const chatMessagesBefore = await invoke('/chat/api/messages');
  assert.strictEqual(chatMessagesBefore.statusCode, 200);
  assert.deepStrictEqual(JSON.parse(chatMessagesBefore.body).messages, []);

  const chatMessageSave = await invoke('/chat/api/messages', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ name: 'Route Tester', text: 'Public chat persistence works!' })
  });
  assert.strictEqual(chatMessageSave.statusCode, 201);
  assert.strictEqual(JSON.parse(chatMessageSave.body).message.name, 'Route Tester');

  const chatMessagesAfter = await invoke('/chat/api/messages');
  assert.strictEqual(chatMessagesAfter.statusCode, 200);
  assert.strictEqual(JSON.parse(chatMessagesAfter.body).messages.length, 1);

  const folderStart = await invoke('/chat/api/folders', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ name: 'Route Tester', folderName: 'school-project', totalSize: 5, fileCount: 1 })
  });
  assert.strictEqual(folderStart.statusCode, 201);
  const folderUploadId = JSON.parse(folderStart.body).uploadId;

  const folderFile = await invoke(`/chat/api/folders/${folderUploadId}/files?path=notes%2Fhello.txt`, {
    method: 'POST',
    headers: { 'content-type': 'text/plain', 'content-length': '5' },
    body: 'hello'
  });
  assert.strictEqual(folderFile.statusCode, 201);

  const folderFinish = await invoke(`/chat/api/folders/${folderUploadId}/finish`, { method: 'POST' });
  assert.strictEqual(folderFinish.statusCode, 201);
  const folderMessage = JSON.parse(folderFinish.body).message;
  assert.strictEqual(folderMessage.type, 'folder');
  assert.strictEqual(folderMessage.folder.files[0].path, 'notes/hello.txt');

  const chatWithFolder = await invoke('/chat/api/messages');
  assert.strictEqual(JSON.parse(chatWithFolder.body).messages.length, 2);

  const chatClear = await invoke('/chat/api/messages', { method: 'DELETE' });
  assert.strictEqual(chatClear.statusCode, 200);
  assert.strictEqual(JSON.parse(chatClear.body).ok, true);

  const privacy = await invoke('/privacy');
  assert.strictEqual(privacy.statusCode, 200);
  assert.match(privacy.body, /src="\/assets\/gemini-widget\.js\?v=gpt5"/);

  const tablocker = await invoke('/tablocker');
  assert.strictEqual(tablocker.statusCode, 200);
  assert.match(tablocker.body, /src="\/assets\/gemini-widget\.js\?v=gpt5"/);

  const storage = await invoke('/storage', {
    headers: { authorization: basicAuth() }
  });
  assert.strictEqual(storage.statusCode, 200);
  assert.match(storage.body, /src="\/assets\/gemini-widget\.js\?v=gpt5"/);

  const kaomojiCursor = await invoke('/7d2e594b9e08ab2fba15ece12d239457.png');
  assert.strictEqual(kaomojiCursor.statusCode, 200);
  assert.match(kaomojiCursor.headers['content-type'], /^image\/png/);

  const kaomojiSound = await invoke('/freesound_community-evil-laugh-89423.mp3');
  assert.strictEqual(kaomojiSound.statusCode, 200);
  assert.match(kaomojiSound.headers['content-type'], /^audio\/mpeg/);

  const sandbox = await invoke('/sandbox');
  assert.strictEqual(sandbox.statusCode, 200);
  assert.match(sandbox.body, /\/sandbox\/assets\//);
  assert.match(sandbox.body, /src="\/assets\/gemini-widget\.js\?v=gpt5"/);

  const sandboxCss = await invoke('/sandbox/assets/index-BQ2BYKP8.css');
  assert.strictEqual(sandboxCss.statusCode, 200);
  assert.match(sandboxCss.headers['content-type'], /^text\/css/);

  const traversal = await invoke('/sandbox/../sandboxRoutes.js');
  assert.strictEqual(traversal.statusCode, 403);

  const shooterTraversal = await invoke('/shooter-game/../Server2.js');
  assert.notStrictEqual(shooterTraversal.statusCode, 200);

  const shooterGame = await invoke('/shooter-game');
  assert.strictEqual(shooterGame.statusCode, 200);
  assert.match(shooterGame.body, /Square Shooter/);
  assert.match(shooterGame.body, /src="\/assets\/gemini-widget\.js\?v=gpt5"/);

  const gameTheory = await invoke('/game-theory');
  assert.strictEqual(gameTheory.statusCode, 200);
  assert.match(gameTheory.body, /Game Theory Arcade/);
  assert.match(gameTheory.body, /data-info="monty-rules"/);
  assert.match(gameTheory.body, /data-info="hundred-deeper"/);
  assert.match(gameTheory.body, /src="\/assets\/gemini-widget\.js\?v=gpt5"/);

  const gameTheoryJs = await invoke('/game-theory/app.js');
  assert.strictEqual(gameTheoryJs.statusCode, 200);
  assert.match(gameTheoryJs.headers['content-type'], /^application\/javascript/);

  const gameTheoryJournalImage = await invoke('/game-theory/assets/journal-monty-table.jpg');
  assert.strictEqual(gameTheoryJournalImage.statusCode, 200);
  assert.match(gameTheoryJournalImage.headers['content-type'], /^image\/jpeg/);

  const gameTheoryContentBefore = await invoke('/game-theory/api/content');
  assert.strictEqual(gameTheoryContentBefore.statusCode, 200);
  assert.deepStrictEqual(JSON.parse(gameTheoryContentBefore.body).sections, {});

  const gameTheoryAdminDenied = await invoke('/game-theory/api/admin/verify', { method: 'POST' });
  assert.strictEqual(gameTheoryAdminDenied.statusCode, 401);

  const gameTheoryAdminVerified = await invoke('/game-theory/api/admin/verify', {
    method: 'POST',
    headers: { authorization: basicAuth() }
  });
  assert.strictEqual(gameTheoryAdminVerified.statusCode, 200);

  const customGameTheorySections = {
    'section-0': 'Edited <strong>Game Theory</strong>',
    'section-12': '<p>Custom explanation</p>'
  };
  const gameTheorySave = await invoke('/game-theory/api/content', {
    method: 'PUT',
    headers: {
      authorization: basicAuth(),
      'content-type': 'application/json'
    },
    body: JSON.stringify({ sections: customGameTheorySections })
  });
  assert.strictEqual(gameTheorySave.statusCode, 200);
  assert.strictEqual(JSON.parse(gameTheorySave.body).ok, true);

  const gameTheoryContentAfter = await invoke('/game-theory/api/content');
  assert.strictEqual(gameTheoryContentAfter.statusCode, 200);
  assert.deepStrictEqual(JSON.parse(gameTheoryContentAfter.body).sections, customGameTheorySections);

  const gameTheoryTraversal = await invoke('/game-theory/../Server2.js');
  assert.notStrictEqual(gameTheoryTraversal.statusCode, 200);

  const simulatorTraversal = await invoke('/simulator/../simulatorRoutes.js', {
    headers: { authorization: basicAuth() }
  });
  assert.strictEqual(simulatorTraversal.statusCode, 404);

  const simulator = await invoke('/simulator/', {
    headers: { authorization: basicAuth() }
  });
  assert.strictEqual(simulator.statusCode, 200);
  assert.match(simulator.body, /Market Simulator/);
  assert.match(simulator.body, /src="\/assets\/gemini-widget\.js\?v=gpt5"/);

  const plannerDenied = await invoke('/planner');
  assert.strictEqual(plannerDenied.statusCode, 401);
  assert.match(plannerDenied.headers['www-authenticate'], /Daily Planner/);

  const planner = await invoke('/planner', {
    headers: { authorization: basicAuth() }
  });
  assert.strictEqual(planner.statusCode, 200);
  assert.match(planner.body, /Personal Daily Planner/);
  assert.match(planner.body, /id="saveStatus"/);
  assert.match(planner.body, /src="\/assets\/gemini-widget\.js\?v=gpt5"/);
  const plannerScript = planner.body.match(/<script>\s*([\s\S]*?)\s*<\/script>/);
  assert.ok(plannerScript, 'Planner browser script should exist');
  assert.doesNotThrow(() => new Function(plannerScript[1]));
  assert.match(planner.body, /data-note-text/, 'Planner should render a plain-text notes field');
  assert.doesNotMatch(planner.body, /data-note-add/, 'Planner notes should not require task rows');

  const plannerDataBefore = await invoke('/planner-data', {
    headers: { authorization: basicAuth() }
  });
  assert.strictEqual(plannerDataBefore.statusCode, 200);
  assert.strictEqual(JSON.parse(plannerDataBefore.body).exists, false);

  const plannerState = {
    widgets: [
      {
        id: 'test-note',
        type: 'notes',
        title: 'Test note',
        x: 10,
        y: 20,
        w: 300,
        h: 240,
        data: { text: 'Planner persistence works' }
      }
    ]
  };
  const plannerSave = await invoke('/planner-data', {
    method: 'PUT',
    headers: {
      authorization: basicAuth(),
      'content-type': 'application/json'
    },
    body: JSON.stringify({ state: plannerState })
  });
  assert.strictEqual(plannerSave.statusCode, 200);
  assert.strictEqual(JSON.parse(plannerSave.body).ok, true);
  assert.strictEqual(fs.existsSync(plannerDataPath), true);

  const plannerDataAfter = await invoke('/planner-data', {
    headers: { authorization: basicAuth() }
  });
  assert.strictEqual(plannerDataAfter.statusCode, 200);
  assert.deepStrictEqual(JSON.parse(plannerDataAfter.body).state, plannerState);

  const invalidPlannerSave = await invoke('/planner-data', {
    method: 'PUT',
    headers: {
      authorization: basicAuth(),
      'content-type': 'application/json'
    },
    body: JSON.stringify({ state: { widgets: 'invalid' } })
  });
  assert.strictEqual(invalidPlannerSave.statusCode, 400);

  const holidayPlanner = await invoke('/holiday-planner');
  assert.strictEqual(holidayPlanner.statusCode, 200);
  assert.match(holidayPlanner.body, /Holiday Planner/);
  assert.match(holidayPlanner.body, /UWCSEA East Summer Holiday/);
  assert.match(holidayPlanner.body, /25 June to 12 August 2026/);
  assert.match(holidayPlanner.body, /data-holiday-calendar/);
  assert.match(holidayPlanner.body, /data-holiday-week/);
  assert.match(holidayPlanner.body, /data-holiday-day-panel/);
  assert.match(holidayPlanner.body, /src="\/assets\/gemini-widget\.js\?v=gpt5"/);
  const holidayPlannerScript = holidayPlanner.body.match(/<script>\s*([\s\S]*?)\s*<\/script>/);
  assert.ok(holidayPlannerScript, 'Holiday planner browser script should exist');
  assert.doesNotThrow(() => new Function(holidayPlannerScript[1]));

  const holidayPlannerDataBefore = await invoke('/holiday-planner-data');
  assert.strictEqual(holidayPlannerDataBefore.statusCode, 200);
  assert.strictEqual(JSON.parse(holidayPlannerDataBefore.body).exists, false);

  const holidayPlannerState = {
    widgets: [
      {
        id: 'holiday-note',
        type: 'notes',
        title: 'Holiday note',
        x: 12,
        y: 24,
        w: 320,
        h: 260,
        data: { text: 'Holiday persistence works' }
      }
    ]
  };
  const holidayPlannerSaveDenied = await invoke('/holiday-planner-data', {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ state: holidayPlannerState })
  });
  assert.strictEqual(holidayPlannerSaveDenied.statusCode, 401);
  assert.match(holidayPlannerSaveDenied.headers['www-authenticate'], /Holiday Planner/);

  const holidayPlannerSave = await invoke('/holiday-planner-data', {
    method: 'PUT',
    headers: {
      authorization: basicAuth(),
      'content-type': 'application/json'
    },
    body: JSON.stringify({ state: holidayPlannerState })
  });
  assert.strictEqual(holidayPlannerSave.statusCode, 200);
  assert.strictEqual(JSON.parse(holidayPlannerSave.body).ok, true);
  assert.strictEqual(fs.existsSync(holidayPlannerDataPath), true);
  assert.strictEqual(fs.existsSync(plannerDataPath), true);

  const holidayPlannerDataAfter = await invoke('/holiday-planner-data');
  assert.strictEqual(holidayPlannerDataAfter.statusCode, 200);
  assert.deepStrictEqual(JSON.parse(holidayPlannerDataAfter.body).state, holidayPlannerState);

  const cloudUnauthed = await invoke('/cloudconsole');
  assert.strictEqual(cloudUnauthed.statusCode, 200);
  assert.match(cloudUnauthed.body, /src="\/assets\/gemini-widget\.js\?v=gpt5"/);

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
}).finally(() => {
  fs.rmSync(gameTheoryDataPath, { force: true });
  fs.rmSync(plannerDataDirectory, { force: true, recursive: true });
  fs.rmSync(chatDataDirectory, { force: true, recursive: true });
});
