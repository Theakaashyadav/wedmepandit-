# Phase 2 Regression Testing

Date: 15 October 2026

## Executed tests

### Original navigation suite

Command: `node tests/header-navigation.browser.js`  
Result: **PASS, 30/30** destinations across 360, 390, 768, 1024 and 1440 pixels.

### Expanded browser suite

Command: `node tests/phase2.browser.js`  
Result: **PASS**

- Responsive page checks: 55
- Blog cards: 3/3
- Direct article refresh: 3/3
- Gallery lightbox: PASS
- Contact labels/function/phone/WhatsApp: PASS
- Console errors: 0
- Failed HTTP resources: 0
- Horizontal overflow failures: 0

### SEO/source regression

Command: `npm run test:seo`  
Result: **PASS**

- HTML documents inspected: 38
- Service pages: 25
- Static articles: 3
- Unique article canonicals: 3
- Duplicate-ID failures: 0
- JSON-LD parse failures: 0
- `sitemap.xml`: valid XML
- `service.html`: `noindex, follow` retained
- Direct `.html` header destinations retained

### Internal HTTP crawl

Command: `npm run test:crawl`  
Result: **PASS**

- HTML documents used as link sources: 38
- Unique local pages/assets/routes requested: 112
- HTTP failures: 0
- Direct `.html` navigation and all three clean article routes returned HTTP 200

### HTTP routing

The updated local server returns static article content for each clean article slug. `_redirects` contains one explicit production rewrite per article. Legacy `/Our-services` performs one 301 redirect to `/services`.

## Issues found and repaired during QA

1. A stale local server process initially served the old shared blog template. The server was restarted with the updated route table.
2. Contact CTA audit found no clickable phone link. Shared header and Contact page numbers were converted to `tel:` links.
3. Source audit found duplicate `id="about"`; the inner duplicate was removed.
4. The image assertion initially treated unrequested lazy images as broken; the test was corrected to assess images with a real `currentSrc`, while network failures remain independently monitored.

## Not executed

- Production hosting crawl, live redirects, CDN headers and compression
- WhatsApp message delivery beyond local function/link verification
- Lighthouse score/TBT
- Field INP/Core Web Vitals
- Screen-reader and manual color-contrast review

