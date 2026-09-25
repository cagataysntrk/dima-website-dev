"use client";

import dynamic from "next/dynamic";
import type { TextLoopDirection, TextLoopShape } from "../vendor/reactbits/text-loop";

/**
 * Client boundary for the LoopBand ribbon: gsap must not enter the server bundle,
 * and `ssr:false` dynamics are only allowed in Client Components. The ribbon already
 * reserves its box in the server-rendered parent, so nothing shifts on arrival.
 */
const TextLoop = dynamic(() => import("../vendor/reactbits/text-loop"), { ssr: false });

export function LoopBandCanvas({ text, lang, separator = "✦", shape = "wave", curviness = 14, fontSize = 30, fontWeight = 700, letterSpacing = 3, speed = 70, ribbonWidth = 64, direction = "forward", className }: {
  text: string;
  /** Language for the ribbon's uppercase (Turkish i → İ). */
  lang?: string;
  separator?: string;
  shape?: TextLoopShape;
  curviness?: number;
  fontSize?: number;
  fontWeight?: number | string;
  letterSpacing?: number;
  speed?: number;
  ribbonWidth?: number;
  direction?: TextLoopDirection;
  className?: string;
}) {
  return (
    <TextLoop text={text} lang={lang} separator={separator} shape={shape} curviness={curviness} fontSize={fontSize} fontWeight={fontWeight} letterSpacing={letterSpacing} speed={speed} ribbonWidth={ribbonWidth} direction={direction} className={className} />
  );
}
