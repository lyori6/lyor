# CLAUDE.md

Instructions for coding agents working on lyori.com.

## What this is

Lyor Itzhaki's personal site: plain HTML and CSS, no framework, deployed on Vercel from `main`. `scripts/build.sh` only copies the public files into `_site`; there is no compile step.

- Home page: `index.html` with `home.css` and `home.js`.
- Case studies: one folder per study, `blog/<slug>/index.html`, served at `/blog/<slug>`. They load `home.css` (tokens, header, buttons, footer) and then `case-study.css`. The list lives in `blog/index.html`.
- `templates/case-study.html` is the starting point for a new case study; its header comment lists every step. `templates/og-card.html` plus `scripts/og.mjs` render the 1200x630 share images into `images/og/`.

## Commands

- Quick look: `python3 -m http.server` in the repo root, then open `/blog/<slug>/`
- Build: `sh scripts/build.sh` (Vercel runs the same; it must pass before asking for review)
- Share images: `node scripts/og.mjs` (needs Playwright)

## Meta tags

Every page carries its own title (under 60 characters), description (120 to 160), canonical URL without a trailing slash, Open Graph and Twitter tags with a 1200x630 image, and JSON-LD. When a page is added or its URL changes, update `sitemap.xml` too. Keep old URLs alive with `redirects` in `vercel.json`.

## How work gets approved

- One round per branch and PR. Never push to `main`, and never merge without Leo's approval.
- Every PR comes with the Vercel preview link and screenshots at 1440px and 390px.

## Design rules for the home page

- Light paper background, ink text, one accent color (green `--accent`). No gradients, no gradient text.
- Display type is Fraunces; body is Figtree. At most one accent word per page (the italic "trust" in the hero).
- Motion: the hero intro plays once on load (GSAP SplitText line reveal); sections reveal once on scroll with GSAP + ScrollTrigger, vendored in `assets/js/lib` (standard no-charge license). No infinite or auto-advancing animation. Respect `prefers-reduced-motion`; content must stay visible if GSAP fails to load.
- Keep copy specific and in Lyor's first-person voice. No invented metrics, quotes, or claims. Reviews are quoted exactly as written on LinkedIn; an ellipsis marks skipped text.
- No em dashes in copy.
