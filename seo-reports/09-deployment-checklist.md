# Deployment Checklist

- Back up the current production bundle.
- Confirm hosting is case-sensitive and preserves the exact `Services/` and `Vivah/` URL casing.
- Validate `_redirects` syntax on the actual host.
- Test HTTP→HTTPS and non-www→www with single 301 hops.
- Confirm every sitemap URL returns 200 and the declared canonical.
- Confirm `robots.txt` and `sitemap.xml` are reachable at the domain root.
- Run an internal-link and missing-asset crawl.
- Test header, footer, slider, gallery, phone, social, and WhatsApp interactions.
- Test 360, 390, 768, 1024, and 1440 px layouts.
- Run Lighthouse and record real before/after results.
- Validate JSON-LD and inspect browser console errors.
- Submit sitemap in GSC and monitor indexing.
- Configure GA4 only with the owner’s measurement ID; exclude names and phone numbers from event parameters.
- Roll back if routing, enquiry, or canonical behavior differs from staging.
