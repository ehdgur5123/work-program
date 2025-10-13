"use client";
import { useEffect } from "react";
import { useKakaoMapStore } from "@/app/project/map/stores/useKakaoMapStore";

const kakaoMapQuery = {
  appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_KEY,
  autoload: false,
};

export default function KakaoMap() {
  const coordinate = useKakaoMapStore((state) => state.coordinate);

  useEffect(() => {
    const initializeMap = () => {
      const container = document.getElementById("map");
      if (!container) return;

      const options = {
        center: new window.kakao.maps.LatLng(coordinate.lat, coordinate.lng),
        level: 10,
      };

      new window.kakao.maps.Map(container, options);
    };

    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        initializeMap();
      });
    } else {
      const script = document.createElement("script");
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapQuery.appkey}&autoload=${kakaoMapQuery.autoload}&libraries=services`;
      script.async = true;
      script.onload = () => {
        window.kakao.maps.load(() => {
          initializeMap();
        });
      };
      document.head.appendChild(script);
    }
  }, [coordinate]); // ← coordinate가 바뀔 때마다 지도 초기화

  return <div id="map" className="w-full h-80" />;
}
