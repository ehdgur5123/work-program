"use client";
import { useKakaoMapStore } from "@/app/map/stores/useKakaoMapStore";
import { useState } from "react";

export default function LocationSearch() {
  const setCoordinate = useKakaoMapStore((state) => state.setCoordinate);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!window.kakao || !window.kakao.maps) return;
    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(inputValue, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK && data.length > 0) {
        // 첫 번째 검색 결과 사용
        const result = data[0];
        setCoordinate({
          lat: parseFloat(result.y),
          lng: parseFloat(result.x),
        });
      }
    });
  };

  return (
    <form
      className="flex gap-2 items-center justify-end"
      onSubmit={handleSubmit}
    >
      <label htmlFor="place">장소</label>
      <input
        id="place"
        type="text"
        className="bg-white text-black pl-2"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit" className="p-2 border rounded-2xl bg-amber-950">
        검색
      </button>
    </form>
  );
}
