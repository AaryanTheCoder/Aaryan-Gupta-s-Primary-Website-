const { readJsonBody } = require('./routeHelpers');

const MAX_GEMINI_BODY_BYTES = 64 * 1024;

function serveKaomojiPage(response) {
  response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  response.end(`
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple Kaomoji Table</title>
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600&display=swap" rel="stylesheet">
    
    <style>
        :root {
            --primary-pink: #ffb7c5;
            --secondary-blue: #a2d2ff;
            --bg-color: #fdfaf6;
            --text-color: #4a4a4a;
            --shadow: 0 4px 6px rgba(0, 0, 0, 0.05); 
        }

        body {
          margin: 0;
          font-family: Arial, sans-serif;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: url("/aaryan/photo") center center / cover no-repeat fixed;
          color: #4b3b47;
        }

        html, body, button, input, textarea, table, th, td, a, p, h1, h2, section, div, span {
          cursor: url("/7d2e594b9e08ab2fba15ece12d239457.png") 8 8, auto !important;
        }

        .search-wrap {
            width: 100%;
            max-width: 600px;
            margin-bottom: 20px;
        }

        #searchBar {
            width: 100%;
            padding: 14px 18px;
            border: 2px solid var(--secondary-blue);
            border-radius: 12px;
            font-family: 'Quicksand', sans-serif;
            font-size: 1rem;
            box-sizing: border-box;
            outline: none;
            background: white;
            box-shadow: var(--shadow);
        }

        #searchBar:focus {
            border-color: #5a9edb;
        }

        h1 {
            color: #d88a9a;
            font-size: 2.5rem;
            margin-bottom: 10px;
        }

        p { margin-bottom: 30px; opacity: 0.8; }

        table {
            border-collapse: separate;
            border-spacing: 0 10px;
            width: 100%;
            max-width: 600px;
        }

        th {
            padding: 15px;
            text-transform: uppercase;
            font-size: 0.8rem;
            letter-spacing: 1px;
            color: #bbb;
        }

        td {
            background: white;
            padding: 15px 25px;
            box-shadow: var(--shadow);
            border-radius: 12px;
            text-align: center;
        }

        button {
            background-color: var(--bg-color);
            border: 2px solid var(--secondary-blue);
            color: #5a9edb;
            padding: 10px 20px;
            border-radius: 8px;
            font-size: 1.1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: monospace;
            white-space: pre;
        }

        button:hover {
            background-color: var(--secondary-blue);
            color: white;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(162, 210, 255, 0.4);
        }

        .name-cell { font-weight: 600; color: #888; }
    </style>
</head>
<body>

    <h1>Happy Kaomoji Table</h1>
    <p>Click a kaomoji to copy it.</p>

    <div class="search-wrap">
      <input
          type="text"
          id="searchBar"
          placeholder="Search kaomoji or name..."
          onkeyup="filterKaomoji()"
      >
    </div>

    <table>
        <thead>
            <tr>
                <th>Kaomoji</th>
                <th>Name</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><button onclick="playSound(); copyKaomoji('(◕‿◕)')">(◕‿◕)</button></td>
                <td class="name-cell">Simple happy</td>
            </tr>
            <tr>
                <td><button onclick="playSound(); copyKaomoji('٩(^‿^)۶')">٩(^‿^)۶</button></td>
                <td class="name-cell">Happy</td>
            </tr>
            <tr>
                <td><button onclick="playSound(); copyKaomoji('(｡◕‿◕｡)')">(｡◕‿◕｡)</button></td>
                <td class="name-cell">Cute happy</td>
            </tr>
            <tr>
                <td><button onclick="playSound(); copyKaomoji('(ﾉ◕ヮ◕)ﾉ')">(ﾉ◕ヮ◕)ﾉ</button></td>
                <td class="name-cell">Hands up</td>
            </tr>
            <tr>
                <td>
<button onclick='playSound(); copyKaomoji("(\"^__^\")")'>  ____
 < hi >
  ----
            ^__^
            (oo)_______
             (__)       )/
              ||----w |
              ||     ||</button>
                </td>
                <td class="name-cell">Cowsayhi</td>
            </tr>
        </tbody>
    </table>

    <script>
      const clickSound = new Audio("/freesound_community-evil-laugh-89423.mp3");

      function playSound() {
        clickSound.currentTime = 0;
        clickSound.play();
      }

      function copyKaomoji(text) {
        navigator.clipboard.writeText(text).then(() => {
          alert("Copied to clipboard!");
        });
      }

      function filterKaomoji() {
        const input = document.getElementById("searchBar").value.toLowerCase();
        const rows = document.querySelectorAll("tbody tr");

        rows.forEach(row => {
          const kaomojiText = row.cells[0].innerText.toLowerCase();
          const nameText = row.cells[1].innerText.toLowerCase();

          if (kaomojiText.includes(input) || nameText.includes(input)) {
            row.style.display = "";
          } else {
            row.style.display = "none";
          }
        });
      }
    </script>

    <section id="gemini-kaomoji-box" style="width:min(720px,92vw);margin:24px auto 0;padding:18px;border:1px solid #e7cfe0;border-radius:16px;background:#fff;box-shadow:0 8px 24px rgba(75,59,71,0.08);">
      <h2 style="margin:0 0 12px 0;font-size:1.2rem;">Kaomoji Gemini Reply</h2>
      <textarea id="gemini-message" placeholder="Type your message here..." style="width:100%;min-height:110px;padding:12px;border:1px solid #d7b7c8;border-radius:12px;font:inherit;resize:vertical;box-sizing:border-box;"></textarea>
      <div style="display:flex;gap:10px;align-items:center;margin-top:12px;flex-wrap:wrap;">
        <button id="gemini-send" type="button" style="padding:10px 16px;border:none;border-radius:999px;background:#4b3b47;color:#fff;font:inherit;cursor:pointer;">Send to Gemini</button>
        <span id="gemini-status" style="font-size:0.95rem;color:#6b5564;"></span>
      </div>
      <pre id="gemini-reply" style="white-space:pre-wrap;word-wrap:break-word;margin:14px 0 0 0;padding:14px;border-radius:12px;background:#fff7fb;border:1px solid #eed9e5;min-height:72px;box-sizing:border-box;">Gemini reply will show here.</pre>
    </section>

    <script>
      (function () {
        const messageBox = document.getElementById('gemini-message');
        const sendButton = document.getElementById('gemini-send');
        const replyBox = document.getElementById('gemini-reply');
        const statusBox = document.getElementById('gemini-status');

        async function sendGeminiMessage() {
          const message = messageBox.value.trim();
          if (!message) {
            replyBox.textContent = 'Please type a message first.';
            return;
          }

          statusBox.textContent = 'Thinking...';
          replyBox.textContent = 'Waiting for Gemini...';
          sendButton.disabled = true;

          try {
            const res = await fetch('/api/kaomoji-gemini', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ message })
            });

            const data = await res.json();

            if (!res.ok) {
              throw new Error(data.error || 'Gemini request failed.');
            }

            replyBox.textContent = data.reply || 'No reply received.';
            statusBox.textContent = 'Done.';
          } catch (error) {
            replyBox.textContent = 'Error: ' + error.message;
            statusBox.textContent = 'Failed.';
          } finally {
            sendButton.disabled = false;
          }
        }

        sendButton.addEventListener('click', sendGeminiMessage);
        messageBox.addEventListener('keydown', function (event) {
          if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
            sendGeminiMessage();
          }
        });
      })();
    </script>
</body>
</html>`);
}

function serveCursorImage(response, fs, path) {
  const filePath = path.join(__dirname, '7d2e594b9e08ab2fba15ece12d239457.png');
  fs.readFile(filePath, (err, data) => {
    if (err) {
      response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('Cursor image not found');
      return;
    }
    response.writeHead(200, {
      'Content-Type': 'image/png',
      'Cache-Control': 'no-store'
    });
    response.end(data);
  });
}

function serveSound(response, fs, path) {
  const filePath = path.join(__dirname, 'freesound_community-evil-laugh-89423.mp3');
  fs.readFile(filePath, (err, data) => {
    if (err) {
      response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('Sound file not found');
      return;
    }
    response.writeHead(200, { 'Content-Type': 'audio/mpeg' });
    response.end(data);
  });
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

    if (!GEMINI_API_KEY) {
      response.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
      response.end(JSON.stringify({ error: 'Gemini API key is not configured.' }));
      return;
    }

    if (typeof fetch !== 'function') {
      response.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
      response.end(JSON.stringify({ error: 'Fetch is not available in this Node.js runtime.' }));
      return;
    }

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: 'Reply helpfully and a little playfully for a kaomoji-themed web page. User message: ' + message
                }
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

function handle(request, response, deps) {
  const { fs, path, GEMINI_API_KEY } = deps;

  if (request.url === '/kaomoji' && request.method === 'GET') {
    return serveKaomojiPage(response);
  }

  if (request.url === '/7d2e594b9e08ab2fba15ece12d239457.png' && request.method === 'GET') {
    return serveCursorImage(response, fs, path);
  }

  if (request.url === '/freesound_community-evil-laugh-89423.mp3' && request.method === 'GET') {
    return serveSound(response, fs, path);
  }

  if (request.url === '/api/kaomoji-gemini' && request.method === 'POST') {
    return handleGeminiApi(request, response, GEMINI_API_KEY);
  }

  response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  response.end('Kaomoji route not found');
}

module.exports = { handle };
