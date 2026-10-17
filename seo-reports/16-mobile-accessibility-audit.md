# Mobile and Accessibility Audit

Date: 15 October 2026

## Automated responsive coverage

Eleven representative pages were tested at 360, 390, 768, 1024 and 1440 pixels: Home, About, Services, Gallery, Blogs, Contact, all three static articles, Vivah and Namkaran. Result: **55/55 PASS** for a document title, exactly one H1, no horizontal overflow and no broken loaded image.

The original header suite separately passed all six navigation destinations at all five viewports: **30/30 PASS**.

## Accessibility changes

- Converted the hamburger from a `div` to a named button with `aria-controls` and `aria-expanded`.
- Updated 31 existing menu handlers to keep `aria-expanded` synchronized.
- Added visible focus styling to navigation and article controls.
- Added accessible names to the previous/next slider buttons.
- Added keyboard activation, roles and labels to gallery thumbnails.
- Converted the gallery close control to a named button.
- Added explicit labels and names to Contact inputs/selects.
- Changed the mobile input to `type="tel"` with `inputmode` and autocomplete.
- Converted displayed phone numbers to working `tel:` links.
- Added `noopener noreferrer` to target-blank external links.
- Removed the duplicate `about` ID.

## Verified interactions

- Mobile hamburger: PASS in the navigation regression suite.
- Gallery open/close: PASS.
- Contact WhatsApp function present: PASS.
- Phone and WhatsApp links present: PASS.
- Keyboard markup/handlers: source verified; full screen-reader testing was not available.

## Remaining limitations

- Automated color-contrast calculation and assistive-technology testing were not available.
- Gallery images intentionally retain empty alt text until the owner supplies accurate identities/context.
- Shared header/footer remain injected by fetch on legacy pages; the static article content itself does not depend on JavaScript.

