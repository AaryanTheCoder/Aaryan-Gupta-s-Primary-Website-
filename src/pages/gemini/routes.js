const { readJsonBody } = require('../../shared/routeHelpers');

const MAX_GEMINI_BODY_BYTES = 4 * 1024 * 1024;
const MAX_GEMINI_IMAGE_BYTES = 2 * 1024 * 1024;
const MAX_GEMINI_MESSAGE_CHARS = 8000;
const MAX_GEMINI_HISTORY_ITEMS = 10;
const MAX_GEMINI_HISTORY_CHARS = 24000;
const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

function invalidRequest(message) {
  const error = new Error(message);
  error.statusCode = 400;
  return error;
}

function parseHistory(value) {
  if (value === undefined) return [];
  if (!Array.isArray(value)) throw invalidRequest('History must be an array.');

  let totalCharacters = 0;
  return value.slice(-MAX_GEMINI_HISTORY_ITEMS).map(item => {
    const role = item?.role === 'assistant' ? 'model' : item?.role;
    const text = typeof item?.text === 'string' ? item.text.trim() : '';
    if ((role !== 'user' && role !== 'model') || !text) {
      throw invalidRequest('History contains an invalid message.');
    }

    totalCharacters += text.length;
    if (totalCharacters > MAX_GEMINI_HISTORY_CHARS) {
      throw invalidRequest('Conversation history is too long.');
    }

    return { role, parts: [{ text }] };
  });
}

function parseImage(value) {
  if (value === undefined || value === null) return null;
  if (typeof value !== 'object' || Array.isArray(value)) {
    throw invalidRequest('Image attachment is invalid.');
  }

  const mimeType = typeof value.mimeType === 'string' ? value.mimeType.toLowerCase() : '';
  const data = typeof value.data === 'string' ? value.data : '';
  if (!ALLOWED_IMAGE_TYPES.has(mimeType)) {
    throw invalidRequest('Screenshot must be a JPEG, PNG, or WebP image.');
  }
  if (!data || !/^[A-Za-z0-9+/]+={0,2}$/.test(data)) {
    throw invalidRequest('Screenshot data is invalid.');
  }
  if (Buffer.from(data, 'base64').length > MAX_GEMINI_IMAGE_BYTES) {
    throw invalidRequest('Screenshot is too large.');
  }

  return { mimeType, data };
}

function serveGeminiPage(response) {
  response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  response.end(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Gemini AI Chat</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-1: #0f1419;
      --bg-2: #1a2332;
      --card: rgba(255, 255, 255, 0.08);
      --card-border: rgba(255, 255, 255, 0.12);
      --text: #f0f4f9;
      --muted: #b8c5d6;
      --accent: #4f46e5;
      --accent-light: #6366f1;
      --gold: #fbbf24;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html, body {
      width: 100%;
      height: 100%;
    }

    body {
      font-family: 'Poppins', sans-serif;
      background: linear-gradient(135deg, var(--bg-1) 0%, var(--bg-2) 100%);
      color: var(--text);
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .header {
      background: rgba(0, 0, 0, 0.3);
      border-bottom: 1px solid var(--card-border);
      padding: 16px 20px;
      text-align: center;
    }

    .header h1 {
      font-size: 1.6em;
      color: var(--accent-light);
      margin-bottom: 4px;
    }

    .header p {
      font-size: 0.9em;
      color: var(--muted);
    }

    .chat-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 0;
      padding: 20px;
      gap: 16px;
    }

    .messages {
      flex: 1;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding-right: 8px;
    }

    .message {
      display: flex;
      gap: 12px;
      animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .message.user {
      justify-content: flex-end;
    }

    .message-content {
      max-width: 70%;
      padding: 12px 16px;
      border-radius: 12px;
      line-height: 1.5;
      word-wrap: break-word;
    }

    .message.user .message-content {
      background: var(--accent);
      color: white;
      border-bottom-right-radius: 4px;
    }

    .message.assistant .message-content {
      background: var(--card);
      border: 1px solid var(--card-border);
      color: var(--text);
      border-bottom-left-radius: 4px;
    }

    .message.system .message-content {
      background: rgba(251, 191, 36, 0.1);
      border: 1px solid var(--gold);
      color: var(--gold);
      max-width: 90%;
      text-align: center;
      border-radius: 8px;
    }

    .input-area {
      display: flex;
      gap: 12px;
      padding: 16px;
      background: rgba(0, 0, 0, 0.2);
      border-top: 1px solid var(--card-border);
      border-radius: 12px;
    }

    #messageInput {
      flex: 1;
      padding: 12px 16px;
      background: var(--card);
      border: 1px solid var(--card-border);
      color: var(--text);
      border-radius: 8px;
      font-family: 'Poppins', sans-serif;
      font-size: 0.95em;
      resize: none;
      max-height: 120px;
    }

    #messageInput:focus {
      outline: none;
      border-color: var(--accent);
      background: rgba(255, 255, 255, 0.1);
    }

    #sendBtn {
      padding: 12px 24px;
      background: var(--accent);
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      font-family: 'Poppins', sans-serif;
      font-size: 0.95em;
      min-width: 100px;
    }

    #sendBtn:hover:not(:disabled) {
      background: var(--accent-light);
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(79, 70, 229, 0.4);
    }

    #sendBtn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .scrollbar::-webkit-scrollbar {
      width: 6px;
    }

    .scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }

    .scrollbar::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 3px;
    }

    .scrollbar::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    .messages {
      scrollbar-width: thin;
      scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
    }

    @media (max-width: 768px) {
      .message-content {
        max-width: 85%;
      }

      .header h1 {
        font-size: 1.3em;
      }

      .input-area {
        flex-direction: column;
      }

      #sendBtn {
        width: 100%;
      }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>✨ Gemini AI Chat</h1>
    <p>Ask me anything! Powered by Google Gemini</p>
  </div>

  <div class="chat-container">
    <div class="messages scrollbar" id="messages">
      <div class="message system">
        <div class="message-content">
          Welcome to Gemini Chat! Ask me anything and I'll help you out.
        </div>
      </div>
    </div>

    <div class="input-area">
      <textarea 
        id="messageInput" 
        placeholder="Type your question here... (Ctrl/Cmd+Enter to send)"
        rows="1"
      ></textarea>
      <button id="sendBtn">Send</button>
    </div>
  </div>

  <script>
    const messagesDiv = document.getElementById('messages');
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');

    // Auto-expand textarea
    messageInput.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = Math.min(this.scrollHeight, 120) + 'px';
    });

    async function sendMessage() {
      const message = messageInput.value.trim();
      if (!message || sendBtn.disabled) return;

      // Add user message
      const userMsgDiv = document.createElement('div');
      userMsgDiv.className = 'message user';
      userMsgDiv.innerHTML = \`<div class="message-content">\${escapeHtml(message)}</div>\`;
      messagesDiv.appendChild(userMsgDiv);

      messageInput.value = '';
      messageInput.style.height = 'auto';
      sendBtn.disabled = true;

      // Scroll to bottom
      messagesDiv.scrollTop = messagesDiv.scrollHeight;

      try {
        const response = await fetch('/api/gemini', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to get response from Gemini');
        }

        // Add assistant message
        const assistantMsgDiv = document.createElement('div');
        assistantMsgDiv.className = 'message assistant';
        assistantMsgDiv.innerHTML = \`<div class="message-content">\${escapeHtml(data.reply)}</div>\`;
        messagesDiv.appendChild(assistantMsgDiv);

        messagesDiv.scrollTop = messagesDiv.scrollHeight;
      } catch (error) {
        // Add error message
        const errorMsgDiv = document.createElement('div');
        errorMsgDiv.className = 'message system';
        errorMsgDiv.innerHTML = \`<div class="message-content">Error: \${escapeHtml(error.message)}</div>\`;
        messagesDiv.appendChild(errorMsgDiv);

        messagesDiv.scrollTop = messagesDiv.scrollHeight;
      } finally {
        sendBtn.disabled = false;
        messageInput.focus();
      }
    }

    function escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }

    sendBtn.addEventListener('click', sendMessage);

    messageInput.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
      }
    });

    messageInput.focus();
  </script>
</body>
</html>`);
}

async function handleGeminiApi(request, response, GEMINI_API_KEY) {
  try {
    const parsed = await readJsonBody(request, { maxBytes: MAX_GEMINI_BODY_BYTES });
    const message = typeof parsed.message === 'string' ? parsed.message.trim() : '';

    if (!message) {
      response.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
      response.end(JSON.stringify({ error: 'Message is required.' }));
      return;
    }

    if (message.length > MAX_GEMINI_MESSAGE_CHARS) {
      response.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
      response.end(JSON.stringify({ error: 'Message is too long.' }));
      return;
    }

    const history = parseHistory(parsed.history);
    const image = parseImage(parsed.image);

    if (!GEMINI_API_KEY) {
      response.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
      response.end(JSON.stringify({ error: 'Gemini API key is not configured.' }));
      return;
    }

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            ...history,
            {
              role: 'user',
              parts: [
                ...(image
                  ? [{
                      inline_data: {
                        mime_type: image.mimeType,
                        data: image.data
                      }
                    }]
                  : []),
                { text: message }
              ]
            }
          ]
        })
      }
    );

    const geminiData = await geminiResponse.json();
    const reply = geminiData?.candidates?.[0]?.content?.parts?.map(part => part.text || '').join('').trim();

    if (!geminiResponse.ok) {
      response.writeHead(geminiResponse.status || 500, { 'Content-Type': 'application/json; charset=utf-8' });
      response.end(JSON.stringify({ error: geminiData?.error?.message || 'Gemini API request failed.' }));
      return;
    }

    response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    response.end(JSON.stringify({ reply: reply || 'Gemini returned an empty reply.' }));
  } catch (error) {
    response.writeHead(error.statusCode || 500, { 'Content-Type': 'application/json; charset=utf-8' });
    response.end(JSON.stringify({ error: error.message || 'Internal server error.' }));
  }
}

function handle(request, response, GEMINI_API_KEY) {
  if (request.url === '/gemini' && request.method === 'GET') {
    return serveGeminiPage(response);
  }

  if (request.url === '/api/gemini' && request.method === 'POST') {
    return handleGeminiApi(request, response, GEMINI_API_KEY);
  }

  response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  response.end('Gemini route not found');
}

module.exports = { handle };
