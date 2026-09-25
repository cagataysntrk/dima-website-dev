"use client";

import * as React from "react";
import { brandColors, spectrum } from "@/lib/spectrum";
import { DiaTextReveal } from "@/components/vendor/magicui/dia-text-reveal";
import { bareWord, KineticText } from "@/components/vendor/magicui/kinetic-text";

/**
 * The home headline is set in Geist (the `geist` package, local files — never fetched), its
 * accent words in Geist Italic — a home-hero exception to the design system's display face. No text-balance: the colour sweep and the kinetic hand-over must break lines
 * identically, and rebalancing on hover would move whole lines.
 */
const H1 =
  "max-w-[20ch] font-[family-name:var(--font-geist-sans)] font-semibold text-[clamp(1.9rem,7.5vw,2.75rem)] sm:text-display-xl " +
  "leading-[1.02] tracking-[-0.035em] text-ink break-words [overflow-wrap:anywhere]";

/** Geist is variable 100–900, so the kinetic hover can reach further than the serif did. */
const KINETIC_WEIGHTS = { "--kinetic-peak": 800, "--kinetic-near": 740, "--kinetic-far": 670 };

/**
 * An accent word's shape — Geist's real italic (loaded in the layout), plus a sliver of end
 * padding so the slanted last letter is not clipped by its gradient. Identical in every phase,
 * so the hand-over moves nothing.
 */
const ACCENT_SHAPE = "font-[family-name:var(--font-geist-italic),var(--font-geist-sans)] italic pe-[0.06em]";

/**
 * Its colour, once settled: the site's spectrum (lib/spectrum) — the five brand colours, ordered round the
 * hue wheel (--accent-spectrum, set below) — drifting slowly across the word, like light through
 * a prism. Each colour is a brand text token, so each clears contrast on its theme.
 * Reduced motion: the design system stops the drift.
 */
const ACCENT_INK =
  "bg-[image:var(--accent-spectrum)] bg-[length:200%_100%] bg-clip-text text-transparent " +
  "[-webkit-text-fill-color:transparent] animate-[upcy-spectrum-drift_9s_ease-in-out_infinite_alternate]";

type Phase = "pending" | "sweep" | "kinetic";

const isDark = () => {
  const chosen = document.documentElement.dataset.theme;
  return chosen ? chosen === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
};
/** The title with its accent words wrapped (shape only), for the pending and sweep phases. */
function Shaped({ text, accents }: { text: string; accents: readonly string[] }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <React.Fragment key={i}>
          {accents.includes(bareWord(word)) ? <span className={ACCENT_SHAPE}>{word}</span> : word}
          {i < words.length - 1 && " "}
        </React.Fragment>
      ))}
    </>
  );
}

/**
 * The home headline, in three phases:
 * 1. pending — the server's text, held transparent by globals.css while JS boots;
 * 2. sweep   — Magic UI DiaTextReveal: a band of the five product colours crosses the line
 *              once and settles into ink (one company, five products);
 * 3. kinetic — Magic UI KineticText: letters thicken under the pointer, and the accent words
 *              take the spectrum.
 * If the text is already visible when this mounts — reduced motion, or the 1.2s failsafe
 * fired because the script was slow — the sweep is skipped: text is never hidden twice.
 */
export function HeroTitle({ text, accents }: { text: string; accents: readonly string[] }) {
  const [phase, setPhase] = React.useState<Phase>("pending");
  const [dark, setDark] = React.useState(false);
  const pending = React.useRef<HTMLSpanElement>(null);

  React.useLayoutEffect(() => {
    setDark(isDark());
    const el = pending.current;
    const held = el ? /,\s*0\)$/.test(getComputedStyle(el).color) || getComputedStyle(el).color === "transparent" : false;
    setPhase(held ? "sweep" : "kinetic");
  }, []);

  // The spectrum follows the theme: each brand has lighter values on the dark ground.
  React.useEffect(() => {
    const update = () => setDark(isDark());
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const scheme = matchMedia("(prefers-color-scheme: dark)");
    scheme.addEventListener("change", update);
    return () => { observer.disconnect(); scheme.removeEventListener("change", update); };
  }, []);

  // Belt and braces: whatever happens to the sweep, the headline is never left invisible.
  React.useEffect(() => {
    if (phase !== "sweep") return;
    const timer = setTimeout(() => setPhase("kinetic"), 3500);
    return () => clearTimeout(timer);
  }, [phase]);

  const theme = dark ? "dark" : "light";
  const colors = brandColors(theme);
  const style = {
    ...KINETIC_WEIGHTS,
    "--accent-spectrum": `linear-gradient(100deg in oklch, ${spectrum(theme).join(", ")})`,
  } as React.CSSProperties;

  return (
    <h1 className={H1} style={style}>
      {phase === "pending" && (
        <span ref={pending} data-dia="pending"><Shaped text={text} accents={accents} /></span>
      )}
      {phase === "sweep" && (
        <DiaTextReveal
          text={text}
          colors={colors}
          textColor="var(--color-text-primary)"
          duration={1.6}
          startOnView={false}
          onComplete={() => setPhase("kinetic")}
        >
          <Shaped text={text} accents={accents} />
        </DiaTextReveal>
      )}
      {phase === "kinetic" && (
        <KineticText as="span" text={text} accents={accents} accentClassName={`${ACCENT_SHAPE} ${ACCENT_INK}`} />
      )}
    </h1>
  );
}
