const fs = require('fs');
const path = require('path');

const WIDGET_ROUTE = '/assets/gemini-widget.js';
const WIDGET_TAG = `<script src="${WIDGET_ROUTE}" defer></script>`;
const WIDGET_FILE = path.join(__dirname, 'public', 'gemini-widget.js');

function headerValue(headers, name) {
  if (!headers) return '';
  const matchingKey = Object.keys(headers).find(key => key.toLowerCase() === name);
  return matchingKey ? String(headers[matchingKey]) : '';
}

function addWidgetToHtml(html) {
  if (!/(?:<!doctype\s+html|<html[\s>])/i.test(html) || html.includes(WIDGET_ROUTE)) {
    return html;
  }

  if (/<\/body\s*>/i.test(html)) {
    return html.replace(/<\/body\s*>/i, `${WIDGET_TAG}\n</body>`);
  }

  return `${html}\n${WIDGET_TAG}`;
}

function injectWidgetIntoHtmlResponses(request, response) {
  if (request.method !== 'GET') return;

  let contentType = '';
  const originalWriteHead = response.writeHead;
  const originalEnd = response.end;

  response.writeHead = function writeHeadWithWidget(statusCode, statusMessage, headers) {
    const responseHeaders = typeof statusMessage === 'object' && statusMessage !== null
      ? statusMessage
      : headers;
    contentType = headerValue(responseHeaders, 'content-type') || contentType;
    return originalWriteHead.apply(this, arguments);
  };

  response.end = function endWithWidget(chunk, encoding, callback) {
    if (
      chunk !== undefined &&
      chunk !== null &&
      /^text\/html(?:;|$)/i.test(contentType) &&
      this.statusCode >= 200 &&
      this.statusCode < 300
    ) {
      const isBuffer = Buffer.isBuffer(chunk);
      const html = isBuffer ? chunk.toString('utf8') : String(chunk);
      const transformed = addWidgetToHtml(html);
      chunk = isBuffer ? Buffer.from(transformed) : transformed;
    }

    return originalEnd.call(this, chunk, encoding, callback);
  };
}

function serveWidget(request, response) {
  const pathname = request.url.split('?')[0];
  if (pathname !== WIDGET_ROUTE || (request.method !== 'GET' && request.method !== 'HEAD')) {
    return false;
  }

  fs.readFile(WIDGET_FILE, (error, data) => {
    if (error) {
      response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('Gemini widget is unavailable.');
      return;
    }

    response.writeHead(200, {
      'Content-Type': 'application/javascript; charset=utf-8',
      'Cache-Control': 'public, max-age=300'
    });
    response.end(request.method === 'HEAD' ? undefined : data);
  });
  return true;
}

module.exports = {
  WIDGET_ROUTE,
  addWidgetToHtml,
  injectWidgetIntoHtmlResponses,
  serveWidget
};
