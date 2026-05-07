/**
 * Serves this folder over HTTP so Babel can load external .jsx files (file:// will not).
 * Usage: node static-server.cjs
 * Then open http://127.0.0.1:8765/ or http://127.0.0.1:8765/index.html
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.PORT) || 8765;
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.jsx': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.cjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
};

function safeFilePath(urlPathname) {
  const decoded = decodeURIComponent(urlPathname.split('?')[0] || '/');
  let rel = decoded.replace(/^\/+/, '') || 'index.html';
  rel = path.normalize(rel).replace(/^(\.\.(\/|\\|$))+/, '');
  const resolved = path.resolve(ROOT, rel);
  const rootResolved = path.resolve(ROOT);
  if (!resolved.startsWith(rootResolved + path.sep) && resolved !== rootResolved) {
    return null;
  }
  return resolved;
}

const server = http.createServer((req, res) => {
  const fp = safeFilePath(new URL(req.url, `http://${req.headers.host}`).pathname);
  if (!fp) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }
  fs.stat(fp, (err, st) => {
    if (err || !st.isFile()) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    const ext = path.extname(fp).toLowerCase();
    const type = MIME[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': type });
    fs.createReadStream(fp)
      .on('error', () => {
        if (!res.headersSent) res.writeHead(500);
        res.end();
      })
      .pipe(res);
  });
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    // eslint-disable-next-line no-console
    console.error(`Port ${PORT} is already in use. Try another port, e.g.:`);
    // eslint-disable-next-line no-console
    console.error(`  $env:PORT=8770; node .\\static-server.cjs`);
    process.exit(1);
  }
  throw err;
});

server.listen(PORT, '127.0.0.1', () => {
  // eslint-disable-next-line no-console
  console.log(`Verity Signal: http://127.0.0.1:${PORT}/index.html`);
});
