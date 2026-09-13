/* =============================================================
   Muhammad Owais Ahmed — Portfolio interactions
   Vanilla JS, no dependencies. Progressive enhancement:
   everything degrades gracefully without JS.
   ============================================================= */
(function () {
  "use strict";

  var root = document.documentElement;
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var mobileMq = window.matchMedia("(max-width: 860px)");

  /* ---------- Theme toggle (persist + system preference) ----------
     The initial theme is set by a blocking script in <head> to avoid FOUC.
     Here we only sync the toggle's state and handle clicks. */
  var THEME_KEY = "owais-theme";
  var toggle = document.getElementById("themeToggle");

  function syncToggle() {
    if (toggle) toggle.setAttribute("aria-pressed", root.getAttribute("data-theme") === "light" ? "true" : "false");
  }
  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "light" ? "#f4f1ea" : "#0b0b0d");
    syncToggle();
  }
  syncToggle();

  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      applyTheme(next);
      try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
    });
  }

  /* ---------- Mobile navigation (with focus management) ---------- */
  var burger = document.getElementById("navBurger");
  var links = document.getElementById("navLinks");
  var scrim = document.getElementById("navScrim");
  var lastFocused = null;

  function menuIsMobile() { return mobileMq.matches; }

  function setLinksInert(inert) {
    if (!links) return;
    if (inert) {
      links.setAttribute("inert", "");
      links.setAttribute("aria-hidden", "true");
    } else {
      links.removeAttribute("inert");
      links.removeAttribute("aria-hidden");
    }
  }

  function setMenu(open) {
    if (!burger || !links) return;
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    links.classList.toggle("is-open", open);
    if (scrim) {
      scrim.hidden = !open;
      scrim.classList.toggle("is-open", open);
    }
    document.body.style.overflow = open ? "hidden" : "";

    if (open) {
      setLinksInert(false);
      lastFocused = (document.activeElement && document.activeElement !== document.body)
        ? document.activeElement : burger;
      var first = links.querySelector("a");
      if (first) first.focus();
    } else {
      setLinksInert(true);
      // Return focus to the burger (the control that owns the menu), falling back
      // to wherever focus was before opening.
      var target = burger || lastFocused;
      if (target && typeof target.focus === "function") target.focus();
      lastFocused = null;
    }
  }

  // Initial state: on mobile the closed drawer must be inert; on desktop it is the inline nav.
  function initMenuState() {
    if (menuIsMobile()) {
      links.classList.remove("is-open");
      setLinksInert(true);
      if (scrim) { scrim.hidden = true; scrim.classList.remove("is-open"); }
      document.body.style.overflow = "";
    } else {
      links.classList.remove("is-open");
      setLinksInert(false);
      if (scrim) { scrim.hidden = true; scrim.classList.remove("is-open"); }
      document.body.style.overflow = "";
    }
  }
  if (links) initMenuState();
  (mobileMq.addEventListener ? mobileMq.addEventListener("change", initMenuState) : mobileMq.addListener(initMenuState));

  if (burger) {
    burger.addEventListener("click", function () {
      setMenu(burger.getAttribute("aria-expanded") !== "true");
    });
  }
  if (scrim) scrim.addEventListener("click", function () { setMenu(false); });
  if (links) {
    links.addEventListener("click", function (e) {
      if (e.target.closest(".nav__link")) setMenu(false);
    });
    // Trap Tab within the open mobile menu
    links.addEventListener("keydown", function (e) {
      if (e.key !== "Tab" || !links.classList.contains("is-open")) return;
      var f = links.querySelectorAll("a[href]");
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && links && links.classList.contains("is-open")) setMenu(false);
  });

  /* ---------- Nav shadow on scroll + back-to-top (rAF-throttled) ---------- */
  var nav = document.getElementById("nav");
  var toTop = document.getElementById("toTop");
  var ticking = false;
  var navScrolled = false;
  var topVisible = false;

  function updateOnScroll() {
    var y = window.scrollY;
    var s = y > 24;
    if (s !== navScrolled) { navScrolled = s; if (nav) nav.classList.toggle("nav--scrolled", s); }
    var t = y > 600;
    if (t !== topVisible) { topVisible = t; if (toTop) toTop.classList.toggle("is-visible", t); }
    ticking = false;
  }
  function onScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(updateOnScroll); }
  }
  updateOnScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Ghost section numbers: mirror the eyebrow number onto the head ---------- */
  Array.prototype.slice.call(document.querySelectorAll(".section-head")).forEach(function (h) {
    var eb = h.querySelector(".eyebrow");
    var m = eb && eb.textContent.match(/\d+/);
    if (m) h.setAttribute("data-index", m[0]);
  });

  /* ---------- Auto-stagger: incremental reveal delay for grouped children ---------- */
  Array.prototype.slice.call(document.querySelectorAll("[data-stagger]")).forEach(function (group) {
    var step = parseInt(group.getAttribute("data-stagger"), 10) || 90;
    Array.prototype.slice.call(group.querySelectorAll(":scope > [data-reveal]"))
      .forEach(function (el, i) { el.style.setProperty("--reveal-delay", (i * step) + "ms"); });
  });

  /* ---------- Scroll reveal ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));
  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { revealObs.observe(el); });
  }

  /* ---------- Animated stat counters ---------- */
  var counters = Array.prototype.slice.call(document.querySelectorAll("[data-count]"));

  function render(el, val, suffix) {
    el.textContent = "";
    el.appendChild(document.createTextNode(val.toLocaleString("en-US")));
    if (suffix) {
      var s = document.createElement("span");
      s.className = "suffix";
      s.textContent = suffix;
      el.appendChild(s);
    }
  }

  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    if (prefersReduced) { render(el, target, suffix); return; }
    var dur = 1400, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      render(el, Math.round(target * eased), suffix);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if (counters.length) {
    if (prefersReduced || !("IntersectionObserver" in window)) {
      counters.forEach(animateCount);
    } else {
      var countObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { animateCount(entry.target); countObs.unobserve(entry.target); }
        });
      }, { threshold: 0.6 });
      counters.forEach(function (el) { countObs.observe(el); });
    }
  }

  /* ---------- Scroll-spy active nav link ---------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
  var navLinkEls = Array.prototype.slice.call(document.querySelectorAll(".nav__link"));
  function linkFor(id) {
    return navLinkEls.filter(function (a) { return a.getAttribute("href") === "#" + id; })[0];
  }
  if (sections.length && "IntersectionObserver" in window) {
    var spyObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinkEls.forEach(function (a) { a.classList.remove("is-active"); });
          var active = linkFor(entry.target.id);
          if (active) active.classList.add("is-active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sections.forEach(function (s) { spyObs.observe(s); });
  }

  /* ---------- Hero role rotator (typewriter, decorative/aria-hidden) ---------- */
  var roleEl = document.getElementById("roleText");
  var ROLES = [
    "Senior Software Engineer",
    "Full-Stack Developer",
    "Flutter & Mobile Developer",
    "Software Instructor",
    "AI-focused Builder"
  ];
  if (roleEl && !prefersReduced) {
    var ri = 0, ci = 0, deleting = false, paused = false, timer = null;
    function tick() {
      if (paused) { timer = setTimeout(tick, 400); return; }
      var word = ROLES[ri];
      if (!deleting) {
        ci++;
        roleEl.textContent = word.slice(0, ci);
        if (ci === word.length) { deleting = true; timer = setTimeout(tick, 1600); return; }
        timer = setTimeout(tick, 62);
      } else {
        ci--;
        roleEl.textContent = word.slice(0, ci);
        if (ci === 0) { deleting = false; ri = (ri + 1) % ROLES.length; timer = setTimeout(tick, 240); return; }
        timer = setTimeout(tick, 32);
      }
    }
    // Pause the loop when the hero scrolls out of view to save the main thread.
    if ("IntersectionObserver" in window) {
      var hero = document.querySelector(".hero");
      if (hero) {
        new IntersectionObserver(function (e) { paused = !e[0].isIntersecting; })
          .observe(hero);
      }
    }
    timer = setTimeout(tick, 600);
  } else if (roleEl) {
    roleEl.textContent = ROLES[0];
    roleEl.style.borderRight = "none";
  }

  /* ---------- Contact form (mailto compose + optional Formspree) ---------- */
  var form = document.getElementById("contactForm");
  var status = document.getElementById("formStatus");
  // To use Formspree instead of the mailto fallback, set the endpoint below:
  var FORMSPREE_ENDPOINT = ""; // e.g. "https://formspree.io/f/xxxxxxx"

  function setStatus(msg, ok) {
    if (!status) return;
    status.textContent = msg;
    status.classList.toggle("is-ok", ok === true);
    status.classList.toggle("is-err", ok === false);
  }
  function fieldVal(name) {
    // Use elements collection to avoid the HTMLFormElement.name IDL collision.
    var el = form.elements[name];
    return el ? el.value.trim() : "";
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        setStatus("Please fill in the required fields.", false);
        form.reportValidity();
        return;
      }
      var data = {
        name: fieldVal("name"),
        email: fieldVal("email"),
        subject: fieldVal("subject") || "Portfolio enquiry",
        message: fieldVal("message")
      };

      if (FORMSPREE_ENDPOINT) {
        setStatus("Sending…");
        fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: { "Accept": "application/json", "Content-Type": "application/json" },
          body: JSON.stringify(data)
        }).then(function (r) {
          if (r.ok) { form.reset(); setStatus("Thanks! Your message is on its way. ✦", true); }
          else { throw new Error("bad response"); }
        }).catch(function () {
          setStatus("Couldn't send — email me directly at codewithowais@gmail.com", false);
        });
        return;
      }

      var body = "Name: " + data.name + "\n" + "Email: " + data.email + "\n\n" + data.message;
      var href = "mailto:codewithowais@gmail.com" +
        "?subject=" + encodeURIComponent(data.subject) +
        "&body=" + encodeURIComponent(body);
      window.location.href = href;
      setStatus("Opening your email app… If nothing happens, email codewithowais@gmail.com", true);
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Magnetic hover on primary CTAs (fine pointer only) ---------- */
  if (!prefersReduced && window.matchMedia("(pointer:fine)").matches) {
    Array.prototype.slice.call(document.querySelectorAll(".btn--primary")).forEach(function (btn) {
      var rect = null;
      btn.addEventListener("mouseenter", function () {
        rect = btn.getBoundingClientRect();
        btn.style.transition = "transform 0.08s linear";
      });
      btn.addEventListener("mousemove", function (e) {
        if (!rect) rect = btn.getBoundingClientRect();
        var mx = e.clientX - rect.left - rect.width / 2;
        var my = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = "translate(" + mx * 0.12 + "px," + (my * 0.12 - 2) + "px)";
      });
      btn.addEventListener("mouseleave", function () {
        rect = null;
        btn.style.transition = "";
        btn.style.transform = "";
      });
    });
  }

  /* ---------- Card cursor spotlight (fine pointer, no reduced motion) ---------- */
  if (!prefersReduced && window.matchMedia("(hover:hover) and (pointer:fine)").matches) {
    Array.prototype.slice.call(document.querySelectorAll(".card")).forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty("--mx", (e.clientX - r.left) + "px");
        card.style.setProperty("--my", (e.clientY - r.top) + "px");
      });
    });
  }

  /* ---------- ⌘K command palette ---------- */
  (function () {
    var modal = document.getElementById("cmdk");
    var input = document.getElementById("cmdkInput");
    var list = document.getElementById("cmdkList");
    var hint = document.getElementById("cmdkHint");
    if (!modal || !input || !list) return;

    var COMMANDS = [
      { label: "About", href: "#about", hint: "go" },
      { label: "Experience", href: "#experience", hint: "go" },
      { label: "Work", href: "#projects", hint: "go" },
      { label: "Skills", href: "#skills", hint: "go" },
      { label: "Services", href: "#services", hint: "go" },
      { label: "Teaching", href: "#teaching", hint: "go" },
      { label: "Contact", href: "#contact", hint: "go" },
      { label: "Download résumé", href: "/assets/muhammad-owais-ahmed-resume.pdf", hint: "file", ext: true },
      { label: "Email Owais", href: "mailto:codewithowais@gmail.com", hint: "action", ext: true },
      { label: "GitHub", href: "https://github.com/codewithowais", hint: "open", ext: true },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/codewithowais/", hint: "open", ext: true },
      { label: "Toggle theme", action: "theme", hint: "action" }
    ];

    var results = COMMANDS.slice(), sel = 0, lastFocus = null;

    function render() {
      list.innerHTML = "";
      results.forEach(function (c, i) {
        var li = document.createElement("li");
        li.className = "cmdk__opt";
        li.setAttribute("role", "option");
        li.setAttribute("aria-selected", i === sel ? "true" : "false");
        li.innerHTML = '<span></span><span class="k"></span>';
        li.firstChild.textContent = c.label;
        li.lastChild.textContent = c.hint;
        li.addEventListener("click", function () { sel = i; run(); });
        list.appendChild(li);
      });
    }
    function filter(q) {
      q = q.trim().toLowerCase();
      results = q ? COMMANDS.filter(function (c) { return c.label.toLowerCase().indexOf(q) > -1; }) : COMMANDS.slice();
      sel = 0; render();
    }
    function open() {
      lastFocus = document.activeElement;
      modal.hidden = false; document.body.style.overflow = "hidden";
      input.value = ""; filter(""); input.focus();
    }
    function close() {
      modal.hidden = true; document.body.style.overflow = "";
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    function run() {
      var c = results[sel]; if (!c) return;
      close();
      if (c.action === "theme" && toggle) { toggle.click(); return; }
      if (c.ext) { window.open(c.href, c.href.charAt(0) === "#" ? "_self" : "_blank", "noopener"); return; }
      if (c.href) { window.location.hash = c.href; }
    }

    if (hint) hint.addEventListener("click", open);
    document.addEventListener("keydown", function (e) {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) { e.preventDefault(); modal.hidden ? open() : close(); return; }
      if (modal.hidden) return;
      if (e.key === "Escape") { e.preventDefault(); close(); }
      else if (e.key === "ArrowDown") { e.preventDefault(); sel = Math.min(sel + 1, results.length - 1); render(); }
      else if (e.key === "ArrowUp") { e.preventDefault(); sel = Math.max(sel - 1, 0); render(); }
      else if (e.key === "Enter") { e.preventDefault(); run(); }
    });
    input.addEventListener("input", function () { filter(input.value); });
    Array.prototype.slice.call(modal.querySelectorAll("[data-cmdk-close]"))
      .forEach(function (el) { el.addEventListener("click", close); });
  })();

  /* ---------- 3D tilt + parallax (fine pointer, motion-OK only) ---------- */
  if (!prefersReduced && window.matchMedia("(hover:hover) and (pointer:fine)").matches) {

    function initTilt(el, maxDeg) {
      var rect = null, raf = 0, lx = 0, ly = 0;
      function apply() {
        raf = 0;
        el.style.setProperty("--ry", (lx * maxDeg).toFixed(2) + "deg");
        el.style.setProperty("--rx", (-ly * maxDeg).toFixed(2) + "deg");
        el.style.setProperty("--gx", (lx * 100 + 50).toFixed(1) + "%");
        el.style.setProperty("--gy", (ly * 100 + 50).toFixed(1) + "%");
      }
      el.addEventListener("pointerenter", function () {
        rect = el.getBoundingClientRect();
        el.style.transition = "transform 0.12s linear";
      });
      el.addEventListener("pointermove", function (e) {
        if (!rect) rect = el.getBoundingClientRect();
        lx = (e.clientX - rect.left) / rect.width - 0.5;
        ly = (e.clientY - rect.top) / rect.height - 0.5;
        if (!raf) raf = requestAnimationFrame(apply);
      });
      el.addEventListener("pointerleave", function () {
        rect = null;
        if (raf) { cancelAnimationFrame(raf); raf = 0; }
        el.style.transition = "";
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
        el.style.removeProperty("--gx");
        el.style.removeProperty("--gy");
      });
    }

    // Featured case-study cards
    Array.prototype.slice.call(document.querySelectorAll(".projects__list .project"))
      .forEach(function (el) { initTilt(el, 5); });

    // Hero portrait: tilt the frame, counter-parallax the floating badges
    (function () {
      var wrap = document.querySelector(".hero__portrait");
      var frame = wrap && wrap.querySelector(".portrait-frame");
      if (!wrap || !frame) return;
      var badges = Array.prototype.slice.call(wrap.querySelectorAll(".portrait-badge"));
      var rect = null, raf = 0, lx = 0, ly = 0;
      function apply() {
        raf = 0;
        frame.style.setProperty("--ry", (lx * 9).toFixed(2) + "deg");
        frame.style.setProperty("--rx", (-ly * 9).toFixed(2) + "deg");
        badges.forEach(function (b, i) {
          var d = i === 0 ? 26 : -22;
          b.style.transform = "translate3d(" + (lx * d).toFixed(1) + "px," + (ly * d).toFixed(1) + "px,0)";
        });
      }
      wrap.addEventListener("pointerenter", function () {
        rect = wrap.getBoundingClientRect();
        frame.style.transition = "transform 0.12s linear";
      });
      wrap.addEventListener("pointermove", function (e) {
        if (!rect) rect = wrap.getBoundingClientRect();
        lx = (e.clientX - rect.left) / rect.width - 0.5;
        ly = (e.clientY - rect.top) / rect.height - 0.5;
        if (!raf) raf = requestAnimationFrame(apply);
      });
      wrap.addEventListener("pointerleave", function () {
        rect = null;
        if (raf) { cancelAnimationFrame(raf); raf = 0; }
        frame.style.transition = "";
        frame.style.setProperty("--rx", "0deg");
        frame.style.setProperty("--ry", "0deg");
        badges.forEach(function (b) { b.style.transform = ""; });
      });
    })();
  }
})();
