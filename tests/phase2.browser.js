const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const browserPath = process.env.CHROME_PATH || 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const origin = process.env.TEST_ORIGIN || 'http://127.0.0.1:4173';
const port = 9444;
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'wedmepandit-phase2-'));
const browser = spawn(browserPath, [
  '--headless=new', '--disable-gpu', '--no-first-run',
  `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, 'about:blank'
], { stdio: 'ignore' });
const delay = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));

async function retry(callback, attempts = 60) {
  let error;
  for (let index = 0; index < attempts; index += 1) {
    try { return await callback(); } catch (caught) { error = caught; await delay(100); }
  }
  throw error;
}

async function run() {
  await retry(() => fetch(`http://127.0.0.1:${port}/json/version`).then(response => {
    if (!response.ok) throw new Error('Browser not ready');
    return response.json();
  }));
  const target = await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: 'PUT' }).then(response => response.json());
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true });
    socket.addEventListener('error', reject, { once: true });
  });

  let id = 0;
  const pending = new Map();
  const consoleErrors = [];
  const failedRequests = [];
  socket.addEventListener('message', event => {
    const message = JSON.parse(event.data);
    if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error') {
      consoleErrors.push(message.params.args.map(argument => argument.value || argument.description).join(' '));
    }
    if (message.method === 'Network.loadingFailed' && !message.params.canceled) {
      failedRequests.push(`${message.params.errorText}: ${message.params.requestId}`);
    }
    if (message.method === 'Network.responseReceived' && message.params.response.status >= 400) {
      failedRequests.push(`${message.params.response.status}: ${message.params.response.url}`);
    }
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
  const evaluate = async expression => {
    const response = await command('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
    if (response.exceptionDetails) throw new Error(response.exceptionDetails.text);
    return response.result.value;
  };
  const navigate = async pathname => {
    await command('Page.navigate', { url: `${origin}${pathname}` });
    await retry(async () => {
      const state = await evaluate('document.readyState');
      if (state !== 'complete') throw new Error('Document not ready');
      return state;
    });
    await delay(350);
  };

  await command('Page.enable');
  await command('Runtime.enable');
  await command('Network.enable');
  await command('Page.addScriptToEvaluateOnNewDocument', { source: `
    window.__phase2Vitals = { lcp: 0, cls: 0 };
    new PerformanceObserver(list => {
      const entries = list.getEntries();
      if (entries.length) window.__phase2Vitals.lcp = entries[entries.length - 1].startTime;
    }).observe({ type: 'largest-contentful-paint', buffered: true });
    new PerformanceObserver(list => {
      for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.__phase2Vitals.cls += entry.value;
    }).observe({ type: 'layout-shift', buffered: true });
  ` });

  const pages = [
    '/index.html', '/about.html', '/service.html', '/gallery.html', '/blogs.html', '/contact.html',
    '/blogs/open-blog/environmental-protection/index.html',
    '/blogs/open-blog/sacred-bond-of-marriage/index.html',
    '/blogs/open-blog/vedic-hindu-wedding-guide/index.html',
    '/Services/vivah.html', '/Services/Vivah/shadi.html', '/Services/Vivah/sagan.html', '/Services/Vivah/destwed.html',
    '/Services/sthapna.html', '/Services/sthapna/grihapravesh.html', '/Services/sthapna/officeinaug.html',
    '/Services/namkaran.html', '/Services/16sanskar.html', '/Services/janmdivas.html', '/Services/pravachan.html',
    '/Services/festivalpooja.html', '/Services/festivalpooja/diwalipuja.html', '/Services/festivalpooja/holipuja.html',
    '/Services/festivalpooja/janmastamipuja.html', '/Services/festivalpooja/navratra.html',
    '/Services/shantipooja.html', '/Services/shantipooja/asthi.html', '/Services/shantipooja/cremation.html',
    '/Services/shantipooja/funeral.html', '/Services/shantipooja/postritual.html', '/Services/shantipooja/prayermeeting.html',
    '/Services/shantipooja/tehravi.html', '/Services/havanpooja.html', '/Services/yagya.html'
  ];
  const responsive = [];

  for (const width of [360, 390, 768, 1024, 1440]) {
    await command('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width <= 768 });
    for (const pathname of pages) {
      await navigate(pathname);
      const result = await evaluate(`({
        title: document.title,
        h1: document.querySelectorAll('h1').length,
        overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
        brokenImages: [...document.images].filter(image => image.currentSrc && image.complete && image.naturalWidth === 0).length
      })`);
      if (!result.title || result.h1 !== 1 || result.overflow || result.brokenImages) {
        throw new Error(`${pathname} failed at ${width}px: ${JSON.stringify(result)}`);
      }
      responsive.push({ width, pathname, ...result });
    }
  }

  const faqMinimums = { '/index.html': 6, '/about.html': 5, '/service.html': 6, '/gallery.html': 4, '/blogs.html': 5 };
  for (const [pathname, minimum] of Object.entries(faqMinimums)) {
    await navigate(pathname);
    const result = await evaluate(`(() => { const items=[...document.querySelectorAll('.faq-list details')]; if(items[0]) items[0].querySelector('summary').click(); return {count:items.length,opened:Boolean(items[0]?.open)} })()`);
    if (result.count < minimum || !result.opened) throw new Error(`FAQ check failed for ${pathname}: ${JSON.stringify(result)}`);
  }

  await command('Emulation.setDeviceMetricsOverride', { width: 390, height: 900, deviceScaleFactor: 1, mobile: true });
  await navigate('/blogs.html');
  const blogLinks = await evaluate(`[...document.querySelectorAll('.blog-card')].map(link => link.getAttribute('href'))`);
  if (blogLinks.length !== 3) throw new Error(`Expected 3 blog cards, found ${blogLinks.length}`);
  for (const link of blogLinks) {
    await navigate(link);
    const article = await evaluate(`({ content: document.querySelector('.article-content')?.innerText.length || 0, schema: document.querySelectorAll('script[type="application/ld+json"]').length })`);
    if (article.content < 300 || article.schema !== 2) throw new Error(`Static article check failed for ${link}`);
    await command('Page.reload', { ignoreCache: true });
    await delay(350);
    if ((await evaluate(`document.querySelector('.article-content')?.innerText.length || 0`)) < 300) throw new Error(`Direct refresh failed for ${link}`);
  }

  await navigate('/gallery.html');
  const galleryWorks = await evaluate(`(() => {
    const image = document.querySelector('.gallery-item img');
    image.click();
    const opened = getComputedStyle(document.getElementById('lightbox')).display === 'flex';
    document.querySelector('.close').click();
    return opened && getComputedStyle(document.getElementById('lightbox')).display === 'none';
  })()`);
  if (!galleryWorks) throw new Error('Gallery lightbox failed');

  await navigate('/service.html');
  const serviceLinks = await evaluate(`[...document.querySelectorAll('.premium-service-card .card-actions a:first-child')].map(link => link.getAttribute('href'))`);
  if (serviceLinks.length !== 10) throw new Error(`Expected 10 service cards, found ${serviceLinks.length}`);
  for (const link of serviceLinks) {
    await navigate(link);
    if (!(await evaluate(`Boolean(document.querySelector('h1') && document.querySelector('.service-breadcrumb'))`))) {
      throw new Error(`Service destination failed: ${link}`);
    }
  }

  await navigate('/index.html');
  const sliderChanged = await evaluate(`(() => {
    const slides = document.querySelector('.slides');
    document.querySelector('.slider-btn.next').click();
    return slides.style.transform.includes('-100%');
  })()`);
  if (!sliderChanged) throw new Error('Homepage slider next control failed');

  await navigate('/contact.html');
  const contact = await evaluate(`({
    labels: document.querySelectorAll('.contact-right label').length,
    whatsappFunction: typeof sendWhatsapp === 'function',
    phoneLinks: document.querySelectorAll('a[href^="tel:"]').length,
    whatsappLinks: document.querySelectorAll('a[href^="https://wa.me/"]').length
  })`);
  if (contact.labels < 4 || !contact.whatsappFunction || !contact.phoneLinks || !contact.whatsappLinks) {
    throw new Error(`Contact/CTA check failed: ${JSON.stringify(contact)}`);
  }
  const validationMessage = await evaluate(`(() => {
    document.querySelector('.contact-right button').click();
    return document.getElementById('formStatus').textContent;
  })()`);
  if (!validationMessage.includes('required field')) throw new Error('Contact required-field feedback failed');

  const performance = [];
  for (const pathname of ['/index.html', '/blogs.html', '/blogs/open-blog/sacred-bond-of-marriage/index.html']) {
    await command('Network.setCacheDisabled', { cacheDisabled: true });
    await navigate(pathname);
    performance.push(await evaluate(`(() => {
      const navigation = performance.getEntriesByType('navigation')[0];
      const resources = performance.getEntriesByType('resource');
      const fcp = performance.getEntriesByName('first-contentful-paint')[0]?.startTime || null;
      return {
        pathname: location.pathname,
        fcp: Math.round(fcp || 0),
        lcp: Math.round(window.__phase2Vitals?.lcp || 0),
        cls: Number((window.__phase2Vitals?.cls || 0).toFixed(4)),
        domContentLoaded: Math.round(navigation.domContentLoadedEventEnd),
        load: Math.round(navigation.loadEventEnd),
        resources: resources.length,
        transferredBytes: Math.round(resources.reduce((sum, entry) => sum + (entry.transferSize || 0), 0))
      };
    })()`));
  }

  if (consoleErrors.length || failedRequests.length) {
    throw new Error(`Browser errors: ${JSON.stringify({ consoleErrors, failedRequests })}`);
  }

  console.log(JSON.stringify({
    responsiveChecks: responsive.length,
    blogCards: blogLinks.length,
    serviceCards: serviceLinks.length,
    faqPages: Object.keys(faqMinimums).length,
    gallery: 'PASS',
    contact: 'PASS',
    consoleErrors: 0,
    failedRequests: 0,
    performance
  }, null, 2));
  socket.close();
}

run().catch(error => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
}).finally(() => {
  browser.kill();
  try { fs.rmSync(profile, { recursive: true, force: true }); } catch {}
});
