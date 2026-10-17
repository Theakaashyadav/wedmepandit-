const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

function readUInt24LE(buffer, offset) {
  return buffer[offset] | (buffer[offset + 1] << 8) | (buffer[offset + 2] << 16);
}

function dimensions(filePath) {
  const buffer = fs.readFileSync(filePath);

  if (buffer.subarray(1, 4).toString('ascii') === 'PNG') {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  }

  if (buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2;
    while (offset < buffer.length) {
      if (buffer[offset] !== 0xff) { offset += 1; continue; }
      const marker = buffer[offset + 1];
      if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) {
        return { width: buffer.readUInt16BE(offset + 7), height: buffer.readUInt16BE(offset + 5) };
      }
      offset += 2 + buffer.readUInt16BE(offset + 2);
    }
  }

  if (buffer.subarray(0, 4).toString('ascii') === 'RIFF' && buffer.subarray(8, 12).toString('ascii') === 'WEBP') {
    const format = buffer.subarray(12, 16).toString('ascii');
    if (format === 'VP8X') {
      return { width: readUInt24LE(buffer, 24) + 1, height: readUInt24LE(buffer, 27) + 1 };
    }
    if (format === 'VP8 ') {
      return { width: buffer.readUInt16LE(26) & 0x3fff, height: buffer.readUInt16LE(28) & 0x3fff };
    }
    if (format === 'VP8L') {
      const bits = buffer.readUInt32LE(21);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
  }

  throw new Error(`Unsupported image format: ${filePath}`);
}

function listFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? listFiles(entryPath) : [entryPath];
  });
}

const imageFiles = listFiles(path.join(root, 'images'));
const imageDimensions = new Map(imageFiles.map(file => [path.normalize(file), dimensions(file)]));
let updatedTags = 0;

for (const htmlPath of listFiles(root).filter(file => file.endsWith('.html'))) {
  const original = fs.readFileSync(htmlPath, 'utf8');
  const hasRootBase = /<base\s+href=["']\/["']/i.test(original);
  const updated = original.replace(/<img\b[^>]*>/gi, tag => {
    if (/\bwidth\s*=|\bheight\s*=/i.test(tag)) return tag;
    const sourceMatch = tag.match(/\bsrc\s*=\s*["']([^"']+)["']/i);
    if (!sourceMatch || /^(?:https?:|data:)/i.test(sourceMatch[1])) return tag;

    const source = decodeURIComponent(sourceMatch[1].split('?')[0]);
    const imagePath = source.startsWith('/') || hasRootBase
      ? path.resolve(root, source.replace(/^\/+/, ''))
      : path.resolve(path.dirname(htmlPath), source);
    const size = imageDimensions.get(path.normalize(imagePath));
    if (!size) return tag;

    updatedTags += 1;
    const attributes = ` width="${size.width}" height="${size.height}" decoding="async"`;
    return /\s*\/>$/.test(tag)
      ? tag.replace(/\s*\/>$/, `${attributes} />`)
      : tag.replace(/>$/, `${attributes}>`);
  });

  if (updated !== original) fs.writeFileSync(htmlPath, updated);
}

console.log(`Added intrinsic dimensions to ${updatedTags} local image elements.`);
