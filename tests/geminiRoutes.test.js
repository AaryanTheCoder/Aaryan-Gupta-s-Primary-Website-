const assert = require('assert');
const { Readable } = require('stream');
const geminiRoutes = require('../src/pages/gemini/routes');

function invokeApi(payload, apiKey = 'test-gemini-key') {
  return new Promise((resolve, reject) => {
    const req = Readable.from([JSON.stringify(payload)]);
    req.url = '/api/gemini';
    req.method = 'POST';
    req.headers = { 'content-type': 'application/json' };

    const chunks = [];
    const res = {
      statusCode: 200,
      headers: {},
      writeHead(statusCode, headers = {}) {
        this.statusCode = statusCode;
        this.headers = headers;
      },
      end(chunk) {
        if (chunk) chunks.push(Buffer.from(String(chunk)));
        resolve({
          statusCode: this.statusCode,
          headers: this.headers,
          body: Buffer.concat(chunks).toString()
        });
      }
    };

    Promise.resolve(geminiRoutes.handle(req, res, apiKey)).catch(reject);
  });
}

(async () => {
  const originalFetch = global.fetch;
  let sentPayload;

  global.fetch = async (url, options) => {
    assert.match(url, /gemini-2\.5-flash:generateContent/);
    sentPayload = JSON.parse(options.body);
    return {
      ok: true,
      status: 200,
      async json() {
        return {
          candidates: [{
            content: {
              parts: [{ text: 'I can see the attached page.' }]
            }
          }]
        };
      }
    };
  };

  try {
    const screenshotData = Buffer.from('small-test-image').toString('base64');
    const response = await invokeApi({
      message: 'What is visible here?',
      history: [
        { role: 'user', text: 'Help me understand this page.' },
        { role: 'assistant', text: 'Attach a screenshot.' }
      ],
      image: {
        mimeType: 'image/jpeg',
        data: screenshotData
      }
    });

    assert.strictEqual(response.statusCode, 200);
    assert.strictEqual(JSON.parse(response.body).reply, 'I can see the attached page.');
    assert.deepStrictEqual(sentPayload.contents, [
      { role: 'user', parts: [{ text: 'Help me understand this page.' }] },
      { role: 'model', parts: [{ text: 'Attach a screenshot.' }] },
      {
        role: 'user',
        parts: [
          {
            inline_data: {
              mime_type: 'image/jpeg',
              data: screenshotData
            }
          },
          { text: 'What is visible here?' }
        ]
      }
    ]);

    const invalidImage = await invokeApi({
      message: 'Read this.',
      image: { mimeType: 'text/html', data: screenshotData }
    });
    assert.strictEqual(invalidImage.statusCode, 400);
    assert.match(JSON.parse(invalidImage.body).error, /JPEG, PNG, or WebP/);

    console.log('Gemini route tests passed.');
  } finally {
    global.fetch = originalFetch;
  }
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
