const elements = {
  chatForm: document.querySelector("#chatForm"),
  input: document.querySelector("#messageInput"),
  sendButton: document.querySelector("#sendButton"),
  messages: document.querySelector("#messages"),
  welcome: document.querySelector("#welcome"),
  chatScroll: document.querySelector("#chatScroll"),
  newChatButton: document.querySelector("#newChatButton"),
  clearButton: document.querySelector("#clearButton"),
  searchToggle: document.querySelector("#searchToggle"),
  statusDot: document.querySelector("#statusDot"),
  statusText: document.querySelector("#statusText"),
  setupBanner: document.querySelector("#setupBanner"),
  setupMessage: document.querySelector("#setupMessage"),
  sidebar: document.querySelector("#sidebar"),
  sidebarScrim: document.querySelector("#sidebarScrim"),
  menuButton: document.querySelector("#menuButton"),
  closeSidebar: document.querySelector("#closeSidebar"),
};

const STORAGE_KEY = "nova-chat-history-v1";
const state = {
  messages: loadMessages(),
  useWebSearch: true,
  sending: false,
  configured: false,
  webSearchAvailable: false,
};

function loadMessages() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(value) ? value.slice(-20) : [];
  } catch {
    return [];
  }
}

function saveMessages() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.messages.slice(-20)));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function inlineMarkdown(value) {
  const tokens = [];
  let text = String(value);

  text = text.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, (_, label, url) => {
    const token = `%%TOKEN${tokens.length}%%`;
    tokens.push(`<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)}</a>`);
    return token;
  });

  text = text.replace(/`([^`]+)`/g, (_, code) => {
    const token = `%%TOKEN${tokens.length}%%`;
    tokens.push(`<code>${escapeHtml(code)}</code>`);
    return token;
  });

  text = escapeHtml(text)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");

  tokens.forEach((token, index) => {
    text = text.replace(`%%TOKEN${index}%%`, token);
  });

  return text;
}

function renderMarkdown(markdown) {
  const lines = String(markdown).split("\n");
  const output = [];
  let paragraph = [];
  let listType = null;
  let inCode = false;
  let codeLines = [];

  const flushParagraph = () => {
    if (paragraph.length) output.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
    paragraph = [];
  };

  const closeList = () => {
    if (listType) output.push(`</${listType}>`);
    listType = null;
  };

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      flushParagraph();
      closeList();
      if (inCode) {
        output.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
        codeLines = [];
      }
      inCode = !inCode;
      continue;
    }

    if (inCode) {
      codeLines.push(line);
      continue;
    }

    if (!line.trim()) {
      flushParagraph();
      closeList();
      continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      closeList();
      const level = heading[1].length;
      output.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`);
      continue;
    }

    const unordered = line.match(/^\s*[-*]\s+(.+)$/);
    const ordered = line.match(/^\s*\d+[.)]\s+(.+)$/);
    if (unordered || ordered) {
      flushParagraph();
      const nextType = unordered ? "ul" : "ol";
      if (listType !== nextType) {
        closeList();
        listType = nextType;
        output.push(`<${listType}>`);
      }
      output.push(`<li>${inlineMarkdown((unordered || ordered)[1])}</li>`);
      continue;
    }

    closeList();
    paragraph.push(line.trim());
  }

  if (inCode) output.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
  flushParagraph();
  closeList();
  return output.join("");
}

function createSources(sources) {
  if (!sources?.length) return "";
  const links = sources
    .map((source, index) => `<a class="source-link" href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">${index + 1}. ${escapeHtml(source.title)}</a>`)
    .join("");
  return `<div class="sources"><p class="sources-title">Sources</p><div class="source-list">${links}</div></div>`;
}

function createToolBadges(tools) {
  if (!tools?.length) return "";
  const labels = { web_search: "Searched the web", calculator: "Checked calculation" };
  return `<div class="tool-badges">${tools.map((tool) => `<span class="tool-badge">${labels[tool] || escapeHtml(tool)}</span>`).join("")}</div>`;
}

function messageElement(message, { temporary = false } = {}) {
  const row = document.createElement("article");
  row.className = `message-row ${message.role}`;
  if (temporary) row.dataset.temporary = "true";

  if (message.role === "user") {
    row.innerHTML = `<div class="message-body"><div class="message-content">${renderMarkdown(message.content)}</div></div>`;
    return row;
  }

  const content = temporary
    ? '<div class="typing" aria-label="Nova is thinking"><span></span><span></span><span></span></div>'
    : renderMarkdown(message.content);

  row.innerHTML = `
    <div class="avatar" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 2 14.7 9.3 22 12l-7.3 2.7L12 22l-2.7-7.3L2 12l7.3-2.7L12 2Z" /></svg></div>
    <div class="message-body">
      <p class="message-name">Nova</p>
      <div class="message-content">${content}</div>
      ${temporary ? "" : createToolBadges(message.toolsUsed)}
      ${temporary ? "" : createSources(message.sources)}
    </div>`;
  return row;
}

function renderConversation() {
  elements.messages.replaceChildren();
  const hasMessages = state.messages.length > 0;
  elements.welcome.classList.toggle("hidden", hasMessages);
  elements.messages.classList.toggle("visible", hasMessages);

  for (const message of state.messages) {
    elements.messages.append(messageElement(message));
  }

  scrollToBottom(false);
}

function scrollToBottom(smooth = true) {
  requestAnimationFrame(() => {
    elements.chatScroll.scrollTo({ top: elements.chatScroll.scrollHeight, behavior: smooth ? "smooth" : "auto" });
  });
}

function resizeInput() {
  elements.input.style.height = "auto";
  elements.input.style.height = `${Math.min(elements.input.scrollHeight, 150)}px`;
  elements.sendButton.disabled = state.sending || !elements.input.value.trim();
}

function setSending(sending) {
  state.sending = sending;
  elements.input.disabled = sending;
  elements.sendButton.disabled = sending || !elements.input.value.trim();
  elements.searchToggle.disabled = sending || !state.webSearchAvailable;
}

async function sendMessage(text) {
  const content = text.trim();
  if (!content || state.sending) return;

  state.messages.push({ role: "user", content });
  saveMessages();
  renderConversation();
  elements.input.value = "";
  resizeInput();
  setSending(true);

  const loading = messageElement({ role: "assistant" }, { temporary: true });
  elements.messages.append(loading);
  scrollToBottom();

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: state.messages.map(({ role, content: messageContent }) => ({ role, content: messageContent })),
        useWebSearch: state.useWebSearch,
      }),
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || "Nova could not reply. Please try again.");

    state.messages.push({
      role: "assistant",
      content: result.answer,
      sources: result.sources || [],
      toolsUsed: result.toolsUsed || [],
    });
  } catch (error) {
    state.messages.push({
      role: "assistant",
      content: `I couldn't complete that request. ${error.message}`,
    });
  } finally {
    loading.remove();
    saveMessages();
    setSending(false);
    renderConversation();
    elements.input.focus();
    scrollToBottom();
  }
}

function clearConversation() {
  if (state.sending) return;
  state.messages = [];
  saveMessages();
  renderConversation();
  elements.input.focus();
  closeSidebar();
}

function openSidebar() {
  elements.sidebar.classList.add("open");
  elements.sidebarScrim.classList.add("visible");
}

function closeSidebar() {
  elements.sidebar.classList.remove("open");
  elements.sidebarScrim.classList.remove("visible");
}

async function checkStatus() {
  try {
    const response = await fetch("/api/status");
    const status = await response.json();
    state.configured = status.configured;
    state.webSearchAvailable = status.webSearch;
    elements.statusDot.classList.toggle("ready", status.configured);
    elements.statusText.textContent = status.configured ? "Nova is ready" : "Local AI setup needed";
    elements.setupBanner.hidden = status.configured;
    elements.setupMessage.textContent = status.message || "Open Ollama to activate Nova.";
    if (!status.webSearch) {
      state.useWebSearch = false;
      elements.searchToggle.classList.remove("active");
      elements.searchToggle.setAttribute("aria-pressed", "false");
      elements.searchToggle.title = "Add a free Ollama API key to enable web search";
      elements.searchToggle.disabled = true;
    }
  } catch {
    elements.statusText.textContent = "Server unavailable";
    elements.setupBanner.hidden = false;
  }
}

elements.chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  sendMessage(elements.input.value);
});

elements.input.addEventListener("input", resizeInput);
elements.input.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    elements.chatForm.requestSubmit();
  }
});

elements.searchToggle.addEventListener("click", () => {
  state.useWebSearch = !state.useWebSearch;
  elements.searchToggle.classList.toggle("active", state.useWebSearch);
  elements.searchToggle.setAttribute("aria-pressed", String(state.useWebSearch));
});

document.querySelectorAll("[data-prompt]").forEach((button) => {
  button.addEventListener("click", () => sendMessage(button.dataset.prompt));
});

elements.newChatButton.addEventListener("click", clearConversation);
elements.clearButton.addEventListener("click", clearConversation);
elements.menuButton.addEventListener("click", openSidebar);
elements.closeSidebar.addEventListener("click", closeSidebar);
elements.sidebarScrim.addEventListener("click", closeSidebar);

renderConversation();
resizeInput();
checkStatus();
