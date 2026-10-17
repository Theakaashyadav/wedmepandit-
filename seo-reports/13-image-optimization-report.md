# Image Optimization Report

Date: 15 October 2026

## Implemented

- Added verified intrinsic `width` and `height` values to 76 local image elements across existing pages and the new article pages.
- Added `decoding="async"` to local content images.
- Marked the homepage first hero and static article heroes as eager/high priority.
- Marked below-fold homepage, blog-listing, gallery and footer imagery lazy.
- Kept service-page hero images eager because they are above the fold.
- Corrected the environmental article thumbnail alt text from unrelated “Healthy Food” text.
- Added meaningful article hero alt text.
- Preserved empty alt values on gallery photographs where the business owner has not supplied reliable image-specific descriptions.

## Compressed blog delivery assets

| Original retained | Original bytes | New delivery asset | New bytes | Reduction |
|---|---:|---|---:|---:|
| `images/Sacred Bond.png` | 2,799,286 | `images/sacred-bond.webp` | 316,396 | 88.7% |
| `images/Hindu Wedding.png` | 3,026,763 | `images/hindu-wedding.webp` | 390,304 | 87.1% |
| **Combined** | **5,826,049** | | **706,700** | **87.9%** |

The WebP files retain the original 1536×1024 pixel dimensions. The originals remain available as rollback copies. No crop, AI generation or religious-image substitution was performed.

## References changed

- `blogs.html` now uses the two WebP delivery assets.
- The Sacred Bond and Vedic Wedding static article pages use those WebP assets.
- The environmental article continues using the existing `images/blog1.webp` (1536×1024, 249,256 bytes).
- Image dimensions/loading attributes were applied throughout root pages and `Services/` pages by the reproducible scripts in `scripts/`.

## Verification

- Expanded browser QA reported zero failed requests and zero broken eager images.
- 55 page/viewport checks passed with no horizontal overflow.
- SEO regression found dimensions on every local image with a non-empty static `src`; the dynamic lightbox/template placeholders are intentionally populated by JavaScript.

## Limitations

- No smaller responsive variants were created for the gallery because that would create 34 additional derived photographs and requires a visual-quality review workflow.
- Image-specific gallery alt descriptions remain owner-review work; inventing ceremony identities or people was avoided.

