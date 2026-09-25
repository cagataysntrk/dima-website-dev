"use client";

import * as React from "react";
import { themes } from "@upcytech/tokens/native";

/**
 * The two effects the product's chat screen draws with third-party components, loaded the way
 * the product loads them — on the client only — and kept out of the page's first-load JS
 * (dynamic imports, ~15 kB each): `thinking-orbs` for the assistant's face, `border-beam` for
 * the light running round the first composer. Both render a same-sized stand-in until they
 * arrive, so nothing shifts.
 */

const LazyOrb = React.lazy(() => import("thinking-orbs").then((m) => ({ default: m.ThinkingOrb })));
const LazyBeam = React.lazy(() => import("border-beam").then((m) => ({ default: m.BorderBeam })));

/** The product passes its brand violet; this is the brand token's value, not a literal. */
const ORB_INK = themes["dima.light"].colorBgBrand;

function useMounted() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return mounted;
}

/**
 * The assistant's face: a dotted sphere — scanning while an answer is worked out, breathing
 * once it has settled (a still icon there read as a crash). It follows the site's data-theme on
 * its own; under reduced motion it draws one still frame.
 */
export function Orb({ pending }: { pending: boolean }) {
  const mounted = useMounted();
  return (
    <span aria-hidden="true" className="mt-0.5 flex size-7 shrink-0 items-center justify-center">
      {mounted && (
        <React.Suspense fallback={null}>
          <LazyOrb state={pending ? "searching" : "breathing"} size={32} color={ORB_INK} />
        </React.Suspense>
      )}
    </span>
  );
}

/**
 * The product's hero composer: a rainbow light travelling round its border. `ready` is the
 * panel's hydration flag, not state of this component's own: the hero remounts on every new
 * chat, and a fresh mount that first rendered bare and then wrapped would remount the textarea
 * inside — and drop the focus a new chat puts there.
 */
export function Beam({ dark, ready, children }: { dark: boolean; ready: boolean; children: React.ReactElement }) {
  if (!ready) return children;
  return (
    <React.Suspense fallback={children}>
      <LazyBeam size="md" colorVariant="colorful" theme={dark ? "dark" : "light"} strength={0.85} borderRadius={28}>
        {children}
      </LazyBeam>
    </React.Suspense>
  );
}
