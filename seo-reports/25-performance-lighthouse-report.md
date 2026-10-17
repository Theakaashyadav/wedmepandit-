# Performance and Lighthouse Report

## Tool availability

Lighthouse is not installed in this workspace, so no Lighthouse score, TBT or throttled Lighthouse result is claimed. Field INP/Core Web Vitals are unavailable. The existing CDP browser lab was rerun at 390×900 with cache disabled and without network/CPU throttling.

| Page | FCP | LCP | CLS | Load | Resources | Transfer |
|---|---:|---:|---:|---:|---:|---:|
| Home | 140 ms | 140 ms | 0 | 372 ms | 11 | 653,051 B |
| Blogs | 140 ms | 188 ms | 0 | 138 ms | 10 | 1,075,635 B |
| Sacred Bond article | 168 ms | 168 ms | 0 | 149 ms | 10 | 439,244 B |

These localhost figures demonstrate no Phase 3 regression but are not real-user mobile speed. Phase 2 image dimensions, WebP delivery, lazy loading and cache recommendations were preserved. `phase3.css` adds roughly one small cached stylesheet rather than a framework or runtime dependency.

Production throttled Lighthouse and field INP remain release verification items.

