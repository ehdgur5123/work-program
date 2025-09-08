"use client";
import DisasterMap from "../components/DisasterMap";
import GeocodeSearch from "@/app/disaster-map/components/GeocodeSearch";
import useGeojson from "../hooks/useGeojson";

export default function ClientPage() {
  const { geojson, setGeojson, resetGeojson } = useGeojson();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2"></div>
      <button
        type="button"
        onClick={resetGeojson}
        className="p-2 cursor-pointer bg-red-500"
      >
        리셋버튼
      </button>
      <GeocodeSearch setGeojson={setGeojson} />
      <DisasterMap geojson={geojson} />
    </div>
  );
}
