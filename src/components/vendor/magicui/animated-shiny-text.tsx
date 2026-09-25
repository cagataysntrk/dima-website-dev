/**
 * Magic UI "Animated Shiny Text" — MIT, https://magicui.design/r/animated-shiny-text. Adapted:
 * - colours are tokens: the text is `muted`, the passing light is ink at 80%, so it works on
 *   both themes without a dark: override;
 * - no max-width / centring of its own — the host lays it out;
 * - keyframes in globals.css; reduced motion stops the sweep (design-system rule).
 */
import type { ComponentPropsWithoutRef, CSSProperties, FC } from "react";
import { cn } from "@upcytech/ui";

export interface AnimatedShinyTextProps extends ComponentPropsWithoutRef<"span"> {
  shimmerWidth?: number;
}

export const AnimatedShinyText: FC<AnimatedShinyTextProps> = ({ children, className, shimmerWidth = 100, ...props }) => (
  <span
    style={{ "--shiny-width": `${shimmerWidth}px` } as CSSProperties}
    className={cn(
      "text-muted",
      "animate-shiny-text bg-size-[var(--shiny-width)_100%] bg-clip-text bg-position-[0_0] bg-no-repeat [transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite]",
      "bg-linear-to-r from-transparent via-[color-mix(in_oklab,var(--color-text-primary)_80%,transparent)] via-50% to-transparent",
      className,
    )}
    {...props}
  >
    {children}
  </span>
);
