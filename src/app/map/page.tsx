import KakaoMap from "@/app/map/components/KakaoMap";
import LocationSearch from "@/app/map/components/LocationSearch";
import CoordinateSearch from "@/app/map/components/CoordinateSearch";

export default function MapPage() {
  return (
    <div className="flex flex-row">
      <div className="flex-1">
        <h1 className="text-5xl text-center p-2 m-10">카카오 지도</h1>
        <div className="flex flex-col items-center justify-center gap-4">
          <LocationSearch />
          <CoordinateSearch />
          <KakaoMap />
        </div>
        <div className="h-20"></div>
      </div>
    </div>
  );
}
