# Changelog

Notable changes to lyori.com. Newest first.

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
