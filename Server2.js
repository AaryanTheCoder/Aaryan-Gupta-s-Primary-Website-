const http = require('http');
const fs = require('fs');
const path = require('path');
const GEMINI_API_KEY = 'AIzaSyDGQ_I9qExtfB3ckEIV48DcI62J5ES0NvQ';

const server = http.createServer((request, response) => {
  console.log('Requested URL: ' + request.url);
  console.log('Request Method: ' + request.method);

  if (request.url === '/about' && request.method === 'GET') {
        response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        response.end('This is the about page. Welcome aboard! 🚢');
  }
  else if (request.url === '/contact' && request.method === 'GET') {
    response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.write('Ahoy! Need to reach us? ');
    response.end('Contact us at: contact@example.com.sg');

  }
  else if (request.url==='/ramen'&& request.method === 'GET'){
    response.writeHead(200,{'Content-Type': 'text/plain; charset=utf-8'});
    response.write('Welcome to Neon Noodles! ==============LATE NITE MENU=============\n');
    response.write('RAMEN\n1. Quantum Truffle Ramen\n\nEXTRA TOPPINGS\n1. Hacktivist Pork\n2. Cybernetic Egg\n3. Glowing Scallion');
    response.end();
  }
  else if (request.url==='/kaomoji'&& request.method === 'GET'){
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
<button onclick="playSound(); copyKaomoji('(\"^__^\")')">  ____
 < hi >
  ----
            ^__^
            (oo)_______
             (__)       )/                 ||----w |
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
  else if (request.url === '/7d2e594b9e08ab2fba15ece12d239457.png' && request.method === 'GET') {
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
  else if (request.url === '/freesound_community-evil-laugh-89423.mp3' && request.method === 'GET') {
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
    else if (request.url === '/api/kaomoji-gemini' && request.method === 'POST') {
    let body = '';

    request.on('data', chunk => {
      body += chunk;
    });

    request.on('end', async () => {
      try {
        const parsed = JSON.parse(body || '{}');
        const message = typeof parsed.message === 'string' ? parsed.message.trim() : '';

        if (!message) {
          response.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
          response.end(JSON.stringify({ error: 'Message is required.' }));
          return;
        }

        const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Reply helpfully and a little playfully for a kaomoji-themed web page. User message: ${message}`
                  }
                ]
              }
            ]
          })
        });

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
        response.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
        response.end(JSON.stringify({ error: error.message || 'Internal server error.' }));
      }
    });
  }
  else if (request.url === '/games/pong.py' && request.method === 'GET') {
    const filePath = path.join(__dirname, 'games', 'pong.py');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        response.end('pong.py not found');
        return;
      }
      response.writeHead(200, {
        'Content-Type': 'text/x-python; charset=utf-8',
        'Content-Disposition': 'attachment; filename="pong.py"'
      });
      response.end(data);
    });
  }
  else if (request.url === '/games' && request.method === 'GET') {
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Games | Near Impossible Pong</title>
  <style>
    body { font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; margin: 0; padding: 40px; background:#0b0b0b; color:#f3f3f3; }
    .card { max-width: 760px; margin: 0 auto; background:#141414; border:1px solid #222; border-radius: 14px; padding: 24px 28px; box-shadow: 0 10px 30px rgba(0,0,0,0.35); }
    h1 { margin: 0 0 8px; font-size: 28px; }
    p { opacity: .9; line-height: 1.6; }
    code { background:#1c1c1c; padding:2px 6px; border-radius:6px; }
    .actions { margin-top: 18px; display:flex; gap:12px; flex-wrap:wrap; }
    a.btn { display:inline-block; background:#1f6feb; color:white; text-decoration:none; padding:10px 14px; border-radius:10px; font-weight:600; }
    a.secondary { background:#2a2a2a; color:#ddd; }
    .note { margin-top:14px; font-size:14px; color:#b7b7b7; }
    .kbd { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: .95em; }
  </style>
  </head>
  <body>
    <div class="card">
      <h1>Near Impossible Pong</h1>
      <p>This game is written in Python Turtle (desktop). Web browsers can’t run Turtle directly, so play it locally by downloading the Python file below.</p>
      <div class="actions">
        <a class="btn" href="/games/pong.py" download>Download Python Game</a>
        <a class="btn secondary" href="/">Back Home</a>
      </div>
      <div class="note">
        <p><strong>How to run</strong></p>
        <ol>
          <li>Install <span class="kbd">Python 3</span> (includes Tkinter on most systems).</li>
          <li>Open Terminal in the folder where you saved <span class="kbd">pong.py</span>.</li>
          <li>Run: <code>python3 pong.py</code></li>
        </ol>
        <p>Optional sound effects use macOS <span class="kbd">afplay</span>. If you’re not on macOS, you can ignore those lines.</p>
      </div>
    </div>
  </body>
  </html>`);
  }
  else if (request.url === '/aaryan' && request.method === 'GET') {
    response.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
    response.end('<!DOCTYPE html><title>Aaryan</title><img src=/aaryan/photo alt=Aaryan width=240>');
  }
  else if (request.url === '/aaryan/photo' && request.method === 'GET') {
    const photoFile = path.join(__dirname, 'Photo on 24-3-26 at 10.30 AM.jpg');
    fs.createReadStream(photoFile)
      .on('error', () => { response.writeHead(404, {'Content-Type':'text/plain; charset=utf-8'}); response.end('Photo not found'); })
      .pipe(response);
  }
  else {
    response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Home page: try /about, /contact, + 2 random hidden one! \n Made by Aaryan G PS Jonathan is NICE Domain names: /ramen /kaomoji /games /aaryan (they are all public)');
  }

});

const PORT = process.env.PORT || 3000;
server.listen(PORT, function () {
  console.log(`Server running at http://localhost:${PORT}`);
});
  