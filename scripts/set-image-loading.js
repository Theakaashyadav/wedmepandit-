const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

function updateFile(relativePath, strategy) {
  const filePath = path.join(root, relativePath);
  let imageIndex = 0;
  const original = fs.readFileSync(filePath, 'utf8');
  const updated = original.replace(/<img\b[^>]*>/gi, tag => {
    if (!/\bsrc\s*=\s*["'][^"']+/i.test(tag) || /^\s*<!--/.test(tag)) return tag;
    const currentIndex = imageIndex++;
    if (/\bloading\s*=/i.test(tag)) return tag;
    const loading = strategy(currentIndex, tag);
    const attributes = loading === 'eager'
      ? ' loading="eager" fetchpriority="high"'
      : ' loading="lazy"';
    return tag.replace(/>$/, `${attributes}>`);
  });
  if (updated !== original) fs.writeFileSync(filePath, updated);
}

updateFile('header.html', () => 'eager');
updateFile('footer.html', () => 'lazy');
updateFile('index.html', index => index === 0 ? 'eager' : 'lazy');
updateFile('about.html', () => 'eager');
updateFile('blogs.html', () => 'lazy');
updateFile('gallery.html', () => 'lazy');

for (const relativePath of [
  'Services/16sanskar.html',
  'Services/havanpooja.html',
  'Services/janmdivas.html',
  'Services/namkaran.html',
  'Services/pravachan.html',
  'Services/yagya.html',
  'Services/Vivah/destwed.html',
  'Services/Vivah/sagan.html',
  'Services/Vivah/shadi.html',
  'Services/festivalpooja/diwalipuja.html',
  'Services/festivalpooja/holipuja.html',
  'Services/festivalpooja/janmastamipuja.html',
  'Services/festivalpooja/navratra.html',
  'Services/shantipooja/asthi.html',
  'Services/shantipooja/cremation.html',
  'Services/shantipooja/funeral.html',
  'Services/shantipooja/postritual.html',
  'Services/shantipooja/prayermeeting.html',
  'Services/shantipooja/tehravi.html',
  'Services/sthapna/grihapravesh.html',
  'Services/sthapna/officeinaug.html'
]) updateFile(relativePath, () => 'eager');

console.log('Applied explicit loading priority to content images.');
