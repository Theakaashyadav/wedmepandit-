const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const origin = process.env.TEST_ORIGIN || 'http://127.0.0.1:4173';

function files(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? files(fullPath) : [fullPath];
  });
}

async function main() {
  const documents = files(root).filter(file => file.endsWith('.html'));
  const targets = new Map();

  for (const filePath of documents) {
    const relative = path.relative(root, filePath).split(path.sep).join('/');
    const documentUrl = new URL(`/${relative}`, origin);
    const html = fs.readFileSync(filePath, 'utf8').replace(/<!--[\s\S]*?-->/g, '');
    const baseHref = html.match(/<base\s+href=["']([^"']+)["']/i)?.[1];
    const baseUrl = baseHref ? new URL(baseHref, documentUrl) : documentUrl;
    const tags = [...html.matchAll(/<(?:a|link|img|script|button)\b[^>]*>/gi)].map(match => match[0]);
    const references = tags.flatMap(tag => [
      ...[...tag.matchAll(/(?:href|src)\s*=\s*["']([^"']+)["']/gi)].map(match => match[1]),
      ...[...tag.matchAll(/location\.href\s*=\s*["']([^"']+)["']/gi)].map(match => match[1])
    ]);

    for (const reference of references) {
      if (!reference || /^(?:#|tel:|mailto:|javascript:|data:|https?:\/\/)/i.test(reference)) continue;
      const target = new URL(reference, baseUrl);
      if (target.origin !== origin) continue;
      target.hash = '';
      targets.set(target.href, `${relative} -> ${reference}`);
    }
  }

  for (const route of [
    '/', '/about-us', '/services', '/gallery', '/blogs', '/contact',
    '/blogs/open-blog/environmental-protection',
    '/blogs/open-blog/sacred-bond-of-marriage',
    '/blogs/open-blog/vedic-hindu-wedding-guide'
  ]) targets.set(`${origin}${route}`, `required route ${route}`);

  const failures = [];
  for (const [url, source] of targets) {
    const response = await fetch(url, { redirect: 'follow' });
    if (!response.ok) failures.push(`${response.status} ${url} (${source})`);
  }

  if (failures.length) {
    console.error(failures.join('\n'));
    process.exit(1);
  }
  console.log(JSON.stringify({ documents: documents.length, uniqueInternalTargets: targets.size, failures: 0, result: 'PASS' }, null, 2));
}

main().catch(error => {
  console.error(error.stack || error.message);
  process.exit(1);
});
