import { calculate } from "./calculator.mjs";

const OLLAMA_SEARCH_URL = "https://ollama.com/api/web_search";

export const ASSISTANT_INSTRUCTIONS = `You are Nova, a friendly and capable AI assistant for a student.

- Always reply in clear, natural English unless the user asks for another language.
- Answer directly, then explain when explanation is helpful.
- For maths, science, logic, coding, and other problems, reason carefully and explain the important steps simply.
- Use the calculator tool whenever exact arithmetic would improve accuracy.
- Use web search for current events, recent facts, live information, or when the user asks you to search.
- When using web search, base factual claims on its results and mention sources clearly.
- Never pretend to have searched. If search is unavailable, honestly say that current information could not be checked.
- If information is uncertain, say so. Never invent facts or sources.
- Avoid unnecessary jargon and keep explanations suitable for a Grade 9 student.`;

const calculatorTool = {
  type: "function",
  function: {
    name: "calculate",
    description: "Accurately evaluate a numerical maths expression. Supports +, -, *, /, %, ^, parentheses, pi, e, sqrt, abs, sin, cos, tan, log, ln, round, floor, ceil, min, max, and pow.",
    parameters: {
      type: "object",
      required: ["expression"],
      properties: {
        expression: { type: "string", description: "The expression to calculate, such as (180 / 2.5) or sqrt(144)." },
      },
    },
  },
};

const webSearchTool = {
  type: "function",
  function: {
    name: "web_search",
    description: "Search the live web for current or requested information and return titles, URLs, and useful snippets.",
    parameters: {
      type: "object",
      required: ["query"],
      properties: {
        query: { type: "string", description: "A focused web-search query." },
      },
    },
  },
};

export function cleanMessages(messages) {
  if (!Array.isArray(messages)) return [];
  return messages
    .filter((message) => message && ["user", "assistant"].includes(message.role))
    .map((message) => ({
      role: message.role,
      content: String(message.content || "").trim().slice(0, 8_000),
    }))
    .filter((message) => message.content)
    .slice(-20);
}

async function parseResponse(response) {
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(result.error || `Request failed with status ${response.status}.`);
    error.status = response.status;
    throw error;
  }
  return result;
}

async function callLocalModel({ ollamaUrl, model, messages, tools, fetchImpl }) {
  let response;
  try {
    response = await fetchImpl(`${ollamaUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        messages,
        tools,
        stream: false,
        think: false,
        keep_alive: "10m",
        // B2 has 2 CPU cores and limited RAM, so keep memory and CPU use controlled.
        options: { temperature: 0.4, num_ctx: 2_048, num_thread: 2 },
      }),
      signal: AbortSignal.timeout(180_000),
    });
  } catch (error) {
    const friendly = new Error("Ollama is not running yet. Please start it, then try again.");
    friendly.status = 503;
    friendly.cause = error;
    throw friendly;
  }
  return parseResponse(response);
}

async function searchWeb({ query, apiKey, fetchImpl }) {
  const response = await fetchImpl(OLLAMA_SEARCH_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: String(query).slice(0, 500), max_results: 5 }),
    signal: AbortSignal.timeout(30_000),
  });
  const result = await parseResponse(response);
  return Array.isArray(result.results) ? result.results.slice(0, 5) : [];
}

function toolArguments(call) {
  const args = call?.function?.arguments;
  if (args && typeof args === "object") return args;
  if (typeof args === "string") {
    try {
      return JSON.parse(args);
    } catch {
      return {};
    }
  }
  return {};
}

export async function createAssistantResponse({
  ollamaUrl,
  model,
  messages,
  useWebSearch,
  searchApiKey,
  fetchImpl = fetch,
}) {
  const tools = [calculatorTool];
  if (useWebSearch && searchApiKey) tools.push(webSearchTool);

  const conversation = [
    {
      role: "system",
      content: `${ASSISTANT_INSTRUCTIONS}\n\nToday's date is ${new Date().toISOString().slice(0, 10)}. Web search is ${useWebSearch && searchApiKey ? "available" : "not available in this chat"}.`,
    },
    ...messages,
  ];
  const sources = [];
  const toolsUsed = new Set();

  for (let turn = 0; turn < 4; turn += 1) {
    const result = await callLocalModel({ ollamaUrl, model, messages: conversation, tools, fetchImpl });
    const assistantMessage = result.message || {};
    const calls = assistantMessage.tool_calls || [];
    conversation.push(assistantMessage);

    if (!calls.length) {
      const answer = String(assistantMessage.content || "").trim();
      if (!answer) throw new Error("The local model returned an empty answer. Please try again.");
      const uniqueSources = [...new Map(sources.map((source) => [source.url, source])).values()];
      return { answer, sources: uniqueSources, toolsUsed: [...toolsUsed] };
    }

    for (const call of calls) {
      const name = call?.function?.name;
      const args = toolArguments(call);
      let content;

      if (name === "calculate") {
        try {
          content = String(calculate(args.expression));
          toolsUsed.add("calculator");
        } catch (error) {
          content = `Calculator error: ${error.message}`;
        }
      } else if (name === "web_search" && searchApiKey) {
        try {
          const results = await searchWeb({ query: args.query, apiKey: searchApiKey, fetchImpl });
          sources.push(...results.filter((item) => item.url).map((item) => ({ title: item.title || item.url, url: item.url })));
          content = JSON.stringify(results.map((item) => ({ title: item.title, url: item.url, content: item.content })));
          toolsUsed.add("web_search");
        } catch (error) {
          content = `Web search failed: ${error.message}`;
        }
      } else {
        content = `Tool '${name || "unknown"}' is unavailable.`;
      }

      conversation.push({ role: "tool", tool_name: name || "unknown", content: content.slice(0, 12_000) });
    }
  }

  throw new Error("Nova used too many tool steps. Please make the question more specific and try again.");
}

export async function getOllamaStatus({ ollamaUrl, model, fetchImpl = fetch }) {
  try {
    const response = await fetchImpl(`${ollamaUrl}/api/tags`, { signal: AbortSignal.timeout(2_000) });
    const result = await parseResponse(response);
    const models = (result.models || []).map((item) => item.name || item.model);
    const installed = models.some((name) => name === model || name === `${model}:latest`);
    return {
      running: true,
      modelInstalled: installed,
      message: installed ? "Nova is ready" : `The ${model} model is not installed yet`,
    };
  } catch {
    return {
      running: false,
      modelInstalled: false,
      message: "Ollama is not running",
    };
  }
}
