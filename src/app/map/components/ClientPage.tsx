import KakaoMap from "@/app/map/components/KakaoMap";
import LocationSearch from "@/app/map/components/LocationSearch";
import CoordinateSearch from "@/app/map/components/CoordinateSearch";

export default function ClientPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <LocationSearch />
      <CoordinateSearch />
      <KakaoMap />
    </div>
  );
}
