# Blog SEO Implementation

Date: 15 October 2026

## Architecture change

The existing approved content was mechanically extracted from the JavaScript object in `blog-details.html`; it was not rewritten. Three independent HTML documents now exist:

- `blogs/open-blog/environmental-protection/index.html`
- `blogs/open-blog/sacred-bond-of-marriage/index.html`
- `blogs/open-blog/vedic-hindu-wedding-guide/index.html`

Each document includes visible initial-response article content, one H1, an existing-content-derived H2/H3 hierarchy, unique title/description, unique canonical and Open Graph fields, accurate image/alt text, Article JSON-LD, BreadcrumbList JSON-LD, visible breadcrumbs, a relevant service link, and a back link to `/blogs.html`.

No author or publication date was invented. JSON-LD uses the verified WedMePandit organization as publisher only.

## URL preservation

The three existing public clean URLs remain the canonicals and sitemap URLs. `_redirects` now maps each clean URL to its own static file rather than mapping every article to one shared template. `dev-server.js` performs the same per-slug mapping locally. Blog cards use explicit `index.html` destinations so they also work on basic static/VS Code Live Server setups.

The legacy `blog-details.html` template remains for rollback but now has `noindex, follow` to prevent duplicate template indexing.

## Blog listing

`blogs.html` now has:

- Three valid static destinations.
- Compressed WebP thumbnails for the two largest images.
- Accurate environmental image alt text.
- A concise existing-topic description on each card.
- Intrinsic dimensions, async decode and lazy loading.

## Verification

- Three blog cards detected and opened in the browser suite.
- All static articles passed direct refresh checks.
- Each initial HTML response contains more than 300 characters of article content.
- Two valid JSON-LD blocks were parsed per article.
- Three unique canonicals were confirmed.
- Zero article asset failures and zero browser console errors were recorded.

