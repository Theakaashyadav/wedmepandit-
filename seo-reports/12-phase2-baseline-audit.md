# Phase 2 Baseline Audit

Audit date: 15 October 2026  
Source: local workspace before Phase 2 implementation

## Preserved state

All required Phase 1 reports and configuration files were present. The workspace contained 35 HTML files before the three static article documents were added. The existing 25 service pages retained their unique titles, descriptions, canonicals and H1 headings. The service listing retained `noindex, follow`. Homepage Organization/WebSite JSON-LD, phone/WhatsApp functionality, sliders, gallery, photographs, maroon branding and direct `.html` header destinations were treated as protected behavior.

The original navigation browser test ran before Phase 2 edits and passed all 30 checks at 360, 390, 768, 1024 and 1440 pixels.

## Confirmed baseline issues

| Area | Evidence | Planned safe change |
|---|---|---|
| Blog architecture | Three topics were stored in one JavaScript object in `blog-details.html`; essential text was absent from the initial article response | Generate three static article documents from the existing text |
| Article metadata | Shared template initially exposed one article title/canonical before JavaScript | Unique metadata and self-referencing canonical per static page |
| Blog payload | `Sacred Bond.png` was 2,799,286 bytes and `Hindu Wedding.png` was 3,026,763 bytes | Preserve originals; deliver WebP copies |
| Image stability | 80 image elements were found without intrinsic dimensions at the first count | Add verified width/height to local images |
| Loading strategy | Priority was inconsistent; most gallery images had no explicit loading behavior | Eager/high priority for LCP candidates, lazy for below-fold images |
| Accessibility | Hamburger was a non-semantic `div`; Contact inputs lacked labels; gallery thumbnails were pointer-only; slider buttons lacked accessible names | Use a button/ARIA state, labels, keyboard gallery actions and button names |
| Conversion | Displayed header/contact phone numbers were not clickable | Add `tel:` links without changing the number |
| Code quality | `about.html` contained duplicate `id="about"` | Remove the duplicate ID |
| Hosting consistency | Local navigation requires direct `.html` files, while production canonicals and rewrites use clean URLs | Preserve both and document the difference |

## Image baseline

- Image files: 70
- Total source image storage: 22,344,896 bytes
- Largest file: `images/Hindu Wedding.png`, 3,026,763 bytes, 1536×1024
- Second largest: `images/Sacred Bond.png`, 2,799,286 bytes, 1536×1024
- Gallery photographs: predominantly 800–1600 pixels wide
- WebP hero/service assets: generally 1280–6144 pixels wide

No originals were deleted or overwritten.

## Performance baseline limitations

Lighthouse was not installed and no Chrome UX Report, Search Console or RUM data was available. Therefore no baseline Lighthouse score, field LCP, field CLS or INP is claimed. File sizes, markup counts and the pre-change functional browser result were recorded. Timing instrumentation was added for the final local lab run.

## Rollback strategy

The workspace is not a Git working tree. Rollback must therefore use a file backup or deployment artifact. The original PNG images remain in place. Static blog pages are additive. To roll back blog routing, restore the prior `_redirects` wildcard and `dev-server.js` handler, restore the three prior card URLs in `blogs.html`, and remove `blogs/open-blog/*/index.html`. Image markup changes can be reverted independently without deleting source images.

