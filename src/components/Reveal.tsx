"use client";

import { useEffect } from "react";

declare global {
  interface Window { __revealFailsafe?: number }
}

// Must match the :is(...) selector list in globals.css exactly.
const SEL =
  "#hero > *, .sec:not(.hero) .eyebrow, .big, .feat, .casestudy, .exp__row, .spec__group, .prose p, #teaching .facts, .more, .cards, .contact__card";

export default function Reveal() {
  useEffect(() => {
    const root = document.documentElement;
    // Armed by the pre-paint script only when motion is allowed. If it's not
    // armed (reduced motion / no JS at load), everything is already visible.
    if (!root.classList.contains("reveal-init")) return;

    // We own visibility now — cancel the script's "un-hide everything" failsafe.
    if (window.__revealFailsafe) {
      clearTimeout(window.__revealFailsafe);
      window.__revealFailsafe = undefined;
    }

    const targets = Array.from(document.querySelectorAll<HTMLElement>(SEL));

    const reveal = () => {
      const line = window.innerHeight * 0.9;
      let remaining = false;
      for (const el of targets) {
        if (el.classList.contains("in")) continue;
        if (el.getBoundingClientRect().top < line) el.classList.add("in");
        else remaining = true;
      }
      return remaining;
    };

    let ticking = false;
    const stop = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        if (!reveal()) stop(); // all shown → detach
      });
    };

    // Reveal what's already in view (rAF for a smooth fade; setTimeout as a
    // reliable fallback if rAF is throttled).
    requestAnimationFrame(() => requestAnimationFrame(reveal));
    const kick = window.setTimeout(reveal, 250);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // Last-resort safety: never leave anything hidden.
    const safety = window.setTimeout(() => targets.forEach((el) => el.classList.add("in")), 3000);

    return () => { stop(); window.clearTimeout(kick); window.clearTimeout(safety); };
  }, []);

  return null;
}
