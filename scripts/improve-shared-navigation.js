const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

function files(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? files(fullPath) : [fullPath];
  });
}

let menuHandlers = 0;
let externalLinks = 0;

for (const filePath of files(root).filter(file => file.endsWith('.html'))) {
  const original = fs.readFileSync(filePath, 'utf8');
  let updated = original.replace(/navLinks\.classList\.toggle\((["'])show\1\);/g, match => {
    menuHandlers += 1;
    return `const isOpen = navLinks.classList.toggle("show");\n            menuBtn.setAttribute("aria-expanded", String(isOpen));`;
  });

  updated = updated.replace(/<a\b([^>]*\btarget=["']_blank["'][^>]*)>/gi, (tag, attributes) => {
    if (/\brel\s*=/i.test(tag)) return tag;
    externalLinks += 1;
    return `<a${attributes} rel="noopener noreferrer">`;
  });

  if (updated !== original) fs.writeFileSync(filePath, updated);
}

console.log(`Updated ${menuHandlers} menu handlers and secured ${externalLinks} external links.`);
