const ITEM = (
  <span
    className="whitespace-nowrap pr-[0.35em] font-display font-extrabold uppercase tracking-[-0.02em]"
    style={{
      fontSize: "clamp(1.7rem, 5.2vw, 3.4rem)",
      color: "transparent",
      WebkitTextStroke: "1px var(--faint)",
    }}
  >
    Muhammad Owais Ahmed <em className="not-italic" style={{ color: "var(--accent)", padding: "0 0.15em", WebkitTextStroke: "0" }}>✦</em>
    Senior Software Engineer <em className="not-italic" style={{ color: "var(--accent)", padding: "0 0.15em", WebkitTextStroke: "0" }}>✦</em>
    Full-Stack <em className="not-italic" style={{ color: "var(--accent)", padding: "0 0.15em", WebkitTextStroke: "0" }}>✦</em>
    Flutter <em className="not-italic" style={{ color: "var(--accent)", padding: "0 0.15em", WebkitTextStroke: "0" }}>✦</em>
    AI <em className="not-italic" style={{ color: "var(--accent)", padding: "0 0.15em", WebkitTextStroke: "0" }}>✦</em>
  </span>
);

export default function NameMarquee() {
  return (
    <div aria-hidden className="overflow-hidden border-y py-2" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
      <div className="flex w-max animate-[beltScroll_34s_linear_infinite] hover:[animation-play-state:paused]">
        {ITEM}
        {ITEM}
      </div>
    </div>
  );
}
