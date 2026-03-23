const http = require('http');

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
            font-family: monospace; /* Monospace keeps ASCII art aligned */
            white-space: pre;    /* Ensures the cow keeps its shape on the button */
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

    <table>
        <thead>
            <tr>
                <th>Kaomoji</th>
                <th>Name</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><button onclick="copyKaomoji('(◕‿◕)')">(◕‿◕)</button></td>
                <td class="name-cell">Simple happy</td>
            </tr>
            <tr>
                <td><button onclick="copyKaomoji('٩(^‿^)۶')">٩(^‿^)۶</button></td>
                <td class="name-cell">Happy</td>
            </tr>
            <tr>
                <td><button onclick="copyKaomoji('(｡◕‿◕｡)')">(｡◕‿◕｡)</button></td>
                <td class="name-cell">Cute happy</td>
            </tr>
            <tr>
                <td><button onclick="copyKaomoji('(ﾉ◕ヮ◕)ﾉ')">(ﾉ◕ヮ◕)ﾉ</button></td>
                <td class="name-cell">Hands up</td>
            </tr>
            <tr>
                <td>
<button onclick="copyKaomoji(\`  ____
 < hi >
  ----
         \\   ^__^
          \\  (oo)\\_______
             (__)\\       )\\/\\
                 ||----w |
                 ||     ||\`)">  ____
 < hi >
  ----
         \   ^__^
          \  (oo)\_______
             (__)\       )\/\
                 ||----w |
                 ||     ||</button>
                </td>
                <td class="name-cell">Cowsayhi</td>
            </tr>
        </tbody>
    </table>

    <script>
        function copyKaomoji(text) {
            navigator.clipboard.writeText(text).then(() => {
                alert("Copied to clipboard!");
            });
        }
    </script>

</body>
</html>`);
  }
  else {
    response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Home page: try /about, /contact, + 2 random hidden one! \n Made by Aaryan G');
  }

});
const PORT = process.env.PORT || 3000;
server.listen(PORT, function () {
  console.log(`Server running at http://localhost:${PORT}`);
});
