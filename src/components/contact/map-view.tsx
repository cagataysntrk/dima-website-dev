"use client";

import { Map, MapControls, MapMarker, MarkerContent, type MapControlLabels } from "../vendor/mapcn/map";

/**
 * The office on a map. Loaded dynamically (office-map.tsx) with CARTO tiles and MapLibre.
 * Cooperative gestures: scrolling the page past the map scrolls the page; zooming the map
 * takes a modifier key or two fingers.
 */
export function MapView({ latitude, longitude, controls }: {
  latitude: number;
  longitude: number;
  controls: MapControlLabels;
}) {
  return (
    <Map center={[longitude, latitude]} zoom={15} cooperativeGestures className="h-full w-full">
      <MapMarker longitude={longitude} latitude={latitude}>
        <MarkerContent>
          <span className="block size-4 rounded-full border-2 border-canvas bg-brand shadow-md" />
        </MarkerContent>
      </MapMarker>
      <MapControls labels={controls} />
    </Map>
  );
}
