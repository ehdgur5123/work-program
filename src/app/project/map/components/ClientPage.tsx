import KakaoMap from "@/app/project/map/components/KakaoMap";
import LocationSearch from "@/app/project/map/components/LocationSearch";
import CoordinateSearch from "@/app/project/map/components/CoordinateSearch";

export default function ClientPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <LocationSearch />
      <CoordinateSearch />
      <KakaoMap />
    </div>
  );
}
