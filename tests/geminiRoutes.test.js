const assert = require('assert');
const { Readable } = require('stream');
const geminiRoutes = require('../src/pages/gemini/routes');

function invokeApi(payload, config = 'test-gemini-key') {
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

    Promise.resolve(geminiRoutes.handle(req, res, config)).catch(reject);
  });
}

(async () => {
  const originalFetch = global.fetch;
  const requests = [];

  global.fetch = async (url, options) => {
    requests.push({ url, options, payload: JSON.parse(options.body) });
    if (url.includes('/openai/v1/responses')) {
      return {
        ok: true,
        status: 200,
        async json() {
          return {
            output: [{
              type: 'message',
              content: [{ type: 'output_text', text: 'GPT-5 searched and answered.' }]
            }]
          };
        }
      };
    }

    assert.match(url, /gemini-2\.5-flash:generateContent/);
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
    assert.deepStrictEqual(requests[0].payload.tools, [{ google_search_retrieval: {} }]);
    assert.deepStrictEqual(requests[0].payload.contents, [
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

    const missingApiKey = await invokeApi({
      message: 'Say hello in one short sentence.'
    }, '');
    assert.strictEqual(missingApiKey.statusCode, 200);
    assert.match(JSON.parse(missingApiKey.body).reply, /hello|help|available/i);

    const missingDeployment = await invokeApi({
      provider: 'gpt5',
      message: 'Test the Azure configuration.'
    }, {
      azureOpenAiApiKey: 'test-azure-key',
      azureOpenAiEndpoint: 'https://example-resource.openai.azure.com/'
    });
    assert.strictEqual(missingDeployment.statusCode, 500);
    assert.match(JSON.parse(missingDeployment.body).error, /AZURE_OPENAI_DEPLOYMENT/);
    assert.strictEqual(requests.length, 1);

    const gpt5Response = await invokeApi({
      provider: 'gpt5',
      message: 'What changed today?',
      history: [
        { role: 'user', text: 'This must not be sent.' },
        { role: 'assistant', text: 'Neither should this.' }
      ],
      image: {
        mimeType: 'image/jpeg',
        data: screenshotData
      }
    }, {
      geminiApiKey: 'test-gemini-key',
      azureOpenAiApiKey: 'test-azure-key',
      azureOpenAiEndpoint: 'https://example-resource.openai.azure.com/',
      azureOpenAiDeployment: 'my-gpt5-deployment'
    });

    assert.strictEqual(gpt5Response.statusCode, 200);
    assert.strictEqual(JSON.parse(gpt5Response.body).reply, 'GPT-5 searched and answered.');
    assert.strictEqual(requests[1].url, 'https://example-resource.openai.azure.com/openai/v1/responses');
    assert.strictEqual(requests[1].options.headers['api-key'], 'test-azure-key');
    assert.deepStrictEqual(requests[1].payload, {
      model: 'my-gpt5-deployment',
      tools: [{ type: 'web_search' }],
      input: [{
        role: 'user',
        content: [
          { type: 'input_text', text: 'What changed today?' },
          {
            type: 'input_image',
            image_url: `data:image/jpeg;base64,${screenshotData}`
          }
        ]
      }],
      store: false
    });

    console.log('Gemini route tests passed.');
  } finally {
    global.fetch = originalFetch;
  }
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
