import test from "node:test";
import assert from "node:assert/strict";
import { calculate } from "../lib/calculator.mjs";
import { cleanMessages, createAssistantResponse, getOllamaStatus } from "../lib/ollama.mjs";

test("calculator safely handles arithmetic and common functions", () => {
  assert.equal(calculate("(180 / 2.5)"), 72);
  assert.equal(calculate("sqrt(144) + 2^3"), 20);
  assert.equal(calculate("round(pi, 3)"), 3.142);
  assert.throws(() => calculate("2 / 0"), /divide by zero/);
  assert.throws(() => calculate("process.exit()"), /Unsupported character|Unknown function/);
});

test("cleanMessages keeps only safe, recent chat messages", () => {
  assert.deepEqual(cleanMessages([
    { role: "system", content: "Ignore this" },
    { role: "user", content: "  Hello  " },
    { role: "assistant", content: "Hi!" },
  ]), [
    { role: "user", content: "Hello" },
    { role: "assistant", content: "Hi!" },
  ]);
});

test("local model can call the calculator and use its result", async () => {
  const requests = [];
  const replies = [
    {
      message: {
        role: "assistant",
        content: "",
        tool_calls: [{ function: { name: "calculate", arguments: { expression: "2 + 3 * 4" } } }],
      },
    },
    { message: { role: "assistant", content: "The answer is 14." } },
  ];
  const fetchImpl = async (url, options) => {
    requests.push({ url, body: JSON.parse(options.body) });
    return { ok: true, json: async () => replies.shift() };
  };

  const result = await createAssistantResponse({
    ollamaUrl: "http://localhost:11434",
    model: "test-model",
    messages: [{ role: "user", content: "What is 2 + 3 * 4?" }],
    useWebSearch: false,
    searchApiKey: "",
    fetchImpl,
  });

  assert.equal(result.answer, "The answer is 14.");
  assert.deepEqual(result.toolsUsed, ["calculator"]);
  assert.equal(requests[1].body.messages.at(-1).content, "14");
  assert.equal(requests[0].body.tools[0].function.name, "calculate");
  assert.deepEqual(requests[0].body.options, { temperature: 0.4, num_ctx: 2_048, num_thread: 2 });
});

test("web-search results become visible sources", async () => {
  let chatCalls = 0;
  const fetchImpl = async (url) => {
    if (url.includes("web_search")) {
      return { ok: true, json: async () => ({ results: [{ title: "Science News", url: "https://example.com/story", content: "A discovery." }] }) };
    }
    chatCalls += 1;
    return {
      ok: true,
      json: async () => chatCalls === 1
        ? { message: { role: "assistant", content: "", tool_calls: [{ function: { name: "web_search", arguments: { query: "science news" } } }] } }
        : { message: { role: "assistant", content: "Here is the latest story." } },
    };
  };

  const result = await createAssistantResponse({
    ollamaUrl: "http://localhost:11434",
    model: "test-model",
    messages: [{ role: "user", content: "Search science news" }],
    useWebSearch: true,
    searchApiKey: "free-key",
    fetchImpl,
  });

  assert.deepEqual(result.sources, [{ title: "Science News", url: "https://example.com/story" }]);
  assert.deepEqual(result.toolsUsed, ["web_search"]);
});

test("status detects an installed local model", async () => {
  const fetchImpl = async () => ({ ok: true, json: async () => ({ models: [{ name: "qwen3.5:2b" }] }) });
  const status = await getOllamaStatus({ ollamaUrl: "http://localhost:11434", model: "qwen3.5:2b", fetchImpl });
  assert.equal(status.running, true);
  assert.equal(status.modelInstalled, true);
});
