# Changelog

Notable changes to lyori.com. Newest first.

## 2026-11-08: Security headers

- `vercel.json` sends `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: SAMEORIGIN` and `Content-Security-Policy: frame-ancestors 'self'` on every response. Other sites can no longer show lyori.com inside a frame. Nothing visible changes. Vercel already adds HSTS.

## 2026-11-08: Privacy wording narrowed

- `/privacy` no longer promises that Clarity masks form input, a fixed deletion step for messages, or specific analytics retention periods, since none of those were confirmed in the tool settings. It now says only what is known.

## 2026-11-08: Privacy policy

- New `/privacy` page: what the contact form and analytics (Google Analytics, Microsoft Clarity) collect, who helps run the site (Vercel, Cloudflare, Google Fonts), retention, and how to ask for access or deletion. Clarity's terms require this disclosure.
- "Privacy" link added next to "Accessibility" in every footer, including the case study template.
- Added to `sitemap.xml` and `scripts/build.sh`.

## Security

- The site has no logins, cookies of its own, or stored user data. The contact form posts to a Cloudflare Worker (`lyori-contact`) whose code is not in this repo.
- When adding a tracker or a new form field, update `/privacy` in the same PR.
- Security headers live in `vercel.json` (`headers`). There is no script CSP; adding one means listing GA, Clarity, Google Fonts and the contact Worker first, in report-only mode.

## 2026-11-06: Accessibility, round 2 (PR #6)

- Contact form fields get a visible edge: new `--field-border` token (`#85888d`), up from `--line` at 1.2:1. Meets WCAG 1.4.11.
- Send button stays focusable while a message is sending (`aria-disabled` instead of `disabled`), and focus returns to it after a failed send so retrying is one key away.
- Accessibility statement rewritten to claim only what was tested: tools, browsers, widths, and date, plus known limits (no screen reader pass yet, Chromium only).

## 2026-11-05: Accessibility, round 1 (PR #6)

- Audit against WCAG 2.2 AA on every page.
- Focus ring switches to light ink on the dark reviews band.
- Job detail headings changed from h4 to h3.
- Links that open a new tab say so to screen readers (`.sr-only` text).
- Case study card thumbnails are decorative inside their links, and each card is labelled by its title.
- Contact form marks empty fields invalid, links them to the message, and moves focus to the first one.
- New `/accessibility` statement page, linked from every footer.
- Accessibility rules added to `CLAUDE.md`.
