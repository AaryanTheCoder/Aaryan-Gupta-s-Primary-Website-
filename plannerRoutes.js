const fs = require('fs');
const path = require('path');

const STORAGE_PASSWORD = process.env.STORAGE_PASSWORD;
const PLANNER_DATA_PATH = process.env.PLANNER_DATA_PATH
  ? path.resolve(process.env.PLANNER_DATA_PATH)
  : path.join(__dirname, 'planner-data.json');
const MAX_PLANNER_DATA_BYTES = 2 * 1024 * 1024;

function isAuthorized(req) {
  if (!STORAGE_PASSWORD) return false;

  const auth = req.headers.authorization || '';
  if (!auth.startsWith('Basic ')) return false;

  const decoded = Buffer.from(auth.slice(6), 'base64').toString();
  const colonIndex = decoded.indexOf(':');
  const password = colonIndex >= 0 ? decoded.slice(colonIndex + 1) : '';

  return password === STORAGE_PASSWORD;
}

function requireAuth(req, res) {
  if (isAuthorized(req)) return true;

  res.writeHead(401, {
    'Content-Type': 'text/plain; charset=utf-8',
    'WWW-Authenticate': 'Basic realm="Daily Planner"'
  });
  res.end('Daily Planner password required');
  return false;
}

function readPlannerData() {
  try {
    const raw = fs.readFileSync(PLANNER_DATA_PATH, 'utf8');
    const parsed = JSON.parse(raw);
    if (parsed && parsed.state && Array.isArray(parsed.state.widgets)) {
      return {
        exists: true,
        savedAt: parsed.savedAt || null,
        state: parsed.state
      };
    }
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.error('Failed to read planner data:', error);
    }
  }

  return {
    exists: false,
    savedAt: null,
    state: null
  };
}

function writePlannerData(state) {
  const payload = {
    savedAt: new Date().toISOString(),
    state
  };
  const tempPath = `${PLANNER_DATA_PATH}.${process.pid}.tmp`;
  fs.writeFileSync(tempPath, JSON.stringify(payload, null, 2));
  fs.renameSync(tempPath, PLANNER_DATA_PATH);
  return payload;
}

function readJsonBody(req, callback) {
  let body = '';

  req.on('data', chunk => {
    body += chunk;
    if (Buffer.byteLength(body) > MAX_PLANNER_DATA_BYTES) {
      req.destroy();
    }
  });

  req.on('end', () => {
    try {
      callback(null, JSON.parse(body || '{}'));
    } catch (error) {
      callback(error);
    }
  });

  req.on('error', error => {
    callback(error);
  });
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store'
  });
  res.end(JSON.stringify(payload));
}

function handle(req, res) {
  if (!requireAuth(req, res)) return;

  const pathname = new URL(req.url, 'http://localhost').pathname;

  if (pathname === '/planner-data' && req.method === 'GET') {
    sendJson(res, 200, readPlannerData());
    return;
  }

  if (pathname === '/planner-data' && req.method === 'PUT') {
    readJsonBody(req, (error, payload) => {
      if (error || !payload || !payload.state || !Array.isArray(payload.state.widgets)) {
        sendJson(res, 400, { ok: false, error: 'Invalid planner data' });
        return;
      }

      try {
        const saved = writePlannerData(payload.state);
        sendJson(res, 200, { ok: true, savedAt: saved.savedAt });
      } catch (writeError) {
        console.error('Failed to write planner data:', writeError);
        sendJson(res, 500, { ok: false, error: 'Planner data could not be saved' });
      }
    });
    return;
  }

  if ((pathname === '/planner' || pathname === '/daily-planner' || pathname === '/dailyplanner') && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(getPlannerHtml());
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Planner route not found');
}

function getPlannerHtml() {
  return String.raw`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Personal Daily Planner</title>
  <style>
    :root {
      --ink: #17201b;
      --muted: #5b6b61;
      --paper: #fffaf0;
      --paper-2: #f4ead8;
      --line: rgba(44, 52, 46, 0.14);
      --green: #235a3b;
      --green-2: #8fbf74;
      --amber: #f0b84f;
      --red: #d95b43;
      --blue: #4e8fb8;
      --shadow: 0 22px 60px rgba(35, 52, 42, 0.18);
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      min-height: 100vh;
      font-family: Georgia, 'Times New Roman', serif;
      color: var(--ink);
      background:
        radial-gradient(circle at 12% 12%, rgba(143, 191, 116, 0.38), transparent 26%),
        radial-gradient(circle at 88% 18%, rgba(240, 184, 79, 0.30), transparent 24%),
        linear-gradient(120deg, #e9dcc6, #f7efd9 42%, #dfe9d7);
      overflow-x: hidden;
    }

    button,
    input,
    select,
    textarea {
      font: inherit;
    }

    .page {
      width: min(1500px, calc(100% - 28px));
      margin: 0 auto;
      padding: 24px 0 42px;
    }

    .hero {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      gap: 20px;
      align-items: stretch;
      padding: 24px;
      border: 1px solid var(--line);
      border-radius: 30px;
      background:
        linear-gradient(135deg, rgba(255, 250, 240, 0.88), rgba(244, 234, 216, 0.78)),
        repeating-linear-gradient(0deg, rgba(35, 90, 59, 0.05) 0 1px, transparent 1px 34px);
      box-shadow: var(--shadow);
      position: relative;
      overflow: hidden;
    }

    .hero::after {
      content: '';
      position: absolute;
      width: 260px;
      height: 260px;
      right: -90px;
      bottom: -120px;
      background: radial-gradient(circle, rgba(35, 90, 59, 0.16), transparent 70%);
      pointer-events: none;
    }

    .eyebrow {
      display: inline-flex;
      width: fit-content;
      margin-bottom: 12px;
      padding: 8px 13px;
      border-radius: 999px;
      color: #fffaf0;
      background: var(--green);
      font-family: 'Trebuchet MS', Verdana, sans-serif;
      font-size: 0.78rem;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    h1 {
      margin: 0;
      max-width: 850px;
      font-size: clamp(2.4rem, 5vw, 5.3rem);
      line-height: 0.95;
      letter-spacing: -0.05em;
    }

    .subtitle {
      max-width: 720px;
      margin: 16px 0 0;
      color: var(--muted);
      font-family: 'Trebuchet MS', Verdana, sans-serif;
      font-size: 1rem;
      line-height: 1.65;
    }

    .clock-card {
      min-width: min(430px, 100%);
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 10px;
      padding: 22px;
      border-radius: 26px;
      color: #f8fff2;
      background:
        radial-gradient(circle at top right, rgba(143, 191, 116, 0.34), transparent 38%),
        linear-gradient(145deg, #173525, #24593d);
      box-shadow: inset 0 0 0 1px rgba(255,255,255,0.12), 0 18px 44px rgba(35, 90, 59, 0.28);
      z-index: 1;
    }

    .clock-label {
      font-family: 'Trebuchet MS', Verdana, sans-serif;
      font-size: 0.8rem;
      font-weight: 800;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: rgba(248, 255, 242, 0.72);
    }

    .clock-time {
      font-family: 'Trebuchet MS', Verdana, sans-serif;
      font-size: clamp(2.5rem, 5vw, 5rem);
      font-weight: 900;
      line-height: 0.94;
      letter-spacing: -0.06em;
      font-variant-numeric: tabular-nums;
    }

    .clock-date {
      color: rgba(248, 255, 242, 0.82);
      font-family: 'Trebuchet MS', Verdana, sans-serif;
      font-size: 1rem;
    }

    .toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      flex-wrap: wrap;
      margin: 18px 0;
      padding: 14px;
      border: 1px solid var(--line);
      border-radius: 24px;
      background: rgba(255, 250, 240, 0.72);
      box-shadow: 0 14px 34px rgba(35, 52, 42, 0.10);
      backdrop-filter: blur(10px);
    }

    .toolbar-group {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      align-items: center;
    }

    .toolbar select,
    .toolbar input {
      min-height: 42px;
      border: 1px solid var(--line);
      border-radius: 14px;
      padding: 0 12px;
      color: var(--ink);
      background: rgba(255, 255, 255, 0.72);
      outline: none;
      font-family: 'Trebuchet MS', Verdana, sans-serif;
    }

    .btn {
      min-height: 42px;
      border: 0;
      border-radius: 14px;
      padding: 0 15px;
      color: #fffaf0;
      background: var(--green);
      cursor: pointer;
      font-family: 'Trebuchet MS', Verdana, sans-serif;
      font-weight: 800;
      box-shadow: 0 10px 24px rgba(35, 90, 59, 0.20);
      transition: transform 0.16s ease, opacity 0.16s ease;
    }

    .btn:hover {
      transform: translateY(-2px);
    }

    .btn.secondary {
      color: var(--green);
      background: rgba(35, 90, 59, 0.10);
      box-shadow: none;
    }

    .board-wrap {
      min-height: 720px;
      border: 1px solid var(--line);
      border-radius: 32px;
      padding: 14px;
      background:
        linear-gradient(rgba(35, 90, 59, 0.06) 1px, transparent 1px),
        linear-gradient(90deg, rgba(35, 90, 59, 0.06) 1px, transparent 1px),
        rgba(255, 250, 240, 0.54);
      background-size: 28px 28px;
      box-shadow: var(--shadow);
      overflow: auto;
    }

    .board {
      position: relative;
      min-width: 1180px;
      min-height: 900px;
    }

    .widget {
      position: absolute;
      display: flex;
      flex-direction: column;
      min-width: 250px;
      min-height: 190px;
      border: 1px solid rgba(35, 52, 42, 0.16);
      border-radius: 24px;
      background: rgba(255, 250, 240, 0.94);
      box-shadow: 0 16px 38px rgba(35, 52, 42, 0.16);
      overflow: hidden;
      resize: both;
    }

    .widget.dragging {
      opacity: 0.88;
      z-index: 50;
      user-select: none;
    }

    .widget-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 12px 14px;
      color: #fffaf0;
      background: linear-gradient(135deg, #173525, #235a3b);
      cursor: grab;
      font-family: 'Trebuchet MS', Verdana, sans-serif;
      font-weight: 900;
    }

    .widget-title {
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 0;
    }

    .widget-title input {
      width: 100%;
      border: 0;
      color: inherit;
      background: transparent;
      outline: none;
      font-weight: 900;
    }

    .widget-actions {
      display: flex;
      gap: 6px;
      flex-shrink: 0;
    }

    .icon-btn {
      width: 30px;
      height: 30px;
      border: 1px solid rgba(255, 255, 255, 0.22);
      border-radius: 10px;
      color: #fffaf0;
      background: rgba(255, 255, 255, 0.12);
      cursor: pointer;
      font-family: 'Trebuchet MS', Verdana, sans-serif;
      font-weight: 900;
    }

    .widget-body {
      flex: 1;
      padding: 14px;
      overflow: auto;
    }

    .metric-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
    }

    .metric {
      padding: 12px;
      border-radius: 18px;
      background: rgba(35, 90, 59, 0.08);
      border: 1px solid rgba(35, 90, 59, 0.10);
    }

    .metric strong {
      display: block;
      font-family: 'Trebuchet MS', Verdana, sans-serif;
      font-size: 1.6rem;
      line-height: 1;
      font-variant-numeric: tabular-nums;
    }

    .metric span {
      display: block;
      margin-top: 6px;
      color: var(--muted);
      font-family: 'Trebuchet MS', Verdana, sans-serif;
      font-size: 0.82rem;
    }

    .progress-row {
      margin-bottom: 14px;
    }

    .progress-label {
      display: flex;
      justify-content: space-between;
      gap: 10px;
      margin-bottom: 7px;
      color: var(--muted);
      font-family: 'Trebuchet MS', Verdana, sans-serif;
      font-size: 0.84rem;
      font-weight: 800;
    }

    .track {
      height: 14px;
      border-radius: 999px;
      overflow: hidden;
      background: rgba(35, 52, 42, 0.12);
    }

    .bar {
      height: 100%;
      width: 0;
      border-radius: inherit;
      background: linear-gradient(90deg, var(--green-2), var(--amber), var(--red));
      transition: width 0.35s ease;
    }

    textarea.notes {
      width: 100%;
      min-height: 160px;
      height: calc(100% - 58px);
      border: 1px solid rgba(35, 90, 59, 0.13);
      border-radius: 18px;
      padding: 12px;
      color: var(--ink);
      background:
        repeating-linear-gradient(0deg, transparent 0 29px, rgba(35, 90, 59, 0.10) 29px 30px),
        rgba(255, 255, 255, 0.58);
      outline: none;
      resize: none;
      line-height: 30px;
    }

    .note-tools {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 10px;
      font-family: 'Trebuchet MS', Verdana, sans-serif;
    }

    .note-tools button,
    .note-tools select {
      min-height: 34px;
      border: 1px solid rgba(35, 90, 59, 0.15);
      border-radius: 11px;
      padding: 0 10px;
      color: var(--green);
      background: rgba(35, 90, 59, 0.08);
      cursor: pointer;
      font-weight: 800;
    }

    .pomodoro {
      display: grid;
      gap: 12px;
      font-family: 'Trebuchet MS', Verdana, sans-serif;
    }

    .pomodoro-time {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 96px;
      border-radius: 20px;
      color: #f8fff2;
      background:
        radial-gradient(circle at top right, rgba(240, 184, 79, 0.28), transparent 42%),
        linear-gradient(145deg, #173525, #235a3b);
      font-size: 3.2rem;
      line-height: 1;
      font-weight: 900;
      font-variant-numeric: tabular-nums;
      letter-spacing: 0;
    }

    .pomodoro-mode {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 8px;
    }

    .pomodoro-mode button,
    .pomodoro-controls button {
      min-height: 36px;
      border: 1px solid rgba(35, 90, 59, 0.15);
      border-radius: 12px;
      color: var(--green);
      background: rgba(35, 90, 59, 0.08);
      cursor: pointer;
      font-weight: 900;
    }

    .pomodoro-mode button.active,
    .pomodoro-controls button.primary {
      color: #fffaf0;
      background: var(--green);
    }

    .pomodoro-controls {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 8px;
    }

    .pomodoro-settings {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 8px;
    }

    .pomodoro-settings label {
      display: grid;
      gap: 5px;
      color: var(--muted);
      font-size: 0.78rem;
      font-weight: 800;
    }

    .pomodoro-settings input {
      width: 100%;
      min-height: 34px;
      border: 1px solid rgba(35, 90, 59, 0.13);
      border-radius: 11px;
      padding: 0 8px;
      color: var(--ink);
      background: rgba(255, 255, 255, 0.62);
      outline: none;
    }

    .pomodoro-status {
      color: var(--muted);
      font-size: 0.86rem;
      font-weight: 800;
      min-height: 1.2em;
    }

    .task-list {
      display: grid;
      gap: 9px;
      margin-bottom: 12px;
    }

    .task-item {
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: 9px;
      align-items: center;
      padding: 9px;
      border-radius: 14px;
      background: rgba(35, 90, 59, 0.07);
    }

    .task-item input[type="text"] {
      width: 100%;
      border: 0;
      background: transparent;
      outline: none;
      color: var(--ink);
    }

    .task-item.done input[type="text"] {
      color: var(--muted);
      text-decoration: line-through;
    }

    .compact-form {
      display: flex;
      gap: 8px;
    }

    .compact-form input {
      flex: 1;
      min-width: 0;
      border: 1px solid rgba(35, 90, 59, 0.13);
      border-radius: 13px;
      padding: 9px 10px;
      background: rgba(255, 255, 255, 0.62);
      outline: none;
    }

    .weather-main {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 14px;
      align-items: center;
    }

    .weather-temp {
      font-family: 'Trebuchet MS', Verdana, sans-serif;
      font-size: 3.2rem;
      line-height: 1;
      font-weight: 900;
      letter-spacing: -0.07em;
    }

    .weather-detail {
      color: var(--muted);
      font-family: 'Trebuchet MS', Verdana, sans-serif;
      line-height: 1.5;
    }

    .calendar-frame {
      width: 100%;
      height: calc(100% - 64px);
      min-height: 240px;
      border: 0;
      border-radius: 16px;
      background: #fff;
    }

    .calendar-help {
      margin: 10px 0 0;
      color: var(--muted);
      font-family: 'Trebuchet MS', Verdana, sans-serif;
      font-size: 0.86rem;
      line-height: 1.45;
    }

    .link-list {
      display: grid;
      gap: 9px;
    }

    .link-list a {
      display: block;
      padding: 10px 12px;
      border-radius: 14px;
      color: var(--green);
      background: rgba(35, 90, 59, 0.08);
      text-decoration: none;
      font-family: 'Trebuchet MS', Verdana, sans-serif;
      font-weight: 800;
    }

    .empty {
      color: var(--muted);
      font-family: 'Trebuchet MS', Verdana, sans-serif;
      line-height: 1.55;
    }

    @media (max-width: 900px) {
      .hero {
        grid-template-columns: 1fr;
      }

      .clock-card {
        min-width: 0;
      }

      .board-wrap {
        min-height: 660px;
      }

      .board {
        min-width: 860px;
      }
    }
  </style>
</head>
<body>
  <main class="page">
    <section class="hero">
      <div>
        <div class="eyebrow">Personal Daily Planner</div>
        <h1>Command center for school, focus, and daily momentum.</h1>
        <p class="subtitle">Move widgets by dragging their headers. Resize from the bottom-right corner. Everything autosaves to the server for access on any device.</p>
      </div>
      <aside class="clock-card" aria-label="Singapore time">
        <div class="clock-label">Live Singapore Time</div>
        <div class="clock-time" id="liveClock">--:--:-- --</div>
        <div class="clock-date" id="liveDate">Loading Asia/Singapore...</div>
      </aside>
    </section>

    <section class="toolbar" aria-label="Planner controls">
      <div class="toolbar-group">
        <select id="widgetType" aria-label="Widget type">
          <option value="weather">Singapore weather</option>
          <option value="calendar">Google Calendar</option>
          <option value="notes">Notes</option>
          <option value="pomodoro">Pomodoro focus timer</option>
          <option value="urgency">Day, week, month left</option>
          <option value="tasks">Homework and tasks</option>
          <option value="habits">Habit tracker</option>
          <option value="links">Study links</option>
        </select>
        <button class="btn" id="addWidgetBtn" type="button">Add widget</button>
      </div>
      <div class="toolbar-group">
        <button class="btn secondary" id="tidyBtn" type="button">Tidy layout</button>
        <button class="btn secondary" id="resetBtn" type="button">Reset planner</button>
        <a class="btn secondary" href="/" style="display:inline-flex; align-items:center; text-decoration:none;">Back home</a>
      </div>
    </section>

    <section class="board-wrap">
      <div class="board" id="board" aria-label="Customizable planner board"></div>
    </section>
  </main>

  <script>
    (function () {
      var STORAGE_KEY = 'aaryan-personal-daily-planner-v1';
      var board = document.getElementById('board');
      var widgetType = document.getElementById('widgetType');
      var addWidgetBtn = document.getElementById('addWidgetBtn');
      var tidyBtn = document.getElementById('tidyBtn');
      var resetBtn = document.getElementById('resetBtn');
      var liveClock = document.getElementById('liveClock');
      var liveDate = document.getElementById('liveDate');
      var state = defaultState();
      var saveTimer = null;
      var activeDrag = null;
      var remoteReady = false;
      var pendingSave = false;
      var resizeObserver = new ResizeObserver(function (entries) {
        entries.forEach(function (entry) {
          var id = entry.target.dataset.id;
          var widget = findWidget(id);
          if (!widget) return;
          widget.w = Math.round(entry.contentRect.width);
          widget.h = Math.round(entry.contentRect.height);
        });
        scheduleSave();
      });

      var widgetMeta = {
        weather: { title: 'Singapore Weather', w: 330, h: 250 },
        calendar: { title: 'Google Calendar', w: 520, h: 430 },
        notes: { title: 'Notes', w: 410, h: 360 },
        pomodoro: { title: 'Pomodoro Timer', w: 360, h: 360 },
        urgency: { title: 'Urgency Timers', w: 390, h: 300 },
        tasks: { title: 'Homework Tasks', w: 380, h: 350 },
        habits: { title: 'Habit Tracker', w: 350, h: 300 },
        links: { title: 'Study Links', w: 320, h: 280 }
      };

      function defaultState() {
        return {
          widgets: [
            { id: uid(), type: 'weather', title: 'Singapore Weather', x: 0, y: 0, w: 330, h: 250, data: {} },
            { id: uid(), type: 'urgency', title: 'Time Left', x: 350, y: 0, w: 390, h: 300, data: {} },
            { id: uid(), type: 'notes', title: 'Quick Notes', x: 760, y: 0, w: 410, h: 360, data: { text: '- Finish homework\\n- Pack bag\\n- Revise one topic', fontSize: '18', format: 'lined' } },
            { id: uid(), type: 'tasks', title: 'Homework Tasks', x: 0, y: 280, w: 380, h: 350, data: { tasks: [{ id: uid(), text: 'Add assignments here', done: false }] } },
            { id: uid(), type: 'pomodoro', title: 'Focus Timer', x: 400, y: 330, w: 360, h: 360, data: { mode: 'work', workMinutes: 25, breakMinutes: 5, longBreakMinutes: 15, remainingSeconds: 1500, running: false, sessions: 0 } },
            { id: uid(), type: 'calendar', title: 'Google Calendar', x: 780, y: 390, w: 520, h: 430, data: { embedUrl: '' } }
          ]
        };
      }

      function loadLocalState() {
        try {
          var parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
          if (parsed && Array.isArray(parsed.widgets)) return parsed;
        } catch (error) {}
        return defaultState();
      }

      function saveState() {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (error) {}

        if (!remoteReady) {
          pendingSave = true;
          return;
        }

        fetch('/planner-data', {
          method: 'PUT',
          credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ state: state })
        }).catch(function () {
          pendingSave = true;
        });
      }

      function scheduleSave() {
        clearTimeout(saveTimer);
        saveTimer = setTimeout(saveState, 400);
      }

      function loadRemoteState() {
        fetch('/planner-data', {
          method: 'GET',
          credentials: 'same-origin',
          cache: 'no-store'
        })
          .then(function (response) {
            if (!response.ok) throw new Error('Planner data request failed');
            return response.json();
          })
          .then(function (data) {
            if (data.exists && data.state && Array.isArray(data.state.widgets)) {
              state = data.state;
            } else {
              state = loadLocalState();
              pendingSave = true;
            }
          })
          .catch(function () {
            state = loadLocalState();
            pendingSave = true;
          })
          .finally(function () {
            remoteReady = true;
            render();
            if (pendingSave) {
              pendingSave = false;
              scheduleSave();
            }
          });
      }

      function uid() {
        return 'w_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
      }

      function findWidget(id) {
        return state.widgets.find(function (widget) {
          return widget.id === id;
        });
      }

      function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
      }

      function singaporeNow() {
        return new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Singapore' }));
      }

      function updateClock() {
        var now = new Date();
        liveClock.textContent = now.toLocaleTimeString('en-SG', {
          timeZone: 'Asia/Singapore',
          hour: 'numeric',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        });
        liveDate.textContent = now.toLocaleDateString('en-SG', {
          timeZone: 'Asia/Singapore',
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }) + ' - Asia/Singapore';
      }

      function render() {
        resizeObserver.disconnect();
        board.innerHTML = '';
        state.widgets.forEach(function (widget) {
          board.appendChild(renderWidget(widget));
        });
        scheduleSave();
        refreshDynamicWidgets();
      }

      function renderWidget(widget) {
        widget.data = widget.data || {};

        var el = document.createElement('article');
        el.className = 'widget';
        el.dataset.id = widget.id;
        el.style.left = widget.x + 'px';
        el.style.top = widget.y + 'px';
        el.style.width = widget.w + 'px';
        el.style.height = widget.h + 'px';

        var header = document.createElement('div');
        header.className = 'widget-header';
        header.innerHTML =
          '<div class="widget-title"><input aria-label="Widget title" value="' + escapeAttr(widget.title) + '"></div>' +
          '<div class="widget-actions"><button class="icon-btn duplicate" type="button" title="Duplicate">+</button><button class="icon-btn remove" type="button" title="Remove">x</button></div>';
        el.appendChild(header);

        var titleInput = header.querySelector('input');
        titleInput.addEventListener('input', function () {
          widget.title = titleInput.value;
          scheduleSave();
        });
        header.querySelector('.remove').addEventListener('click', function () {
          state.widgets = state.widgets.filter(function (item) {
            return item.id !== widget.id;
          });
          render();
        });
        header.querySelector('.duplicate').addEventListener('click', function () {
          var clone = JSON.parse(JSON.stringify(widget));
          clone.id = uid();
          clone.x += 32;
          clone.y += 32;
          state.widgets.push(clone);
          render();
        });
        header.addEventListener('pointerdown', startDrag);

        var body = document.createElement('div');
        body.className = 'widget-body';
        body.innerHTML = getWidgetBody(widget);
        el.appendChild(body);
        bindWidgetBody(widget, body);
        resizeObserver.observe(el);
        return el;
      }

      function startDrag(event) {
        if (event.target.closest('button') || event.target.closest('input')) return;
        var el = event.currentTarget.closest('.widget');
        var widget = findWidget(el.dataset.id);
        if (!widget) return;

        activeDrag = {
          el: el,
          widget: widget,
          pointerId: event.pointerId,
          startX: event.clientX,
          startY: event.clientY,
          originalX: widget.x,
          originalY: widget.y
        };
        el.classList.add('dragging');
        el.setPointerCapture(event.pointerId);
      }

      window.addEventListener('pointermove', function (event) {
        if (!activeDrag) return;
        var nextX = activeDrag.originalX + event.clientX - activeDrag.startX;
        var nextY = activeDrag.originalY + event.clientY - activeDrag.startY;
        activeDrag.widget.x = Math.round(clamp(nextX, 0, board.scrollWidth - 180) / 14) * 14;
        activeDrag.widget.y = Math.round(clamp(nextY, 0, board.scrollHeight - 140) / 14) * 14;
        activeDrag.el.style.left = activeDrag.widget.x + 'px';
        activeDrag.el.style.top = activeDrag.widget.y + 'px';
        scheduleSave();
      });

      window.addEventListener('pointerup', function () {
        if (!activeDrag) return;
        activeDrag.el.classList.remove('dragging');
        activeDrag = null;
        saveState();
      });

      function getWidgetBody(widget) {
        if (widget.type === 'weather') {
          return '<div class="weather-main"><div class="weather-temp" data-weather-temp>--</div><div class="weather-detail" data-weather-detail>Loading Singapore weather...</div></div><div class="metric-grid" style="margin-top:14px;"><div class="metric"><strong data-weather-rain>--</strong><span>Rain chance</span></div><div class="metric"><strong data-weather-wind>--</strong><span>Wind</span></div></div>';
        }

        if (widget.type === 'calendar') {
          var url = widget.data.embedUrl || '';
          var frame = url ? '<iframe class="calendar-frame" src="' + escapeAttr(url) + '"></iframe>' : '<div class="empty">Paste a public Google Calendar embed URL below. In Google Calendar: Settings -> Integrate calendar -> embed code, then copy only the URL inside src.</div>';
          return frame + '<div class="compact-form" style="margin-top:10px;"><input data-calendar-url placeholder="Google Calendar embed URL" value="' + escapeAttr(url) + '"><button class="btn" data-calendar-save type="button">Save</button></div><p class="calendar-help">Private calendars need Google sign-in in the browser. Public embed URLs work best.</p>';
        }

        if (widget.type === 'notes') {
          var fontSize = widget.data.fontSize || '18';
          var format = widget.data.format || 'lined';
          return '<div class="note-tools"><select data-note-size><option value="15">Small</option><option value="18">Normal</option><option value="22">Large</option><option value="28">Huge</option></select><button type="button" data-note-todo>Todo format</button><button type="button" data-note-clear>Clear</button></div><textarea class="notes" data-note-text data-format="' + escapeAttr(format) + '" style="font-size:' + escapeAttr(fontSize) + 'px;">' + escapeHtml(widget.data.text || '') + '</textarea>';
        }

        if (widget.type === 'urgency') {
          return '<div data-urgency></div>';
        }

        if (widget.type === 'pomodoro') {
          normalizePomodoro(widget);
          return '<div class="pomodoro" data-pomodoro><div class="pomodoro-time" data-pomodoro-time>--:--</div><div class="pomodoro-mode"><button type="button" data-pomodoro-mode="work">Focus</button><button type="button" data-pomodoro-mode="break">Break</button><button type="button" data-pomodoro-mode="longBreak">Long</button></div><div class="pomodoro-controls"><button class="primary" type="button" data-pomodoro-start>Start</button><button type="button" data-pomodoro-pause>Pause</button><button type="button" data-pomodoro-reset>Reset</button></div><div class="pomodoro-settings"><label>Focus<input type="number" min="1" max="180" data-pomodoro-work value="' + escapeAttr(widget.data.workMinutes) + '"></label><label>Break<input type="number" min="1" max="60" data-pomodoro-break value="' + escapeAttr(widget.data.breakMinutes) + '"></label><label>Long<input type="number" min="1" max="90" data-pomodoro-long value="' + escapeAttr(widget.data.longBreakMinutes) + '"></label></div><div class="pomodoro-status" data-pomodoro-status></div></div>';
        }

        if (widget.type === 'tasks') {
          return '<div class="task-list" data-task-list></div><form class="compact-form" data-task-form><input name="task" placeholder="Add homework, test, errand..."><button class="btn" type="submit">Add</button></form>';
        }

        if (widget.type === 'habits') {
          return '<div class="task-list" data-habit-list></div><form class="compact-form" data-habit-form><input name="habit" placeholder="Add habit, e.g. revise math"><button class="btn" type="submit">Add</button></form>';
        }

        if (widget.type === 'links') {
          return '<div class="link-list"><a href="https://classroom.google.com/" target="_blank" rel="noopener">Google Classroom</a><a href="https://calendar.google.com/" target="_blank" rel="noopener">Google Calendar</a><a href="https://drive.google.com/" target="_blank" rel="noopener">Google Drive</a><a href="https://www.khanacademy.org/" target="_blank" rel="noopener">Khan Academy</a><a href="https://quizlet.com/" target="_blank" rel="noopener">Quizlet</a></div>';
        }

        return '<div class="empty">Unknown widget.</div>';
      }

      function bindWidgetBody(widget, body) {
        if (widget.type === 'calendar') {
          var input = body.querySelector('[data-calendar-url]');
          body.querySelector('[data-calendar-save]').addEventListener('click', function () {
            widget.data.embedUrl = input.value.trim();
            render();
          });
        }

        if (widget.type === 'notes') {
          var textarea = body.querySelector('[data-note-text]');
          var size = body.querySelector('[data-note-size]');
          size.value = widget.data.fontSize || '18';
          textarea.addEventListener('input', function () {
            widget.data.text = textarea.value;
            scheduleSave();
          });
          size.addEventListener('change', function () {
            widget.data.fontSize = size.value;
            textarea.style.fontSize = size.value + 'px';
            scheduleSave();
          });
          body.querySelector('[data-note-todo]').addEventListener('click', function () {
            var selected = textarea.value.trim();
            textarea.value = selected ? selected.split('\\n').map(function (line) { return line.startsWith('- [') ? line : '- [ ] ' + line.replace(/^[-*]\\s*/, ''); }).join('\\n') : '- [ ] ';
            widget.data.text = textarea.value;
            scheduleSave();
          });
          body.querySelector('[data-note-clear]').addEventListener('click', function () {
            textarea.value = '';
            widget.data.text = '';
            scheduleSave();
          });
        }

        if (widget.type === 'pomodoro') {
          bindPomodoro(widget, body);
        }

        if (widget.type === 'tasks') {
          renderTasks(widget, body, 'tasks');
          body.querySelector('[data-task-form]').addEventListener('submit', function (event) {
            event.preventDefault();
            var input = event.currentTarget.elements.task;
            var text = input.value.trim();
            if (!text) return;
            widget.data.tasks = widget.data.tasks || [];
            widget.data.tasks.push({ id: uid(), text: text, done: false });
            input.value = '';
            render();
          });
        }

        if (widget.type === 'habits') {
          renderTasks(widget, body, 'habits');
          body.querySelector('[data-habit-form]').addEventListener('submit', function (event) {
            event.preventDefault();
            var input = event.currentTarget.elements.habit;
            var text = input.value.trim();
            if (!text) return;
            widget.data.habits = widget.data.habits || [];
            widget.data.habits.push({ id: uid(), text: text, done: false });
            input.value = '';
            render();
          });
        }
      }

      function renderTasks(widget, body, key) {
        var list = body.querySelector(key === 'tasks' ? '[data-task-list]' : '[data-habit-list]');
        var items = widget.data[key] || [];
        if (!items.length) {
          list.innerHTML = '<div class="empty">No items yet.</div>';
          return;
        }
        list.innerHTML = items.map(function (item) {
          return '<div class="task-item ' + (item.done ? 'done' : '') + '" data-item-id="' + item.id + '"><input type="checkbox" ' + (item.done ? 'checked' : '') + '><input type="text" value="' + escapeAttr(item.text) + '"><button class="icon-btn" type="button">x</button></div>';
        }).join('');
        list.querySelectorAll('.task-item').forEach(function (row) {
          var item = items.find(function (entry) { return entry.id === row.dataset.itemId; });
          row.querySelector('input[type="checkbox"]').addEventListener('change', function (event) {
            item.done = event.target.checked;
            row.classList.toggle('done', item.done);
            scheduleSave();
          });
          row.querySelector('input[type="text"]').addEventListener('input', function (event) {
            item.text = event.target.value;
            scheduleSave();
          });
          row.querySelector('button').addEventListener('click', function () {
            widget.data[key] = items.filter(function (entry) { return entry.id !== item.id; });
            render();
          });
        });
      }

      function refreshDynamicWidgets() {
        updateUrgencyWidgets();
        updateWeatherWidgets();
        updatePomodoroWidgets();
      }

      function normalizePomodoro(widget) {
        widget.data.mode = widget.data.mode || 'work';
        widget.data.workMinutes = clampNumber(widget.data.workMinutes, 1, 180, 25);
        widget.data.breakMinutes = clampNumber(widget.data.breakMinutes, 1, 60, 5);
        widget.data.longBreakMinutes = clampNumber(widget.data.longBreakMinutes, 1, 90, 15);
        widget.data.sessions = Math.max(0, parseInt(widget.data.sessions || 0, 10) || 0);
        if (!Number.isFinite(Number(widget.data.remainingSeconds))) {
          widget.data.remainingSeconds = pomodoroDuration(widget);
        }
        widget.data.remainingSeconds = clampNumber(widget.data.remainingSeconds, 0, 180 * 60, pomodoroDuration(widget));
        widget.data.running = Boolean(widget.data.running);
      }

      function clampNumber(value, min, max, fallback) {
        var number = parseInt(value, 10);
        if (!Number.isFinite(number)) number = fallback;
        return Math.max(min, Math.min(max, number));
      }

      function pomodoroDuration(widget) {
        if (widget.data.mode === 'break') return widget.data.breakMinutes * 60;
        if (widget.data.mode === 'longBreak') return widget.data.longBreakMinutes * 60;
        return widget.data.workMinutes * 60;
      }

      function bindPomodoro(widget, body) {
        normalizePomodoro(widget);
        body.querySelectorAll('[data-pomodoro-mode]').forEach(function (button) {
          button.addEventListener('click', function () {
            switchPomodoroMode(widget, button.dataset.pomodoroMode);
            updatePomodoroWidget(widget);
            scheduleSave();
          });
        });

        body.querySelector('[data-pomodoro-start]').addEventListener('click', function () {
          normalizePomodoro(widget);
          if (widget.data.remainingSeconds <= 0) widget.data.remainingSeconds = pomodoroDuration(widget);
          widget.data.running = true;
          widget.data.endsAt = Date.now() + widget.data.remainingSeconds * 1000;
          updatePomodoroWidget(widget);
          scheduleSave();
        });

        body.querySelector('[data-pomodoro-pause]').addEventListener('click', function () {
          syncPomodoroRemaining(widget);
          widget.data.running = false;
          delete widget.data.endsAt;
          updatePomodoroWidget(widget);
          scheduleSave();
        });

        body.querySelector('[data-pomodoro-reset]').addEventListener('click', function () {
          widget.data.running = false;
          delete widget.data.endsAt;
          widget.data.remainingSeconds = pomodoroDuration(widget);
          updatePomodoroWidget(widget);
          scheduleSave();
        });

        [
          ['[data-pomodoro-work]', 'workMinutes'],
          ['[data-pomodoro-break]', 'breakMinutes'],
          ['[data-pomodoro-long]', 'longBreakMinutes']
        ].forEach(function (entry) {
          var input = body.querySelector(entry[0]);
          input.addEventListener('change', function () {
            widget.data[entry[1]] = clampNumber(input.value, Number(input.min), Number(input.max), widget.data[entry[1]]);
            input.value = widget.data[entry[1]];
            if (!widget.data.running) {
              widget.data.remainingSeconds = pomodoroDuration(widget);
            }
            updatePomodoroWidget(widget);
            scheduleSave();
          });
        });

        updatePomodoroWidget(widget);
      }

      function switchPomodoroMode(widget, mode) {
        widget.data.mode = mode;
        widget.data.running = false;
        delete widget.data.endsAt;
        widget.data.remainingSeconds = pomodoroDuration(widget);
      }

      function syncPomodoroRemaining(widget) {
        normalizePomodoro(widget);
        if (widget.data.running && widget.data.endsAt) {
          widget.data.remainingSeconds = Math.max(0, Math.ceil((widget.data.endsAt - Date.now()) / 1000));
        }
      }

      function completePomodoro(widget) {
        var nextMode = 'work';
        if (widget.data.mode === 'work') {
          widget.data.sessions += 1;
          nextMode = widget.data.sessions % 4 === 0 ? 'longBreak' : 'break';
        }
        widget.data.mode = nextMode;
        widget.data.running = false;
        delete widget.data.endsAt;
        widget.data.remainingSeconds = pomodoroDuration(widget);
        scheduleSave();
      }

      function updatePomodoroWidgets() {
        state.widgets.filter(function (widget) {
          return widget.type === 'pomodoro';
        }).forEach(updatePomodoroWidget);
      }

      function updatePomodoroWidget(widget) {
        syncPomodoroRemaining(widget);
        if (widget.data.running && widget.data.remainingSeconds <= 0) {
          completePomodoro(widget);
        }

        var el = board.querySelector('[data-id="' + widget.id + '"]');
        if (!el) return;

        var time = el.querySelector('[data-pomodoro-time]');
        var status = el.querySelector('[data-pomodoro-status]');
        var start = el.querySelector('[data-pomodoro-start]');
        var seconds = widget.data.remainingSeconds;
        var minutes = Math.floor(seconds / 60);
        var remainder = seconds % 60;
        time.textContent = String(minutes).padStart(2, '0') + ':' + String(remainder).padStart(2, '0');
        start.textContent = widget.data.running ? 'Running' : 'Start';
        status.textContent = pomodoroModeLabel(widget.data.mode) + ' - ' + widget.data.sessions + ' focus session' + (widget.data.sessions === 1 ? '' : 's');

        el.querySelectorAll('[data-pomodoro-mode]').forEach(function (button) {
          button.classList.toggle('active', button.dataset.pomodoroMode === widget.data.mode);
        });
      }

      function pomodoroModeLabel(mode) {
        if (mode === 'break') return 'Break';
        if (mode === 'longBreak') return 'Long break';
        return 'Focus';
      }

      function updateUrgencyWidgets() {
        document.querySelectorAll('[data-urgency]').forEach(function (target) {
          var now = singaporeNow();
          var dayStart = new Date(now);
          dayStart.setHours(0, 0, 0, 0);
          var dayEnd = new Date(dayStart);
          dayEnd.setDate(dayEnd.getDate() + 1);

          var weekStart = new Date(dayStart);
          var day = weekStart.getDay();
          var mondayOffset = day === 0 ? -6 : 1 - day;
          weekStart.setDate(weekStart.getDate() + mondayOffset);
          var weekEnd = new Date(weekStart);
          weekEnd.setDate(weekEnd.getDate() + 7);

          var monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
          var monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1);

          target.innerHTML =
            progressHtml('Day used', percentBetween(now, dayStart, dayEnd), msLeft(now, dayEnd)) +
            progressHtml('Week used', percentBetween(now, weekStart, weekEnd), msLeft(now, weekEnd)) +
            progressHtml('Month used', percentBetween(now, monthStart, monthEnd), msLeft(now, monthEnd));
        });
      }

      function progressHtml(label, percent, leftText) {
        return '<div class="progress-row"><div class="progress-label"><span>' + label + '</span><span>' + Math.round(percent) + '% used - ' + leftText + ' left</span></div><div class="track"><div class="bar" style="width:' + clamp(percent, 0, 100) + '%"></div></div></div>';
      }

      function percentBetween(now, start, end) {
        return ((now - start) / (end - start)) * 100;
      }

      function msLeft(now, end) {
        var ms = Math.max(0, end - now);
        var hours = Math.floor(ms / 3600000);
        var days = Math.floor(hours / 24);
        if (days >= 1) return days + 'd ' + (hours % 24) + 'h';
        var minutes = Math.floor((ms % 3600000) / 60000);
        return hours + 'h ' + minutes + 'm';
      }

      var weatherCacheTime = 0;
      var weatherCache = null;

      function updateWeatherWidgets() {
        var widgets = document.querySelectorAll('[data-weather-temp]');
        if (!widgets.length) return;
        var now = Date.now();
        if (weatherCache && now - weatherCacheTime < 600000) {
          paintWeather(weatherCache);
          return;
        }
        fetch('https://api.open-meteo.com/v1/forecast?latitude=1.3521&longitude=103.8198&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,weather_code,wind_speed_10m&hourly=precipitation_probability&forecast_days=1&timezone=Asia%2FSingapore')
          .then(function (response) { return response.json(); })
          .then(function (data) {
            weatherCache = data;
            weatherCacheTime = Date.now();
            paintWeather(data);
          })
          .catch(function () {
            document.querySelectorAll('[data-weather-detail]').forEach(function (target) {
              target.textContent = 'Weather is unavailable right now. Check your browser network connection.';
            });
          });
      }

      function paintWeather(data) {
        var current = data.current || {};
        var chance = Array.isArray(data.hourly && data.hourly.precipitation_probability) ? data.hourly.precipitation_probability[0] : null;
        document.querySelectorAll('[data-weather-temp]').forEach(function (target) {
          target.textContent = Math.round(current.temperature_2m) + 'C';
        });
        document.querySelectorAll('[data-weather-detail]').forEach(function (target) {
          target.textContent = weatherText(current.weather_code) + '. Feels like ' + Math.round(current.apparent_temperature) + 'C. Humidity ' + Math.round(current.relative_humidity_2m) + '%.';
        });
        document.querySelectorAll('[data-weather-rain]').forEach(function (target) {
          target.textContent = chance === null ? '--' : chance + '%';
        });
        document.querySelectorAll('[data-weather-wind]').forEach(function (target) {
          target.textContent = Math.round(current.wind_speed_10m || 0) + ' km/h';
        });
      }

      function weatherText(code) {
        var map = {
          0: 'Clear',
          1: 'Mostly clear',
          2: 'Partly cloudy',
          3: 'Cloudy',
          45: 'Fog',
          48: 'Fog',
          51: 'Light drizzle',
          53: 'Drizzle',
          55: 'Heavy drizzle',
          61: 'Light rain',
          63: 'Rain',
          65: 'Heavy rain',
          80: 'Rain showers',
          81: 'Rain showers',
          82: 'Heavy showers',
          95: 'Thunderstorms'
        };
        return map[code] || 'Singapore weather';
      }

      function escapeHtml(value) {
        return String(value).replace(/[&<>"']/g, function (ch) {
          return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch];
        });
      }

      function escapeAttr(value) {
        return escapeHtml(value).replace(new RegExp(String.fromCharCode(96), 'g'), '&#96;');
      }

      addWidgetBtn.addEventListener('click', function () {
        var type = widgetType.value;
        var meta = widgetMeta[type];
        var index = state.widgets.length;
        state.widgets.push({
          id: uid(),
          type: type,
          title: meta.title,
          x: (index * 42) % 720,
          y: 80 + ((index * 56) % 520),
          w: meta.w,
          h: meta.h,
          data: {}
        });
        render();
      });

      tidyBtn.addEventListener('click', function () {
        var columns = 3;
        var gap = 24;
        state.widgets.forEach(function (widget, index) {
          var col = index % columns;
          var row = Math.floor(index / columns);
          widget.x = col * 390;
          widget.y = row * 360;
          widget.w = widget.w || 350;
          widget.h = widget.h || 300;
        });
        render();
      });

      resetBtn.addEventListener('click', function () {
        if (!window.confirm('Reset the planner layout and notes on the server?')) return;
        state = defaultState();
        render();
      });

      updateClock();
      setInterval(updateClock, 1000);
      setInterval(updatePomodoroWidgets, 1000);
      setInterval(updateUrgencyWidgets, 30000);
      setInterval(updateWeatherWidgets, 600000);
      loadRemoteState();
    }());
  </script>
</body>
</html>`;
}

module.exports = { handle };
