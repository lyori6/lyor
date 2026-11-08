# CLAUDE.md

Instructions for coding agents working on lyori.com.

## What this is

Lyor Itzhaki's personal site: plain HTML and CSS, no framework, deployed on Vercel from `main`. `scripts/build.sh` only copies the public files into `_site`; there is no compile step.

- Home page: `index.html` with `home.css` and `home.js`.
- Case studies: one folder per study, `blog/<slug>/index.html`, served at `/blog/<slug>`. They load `home.css` (tokens, header, buttons, footer) and then `case-study.css`. The list lives in `blog/index.html`.
- `templates/case-study.html` is the starting point for a new case study, and `docs/case-study-guide.md` says how to write one; its header comment lists every step. `templates/og-card.html` plus `scripts/og.mjs` render the 1200x630 share images into `images/og/`.

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
- Motion: the hero intro plays once on load (the headline comes into focus with a soft blur and small rise); sections reveal once on scroll with GSAP + ScrollTrigger, vendored in `assets/js/lib` (standard no-charge license). Keep it quiet: the hero has no line-by-line or masked reveals; everything else fades up 8 to 16px in about 0.6s with `power3.out`. No parallax, zoom, rotate, or scale on scroll; the word band is the only scroll-linked motion. No infinite or auto-advancing animation. Respect `prefers-reduced-motion`; content must stay visible if GSAP fails to load.
- Keep copy specific and in Lyor's first-person voice. No invented metrics, quotes, or claims. Reviews are quoted exactly as written on LinkedIn; an ellipsis marks skipped text.
- No em dashes in copy.

## Accessibility rules (WCAG 2.2 AA)

The site targets WCAG 2.2 AA, the standard used for the ADA. The public statement is `accessibility/index.html` (`/accessibility`, linked in every footer); update its "Last reviewed" date, tested browsers, and known limits after each audit, and only claim what was tested. Log every accessibility change in `CHANGELOG.md`. Every change keeps these rules:

- Contrast: body text at least 4.5:1, large text and UI parts (borders that mark a control, icons, focus rings) at least 3:1. Checked pairs: `--ink-3` on `--paper` is 5.05:1, the lowest text color in use; `--accent` on `--paper` 6.84:1; `--on-deep-2` on `--deep` 8.36:1. `--line` (1.2:1) is for decoration only, never for the only edge of a control. Form fields use `--field-border` (`#85888d`, 3.26:1 on `--paper`, 3.53:1 on `--surface`).
- Focus: every interactive element shows `:focus-visible` (2px `--accent` outline, 3px offset). On the dark reviews band (`.section-dark`) the ring switches to `--on-deep`, because green on `--deep` is 1.7:1; inside the light review cards it goes back to `--accent`. Never remove an outline without an equally visible replacement.
- Headings: one `h1` per page, no skipped levels. Job details on the home page are `h3` under the Experience `h2`.
- Links: a link with `target="_blank"` ends with `<span class="sr-only"> (opens in a new tab)</span>`. The visible arrow stays `aria-hidden`.
- Images: real `alt` text when the image carries meaning; `alt=""` when it is decorative or sits inside a link whose text already names it (case study card thumbnails, logos next to a name, avatars next to a name).
- Forms: every field has a `<label>`. On an error, set `aria-invalid="true"`, point `aria-describedby` at the message, show it in text, and move focus to the first bad field. While sending, mark the button `aria-disabled="true"` instead of `disabled` (a disabled button drops focus to the page); after a failure keep the message filled in and put focus back on the button. No CAPTCHA.
- Motion: respect `prefers-reduced-motion` (GSAP runs only under `no-preference`); nothing auto-plays or loops.
- Layout: no horizontal scroll at 320px, and nothing clips with WCAG text-spacing overrides. Targets are at least 24x24px or spaced so a 24px circle around them touches nothing else.
- Privacy: `/privacy` lists every tracker and what the contact form collects. Adding or removing an analytics tool, embed, or form field means updating that page and its date in the same PR.
- Use `.sr-only` from `home.css` for text meant only for screen readers.
- Before review: run axe-core (WCAG 2.0, 2.1, 2.2 A and AA tags) on every page at 1440px and 390px, with reduced motion on and off, and tab through each page with the keyboard.
