"use client";

import { useEffect, useRef, useState } from "react";

const FILTERS: { key: string; label: string }[] = [
  { key: "all", label: "All" },
  { key: "live", label: "Live" },
  { key: "ai", label: "AI" },
  { key: "fullstack", label: "Full-stack" },
  { key: "mobile", label: "Mobile" },
  { key: "opensource", label: "Open source" },
];

export default function ProjectFilter() {
  const [active, setActive] = useState("all");
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [showing, setShowing] = useState<number | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);

  // Count how many projects fall under each filter (for the subtle number on each chip).
  useEffect(() => {
    try {
      // Count real project cards only (exclude the case-study expander).
      const els = Array.from(
        document.querySelectorAll<HTMLElement>("#work .feat[data-cat], #work .pcard[data-cat]")
      );
      const c: Record<string, number> = { all: els.length };
      for (const f of FILTERS) {
        if (f.key === "all") continue;
        c[f.key] = els.filter((el) => (el.dataset.cat || "").split(" ").includes(f.key)).length;
      }
      setCounts(c);
      setShowing(els.length);
    } catch {
      /* no-op */
    }
  }, []);

  function apply(key: string) {
    setActive(key);
    let els: HTMLElement[] = [];
    try {
      els = Array.from(document.querySelectorAll<HTMLElement>("#work [data-cat]"));
    } catch {
      return;
    }
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let shown = 0;
    for (const el of els) {
      const cats = (el.dataset.cat || "").split(" ");
      const match = key === "all" || cats.includes(key);
      if (match) {
        el.classList.remove("pf-hide");
        if (!reduce) {
          // re-trigger the entrance animation with a small stagger
          el.classList.remove("pf-show");
          void el.offsetWidth; // force reflow
          el.style.animationDelay = `${Math.min(shown, 8) * 45}ms`;
          el.classList.add("pf-show");
        }
        shown++;
      } else {
        el.classList.add("pf-hide");
        el.classList.remove("pf-show");
      }
    }
    // "Showing N" reflects real project cards only (not the case-study expander).
    try {
      setShowing(
        document.querySelectorAll(
          "#work .feat[data-cat]:not(.pf-hide), #work .pcard[data-cat]:not(.pf-hide)"
        ).length
      );
    } catch {
      /* no-op */
    }
  }

  return (
    <div className="pfilter" ref={barRef} role="group" aria-label="Filter projects by type">
      {FILTERS.map((f) => (
        <button
          key={f.key}
          type="button"
          className={`pfilter__chip${active === f.key ? " on" : ""}`}
          aria-pressed={active === f.key}
          onClick={() => apply(f.key)}
        >
          {f.label}
          {counts[f.key] != null && <span className="pfilter__n">{counts[f.key]}</span>}
        </button>
      ))}
      {showing != null && (
        <span className="pfilter__showing" aria-live="polite">
          Showing {showing} {showing === 1 ? "project" : "projects"}
        </span>
      )}
    </div>
  );
}
