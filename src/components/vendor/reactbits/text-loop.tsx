"use client";

/**
 * React Bits "Text Loop" — https://reactbits.dev (TextLoop-TS-TW). Adapted:
 * - colours are tokens by default (on-brand text on the brand ribbon) and are applied through
 *   `style` — var() is not reliable in SVG presentation attributes;
 * - the text inherits the page's font;
 * - the text keeps its natural width. Upstream forces each copy to the path's length with
 *   textLength + lengthAdjust="spacing": a line longer than the path (ours: ~2980 units on a
 *   ~1850 path) was squeezed to 62% — letters overlapping, word spaces gone. Here the unit is
 *   repeated until it covers the path, and the loop's period is that natural width: the two
 *   copies follow each other exactly one text-width apart, so the seam matches the spacing;
 * - uppercase follows `lang` (Turkish i → İ, not I).
 * Otherwise upstream: a GSAP tween moves two text copies along the path; it does not run
 * under reduced motion; the SVG is labelled with the text for assistive technology.
 */
import { CSSProperties, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';

export type TextLoopShape = 'wave' | 'circle' | 'infinity' | 'arch' | 'line';
export type TextLoopDirection = 'forward' | 'reverse';

export interface TextLoopProps {
  text?: string;
  shape?: TextLoopShape;
  path?: string;
  speed?: number;
  direction?: TextLoopDirection;
  separator?: string;
  curviness?: number;
  fontSize?: number;
  fontWeight?: number | string;
  letterSpacing?: number;
  uppercase?: boolean;
  /** Language for uppercasing (e.g. "tr"). */
  lang?: string;
  color?: string;
  ribbon?: boolean;
  ribbonColor?: string;
  ribbonWidth?: number;
  pauseOnHover?: boolean;
  className?: string;
  style?: CSSProperties;
}

interface Metrics {
  /** The path's length. */
  length: number;
  /** Copies of the unit in one run: enough to cover the path. */
  reps: number;
  /** One run's natural width — the distance between the two copies, and the loop's period. */
  period: number;
}

const buildPath = (shape: TextLoopShape, curviness: number, ribbonWidth: number, width: number, height: number): string => {
  const w = Math.max(100, width);
  const h = Math.max(40, height);
  const cx = w / 2;
  const cy = h / 2;
  const edgePad = 6;
  const room = Math.max(10, cy - Math.max(0, ribbonWidth) / 2 - edgePad);
  const c = Math.max(0, curviness);

  switch (shape) {
    case 'circle': {
      const r = Math.min(90 + c * 0.95, room);
      return `M ${cx - r} ${cy} A ${r} ${r} 0 1 1 ${cx + r} ${cy} A ${r} ${r} 0 1 1 ${cx - r} ${cy} Z`;
    }
    case 'infinity': {
      const r = 150 + c * 1.4;
      const rise = Math.min(60 + c * 0.95, room);
      return [
        `M ${cx} ${cy}`,
        `C ${cx + r * 0.55} ${cy - rise} ${cx + r} ${cy - rise} ${cx + r} ${cy}`,
        `C ${cx + r} ${cy + rise} ${cx + r * 0.55} ${cy + rise} ${cx} ${cy}`,
        `C ${cx - r * 0.55} ${cy - rise} ${cx - r} ${cy - rise} ${cx - r} ${cy}`,
        `C ${cx - r} ${cy + rise} ${cx - r * 0.55} ${cy + rise} ${cx} ${cy}`,
        'Z'
      ].join(' ');
    }
    case 'arch': {
      const rise = Math.min(120 + c * 1.1, room * 2);
      return `M 120 ${cy + rise / 2} Q ${cx} ${cy - rise * 1.5} ${w - 120} ${cy + rise / 2}`;
    }
    case 'line':
      return `M -320 ${cy} L ${w + 320} ${cy}`;
    case 'wave':
    default: {
      const a = Math.min(c, room);
      let d = `M -320 ${cy} Q -160 ${cy - a} 0 ${cy}`;
      for (let x = 320; x <= w + 400; x += 320) {
        d += ` T ${x} ${cy}`;
      }
      return d;
    }
  }
};

const TextLoop = ({
  text = '',
  shape = 'wave',
  path,
  speed = 90,
  direction = 'forward',
  separator = '✦',
  curviness = 90,
  fontSize = 46,
  fontWeight = 800,
  letterSpacing = 2,
  uppercase = true,
  lang,
  color = 'var(--color-fg-on-brand)',
  ribbon = true,
  ribbonColor = 'var(--color-bg-brand)',
  ribbonWidth = 86,
  pauseOnHover = true,
  className = '',
  style = {}
}: TextLoopProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const measureRef = useRef<SVGTextElement | null>(null);
  const headRef = useRef<SVGTextPathElement | null>(null);
  const tailRef = useRef<SVGTextPathElement | null>(null);

  const [metrics, setMetrics] = useState<Metrics>({ length: 0, reps: 1, period: 0 });
  const [size, setSize] = useState<{ width: number; height: number }>(() => {
    if (typeof window !== 'undefined') {
      return {
        width: window.innerWidth || 1200,
        height: window.innerWidth < 640 ? 128 : 144
      };
    }
    return { width: 1200, height: 144 };
  });

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const updateSize = () => {
      const rect = root.getBoundingClientRect();
      const w = Math.round(rect.width);
      const h = Math.round(rect.height);
      if (w > 0 && h > 0) {
        setSize(prev => (prev.width === w && prev.height === h ? prev : { width: w, height: h }));
      }
    };

    updateSize();

    const ro = new ResizeObserver(updateSize);
    ro.observe(root);
    return () => ro.disconnect();
  }, []);

  const rawId = useId();
  const pathId = `text-loop-${rawId.replace(/:/g, '')}`;

  const d = useMemo(
    () => path || buildPath(shape, curviness, ribbonWidth, size.width, size.height),
    [path, shape, curviness, ribbonWidth, size.width, size.height]
  );

  const unit = useMemo(() => {
    const base = uppercase ? String(text).toLocaleUpperCase(lang) : String(text);
    const gap = separator ? `\u00A0${separator}\u00A0` : '\u00A0\u00A0\u00A0';
    return `${base}${gap}`;
  }, [text, separator, uppercase, lang]);

  const textStyle = useMemo<CSSProperties>(
    () => ({ fontSize: `${fontSize}px`, fontWeight, letterSpacing: `${letterSpacing}px` }),
    [fontSize, fontWeight, letterSpacing]
  );

  useLayoutEffect(() => {
    const pathEl = pathRef.current;
    const measureEl = measureRef.current;
    if (!pathEl || !measureEl) return undefined;

    let cancelled = false;

    const measure = () => {
      if (cancelled) return;
      let length = 0;
      let unitWidth = 0;
      try {
        length = pathEl.getTotalLength();
        unitWidth = measureEl.getComputedTextLength();
      } catch {
        return;
      }
      if (!length || !unitWidth) return;

      const reps = Math.max(1, Math.ceil(length / unitWidth));
      const period = reps * unitWidth;
      setMetrics(prev =>
        prev.length === length && prev.reps === reps && prev.period === period ? prev : { length, reps, period }
      );
    };

    measure();
    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(measure).catch(() => {});
    }

    return () => {
      cancelled = true;
    };
  }, [d, unit, fontSize, fontWeight, letterSpacing]);

  useEffect(() => {
    const { period } = metrics;
    const head = headRef.current;
    const tail = tailRef.current;
    if (!head || !tail || !period) return undefined;

    // offset runs over [0, period] (or [-period, 0]); the partner sits one period behind or
    // ahead. Since period ≥ the path's length, the pair always covers the whole path.
    const apply = (offset: number) => {
      const partner = offset >= 0 ? offset - period : offset + period;
      head.setAttribute('startOffset', String(offset));
      tail.setAttribute('startOffset', String(partner));
    };

    apply(0);

    const prefersReduced =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || speed <= 0) return undefined;

    const state = { offset: 0 };
    const tween = gsap.to(state, {
      offset: direction === 'reverse' ? -period : period,
      duration: period / speed,
      ease: 'none',
      repeat: -1,
      onUpdate: () => apply(state.offset)
    });

    const root = rootRef.current;
    const pause = () => tween.pause();
    const resume = () => tween.resume();

    if (pauseOnHover && root) {
      root.addEventListener('pointerenter', pause);
      root.addEventListener('pointerleave', resume);
    }

    return () => {
      tween.kill();
      if (pauseOnHover && root) {
        root.removeEventListener('pointerenter', pause);
        root.removeEventListener('pointerleave', resume);
      }
    };
  }, [metrics, speed, direction, pauseOnHover]);

  const loopText = unit.repeat(metrics.reps);

  return (
    <div ref={rootRef} className={`relative w-full overflow-hidden ${className}`.trim()} style={style}>
      <svg
        className="block w-full h-full"
        viewBox={`0 0 ${size.width} ${size.height}`}
        role="img"
        aria-label={text}
      >
        <path
          ref={pathRef}
          id={pathId}
          d={d}
          fill="none"
          style={{ stroke: ribbon ? ribbonColor : 'none' }}
          strokeWidth={ribbon ? ribbonWidth : 0}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <text ref={measureRef} className="invisible pointer-events-none" style={textStyle} aria-hidden="true">
          {unit}
        </text>

        <text
          className="select-none"
          style={{ ...textStyle, fill: color }}
          dominantBaseline="central"
          aria-hidden="true"
        >
          <textPath ref={headRef} href={`#${pathId}`} startOffset={0}>
            {loopText}
          </textPath>
        </text>

        <text
          className="select-none"
          style={{ ...textStyle, fill: color }}
          dominantBaseline="central"
          aria-hidden="true"
        >
          <textPath ref={tailRef} href={`#${pathId}`} startOffset={0}>
            {loopText}
          </textPath>
        </text>
      </svg>
    </div>
  );
};

export default TextLoop;
