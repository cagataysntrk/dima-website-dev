"use client";

import * as React from "react";
import createGlobe from "cobe";
import { useReducedMotion } from "motion/react";
import { themes } from "@upcytech/tokens/native";
import { useIsDark } from "@/components/theme/use-is-dark";

/**
 * The same markers as the sister site's globe: Istanbul first, then the export markets. Sizes
 * are relative to the globe, so they are kept small for the hero's large one.
 */
const MARKERS: { location: [number, number]; size: number }[] = [
  { location: [41.01, 28.98], size: 0.045 },
  { location: [52.52, 13.405], size: 0.03 },
  { location: [51.5074, -0.1278], size: 0.03 },
  { location: [25.2048, 55.2708], size: 0.03 },
  { location: [40.7128, -74.006], size: 0.03 },
  { location: [35.6762, 139.6503], size: 0.03 },
  { location: [-23.5505, -46.6333], size: 0.03 },
];

/** cobe's rotation that turns a longitude to face the viewer. */
const facing = (longitude: number) => Math.PI - ((longitude * Math.PI) / 180 - Math.PI / 2);

const toUnit = (hex: string): [number, number, number] =>
  [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255) as [number, number, number];

/**
 * The cobe globe from the sister site's International section, ported: it auto-rotates and
 * can be dragged; it only renders while near the screen (WebGL is expensive); markers and glow
 * are the UpcyTech brand blue of the active theme. Reduced motion: it holds still (drag still
 * turns it). Decorative — hidden from assistive technology.
 *
 * cobe sizes its buffer as `width × devicePixelRatio`, so `width` is the CSS width and the
 * ratio is capped at 1.5 (D-034) — the buffer never exceeds 1.5× the box.
 */
export function Globe({ className = "" }: { className?: string }) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const pointer = React.useRef<number | null>(null);
  const movement = React.useRef(0);
  // Opens on Istanbul (and holds there under reduced motion).
  const phi = React.useRef(facing(MARKERS[0]!.location[1]));
  const [near, setNear] = React.useState(false);
  const dark = useIsDark();
  const reduce = useReducedMotion();

  React.useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setNear(!!entry?.isIntersecting), { rootMargin: "100px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!near || !canvas) return;
    const width = canvas.offsetWidth;

    const brand = toUnit(themes[`upcytech.${dark ? "dark" : "light"}`].colorTextBrand);
    const globe = createGlobe(canvas, {
      devicePixelRatio: Math.min(window.devicePixelRatio || 1, 1.5),
      width,
      height: width,
      phi: phi.current,
      theta: 0.25,
      dark: dark ? 1 : 0,
      diffuse: dark ? 1.2 : 2,
      mapSamples: 8000,
      mapBrightness: dark ? 6 : 1.5,
      baseColor: dark ? [0.13, 0.13, 0.14] : [0.93, 0.93, 0.94],
      markerColor: brand,
      glowColor: dark ? brand : [0.85, 0.85, 0.86],
      markers: MARKERS,
    });

    // Every update() redraws, and one that carries a size also reallocates the canvas: the size
    // goes over only when the box changes, and a frame redraws only when the angle moved — so a
    // still globe (reduced motion, not being dragged) costs nothing. Except for the first second:
    // cobe decodes its map texture asynchronously and does not redraw when it lands, so a globe
    // drawn once at mount would stay a blank sphere.
    const resize = new ResizeObserver(() => {
      const next = canvas.offsetWidth;
      if (next) globe.update({ width: next, height: next });
    });
    resize.observe(canvas);

    let frame = 0;
    let drawn = Number.NaN;
    const settling = performance.now() + 1000;
    const animate = () => {
      if (pointer.current === null && !reduce) phi.current += 0.005;
      const angle = phi.current + movement.current / 200;
      if (angle !== drawn || performance.now() < settling) { globe.update({ phi: angle }); drawn = angle; }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      globe.destroy();
    };
  }, [near, dark, reduce]);

  return (
    <div ref={wrapRef} aria-hidden="true" className={`aspect-square ${className}`}>
      <canvas
        ref={canvasRef}
        className="size-full cursor-grab touch-pan-y [contain:layout_paint_size]"
        onPointerDown={(e) => { pointer.current = e.clientX - movement.current; e.currentTarget.style.cursor = "grabbing"; }}
        onPointerUp={(e) => { pointer.current = null; e.currentTarget.style.cursor = "grab"; }}
        onPointerOut={(e) => { pointer.current = null; e.currentTarget.style.cursor = "grab"; }}
        onPointerMove={(e) => { if (pointer.current !== null) movement.current = e.clientX - pointer.current; }}
      />
    </div>
  );
}
