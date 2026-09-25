"use client";

import * as React from "react";
import { useInView, useReducedMotion } from "motion/react";
import { themes } from "@upcytech/tokens/native";
import { Particles } from "@/components/vendor/magicui/particles";
import { useIsDark } from "@/components/theme/use-is-dark";

/**
 * Magic UI Particles inside the pre-footer CTA card, as on upcyman.com — in the UpcyTech brand
 * colour of the active theme. Its animation loop runs only while the card is near the screen
 * (it is mounted in view and unmounted out of it), and never under reduced motion.
 */
export function CtaParticles() {
  const ref = React.useRef<HTMLDivElement>(null);
  const near = useInView(ref, { margin: "200px" });
  const reduce = useReducedMotion();
  const dark = useIsDark();

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0">
      {near && !reduce && (
        <Particles
          className="absolute inset-0"
          // Denser than the sister site's 30: in a card this size 30 read as stray dots, not a field.
          quantity={110}
          color={themes[`upcytech.${dark ? "dark" : "light"}`].colorTextBrand}
          size={0.4}
          staticity={60}
          ease={80}
        />
      )}
    </div>
  );
}
