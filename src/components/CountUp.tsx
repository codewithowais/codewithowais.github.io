"use client";

import { useEffect } from "react";

// Counts the stat numbers (.fact .v) up from 0 when they scroll into view.
// Never pre-zeros the DOM, so if rAF is throttled the original value stays put.
export default function CountUp() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = Array.from(document.querySelectorAll<HTMLElement>(".fact .v"))
      .map((el) => {
        const raw = (el.textContent || "").trim();
        const m = raw.match(/^([\d,]+)(.*)$/); // e.g. "1,200+" -> ["1,200","+"]
        if (!m) return null;
        return {
          el,
          raw,
          target: parseInt(m[1].replace(/,/g, ""), 10),
          suffix: m[2],
          comma: m[1].includes(","),
          done: false,
        };
      })
      .filter(Boolean) as { el: HTMLElement; raw: string; target: number; suffix: string; comma: boolean; done: boolean }[];

    if (!items.length) return;

    const fmt = (n: number, comma: boolean) => (comma ? n.toLocaleString("en-US") : String(n));
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const run = (it: (typeof items)[number]) => {
      it.done = true;
      const dur = 1100;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / dur);
        it.el.textContent = fmt(Math.round(it.target * easeOut(t)), it.comma) + it.suffix;
        if (t < 1) requestAnimationFrame(tick);
        else it.el.textContent = it.raw;
      };
      requestAnimationFrame(tick);
    };

    const check = () => {
      const line = window.innerHeight * 0.9;
      let remaining = false;
      for (const it of items) {
        if (it.done) continue;
        if (it.el.getBoundingClientRect().top < line) run(it);
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
      requestAnimationFrame(() => { ticking = false; if (!check()) stop(); });
    };

    requestAnimationFrame(check);
    const kick = window.setTimeout(check, 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const safety = window.setTimeout(() => items.forEach((it) => { if (!it.done) it.el.textContent = it.raw; }), 3500);

    return () => { stop(); window.clearTimeout(kick); window.clearTimeout(safety); };
  }, []);

  return null;
}
