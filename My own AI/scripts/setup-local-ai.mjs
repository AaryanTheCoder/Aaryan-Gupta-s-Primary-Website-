import { spawn } from "node:child_process";
import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
await loadEnv(path.join(ROOT, ".env"));

const ollamaUrl = (process.env.OLLAMA_URL || "http://127.0.0.1:11434").replace(/\/$/, "");
const model = process.env.OLLAMA_MODEL || "qwen3.5:2b";
const modelsPath = path.resolve(ROOT, process.env.OLLAMA_MODELS_PATH || ".ollama-models");
let serverProcess = null;

async function loadEnv(filename) {
  try {
    const file = await readFile(filename, "utf8");
    for (const line of file.split(/\r?\n/)) {
      const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
      if (!match || line.trimStart().startsWith("#")) continue;
      let value = match[2];
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
      if (process.env[match[1]] === undefined) process.env[match[1]] = value;
    }
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}

async function isRunning() {
  try {
    const response = await fetch(`${ollamaUrl}/api/tags`, { signal: AbortSignal.timeout(1_000) });
    return response.ok;
  } catch {
    return false;
  }
}

async function waitUntilRunning() {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    if (await isRunning()) return;
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error("Ollama did not start. Please open the Ollama app and run npm run setup again.");
}

function stopServer() {
  if (serverProcess && !serverProcess.killed) serverProcess.kill("SIGTERM");
}

try {
  if (!(await isRunning())) {
    await mkdir(modelsPath, { recursive: true });
    console.log("Starting the free local AI service...");
    serverProcess = spawn("ollama", ["serve"], {
      env: { ...process.env, OLLAMA_MODELS: modelsPath },
      stdio: "ignore",
    });
    await waitUntilRunning();
  }

  console.log(`Downloading ${model}. This happens only once...`);
  const pull = spawn("ollama", ["pull", model], { stdio: "inherit" });
  const exitCode = await new Promise((resolve) => pull.once("close", resolve));
  if (exitCode !== 0) process.exitCode = exitCode || 1;
  else console.log("\nNova's local model is ready. Run: npm start");
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
} finally {
  stopServer();
}
