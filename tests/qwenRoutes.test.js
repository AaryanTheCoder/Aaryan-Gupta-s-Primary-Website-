const assert = require('assert');
const { Readable } = require('stream');
const qwenRoutes = require('../src/pages/qwen/routes');

function invokeApi(payload, config) {
  return new Promise((resolve, reject) => {
    const req = Readable.from([JSON.stringify(payload)]);
    req.url = '/api/qwen';
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

    Promise.resolve(qwenRoutes.handle(req, res, config)).catch(reject);
  });
}

(async () => {
  const requests = [];
  const fetchImpl = async (url, options = {}) => {
    const payload = options.body ? JSON.parse(options.body) : null;
    requests.push({ url, options, payload });

    if (url.endsWith('/api/tags')) {
      return {
        ok: true,
        status: 200,
        async json() {
          return { models: [{ name: 'qwen3.5:2b' }] };
        }
      };
    }

    if (url.endsWith('/api/chat') && requests.filter(request => request.url.endsWith('/api/chat')).length === 1) {
      return {
        ok: true,
        status: 200,
        async json() {
          return {
            message: {
              role: 'assistant',
              content: '',
              tool_calls: [{
                function: {
                  name: 'web_search',
                  arguments: { query: 'latest Mars news' }
                }
              }]
            }
          };
        }
      };
    }

    if (url === 'https://ollama.com/api/web_search') {
      return {
        ok: true,
        status: 200,
        async json() {
          return {
            results: [{
              title: 'Mars Update',
              url: 'https://example.com/mars',
              content: 'A useful search snippet.'
            }]
          };
        }
      };
    }

    if (url.endsWith('/api/chat')) {
      return {
        ok: true,
        status: 200,
        async json() {
          return {
            message: {
              role: 'assistant',
              content: 'Nova searched and found a Mars update.'
            }
          };
        }
      };
    }

    throw new Error(`Unexpected request to ${url}`);
  };

  const response = await invokeApi({
    message: 'Search for Mars news and use this file.',
    attachments: [{ name: 'notes.txt', text: 'Remember to explain simply.' }],
    history: [{ role: 'assistant', content: 'Hi, I am Nova.' }]
  }, {
    fetchImpl,
    searchApiKey: 'test-search-key',
    autoStartOllama: false
  });

  assert.strictEqual(response.statusCode, 200);
  assert.deepStrictEqual(JSON.parse(response.body), {
    reply: 'Nova searched and found a Mars update.',
    sources: [{ title: 'Mars Update', url: 'https://example.com/mars' }],
    toolsUsed: ['web_search']
  });

  const firstChat = requests.find(request => request.url.endsWith('/api/chat'));
  assert.strictEqual(firstChat.payload.keep_alive, '0s');
  assert.strictEqual(firstChat.payload.model, 'qwen3.5:2b');
  assert.strictEqual(firstChat.payload.tools.some(tool => tool.function.name === 'web_search'), true);
  assert.match(firstChat.payload.messages.at(-1).content, /notes\.txt/);
  assert.match(firstChat.payload.messages.at(-1).content, /Remember to explain simply/);

  const searchRequest = requests.find(request => request.url === 'https://ollama.com/api/web_search');
  assert.strictEqual(searchRequest.options.headers.Authorization, 'Bearer test-search-key');

  console.log('Qwen route tests passed.');
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
