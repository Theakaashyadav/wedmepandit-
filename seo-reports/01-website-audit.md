# WedMePandit Website Audit

Audit date: 2026-10-15  
Source of truth: local workspace

## Scope and limitations

The workspace contains 33 indexable/candidate page documents plus two shared HTML fragments, one stylesheet, 64 images, `robots.txt`, `_redirects`, and `llms.txt`. The reference PDF, `WedMePandit_60-Day_SEO_Audit_and_Growth_Strategy.pdf`, dated 14 October 2026, was supplied and reviewed after the initial implementation. It is a planning document based on an older nine-page live-site snapshot; the current workspace remains the implementation source of truth. The folder is not a Git working tree. Live hosting, Google Search Console, GA4, current rankings, current server headers, and production redirects were not available.

## PDF reconciliation

| PDF recommendation or finding | Current workspace status | Classification |
|---|---|---|
| Eight service titles misspelled “Wedmipandit” and lacked search intent | Corrected across all current service pages | Already fixed |
| Eight descriptions and canonicals missing | Added across the expanded service inventory | Already fixed |
| No About, Contact, Blog, Havan, or Yagya page found | All exist in the current workspace | Outdated |
| No sitemap/schema available to the audit | Sitemap and basic Organization/WebSite JSON-LD now exist | Already fixed |
| “Schengen Visa” text on the Shanti card | Confirmed as image alt text and corrected | Fixed after PDF comparison |
| Shanti Pooja page is primarily funeral/Antyeshti content | Still present; dedicated child pages now also exist | Requires owner decision |
| Vivah copy promises mandap, travel, décor, and guest management | Still present in `Services/vivah.html` | Requires owner confirmation |
| Public-figure/family-priest claims require proof and permission | Claims remain on Home/About | Requires owner evidence |
| Generic testimonials need authenticity/source verification | Review cards remain on Home | Requires owner evidence |
| Static internal links should not rely only on injected navigation | Homepage service links are static; shared header/footer are still injected | Partially implemented |
| Images need intrinsic dimensions | All inspected content images still lack width/height attributes | Pending |
| Add service/location pages | Many service pages now exist; no city doorway pages were added | Partly implemented; location scope unconfirmed |

## Historical metrics from the PDF

The PDF reports Semrush data from 13 October 2026: Authority Score 2, 3 organic keywords, estimated organic traffic 0, 145 referring domains, 177 backlinks, and AI visibility 0. These are **tool-reported historical estimates**, not current measurements and not Google Search Console/GA4 data. They must not be represented as present-day verified performance.

## Baseline findings before edits

| File / URL group | Page type | Confirmed issue | Priority | Resolution |
|---|---|---|---|---|
| `index.html` | Home | Two titles and two descriptions; missing OG image | Critical | Fixed |
| 25 files under `Services/` | Service | No descriptions, canonicals, or social metadata | Critical | Fixed |
| `Services/havanpooja.html`, `Services/yagya.html` | Service | No H1; Havan title incorrectly said Janmdivas | High | Fixed |
| `about.html`, `contact.html` | Core | No H1 | High | Fixed |
| Site | Crawlability | No XML sitemap | Critical | Fixed |
| `header.html`, `footer.html` | Shared navigation | Service alias mismatch and fragile `../../` logo path | High | Fixed |
| `blog-details.html` | Blog | Three routes share client-rendered template and one fixed canonical/metadata set | Critical | Pending architecture change |
| `service.html` | Unverified service list | Contains services not confirmed by owner and is orphaned | High | Added noindex pending confirmation |
| Images | Accessibility/SEO | 58 image elements lacked alt attributes | High | Attributes added; decorative ones remain empty intentionally |
| `index.html` | Image relevance | Shanti Pooja image alt said “Schengen Visa” | High | Corrected |
| All image-bearing pages | Performance | Images lack intrinsic width and height | Medium | Pending dimension audit |
| Site | Structured data | No JSON-LD | Medium | Organization and WebSite added to home |
| Shared navigation | Crawlability | Header/footer injected with JavaScript | High | Pending static include/build solution |

## Functionality preserved

Branding, photographs, service cards, responsive CSS, header/footer fetch behavior, gallery, sliders, phone links, WhatsApp links, social links, and the WhatsApp enquiry flow were retained. No backend, CRM, analytics property, reviews, ratings, pricing, or unverified business facts were added.

## Owner decisions required

- Confirm whether Satyanarayan Katha, Rudrabhishek, Mundan, and every item in `service.html` are offered.
- Confirm whether Vivah services include mandap setup, destination travel, décor, coordination, and guest management.
- Decide whether Shanti Pooja and Antyeshti/funeral services should remain grouped or use separate parent positioning.
- Confirm actual service coverage beyond the currently stated Delhi NCR wording.
- Approve static blog article files so each article has server-rendered metadata and content.
- Review ritual wording and samagri guidance with a qualified subject-matter expert.
- Confirm the published office address and professional claims before LocalBusiness/Person schema is considered.
- Supply evidence and permission for public-figure associations and confirm the source/authenticity of homepage reviews.
