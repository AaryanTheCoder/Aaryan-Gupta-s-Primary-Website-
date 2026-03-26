const http = require('http');
const fs = require('fs');
const path = require('path');

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
            font-family: 'Quicksand', sans-serif;
            background-color: var(--bg-color);
            color: var(--text-color);
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 40px 20px;
            margin: 0;
            cursor: url("7d2e594b9e08ab2fba15ece12d239457.jpg"), auto;
        }

        .prompt-wrap {
            width: 100%;
            max-width: 600px;
            margin-top: 24px;
        }

        #geminiPrompt {
            width: 100%;
            padding: 14px 18px;
            border: 2px solid var(--primary-pink);
            border-radius: 12px;
            font-family: 'Quicksand', sans-serif;
            font-size: 1rem;
            box-sizing: border-box;
            outline: none;
            background: white;
            box-shadow: var(--shadow);
        }

        #geminiReply {
            margin-top: 14px;
            background: white;
            padding: 16px 18px;
            border-radius: 12px;
            box-shadow: var(--shadow);
            white-space: pre-wrap;
            line-height: 1.5;
            min-height: 24px;
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
<div class="prompt-wrap">
    <input
        type="text"
        id="geminiPrompt"
        placeholder="Ask Gemini to send a kaomoji to you!"
    >
    <div id="geminiReply"></div>
</div>

    <script>
const clickSound = new Audio("freesound_community-evil-laugh-89423.mp3");
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

</body>
</html>`);
  }
  else if (request.url === '/7d2e594b9e08ab2fba15ece12d239457.jpg' && request.method === 'GET') {
    const filePath = path.join(__dirname, '7d2e594b9e08ab2fba15ece12d239457.jpg');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        response.end('Cursor image not found');
        return;
      }
      response.writeHead(200, { 'Content-Type': 'image/jpeg' });
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
    response.end('Home page: try /about, /contact, + 2 random hidden one! \n Made by Aaryan G PS Jonathan is NICE');
  }

});

const PORT = process.env.PORT || 3000;
server.listen(PORT, function () {
  console.log(`Server running at http://localhost:${PORT}`);
});
  