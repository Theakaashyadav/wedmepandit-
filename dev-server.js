const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const port = Number(process.env.PORT) || 4173;

const cleanRoutes = new Map([
  ['/', 'index.html'],
  ['/home', 'index.html'],
  ['/about-us', 'about.html'],
  ['/services', 'service.html'],
  ['/gallery', 'gallery.html'],
  ['/blogs', 'blogs.html'],
  ['/contact', 'contact.html']
]);

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.xml': 'application/xml; charset=utf-8'
};

function sendFile(response, relativePath) {
  const absolutePath = path.resolve(root, relativePath);
  if (absolutePath !== root && !absolutePath.startsWith(`${root}${path.sep}`)) {
    response.writeHead(403).end('Forbidden');
    return;
  }

  fs.stat(absolutePath, (error, stats) => {
    if (error || !stats.isFile()) {
      response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Not found');
      return;
    }
    response.writeHead(200, {
      'Content-Type': contentTypes[path.extname(absolutePath).toLowerCase()] || 'application/octet-stream'
    });
    fs.createReadStream(absolutePath).pipe(response);
  });
}

http.createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);

  if (pathname === '/Our-services' || pathname === '/our-services') {
    response.writeHead(301, { Location: '/services' }).end();
    return;
  }

  const articleMatch = pathname.match(/^\/blogs\/open-blog\/([^/]+)\/?$/);
  if (articleMatch) {
    sendFile(response, `blogs/open-blog/${articleMatch[1]}/index.html`);
    return;
  }

  const routeFile = cleanRoutes.get(pathname);
  if (routeFile) {
    sendFile(response, routeFile);
    return;
  }

  sendFile(response, pathname.replace(/^\/+/, ''));
}).listen(port, '127.0.0.1', () => {
  console.log(`WedMePandit local server: http://127.0.0.1:${port}`);
});
