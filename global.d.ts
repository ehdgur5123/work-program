// global.d.ts
export {}; // 이 파일을 모듈로 취급하여 declare global 사용을 안정화

// 장소 검색 결과 타입
interface KakaoPlace {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string; // longitude as string
  y: string; // latitude as string
}

declare namespace kakao {
  namespace maps {
    /**
     * 지도 SDK가 로드된 이후에 콜백을 실행하도록 하는 함수
     */
    function load(callback: () => void): void;

    /**
     * LatLng 클래스
     */
    class LatLng {
      constructor(lat: number, lng: number);
      getLat(): number;
      getLng(): number;
      toString(): string;
    }

    /**
     * Map 옵션 타입
     */
    type MapTypeId = "ROADMAP" | "HYBRID" | "TERRAIN" | string;

    interface MapOptions {
      center: LatLng;
      level?: number;
      mapTypeId?: MapTypeId;
      // 필요시 추가 옵션을 여기에 선언하세요
    }

    /**
     * Map 클래스 (자주 쓰이는 메서드만 선언)
     */
    class Map {
      constructor(container: HTMLElement | null, options?: MapOptions);
      setCenter(latlng: LatLng): void;
      panTo(latlng: LatLng): void;
      setLevel(level: number): void;
      getLevel(): number;
      getContainer(): HTMLElement | null;
    }

    namespace services {
      /**
       * 상태 상수 (값은 런타임에 문자열로 전달됩니다)
       * 키/값 모두 'OK' | 'ZERO_RESULT' | 'ERROR' 로 설정
       */
      const Status: {
        OK: "OK";
        ZERO_RESULT: "ZERO_RESULT";
        ERROR: "ERROR";
      };

      /**
       * Places 클래스: keywordSearch 콜백의 status 타입은 Status의 키들입니다.
       */
      class Places {
        constructor();
        keywordSearch(
          keyword: string,
          callback: (data: KakaoPlace[], status: keyof typeof Status) => void,
          options?: { location?: LatLng; radius?: number }
        ): void;

        // 필요하면 다른 메서드도 선언하세요 (categorySearch 등)
      }
    }
  }
}

/**
 * 전역 kakao 변수 선언 — namespace kakao에 정의한 타입을 실제 전역 값으로 연결
 * 이 선언으로 `kakao`와 `window.kakao` 모두 인식됩니다.
 */
declare var kakao: typeof kakao;

declare global {
  interface Window {
    kakao: typeof kakao;
  }
}
