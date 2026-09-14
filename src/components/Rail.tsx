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

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    document.querySelectorAll("section[id]").forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <aside className="rail">
      <div className="brand">
        <span className="brand__id">
          <span className="mono-badge">CO</span> codewithowais
        </span>
        <button className="theme-btn" type="button" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "dark" ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.4 1.4M17.6 17.6L19 19M19 5l-1.4 1.4M6.4 17.6L5 19" /></svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
          )}
        </button>
      </div>

      <div className="portrait">
        <span className="portrait__block" aria-hidden="true" />
        <Image src="/img/profilepic.jpg" alt="Muhammad Owais Ahmed" width={128} height={128} priority />
      </div>

      <div className="rail__name">Muhammad<br />Owais Ahmed</div>
      <div className="rail__role">Senior Software Engineer</div>
      <div className="status"><span className="d" /> Open to work · Gulf / UAE / KSA</div>

      <nav className="idx">
        {SECTIONS.map(([id, n, label]) => (
          <a key={id} href={`#${id}`} className={active === id ? "on" : ""}>
            <span className="n">{n}</span> {label}
          </a>
        ))}
      </nav>

      <div className="rail__foot">
        <div className="rail__links">
          <a href="https://github.com/codewithowais" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/codewithowais/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
        <a className="btn" href="/muhammad-owais-ahmed-resume.pdf" download>↓ Résumé (PDF)</a>
      </div>
    </aside>
  );
}
