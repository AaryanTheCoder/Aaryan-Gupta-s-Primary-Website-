const fs = require('fs');
const path = require('path');
const https = require('https');
const { isPathInside, readJsonBody } = require('../../shared/routeHelpers');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const SANDBOX_DIR = path.join(__dirname, 'public');
const DEFAULT_SAVES_DIR = process.env.WEBSITE_SITE_NAME && process.env.HOME
  ? path.join(process.env.HOME, 'data', 'sandbox-saves')
  : path.join(__dirname, 'saves');
const SAVES_DIR = path.resolve(process.env.SANDBOX_SAVES_DIR || DEFAULT_SAVES_DIR);
const MAX_SANDBOX_BODY_BYTES = 2 * 1024 * 1024;

if (!fs.existsSync(SAVES_DIR)) {
  fs.mkdirSync(SAVES_DIR, { recursive: true });
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.json': 'application/json; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.ttf':  'font/ttf',
};

function getMime(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return MIME_TYPES[ext] || 'application/octet-stream';
}

function sanitizeId(id) {
  return String(id || '').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 64);
}

function callGemini(prompt) {
  return new Promise((resolve, reject) => {
    if (!GEMINI_API_KEY) {
      return reject(new Error('GEMINI_API_KEY not set'));
    }

    const body = JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.8, maxOutputTokens: 1024 }
    });

    const options = {
      hostname: 'generativelanguage.googleapis.com',
      path: `/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text || '';
          const jsonMatch = text.match(/\{[\s\S]*\}/);
          resolve(jsonMatch ? JSON.parse(jsonMatch[0]) : {});
        } catch {
          reject(new Error('Failed to parse Gemini response'));
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function handle(req, res) {
  const url = req.url;

  // ── API: Save project ──────────────────────────────────────────────
  if (url === '/sandbox/api/save' && req.method === 'POST') {
    readJsonBody(req, { maxBytes: MAX_SANDBOX_BODY_BYTES }).then(body => {
      if (!body || !body.id) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ ok: false, error: 'Missing project id' }));
      }

      const id = sanitizeId(body.id);
      const filePath = path.join(SAVES_DIR, `${id}.json`);
      fs.writeFileSync(filePath, JSON.stringify(body, null, 2));
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, id }));
    }).catch(() => {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: false, error: 'Save failed' }));
    });
    return;
  }

  // ── API: Load project ──────────────────────────────────────────────
  if (url.startsWith('/sandbox/api/load/') && req.method === 'GET') {
    const id = sanitizeId(url.split('/').pop());
    const filePath = path.join(SAVES_DIR, `${id}.json`);

    if (!fs.existsSync(filePath)) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ ok: false, error: 'Project not found' }));
    }

    const data = fs.readFileSync(filePath, 'utf8');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(data);
    return;
  }

  // ── API: List all projects ─────────────────────────────────────────
  if (url === '/sandbox/api/projects' && req.method === 'GET') {
    const files = fs.readdirSync(SAVES_DIR).filter(f => f.endsWith('.json'));
    const projects = files.map(f => {
      try {
        const data = JSON.parse(fs.readFileSync(path.join(SAVES_DIR, f), 'utf8'));
        return { id: data.id, name: data.name || 'Untitled', updatedAt: data.updatedAt };
      } catch {
        return null;
      }
    }).filter(Boolean);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true, projects }));
    return;
  }

  // ── API: Delete project ────────────────────────────────────────────
  if (url.startsWith('/sandbox/api/project/') && req.method === 'DELETE') {
    const id = sanitizeId(url.split('/').pop());
    const filePath = path.join(SAVES_DIR, `${id}.json`);

    if (!fs.existsSync(filePath)) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ ok: false, error: 'Project not found' }));
    }

    fs.unlinkSync(filePath);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  // ── API: AI Generate object ────────────────────────────────────────
  if (url === '/sandbox/api/ai-generate' && req.method === 'POST') {
    readJsonBody(req, { maxBytes: MAX_SANDBOX_BODY_BYTES }).then(async body => {
      const prompt = `You are a game object generator. Given this description: "${body?.prompt || ''}"

Return ONLY a JSON object with these exact fields:
{
  "name": "object name",
  "type": "box" or "sphere" or "cylinder" or "cone" or "torus" or "plane",
  "color": "#hexcolor",
  "scale": [x, y, z],
  "metadata": { "description": "brief description" }
}`;

      const result = await callGemini(prompt);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, object: result }));
    }).catch(err => {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: false, error: err.message }));
    });
    return;
  }

  // ── Static files: serve the built sandbox app ──────────────────────
  let urlPath = url.replace(/^\/sandbox/, '') || '/';
  const cleanPath = urlPath.split('?')[0];
  const relativePath = cleanPath === '' || cleanPath === '/'
    ? 'index.html'
    : cleanPath.replace(/^\/+/, '');
  let filePath = path.resolve(SANDBOX_DIR, relativePath);

  // Prevent path traversal
  if (!isPathInside(SANDBOX_DIR, filePath)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('Forbidden');
  }

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(SANDBOX_DIR, 'index.html');
  }

  const content = fs.readFileSync(filePath);
  res.writeHead(200, { 'Content-Type': getMime(filePath) });
  res.end(content);
}

module.exports = { handle };
