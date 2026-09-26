import * as React from "react";

const H1 =
  "max-w-[12ch] font-[family-name:var(--font-geist-sans)] text-[clamp(2.65rem,11vw,4.5rem)] sm:text-[clamp(3rem,8vw,5rem)] lg:text-[clamp(3.5rem,5.6vw,6.4rem)] " +
  "font-semibold leading-[0.96] tracking-[-0.055em] text-ink break-words [overflow-wrap:anywhere] [text-wrap:balance]";

/**
 * Product-first hero title.
 *
 * No colour sweep, kinetic hover or animated gradient: the headline should feel like an
 * enterprise product statement, not an AI landing-page effect. Accent words keep one solid
 * brand role so the hierarchy survives both themes and reduced-motion preferences.
 */
export function HeroTitle({ text, accents = [] }: { text?: string; accents?: readonly string[] }) {
  const words = (typeof text === "string" ? text : "").trim().split(/\s+/).filter(Boolean);
  const bare = (word: string) => word.replace(/[^\p{L}\p{N}-]/gu, "");

  return (
    <h1 className={H1}>
      {words.map((word, index) => {
        const accented = accents.includes(bare(word));
        return (
          <React.Fragment key={`${word}-${index}`}>
            <span className={accented ? "text-brand-text" : undefined}>{word}</span>
            {index < words.length - 1 ? " " : null}
          </React.Fragment>
        );
      })}
    </h1>
  );
}
