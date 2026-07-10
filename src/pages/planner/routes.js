const fs = require('fs');
const path = require('path');

const PLANNER_PASSWORD = process.env.PLANNER_PASSWORD || process.env.STORAGE_PASSWORD;
const IS_MANAGED_PRODUCTION = Boolean(process.env.WEBSITE_SITE_NAME || process.env.NODE_ENV === 'production');
const DEFAULT_PLANNER_DATA_PATH = process.env.WEBSITE_SITE_NAME && process.env.HOME
  ? path.join(process.env.HOME, 'data', 'planner-data.json')
  : path.join(__dirname, 'data', 'planner-data.json');
const DEFAULT_HOLIDAY_PLANNER_DATA_PATH = process.env.WEBSITE_SITE_NAME && process.env.HOME
  ? path.join(process.env.HOME, 'data', 'holiday-planner-data.json')
  : path.join(__dirname, 'data', 'holiday-planner-data.json');
const LEGACY_PLANNER_DATA_PATH = path.resolve(__dirname, '..', '..', '..', 'planner-data.json');
const PLANNER_DATA_PATH = process.env.PLANNER_DATA_PATH
  ? path.resolve(process.env.PLANNER_DATA_PATH)
  : DEFAULT_PLANNER_DATA_PATH;
const HOLIDAY_PLANNER_DATA_PATH = process.env.HOLIDAY_PLANNER_DATA_PATH
  ? path.resolve(process.env.HOLIDAY_PLANNER_DATA_PATH)
  : DEFAULT_HOLIDAY_PLANNER_DATA_PATH;
const MAX_PLANNER_DATA_BYTES = 2 * 1024 * 1024;

function getPlannerMode(pathname) {
  const isHolidayPlanner = pathname === '/holiday-planner' || pathname === '/holidayplanner' || pathname === '/summer-planner' || pathname === '/holiday-planner-data';
  if (isHolidayPlanner) {
    return {
      id: 'holiday',
      dataEndpoint: '/holiday-planner-data',
      dataPath: HOLIDAY_PLANNER_DATA_PATH,
      dataPaths: [HOLIDAY_PLANNER_DATA_PATH],
      documentTitle: 'Holiday Planner',
      eyebrow: 'Holiday Planner',
      heading: 'UWCSEA East summer countdown and planning board.',
      subtitle: 'Track how much of summer is left, then plan the days with the same draggable notes, tasks, timers, weather, and Google Calendar widgets.',
      storageKey: 'aaryan-holiday-planner-v1',
      authName: 'Holiday Planner'
    };
  }

  const dataPaths = [PLANNER_DATA_PATH];
  if (LEGACY_PLANNER_DATA_PATH !== PLANNER_DATA_PATH) {
    dataPaths.push(LEGACY_PLANNER_DATA_PATH);
  }

  return {
    id: 'daily',
    dataEndpoint: '/planner-data',
    dataPath: PLANNER_DATA_PATH,
    dataPaths,
    documentTitle: 'Personal Daily Planner',
    eyebrow: 'Personal Daily Planner',
    heading: 'Command center for school, focus, and daily momentum.',
    subtitle: 'Move widgets by dragging their headers. Resize from the bottom-right corner. Everything autosaves to the server for access on any device.',
    storageKey: 'aaryan-personal-daily-planner-v1',
    authName: 'Daily Planner'
  };
}

function isAuthorized(req) {
  if (!PLANNER_PASSWORD) return !IS_MANAGED_PRODUCTION;

  const auth = req.headers.authorization || '';
  if (!auth.startsWith('Basic ')) return false;

  const decoded = Buffer.from(auth.slice(6), 'base64').toString();
  const colonIndex = decoded.indexOf(':');
  const password = colonIndex >= 0 ? decoded.slice(colonIndex + 1) : '';

  return password === PLANNER_PASSWORD;
}

function requireAuth(req, res, plannerName = 'Daily Planner') {
  if (isAuthorized(req)) return true;

  if (!PLANNER_PASSWORD) {
    res.writeHead(503, {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store'
    });
    res.end(`${plannerName} is not configured. Set PLANNER_PASSWORD or STORAGE_PASSWORD.`);
    return false;
  }

  res.writeHead(401, {
    'Content-Type': 'text/plain; charset=utf-8',
    'WWW-Authenticate': `Basic realm="${plannerName}"`,
    'Cache-Control': 'no-store'
  });
  res.end(`${plannerName} password required`);
  return false;
}

function readPlannerData(mode) {
  for (const candidatePath of mode.dataPaths) {
    try {
      const raw = fs.readFileSync(candidatePath, 'utf8');
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
        console.error(`Failed to read planner data from ${candidatePath}:`, error);
      }
    }
  }

  return {
    exists: false,
    savedAt: null,
    state: null
  };
}

function writePlannerData(state, mode) {
  const payload = {
    savedAt: new Date().toISOString(),
    state
  };
  fs.mkdirSync(path.dirname(mode.dataPath), { recursive: true });
  const tempPath = `${mode.dataPath}.${process.pid}.${Date.now()}.tmp`;
  fs.writeFileSync(tempPath, JSON.stringify(payload, null, 2));
  fs.renameSync(tempPath, mode.dataPath);
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
  const pathname = new URL(req.url, 'http://localhost').pathname;
  const mode = getPlannerMode(pathname);

  if (!requireAuth(req, res, mode.authName)) return;

  if (pathname === mode.dataEndpoint && req.method === 'GET') {
    sendJson(res, 200, readPlannerData(mode));
    return;
  }

  if (pathname === mode.dataEndpoint && req.method === 'PUT') {
    readJsonBody(req, (error, payload) => {
      if (error || !payload || !payload.state || !Array.isArray(payload.state.widgets)) {
        sendJson(res, 400, { ok: false, error: 'Invalid planner data' });
        return;
      }

      try {
        const saved = writePlannerData(payload.state, mode);
        sendJson(res, 200, { ok: true, savedAt: saved.savedAt });
      } catch (writeError) {
        console.error('Failed to write planner data:', writeError);
        sendJson(res, 500, { ok: false, error: 'Planner data could not be saved' });
      }
    });
    return;
  }

  if ((pathname === '/planner' || pathname === '/daily-planner' || pathname === '/dailyplanner' || pathname === '/holiday-planner' || pathname === '/holidayplanner' || pathname === '/summer-planner') && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(getPlannerHtml(mode));
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Planner route not found');
}

function getPlannerHtml(mode = getPlannerMode('/planner')) {
  const isHolidayMode = mode.id === 'holiday';
  const holidayPanelHtml = isHolidayMode ? String.raw`
    <section class="holiday-panel" aria-label="UWCSEA East summer holiday progress">
      <div class="holiday-copy">
        <div class="eyebrow holiday-eyebrow">UWCSEA East Summer Holiday</div>
        <h2>25 June to 12 August 2026</h2>
        <p>School break is counted through 12 August, because the 2026/2027 school year starts on 13 August.</p>
        <div class="holiday-stats" aria-label="Holiday days used and left">
          <div><strong data-holiday-used-days>--</strong><span>days used</span></div>
          <div><strong data-holiday-left-days>--</strong><span>days left</span></div>
          <div><strong data-holiday-total-days>49</strong><span>total days</span></div>
        </div>
        <div class="holiday-bar" aria-label="Percentage of holiday used and left">
          <div class="holiday-used" data-holiday-used-bar></div>
          <div class="holiday-left" data-holiday-left-bar></div>
        </div>
        <div class="holiday-percent" data-holiday-percent>Loading holiday progress...</div>
        <div class="holiday-week" data-holiday-week>Week 1 of holiday</div>
        <div class="holiday-day-panel" data-holiday-day-panel>
          <div class="holiday-day-panel-head">
            <div class="holiday-day-panel-title" data-holiday-day-title>Pick a day</div>
            <div class="holiday-day-panel-subtitle" data-holiday-day-subtitle>Choose any holiday day to plan it.</div>
          </div>
          <form class="holiday-day-form" data-holiday-day-form>
            <input type="text" name="holidayDayTask" placeholder="Add a plan for this day" data-holiday-day-input>
            <button class="btn" type="submit">Add</button>
          </form>
          <div class="holiday-day-list" data-holiday-day-list></div>
        </div>
      </div>
      <div class="holiday-calendar-wrap">
        <div class="holiday-calendar" id="holidayCalendar" data-holiday-calendar></div>
      </div>
    </section>
` : '';

  return String.raw`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${mode.documentTitle}</title>
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
      min-width: min(560px, 100%);
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 10px;
      padding: 28px;
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
      font-size: clamp(3rem, 5vw, 5.6rem);
      font-weight: 900;
      line-height: 0.94;
      letter-spacing: 0;
      font-variant-numeric: tabular-nums;
    }

    .clock-date {
      color: rgba(248, 255, 242, 0.82);
      font-family: 'Trebuchet MS', Verdana, sans-serif;
      font-size: 1rem;
    }

    .holiday-panel {
      display: grid;
      grid-template-columns: minmax(320px, 0.82fr) minmax(420px, 1.18fr);
      gap: 18px;
      margin-top: 18px;
      padding: 18px;
      border: 1px solid var(--line);
      border-radius: 28px;
      background: rgba(255, 250, 240, 0.78);
      box-shadow: var(--shadow);
      backdrop-filter: blur(10px);
    }

    .holiday-copy {
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-width: 0;
      padding: 8px;
    }

    .holiday-eyebrow {
      margin-bottom: 10px;
      background: #274e72;
    }

    .holiday-copy h2 {
      margin: 0;
      font-size: clamp(2rem, 4vw, 4rem);
      line-height: 1;
      letter-spacing: 0;
    }

    .holiday-copy p {
      max-width: 620px;
      margin: 12px 0 0;
      color: var(--muted);
      font-family: 'Trebuchet MS', Verdana, sans-serif;
      font-size: 0.98rem;
      line-height: 1.55;
    }

    .holiday-stats {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 10px;
      margin: 16px 0;
    }

    .holiday-stats div {
      padding: 13px;
      border: 1px solid rgba(39, 78, 114, 0.12);
      border-radius: 18px;
      background: rgba(39, 78, 114, 0.08);
      font-family: 'Trebuchet MS', Verdana, sans-serif;
    }

    .holiday-stats strong {
      display: block;
      font-size: 2rem;
      line-height: 1;
      font-weight: 900;
      font-variant-numeric: tabular-nums;
    }

    .holiday-stats span,
    .holiday-percent {
      color: var(--muted);
      font-family: 'Trebuchet MS', Verdana, sans-serif;
      font-size: 0.82rem;
      font-weight: 800;
    }

    .holiday-bar {
      display: flex;
      height: 24px;
      border-radius: 999px;
      overflow: hidden;
      background: rgba(35, 52, 42, 0.12);
      box-shadow: inset 0 0 0 1px rgba(35, 90, 59, 0.08);
    }

    .holiday-used {
      width: 0;
      background: linear-gradient(90deg, #274e72, #4e8fb8);
      transition: width 0.35s ease;
    }

    .holiday-left {
      width: 0;
      background: linear-gradient(90deg, #8fbf74, #f0b84f);
      transition: width 0.35s ease;
    }

    .holiday-percent {
      margin-top: 9px;
    }

    .holiday-week {
      margin-top: 14px;
      padding: 10px 12px;
      border-radius: 14px;
      background: rgba(39, 78, 114, 0.10);
      color: #274e72;
      font-family: 'Trebuchet MS', Verdana, sans-serif;
      font-size: 0.92rem;
      font-weight: 900;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    .holiday-day-panel {
      margin-top: 12px;
      padding: 12px;
      border: 1px solid rgba(39, 78, 114, 0.14);
      border-radius: 18px;
      background: rgba(255, 255, 255, 0.62);
    }

    .holiday-day-panel-head {
      display: flex;
      flex-direction: column;
      gap: 3px;
      margin-bottom: 10px;
    }

    .holiday-day-panel-title {
      font-weight: 900;
      color: #173525;
    }

    .holiday-day-panel-subtitle {
      color: var(--muted);
      font-size: 0.84rem;
    }

    .holiday-day-form {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .holiday-day-form input {
      flex: 1;
      min-height: 40px;
      border: 1px solid var(--line);
      border-radius: 12px;
      padding: 0 10px;
      background: rgba(255, 255, 255, 0.9);
    }

    .holiday-day-form button {
      min-height: 40px;
      padding: 0 12px;
    }

    .holiday-day-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: 10px;
    }

    .holiday-day-item {
      display: flex;
      gap: 8px;
      align-items: flex-start;
      padding: 8px 9px;
      border: 1px solid rgba(35, 90, 59, 0.10);
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.84);
    }

    .holiday-day-item.done {
      opacity: 0.78;
    }

    .holiday-day-item.done .holiday-plan-text {
      text-decoration: line-through;
    }

    .holiday-day-item input[type="checkbox"] {
      margin-top: 3px;
      accent-color: #274e72;
    }

    .holiday-day-item input[type="text"] {
      flex: 1;
      border: 0;
      padding: 0;
      background: transparent;
      color: var(--ink);
      outline: none;
    }

    .holiday-day-item button {
      width: 26px;
      height: 26px;
      border: 0;
      border-radius: 8px;
      background: rgba(217, 91, 67, 0.14);
      color: var(--red);
      cursor: pointer;
      font-weight: 900;
    }

    .holiday-calendar-wrap {
      min-width: 0;
    }

    .holiday-calendar {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 12px;
      min-width: 0;
      font-family: 'Trebuchet MS', Verdana, sans-serif;
    }

    .holiday-month {
      min-width: 0;
      border: 1px solid rgba(35, 90, 59, 0.12);
      border-radius: 20px;
      padding: 12px;
      background: rgba(255, 255, 255, 0.48);
    }

    .holiday-month h3 {
      margin: 0 0 10px;
      font-size: 1rem;
      font-weight: 900;
      letter-spacing: 0;
    }

    .holiday-grid {
      display: grid;
      grid-template-columns: repeat(7, minmax(0, 1fr));
      gap: 5px;
    }

    .holiday-weekday,
    .holiday-day,
    .holiday-blank {
      min-height: 26px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      font-size: 0.76rem;
      font-weight: 900;
      font-variant-numeric: tabular-nums;
    }

    .holiday-weekday {
      color: var(--muted);
      font-size: 0.66rem;
      text-transform: uppercase;
    }

    .holiday-day {
      color: rgba(23, 32, 27, 0.36);
      background: rgba(35, 52, 42, 0.05);
    }

    .holiday-day.in-break {
      cursor: pointer;
    }

    .holiday-day.in-break:hover {
      transform: translateY(-1px);
      box-shadow: inset 0 0 0 1px rgba(39, 78, 114, 0.22);
    }

    .holiday-day.in-break.used {
      color: #f8fff2;
      background: #274e72;
    }

    .holiday-day.in-break.left {
      color: #173525;
      background: #c7df9b;
    }

    .holiday-day.today {
      outline: 3px solid #d95b43;
      outline-offset: 1px;
    }

    .holiday-day.in-break.selected {
      outline: 2px solid #274e72;
      outline-offset: 2px;
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

    .day-remaining {
      min-height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 14px;
      padding: 10px;
      font-family: 'Trebuchet MS', Verdana, sans-serif;
    }

    .day-remaining .progress-row {
      margin: 0;
    }

    .day-remaining .progress-label {
      margin-bottom: 18px;
      font-size: 1.65rem;
      line-height: 1.2;
      font-weight: 900;
    }

    .day-remaining .track {
      height: 38px;
      box-shadow: inset 0 0 0 1px rgba(35, 90, 59, 0.08);
    }

    .day-remaining-detail {
      color: var(--muted);
      font-size: 1rem;
      font-weight: 800;
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

    .task-timer {
      display: grid;
      gap: 12px;
      font-family: 'Trebuchet MS', Verdana, sans-serif;
    }

    .task-timer-field {
      display: grid;
      gap: 6px;
      color: var(--muted);
      font-size: 0.78rem;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    .task-timer-field input,
    .task-timer-field textarea {
      width: 100%;
      border: 1px solid rgba(35, 90, 59, 0.13);
      border-radius: 13px;
      padding: 10px 11px;
      color: var(--ink);
      background: rgba(255, 255, 255, 0.62);
      outline: none;
      font-weight: 700;
      text-transform: none;
      letter-spacing: 0;
    }

    .task-timer-field textarea {
      min-height: 74px;
      resize: vertical;
      line-height: 1.45;
    }

    .task-timer-time {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 86px;
      border-radius: 18px;
      color: #f8fff2;
      background: linear-gradient(145deg, #173525, #235a3b);
      font-size: 3rem;
      line-height: 1;
      font-weight: 900;
      font-variant-numeric: tabular-nums;
      letter-spacing: 0;
    }

    .task-timer-controls {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 8px;
    }

    .task-timer-controls button {
      min-height: 36px;
      border: 1px solid rgba(35, 90, 59, 0.15);
      border-radius: 12px;
      color: var(--green);
      background: rgba(35, 90, 59, 0.08);
      cursor: pointer;
      font-weight: 900;
    }

    .task-timer-controls button.primary {
      color: #fffaf0;
      background: var(--green);
    }

    .task-timer-status {
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

    .save-status {
      min-width: 120px;
      color: var(--muted);
      font-family: 'Trebuchet MS', Verdana, sans-serif;
      font-size: 0.86rem;
      font-weight: 800;
      text-align: right;
    }

    .save-status.error {
      color: #a83d2b;
    }

    @media (max-width: 900px) {
      .hero {
        grid-template-columns: 1fr;
      }

      .holiday-panel,
      .holiday-calendar {
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

      .day-remaining .progress-label {
        font-size: 1.25rem;
      }
    }
  </style>
</head>
<body>
  <main class="page">
    <section class="hero">
      <div>
        <div class="eyebrow">${mode.eyebrow}</div>
        <h1>${mode.heading}</h1>
        <p class="subtitle">${mode.subtitle}</p>
      </div>
      <aside class="clock-card" aria-label="Singapore time">
        <div class="clock-label">Live Singapore Time</div>
        <div class="clock-time" id="liveClock">--:--:-- --</div>
        <div class="clock-date" id="liveDate">Loading Asia/Singapore...</div>
      </aside>
    </section>

${holidayPanelHtml}

    <section class="toolbar" aria-label="Planner controls">
      <div class="toolbar-group">
        <select id="widgetType" aria-label="Widget type">
          <option value="weather">Singapore weather</option>
          <option value="calendar">Google Calendar</option>
          <option value="notes">Notes</option>
          <option value="pomodoro">Pomodoro focus timer</option>
          <option value="urgency">Day, week, month left</option>
          <option value="dayRemaining">Big day remaining</option>
          <option value="taskTimer">Task timer</option>
          <option value="tasks">Homework and tasks</option>
          <option value="habits">Habit tracker</option>
          <option value="links">Study links</option>
        </select>
        <button class="btn" id="addWidgetBtn" type="button">Add widget</button>
      </div>
      <div class="toolbar-group">
        <span class="save-status" id="saveStatus" role="status" aria-live="polite">Loading planner...</span>
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
      var STORAGE_KEY = '${mode.storageKey}';
      var DATA_ENDPOINT = '${mode.dataEndpoint}';
      var HOLIDAY_MODE = ${isHolidayMode ? 'true' : 'false'};
      var board = document.getElementById('board');
      var widgetType = document.getElementById('widgetType');
      var addWidgetBtn = document.getElementById('addWidgetBtn');
      var tidyBtn = document.getElementById('tidyBtn');
      var resetBtn = document.getElementById('resetBtn');
      var liveClock = document.getElementById('liveClock');
      var liveDate = document.getElementById('liveDate');
      var saveStatus = document.getElementById('saveStatus');
      var state = defaultState();
      var saveTimer = null;
      var activeDrag = null;
      var remoteReady = false;
      var pendingSave = false;
      var resizeObserver = window.ResizeObserver
        ? new ResizeObserver(function (entries) {
          entries.forEach(function (entry) {
            var id = entry.target.dataset.id;
            var widget = findWidget(id);
            if (!widget) return;
            widget.w = Math.round(entry.contentRect.width);
            widget.h = Math.round(entry.contentRect.height);
          });
          scheduleSave();
        })
        : {
          observe: function () {},
          disconnect: function () {}
        };

      var widgetMeta = {
        weather: { title: 'Singapore Weather', w: 330, h: 250 },
        calendar: { title: 'Google Calendar', w: 520, h: 430 },
        notes: { title: 'Notes', w: 410, h: 360 },
        pomodoro: { title: 'Pomodoro Timer', w: 360, h: 360 },
        urgency: { title: 'Urgency Timers', w: 390, h: 300 },
        dayRemaining: { title: 'Day Remaining', w: 920, h: 280 },
        taskTimer: { title: 'Task Timer', w: 430, h: 430 },
        tasks: { title: 'Homework Tasks', w: 380, h: 350 },
        habits: { title: 'Habit Tracker', w: 350, h: 300 },
        links: { title: 'Study Links', w: 320, h: 280 }
      };

      function normalizePlannerState(targetState) {
        if (!targetState || !Array.isArray(targetState.widgets)) {
          return defaultState();
        }

        targetState.widgets = targetState.widgets.map(function (widget, index) {
          widget = widget && typeof widget === 'object' ? widget : {};
          widget.type = widgetMeta[widget.type] ? widget.type : 'notes';
          var meta = widgetMeta[widget.type];
          widget.id = widget.id || uid();
          widget.title = widget.title || meta.title;
          widget.x = clampNumber(widget.x, 0, 4000, (index % 3) * 390);
          widget.y = clampNumber(widget.y, 0, 4000, Math.floor(index / 3) * 360);
          widget.w = clampNumber(widget.w, 220, 1800, meta.w);
          widget.h = clampNumber(widget.h, 170, 1400, meta.h);
          widget.data = widget.data && typeof widget.data === 'object' ? widget.data : {};
          return widget;
        });

        targetState.holidayPlanner = normalizeHolidayPlannerState(targetState.holidayPlanner);
        return targetState;
      }

      function defaultHolidayPlannerState() {
        return {
          selectedDate: holidayDateKey(new Date(2026, 5, 25)),
          plans: {}
        };
      }

      function normalizeHolidayPlannerState(holidayPlanner) {
        if (!holidayPlanner || typeof holidayPlanner !== 'object') {
          return defaultHolidayPlannerState();
        }

        var normalizedPlans = {};
        var plans = holidayPlanner.plans && typeof holidayPlanner.plans === 'object' ? holidayPlanner.plans : {};
        Object.keys(plans).forEach(function (key) {
          var plan = plans[key] && typeof plans[key] === 'object' ? plans[key] : {};
          var items = Array.isArray(plan.items) ? plan.items : [];
          normalizedPlans[key] = {
            dateLabel: String(plan.dateLabel || ''),
            items: items.map(function (item) {
              item = item && typeof item === 'object' ? item : { text: String(item || ''), done: false };
              return {
                id: item.id || uid(),
                text: String(item.text || ''),
                done: Boolean(item.done)
              };
            })
          };
        });

        return {
          selectedDate: normalizeHolidayDateKey(holidayPlanner.selectedDate, defaultHolidayPlannerState().selectedDate),
          plans: normalizedPlans
        };
      }

      function normalizeHolidayDateKey(value, fallback) {
        if (typeof value !== 'string') return fallback;
        var match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        if (!match) return fallback;
        var date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
        return Number.isFinite(date.getTime()) ? holidayDateKey(date) : fallback;
      }

      function defaultState() {
        if (HOLIDAY_MODE) return defaultHolidayState();

        return {
          dayRemainingWidgetAdded: true,
          widgets: [
            { id: uid(), type: 'weather', title: 'Singapore Weather', x: 0, y: 0, w: 330, h: 250, data: {} },
            { id: uid(), type: 'urgency', title: 'Time Left', x: 350, y: 0, w: 390, h: 300, data: {} },
            { id: uid(), type: 'notes', title: 'Quick Notes', x: 760, y: 0, w: 410, h: 360, data: { text: '', fontSize: '18', notesFormat: 'plain-v1' } },
            { id: uid(), type: 'tasks', title: 'Homework Tasks', x: 0, y: 280, w: 380, h: 350, data: { tasks: [{ id: uid(), text: 'Add assignments here', done: false }] } },
            { id: uid(), type: 'pomodoro', title: 'Focus Timer', x: 400, y: 330, w: 360, h: 360, data: { mode: 'work', workMinutes: 25, breakMinutes: 5, longBreakMinutes: 15, remainingSeconds: 1500, running: false, sessions: 0 } },
            { id: uid(), type: 'calendar', title: 'Google Calendar', x: 780, y: 390, w: 520, h: 430, data: { embedUrl: '' } },
            { id: uid(), type: 'dayRemaining', title: 'Day Remaining', x: 0, y: 710, w: 920, h: 280, data: {} }
          ]
        };
      }

      function defaultHolidayState() {
        return {
          dayRemainingWidgetAdded: true,
          holidayPlanner: defaultHolidayPlannerState(),
          widgets: [
            { id: uid(), type: 'weather', title: 'Singapore Weather', x: 0, y: 0, w: 330, h: 250, data: {} },
            { id: uid(), type: 'urgency', title: 'Time Left', x: 350, y: 0, w: 390, h: 300, data: {} },
            { id: uid(), type: 'notes', title: 'Summer Goals', x: 760, y: 0, w: 410, h: 360, data: { text: 'Write the main things you want to finish this holiday.', fontSize: '18', notesFormat: 'plain-v1' } },
            { id: uid(), type: 'tasks', title: 'Holiday Tasks', x: 0, y: 280, w: 380, h: 350, data: { tasks: [{ id: uid(), text: 'Plan one useful thing for today', done: false }] } },
            { id: uid(), type: 'pomodoro', title: 'Focus Timer', x: 400, y: 330, w: 360, h: 360, data: { mode: 'work', workMinutes: 25, breakMinutes: 5, longBreakMinutes: 15, remainingSeconds: 1500, running: false, sessions: 0 } },
            { id: uid(), type: 'calendar', title: 'Google Calendar', x: 780, y: 390, w: 520, h: 430, data: { embedUrl: '' } },
            { id: uid(), type: 'dayRemaining', title: 'Day Remaining', x: 0, y: 710, w: 920, h: 280, data: {} }
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

        setSaveStatus('Saving...', false);
        return fetch(DATA_ENDPOINT, {
          method: 'PUT',
          credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ state: state })
        })
          .then(function (response) {
            if (!response.ok) throw new Error('Planner save failed with status ' + response.status);
            return response.json();
          })
          .then(function () {
            pendingSave = false;
            setSaveStatus('Saved', false);
          })
          .catch(function () {
            pendingSave = true;
            setSaveStatus('Saved locally - server unavailable', true);
          });
      }

      function scheduleSave() {
        clearTimeout(saveTimer);
        setSaveStatus('Unsaved changes', false);
        saveTimer = setTimeout(saveState, 400);
      }

      function setSaveStatus(message, isError) {
        saveStatus.textContent = message;
        saveStatus.classList.toggle('error', Boolean(isError));
      }

      function loadRemoteState() {
        fetch(DATA_ENDPOINT, {
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
              state = normalizePlannerState(data.state);
            } else {
              state = normalizePlannerState(loadLocalState());
              pendingSave = true;
            }
            pendingSave = addDayRemainingWidgetOnce(state) || pendingSave;
            setSaveStatus(data.exists ? 'Loaded from server' : 'Ready', false);
          })
          .catch(function () {
            state = normalizePlannerState(loadLocalState());
            addDayRemainingWidgetOnce(state);
            pendingSave = true;
            setSaveStatus('Using local copy - server unavailable', true);
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
        if (event.target.closest && (event.target.closest('button') || event.target.closest('input') || event.target.closest('textarea') || event.target.closest('select'))) return;
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
          normalizeTextNotes(widget);
          var fontSize = widget.data.fontSize || '18';
          return '<div class="note-tools"><select data-note-size aria-label="Note text size"><option value="15">Small</option><option value="18">Normal</option><option value="22">Large</option><option value="28">Huge</option></select><button type="button" data-note-clear>Clear</button></div><textarea class="notes" data-note-text placeholder="Write anything here..." style="font-size:' + escapeAttr(fontSize) + 'px;">' + escapeHtml(widget.data.text) + '</textarea>';
        }

        if (widget.type === 'urgency') {
          return '<div data-urgency></div>';
        }

        if (widget.type === 'dayRemaining') {
          return '<div class="day-remaining" data-day-remaining><div class="progress-row"><div class="progress-label"><span>Day used</span><span data-day-remaining-text>Loading...</span></div><div class="track"><div class="bar" data-day-remaining-bar></div></div></div><div class="day-remaining-detail">7:30 AM to 9:30 PM Singapore time</div></div>';
        }

        if (widget.type === 'pomodoro') {
          normalizePomodoro(widget);
          return '<div class="pomodoro" data-pomodoro><div class="pomodoro-time" data-pomodoro-time>--:--</div><div class="pomodoro-mode"><button type="button" data-pomodoro-mode="work">Focus</button><button type="button" data-pomodoro-mode="break">Break</button><button type="button" data-pomodoro-mode="longBreak">Long</button></div><div class="pomodoro-controls"><button class="primary" type="button" data-pomodoro-start>Start</button><button type="button" data-pomodoro-pause>Pause</button><button type="button" data-pomodoro-reset>Reset</button></div><div class="pomodoro-settings"><label>Focus<input type="number" min="1" max="180" data-pomodoro-work value="' + escapeAttr(widget.data.workMinutes) + '"></label><label>Break<input type="number" min="1" max="60" data-pomodoro-break value="' + escapeAttr(widget.data.breakMinutes) + '"></label><label>Long<input type="number" min="1" max="90" data-pomodoro-long value="' + escapeAttr(widget.data.longBreakMinutes) + '"></label></div><div class="pomodoro-status" data-pomodoro-status></div></div>';
        }

        if (widget.type === 'taskTimer') {
          normalizeTaskTimer(widget);
          return '<div class="task-timer" data-task-timer><label class="task-timer-field">Title<input data-task-timer-title placeholder="Task I am doing" value="' + escapeAttr(widget.data.taskTitle) + '"></label><label class="task-timer-field">Description<textarea data-task-timer-description placeholder="Description of task I am doing">' + escapeHtml(widget.data.description) + '</textarea></label><label class="task-timer-field">Expected duration minutes<input type="number" min="1" max="480" data-task-timer-duration value="' + escapeAttr(widget.data.durationMinutes) + '"></label><div class="task-timer-time" data-task-timer-time>--:--</div><div class="task-timer-controls"><button class="primary" type="button" data-task-timer-start>Start</button><button type="button" data-task-timer-pause>Pause</button><button type="button" data-task-timer-reset>Reset</button></div><div class="task-timer-status" data-task-timer-status></div></div>';
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
          bindTextNotes(widget, body);
        }

        if (widget.type === 'pomodoro') {
          bindPomodoro(widget, body);
        }

        if (widget.type === 'taskTimer') {
          bindTaskTimer(widget, body);
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

      function normalizeTextNotes(widget) {
        widget.data = widget.data || {};
        if (widget.data.notesFormat !== 'plain-v1') {
          if (Array.isArray(widget.data.noteItems)) {
            widget.data.text = widget.data.noteItems.map(function (item) {
              item = item && typeof item === 'object' ? item : { text: String(item || '') };
              var indent = clampNumber(item.indent, 0, 5, 0);
              return Array(indent + 1).join('  ') + String(item.text || '');
            }).join('\n');
          } else {
            widget.data.text = String(widget.data.text || '').replace(/\\n/g, '\n');
          }
          delete widget.data.noteItems;
          delete widget.data.format;
          widget.data.notesFormat = 'plain-v1';
        }

        widget.data.text = String(widget.data.text || '');
        widget.data.fontSize = String(clampNumber(widget.data.fontSize, 15, 28, 18));
      }

      function bindTextNotes(widget, body) {
        normalizeTextNotes(widget);
        var textarea = body.querySelector('[data-note-text]');
        var size = body.querySelector('[data-note-size]');
        size.value = widget.data.fontSize;

        size.addEventListener('change', function () {
          widget.data.fontSize = String(clampNumber(size.value, 15, 28, 18));
          size.value = widget.data.fontSize;
          textarea.style.fontSize = widget.data.fontSize + 'px';
          scheduleSave();
        });

        textarea.addEventListener('input', function () {
          widget.data.text = textarea.value;
          scheduleSave();
        });

        body.querySelector('[data-note-clear]').addEventListener('click', function () {
          textarea.value = '';
          widget.data.text = '';
          textarea.focus();
          scheduleSave();
        });
      }

      function renderTasks(widget, body, key) {
        var list = body.querySelector(key === 'tasks' ? '[data-task-list]' : '[data-habit-list]');
        var items = Array.isArray(widget.data[key]) ? widget.data[key] : [];
        widget.data[key] = items.map(function (item) {
          item = item && typeof item === 'object' ? item : { text: String(item || ''), done: false };
          item.id = item.id || uid();
          item.text = item.text || '';
          item.done = Boolean(item.done);
          return item;
        });
        items = widget.data[key];
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
        updateHolidayTracker();
        updateUrgencyWidgets();
        updateDayRemainingWidgets();
        updateWeatherWidgets();
        updatePomodoroWidgets();
        updateTaskTimerWidgets();
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

      function normalizeTaskTimer(widget) {
        widget.data.taskTitle = widget.data.taskTitle || '';
        widget.data.description = widget.data.description || '';
        widget.data.durationMinutes = clampNumber(widget.data.durationMinutes, 1, 480, 30);
        if (!Number.isFinite(Number(widget.data.remainingSeconds))) {
          widget.data.remainingSeconds = taskTimerDuration(widget);
        }
        widget.data.remainingSeconds = clampNumber(widget.data.remainingSeconds, 0, 480 * 60, taskTimerDuration(widget));
        widget.data.running = Boolean(widget.data.running);
      }

      function taskTimerDuration(widget) {
        return widget.data.durationMinutes * 60;
      }

      function bindTaskTimer(widget, body) {
        normalizeTaskTimer(widget);

        var title = body.querySelector('[data-task-timer-title]');
        var description = body.querySelector('[data-task-timer-description]');
        var duration = body.querySelector('[data-task-timer-duration]');

        title.addEventListener('input', function () {
          widget.data.taskTitle = title.value;
          scheduleSave();
        });

        description.addEventListener('input', function () {
          widget.data.description = description.value;
          scheduleSave();
        });

        duration.addEventListener('change', function () {
          widget.data.durationMinutes = clampNumber(duration.value, Number(duration.min), Number(duration.max), widget.data.durationMinutes);
          duration.value = widget.data.durationMinutes;
          if (!widget.data.running) {
            widget.data.remainingSeconds = taskTimerDuration(widget);
          }
          updateTaskTimerWidget(widget);
          scheduleSave();
        });

        body.querySelector('[data-task-timer-start]').addEventListener('click', function () {
          normalizeTaskTimer(widget);
          if (widget.data.remainingSeconds <= 0) widget.data.remainingSeconds = taskTimerDuration(widget);
          widget.data.running = true;
          widget.data.endsAt = Date.now() + widget.data.remainingSeconds * 1000;
          updateTaskTimerWidget(widget);
          scheduleSave();
        });

        body.querySelector('[data-task-timer-pause]').addEventListener('click', function () {
          syncTaskTimerRemaining(widget);
          widget.data.running = false;
          delete widget.data.endsAt;
          updateTaskTimerWidget(widget);
          scheduleSave();
        });

        body.querySelector('[data-task-timer-reset]').addEventListener('click', function () {
          widget.data.running = false;
          delete widget.data.endsAt;
          widget.data.remainingSeconds = taskTimerDuration(widget);
          updateTaskTimerWidget(widget);
          scheduleSave();
        });

        updateTaskTimerWidget(widget);
      }

      function syncTaskTimerRemaining(widget) {
        normalizeTaskTimer(widget);
        if (widget.data.running && widget.data.endsAt) {
          widget.data.remainingSeconds = Math.max(0, Math.ceil((widget.data.endsAt - Date.now()) / 1000));
        }
      }

      function updateTaskTimerWidgets() {
        state.widgets.filter(function (widget) {
          return widget.type === 'taskTimer';
        }).forEach(updateTaskTimerWidget);
      }

      function updateTaskTimerWidget(widget) {
        syncTaskTimerRemaining(widget);
        if (widget.data.running && widget.data.remainingSeconds <= 0) {
          widget.data.running = false;
          delete widget.data.endsAt;
          scheduleSave();
        }

        var el = board.querySelector('[data-id="' + widget.id + '"]');
        if (!el) return;

        var time = el.querySelector('[data-task-timer-time]');
        var start = el.querySelector('[data-task-timer-start]');
        var status = el.querySelector('[data-task-timer-status]');
        var seconds = widget.data.remainingSeconds;
        var minutes = Math.floor(seconds / 60);
        var remainder = seconds % 60;
        time.textContent = String(minutes).padStart(2, '0') + ':' + String(remainder).padStart(2, '0');
        start.textContent = widget.data.running ? 'Running' : 'Start';
        if (seconds <= 0) {
          status.textContent = 'Done';
        } else if (widget.data.running) {
          status.textContent = 'Counting down';
        } else {
          status.textContent = 'Ready';
        }
      }

      function updateUrgencyWidgets() {
        document.querySelectorAll('[data-urgency]').forEach(function (target) {
          var now = singaporeNow();
          var dayWindow = plannerDayWindow(now);

          var weekStart = new Date(dayWindow.calendarDayStart);
          var day = weekStart.getDay();
          var mondayOffset = day === 0 ? -6 : 1 - day;
          weekStart.setDate(weekStart.getDate() + mondayOffset);
          var weekEnd = new Date(weekStart);
          weekEnd.setDate(weekEnd.getDate() + 7);

          var monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
          var monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1);

          target.innerHTML =
            progressHtml('Day used', percentBetween(now, dayWindow.dayStart, dayWindow.dayEnd), msLeft(now, dayWindow.dayEnd)) +
            progressHtml('Week used', percentBetween(now, weekStart, weekEnd), msLeft(now, weekEnd)) +
            progressHtml('Month used', percentBetween(now, monthStart, monthEnd), msLeft(now, monthEnd));
        });
      }

      function updateDayRemainingWidgets() {
        document.querySelectorAll('[data-day-remaining]').forEach(function (target) {
          var now = singaporeNow();
          var dayWindow = plannerDayWindow(now);
          var usedPercent = clamp(percentBetween(now, dayWindow.dayStart, dayWindow.dayEnd), 0, 100);
          var leftText = msLeft(now, dayWindow.dayEnd);
          target.querySelector('[data-day-remaining-text]').textContent = Math.round(usedPercent) + '% used - ' + leftText + ' left';
          target.querySelector('[data-day-remaining-bar]').style.width = usedPercent + '%';
        });
      }

      function updateHolidayTracker() {
        if (!HOLIDAY_MODE) return;

        var bounds = holidayBounds();
        var start = bounds.start;
        var endExclusive = bounds.endExclusive;
        var now = singaporeNow();
        var today = new Date(now);
        today.setHours(0, 0, 0, 0);

        state.holidayPlanner = normalizeHolidayPlannerState(state.holidayPlanner);
        var selectedDateKey = normalizeHolidayDateKey(state.holidayPlanner.selectedDate, holidayDateKey(today));
        if (selectedDateKey && !state.holidayPlanner.plans[selectedDateKey]) {
          state.holidayPlanner.selectedDate = selectedDateKey;
        }

        var totalDays = daysBetween(start, endExclusive);
        var usedDays = clamp(daysBetween(start, today), 0, totalDays);
        var leftDays = totalDays - usedDays;
        var usedPercent = totalDays ? (usedDays / totalDays) * 100 : 0;
        var leftPercent = 100 - usedPercent;

        setHolidayText('[data-holiday-used-days]', usedDays);
        setHolidayText('[data-holiday-left-days]', leftDays);
        setHolidayText('[data-holiday-total-days]', totalDays);
        setHolidayWidth('[data-holiday-used-bar]', usedPercent);
        setHolidayWidth('[data-holiday-left-bar]', leftPercent);
        setHolidayText('[data-holiday-percent]', Math.round(usedPercent) + '% used - ' + Math.round(leftPercent) + '% left');
        setHolidayText('[data-holiday-week]', 'Week ' + holidayWeekNumber(today) + ' of holiday');
        renderHolidayCalendar(start, endExclusive, today);
        renderHolidayDayPanel(today);
      }

      function renderHolidayCalendar(start, endExclusive, today) {
        var calendar = document.getElementById('holidayCalendar');
        if (!calendar) return;

        var months = [
          { label: 'June 2026', year: 2026, month: 5 },
          { label: 'July 2026', year: 2026, month: 6 },
          { label: 'August 2026', year: 2026, month: 7 }
        ];
        var weekdayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        var selectedDateKey = normalizeHolidayDateKey(state.holidayPlanner.selectedDate, holidayDateKey(today));

        calendar.innerHTML = months.map(function (month) {
          var first = new Date(month.year, month.month, 1);
          var daysInMonth = new Date(month.year, month.month + 1, 0).getDate();
          var cells = weekdayLabels.map(function (day) {
            return '<div class="holiday-weekday">' + day + '</div>';
          });

          for (var blank = 0; blank < first.getDay(); blank += 1) {
            cells.push('<div class="holiday-blank"></div>');
          }

          for (var dayNumber = 1; dayNumber <= daysInMonth; dayNumber += 1) {
            var date = new Date(month.year, month.month, dayNumber);
            var dateKey = holidayDateKey(date);
            var inBreak = date >= start && date < endExclusive;
            var isUsed = inBreak && date < today;
            var isLeft = inBreak && date >= today;
            var isToday = sameCalendarDay(date, today);
            var isSelected = selectedDateKey === dateKey;
            var classes = ['holiday-day'];
            if (inBreak) classes.push('in-break');
            if (isUsed) classes.push('used');
            if (isLeft) classes.push('left');
            if (isToday) classes.push('today');
            if (isSelected) classes.push('selected');
            var content = '<div class="' + classes.join(' ') + '"' + (inBreak ? ' data-holiday-date="' + dateKey + '" role="button" tabindex="0"' : '') + '>' + dayNumber + '</div>';
            cells.push(content);
          }

          return '<section class="holiday-month"><h3>' + month.label + '</h3><div class="holiday-grid">' + cells.join('') + '</div></section>';
        }).join('');

        calendar.querySelectorAll('[data-holiday-date]').forEach(function (dayCell) {
          dayCell.addEventListener('click', function () {
            state.holidayPlanner.selectedDate = dayCell.getAttribute('data-holiday-date');
            scheduleSave();
            renderHolidayDayPanel(today);
            renderHolidayCalendar(start, endExclusive, today);
          });
          dayCell.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              state.holidayPlanner.selectedDate = dayCell.getAttribute('data-holiday-date');
              scheduleSave();
              renderHolidayDayPanel(today);
              renderHolidayCalendar(start, endExclusive, today);
            }
          });
        });
      }

      function renderHolidayDayPanel(today) {
        var panel = document.querySelector('[data-holiday-day-panel]');
        if (!panel) return;

        state.holidayPlanner = normalizeHolidayPlannerState(state.holidayPlanner);
        var selectedDateKey = normalizeHolidayDateKey(state.holidayPlanner.selectedDate, holidayDateKey(today));
        var selectedDate = new Date(selectedDateKey + 'T00:00:00');
        var selectedDateLabel = selectedDate.toLocaleDateString('en-SG', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
        var plan = getHolidayPlanForDateKey(selectedDateKey);
        state.holidayPlanner.selectedDate = selectedDateKey;

        panel.innerHTML = [
          '<div class="holiday-day-panel-head">',
          '<div class="holiday-day-panel-title">' + escapeHtml(selectedDateLabel) + '</div>',
          '<div class="holiday-day-panel-subtitle">Week ' + holidayWeekNumber(selectedDate) + ' of holiday</div>',
          '</div>',
          '<form class="holiday-day-form" data-holiday-day-form>',
          '<input type="text" name="holidayDayTask" placeholder="Add a plan for this day" data-holiday-day-input>',
          '<button class="btn" type="submit">Add</button>',
          '</form>',
          '<div class="holiday-day-list" data-holiday-day-list>' + (plan.items.length ? plan.items.map(function (item) {
            return '<div class="holiday-day-item ' + (item.done ? 'done' : '') + '" data-holiday-item-id="' + escapeAttr(item.id) + '"><input type="checkbox" ' + (item.done ? 'checked' : '') + '><input type="text" class="holiday-plan-text" value="' + escapeAttr(item.text) + '"><button type="button" aria-label="Delete item">x</button></div>';
          }).join('') : '<div class="holiday-day-panel-subtitle">No plans yet — add one for this day.</div>') + '</div>'
        ].join('');

        var form = panel.querySelector('[data-holiday-day-form]');
        form.addEventListener('submit', function (event) {
          event.preventDefault();
          var input = form.querySelector('[data-holiday-day-input]');
          var text = String(input.value || '').trim();
          if (!text) return;
          var planEntry = getHolidayPlanForDateKey(selectedDateKey);
          planEntry.items.push({ id: uid(), text: text, done: false });
          input.value = '';
          scheduleSave();
          renderHolidayDayPanel(today);
        });

        panel.querySelectorAll('.holiday-day-item').forEach(function (row) {
          var itemId = row.getAttribute('data-holiday-item-id');
          var item = plan.items.find(function (entry) { return entry.id === itemId; });
          if (!item) return;
          var checkbox = row.querySelector('input[type="checkbox"]');
          var textInput = row.querySelector('input[type="text"]');
          var removeButton = row.querySelector('button');
          checkbox.addEventListener('change', function () {
            item.done = checkbox.checked;
            row.classList.toggle('done', item.done);
            scheduleSave();
          });
          textInput.addEventListener('input', function () {
            item.text = textInput.value;
            scheduleSave();
          });
          removeButton.addEventListener('click', function () {
            plan.items = plan.items.filter(function (entry) { return entry.id !== item.id; });
            scheduleSave();
            renderHolidayDayPanel(today);
          });
        });
      }

      function getHolidayPlanForDateKey(dateKey) {
        state.holidayPlanner = normalizeHolidayPlannerState(state.holidayPlanner);
        if (!state.holidayPlanner.plans[dateKey]) {
          state.holidayPlanner.plans[dateKey] = {
            dateLabel: formatHolidayDateLabel(dateKey),
            items: []
          };
        }
        return state.holidayPlanner.plans[dateKey];
      }

      function formatHolidayDateLabel(dateKey) {
        var date = new Date(dateKey + 'T00:00:00');
        return date.toLocaleDateString('en-SG', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
      }

      function holidayBounds() {
        return {
          start: new Date(2026, 5, 25),
          endExclusive: new Date(2026, 7, 13)
        };
      }

      function holidayDateKey(date) {
        return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
      }

      function holidayWeekNumber(date) {
        var start = holidayBounds().start;
        var weekStart = getWeekStart(date);
        var holidayWeekStart = getWeekStart(start);
        var daysSinceStart = Math.round((weekStart - holidayWeekStart) / 86400000);
        return Math.max(1, Math.floor(daysSinceStart / 7) + 1);
      }

      function getWeekStart(date) {
        var weekStart = new Date(date);
        weekStart.setHours(0, 0, 0, 0);
        var day = weekStart.getDay();
        var mondayOffset = day === 0 ? -6 : 1 - day;
        weekStart.setDate(weekStart.getDate() + mondayOffset);
        return weekStart;
      }

      function setHolidayText(selector, value) {
        var target = document.querySelector(selector);
        if (target) target.textContent = value;
      }

      function setHolidayWidth(selector, value) {
        var target = document.querySelector(selector);
        if (target) target.style.width = clamp(value, 0, 100) + '%';
      }

      function daysBetween(start, end) {
        return Math.floor((end - start) / 86400000);
      }

      function sameCalendarDay(a, b) {
        return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
      }

      function plannerDayWindow(now) {
        var calendarDayStart = new Date(now);
        calendarDayStart.setHours(0, 0, 0, 0);
        var dayStart = new Date(now);
        dayStart.setHours(7, 30, 0, 0);
        var dayEnd = new Date(now);
        dayEnd.setHours(21, 30, 0, 0);
        return {
          calendarDayStart: calendarDayStart,
          dayStart: dayStart,
          dayEnd: dayEnd
        };
      }

      function progressHtml(label, percent, leftText) {
        var safePercent = clamp(percent, 0, 100);
        return '<div class="progress-row"><div class="progress-label"><span>' + label + '</span><span>' + Math.round(safePercent) + '% used - ' + leftText + ' left</span></div><div class="track"><div class="bar" style="width:' + safePercent + '%"></div></div></div>';
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

      function addDayRemainingWidgetOnce(targetState) {
        if (!targetState || !Array.isArray(targetState.widgets)) return false;
        if (targetState.dayRemainingWidgetAdded || targetState.widgets.some(function (widget) { return widget.type === 'dayRemaining'; })) {
          targetState.dayRemainingWidgetAdded = true;
          return false;
        }

        targetState.widgets.push({
          id: uid(),
          type: 'dayRemaining',
          title: 'Day Remaining',
          x: 420,
          y: 700,
          w: 920,
          h: 280,
          data: {}
        });
        targetState.dayRemainingWidgetAdded = true;
        return true;
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
      setInterval(updateTaskTimerWidgets, 1000);
      setInterval(updateHolidayTracker, 30000);
      setInterval(updateUrgencyWidgets, 30000);
      setInterval(updateDayRemainingWidgets, 30000);
      setInterval(updateWeatherWidgets, 600000);
      loadRemoteState();
    }());
  </script>
</body>
</html>`;
}

module.exports = { handle };
