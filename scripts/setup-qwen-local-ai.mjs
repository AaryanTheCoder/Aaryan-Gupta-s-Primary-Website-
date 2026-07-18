import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const isAzureAppService = Boolean(process.env.WEBSITE_SITE_NAME || process.env.WEBSITE_INSTANCE_ID);
const ollamaUrl = (process.env.OLLAMA_URL || "http://127.0.0.1:11434").replace(/\/$/, "");
const model = process.env.OLLAMA_MODEL || "qwen3.5:0.8b";
const modelsPath = path.resolve(process.env.OLLAMA_MODELS_PATH || (isAzureAppService ? "/home/ollama-models" : ".ollama-models"));
const ollamaBin = process.env.OLLAMA_BIN || (isAzureAppService ? "/home/ollama/bin/ollama" : "ollama");

let serverProcess = null;

async function isRunning() {
  try {
    const response = await fetch(`${ollamaUrl}/api/tags`, { signal: AbortSignal.timeout(1000) });
    return response.ok;
  } catch {
    return false;
  }
}

async function waitUntilRunning() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    if (await isRunning()) return;
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  throw new Error("Ollama did not start. Install Ollama or set OLLAMA_BIN to the correct executable.");
}

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, options);
    child.once("error", reject);
    child.once("close", code => {
      if (code === 0) resolve();
      else reject(new Error(`${command} ${args.join(" ")} exited with code ${code}.`));
    });
  });
}

function stopServer() {
  if (serverProcess && !serverProcess.killed) serverProcess.kill("SIGTERM");
}

try {
  await mkdir(modelsPath, { recursive: true });

  if (!(await isRunning())) {
    console.log("Starting Ollama so the model can be downloaded...");
    serverProcess = spawn(ollamaBin, ["serve"], {
      env: { ...process.env, OLLAMA_MODELS: modelsPath },
      stdio: "ignore"
    });
    await waitUntilRunning();
  }

  console.log(`Downloading ${model}. This happens only once.`);
  await run(ollamaBin, ["pull", model], {
    env: { ...process.env, OLLAMA_MODELS: modelsPath },
    stdio: "inherit"
  });
  console.log("\nNova's Qwen model is ready.");
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
} finally {
  stopServer();
}
