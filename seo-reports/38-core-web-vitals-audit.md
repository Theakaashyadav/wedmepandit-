# Core Web Vitals audit

Lighthouse CLI was not installed, so no Lighthouse scores or fabricated before/after values are reported. Reproduce after deployment with: `npx lighthouse https://www.wedmepandit.com/ --preset=desktop --view` and mobile default for all seven requested URLs.

Local headless Edge, 390px, cache disabled (diagnostic only; not production field data): Home FCP/LCP 128/128 ms, CLS 0, 655349 bytes; Blogs 176/176 ms, CLS 0, 1077933 bytes; representative article 164/164 ms, CLS 0, 441542 bytes. INP requires field/interaction measurement and was not inferred from TBT. Image dimensions, lazy loading, eager hero handling and reduced motion remain implemented.
