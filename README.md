# codewithowais.github.io

Personal portfolio for **Muhammad Owais Ahmed** — Senior Software Engineer.
Hand-built, dependency-free static site (semantic HTML + modern CSS + vanilla JS),
deployed via GitHub Pages from the repository root.

## Structure

```
index.html                 # single-page site (all sections)
favicon.svg / favicon.ico  # icons
site.webmanifest           # PWA manifest
robots.txt / sitemap.xml   # SEO
assets/
  css/style.css            # design system + all styles (dark & light themes)
  js/main.js               # theme toggle, nav, reveal, counters, form, typewriter
  img/                     # profilepic.jpg, og-image.png, projects/*.jpg
  muhammad-owais-ahmed-resume.pdf
```

## Run locally

No build step. Serve the folder with any static server:

```bash
python3 -m http.server 8123
# then open http://localhost:8123
```

## Deploy (GitHub Pages)

This repo is a **user page** (`codewithowais.github.io`) served from the root of the
default branch. Deploying is just pushing to that branch:

```bash
git add -A
git commit -m "Rebuild portfolio: modern responsive redesign"
git push origin gh-pages   # this repo serves from the gh-pages branch
```

GitHub Pages publishes automatically within ~1 minute. Confirm Settings → Pages is set
to "Deploy from branch" → root.

## Customising

- **Colors / type:** CSS custom properties at the top of `assets/css/style.css`.
- **Theme:** dark-first with a light toggle; initial theme is set before paint by an
  inline script in `<head>` (no flash) and persisted to `localStorage`.
- **Contact form:** works out-of-the-box via a `mailto:` compose. To collect messages
  without opening an email client, set `FORMSPREE_ENDPOINT` in `assets/js/main.js`.
- **Content to finish:** see `CONTENT-TODO.md`.
