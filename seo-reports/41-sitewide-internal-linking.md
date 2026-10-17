# Sitewide internal linking implementation

Date: 2026-10-15

## Scope and references

Audited all 38 HTML files, including six primary pages, Contact, 25 service pages, three static articles, the shared header/footer, the legacy noindex blog renderer and the verification file. The keyword-to-URL assignments in `seo-reports/03-keyword-url-mapping.csv` guided anchor selection. The named SEO strategy PDF was not present in the workspace, so no PDF claims or recommendations were inferred.

`blog-details.html` remains an intentionally non-discoverable, noindex legacy renderer whose canonical points to static article routes. Header/footer fragments and the Google verification file are not standalone content destinations.

## Implemented architecture

- Added topical Related Services and Guides modules to all 25 service pages.
- Used distinct clusters for Vivah, Sthapna, Festival Pooja, Shanti Pooja and general puja/sanskar pages.
- Added supporting service, article, Services-listing and Contact links to all three static articles.
- Added Home, About, Services, Wedding and Griha Pravesh discovery links to Contact.
- Added a contextual About link to Gallery while retaining its verified ceremony-service links.
- Home, About, Services and Blogs already contained appropriate service/article/contact paths, so no duplicate sections were introduced.
- Existing header, footer, breadcrumbs, metadata, canonicals, schema, routes and noindex directives were preserved.

New contextual link instances documented below: **143**. Content-page orphan candidates after implementation: **0**.

## URL-level internal linking matrix

| Source Page | Destination Page | Anchor Text | Context | Status |
| --- | --- | --- | --- | --- |
| /blogs/open-blog/environmental-protection/index.html | /Services/yagya.html | Vedic Yagya | Related services/articles module | 200 (local crawl) |
| /blogs/open-blog/environmental-protection/index.html | /Services/havanpooja.html | Havan and Pooja | Related services/articles module | 200 (local crawl) |
| /blogs/open-blog/environmental-protection/index.html | /blogs.html | Helpful Puja Guides | Related services/articles module | 200 (local crawl) |
| /blogs/open-blog/environmental-protection/index.html | /service.html | Explore All Puja Services | Related services/articles module | 200 (local crawl) |
| /blogs/open-blog/environmental-protection/index.html | /contact.html | Contact WedMePandit | Related services/articles module | 200 (local crawl) |
| /blogs/open-blog/sacred-bond-of-marriage/index.html | /Services/vivah.html | Wedding Pandit Ji | Related services/articles module | 200 (local crawl) |
| /blogs/open-blog/sacred-bond-of-marriage/index.html | /blogs/open-blog/vedic-hindu-wedding-guide/index.html | Hindu Wedding Rituals Guide | Related services/articles module | 200 (local crawl) |
| /blogs/open-blog/sacred-bond-of-marriage/index.html | /Services/Vivah/sagan.html | Sagan Ceremony | Related services/articles module | 200 (local crawl) |
| /blogs/open-blog/sacred-bond-of-marriage/index.html | /service.html | Explore All Puja Services | Related services/articles module | 200 (local crawl) |
| /blogs/open-blog/sacred-bond-of-marriage/index.html | /contact.html | Contact WedMePandit | Related services/articles module | 200 (local crawl) |
| /blogs/open-blog/vedic-hindu-wedding-guide/index.html | /Services/vivah.html | Wedding Pandit Ji | Related services/articles module | 200 (local crawl) |
| /blogs/open-blog/vedic-hindu-wedding-guide/index.html | /Services/Vivah/shadi.html | Vedic Wedding Ceremony | Related services/articles module | 200 (local crawl) |
| /blogs/open-blog/vedic-hindu-wedding-guide/index.html | /blogs/open-blog/sacred-bond-of-marriage/index.html | The Sacred Bond of Marriage | Related services/articles module | 200 (local crawl) |
| /blogs/open-blog/vedic-hindu-wedding-guide/index.html | /service.html | Explore All Puja Services | Related services/articles module | 200 (local crawl) |
| /blogs/open-blog/vedic-hindu-wedding-guide/index.html | /contact.html | Discuss Your Ceremony | Related services/articles module | 200 (local crawl) |
| /contact.html | /index.html | Return to Home | Related services/articles module | 200 (local crawl) |
| /contact.html | /about.html | About WedMePandit | Related services/articles module | 200 (local crawl) |
| /contact.html | /service.html | Explore Our Puja Services | Related services/articles module | 200 (local crawl) |
| /contact.html | /Services/vivah.html | Wedding Pandit Ji | Related services/articles module | 200 (local crawl) |
| /contact.html | /Services/sthapna/grihapravesh.html | Griha Pravesh Puja | Related services/articles module | 200 (local crawl) |
| /Services/16sanskar.html | /service.html | Explore All Puja Services | Related services/articles module | 200 (local crawl) |
| /Services/16sanskar.html | /Services/havanpooja.html | Havan and Yagya Services | Related services/articles module | 200 (local crawl) |
| /Services/16sanskar.html | /Services/namkaran.html | Namkaran Sanskar | Related services/articles module | 200 (local crawl) |
| /Services/16sanskar.html | /blogs.html | Helpful Puja Guides | Related services/articles module | 200 (local crawl) |
| /Services/16sanskar.html | /contact.html | Contact WedMePandit | Related services/articles module | 200 (local crawl) |
| /Services/festivalpooja/diwalipuja.html | /Services/festivalpooja.html | Festival Pooja Services | Related services/articles module | 200 (local crawl) |
| /Services/festivalpooja/diwalipuja.html | /Services/festivalpooja/holipuja.html | Holi Pooja | Related services/articles module | 200 (local crawl) |
| /Services/festivalpooja/diwalipuja.html | /Services/festivalpooja/janmastamipuja.html | Janmashtami Pooja | Related services/articles module | 200 (local crawl) |
| /Services/festivalpooja/diwalipuja.html | /Services/festivalpooja/navratra.html | Navratri Pooja | Related services/articles module | 200 (local crawl) |
| /Services/festivalpooja/holipuja.html | /Services/festivalpooja.html | Festival Pooja Services | Related services/articles module | 200 (local crawl) |
| /Services/festivalpooja/holipuja.html | /Services/festivalpooja/diwalipuja.html | Diwali Pooja | Related services/articles module | 200 (local crawl) |
| /Services/festivalpooja/holipuja.html | /Services/festivalpooja/janmastamipuja.html | Janmashtami Pooja | Related services/articles module | 200 (local crawl) |
| /Services/festivalpooja/holipuja.html | /Services/festivalpooja/navratra.html | Navratri Pooja | Related services/articles module | 200 (local crawl) |
| /Services/festivalpooja/janmastamipuja.html | /Services/festivalpooja.html | Festival Pooja Services | Related services/articles module | 200 (local crawl) |
| /Services/festivalpooja/janmastamipuja.html | /Services/festivalpooja/diwalipuja.html | Diwali Pooja | Related services/articles module | 200 (local crawl) |
| /Services/festivalpooja/janmastamipuja.html | /Services/festivalpooja/holipuja.html | Holi Pooja | Related services/articles module | 200 (local crawl) |
| /Services/festivalpooja/janmastamipuja.html | /Services/festivalpooja/navratra.html | Navratri Pooja | Related services/articles module | 200 (local crawl) |
| /Services/festivalpooja/navratra.html | /Services/festivalpooja.html | Festival Pooja Services | Related services/articles module | 200 (local crawl) |
| /Services/festivalpooja/navratra.html | /Services/festivalpooja/diwalipuja.html | Diwali Pooja | Related services/articles module | 200 (local crawl) |
| /Services/festivalpooja/navratra.html | /Services/festivalpooja/holipuja.html | Holi Pooja | Related services/articles module | 200 (local crawl) |
| /Services/festivalpooja/navratra.html | /Services/festivalpooja/janmastamipuja.html | Janmashtami Pooja | Related services/articles module | 200 (local crawl) |
| /Services/festivalpooja.html | /Services/festivalpooja/diwalipuja.html | Diwali Pooja | Related services/articles module | 200 (local crawl) |
| /Services/festivalpooja.html | /Services/festivalpooja/holipuja.html | Holi Pooja | Related services/articles module | 200 (local crawl) |
| /Services/festivalpooja.html | /Services/festivalpooja/janmastamipuja.html | Janmashtami Pooja | Related services/articles module | 200 (local crawl) |
| /Services/festivalpooja.html | /Services/festivalpooja/navratra.html | Navratri Pooja | Related services/articles module | 200 (local crawl) |
| /Services/havanpooja.html | /service.html | Explore All Puja Services | Related services/articles module | 200 (local crawl) |
| /Services/havanpooja.html | /Services/namkaran.html | Namkaran Sanskar | Related services/articles module | 200 (local crawl) |
| /Services/havanpooja.html | /blogs.html | Helpful Puja Guides | Related services/articles module | 200 (local crawl) |
| /Services/havanpooja.html | /contact.html | Contact WedMePandit | Related services/articles module | 200 (local crawl) |
| /Services/janmdivas.html | /service.html | Explore All Puja Services | Related services/articles module | 200 (local crawl) |
| /Services/janmdivas.html | /Services/havanpooja.html | Havan and Yagya Services | Related services/articles module | 200 (local crawl) |
| /Services/janmdivas.html | /Services/namkaran.html | Namkaran Sanskar | Related services/articles module | 200 (local crawl) |
| /Services/janmdivas.html | /blogs.html | Helpful Puja Guides | Related services/articles module | 200 (local crawl) |
| /Services/janmdivas.html | /contact.html | Contact WedMePandit | Related services/articles module | 200 (local crawl) |
| /Services/namkaran.html | /service.html | Explore All Puja Services | Related services/articles module | 200 (local crawl) |
| /Services/namkaran.html | /Services/havanpooja.html | Havan and Yagya Services | Related services/articles module | 200 (local crawl) |
| /Services/namkaran.html | /blogs.html | Helpful Puja Guides | Related services/articles module | 200 (local crawl) |
| /Services/namkaran.html | /contact.html | Contact WedMePandit | Related services/articles module | 200 (local crawl) |
| /Services/pravachan.html | /service.html | Explore All Puja Services | Related services/articles module | 200 (local crawl) |
| /Services/pravachan.html | /Services/havanpooja.html | Havan and Yagya Services | Related services/articles module | 200 (local crawl) |
| /Services/pravachan.html | /Services/namkaran.html | Namkaran Sanskar | Related services/articles module | 200 (local crawl) |
| /Services/pravachan.html | /blogs.html | Helpful Puja Guides | Related services/articles module | 200 (local crawl) |
| /Services/pravachan.html | /contact.html | Contact WedMePandit | Related services/articles module | 200 (local crawl) |
| /Services/shantipooja/asthi.html | /Services/shantipooja.html | Shanti Pooja Services | Related services/articles module | 200 (local crawl) |
| /Services/shantipooja/asthi.html | /Services/shantipooja/postritual.html | Post-Funeral Rituals | Related services/articles module | 200 (local crawl) |
| /Services/shantipooja/asthi.html | /Services/shantipooja/prayermeeting.html | Prayer Meeting | Related services/articles module | 200 (local crawl) |
| /Services/shantipooja/asthi.html | /contact.html | Contact WedMePandit | Related services/articles module | 200 (local crawl) |
| /Services/shantipooja/cremation.html | /Services/shantipooja.html | Shanti Pooja Services | Related services/articles module | 200 (local crawl) |
| /Services/shantipooja/cremation.html | /Services/shantipooja/asthi.html | Asthi Ritual Guidance | Related services/articles module | 200 (local crawl) |
| /Services/shantipooja/cremation.html | /Services/shantipooja/postritual.html | Post-Funeral Rituals | Related services/articles module | 200 (local crawl) |
| /Services/shantipooja/cremation.html | /Services/shantipooja/prayermeeting.html | Prayer Meeting | Related services/articles module | 200 (local crawl) |
| /Services/shantipooja/cremation.html | /contact.html | Contact WedMePandit | Related services/articles module | 200 (local crawl) |
| /Services/shantipooja/funeral.html | /Services/shantipooja.html | Shanti Pooja Services | Related services/articles module | 200 (local crawl) |
| /Services/shantipooja/funeral.html | /Services/shantipooja/asthi.html | Asthi Ritual Guidance | Related services/articles module | 200 (local crawl) |
| /Services/shantipooja/funeral.html | /Services/shantipooja/postritual.html | Post-Funeral Rituals | Related services/articles module | 200 (local crawl) |
| /Services/shantipooja/funeral.html | /Services/shantipooja/prayermeeting.html | Prayer Meeting | Related services/articles module | 200 (local crawl) |
| /Services/shantipooja/funeral.html | /contact.html | Contact WedMePandit | Related services/articles module | 200 (local crawl) |
| /Services/shantipooja/postritual.html | /Services/shantipooja.html | Shanti Pooja Services | Related services/articles module | 200 (local crawl) |
| /Services/shantipooja/postritual.html | /Services/shantipooja/asthi.html | Asthi Ritual Guidance | Related services/articles module | 200 (local crawl) |
| /Services/shantipooja/postritual.html | /Services/shantipooja/prayermeeting.html | Prayer Meeting | Related services/articles module | 200 (local crawl) |
| /Services/shantipooja/postritual.html | /contact.html | Contact WedMePandit | Related services/articles module | 200 (local crawl) |
| /Services/shantipooja/prayermeeting.html | /Services/shantipooja.html | Shanti Pooja Services | Related services/articles module | 200 (local crawl) |
| /Services/shantipooja/prayermeeting.html | /Services/shantipooja/asthi.html | Asthi Ritual Guidance | Related services/articles module | 200 (local crawl) |
| /Services/shantipooja/prayermeeting.html | /Services/shantipooja/postritual.html | Post-Funeral Rituals | Related services/articles module | 200 (local crawl) |
| /Services/shantipooja/prayermeeting.html | /contact.html | Contact WedMePandit | Related services/articles module | 200 (local crawl) |
| /Services/shantipooja/tehravi.html | /Services/shantipooja.html | Shanti Pooja Services | Related services/articles module | 200 (local crawl) |
| /Services/shantipooja/tehravi.html | /Services/shantipooja/asthi.html | Asthi Ritual Guidance | Related services/articles module | 200 (local crawl) |
| /Services/shantipooja/tehravi.html | /Services/shantipooja/postritual.html | Post-Funeral Rituals | Related services/articles module | 200 (local crawl) |
| /Services/shantipooja/tehravi.html | /Services/shantipooja/prayermeeting.html | Prayer Meeting | Related services/articles module | 200 (local crawl) |
| /Services/shantipooja/tehravi.html | /contact.html | Contact WedMePandit | Related services/articles module | 200 (local crawl) |
| /Services/shantipooja.html | /Services/shantipooja/asthi.html | Asthi Ritual Guidance | Related services/articles module | 200 (local crawl) |
| /Services/shantipooja.html | /Services/shantipooja/postritual.html | Post-Funeral Rituals | Related services/articles module | 200 (local crawl) |
| /Services/shantipooja.html | /Services/shantipooja/prayermeeting.html | Prayer Meeting | Related services/articles module | 200 (local crawl) |
| /Services/shantipooja.html | /Services/shantipooja/cremation.html | Cremation Ritual Guidance | Related services/articles module | 200 (local crawl) |
| /Services/shantipooja.html | /Services/shantipooja/funeral.html | Funeral Ritual Guidance | Related services/articles module | 200 (local crawl) |
| /Services/shantipooja.html | /Services/shantipooja/tehravi.html | Tehravi Ceremony | Related services/articles module | 200 (local crawl) |
| /Services/shantipooja.html | /contact.html | Contact WedMePandit | Related services/articles module | 200 (local crawl) |
| /Services/sthapna/grihapravesh.html | /Services/sthapna.html | Sthapna Pooja | Related services/articles module | 200 (local crawl) |
| /Services/sthapna/grihapravesh.html | /Services/sthapna/officeinaug.html | Office Inauguration Pooja | Related services/articles module | 200 (local crawl) |
| /Services/sthapna/grihapravesh.html | /Services/havanpooja.html | Havan and Pooja | Related services/articles module | 200 (local crawl) |
| /Services/sthapna/grihapravesh.html | /contact.html | Contact WedMePandit | Related services/articles module | 200 (local crawl) |
| /Services/sthapna/officeinaug.html | /Services/sthapna.html | Sthapna Pooja | Related services/articles module | 200 (local crawl) |
| /Services/sthapna/officeinaug.html | /Services/sthapna/grihapravesh.html | Griha Pravesh Puja | Related services/articles module | 200 (local crawl) |
| /Services/sthapna/officeinaug.html | /Services/havanpooja.html | Havan and Pooja | Related services/articles module | 200 (local crawl) |
| /Services/sthapna/officeinaug.html | /contact.html | Contact WedMePandit | Related services/articles module | 200 (local crawl) |
| /Services/sthapna.html | /Services/sthapna/grihapravesh.html | Griha Pravesh Puja | Related services/articles module | 200 (local crawl) |
| /Services/sthapna.html | /Services/sthapna/officeinaug.html | Office Inauguration Pooja | Related services/articles module | 200 (local crawl) |
| /Services/sthapna.html | /Services/havanpooja.html | Havan and Pooja | Related services/articles module | 200 (local crawl) |
| /Services/sthapna.html | /contact.html | Contact WedMePandit | Related services/articles module | 200 (local crawl) |
| /Services/Vivah/destwed.html | /Services/vivah.html | Wedding Pandit Ji | Related services/articles module | 200 (local crawl) |
| /Services/Vivah/destwed.html | /Services/Vivah/shadi.html | Vedic Wedding Ceremony | Related services/articles module | 200 (local crawl) |
| /Services/Vivah/destwed.html | /Services/Vivah/sagan.html | Sagan Ceremony | Related services/articles module | 200 (local crawl) |
| /Services/Vivah/destwed.html | /blogs/open-blog/vedic-hindu-wedding-guide/index.html | Hindu Wedding Rituals Guide | Related services/articles module | 200 (local crawl) |
| /Services/Vivah/destwed.html | /contact.html | Discuss Your Ceremony | Related services/articles module | 200 (local crawl) |
| /Services/Vivah/sagan.html | /Services/vivah.html | Wedding Pandit Ji | Related services/articles module | 200 (local crawl) |
| /Services/Vivah/sagan.html | /Services/Vivah/shadi.html | Vedic Wedding Ceremony | Related services/articles module | 200 (local crawl) |
| /Services/Vivah/sagan.html | /blogs/open-blog/vedic-hindu-wedding-guide/index.html | Hindu Wedding Rituals Guide | Related services/articles module | 200 (local crawl) |
| /Services/Vivah/sagan.html | /contact.html | Discuss Your Ceremony | Related services/articles module | 200 (local crawl) |
| /Services/Vivah/shadi.html | /Services/vivah.html | Wedding Pandit Ji | Related services/articles module | 200 (local crawl) |
| /Services/Vivah/shadi.html | /Services/Vivah/sagan.html | Sagan Ceremony | Related services/articles module | 200 (local crawl) |
| /Services/Vivah/shadi.html | /blogs/open-blog/vedic-hindu-wedding-guide/index.html | Hindu Wedding Rituals Guide | Related services/articles module | 200 (local crawl) |
| /Services/Vivah/shadi.html | /contact.html | Discuss Your Ceremony | Related services/articles module | 200 (local crawl) |
| /Services/vivah.html | /Services/Vivah/shadi.html | Vedic Wedding Ceremony | Related services/articles module | 200 (local crawl) |
| /Services/vivah.html | /Services/Vivah/sagan.html | Sagan Ceremony | Related services/articles module | 200 (local crawl) |
| /Services/vivah.html | /Services/Vivah/destwed.html | Destination Wedding Pandit | Related services/articles module | 200 (local crawl) |
| /Services/vivah.html | /blogs/open-blog/vedic-hindu-wedding-guide/index.html | Hindu Wedding Rituals Guide | Related services/articles module | 200 (local crawl) |
| /Services/vivah.html | /contact.html | Discuss Your Ceremony | Related services/articles module | 200 (local crawl) |
| /Services/yagya.html | /service.html | Explore All Puja Services | Related services/articles module | 200 (local crawl) |
| /Services/yagya.html | /Services/havanpooja.html | Havan and Yagya Services | Related services/articles module | 200 (local crawl) |
| /Services/yagya.html | /Services/namkaran.html | Namkaran Sanskar | Related services/articles module | 200 (local crawl) |
| /Services/yagya.html | /blogs.html | Helpful Puja Guides | Related services/articles module | 200 (local crawl) |
| /Services/yagya.html | /contact.html | Contact WedMePandit | Related services/articles module | 200 (local crawl) |
| /contact.html | /index.html | Return to Home | Contact exploration module | 200 (local crawl) |
| /contact.html | /about.html | About WedMePandit | Contact exploration module | 200 (local crawl) |
| /contact.html | /service.html | Explore Our Puja Services | Contact exploration module | 200 (local crawl) |
| /contact.html | /Services/vivah.html | Wedding Pandit Ji | Contact exploration module | 200 (local crawl) |
| /contact.html | /Services/sthapna/grihapravesh.html | Griha Pravesh Puja | Contact exploration module | 200 (local crawl) |
| /gallery.html | /about.html | About WedMePandit | Gallery contextual services | 200 (local crawl) |
| /gallery.html | /Services/vivah.html | Vivah Sanskar | Gallery contextual services | 200 (local crawl) |
| /gallery.html | /Services/sthapna/grihapravesh.html | Griha Pravesh | Gallery contextual services | 200 (local crawl) |
| /gallery.html | /Services/havanpooja.html | Havan &amp; Pooja | Gallery contextual services | 200 (local crawl) |
| /gallery.html | /Services/yagya.html | Vedic Yagya | Gallery contextual services | 200 (local crawl) |
| /gallery.html | /blogs.html | Ritual Guides | Gallery contextual services | 200 (local crawl) |

## Validation evidence

- `npm run test:crawl`: 38 documents, 0 failed internal destinations.
- `npm run test:seo`: 38 documents, 25 service pages, 3 static articles, 0 duplicate-ID failures, 0 schema failures.
- Headless Edge responsive suite: 170 viewport/page checks across 360, 390, 768, 1024 and 1440 px; 0 console errors; 0 failed requests.
- Navigation suite verifies shared header routes separately.
- Ordinary editorial links are crawlable `<a href>` elements and do not use `nofollow`.

## Modified implementation files

25 service HTML pages; 3 static article HTML pages; `contact.html`; `gallery.html`; and the scoped related-link styles in `phase3.css`. No deployment was performed.

## Remaining limitations

The local HTTP crawl confirms application-server behavior, not production CDN/host redirects. Re-run the crawl and a production crawler after deployment. Business approval remains necessary for existing service availability and legacy profile claims; internal links do not constitute approval of those claims.
