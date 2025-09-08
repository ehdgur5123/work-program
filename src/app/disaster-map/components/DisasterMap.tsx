"use client";

import Map, { Source, Layer } from "react-map-gl/mapbox";
import { FeatureCollection, Geometry, GeoJsonProperties } from "geojson";
import { useState } from "react";
import {
  pointLayer,
  lineLayer,
  polygonLayer,
} from "@/app/disaster-map/mapStyle";

const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

interface DisasterMapProps {
  geojson: FeatureCollection<Geometry, GeoJsonProperties>;
}

export default function DisasterMap({ geojson }: DisasterMapProps) {
  const [hoverCoord, setHoverCoord] = useState<[number, number] | null>(null);

  return (
    <div style={{ position: "relative" }}>
      <Map
        initialViewState={{
          longitude: 129.2718960742052,
          latitude: 35.97238682393826,
          zoom: 6,
        }}
        style={{ width: "100%", height: "500px" }}
        mapStyle="mapbox://styles/mapbox/streets-v11?language=ko"
        mapboxAccessToken={mapboxAccessToken}
        onMouseMove={(evt) => {
          if (evt.lngLat) setHoverCoord([evt.lngLat.lng, evt.lngLat.lat]);
        }}
        onMouseLeave={() => setHoverCoord(null)}
      >
        <Source id="my-data" type="geojson" data={geojson}>
          <Layer {...pointLayer} />
          <Layer {...lineLayer} />
          <Layer {...polygonLayer} />
        </Source>

        {hoverCoord && (
          <div
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              padding: "4px 8px",
              background: "black",
              color: "white",
              borderRadius: "4px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
            }}
          >
            Lon: {hoverCoord[0].toFixed(5)}, Lat: {hoverCoord[1].toFixed(5)}
          </div>
        )}
      </Map>
    </div>
  );
}
