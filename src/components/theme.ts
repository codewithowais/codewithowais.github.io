"use client";

import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

export function toggleTheme() {
  const el = document.documentElement;
  const next: Theme = el.getAttribute("data-theme") === "dark" ? "light" : "dark";
  el.setAttribute("data-theme", next);
  try {
    localStorage.setItem("owais-theme", next);
  } catch {}
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", next === "dark" ? "#0b0b0d" : "#f4f1ea");
}

/** Reads the current theme and stays in sync with any toggle (observes the attribute). */
export function useThemeAttr(): Theme {
  const [theme, setTheme] = useState<Theme>("light");
  useEffect(() => {
    const el = document.documentElement;
    const read = () => setTheme((el.getAttribute("data-theme") as Theme) || "light");
    read();
    const obs = new MutationObserver(read);
    obs.observe(el, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);
  return theme;
}
