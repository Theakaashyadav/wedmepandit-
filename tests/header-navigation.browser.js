const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const chromePath = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const origin = process.env.TEST_ORIGIN || 'http://127.0.0.1:4173';
const debugPort = 9222;
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'wedmepandit-chrome-'));

const chrome = spawn(chromePath, [
  '--headless=new',
  '--disable-gpu',
  '--no-first-run',
  `--remote-debugging-port=${debugPort}`,
  `--user-data-dir=${profile}`,
  'about:blank'
], { stdio: 'ignore' });

const delay = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));

async function retry(callback, attempts = 50) {
  let lastError;
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      return await callback();
    } catch (error) {
      lastError = error;
      await delay(100);
    }
  }
  throw lastError;
}

async function run() {
  await retry(() => fetch(`http://127.0.0.1:${debugPort}/json/version`).then(response => {
    if (!response.ok) throw new Error('Chrome DevTools is not ready');
    return response.json();
  }));

  const target = await fetch(`http://127.0.0.1:${debugPort}/json/new?${encodeURIComponent(origin)}`, {
    method: 'PUT'
  }).then(response => response.json());

  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true });
    socket.addEventListener('error', reject, { once: true });
  });

  let messageId = 0;
  const pending = new Map();
  socket.addEventListener('message', event => {
    const message = JSON.parse(event.data);
    if (!message.id || !pending.has(message.id)) return;
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) reject(new Error(message.error.message));
    else resolve(message.result);
  });

  function command(method, params = {}) {
    const id = ++messageId;
    socket.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
  }

  async function evaluate(expression) {
    const result = await command('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
    return result.result.value;
  }

  async function waitForHeader() {
    await retry(async () => {
      const ready = await evaluate("Boolean(document.querySelector('.nav-links a'))");
      if (!ready) throw new Error('Header has not loaded');
      return ready;
    });
  }

  const destinations = [
    ['Home', '/index.html'],
    ['About', '/about.html'],
    ['Services', '/service.html'],
    ['Gallery', '/gallery.html'],
    ['Blogs', '/blogs.html'],
    ['Contact', '/contact.html']
  ];
  const widths = [360, 390, 768, 1024, 1440];
  const results = [];

  await command('Page.enable');
  await command('Runtime.enable');

  for (const width of widths) {
    await command('Emulation.setDeviceMetricsOverride', {
      width,
      height: 900,
      deviceScaleFactor: 1,
      mobile: width <= 768
    });
    await command('Page.navigate', { url: origin });
    await waitForHeader();

    if (width <= 768) {
      const opened = await evaluate(`(() => {
        document.querySelector('.menu-btn').click();
        return document.querySelector('.nav-links').classList.contains('show');
      })()`);
      if (!opened) throw new Error(`Mobile menu did not open at ${width}px`);
    }

    for (const [label, pathname] of destinations) {
      await waitForHeader();
      const clicked = await evaluate(`(() => {
        const link = [...document.querySelectorAll('.nav-links a')]
          .find(item => item.textContent.trim() === ${JSON.stringify(label)});
        if (!link) return false;
        link.click();
        return true;
      })()`);
      if (!clicked) throw new Error(`${label} link is missing at ${width}px`);

      await retry(async () => {
        const currentPath = await evaluate('window.location.pathname');
        if (currentPath !== pathname) throw new Error(`Expected ${pathname}, received ${currentPath}`);
        return currentPath;
      });
      await waitForHeader();

      const page = await evaluate(`({
        path: window.location.pathname,
        title: document.title,
        heading: document.querySelector('h1')?.textContent.trim() || '',
        overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
      })`);
      if (!page.title || page.overflow) {
        throw new Error(`${label} failed render/overflow checks at ${width}px`);
      }
      results.push({ width, label, ...page });
    }
  }

  socket.close();
  console.log(JSON.stringify(results, null, 2));
}

run()
  .catch(error => {
    console.error(error.stack || error.message);
    process.exitCode = 1;
  })
  .finally(() => {
    chrome.kill();
    try {
      fs.rmSync(profile, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
    } catch {
      // Chrome can retain Windows profile locks briefly after the test completes.
    }
  });
