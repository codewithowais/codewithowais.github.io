# Portfolio "Wow" — Phase 1 Design Spec

**Date:** 2026-09-15
**Owner:** Muhammad Owais Ahmed (codewithowais)
**Status:** Approved direction — pending spec review, then implementation plan

---

## 1. Goal & scope

Make the existing portfolio (https://codewithowais.github.io) feel **genuinely premium
and memorable** — "expensive," not "flashy" — to impress technical recruiters and
clients (esp. Gulf / KSA / UAE) and win freelance work. Do it **without a framework
rewrite**, keeping the site fast, on free GitHub Pages, and with SEO/schema intact.

**In scope (Phase 1 — this spec):**
- A signature cinematic "title-sequence" hero moment.
- Page-wide load choreography.
- A refined scroll-reveal system.
- Tactile micro-interactions + physical depth (grain, layered shadow, light-sweep).
- A `▶ play intro` affordance so the signature is viewable even with Reduce Motion on.

**In scope (Phase 2 — follow-on, small):**
- Privacy-friendly analytics via **Cloudflare Web Analytics** (country/city/referrer/
  device/time), no backend, no cookie banner.

**Explicitly out of scope (Phase 3 — parked by decision):**
- Next.js/React migration.
- Custom per-IP visitor tracking + hand-built admin dashboard (legal/ROI reasons).

**Also pending (separate, already built, not part of this spec):**
- Contact form Web3Forms access key (user to provide; mailto fallback works meanwhile).

## 2. Hard constraints

- **Stack:** vanilla HTML/CSS/JS only. No frameworks, no runtime libraries, no CDN
  dependencies. Hand-rolled so it stays GitHub-Pages-friendly.
- **Performance:** no layout thrash, animate only GPU-friendly properties
  (`transform`, `opacity`, `clip-path`). No large image/JS payloads. No animated
  full-screen SVG turbulence (static grain texture only).
- **Zero CLS:** reveals must reserve their space; content must never shift on load.
- **SEO/schema:** JSON-LD @graph, meta, OG, canonical, robots, sitemap, llms.txt all
  preserved unchanged. All text content remains in the DOM (animations are visual only,
  never gate content from crawlers or screen readers).
- **Brand:** keep the warm cream/terracotta editorial identity. Enhance, don't replace.
- **Accessibility:** WCAG contrast retained; full keyboard/focus; no focus traps; the
  intro must not delay access to content; `prefers-reduced-motion` respected by default.

## 3. Design decisions

### 3.1 Signature moment — cinematic hero "title sequence"
On first load (motion allowed), the hero plays an authored ~2s sequence:
1. **Masked name reveal** — `MUHAMMAD` / `OWAIS AHMED` lines rise into view from behind
   a mask (per-line `overflow:hidden` wrapper + `transform: translateY(100%)→0`),
   staggered ~80–120ms.
2. **Self-drawing accent underline** — the terracotta rule under `AHMED`
   (`.hero__title .accent::after`) animates `transform: scaleX(0)→1`,
   `transform-origin:left`, after the name settles.
3. **Typing stamp** — the mono stamp types in character-by-character (reuse the existing
   role-typewriter pattern in main.js).
4. **Ambient depth** — behind the hero, a **slow-breathing warm gradient** (GPU
   `transform`/`opacity` keyframe, long duration) over a **static** paper-grain layer.
   Deliberately **not** cursor-reactive (avoids the previously rejected "spotlight").

Rationale: memorable through choreography, not gimmickry — the first two seconds feel
authored. Static end-state is the normal hero, so nothing depends on motion.

### 3.2 `▶ play intro` affordance
A small, tasteful control in the hero lets anyone **replay** the title sequence.
- Works **regardless** of `prefers-reduced-motion`: the replay path is user-initiated,
  so it force-runs even when the OS setting is on (user opted in by clicking).
- Auto-play on load is **gated** by `prefers-reduced-motion` (reduced → no auto-play,
  static rich hero shown immediately).
- Labeled for screen readers; keyboard-activatable; does not steal focus.

### 3.3 Page-wide load choreography
Sequenced entrance for the hero cluster (topbar → name → roles → lead → availability →
CTA), ~80ms apart with a shared easing curve. Uses existing `[data-enter]` +
`--enter-delay` mechanism; refine timings/easing and gate by reduced-motion.

### 3.4 Refined scroll-reveal system
Upgrade the current fade-in (`[data-reveal]→.is-in` via IntersectionObserver) to a
direction-aware rise + subtle clip with real easing; section headers draw their
number/hairline. Tune stat counters and the tech marquee to feel intentional.
Reserve space to avoid CLS. Reduced-motion → content simply appears (no transform).

### 3.5 Micro-interactions & depth
- Buttons/primary CTAs: refined magnetic pull (dial in existing JS) + press feedback.
- Project cards: soft lift + layered shadow + a quiet diagonal light-sweep on hover.
- Links: underline-grow on hover/focus.
- Surfaces: faint paper grain + layered shadows for physicality.
All hover/motion respects reduced-motion (falls back to instant color/elevation change).

### 3.6 Theme default — keep WARM CREAM
Cream stays the default first impression (it is the primary differentiator vs. the sea
of dark dev portfolios). The dark theme is polished to equal quality (glows/depth read
best there). Toggle remains in both directions; choice persisted as today.

### 3.7 Analytics (Phase 2)
Add the Cloudflare Web Analytics beacon (single script tag, no cookies, no PII beyond
coarse geo). No consent banner required. Reversible; no backend.

## 4. Component/unit breakdown (isolation)

Each unit is independent, testable, and communicates through classes/data-attributes:

- **`intro-sequence` (JS module in main.js)** — orchestrates the title sequence via a
  small state machine: `idle → playing → done`. Inputs: reduced-motion flag, replay
  event. Output: toggles classes on hero elements. Public surface: `playIntro(force)`.
- **`reveal-observer` (JS)** — existing IntersectionObserver, extended for
  direction-aware reveals. Input: `[data-reveal]` elements. Output: `.is-in`.
- **`magnetic` (JS)** — existing hover module, refined; fine-pointer only.
- **Hero CSS layer** — masks, accent draw, ambient grain/gradient, `.is-playing` /
  `.reduce-motion` states. Self-contained under `.hero`.
- **Depth/interaction CSS** — card lift, light-sweep, link underline, grain overlay.
- **`play-intro` control** — markup in hero + handler; the only new DOM affordance.

Reduced-motion is read **once** via `matchMedia('(prefers-reduced-motion: reduce)')`
and drives both auto-play gating and the reveal/motion fallbacks.

## 5. Data flow / state

- On `DOMContentLoaded`: read reduced-motion. If **not** reduced → `playIntro(false)`
  (auto). If reduced → skip auto, render static end-state, show `▶ play intro`.
- `▶ play intro` click → `playIntro(true)` (force, ignores reduced-motion), resets hero
  to start state, re-runs sequence.
- No persisted intro state (plays once per load; replay is manual). Theme choice
  persistence unchanged.

## 6. Implementation surface

- `index.html` — add masked-line wrappers in hero title, the `▶ play intro` control,
  the grain/gradient layer element; (Phase 2) Cloudflare beacon. Bump asset versions.
- `assets/css/style.css` — intro/mask/accent-draw/ambient keyframes + states, refined
  reveals, depth/micro-interaction styles, reduced-motion fallbacks, dark-theme polish.
- `assets/js/main.js` — `intro-sequence` module, extend reveal observer, wire play
  control, refine magnetic. Reuse typewriter pattern for the stamp.
- Cache-bust: `style.css?v=` and `main.js?v=` bumped; note `index.html` itself is not
  versioned (hard refresh needed to see changes — call this out to user each deploy).

## 7. Testing / verification plan

Verify locally (python http.server) with headless/Browser checks, before any deploy:
- **JS validity:** `node -c assets/js/main.js`.
- **Reduce-motion OFF:** intro auto-plays; name reveal, accent draw, stamp typing,
  ambient breathing all run; no console errors.
- **Reduce-motion ON:** no auto motion; static hero looks premium; `▶ play intro`
  forces the sequence on click.
- **Both themes** (cream default + dark) desktop and mobile (375px): no horizontal
  overflow (`document.body.scrollWidth <= innerWidth`), no CLS, readable contrast.
- **Keyboard/focus:** play control reachable + operable; focus never trapped; skip-link
  intact.
- **Performance sanity:** no long tasks from grain/gradient; animations on transform/
  opacity only; page interactive quickly.
- **SEO intact:** JSON-LD still valid; all hero/section text present in DOM/get_page_text.

## 8. Risks & mitigations

- **Gimmick/AI-generated feel (top risk).** Mitigation: motion is choreography over
  effects; durations/easing tuned; a single signature moment, not many; user reviews
  before deploy; every piece has a tasteful static state.
- **Reduce Motion hides the wow from the owner (repeat of prior confusion).**
  Mitigation: `▶ play intro` affordance + strong static baseline + explicit reviewer
  note.
- **Grain/gradient performance.** Mitigation: static grain texture; animate only a
  transformed gradient; pause when tab hidden / reduced-motion.
- **CLS from reveals.** Mitigation: reserve space; reveal via transform/opacity only.

## 9. Rollout

1. Implement on a working copy; verify per §7.
2. Bump cache-bust versions; user hard-refreshes to review (Reduce Motion off, or use
   play control).
3. On approval: commit + push to `gh-pages`.
4. Phase 2: add Cloudflare Web Analytics beacon (separate small change).
