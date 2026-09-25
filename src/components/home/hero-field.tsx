"use client";

import dynamic from "next/dynamic";
import { themes } from "@upcytech/tokens/native";
import { useDeferredDecoration } from "./use-deferred-decoration";

/** three.js + postprocessing are ~180 KB gzipped: never in the page bundle, never on the server. */
const PixelBlast = dynamic(() => import("@/components/vendor/reactbits/pixel-blast"), { ssr: false });

/**
 * React Bits "Pixel Blast" behind the home hero — decoration only, so it waits for load and
 * idle, and never loads under reduced motion or data saver (useDeferredDecoration). It pauses
 * off screen (PixelBlast's own autoPauseOffscreen). A readability veil in HomeHero keeps copy
 * off busy dots.
 */
export function HeroField() {
  const { on, dark } = useDeferredDecoration();
  if (!on) return null;

  return (
    <div
      aria-hidden="true"
      className={[
        "absolute inset-0 -z-10 transition-opacity duration-1000 ease-out starting:opacity-0",
        // Light ground: the same blue, held back so dense dots never fight ink text.
        dark ? "opacity-100" : "opacity-45",
      ].join(" ")}
    >
      {/* The React Bits demo's settings (diamond · 4 · scale 6 · density 1.5 · jitter 0.75 ·
          speed 0.8 · edge fade 0.3 · ripples, no liquid), in the UpcyTech fill blue — the
          deep light-theme value in both themes, which on the dark ground reads as a field
          rather than a light show. */}
      <PixelBlast
        className="absolute inset-0"
        variant="diamond"
        pixelSize={4}
        color={themes["upcytech.light"].colorBgBrand}
        patternScale={6}
        patternDensity={1.5}
        pixelSizeJitter={0.75}
        enableRipples
        rippleSpeed={0.4}
        rippleThickness={0.12}
        rippleIntensityScale={1.5}
        liquid={false}
        speed={0.8}
        edgeFade={0.3}
        transparent
      />
    </div>
  );
}
