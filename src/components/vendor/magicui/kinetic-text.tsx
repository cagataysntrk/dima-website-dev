/**
 * Magic UI "Kinetic Text" — MIT, https://magicui.design/r/kinetic-text. Adapted:
 * - Letters are grouped into words (inline-block, no wrap inside), so the text breaks at
 *   spaces exactly like plain text. Upstream wraps letter by letter in a flex row, which splits
 *   words across lines and would jump the moment the hero hands over from the colour sweep.
 * - Weights come from custom properties (--kinetic-peak / -near / -far; defaults suit a
 *   400–700 face), so each face can use its own axis.
 * - `accents`: words that get `accentClassName` on their word span (the home hero's italic,
 *   blue-faded words). Matched without trailing punctuation.
 * - No hover padding: spreading the letters would reflow the line under the pointer.
 * - 300ms, within the house hover band; Tailwind v4's `hover:` applies only where hovering exists.
 */
import * as React from "react";
import { cn } from "@upcytech/ui";

type As = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

type KineticTextProps = React.HTMLAttributes<HTMLElement> & {
  text: string;
  as?: As;
  accents?: readonly string[];
  accentClassName?: string;
};

const LETTER =
  "inline-block [will-change:font-weight] [-webkit-text-stroke-color:transparent] " +
  "[-webkit-text-stroke-width:var(--text-stroke-width)] " +
  "[transition:font-weight_0.3s_var(--motion-ease-default),-webkit-text-stroke-color_0.3s_var(--motion-ease-default)] " +
  "hover:[font-weight:var(--kinetic-peak,700)] hover:[-webkit-text-stroke-color:currentcolor] " +
  "has-[+span:hover]:[font-weight:var(--kinetic-near,650)] has-[+span+span:hover]:[font-weight:var(--kinetic-far,575)] " +
  "[:hover+&]:[font-weight:var(--kinetic-near,650)] [:hover+span+&]:[font-weight:var(--kinetic-far,575)]";

export const bareWord = (word: string) => word.replace(/[.,;:!?…]+$/u, "");

export function KineticText({ text, as: Tag = "h1", accents = [], accentClassName, className, style, ...rest }: KineticTextProps) {
  const words = text.split(" ");
  return (
    <Tag
      {...rest}
      className={cn(className)}
      style={{ "--text-stroke-width": "calc(1em * 125 / 6000)", ...style } as React.CSSProperties}
    >
      {words.map((word, w) => (
        <React.Fragment key={w}>
          <span
            aria-hidden="true"
            className={cn("inline-block whitespace-nowrap", accents.includes(bareWord(word)) && accentClassName)}
          >
            {Array.from(word).map((letter, i) => (
              <span key={i} className={LETTER}>{letter}</span>
            ))}
          </span>
          {w < words.length - 1 && " "}
        </React.Fragment>
      ))}
      <span className="sr-only">{text}</span>
    </Tag>
  );
}
