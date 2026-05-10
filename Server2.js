const http = require('http');
const fs = require('fs');
const path = require('path');
const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // API key has been set as an environment variable in Azure for Security, Allowing Users of Kaomoji Website to Ask Gemini Questions
const storageRoutes = require('./storageRoutes');
const kaomojiRoutes = require('./kaomoji');
const sandboxRoutes = require('./sandboxRoutes');
const cloudConsoleRoutes = require('./cloudConsoleRoutes');
const geminiRoutes = require('./geminiRoutes');
const simulatorRoutes = require('./simulatorRoutes');
const plannerRoutes = require('./plannerRoutes');

const server = http.createServer((request, response) => {
  console.log('Requested URL: ' + request.url);
  console.log('Request Method: ' + request.method); // The console (I think the Azure One,) Will report all requests, like if they requested a specific subsite /kaomoji for example and if they GET or POST (like when uploading)
const requestPathname = request.url.split('?')[0];
if (request.url.startsWith('/storage')) {
  return storageRoutes.handle(request, response); // If they request / storage takes them to the storageRoutes.js File 
}

if (request.url === '/sandbox' && request.method === 'GET') { // Sandbox is a fun little page I made to test out new code and features, It’s not linked anywhere on the website, but it’s a fun place to experiment and try out new things without affecting the main site. It’s like my personal playground for coding and creativity!
  return sandboxRoutes.handle(request, response);
}

if (
  request.url === '/kaomoji' ||
  request.url === '/7d2e594b9e08ab2fba15ece12d239457.png' ||
  request.url === '/freesound_community-evil-laugh-89423.mp3' ||
  request.url === '/api/kaomoji-gemini'
) {
  return kaomojiRoutes.handle(request, response, { fs, path, GEMINI_API_KEY });
}

if (request.url === '/cloudconsole' || request.url.startsWith('/api/cloudconsole')) {
  return cloudConsoleRoutes.handle(request, response);
}

if (request.url === '/simulator' || request.url.startsWith('/simulator/')) {
  return simulatorRoutes.handle(request, response);
}

if (requestPathname === '/planner' || requestPathname === '/daily-planner' || requestPathname === '/dailyplanner') {
  return plannerRoutes.handle(request, response);
}

if (request.url === '/gemini' || request.url === '/api/gemini') {
  return geminiRoutes.handle(request, response, GEMINI_API_KEY);
}

  if (request.url === '/about' && request.method === 'GET') { // This is an About Page About me (HTML) Things I could add: Abiity to edit my about page without changing code, This would mean making a full passoword based Editor (Like my own digital Canva!)
  response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });// Could add Socials 
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
  else if (request.url === '/contact' && request.method === 'GET') { // About Page 
    response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.write('Ahoy! Need to reach us? ');
    response.end('Contact us at: aaryangupta2.com@gmail.com');

  }
  else if (request.url==='/ramen'&& request.method === 'GET'){ // Ramen 
    response.writeHead(200,{'Content-Type': 'text/plain; charset=utf-8'});
    response.write('Welcome to Neon Noodles! ==============LATE NITE MENU=============\n');
    response.write('RAMEN\n1. Quantum Truffle Ramen\n\nEXTRA TOPPINGS\n1. Hacktivist Pork\n2. Cybernetic Egg\n3. Glowing Scallion');
    response.end();
  }
      else if (request.url === '/Selfie.JPG' && request.method === 'GET') {
  const filePath = path.join(__dirname, 'Selfie.JPG');

  fs.readFile(filePath, (err, data) => {
    if (err) {
      response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('Selfie not found');
      return;
    }

    response.writeHead(200, { 'Content-Type': 'image/jpeg' });
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
  // Serve Google Search Console verification file at the exact root path
  else if (request.url === '/google39fdc9cf51b98b51.html' && request.method === 'GET') {
    const filePath = path.join(__dirname, 'google39fdc9cf51b98b51.html');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        response.end('Verification file not found');
        return;
      }
      response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
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
    const photoFile = path.join(__dirname, 'Photo on 24-3-26 at 10.30 AM.jpg');    response.writeHead(200, { 'Content-Type': 'image/jpeg' });    fs.createReadStream(photoFile)
      .on('error', () => { response.writeHead(404, {'Content-Type':'text/plain; charset=utf-8'}); response.end('Photo not found'); })
      .pipe(response);
  }
  else {
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="google-site-verification" content="XzxEBnHBbLtaUXze_1P3ePX5oHGrVijoKZgqQvHbhyc" />
  <title>Aaryan Gupta | Home</title>
  <style>
    :root {
      --bg-1: #07111f;
      --bg-2: #14243d;
      --card: rgba(255, 255, 255, 0.10);
      --card-border: rgba(255, 255, 255, 0.16);
      --text: #f7fbff;
      --muted: #d2e1f0;
      --accent: #8ed8ff;
      --accent-2: #c4a8ff;
      --shadow: 0 24px 80px rgba(0, 0, 0, 0.35);
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      min-height: 100vh;
      font-family: Arial, Helvetica, sans-serif;
      color: var(--text);
      background:
        radial-gradient(circle at top left, rgba(142, 216, 255, 0.22), transparent 30%),
        radial-gradient(circle at top right, rgba(196, 168, 255, 0.20), transparent 28%),
        linear-gradient(135deg, var(--bg-1), var(--bg-2));
    }

    .page {
      width: min(1180px, calc(100% - 32px));
      margin: 0 auto;
      padding: 36px 0 56px;
    }

    .hero {
      background: var(--card);
      border: 1px solid var(--card-border);
      border-radius: 28px;
      padding: 34px 30px;
      box-shadow: var(--shadow);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      overflow: hidden;
      position: relative;
    }

    .hero::after {
      content: '';
      position: absolute;
      right: -60px;
      bottom: -80px;
      width: 220px;
      height: 220px;
      background: radial-gradient(circle, rgba(142, 216, 255, 0.18), transparent 68%);
      pointer-events: none;
    }

    .eyebrow {
      display: inline-block;
      padding: 8px 14px;
      border-radius: 999px;
      background: rgba(255,255,255,0.11);
      border: 1px solid rgba(255,255,255,0.16);
      color: var(--accent);
      font-size: 0.9rem;
      font-weight: bold;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin-bottom: 16px;
    }

    h1 {
      margin: 0 0 14px;
      font-size: clamp(2.2rem, 5vw, 4.1rem);
      line-height: 1.05;
    }

    .highlight {
      background: linear-gradient(90deg, var(--accent), #ffffff, var(--accent-2));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      color: transparent;
    }

    .lead {
      max-width: 820px;
      color: var(--muted);
      font-size: 1.06rem;
      line-height: 1.8;
      margin: 0;
    }

    .section-title {
      margin: 30px 0 14px;
      font-size: 1.3rem;
    }

    .card-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 20px;
      margin-top: 8px;
    }

    .widget {
      display: block;
      text-decoration: none;
      color: inherit;
      background: var(--card);
      border: 1px solid var(--card-border);
      border-radius: 24px;
      padding: 22px;
      box-shadow: var(--shadow);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease;
    }

    .widget:hover {
      transform: translateY(-6px);
      border-color: rgba(142, 216, 255, 0.5);
      background: rgba(255, 255, 255, 0.13);
    }

    .route {
      display: inline-block;
      padding: 8px 12px;
      border-radius: 999px;
      background: rgba(255,255,255,0.10);
      border: 1px solid rgba(255,255,255,0.14);
      color: var(--accent);
      font-weight: bold;
      font-size: 0.95rem;
      margin-bottom: 14px;
    }

    .widget h2 {
      margin: 0 0 10px;
      font-size: 1.35rem;
      color: #ffffff;
    }

    .widget p {
      margin: 0;
      color: var(--muted);
      line-height: 1.7;
      font-size: 0.98rem;
    }

    .footer-note {
      margin-top: 24px;
      text-align: center;
      color: var(--muted);
      font-size: 0.98rem;
    }

    @media (max-width: 780px) {
      .card-grid {
        grid-template-columns: 1fr;
      }

      .hero {
        padding: 24px 20px;
      }

      .page {
        width: min(100% - 20px, 100%);
        padding-top: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="page">
    <section class="hero">
      <div class="eyebrow">Welcome to my website</div>
      <h1>A tiny bit about me — <span class="highlight">this website contains my projects</span></h1>
      <p class="lead">
        Hi, I'm Aaryan Gupta. This website is a collection of projects, pages, and fun experiments I’ve built — from my personal profile page to games, kaomoji tools, and more. Click any widget below to explore the different parts of the site.
      </p>
    </section>

    <h2 class="section-title">Explore the site</h2>

    <section class="card-grid">
      <a class="widget" href="/about">
        <div class="route">/about</div>
        <h2>About Me</h2>
        <p>Learn more about who I am, my school life, achievements, interests, sports, and community service.</p>
      </a>

      <a class="widget" href="/contact">
        <div class="route">/contact</div>
        <h2>Contact</h2>
        <p>Need to reach me? This page gives you my contact email so you can get in touch easily.</p>
      </a>

      <a class="widget" href="/ramen">
        <div class="route">/ramen</div>
        <h2>Ramen Page</h2>
        <p>A playful hidden-style page with a fun neon noodle menu and some creative flavor.</p>
      </a>

      <a class="widget" href="/kaomoji">
        <div class="route">/kaomoji</div>
        <h2>Kaomoji Project</h2>
        <p>Explore my kaomoji project, complete with interactive features and Gemini-powered functionality.</p>
      </a>

      <a class="widget" href="/gemini">
        <div class="route">/gemini</div>
        <h2>Gemini Chat</h2>
        <p>Ask Gemini questions from a dedicated page connected through the server API.</p>
      </a>

      <a class="widget" href="/cloudconsole">
        <div class="route">/cloudconsole</div>
        <h2>Cloud Console</h2>
        <p>Open the browser-based cloud console page for command-style experiments and tools.</p>
      </a>

      <a class="widget" href="/games">
        <div class="route">/games</div>
        <h2>Games</h2>
        <p>Check out my Near Impossible Pong project and download the Python version to run locally.</p>
      </a>

      <a class="widget" href="/aaryan">
        <div class="route">/aaryan</div>
        <h2>Photo Page</h2>
        <p>A simple page that displays a photo, as part of the website’s personal and creative side.</p>
      </a>

      <a class="widget" href="/storage">
        <div class="route">/storage</div>
        <h2>Storage</h2>
        <p>Access the storage section of the site for upload and file-related features handled by the server.</p>
      </a>

      <a class="widget" href="/sandbox">
        <div class="route">/sandbox</div>
        <h2>Sandbox</h2>
        <p>My personal playground for testing and experimenting with new code and features without affecting the main site.</p>
      </a>

      <a class="widget" href="/simulator">
        <div class="route">/simulator</div>
        <h2>Stock Simulator</h2>
        <p>A full paper-trading simulator with portfolio tracking, research, charts, stock and options trades, and custom game modes.</p>
      </a>

      <a class="widget" href="/planner">
        <div class="route">/planner</div>
        <h2>Daily Planner</h2>
        <p>A password-protected personal school dashboard with Singapore time, notes, weather, tasks, calendar, and urgency widgets.</p>
      </a>
    </section>

    <div class="footer-note">
      Built by <strong>Aaryan Gupta</strong> — thanks for visiting my website.
    </div>
    <div style="margin-top: 30px; text-align: center;">
  <img src="/Selfie.JPG" alt="My Photo"
       style="max-width: 220px; border-radius: 20px;
              box-shadow: 0 10px 30px rgba(0,0,0,0.4);" />
</div>
    <div style="text-align:center; margin-top: 10px;">
      <a href="/google39fdc9cf51b98b51.html" style="font-size:9px; color:#9fb6d6; opacity:0.7; text-decoration:none;">google verification</a>
    </div>
  </div>
</body>
</html>`);
  }

});

const PORT = process.env.PORT || 3000;
server.listen(PORT, function () {
  console.log(`Server running at http://localhost:${PORT}`);
});
  
