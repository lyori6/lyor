# lyori.com

Lyor Itzhaki's personal site and product case studies. Plain HTML and CSS, deployed on Vercel from `main`.

- `index.html`, `home.css`, `home.js`: the home page
- `blog/`: case studies, one folder per study, plus the list in `blog/index.html`
- `case-study.css`: styles for the case study pages (loaded after `home.css`)
- `templates/`: the case study template and the share image template
- `scripts/build.sh`: copies the public files into `_site` for Vercel
- `scripts/og.mjs`: renders share images into `images/og/`

Run locally with `python3 -m http.server` and open http://localhost:8000. See `CLAUDE.md` for the rules agents follow.
