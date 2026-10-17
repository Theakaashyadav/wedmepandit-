const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'blog-details.html'), 'utf8');
const articlePattern = /"([^"]+)"\s*:\s*\{\s*title:\s*"([^"]+)",\s*image:\s*"([^"]+)",\s*content:\s*`([\s\S]*?)`\s*\}/g;
const articles = [];
let match;

while ((match = articlePattern.exec(source))) {
  articles.push({ slug: match[1], title: match[2], image: match[3], content: match[4] });
}

if (articles.length !== 3) {
  throw new Error(`Expected 3 existing articles, found ${articles.length}`);
}

const metadata = {
  'environmental-protection': {
    pageTitle: 'Yagya and Environmental Protection | WedMePandit',
    description: 'Read the existing WedMePandit article about Yagya, ancient Indian tradition and environmental protection.',
    imageAlt: 'Sacred Yagya ceremony representing environmental protection',
    serviceLink: '/Services/yagya.html',
    serviceLabel: 'Explore Vedic Yagya services'
  },
  'sacred-bond-of-marriage': {
    pageTitle: 'The Sacred Bond of Marriage | WedMePandit',
    description: 'A Pandit’s perspective on the sacred bond of Hindu marriage, Vedic wedding rituals, family values and lifelong companionship.',
    imageAlt: 'Bride and groom during a sacred Hindu wedding ceremony',
    optimizedImage: '/images/sacred-bond.webp',
    serviceLink: '/Services/vivah.html',
    serviceLabel: 'Explore Vivah ceremony services'
  },
  'vedic-hindu-wedding-guide': {
    pageTitle: 'Vedic Hindu Wedding Ceremony Guide | WedMePandit',
    description: 'Read the existing guide to a Vedic Hindu wedding ceremony, its important rituals and the role of an experienced wedding Pandit.',
    imageAlt: 'Traditional Vedic Hindu wedding ceremony at the mandap',
    optimizedImage: '/images/hindu-wedding.webp',
    serviceLink: '/Services/Vivah/shadi.html',
    serviceLabel: 'Explore Vedic wedding ceremony services'
  }
};

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function renderContent(content) {
  const secondLevelHeadings = new Set([
    'The Importance of Vedic Wedding Rituals',
    'Why Choosing the Right Pandit Matters',
    'Weddings Are About Emotions and Blessings',
    'Final Blessings',
    'Why Vedic Hindu Weddings Are Still Trending',
    'Meaning of Important Hindu Wedding Rituals',
    'Importance of Choosing an Experienced Wedding Pandit',
    'Modern Wedding Trends in India',
    'Final Blessings for the Bride and Groom'
  ]);
  const thirdLevelHeadings = new Set([
    'Ganesh Puja', 'Jaimala Ceremony', 'Kanyadaan Ritual',
    'Saat Phere and Vedic Mantras', 'Sindoor and Mangalsutra'
  ]);
  const blocks = content.trim().split(/\r?\n\s*\r?\n/);
  return blocks.map(block => {
    const trimmed = block.trim();
    const lines = trimmed.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
    if (secondLevelHeadings.has(trimmed)) return `<h2>${escapeHtml(trimmed)}</h2>`;
    if (thirdLevelHeadings.has(trimmed)) return `<h3>${escapeHtml(trimmed)}</h3>`;

    const listLines = lines.filter(line => line.startsWith('•'));
    if (listLines.length === lines.length) {
      return `<ul>${listLines.map(line => `<li>${escapeHtml(line.replace(/^•\s*/, ''))}</li>`).join('')}</ul>`;
    }

    return `<p>${lines.map(escapeHtml).join('<br>')}</p>`;
  }).join('\n');
}

for (const article of articles) {
  const meta = metadata[article.slug];
  const canonical = `https://www.wedmepandit.com/blogs/open-blog/${article.slug}`;
  const deliveryImage = meta.optimizedImage || article.image;
  const imageUrl = `https://www.wedmepandit.com${deliveryImage.replaceAll(' ', '%20')}`;
  const imagePath = deliveryImage.replace(/^\//, '');
  const articleDirectory = path.join(root, 'blogs', 'open-blog', article.slug);
  fs.mkdirSync(articleDirectory, { recursive: true });

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(meta.pageTitle)}</title>
  <meta name="description" content="${escapeHtml(meta.description)}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${escapeHtml(meta.pageTitle)}">
  <meta property="og:description" content="${escapeHtml(meta.description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${imageUrl}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="stylesheet" href="/style.css">
  <link rel="stylesheet" href="/blog-article.css">
  <script type="application/ld+json">
${JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: article.title,
  description: meta.description,
  image: imageUrl,
  mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
  publisher: { '@type': 'Organization', name: 'WedMePandit', url: 'https://www.wedmepandit.com/' }
}, null, 2)}
  </script>
  <script type="application/ld+json">
${JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.wedmepandit.com/' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://www.wedmepandit.com/blogs' },
    { '@type': 'ListItem', position: 3, name: article.title, item: canonical }
  ]
}, null, 2)}
  </script>
</head>
<body>
  <div id="header"></div>
  <main class="article-shell">
    <nav class="article-breadcrumb" aria-label="Breadcrumb">
      <a href="/index.html">Home</a><span aria-hidden="true">›</span>
      <a href="/blogs.html">Blogs</a><span aria-hidden="true">›</span>
      <span aria-current="page">${escapeHtml(article.title)}</span>
    </nav>
    <article>
      <img class="article-hero" src="/${imagePath}" width="1536" height="1024" alt="${escapeHtml(meta.imageAlt)}" loading="eager" fetchpriority="high" decoding="async">
      <h1>${escapeHtml(article.title)}</h1>
      <div class="article-content">
${renderContent(article.content)}
      </div>
      <p class="article-related"><a href="${meta.serviceLink}">${escapeHtml(meta.serviceLabel)}</a></p>
    </article>
    <a href="/blogs.html" class="back-btn">← Back to all blogs</a>
  </main>
  <div id="footer"></div>
  <script src="/site-shell.js" defer></script>
</body>
</html>
`;

  fs.writeFileSync(path.join(articleDirectory, 'index.html'), html);
}

console.log(`Generated ${articles.length} static blog articles from the existing approved content.`);
