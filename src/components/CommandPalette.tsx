"use client";

import { useEffect, useRef, useState } from "react";
import { toggleTheme } from "./theme";

type Action = {
  id: string;
  label: string;
  kind: "section" | "action" | "link";
  run: () => void;
  keywords?: string;
};

const scrollTo = (id: string) => () => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};
const openTab = (url: string) => () => window.open(url, "_blank", "noopener,noreferrer");

const ACTIONS: Action[] = [
  { id: "hero", label: "Intro", kind: "section", run: scrollTo("hero"), keywords: "home top start" },
  { id: "about", label: "About", kind: "section", run: scrollTo("about"), keywords: "bio who" },
  { id: "work", label: "Selected work", kind: "section", run: scrollTo("work"), keywords: "projects portfolio simplied ledgerly" },
  { id: "experience", label: "Experience", kind: "section", run: scrollTo("experience"), keywords: "jobs roles career" },
  { id: "skills", label: "Stack", kind: "section", run: scrollTo("skills"), keywords: "skills tech tools languages" },
  { id: "teaching", label: "Teaching", kind: "section", run: scrollTo("teaching"), keywords: "flutter course mentor" },
  { id: "faq", label: "FAQ", kind: "section", run: scrollTo("faq"), keywords: "questions availability" },
  { id: "contact", label: "Contact", kind: "section", run: scrollTo("contact"), keywords: "hire reach get in touch" },
  { id: "email", label: "Email me", kind: "action", run: () => { window.location.href = "mailto:codewithowais@gmail.com"; }, keywords: "mail hire contact" },
  { id: "copy", label: "Copy email address", kind: "action", run: () => { navigator.clipboard?.writeText("codewithowais@gmail.com").catch(() => {}); }, keywords: "clipboard mail" },
  { id: "whatsapp", label: "Message on WhatsApp", kind: "action", run: openTab("https://wa.me/923169585886"), keywords: "phone chat message" },
  { id: "resume", label: "Download résumé (PDF)", kind: "action", run: openTab("/muhammad-owais-ahmed-resume.pdf"), keywords: "cv pdf" },
  { id: "prompt-builder", label: "Try the AI Prompt Builder", kind: "link", run: openTab("https://codewithowais.github.io/flutter-prompt-builder/"), keywords: "prompt ai tool templates claude chatgpt live" },
  { id: "github", label: "Open GitHub", kind: "link", run: openTab("https://github.com/codewithowais"), keywords: "code repos" },
  { id: "linkedin", label: "Open LinkedIn", kind: "link", run: openTab("https://www.linkedin.com/in/codewithowais/"), keywords: "profile network" },
  { id: "theme", label: "Toggle theme (light / dark)", kind: "action", run: () => toggleTheme(), keywords: "dark light mode appearance" },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const prevFocus = useRef<HTMLElement | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const query = q.trim().toLowerCase();
  const items = query
    ? ACTIONS.filter((a) => (a.label + " " + (a.keywords || "")).toLowerCase().includes(query))
    : ACTIONS;

  // Global open shortcuts: Cmd/Ctrl+K, or "/" when not typing in a field.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      const typing = t && /^(input|textarea|select)$/i.test(t.tagName);
      if ((e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-cmdk", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-cmdk", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      prevFocus.current = document.activeElement as HTMLElement;
      setQ("");
      setActive(0);
      const id = window.setTimeout(() => inputRef.current?.focus(), 20);
      return () => window.clearTimeout(id);
    }
    prevFocus.current?.focus?.();
  }, [open]);

  useEffect(() => setActive(0), [q]);

  // keep the active item scrolled into view
  useEffect(() => {
    if (!open) return;
    const el = listRef.current?.children[active] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  if (!open) return null;

  const run = (a: Action) => {
    setOpen(false);
    // let the overlay unmount before scrolling/navigating
    requestAnimationFrame(() => a.run());
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((i) => Math.min(items.length - 1, i + 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((i) => Math.max(0, i - 1)); }
    else if (e.key === "Home") { e.preventDefault(); setActive(0); }
    else if (e.key === "End") { e.preventDefault(); setActive(items.length - 1); }
    else if (e.key === "Enter") { e.preventDefault(); if (items[active]) run(items[active]); }
    else if (e.key === "Escape") { e.preventDefault(); setOpen(false); }
  };

  return (
    <div className="cmdk" role="dialog" aria-modal="true" aria-label="Command menu" onMouseDown={() => setOpen(false)}>
      <div className="cmdk__panel" onMouseDown={(e) => e.stopPropagation()} onKeyDown={onKeyDown}>
        <div className="cmdk__search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
          <input
            ref={inputRef}
            className="cmdk__input"
            placeholder="Jump to a section or action…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Search sections and actions"
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="cmdk__esc">ESC</kbd>
        </div>
        <ul className="cmdk__list" ref={listRef} role="listbox" aria-label="Results">
          {items.length === 0 && <li className="cmdk__empty">No matches</li>}
          {items.map((a, i) => (
            <li
              key={a.id}
              role="option"
              aria-selected={i === active}
              className={"cmdk__item" + (i === active ? " is-active" : "")}
              onMouseEnter={() => setActive(i)}
              onClick={() => run(a)}
            >
              <span className="cmdk__label">{a.label}</span>
              <span className="cmdk__kind">{a.kind}</span>
            </li>
          ))}
        </ul>
        <div className="cmdk__foot">
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span><kbd>↵</kbd> select</span>
          <span><kbd>⌘</kbd><kbd>K</kbd> anytime</span>
        </div>
      </div>
    </div>
  );
}
