"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { useDeferredDecoration } from "./use-deferred-decoration";

/** Tailwind's `lg`. Below it the column is hidden — and hidden is not enough: a mounted
 *  WebGL canvas keeps rendering under display:none, so the globe must not mount at all. */
const WIDE = "(min-width: 64rem)";

function useWide() {
  const [wide, setWide] = React.useState(false);
  React.useEffect(() => {
    const query = matchMedia(WIDE);
    const update = () => setWide(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return wide;
}

/** cobe (WebGL): kept out of the page bundle and off the server. */
const Globe = dynamic(() => import("./globe").then((m) => m.Globe), { ssr: false });

/**
 * The globe to the right of the home headline, as on Stripe's home page: larger than its column
 * and running off the right edge, where the hero's overflow crops it (D-038).
 *
 * Decoration only: hidden from assistive technology; it waits for load and idle (above the
 * fold, an in-view gate would fire at once and compete with LCP) and never loads under data
 * saver; under reduced motion it loads but holds still. It stops rendering off screen. The
 * square is reserved before the canvas arrives, so nothing shifts when it does. It takes the
 * pointer back from the hero's text layer, so it can be dragged.
 */
export function HeroGlobe({ className = "" }: { className?: string }) {
  const { on } = useDeferredDecoration({ stillUnderReducedMotion: true });
  const wide = useWide();

  return (
    <div aria-hidden="true" className={`relative aspect-square w-full ${className}`}>
      {on && wide && (
        <div className="pointer-events-auto absolute top-1/2 left-[10%] aspect-square w-[130%] -translate-y-1/2 transition-opacity duration-1000 ease-out starting:opacity-0">
          <Globe className="size-full" />
        </div>
      )}
    </div>
  );
}
