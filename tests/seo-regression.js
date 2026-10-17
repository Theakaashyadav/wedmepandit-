const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const failures = [];
const pass = condition => Boolean(condition);
const assert = (condition, message) => { if (!condition) failures.push(message); };

function files(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? files(fullPath) : [fullPath];
  });
}

function count(source, pattern) {
  return [...source.matchAll(pattern)].length;
}

const htmlFiles = files(root).filter(file => file.endsWith('.html'));
const serviceFiles = files(path.join(root, 'Services')).filter(file => file.endsWith('.html'));
assert(serviceFiles.length === 25, `Expected 25 service pages, found ${serviceFiles.length}`);

for (const filePath of serviceFiles) {
  const html = fs.readFileSync(filePath, 'utf8');
  const relative = path.relative(root, filePath);
  assert(count(html, /<title>[^<]+<\/title>/gi) === 1, `${relative}: title count`);
  assert(count(html, /<meta\s+name=["']description["'][^>]+>/gi) === 1, `${relative}: description count`);
  assert(count(html, /<link\s+rel=["']canonical["'][^>]+>/gi) === 1, `${relative}: canonical count`);
  assert(count(html, /<h1\b/gi) === 1, `${relative}: H1 count`);
}

const articleFiles = files(path.join(root, 'blogs', 'open-blog'))
  .filter(file => file.endsWith('index.html'))
  .map(file => path.relative(root, file).replaceAll('\\', '/'));
const canonicals = new Set();
for (const relative of articleFiles) {
  const html = fs.readFileSync(path.join(root, relative), 'utf8');
  assert(count(html, /<title>[^<]+<\/title>/gi) === 1, `${relative}: unique title missing`);
  assert(count(html, /<meta\s+name=["']description["'][^>]+>/gi) === 1, `${relative}: description missing`);
  assert(count(html, /<h1\b/gi) === 1, `${relative}: H1 count`);
  assert(pass(html.match(/<div class="article-content">[\s\S]{300,}<\/div>/)), `${relative}: static content missing`);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)">/)?.[1];
  assert(canonical, `${relative}: canonical missing`);
  canonicals.add(canonical);
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  assert(schemas.length >= 1, `${relative}: schema missing`);
  for (const schema of schemas) {
    try { JSON.parse(schema[1]); } catch { failures.push(`${relative}: invalid JSON-LD`); }
  }
}
assert(canonicals.size === articleFiles.length, 'Article canonicals are not unique');

for (const filePath of htmlFiles) {
  const html = fs.readFileSync(filePath, 'utf8');
  const relative = path.relative(root, filePath);
  const ids = [...html.matchAll(/\bid=["']([^"']+)["']/gi)].map(match => match[1]);
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
  assert(duplicateIds.length === 0, `${relative}: duplicate IDs ${[...new Set(duplicateIds)].join(', ')}`);

  for (const schema of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(schema[1]); } catch { failures.push(`${relative}: invalid JSON-LD`); }
  }

  const markup = html.replace(/<!--[\s\S]*?-->/g, '');
  for (const image of markup.matchAll(/<img\b[^>]*>/gi)) {
    const tag = image[0];
    assert(/\balt=["'][^"']*["']/i.test(tag), `${relative}: image missing alt`);
    const source = tag.match(/\bsrc=["']([^"']*)["']/i)?.[1];
    if (source && !/^(?:https?:|data:)/i.test(source)) {
      assert(/\bwidth=["']\d+["']/i.test(tag) && /\bheight=["']\d+["']/i.test(tag), `${relative}: local image missing dimensions (${source})`);
    }
  }
}

const header = fs.readFileSync(path.join(root, 'header.html'), 'utf8');
for (const destination of ['/index.html', '/about.html', '/service.html', '/gallery.html', '/blogs.html', '/contact.html']) {
  assert(header.includes(`href="${destination}"`), `Header destination missing: ${destination}`);
}

const serviceListing = fs.readFileSync(path.join(root, 'service.html'), 'utf8');
assert(/noindex,\s*follow/i.test(serviceListing), 'service.html lost noindex, follow');

const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
for (const canonical of canonicals) assert(sitemap.includes(canonical), `Sitemap missing ${canonical}`);
assert(fs.readFileSync(path.join(root, 'robots.txt'), 'utf8').includes('https://www.wedmepandit.com/sitemap.xml'), 'robots.txt sitemap missing');

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(JSON.stringify({
  htmlDocuments: htmlFiles.length,
  servicePages: serviceFiles.length,
  staticArticles: articleFiles.length,
  uniqueArticleCanonicals: canonicals.size,
  duplicateIdFailures: 0,
  schemaFailures: 0,
  result: 'PASS'
}, null, 2));
