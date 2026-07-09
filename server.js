// Card cockpit — zero-dependency local server.
// Run: node dashboard/server.js   ->   http://localhost:4141
// Serves the SPA and a tiny JSON API backed by data.json (the source of truth).
const http = require('http');
const fs = require('fs');
const path = require('path');

const DIR = __dirname;
const DATA = path.join(DIR, 'data.json');
const PUB = path.join(DIR, 'public');
const PORT = process.env.PORT || 4141;

function readData() {
  try { return fs.readFileSync(DATA, 'utf8'); }
  catch (e) { return JSON.stringify({ settings: {}, shipments: [], cards: [] }, null, 2); }
}

const CT = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json' };

const server = http.createServer((req, res) => {
  const url = req.url.split('?')[0];

  if (url === '/api/data' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(readData());
  }
  if (url === '/api/data' && req.method === 'POST') {
    let body = '';
    req.on('data', c => { body += c; if (body.length > 5e6) req.destroy(); });
    req.on('end', () => {
      try {
        JSON.parse(body);
        fs.writeFileSync(DATA, body);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end('{"ok":true}');
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end('{"ok":false,"error":"invalid json"}');
      }
    });
    return;
  }

  const file = url === '/' ? '/index.html' : url;
  const fp = path.join(PUB, file);
  if (!fp.startsWith(PUB)) { res.writeHead(403); return res.end('forbidden'); }
  fs.readFile(fp, (err, data) => {
    if (err) { res.writeHead(404); return res.end('not found'); }
    res.writeHead(200, { 'Content-Type': CT[path.extname(fp)] || 'text/plain' });
    res.end(data);
  });
});

server.listen(PORT, () => console.log('Card cockpit -> http://localhost:' + PORT));
