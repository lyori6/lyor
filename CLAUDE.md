# CLAUDE.md

Instructions for coding agents working on lyori.com.

## What this is

Lyor Itzhaki's personal site, built with Jekyll and deployed on Vercel from `main` (`build.sh`). The home page is plain HTML: `index.html` with `home.css` and `home.js`. Blog and case study pages use `_layouts/default.html` with the older `styles.css` and `script.js`; changes to the home page must not touch those.

## Commands

- Quick look: `python3 -m http.server` in the repo root (the home page needs no build)
- Full build: `bundle install && bundle exec jekyll build` (must pass before asking for review)

## How work gets approved

- One round per branch and PR. Never push to `main`, and never merge without Leo's approval.
- Every PR comes with the Vercel preview link and screenshots at 1440px and 390px.

## Design rules for the home page

- Light paper background, ink text, one accent color (green `--accent`). No gradients, no gradient text.
- Display type is Fraunces; body is Figtree. At most one accent word per page (the italic "trust" in the hero).
- Motion: the hero intro plays once on load (GSAP SplitText line reveal); sections reveal once on scroll with GSAP + ScrollTrigger, vendored in `assets/js/lib` (standard no-charge license). No infinite or auto-advancing animation. Respect `prefers-reduced-motion`; content must stay visible if GSAP fails to load.
- Keep copy specific and in Lyor's first-person voice. No invented metrics, quotes, or claims. Reviews are quoted exactly as written on LinkedIn; an ellipsis marks skipped text.
- No em dashes in copy.
