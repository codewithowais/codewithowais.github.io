"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { toggleTheme, useThemeAttr } from "./theme";

const SECTIONS = [
  ["hero", "00", "Intro"],
  ["about", "01", "About"],
  ["work", "02", "Selected work"],
  ["experience", "03", "Experience"],
  ["skills", "04", "Stack"],
  ["teaching", "05", "Teaching"],
  ["faq", "06", "FAQ"],
  ["contact", "07", "Contact"],
] as const;

export default function Rail() {
  const theme = useThemeAttr();
  const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const ids = SECTIONS.map((s) => s[0]);
    const lastId = ids[ids.length - 1];
    let ticking = false;

    // Scroll-position based: the active section is the last one whose top has
    // crossed a reference line ~30% down the viewport. Robust everywhere —
    // it doesn't depend on IntersectionObserver callbacks firing.
    const pick = () => {
      ticking = false;
      const line = window.innerHeight * 0.3;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      // At the very bottom, the last (short) section may never reach the line.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = lastId;
      }
      setActive(current);
    };

    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(pick); }
    };

    pick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <aside className={"rail" + (menuOpen ? " is-open" : "")} aria-label="Site identity and navigation">
      <div className="brand">
        <span className="brand__id">
          <span className="mono-badge">CO</span> codewithowais
        </span>
      </div>
      <button
        className="rail__burger"
        type="button"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="rail-nav"
        onClick={() => setMenuOpen((o) => !o)}
      >
        <span /><span /><span />
      </button>

      <div className="portrait">
        <span className="portrait__block" aria-hidden="true" />
        <Image src="/img/profilepic.jpg" alt="Muhammad Owais Ahmed" width={128} height={128} priority />
      </div>

      <div className="rail__name">Muhammad<br />Owais Ahmed</div>
      <div className="rail__role">Staff Software Engineer</div>
      <div className="status"><span className="d" /> Open to work</div>

      <button
        className="rail__search"
        type="button"
        onClick={() => window.dispatchEvent(new CustomEvent("open-cmdk"))}
        aria-label="Open command menu"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
        <span>Search</span>
        <kbd>⌘K</kbd>
      </button>

      <nav className="idx" id="rail-nav" aria-label="Sections">
        {SECTIONS.map(([id, n, label]) => (
          <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined} className={active === id ? "on" : ""} onClick={() => setMenuOpen(false)}>
            <span className="n">{n}</span> {label}
          </a>
        ))}
      </nav>

      <div className="rail__foot">
        <div className="rail__links">
          <a href="https://github.com/codewithowais" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/codewithowais/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
        <div className="rail__actions">
          <a className="btn btn--resume" href="/muhammad-owais-ahmed-resume.pdf" download aria-label="Download résumé, PDF">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3v10m0 0l-3.5-3.5M12 13l3.5-3.5M5 20h14" /></svg>
            Résumé <span className="btn__tag">PDF</span>
          </a>
          <button className="theme-btn" type="button" onClick={toggleTheme} aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}>
            {theme === "dark" ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.4 1.4M17.6 17.6L19 19M19 5l-1.4 1.4M6.4 17.6L5 19" /></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}
