const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');

function files(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(directory, entry.name);
    return entry.isDirectory() ? files(full) : [full];
  });
}

let updatedCount = 0;
for (const file of files(root).filter(file => file.endsWith('.html'))) {
  const source = fs.readFileSync(file, 'utf8');
  if (!/<head[>\s]/i.test(source) || /href=["']\/phase3\.css["']/i.test(source)) continue;
  const updated = source.replace(/<\/head>/i, '  <link rel="stylesheet" href="/phase3.css">\n</head>');
  fs.writeFileSync(file, updated);
  updatedCount += 1;
}
console.log(`Added the Phase 3 design system to ${updatedCount} documents.`);
