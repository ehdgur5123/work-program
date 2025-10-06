"use client";
import { useKakaoMapStore } from "@/app/map/stores/useKakaoMapStore";
import { useState } from "react";

export default function CoordinateSearch() {
  const initialCoordinate = useKakaoMapStore(
    (state) => state.initialCoordinate
  );
  const setCoordinate = useKakaoMapStore((state) => state.setCoordinate);
  const [inputValue, setInputValue] = useState(initialCoordinate);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(inputValue);
    setCoordinate(inputValue);
  };

  return (
    <form
      className="flex gap-2 items-center justify-end"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <label htmlFor="lat" className="w-10">
            위도
          </label>
          <input
            id="lat"
            type="number"
            step="0.0001"
            className="bg-white text-black pl-2"
            value={inputValue.lat}
            onChange={(e) =>
              setInputValue((prev) => ({
                ...prev,
                lat: parseFloat(e.target.value),
              }))
            }
          />
        </div>
        <div className="flex gap-2">
          <label htmlFor="lng" className="w-10">
            경도
          </label>
          <input
            id="lng"
            type="number"
            step="0.0001"
            className="bg-white text-black pl-2"
            value={inputValue.lng}
            onChange={(e) =>
              setInputValue((prev) => ({
                ...prev,
                lng: parseFloat(e.target.value),
              }))
            }
          />
        </div>
      </div>
      <button
        type="submit"
        className="p-2 border rounded-2xl bg-amber-950 h-16"
      >
        검색
      </button>
    </form>
  );
}
