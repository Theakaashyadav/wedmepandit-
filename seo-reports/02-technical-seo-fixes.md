# Technical SEO Fixes

## Completed

- Removed the duplicate homepage title and meta description.
- Added unique descriptions, self-referencing absolute HTTPS canonicals, Open Graph fields, and Twitter card fields to 25 confirmed service pages.
- Corrected all affected title branding from “Wedmipandit” to “WedMePandit”.
- Corrected the Havan page title, which previously duplicated the Janmdivas title.
- Added meaningful H1 elements to About, Contact, Havan, and Yagya pages.
- Added `sitemap.xml` using current canonical URLs and no speculative `lastmod` dates.
- Preserved crawl access in `robots.txt`, which already names the sitemap.
- Added Organization and WebSite JSON-LD using only contact and social data visible in the source.
- Changed shared service links to the crawlable homepage service section.
- Changed shared logo paths to `/images/logo1.webp`.
- Added missing alt attributes. Empty values indicate decorative/context-insufficient images and should be reviewed manually.
- Replaced the unrelated “Schengen Visa” alt text on the Shanti Pooja card.
- Added `noindex, follow` to the unverified orphan `service.html`.

## Pending

- Static/prerendered blog detail pages with route-specific Article and BreadcrumbList schema.
- Static shared navigation or a build-time include so crawlers do not depend on `fetch()`.
- Meaningful manual alt text for the gallery after image-by-image owner review.
- Intrinsic width and height attributes for images; the PDF’s concern remains confirmed in the current source.
- Owner-approved resolution of the Vivah event-management claims and Shanti Pooja/Antyeshti content split.
- Hosting-level HTTP→HTTPS, non-www→www, trailing-slash, caching, compression, and security headers.
- GA4 events and GSC work require property access and identifiers.

No Lighthouse score or Core Web Vitals result is claimed because Lighthouse and field data were unavailable.
