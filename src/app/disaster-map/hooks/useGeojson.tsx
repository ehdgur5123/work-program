"use client";

import { useState } from "react";
import { FeatureCollection, Geometry, GeoJsonProperties } from "geojson";

type GeoJSONFeatureCollection = FeatureCollection<Geometry, GeoJsonProperties>;

export default function useGeojson() {
  const initGeojson: GeoJSONFeatureCollection = {
    type: "FeatureCollection",
    features: [],
  };
  const [geojson, setGeojson] = useState<GeoJSONFeatureCollection>(initGeojson);

  const resetGeojson = () => setGeojson(initGeojson);

  return {
    geojson,
    setGeojson,
    resetGeojson,
  };
}
