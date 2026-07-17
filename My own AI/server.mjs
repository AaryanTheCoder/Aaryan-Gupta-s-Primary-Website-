import { spawn } from "node:child_process";
import { mkdir, readFile } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { cleanMessages, createAssistantResponse, getOllamaStatus } from "./lib/ollama.mjs";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(ROOT, "public");
const MAX_BODY_SIZE = 1_000_000;

await loadEnv(path.join(ROOT, ".env"));

const isAzureAppService = Boolean(process.env.WEBSITE_SITE_NAME || process.env.WEBSITE_INSTANCE_ID);
const defaultModelsPath = isAzureAppService ? "/home/ollama-models" : path.join(ROOT, ".ollama-models");
const defaultOllamaBin = isAzureAppService ? "/home/ollama/bin/ollama" : "ollama";

const config = {
  port: Number(process.env.PORT) || 3000,
  ollamaUrl: (process.env.OLLAMA_URL || "http://127.0.0.1:11434").replace(/\/$/, ""),
  model: process.env.OLLAMA_MODEL || "qwen3.5:2b",
  modelsPath: process.env.OLLAMA_MODELS_PATH
    ? path.resolve(ROOT, process.env.OLLAMA_MODELS_PATH)
    : defaultModelsPath,
  ollamaBin: process.env.OLLAMA_BIN || defaultOllamaBin,
  searchApiKey: process.env.OLLAMA_API_KEY || "",
};

let ollamaProcess = null;

async function ensureOllamaIsRunning() {
  const status = await getOllamaStatus({ ollamaUrl: config.ollamaUrl, model: config.model });
  if (status.running) return;

  await mkdir(config.modelsPath, { recursive: true });
  try {
    ollamaProcess = spawn(config.ollamaBin, ["serve"], {
      env: { ...process.env, OLLAMA_MODELS: config.modelsPath },
      stdio: ["ignore", "inherit", "inherit"],
    });
    ollamaProcess.once("error", (error) => {
      ollamaProcess = null;
      console.error(`Ollama could not start from ${config.ollamaBin}: ${error.message}`);
    });
  } catch {
    console.log(`Ollama could not start automatically from ${config.ollamaBin}.`);
  }
}

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
};

const rateLimit = new Map();
let chatInProgress = false;

function parseEnvLine(line) {
  const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)?\s*$/);
  if (!match) return null;

  let value = match[2] || "";
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    value = value.slice(1, -1);
  }

  return [match[1], value];
}

async function loadEnv(filename) {
  try {
    const file = await readFile(filename, "utf8");
    for (const line of file.split(/\r?\n/)) {
      if (!line.trim() || line.trimStart().startsWith("#")) continue;
      const entry = parseEnvLine(line);
      if (entry && process.env[entry[0]] === undefined) process.env[entry[0]] = entry[1];
    }
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}

function setSecurityHeaders(response) {
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.setHeader("X-Frame-Options", "DENY");
  response.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  response.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; base-uri 'none'; frame-ancestors 'none'",
  );
}

function sendJson(response, status, data) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(data));
}

async function readJson(request) {
  const chunks = [];
  let size = 0;

  for await (const chunk of request) {
    size += chunk.length;
    if (size > MAX_BODY_SIZE) {
      const error = new Error("The request is too large.");
      error.status = 413;
      throw error;
    }
    chunks.push(chunk);
  }

  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
  } catch {
    const error = new Error("The request contains invalid JSON.");
    error.status = 400;
    throw error;
  }
}

function getClientId(request) {
  return request.socket.remoteAddress || "local-user";
}

function isRateLimited(clientId) {
  const now = Date.now();
  const windowMs = 60_000;
  const current = rateLimit.get(clientId);

  if (!current || now - current.startedAt > windowMs) {
    rateLimit.set(clientId, { startedAt: now, count: 1 });
    return false;
  }

  current.count += 1;
  return current.count > 25;
}

async function handleChat(request, response) {
  const clientId = getClientId(request);
  if (isRateLimited(clientId)) {
    sendJson(response, 429, { error: "Too many messages were sent. Please wait one minute and try again." });
    return;
  }

  const body = await readJson(request);
  const messages = cleanMessages(body.messages);

  if (!messages.length || messages.at(-1).role !== "user") {
    sendJson(response, 400, { error: "Please enter a message first." });
    return;
  }

  if (chatInProgress) {
    sendJson(response, 503, { error: "Nova is answering another message. Please try again shortly." });
    return;
  }

  chatInProgress = true;
  try {
    const result = await createAssistantResponse({
      ollamaUrl: config.ollamaUrl,
      model: config.model,
      messages,
      useWebSearch: body.useWebSearch !== false,
      searchApiKey: config.searchApiKey,
    });

    sendJson(response, 200, result);
  } finally {
    chatInProgress = false;
  }
}

async function serveStatic(request, response, pathname) {
  const requestedPath = pathname === "/" ? "/index.html" : pathname;
  const decodedPath = decodeURIComponent(requestedPath);
  const filename = path.resolve(PUBLIC_DIR, `.${decodedPath}`);

  if (!filename.startsWith(`${PUBLIC_DIR}${path.sep}`)) {
    sendJson(response, 403, { error: "That file cannot be accessed." });
    return;
  }

  try {
    const file = await readFile(filename);
    response.writeHead(200, {
      "Content-Type": contentTypes[path.extname(filename)] || "application/octet-stream",
      "Cache-Control": filename.endsWith("index.html") ? "no-cache" : "public, max-age=3600",
    });
    response.end(file);
  } catch (error) {
    if (error.code === "ENOENT" || error.code === "EISDIR") {
      sendJson(response, 404, { error: "Page not found." });
      return;
    }
    throw error;
  }
}

const server = createServer(async (request, response) => {
  setSecurityHeaders(response);

  try {
    const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);

    if (request.method === "GET" && url.pathname === "/api/status") {
      const ollama = await getOllamaStatus({ ollamaUrl: config.ollamaUrl, model: config.model });
      sendJson(response, 200, {
        configured: ollama.running && ollama.modelInstalled,
        provider: "Ollama (local)",
        model: config.model,
        webSearch: Boolean(config.searchApiKey),
        problemSolving: true,
        message: ollama.message,
      });
      return;
    }

    if (request.method === "POST" && url.pathname === "/api/chat") {
      await handleChat(request, response);
      return;
    }

    if (request.method === "GET" || request.method === "HEAD") {
      await serveStatic(request, response, url.pathname);
      return;
    }

    sendJson(response, 405, { error: "Method not allowed." });
  } catch (error) {
    console.error(error);
    const status = Number(error.status) >= 400 && Number(error.status) < 600 ? Number(error.status) : 500;
    sendJson(response, status, {
      error: status === 500 ? "Something went wrong on the server. Please try again." : error.message,
    });
  }
});

await ensureOllamaIsRunning();

server.listen(config.port, () => {
  console.log(`Nova is running at http://localhost:${config.port}`);
  console.log(`Local model: ${config.model}`);
  console.log(`Model storage: ${config.modelsPath}`);
  if (!config.searchApiKey) console.log("Optional: add a free OLLAMA_API_KEY to .env for live web search.");
});

function stopLocalOllama() {
  if (ollamaProcess && !ollamaProcess.killed) ollamaProcess.kill("SIGTERM");
}

let shuttingDown = false;

function shutDownEverything() {
  if (shuttingDown) return;
  shuttingDown = true;
  stopLocalOllama();

  server.close(() => process.exit(0));
  setTimeout(() => process.exit(0), 2_000).unref();
}

process.once("SIGINT", shutDownEverything);
process.once("SIGTERM", shutDownEverything);
