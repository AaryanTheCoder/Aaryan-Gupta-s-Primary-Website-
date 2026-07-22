const crypto = require('crypto');
const fs = require('fs');
const mime = require('mime-types');
const path = require('path');
const {
  escapeAttr,
  isPathInside,
  readJsonBody,
  requireBasicAuth,
  sendJson
} = require('../../shared/routeHelpers');

const PUBLIC_DIR = path.join(__dirname, 'public');
const DEFAULT_DATA_DIR = process.env.WEBSITE_SITE_NAME && process.env.HOME
  ? path.join(process.env.HOME, 'data', 'extension-feedback')
  : path.join(__dirname, 'data');
const DATA_DIR = path.resolve(process.env.FEEDBACK_DATA_DIR || DEFAULT_DATA_DIR);
const UPLOADS_DIR = path.join(DATA_DIR, 'uploads');
const FEEDBACK_PATH = path.join(DATA_DIR, 'feedback.json');
const ADMIN_PASSWORD = process.env.FEEDBACK_ADMIN_PASSWORD || process.env.STORAGE_PASSWORD;
const MAX_TOTAL_IMAGE_BYTES = 20 * 1024 * 1024;
const MAX_JSON_BYTES = 28 * 1024 * 1024;
const MAX_NAME_CHARS = 80;
const MAX_EMAIL_CHARS = 160;
const MAX_DESCRIPTION_CHARS = 5000;
const MAX_IMAGE_COUNT = 6;

const PUBLIC_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8'
};

function cleanText(value, maxLength) {
  return String(value || '')
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function cleanFileName(value, fallback) {
  const name = path.basename(cleanText(value, 180));
  return name.replace(/[^a-zA-Z0-9._ -]/g, '_') || fallback;
}

function readFeedback() {
  try {
    const feedback = JSON.parse(fs.readFileSync(FEEDBACK_PATH, 'utf8'));
    return Array.isArray(feedback) ? feedback : [];
  } catch (error) {
    if (error.code !== 'ENOENT') console.error('Could not read extension feedback:', error);
    return [];
  }
}

function writeFeedback(feedback) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const temporaryPath = `${FEEDBACK_PATH}.${process.pid}.${Date.now()}.tmp`;
  fs.writeFileSync(temporaryPath, JSON.stringify(feedback, null, 2));
  fs.renameSync(temporaryPath, FEEDBACK_PATH);
}

function getDataUrlParts(dataUrl) {
  const match = /^data:(image\/[a-zA-Z0-9.+-]+);base64,([a-zA-Z0-9+/=]+)$/.exec(String(dataUrl || ''));
  if (!match) return null;
  return {
    type: match[1].toLowerCase(),
    data: match[2]
  };
}

function saveImages(feedbackId, images) {
  if (!Array.isArray(images)) return [];
  if (images.length > MAX_IMAGE_COUNT) {
    const error = new Error(`Please attach ${MAX_IMAGE_COUNT} images or fewer.`);
    error.statusCode = 400;
    throw error;
  }

  const imageDirectory = path.join(UPLOADS_DIR, feedbackId);
  const savedImages = [];
  let totalImageBytes = 0;

  images.forEach((image, index) => {
    const parts = getDataUrlParts(image && image.dataUrl);
    if (!parts) {
      const error = new Error('Only image attachments are allowed.');
      error.statusCode = 400;
      throw error;
    }

    const buffer = Buffer.from(parts.data, 'base64');
    totalImageBytes += buffer.length;
    if (totalImageBytes > MAX_TOTAL_IMAGE_BYTES) {
      const error = new Error('Image attachments must be 20 MB or smaller in total.');
      error.statusCode = 413;
      throw error;
    }

    fs.mkdirSync(imageDirectory, { recursive: true });
    const extension = mime.extension(parts.type) || 'png';
    const originalName = cleanFileName(image.name, `image-${index + 1}.${extension}`);
    const storedName = `${index + 1}-${crypto.randomUUID()}.${extension}`;
    fs.writeFileSync(path.join(imageDirectory, storedName), buffer);

    savedImages.push({
      id: crypto.randomUUID(),
      originalName,
      storedName,
      type: parts.type,
      size: buffer.length,
      url: `/extension-feedback/api/images/${feedbackId}/${encodeURIComponent(storedName)}`
    });
  });

  return savedImages;
}

function servePublicFile(req, res, pathname) {
  const relativePath = pathname === '/extension-feedback' || pathname === '/extension-feedback/'
    ? 'index.html'
    : pathname.slice('/extension-feedback/'.length);
  const filePath = path.resolve(PUBLIC_DIR, relativePath);

  if (!isPathInside(PUBLIC_DIR, filePath)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Forbidden');
    return;
  }

  const extension = path.extname(filePath).toLowerCase();
  if (!PUBLIC_TYPES[extension] || !fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Feedback page file not found');
    return;
  }

  const stat = fs.statSync(filePath);
  res.writeHead(200, {
    'Content-Type': PUBLIC_TYPES[extension],
    'Content-Length': stat.size,
    'Cache-Control': extension === '.html' ? 'no-store' : 'public, max-age=3600'
  });
  if (req.method === 'HEAD') res.end();
  else res.end(fs.readFileSync(filePath));
}

function requireAdmin(req, res) {
  if (!ADMIN_PASSWORD) {
    res.writeHead(503, {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store'
    });
    res.end('Set FEEDBACK_ADMIN_PASSWORD or STORAGE_PASSWORD to view feedback.');
    return false;
  }

  return requireBasicAuth(
    req,
    res,
    ADMIN_PASSWORD,
    'Extension Feedback',
    'Feedback admin password required'
  );
}

async function createFeedback(req, res) {
  try {
    const body = await readJsonBody(req, { maxBytes: MAX_JSON_BYTES });
    const name = cleanText(body.name, MAX_NAME_CHARS);
    const email = cleanText(body.email, MAX_EMAIL_CHARS).toLowerCase();
    const description = cleanText(body.description, MAX_DESCRIPTION_CHARS);

    if (!name || !email || !description) {
      sendJson(res, 400, { ok: false, error: 'Name, email, and description are required.' });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      sendJson(res, 400, { ok: false, error: 'Please enter a real email address.' });
      return;
    }

    const feedbackId = crypto.randomUUID();
    const images = saveImages(feedbackId, body.images);
    const feedback = readFeedback();
    const item = {
      id: feedbackId,
      name,
      email,
      description,
      images,
      createdAt: new Date().toISOString()
    };

    feedback.unshift(item);
    writeFeedback(feedback);
    sendJson(res, 201, { ok: true, id: feedbackId });
  } catch (error) {
    console.error('Could not save extension feedback:', error);
    sendJson(res, error.statusCode || 500, {
      ok: false,
      error: error.statusCode ? error.message : 'Feedback could not be saved.'
    });
  }
}

function listFeedback(req, res) {
  if (!requireAdmin(req, res)) return;
  sendJson(res, 200, { feedback: readFeedback() });
}

function serveImage(req, res, pathname) {
  if (!requireAdmin(req, res)) return;

  const parts = pathname.slice('/extension-feedback/api/images/'.length).split('/');
  const feedbackId = cleanFileName(parts[0], '');
  const storedName = cleanFileName(decodeURIComponent(parts[1] || ''), '');
  const filePath = path.resolve(UPLOADS_DIR, feedbackId, storedName);

  if (!feedbackId || !storedName || !isPathInside(UPLOADS_DIR, filePath) || !fs.existsSync(filePath)) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Image not found');
    return;
  }

  const stat = fs.statSync(filePath);
  const type = mime.lookup(filePath) || 'application/octet-stream';
  res.writeHead(200, {
    'Content-Type': type,
    'Content-Length': stat.size,
    'Content-Disposition': `inline; filename="${escapeAttr(storedName)}"`,
    'Cache-Control': 'private, no-store'
  });
  if (req.method === 'HEAD') res.end();
  else res.end(fs.readFileSync(filePath));
}

function handle(req, res) {
  const pathname = new URL(req.url, 'http://localhost').pathname;

  if (pathname === '/extension-feedback/api/feedback' && req.method === 'POST') {
    createFeedback(req, res);
    return;
  }

  if (pathname === '/extension-feedback/api/admin/feedback' && req.method === 'GET') {
    listFeedback(req, res);
    return;
  }

  if (pathname.startsWith('/extension-feedback/api/images/') && (req.method === 'GET' || req.method === 'HEAD')) {
    serveImage(req, res, pathname);
    return;
  }

  if (req.method === 'GET' || req.method === 'HEAD') {
    servePublicFile(req, res, pathname);
    return;
  }

  res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Method not allowed');
}

module.exports = { handle };
