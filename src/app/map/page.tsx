"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    kakao: {
      maps: {
        load: (callback: () => void) => void;
        LatLng: new (lat: number, lng: number) => { La: number; Ma: number };
        Map: new (
          container: HTMLElement | null,
          options: { center: { La: number; Ma: number }; level: number }
        ) => object;
      };
    };
  }
}

export default function KakaoMap() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.978), // 서울 좌표
          level: 3,
        };
        const test = new window.kakao.maps.Map(container, options);
        console.log("test: ", test);
      });
    };
    document.head.appendChild(script);
  }, []);

  return <div id="map" className="w-[500px] h-[400px]" />;
}
