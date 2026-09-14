"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { useThemeAttr } from "./theme";

const ShaderAurora = dynamic(() => import("./ShaderAurora"), { ssr: false });

const AURORA: Record<"light" | "dark", string[]> = {
  dark: ["#0b0b0d", "#e2674a", "#e9a24f", "#7a2f1c"],
  light: ["#f4f1ea", "#eab98f", "#e3a066", "#d98f5a"],
};

function useScramble(final: string, run: boolean) {
  const [text, setText] = useState(final);
  useEffect(() => {
    if (!run) {
      setText(final);
      return;
    }
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&@";
    let frame = 0;
    const total = 22;
    const id = setInterval(() => {
      frame++;
      let out = "";
      for (let i = 0; i < final.length; i++) {
        out +=
          frame / total > i / final.length
            ? final.charAt(i)
            : chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setText(out);
      if (frame >= total) {
        clearInterval(id);
        setText(final);
      }
    }, 42);
    return () => clearInterval(id);
  }, [final, run]);
  return text;
}

export default function Hero() {
  const theme = useThemeAttr();
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [canWebGL, setCanWebGL] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCanWebGL(window.innerWidth >= 768);
  }, []);

  const ahmed = useScramble("Ahmed", mounted && !reduce);

  // Portrait 3D tilt
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotX = useSpring(useTransform(py, [-0.5, 0.5], [9, -9]), { stiffness: 120, damping: 14 });
  const rotY = useSpring(useTransform(px, [-0.5, 0.5], [-11, 11]), { stiffness: 120, damping: 14 });
  const portraitRef = useRef<HTMLDivElement>(null);

  const onPortraitMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const r = portraitRef.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onPortraitLeave = () => {
    px.set(0);
    py.set(0);
  };

  const rise = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { y: "115%" },
    animate: reduce ? { opacity: 1 } : { y: 0 },
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const, delay },
  });

  const fadeUp = (delay: number) => ({
    initial: reduce ? { opacity: 1 } : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const, delay },
  });

  return (
    <section id="top" className="relative overflow-hidden" style={{ paddingTop: "calc(var(--nav-h) + 3.5rem)", paddingBottom: "3.5rem" }}>
      {/* WebGL aurora + fallback */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{ opacity: theme === "dark" ? 0.8 : 0.5 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60vw 60vw at 78% -10%, var(--glow), transparent 60%), radial-gradient(50vw 50vw at 10% 30%, color-mix(in srgb, var(--accent) 35%, transparent), transparent 60%)",
          }}
        />
        {mounted && canWebGL && !reduce && <ShaderAurora colors={AURORA[theme]} />}
      </div>
      <div aria-hidden className="grain-overlay pointer-events-none absolute inset-0 z-0 opacity-[0.28] mix-blend-soft-light" />

      <div className="relative z-10 mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-10 px-5 lg:grid-cols-[1.35fr_0.85fr] lg:gap-16">
        {/* LEFT */}
        <div>
          {/* topbar */}
          <motion.div className="mb-7 flex flex-wrap items-center justify-between gap-3" {...fadeUp(0)}>
            <span
              className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-[13px]"
              style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--muted)" }}
            >
              <span className="h-2 w-2 rounded-full" style={{ background: "#46d17f", animation: "pulse 2.4s infinite" }} />
              Open to freelance &amp; full-time work
            </span>
            <span className="hidden font-mono text-[12px] uppercase tracking-[0.16em] sm:block" style={{ color: "var(--faint)" }}>
              Full-Stack · Flutter · AI &nbsp;—&nbsp; Karachi, PK
            </span>
          </motion.div>

          {/* NAME */}
          <h1 className="font-display font-extrabold uppercase leading-[1.02] tracking-[-0.04em]" style={{ fontSize: "clamp(2.4rem, 9vw, 6.2rem)" }}>
            <span className="block overflow-hidden pb-[0.12em]">
              <motion.span className="block" {...rise(0.05)}>Muhammad</motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.12em] pl-[clamp(0.3rem,2.4vw,1.6rem)]">
              <motion.span className="block" {...rise(0.16)}>
                Owais{" "}
                <span className="relative text-gradient">
                  {ahmed}
                  <motion.span
                    className="absolute -bottom-[0.02em] left-[0.02em] right-[0.02em] block h-[0.07em] rounded-sm"
                    style={{ background: "var(--accent)", transformOrigin: "left" }}
                    initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
                  />
                </span>
              </motion.span>
            </span>
          </h1>

          {/* lead */}
          <motion.p className="mt-7 max-w-[54ch] text-[color:var(--muted)]" style={{ fontSize: "clamp(1.05rem,1.4vw,1.25rem)", lineHeight: 1.6 }} {...fadeUp(0.3)}>
            I build <strong style={{ color: "var(--text)" }}>EdTech and mobile products</strong> that real schools run on every day,
            and I train the developers who build them. Six years across{" "}
            <strong style={{ color: "var(--text)" }}>Angular, React, Node.js, .NET &amp; Flutter</strong>. Right now I&apos;m the founding
            engineer at <strong style={{ color: "var(--text)" }}>SimpliEd</strong>, used by more than 25,000 people.
          </motion.p>

          {/* availability */}
          <motion.p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[13px]" style={{ color: "var(--muted)" }} {...fadeUp(0.38)}>
            <span
              className="rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.14em]"
              style={{ color: "var(--accent-text)", borderColor: "var(--accent-line)", background: "var(--accent-soft)" }}
            >
              Open to relocation
            </span>
            <span>
              Gulf — <strong style={{ color: "var(--text)" }}>UAE / KSA</strong> · visa sponsorship ·{" "}
              <strong style={{ color: "var(--text)" }}>~30 days notice</strong> · remote worldwide
            </span>
          </motion.p>

          {/* CTAs */}
          <motion.div className="mt-8 flex flex-wrap items-center gap-3" {...fadeUp(0.46)}>
            <a href="#projects" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform active:scale-95" style={{ background: "var(--accent)" }}>
              View my work
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
            <a href="/muhammad-owais-ahmed-resume.pdf" download className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-colors hover:border-[color:var(--accent-line)]" style={{ borderColor: "var(--border)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" /></svg>
              Résumé
            </a>
            <span className="ml-1 flex items-center gap-2">
              <a href="https://github.com/codewithowais" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="grid h-10 w-10 place-items-center rounded-full border transition-colors hover:border-[color:var(--accent-line)]" style={{ borderColor: "var(--border)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.7-1.3-1.7-1.1-.7 0-.7 0-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C18 4.6 19 4.9 19 4.9c.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5z" /></svg>
              </a>
              <a href="https://www.linkedin.com/in/codewithowais/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid h-10 w-10 place-items-center rounded-full border transition-colors hover:border-[color:var(--accent-line)]" style={{ borderColor: "var(--border)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.5 8h4V24h-4V8zM8 8h3.8v2.2h.05c.53-1 1.83-2.2 3.77-2.2 4 0 4.75 2.65 4.75 6.1V24h-4v-6.9c0-1.65-.03-3.77-2.3-3.77-2.3 0-2.65 1.8-2.65 3.65V24H8V8z" /></svg>
              </a>
            </span>
          </motion.div>
        </div>

        {/* RIGHT — portrait with 3D tilt */}
        <motion.div
          className="relative mx-auto w-full max-w-[360px]"
          initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          style={{ perspective: 1000 }}
        >
          <motion.div
            ref={portraitRef}
            onMouseMove={onPortraitMove}
            onMouseLeave={onPortraitLeave}
            style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
            className="relative"
          >
            <div className="overflow-hidden rounded-[22px] border shadow-[var(--shadow-lg)]" style={{ borderColor: "var(--border-strong)", transform: "rotate(-4deg)" }}>
              <Image src="/img/profilepic.jpg" alt="Muhammad Owais Ahmed — Senior Software Engineer" width={360} height={440} priority className="h-auto w-full object-cover" />
            </div>
            <div className="absolute -left-4 -top-4 rounded-2xl border px-4 py-3 shadow-[var(--shadow-md)]" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
              <div className="font-display text-2xl font-extrabold" style={{ color: "var(--accent)" }}>6+</div>
              <div className="font-mono text-[11px] uppercase tracking-wider" style={{ color: "var(--faint)" }}>Years shipping</div>
            </div>
            <div className="absolute -bottom-4 -right-4 rounded-2xl border px-4 py-3 shadow-[var(--shadow-md)]" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
              <div className="font-display text-2xl font-extrabold" style={{ color: "var(--accent)" }}>25k+</div>
              <div className="font-mono text-[11px] uppercase tracking-wider" style={{ color: "var(--faint)" }}>Users served</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
