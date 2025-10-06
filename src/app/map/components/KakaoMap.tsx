"use client";
import { useEffect } from "react";
import { useKakaoMapStore } from "@/app/map/stores/useKakaoMapStore";

declare global {
  interface Window {
    kakao: {
      maps: {
        load: (callback: () => void) => void;
        LatLng: new (lat: number, lng: number) => object;
        Map: new (
          container: HTMLElement | null,
          options: { center: object; level: number }
        ) => object;
      };
    };
  }
}

const kakaoMapQuery = {
  appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_KEY,
  autoload: false,
};

export default function KakaoMap() {
  const coordinate = useKakaoMapStore((state) => state.coordinate);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapQuery.appkey}&autoload=${kakaoMapQuery.autoload}`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(coordinate.lat, coordinate.lng),
          level: 3,
        };
        new window.kakao.maps.Map(container, options);
      });
    };
    document.head.appendChild(script);
  }, []);

  return <div id="map" className="w-1/2 h-[600px]" />;
}
