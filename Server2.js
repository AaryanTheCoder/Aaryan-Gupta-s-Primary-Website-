const http = require('http');
const fs = require('fs');
const path = require('path');
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const server = http.createServer((request, response) => {
  console.log('Requested URL: ' + request.url);
  console.log('Request Method: ' + request.method);

  if (request.url === '/about' && request.method === 'GET') {
  response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  response.end(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>About Aaryan Gupta</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-1: #081120;
      --bg-2: #132238;
      --card: rgba(255, 255, 255, 0.10);
      --card-border: rgba(255, 255, 255, 0.18);
      --text: #f8fbff;
      --muted: #d6e2f1;
      --accent: #8bd3ff;
      --accent-2: #c8a6ff;
      --gold: #ffd76a;
      --shadow: 0 24px 80px rgba(0, 0, 0, 0.35);
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      min-height: 100vh;
      font-family: 'Poppins', sans-serif;
      color: var(--text);
      background:
        radial-gradient(circle at top left, rgba(139, 211, 255, 0.22), transparent 32%),
        radial-gradient(circle at top right, rgba(200, 166, 255, 0.20), transparent 28%),
        linear-gradient(135deg, var(--bg-1), var(--bg-2));
      overflow-x: hidden;
    }

    .page-wrap {
      width: min(1180px, calc(100% - 32px));
      margin: 0 auto;
      padding: 42px 0 56px;
    }

    .hero {
      display: grid;
      grid-template-columns: 360px 1fr;
      gap: 30px;
      align-items: stretch;
      background: var(--card);
      border: 1px solid var(--card-border);
      border-radius: 30px;
      padding: 28px;
      box-shadow: var(--shadow);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      position: relative;
      overflow: hidden;
    }

    .hero::before {
      content: '';
      position: absolute;
      inset: auto -60px -70px auto;
      width: 220px;
      height: 220px;
      background: radial-gradient(circle, rgba(255, 215, 106, 0.25), transparent 70%);
      pointer-events: none;
    }

    .photo-card {
      position: relative;
      border-radius: 26px;
      overflow: hidden;
      min-height: 480px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.14);
    }

    .photo-card img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .photo-label {
      position: absolute;
      left: 16px;
      bottom: 16px;
      padding: 10px 14px;
      border-radius: 999px;
      background: rgba(8, 17, 32, 0.72);
      border: 1px solid rgba(255, 255, 255, 0.18);
      font-size: 0.9rem;
      font-weight: 600;
      letter-spacing: 0.3px;
      backdrop-filter: blur(8px);
    }

    .hero-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      width: fit-content;
      padding: 8px 14px;
      border-radius: 999px;
      background: rgba(255,255,255,0.12);
      border: 1px solid rgba(255,255,255,0.16);
      color: var(--accent);
      font-size: 0.9rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      margin-bottom: 16px;
    }

    h1 {
      margin: 0;
      font-size: clamp(2.4rem, 5vw, 4.4rem);
      line-height: 1.02;
      font-weight: 800;
    }

    .highlight {
      background: linear-gradient(90deg, var(--accent), #ffffff, var(--accent-2));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      color: transparent;
    }

    .intro {
      margin: 18px 0 24px;
      font-size: 1.06rem;
      line-height: 1.85;
      color: var(--muted);
      max-width: 760px;
    }

    .quote {
      margin: 0 0 26px;
      padding: 16px 18px;
      border-left: 4px solid var(--gold);
      background: rgba(255, 255, 255, 0.08);
      border-radius: 18px;
      font-size: 1rem;
      color: #fff7d1;
      font-weight: 600;
    }

    .stats {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 14px;
      margin-top: 4px;
    }

    .stat {
      padding: 18px;
      border-radius: 20px;
      background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.12);
    }

    .stat strong {
      display: block;
      font-size: 1.35rem;
      margin-bottom: 6px;
      color: white;
    }

    .stat span {
      color: var(--muted);
      font-size: 0.95rem;
      line-height: 1.55;
    }

    .section-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 22px;
      margin-top: 26px;
    }

    .info-card {
      background: var(--card);
      border: 1px solid var(--card-border);
      border-radius: 26px;
      padding: 24px;
      box-shadow: var(--shadow);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
    }

    .info-card h2 {
      margin: 0 0 14px;
      font-size: 1.25rem;
      color: #ffffff;
    }

    .info-card p {
      margin: 0;
      color: var(--muted);
      line-height: 1.85;
      font-size: 1rem;
    }

    .tag-list {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 14px;
    }

    .tag {
      padding: 10px 14px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.10);
      border: 1px solid rgba(255, 255, 255, 0.13);
      color: #f5fbff;
      font-size: 0.95rem;
      font-weight: 500;
    }

    .footer-note {
      margin-top: 26px;
      text-align: center;
      color: #d7e8fa;
      font-size: 1rem;
      letter-spacing: 0.2px;
    }

    .footer-note strong {
      color: white;
    }

    @media (max-width: 940px) {
      .hero {
        grid-template-columns: 1fr;
      }

      .photo-card {
        min-height: 360px;
      }

      .section-grid,
      .stats {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 640px) {
      .page-wrap {
        width: min(100% - 20px, 100%);
        padding-top: 20px;
        padding-bottom: 28px;
      }

      .hero,
      .info-card {
        border-radius: 22px;
        padding: 18px;
      }

      .photo-card {
        border-radius: 20px;
        min-height: 300px;
      }

      .intro {
        font-size: 1rem;
      }
    }
  </style>
</head>
<body>
  <div class="page-wrap">
    <section class="hero">
      <div class="photo-card">
        <img src="Selfie.JPG" alt="Aaryan Gupta" />
        <div class="photo-label">Aaryan Gupta • UWCSEA East</div>
      </div>

      <div class="hero-content">
        <div class="eyebrow">About Aaryan Gupta</div>
        <h1>Aaryan Gupta — <span class="highlight">Always shooting for the stars</span></h1>

        <p class="intro">
          Aaryan Gupta is a student currently studying G9 at <strong>United World College (UWCSEA East)</strong>.
          He loves studying the fields of <strong>maths and sciences</strong>, and has been showing incredible performance
          in Olympiads such as the <strong>UKMT IMC</strong>. Along with this, he has displayed his technical prowess in the
          <strong>Hyundai Motor Group Innovation Challenge 2024</strong> — winning <strong>First Place in the Techbot Hackathon</strong>.
        </p>

        <p class="quote">Aaryan — Always shooting for the stars.</p>

        <div class="stats">
          <div class="stat">
            <strong>G9</strong>
            <span>Currently studying at <strong>UWCSEA East</strong> and building strongly across academics, sports, and service.</span>
          </div>
          <div class="stat">
            <strong>1st Place</strong>
            <span>Winner of the <strong>Techbot Hackathon</strong> in the Hyundai Motor Group Innovation Challenge 2024.</span>
          </div>
          <div class="stat">
            <strong>80km Rides</strong>
            <span>A weekend warrior with long cycling trips, shooting for a <strong>round island</strong>.</span>
          </div>
        </div>
      </div>
    </section>

    <section class="section-grid">
      <article class="info-card">
        <h2>Academics</h2>
        <p>
          He loves studying the fields of <strong>maths and sciences</strong>, showing strong curiosity and discipline in both.
          Aaryan has also shown incredible performance in Olympiads such as the <strong>UKMT IMC</strong>, reflecting both his
          problem-solving ability and his passion for learning.
        </p>
        <div class="tag-list">
          <span class="tag">Maths</span>
          <span class="tag">Science</span>
          <span class="tag">UKMT IMC</span>
          <span class="tag">Olympiads</span>
        </div>
      </article>

      <article class="info-card">
        <h2>Innovation</h2>
        <p>
          He has displayed his technical prowess in the <strong>Hyundai Motor Group Innovation Challenge 2024</strong> —
          winning <strong>First Place in the Techbot Hackathon</strong>. It is a strong reflection of Aaryan’s creativity,
          technical skill, and ability to turn ideas into action.
        </p>
        <div class="tag-list">
          <span class="tag">Techbot Hackathon</span>
          <span class="tag">1st Place</span>
          <span class="tag">Innovation</span>
          <span class="tag">Technical Prowess</span>
        </div>
      </article>

      <article class="info-card">
        <h2>Beyond the Classroom</h2>
        <p>
          Along with some stints in <strong>English</strong> and <strong>Theatrical drama</strong>, he also plays for the school’s
          <strong>badminton team</strong>. Aside from school, Aaryan is a weekend warrior, with <strong>80km cycling trips</strong> —
          shooting for a <strong>round island</strong> — as well as <strong>rock climbing</strong> and <strong>swimming</strong>.
        </p>
        <div class="tag-list">
          <span class="tag">English</span>
          <span class="tag">Theatrical Drama</span>
          <span class="tag">Badminton</span>
          <span class="tag">Cycling</span>
          <span class="tag">Rock Climbing</span>
          <span class="tag">Swimming</span>
        </div>
      </article>

      <article class="info-card">
        <h2>Service</h2>
        <p>
          Aaryan has a record of serving his community, currently helping intellectually disabled people at <strong>SUNDAC</strong>.
          He is also currently undertaking the <strong>NYAA Award</strong>. These experiences show his care for others, commitment,
          and willingness to grow not just as a student, but as a person.
        </p>
        <div class="tag-list">
          <span class="tag">SUNDAC</span>
          <span class="tag">Community Service</span>
          <span class="tag">NYAA Award</span>
          <span class="tag">Leadership</span>
        </div>
      </article>
    </section>

    <div class="footer-note">
      <strong>Aaryan Gupta</strong> — a student with passion, drive, and a mindset that is always reaching higher.
    </div>
  </div>
</body>
</html>`);
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
    response.end('Home page: try /about, /contact, + 2 random hidden one! \n Made by Aaryan G \n Domain names: /ramen /kaomoji /games /aaryan (they are all public)');
  }

});

const PORT = process.env.PORT || 3000;
server.listen(PORT, function () {
  console.log(`Server running at http://localhost:${PORT}`);
});
  
