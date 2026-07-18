const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { readJsonBody, sendJson } = require('../../shared/routeHelpers');

const MAX_QWEN_BODY_BYTES = 2 * 1024 * 1024;
const MAX_MESSAGE_CHARS = 8000;
const MAX_HISTORY_ITEMS = 10;
const MAX_HISTORY_CHARS = 24000;
const MAX_ATTACHMENTS = 4;
const MAX_ATTACHMENT_CHARS = 12000;
const OLLAMA_SEARCH_URL = 'https://ollama.com/api/web_search';
const DEFAULT_KEEP_ALIVE = '10m';
const DEFAULT_IDLE_TIMEOUT_MS = 10 * 60 * 1000;
const DEFAULT_NUM_CTX = 2048;
const DEFAULT_NUM_THREAD = Math.min(4, Math.max(2, os.cpus().length || 2));

const isAzureAppService = Boolean(process.env.WEBSITE_SITE_NAME || process.env.WEBSITE_INSTANCE_ID);
const defaultModelsPath = isAzureAppService ? '/home/ollama-models' : path.join(process.cwd(), '.ollama-models');
const defaultOllamaBin = isAzureAppService ? '/home/ollama/bin/ollama' : 'ollama';

let chatInProgress = false;
let managedOllamaProcess = null;
let idleShutdownTimer = null;

const ASSISTANT_INSTRUCTIONS = `You are Nova, a friendly and capable AI assistant for a Grade 9 student.

- Use clear, natural English unless the user asks for another language.
- Answer directly first, then explain the important steps simply.
- Use the calculator tool for exact arithmetic.
- Use web search for recent facts, live information, or whenever the user asks you to search.
- When web search is used, base factual claims on the results and mention sources clearly.
- If search is unavailable or uncertain, say so honestly.
- Never invent facts or sources.`;

const calculatorTool = {
  type: 'function',
  function: {
    name: 'calculate',
    description: 'Accurately evaluate a numerical maths expression.',
    parameters: {
      type: 'object',
      required: ['expression'],
      properties: {
        expression: { type: 'string', description: 'A maths expression, such as (180 / 2.5) or sqrt(144).' }
      }
    }
  }
};

const webSearchTool = {
  type: 'function',
  function: {
    name: 'web_search',
    description: 'Search the live web for current or requested information and return titles, URLs, and useful snippets.',
    parameters: {
      type: 'object',
      required: ['query'],
      properties: {
        query: { type: 'string', description: 'A focused web-search query.' }
      }
    }
  }
};

function boundedInteger(value, fallback, min, max) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.max(min, Math.min(max, Math.trunc(number)));
}

function getConfig(overrides = {}) {
  return {
    ollamaUrl: String(overrides.ollamaUrl || process.env.OLLAMA_URL || 'http://127.0.0.1:11434').replace(/\/$/, ''),
    model: overrides.model || process.env.OLLAMA_MODEL || 'qwen3.5:2b',
    modelsPath: path.resolve(overrides.modelsPath || process.env.OLLAMA_MODELS_PATH || defaultModelsPath),
    ollamaBin: overrides.ollamaBin || process.env.OLLAMA_BIN || defaultOllamaBin,
    searchApiKey: overrides.searchApiKey || process.env.OLLAMA_SEARCH_API_KEY || process.env.OLLAMA_API_KEY || '',
    fetchImpl: overrides.fetchImpl || fetch,
    autoStartOllama: overrides.autoStartOllama !== false,
    keepAlive: overrides.keepAlive || process.env.OLLAMA_KEEP_ALIVE || DEFAULT_KEEP_ALIVE,
    idleTimeoutMs: Number(overrides.idleTimeoutMs || process.env.OLLAMA_IDLE_TIMEOUT_MS || DEFAULT_IDLE_TIMEOUT_MS),
    numCtx: boundedInteger(overrides.numCtx || process.env.OLLAMA_NUM_CTX, DEFAULT_NUM_CTX, 512, 8192),
    numThread: boundedInteger(overrides.numThread || process.env.OLLAMA_NUM_THREAD, DEFAULT_NUM_THREAD, 1, 8)
  };
}

function cleanMessages(messages) {
  if (!Array.isArray(messages)) return [];
  const newest = messages
    .filter(message => message && ['user', 'assistant'].includes(message.role))
    .map(message => {
      const content = String(message.content || message.text || '').trim().slice(0, MAX_MESSAGE_CHARS);
      return { role: message.role, content };
    })
    .filter(message => message.content)
    .slice(-MAX_HISTORY_ITEMS);

  const kept = [];
  let totalCharacters = 0;
  for (let index = newest.length - 1; index >= 0; index -= 1) {
    const message = newest[index];
    if (totalCharacters + message.content.length > MAX_HISTORY_CHARS) break;
    kept.unshift(message);
    totalCharacters += message.content.length;
  }
  return kept;
}

function cleanAttachments(attachments) {
  if (!Array.isArray(attachments)) return [];
  let usedCharacters = 0;
  const cleaned = [];

  for (const attachment of attachments.slice(0, MAX_ATTACHMENTS)) {
    const name = String(attachment?.name || 'attached-file').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, 160);
    const text = String(attachment?.text || '').trim();
    if (!text) continue;

    const remaining = MAX_ATTACHMENT_CHARS - usedCharacters;
    if (remaining <= 0) break;
    const content = text.slice(0, remaining);
    usedCharacters += content.length;
    cleaned.push({ name: name || 'attached-file', text: content });
  }

  return cleaned;
}

function messageWithAttachments(message, attachments) {
  if (!attachments.length) return message;
  const fileBlocks = attachments
    .map(file => `File: ${file.name}\n${file.text}`)
    .join('\n\n---\n\n');
  return `${message}\n\nAttached file text:\n\n${fileBlocks}`;
}

async function parseResponse(response) {
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(result.error || `Request failed with status ${response.status}.`);
    error.statusCode = response.status || 500;
    throw error;
  }
  return result;
}

async function getOllamaStatus(config) {
  try {
    const response = await config.fetchImpl(`${config.ollamaUrl}/api/tags`, { signal: AbortSignal.timeout(2000) });
    const result = await parseResponse(response);
    const models = (result.models || []).map(item => item.name || item.model);
    const modelInstalled = models.some(name => name === config.model || name === `${config.model}:latest`);
    const modelLoaded = modelInstalled ? await isModelLoaded(config) : false;
    return {
      running: true,
      modelInstalled,
      modelLoaded,
      managed: Boolean(managedOllamaProcess && !managedOllamaProcess.killed),
      message: modelLoaded
        ? 'Nova is loaded and ready'
        : modelInstalled
          ? 'Nova is installed but not loaded'
          : `The ${config.model} model is not installed yet.`
    };
  } catch {
    return { running: false, modelInstalled: false, modelLoaded: false, managed: false, message: 'Ollama is not running' };
  }
}

async function isModelLoaded(config) {
  try {
    const response = await config.fetchImpl(`${config.ollamaUrl}/api/ps`, { signal: AbortSignal.timeout(2000) });
    const result = await parseResponse(response);
    const models = (result.models || []).map(item => item.name || item.model);
    return models.some(name => name === config.model || name === `${config.model}:latest`);
  } catch {
    return false;
  }
}

async function waitForOllama(config) {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    const status = await getOllamaStatus(config);
    if (status.running) return status;
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  return { running: false, modelInstalled: false, message: 'Ollama did not start in time.' };
}

async function ensureOllamaIsReady(config) {
  const initialStatus = await getOllamaStatus(config);
  if (initialStatus.running) return { status: initialStatus };

  if (!config.autoStartOllama) return { startedProcess: null, status: initialStatus };

  fs.mkdirSync(config.modelsPath, { recursive: true });
  managedOllamaProcess = spawn(config.ollamaBin, ['serve'], {
    env: { ...process.env, OLLAMA_MODELS: config.modelsPath },
    stdio: 'ignore'
  });

  managedOllamaProcess.once('error', error => {
    managedOllamaProcess = null;
    console.error(`Ollama could not start from ${config.ollamaBin}: ${error.message}`);
  });
  managedOllamaProcess.once('close', () => {
    managedOllamaProcess = null;
  });

  const status = await waitForOllama(config);
  return { status };
}

function clearIdleShutdown() {
  if (idleShutdownTimer) clearTimeout(idleShutdownTimer);
  idleShutdownTimer = null;
}

function scheduleIdleShutdown(config) {
  clearIdleShutdown();
  idleShutdownTimer = setTimeout(() => {
    stopQwenSession(config).catch(error => {
      console.error('Could not stop idle Nova session:', error);
    });
  }, Math.max(1000, config.idleTimeoutMs));
  if (idleShutdownTimer.unref) idleShutdownTimer.unref();
}

async function loadModel(config) {
  const response = await config.fetchImpl(`${config.ollamaUrl}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: config.model,
      prompt: '',
      stream: false,
      keep_alive: config.keepAlive
    }),
    signal: AbortSignal.timeout(180000)
  });
  await parseResponse(response);
}

async function unloadModel(config) {
  try {
    const response = await config.fetchImpl(`${config.ollamaUrl}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: config.model,
        prompt: '',
        stream: false,
        keep_alive: '0s'
      }),
      signal: AbortSignal.timeout(30000)
    });
    await parseResponse(response);
  } catch {
    // If Ollama is already stopped, there is nothing left to unload.
  }
}

async function startQwenSession(config) {
  const ollama = await ensureOllamaIsReady(config);
  if (!ollama.status.running) {
    const error = new Error(`${ollama.status.message} Install Ollama or set OLLAMA_BIN correctly.`);
    error.statusCode = 503;
    throw error;
  }
  if (!ollama.status.modelInstalled) {
    const error = new Error(`${ollama.status.message} Run: ollama pull ${config.model}`);
    error.statusCode = 503;
    throw error;
  }

  await loadModel(config);
  scheduleIdleShutdown(config);
  return getOllamaStatus(config);
}

async function stopQwenSession(config) {
  clearIdleShutdown();
  await unloadModel(config);
  if (managedOllamaProcess && !managedOllamaProcess.killed) {
    managedOllamaProcess.kill('SIGTERM');
  }
  managedOllamaProcess = null;
  return getOllamaStatus(config);
}

const mathFunctions = {
  abs: Math.abs,
  ceil: Math.ceil,
  cos: Math.cos,
  floor: Math.floor,
  ln: Math.log,
  log: Math.log10,
  max: Math.max,
  min: Math.min,
  pow: Math.pow,
  round: Math.round,
  sin: Math.sin,
  sqrt: Math.sqrt,
  tan: Math.tan
};

function tokenize(expression) {
  const tokens = [];
  let position = 0;

  while (position < expression.length) {
    const remaining = expression.slice(position);
    const whitespace = remaining.match(/^\s+/);
    if (whitespace) {
      position += whitespace[0].length;
      continue;
    }

    const number = remaining.match(/^(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?/i);
    if (number) {
      tokens.push({ type: 'number', value: Number(number[0]) });
      position += number[0].length;
      continue;
    }

    const identifier = remaining.match(/^[a-z]+/i);
    if (identifier) {
      tokens.push({ type: 'identifier', value: identifier[0].toLowerCase() });
      position += identifier[0].length;
      continue;
    }

    const character = expression[position];
    if ('+-*/%^(),'.includes(character)) {
      tokens.push({ type: character, value: character });
      position += 1;
      continue;
    }

    throw new Error(`Unsupported character: ${character}`);
  }

  return tokens;
}

function calculate(expression) {
  if (typeof expression !== 'string' || !expression.trim()) {
    throw new Error('A calculation is required.');
  }
  if (expression.length > 300) throw new Error('The calculation is too long.');

  const tokens = tokenize(expression);
  let index = 0;

  const peek = type => tokens[index]?.type === type;
  const take = type => {
    if (!peek(type)) throw new Error(`Expected '${type}'.`);
    return tokens[index++];
  };
  let parseExpression;
  let parseUnary;

  const parsePrimary = () => {
    if (peek('number')) return take('number').value;

    if (peek('(')) {
      take('(');
      const value = parseExpression();
      take(')');
      return value;
    }

    if (peek('identifier')) {
      const name = take('identifier').value;
      if (name === 'pi') return Math.PI;
      if (name === 'e') return Math.E;
      if (!mathFunctions[name]) throw new Error(`Unknown function or constant: ${name}`);

      take('(');
      const args = [];
      if (!peek(')')) {
        args.push(parseExpression());
        while (peek(',')) {
          take(',');
          args.push(parseExpression());
        }
      }
      take(')');
      const result = mathFunctions[name](...args);
      if (!Number.isFinite(result)) throw new Error('That calculation has no finite result.');
      return result;
    }

    throw new Error('Expected a number, constant, or function.');
  };

  const parsePower = () => {
    const base = parsePrimary();
    if (!peek('^')) return base;
    take('^');
    return base ** parseUnary();
  };

  parseUnary = () => {
    if (peek('+')) {
      take('+');
      return parseUnary();
    }
    if (peek('-')) {
      take('-');
      return -parseUnary();
    }
    return parsePower();
  };

  const parseTerm = () => {
    let value = parseUnary();
    while (peek('*') || peek('/') || peek('%')) {
      const operator = tokens[index++].type;
      const right = parseUnary();
      if ((operator === '/' || operator === '%') && right === 0) throw new Error('Cannot divide by zero.');
      if (operator === '*') value *= right;
      if (operator === '/') value /= right;
      if (operator === '%') value %= right;
    }
    return value;
  };

  parseExpression = () => {
    let value = parseTerm();
    while (peek('+') || peek('-')) {
      const operator = tokens[index++].type;
      const right = parseTerm();
      value = operator === '+' ? value + right : value - right;
    }
    return value;
  };

  const result = parseExpression();
  if (index !== tokens.length) throw new Error('The calculation could not be understood.');
  if (!Number.isFinite(result)) throw new Error('That calculation has no finite result.');
  return Object.is(result, -0) ? 0 : result;
}

async function callLocalModel(config, messages, tools) {
  let response;
  try {
    response = await config.fetchImpl(`${config.ollamaUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: config.model,
        messages,
        tools,
        stream: false,
        think: false,
        keep_alive: config.keepAlive,
        options: { temperature: 0.4, num_ctx: config.numCtx, num_thread: config.numThread }
      }),
      signal: AbortSignal.timeout(180000)
    });
  } catch (error) {
    const friendly = new Error('Nova could not reach Ollama. Please make sure Ollama is installed and the model has been downloaded.');
    friendly.statusCode = 503;
    friendly.cause = error;
    throw friendly;
  }
  return parseResponse(response);
}

async function searchWeb(query, config) {
  const response = await config.fetchImpl(OLLAMA_SEARCH_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.searchApiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: String(query || '').slice(0, 500), max_results: 5 }),
    signal: AbortSignal.timeout(30000)
  });
  const result = await parseResponse(response);
  return Array.isArray(result.results) ? result.results.slice(0, 5) : [];
}

function toolArguments(call) {
  const args = call?.function?.arguments;
  if (args && typeof args === 'object') return args;
  if (typeof args === 'string') {
    try {
      return JSON.parse(args);
    } catch {
      return {};
    }
  }
  return {};
}

async function createAssistantResponse(config, messages, useWebSearch) {
  const tools = [calculatorTool];
  if (useWebSearch && config.searchApiKey) tools.push(webSearchTool);

  const conversation = [
    {
      role: 'system',
      content: `${ASSISTANT_INSTRUCTIONS}\n\nToday's date is ${new Date().toISOString().slice(0, 10)}. Web search is ${useWebSearch && config.searchApiKey ? 'available' : 'not available in this chat'}.`
    },
    ...messages
  ];
  const sources = [];
  const toolsUsed = new Set();

  for (let turn = 0; turn < 4; turn += 1) {
    const result = await callLocalModel(config, conversation, tools);
    const assistantMessage = result.message || {};
    const calls = assistantMessage.tool_calls || [];
    conversation.push(assistantMessage);

    if (!calls.length) {
      const answer = String(assistantMessage.content || '').trim();
      if (!answer) throw new Error('Nova returned an empty answer. Please try again.');
      const uniqueSources = [...new Map(sources.map(source => [source.url, source])).values()];
      return { reply: answer, sources: uniqueSources, toolsUsed: [...toolsUsed] };
    }

    for (const call of calls) {
      const name = call?.function?.name;
      const args = toolArguments(call);
      let content;

      if (name === 'calculate') {
        try {
          content = String(calculate(args.expression));
          toolsUsed.add('calculator');
        } catch (error) {
          content = `Calculator error: ${error.message}`;
        }
      } else if (name === 'web_search' && config.searchApiKey) {
        try {
          const results = await searchWeb(args.query, config);
          sources.push(...results.filter(item => item.url).map(item => ({ title: item.title || item.url, url: item.url })));
          content = JSON.stringify(results.map(item => ({ title: item.title, url: item.url, content: item.content })));
          toolsUsed.add('web_search');
        } catch (error) {
          content = `Web search failed: ${error.message}`;
        }
      } else {
        content = `Tool '${name || 'unknown'}' is unavailable.`;
      }

      conversation.push({ role: 'tool', tool_name: name || 'unknown', content: content.slice(0, 12000) });
    }
  }

  throw new Error('Nova used too many tool steps. Please make the question more specific and try again.');
}

async function handleQwenApi(req, res, overrides) {
  if (chatInProgress) {
    sendJson(res, 503, { error: 'Nova is answering another message. Please try again shortly.' });
    return;
  }

  chatInProgress = true;

  try {
    const config = getConfig(overrides);
    const body = await readJsonBody(req, { maxBytes: MAX_QWEN_BODY_BYTES });
    const message = typeof body.message === 'string' ? body.message.trim().slice(0, MAX_MESSAGE_CHARS) : '';
    const attachments = cleanAttachments(body.attachments);
    const history = cleanMessages(body.history);

    if (!message && !attachments.length) {
      sendJson(res, 400, { error: 'Message is required.' });
      return;
    }

    const ollama = await ensureOllamaIsReady(config);

    if (!ollama.status.running) {
      sendJson(res, 503, { error: `${ollama.status.message} Install Ollama or set OLLAMA_BIN correctly.` });
      return;
    }

    if (!ollama.status.modelInstalled) {
      sendJson(res, 503, { error: `${ollama.status.message} Run: ollama pull ${config.model}` });
      return;
    }
    if (!ollama.status.modelLoaded) {
      await loadModel(config);
    }

    const messages = [
      ...history,
      { role: 'user', content: messageWithAttachments(message || 'Please read the attached file text.', attachments) }
    ];

    const result = await createAssistantResponse(config, messages, body.useWebSearch !== false);
    scheduleIdleShutdown(config);
    sendJson(res, 200, result);
  } catch (error) {
    sendJson(res, error.statusCode || 500, { error: error.message || 'Nova could not answer right now.' });
  } finally {
    chatInProgress = false;
  }
}

async function handleStart(req, res, overrides) {
  try {
    const config = getConfig(overrides);
    const status = await startQwenSession(config);
    sendJson(res, 200, {
      ok: true,
      configured: status.running && status.modelInstalled,
      loaded: status.modelLoaded,
      managed: status.managed,
      model: config.model,
      message: status.modelLoaded ? 'Nova is loaded and ready.' : status.message
    });
  } catch (error) {
    sendJson(res, error.statusCode || 500, { ok: false, error: error.message || 'Nova could not start.' });
  }
}

async function handleStop(req, res, overrides) {
  try {
    const config = getConfig(overrides);
    const status = await stopQwenSession(config);
    sendJson(res, 200, {
      ok: true,
      loaded: status.modelLoaded,
      managed: status.managed,
      model: config.model,
      message: status.running ? 'Nova has been unloaded.' : 'Nova has stopped.'
    });
  } catch (error) {
    sendJson(res, error.statusCode || 500, { ok: false, error: error.message || 'Nova could not stop.' });
  }
}

async function handleStatus(req, res, overrides) {
  const config = getConfig({ ...overrides, autoStartOllama: false });
  const status = await getOllamaStatus(config);
  sendJson(res, 200, {
    configured: status.running && status.modelInstalled,
    provider: 'Ollama (local)',
    model: config.model,
    webSearch: Boolean(config.searchApiKey),
    loaded: status.modelLoaded,
    managed: status.managed,
    keepAlive: config.keepAlive,
    idleTimeoutMs: config.idleTimeoutMs,
    numCtx: config.numCtx,
    numThread: config.numThread,
    message: status.message
  });
}

function handle(req, res, config = {}) {
  const url = new URL(req.url, 'http://localhost');

  if (url.pathname === '/api/qwen/status' && req.method === 'GET') {
    return handleStatus(req, res, config);
  }

  if (url.pathname === '/api/qwen/start' && req.method === 'POST') {
    return handleStart(req, res, config);
  }

  if (url.pathname === '/api/qwen/stop' && req.method === 'POST') {
    return handleStop(req, res, config);
  }

  if (url.pathname === '/api/qwen' && req.method === 'POST') {
    return handleQwenApi(req, res, config);
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Qwen route not found');
}

module.exports = {
  handle,
  _internals: {
    cleanAttachments,
    cleanMessages,
    createAssistantResponse,
    getConfig,
    getOllamaStatus,
    startQwenSession,
    stopQwenSession
  }
};
