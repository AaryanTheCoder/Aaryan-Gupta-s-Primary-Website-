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
  else {
    response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Home page: try /about, /contact, + 2 random hidden one! /n Made by Aaryan G');
  }

});
const PORT = process.env.PORT || 3000;
server.listen(PORT, function () {
  console.log(`Server running at http://localhost:${PORT}`);
});
