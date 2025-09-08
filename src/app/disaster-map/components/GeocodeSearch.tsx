"use client";
import { getGeoCodeSearch } from "@/app/disaster-map/controllers/GeoCodeAPI";
import { useState } from "react";
import { FeatureCollection, Geometry, GeoJsonProperties } from "geojson";

interface GeocodeSearchProps {
  setGeojson: React.Dispatch<
    React.SetStateAction<FeatureCollection<Geometry, GeoJsonProperties>>
  >;
}

export default function GeocodeSearch({ setGeojson }: GeocodeSearchProps) {
  const [value, setValue] = useState("");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await getGeoCodeSearch(value);

      setGeojson((prev) => ({
        ...prev,
        features: [...prev.features, ...response.features],
      }));
    } catch {
      console.log("응답 오류 발생");
    } finally {
      setValue("");
    }
  };

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        className="bg-white flex-1 text-black pl-2"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="p-2 bg-gray-500 cursor-pointer">
        검색
      </button>
    </form>
  );
}
