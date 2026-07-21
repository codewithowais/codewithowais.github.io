# Content to finish

Everything on the site is **real** (pulled from your résumé) except the items below,
which are honestly marked on the page as "available on request" / placeholders.
Fill these in to take the site from great to complete.

## High impact
- [ ] **SimpliEd screenshots** — the two flagship case studies (`index.html`, the
      `.project__media--placeholder` blocks) currently show a branded "preview available
      on request" panel. Replace with real screenshots/mockups:
      1. Add images to `assets/img/projects/` (e.g. `simplied-web.jpg`, `simplied-mobile.jpg`).
      2. Swap each `<div class="project__media project__media--placeholder">…</div>` for
         `<div class="project__media"><img src="/assets/img/projects/simplied-web.jpg" alt="…" width="…" height="…" loading="lazy"></div>`.
- [ ] **Live demo / repo links** — ERMS and OLX cards say "Live demo available on request".
      If you have live URLs or public repos, replace the `<span class="pcard__soon">…</span>`
      with a real `<a class="link-arrow" href="…" target="_blank" rel="noopener noreferrer">Live demo ↗</a>`.
- [ ] **Contact form delivery** — right now "Send message" opens the visitor's email client
      (works everywhere, zero setup). To capture messages directly, create a free
      [Formspree](https://formspree.io) form and paste the endpoint into
      `FORMSPREE_ENDPOINT` in `assets/js/main.js`.

## Nice to have
- [ ] **Real project links for Expense Tracker** — currently links to your GitHub profile.
      Point it at the actual repo if public.
- [ ] **Testimonials** — none were available, so no testimonials section was added.
      If you collect 2–3 quotes (name, role, company), a testimonials section can be added.
- [ ] **Custom domain** (optional) — add a `CNAME` file if you move off `github.io`.

## Verify
- [ ] Résumé PDF at `assets/muhammad-owais-ahmed-resume.pdf` is the version you want public.
- [ ] Phone/WhatsApp `+92 316 9585886` and email `codewithowais@gmail.com` are correct.
