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
    "Freelance & AI-focused Dev"
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
})();
