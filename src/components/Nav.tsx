"use client";

import { useEffect, useState } from "react";
import { toggleTheme, useThemeAttr } from "./theme";

const LINKS = [
  ["About", "#about"],
  ["Experience", "#experience"],
  ["Work", "#projects"],
  ["Skills", "#skills"],
  ["Services", "#services"],
  ["Teaching", "#teaching"],
  ["Contact", "#contact"],
] as const;

export default function Nav() {
  const theme = useThemeAttr();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
      style={{
        height: "var(--nav-h)",
        background: scrolled ? "color-mix(in srgb, var(--bg) 82%, transparent)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      <nav className="mx-auto flex h-full max-w-[1200px] items-center justify-between gap-4 px-5">
        <a href="#top" className="flex items-center gap-2.5 font-mono text-[15px] font-medium">
          <span
            className="grid h-8 w-8 place-items-center rounded-lg text-xs font-bold text-white"
            style={{ background: "var(--accent)" }}
          >
            CO
          </span>
          <span>
            codewith<span style={{ color: "var(--accent-text)" }}>owais</span>
          </span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {LINKS.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-[14px] text-[color:var(--muted)] transition-colors hover:text-[color:var(--text)]"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            className="grid h-10 w-10 place-items-center rounded-full border transition-colors hover:border-[color:var(--accent-line)]"
            style={{ borderColor: "var(--border)" }}
          >
            {theme === "dark" ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
              </svg>
            )}
          </button>
          <a
            href="#contact"
            className="rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-transform active:scale-95"
            style={{ background: "var(--accent)" }}
          >
            Let&apos;s talk
          </a>
        </div>
      </nav>
    </header>
  );
}
