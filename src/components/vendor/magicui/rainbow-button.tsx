/**
 * Magic UI "Rainbow Button" — MIT, https://magicui.design/docs/components/rainbow-button. Adapted:
 * - Polymorphic `as`, so a navigation stays a real link (<Link>) instead of a <button>.
 * - The rainbow is the site's spectrum (lib/spectrum): the five brand text tokens as
 *   `light-dark()` pairs, where upstream hardcodes five hsl values. The fill is the ink token,
 *   dark on the light theme and light on the dark one — upstream's black/white inversion
 *   without a `dark:` variant.
 * - Radius `rounded-button` (a capsule on this site, D-032); sizes from the control tokens;
 *   press feedback scale(0.97) like the design-system Button.
 * - `glow={false}` drops the blurred arc under the button — the nav CTA keeps only the rim,
 *   so the page's primary action stays the one loud call (D-037).
 * Keyframes: globals.css. Reduced motion: the rainbow holds still.
 */
import * as React from "react";
import { cn } from "@upcytech/ui";
import { spectrumStops } from "@/lib/spectrum";

type RainbowButtonProps = {
  as?: React.ElementType;
  size?: "sm" | "md";
  /** The blurred rainbow arc under the button. */
  glow?: boolean;
} & React.HTMLAttributes<HTMLElement> & Record<string, unknown>;

/** The fill runs to the padding edge; the rim (the transparent border) shows the rainbow. */
const LAYERS = [
  "linear-gradient(var(--fill), var(--fill)) padding-box",
  // Fades the rainbow off the top of the rim, so the colour gathers along the bottom arc.
  "linear-gradient(var(--fill) 50%, color-mix(in oklab, var(--fill) 60%, transparent) 80%, transparent) border-box",
  "linear-gradient(90deg, var(--rainbow)) border-box",
].join(", ");

export function RainbowButton({
  as: Tag = "button",
  size = "md",
  glow = true,
  className,
  children,
  style,
  ...props
}: RainbowButtonProps) {
  return (
    <Tag
      {...(Tag === "button" ? { type: "button" } : null)}
      style={{
        "--fill": "var(--color-text-primary)",
        "--rainbow": [...spectrumStops, spectrumStops[0]].join(", "),
        background: LAYERS,
        backgroundSize: "200%",
        ...style,
      } as React.CSSProperties}
      className={cn(
        "group relative isolate inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap",
        "rounded-button border-[0.125rem] border-transparent font-medium text-ui text-canvas no-underline",
        "animate-rainbow motion-reduce:animate-none",
        "transform-gpu transition-[transform,filter] duration-160 ease-out-expo active:scale-[0.97] hoverable:hover:brightness-110",
        size === "sm" ? "min-h-[var(--size-control-min-h-sm)] px-4 pointer-coarse:min-h-11" : "min-h-[var(--size-control-min-h)] px-6 pointer-coarse:min-h-11",
        glow && [
          "before:pointer-events-none before:absolute before:bottom-[-20%] before:left-1/2 before:-z-10 before:h-1/5 before:w-3/5 before:-translate-x-1/2",
          "before:bg-[linear-gradient(90deg,var(--rainbow))] before:bg-[length:200%] before:blur-[0.75rem] before:content-['']",
          "before:animate-rainbow motion-reduce:before:animate-none",
        ],
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
