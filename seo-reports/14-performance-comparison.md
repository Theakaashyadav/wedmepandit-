# Performance Comparison

Date: 15 October 2026

## Environment

- Server: local dependency-free Node server, `127.0.0.1:4173`
- Browser: installed Microsoft Edge, headless
- Viewport: 390×900, device scale factor 1, mobile emulation
- Cache: disabled for recorded pages
- Network/CPU throttling: none
- Measurement source: Navigation/Resource/Paint Timing APIs and buffered LCP/CLS observers in `tests/phase2.browser.js`

These are local lab observations, not Lighthouse scores or field Core Web Vitals.

## Final lab measurements

| Page | FCP | LCP | CLS | DOMContentLoaded | Load | Resources | Transferred bytes |
|---|---:|---:|---:|---:|---:|---:|---:|
| Home | 144 ms | 144 ms | 0 | 127 ms | 789 ms | 10 | 644,220 |
| Blog listing | 136 ms | 228 ms | 0 | 126 ms | 130 ms | 9 | 1,066,804 |
| Sacred Bond article | 124 ms | 124 ms | 0 | 104 ms | 116 ms | 9 | 430,413 |

## Before/after evidence

Comparable pre-change timing instrumentation was not completed before source edits, so no before/after timing delta is claimed. Deterministic payload evidence is available:

- Two blog images fell from 5,826,049 source bytes to 706,700 delivered bytes, an 87.9% reduction.
- Article essential content moved from JavaScript injection to the initial HTML response.
- 76 local image tags gained intrinsic dimensions, reducing layout-shift risk.
- Below-fold gallery and listing images now use lazy loading.
- Hosting cache/security recommendations were added in `_headers`.

## Targets and limitations

- Local measured LCP and CLS are within the stated targets, but production performance is **not verified**.
- Performance score: not available; Lighthouse is not installed.
- TBT: not available from the selected Performance APIs.
- INP: not verified; field interaction data is unavailable.
- Third-party Google Font and Font Awesome behavior depends on production network conditions.
- Production compression, CDN caching and `_headers` support require host verification.

