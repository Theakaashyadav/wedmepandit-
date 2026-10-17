const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const root = path.resolve(__dirname, '..');
const chromePath = process.env.CHROME_PATH || 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const debugPort = 9333;
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'wedmepandit-image-'));
const chrome = spawn(chromePath, [
  '--headless=new', '--disable-gpu', '--no-first-run',
  `--remote-debugging-port=${debugPort}`, `--user-data-dir=${profile}`, 'about:blank'
], { stdio: 'ignore' });

const delay = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));

async function retry(callback) {
  let error;
  for (let index = 0; index < 60; index += 1) {
    try { return await callback(); } catch (caught) { error = caught; await delay(100); }
  }
  throw error;
}

async function main() {
  await retry(() => fetch(`http://127.0.0.1:${debugPort}/json/version`).then(response => {
    if (!response.ok) throw new Error('Browser not ready');
    return response.json();
  }));
  const target = await fetch(`http://127.0.0.1:${debugPort}/json/new?about:blank`, { method: 'PUT' }).then(response => response.json());
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true });
    socket.addEventListener('error', reject, { once: true });
  });

  let id = 0;
  const pending = new Map();
  socket.addEventListener('message', event => {
    const message = JSON.parse(event.data);
    if (!message.id || !pending.has(message.id)) return;
    const handlers = pending.get(message.id);
    pending.delete(message.id);
    message.error ? handlers.reject(new Error(message.error.message)) : handlers.resolve(message.result);
  });
  const command = (method, params = {}) => new Promise((resolve, reject) => {
    const messageId = ++id;
    pending.set(messageId, { resolve, reject });
    socket.send(JSON.stringify({ id: messageId, method, params }));
  });

  for (const [sourceName, outputName] of [
    ['Sacred Bond.png', 'sacred-bond.webp'],
    ['Hindu Wedding.png', 'hindu-wedding.webp']
  ]) {
    const input = fs.readFileSync(path.join(root, 'images', sourceName)).toString('base64');
    const expression = `(async () => {
      const image = new Image();
      image.src = 'data:image/png;base64,${input}';
      await image.decode();
      const canvas = document.createElement('canvas');
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      canvas.getContext('2d').drawImage(image, 0, 0);
      return canvas.toDataURL('image/webp', 0.86);
    })()`;
    const result = await command('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
    const encoded = result.result.value.replace(/^data:image\/webp;base64,/, '');
    fs.writeFileSync(path.join(root, 'images', outputName), Buffer.from(encoded, 'base64'));
    console.log(`${sourceName} -> ${outputName}`);
  }
  socket.close();
}

main().catch(error => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
}).finally(() => {
  chrome.kill();
  try { fs.rmSync(profile, { recursive: true, force: true }); } catch {}
});
