"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { answerFor, FOLLOWUPS, GREETING, SUGGESTIONS, type Link } from "../data/askbot";

type Msg = { id: number; from: "bot" | "me"; text: string; links?: Link[]; entry?: string; done: boolean };

const isExternal = (href: string) => /^https?:/.test(href);
const prefersReduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const THINKING = ["Searching the portfolio…", "Writing an answer…"];

/** Types text out character by character, pausing at punctuation. Click to skip ahead. */
function Streamed({ text, onTick, onDone }: { text: string; onTick: () => void; onDone: () => void }) {
  const [n, setN] = useState(() => (prefersReduced() ? text.length : 0));

  useEffect(() => {
    if (n >= text.length) {
      onDone();
      return;
    }
    const prev = text[n - 1];
    const pause = prev && /[.?!]/.test(prev) ? 260 : prev && /[,:;]/.test(prev) ? 110 : 0;
    const t = window.setTimeout(() => {
      setN((v) => Math.min(text.length, v + 2));
      onTick();
    }, 18 + pause);
    return () => window.clearTimeout(t);
  }, [n, text, onTick, onDone]);

  return (
    <p onClick={() => setN(text.length)} title="Click to skip">
      {text.slice(0, n)}
      <span className="askbot__caret" aria-hidden="true" />
    </p>
  );
}

export default function AskBot() {
  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ id: 0, from: "bot", text: GREETING, done: false }]);
  const [q, setQ] = useState("");
  const [thinking, setThinking] = useState<number | null>(null); // index into THINKING
  const [streaming, setStreaming] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const nextId = useRef(1);
  const timers = useRef<number[]>([]);

  const busy = thinking !== null || streaming;

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("open-askbot", onOpen);
    return () => window.removeEventListener("open-askbot", onOpen);
  }, []);

  // One-time teaser bubble next to the launcher (per browser session).
  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("askbot-teaser") === "1"; } catch {}
    if (seen) return;
    const show = window.setTimeout(() => setTeaser(true), 4500);
    const hide = window.setTimeout(() => setTeaser(false), 14000);
    return () => { window.clearTimeout(show); window.clearTimeout(hide); };
  }, []);

  useEffect(() => {
    if (!open) return;
    try { sessionStorage.setItem("askbot-teaser", "1"); } catch {}
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

  const scrollDown = useCallback(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(scrollDown, [msgs, thinking, open, scrollDown]);
  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  const finish = useCallback((id: number) => {
    setMsgs((m) => m.map((x) => (x.id === id ? { ...x, done: true } : x)));
    setStreaming(false);
  }, []);

  const ask = (text: string) => {
    const question = text.trim();
    if (!question || busy) return;
    setMsgs((m) => [...m, { id: nextId.current++, from: "me", text: question, done: true }]);
    setQ("");
    const a = answerFor(question);
    const push = () => {
      const id = nextId.current++;
      setThinking(null);
      if (prefersReduced()) {
        setMsgs((m) => [...m, { id, from: "bot", text: a.answer, links: a.links, entry: a.id, done: true }]);
      } else {
        setStreaming(true);
        setMsgs((m) => [...m, { id, from: "bot", text: a.answer, links: a.links, entry: a.id, done: false }]);
      }
    };
    if (prefersReduced()) {
      push();
      return;
    }
    setThinking(0);
    later(() => setThinking(1), 520);
    later(push, 1050);
  };

  const reset = () => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
    setThinking(null);
    setStreaming(false);
    setMsgs([{ id: nextId.current++, from: "bot", text: GREETING, done: prefersReduced() }]);
    setQ("");
    inputRef.current?.focus();
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

  const last = msgs[msgs.length - 1];
  const chips =
    msgs.length === 1 ? (last.done ? SUGGESTIONS : []) : last.from === "bot" && last.done ? FOLLOWUPS[last.entry ?? "fallback"] ?? SUGGESTIONS : [];

  return (
    <div className="askbot">
      {open && (
        <div className="askbot__panel" role="dialog" aria-label="Ask about Owais">
          <div className="askbot__head">
            <div className="askbot__id">
              <span className="askbot__avatar" aria-hidden="true">CO<i /></span>
              <div>
                <div className="askbot__title">Ask about Owais</div>
                <div className="askbot__sub">From this site · not an AI model</div>
              </div>
            </div>
            <div className="askbot__tools">
              <button type="button" className="askbot__x" aria-label="Start a new chat" title="New chat" onClick={reset}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></svg>
              </button>
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
          </div>

          <div className="askbot__log" ref={logRef} role="log" aria-live="polite" aria-relevant="additions text">
            {msgs.map((m) => (
              <div key={m.id} className={"askbot__row askbot__row--" + m.from}>
                {m.from === "bot" && <span className="askbot__mini" aria-hidden="true">CO</span>}
                <div className={"askbot__msg askbot__msg--" + m.from}>
                  {m.from === "bot" && !m.done ? (
                    <Streamed text={m.text} onTick={scrollDown} onDone={() => finish(m.id)} />
                  ) : (
                    <p>{m.text}</p>
                  )}
                  {m.links && m.done && (
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
              </div>
            ))}
            {thinking !== null && (
              <div className="askbot__row askbot__row--bot">
                <span className="askbot__mini askbot__mini--busy" aria-hidden="true">CO</span>
                <div className="askbot__think" role="status">
                  <span key={thinking} className="askbot__shimmer">{THINKING[thinking]}</span>
                </div>
              </div>
            )}
          </div>

          <div className="askbot__chips" key={msgs.length}>
            {chips.map((s, i) => (
              <button key={s} type="button" style={{ ["--i" as string]: i }} onClick={() => ask(s)} disabled={busy}>
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
            <button type="submit" disabled={!q.trim() || busy} aria-label="Send question">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
            </button>
          </form>
        </div>
      )}

      {teaser && !open && (
        <div className="askbot__teaser" role="note">
          <button type="button" onClick={() => setOpen(true)}>Ask me about Owais&apos;s work, stack or availability</button>
          <button type="button" className="askbot__teaser-x" aria-label="Dismiss" onClick={() => setTeaser(false)}>×</button>
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
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z" /><path d="M19 16l.7 1.8L21.5 18.5l-1.8.7L19 21l-.7-1.8-1.8-.7 1.8-.7L19 16Z" /></svg>
        <span>Ask about Owais</span>
      </button>
    </div>
  );
}
