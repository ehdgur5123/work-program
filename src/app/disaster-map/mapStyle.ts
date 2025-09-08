import { LayerProps } from "react-map-gl/mapbox";

export const pointLayer: LayerProps = {
  id: "point",
  type: "circle",
  filter: ["==", "$type", "Point"], // Point만 렌더
  paint: { "circle-radius": 10, "circle-color": "#007cbf" },
};

export const lineLayer: LayerProps = {
  id: "line",
  type: "line",
  filter: ["==", "$type", "LineString"], // LineString만
  paint: { "line-color": "#ff0000", "line-width": 2 },
};

export const polygonLayer: LayerProps = {
  id: "polygon",
  type: "fill",
  filter: ["==", "$type", "Polygon"], // Polygon만
  paint: { "fill-color": "#ff0000", "fill-opacity": 0.6 },
};
