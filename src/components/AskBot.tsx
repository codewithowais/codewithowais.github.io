"use client";

import { useEffect, useRef, useState } from "react";
import { answerFor, GREETING, SUGGESTIONS, type Link } from "../data/askbot";

type Msg = { id: number; from: "bot" | "me"; text: string; links?: Link[] };

const isExternal = (href: string) => /^https?:/.test(href);

export default function AskBot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ id: 0, from: "bot", text: GREETING }]);
  const [q, setQ] = useState("");
  const [thinking, setThinking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const nextId = useRef(1);
  const timer = useRef<number | undefined>(undefined);

  // Open from the command palette / anywhere via a custom event.
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("open-askbot", onOpen);
    return () => window.removeEventListener("open-askbot", onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => inputRef.current?.focus(), 30);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        launcherRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, thinking, open]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const ask = (text: string) => {
    const question = text.trim();
    if (!question || thinking) return;
    setMsgs((m) => [...m, { id: nextId.current++, from: "me", text: question }]);
    setQ("");
    setThinking(true);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    timer.current = window.setTimeout(
      () => {
        const a = answerFor(question);
        setMsgs((m) => [...m, { id: nextId.current++, from: "bot", text: a.answer, links: a.links }]);
        setThinking(false);
      },
      reduce ? 0 : 420,
    );
  };

  const goLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      setOpen(false);
      requestAnimationFrame(() =>
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" }),
      );
    }
  };

  return (
    <div className="askbot">
      {open && (
        <div className="askbot__panel" role="dialog" aria-label="Ask about Owais">
          <div className="askbot__head">
            <div>
              <div className="askbot__title">Ask about Owais</div>
              <div className="askbot__sub">Answers from this site, not an AI model</div>
            </div>
            <button
              type="button"
              className="askbot__x"
              aria-label="Close chat"
              onClick={() => {
                setOpen(false);
                launcherRef.current?.focus();
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
            </button>
          </div>

          <div className="askbot__log" ref={logRef} role="log" aria-live="polite" aria-relevant="additions">
            {msgs.map((m) => (
              <div key={m.id} className={"askbot__msg askbot__msg--" + m.from}>
                <p>{m.text}</p>
                {m.links && (
                  <div className="askbot__links">
                    {m.links.map((l) => (
                      <a
                        key={l.href + l.label}
                        href={l.href}
                        onClick={(e) => goLink(e, l.href)}
                        {...(isExternal(l.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {l.label}
                        <span aria-hidden="true"> ↗</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {thinking && (
              <div className="askbot__msg askbot__msg--bot askbot__typing" aria-label="Typing">
                <span /><span /><span />
              </div>
            )}
          </div>

          <div className="askbot__chips">
            {SUGGESTIONS.map((s) => (
              <button key={s} type="button" onClick={() => ask(s)} disabled={thinking}>
                {s}
              </button>
            ))}
          </div>

          <form
            className="askbot__form"
            onSubmit={(e) => {
              e.preventDefault();
              ask(q);
            }}
          >
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Ask about his work, stack, availability…"
              aria-label="Your question"
              autoComplete="off"
              maxLength={200}
            />
            <button type="submit" disabled={!q.trim() || thinking} aria-label="Send question">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </button>
          </form>
        </div>
      )}

      <button
        ref={launcherRef}
        type="button"
        className="askbot__launch"
        aria-expanded={open}
        aria-label={open ? "Close chat" : "Ask about Owais"}
        onClick={() => setOpen((o) => !o)}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" /></svg>
        <span>Ask about Owais</span>
      </button>
    </div>
  );
}
