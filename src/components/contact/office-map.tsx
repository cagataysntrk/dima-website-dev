"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { Link as UiLink } from "@upcytech/ui";
import type { MapControlLabels } from "../vendor/mapcn/map";

// Client-rendered dynamically to keep MapLibre out of the SSR bundle.
const MapView = dynamic(() => import("./map-view").then((m) => m.MapView), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-raised" />,
});

/**
 * The office map. Loaded dynamically on the client with self-hosted MapLibre worker.
 */
export function OfficeMap({ coordinates, labels }: {
  coordinates: readonly [number, number] | null;
  labels: {
    label: string;
    openExternal: string;
    missing: string;
    controls: MapControlLabels;
  };
}) {
  if (!coordinates) {
    return (
      <div className="grid aspect-video place-items-center rounded-panel border border-dashed border-outline bg-raised p-card text-center text-ui text-muted">
        {labels.missing}
      </div>
    );
  }

  const [latitude, longitude] = coordinates;
  return (
    <div className="flex flex-col gap-3">
      <div
        role="region"
        aria-label={labels.label}
        className="relative aspect-video overflow-hidden rounded-panel border border-hairline bg-raised"
      >
        <MapView latitude={latitude} longitude={longitude} controls={labels.controls} />
      </div>
      <UiLink
        href={`https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=16/${latitude}/${longitude}`}
        variant="quiet"
        className="self-start text-ui pointer-coarse:inline-flex pointer-coarse:min-h-11 pointer-coarse:items-center"
      >
        {labels.openExternal}
      </UiLink>
    </div>
  );
}
