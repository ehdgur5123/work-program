"use client";
import { LoadingSpinner } from "@/app/components/Loading";
import { getSymbols } from "@/app/symbols/controllers/axiosSymbols";
import { useQuery } from "@tanstack/react-query";
import { SymbolItemType } from "@/app/symbols/types";
import SymbolItemList from "@/app/symbols/components/SymbolItemList";
import useIsMobile from "@/app/hooks/useIsMobile";

interface InitialDataProps {
  initialData: SymbolItemType[];
}

export default function ClientPage({ initialData }: InitialDataProps) {
  const { data: symbolItemList, isFetching } = useQuery<SymbolItemType[]>({
    queryKey: ["symbols"],
    queryFn: getSymbols,
    initialData, // SSR 데이터 → 클라이언트 캐시 초기화
  });
  const isMobile = useIsMobile();
  if (isFetching) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="text-5xl text-center p-2 m-10">기호검색</h1>
      <div className={`${isMobile ? "mx-3" : "w-3xl mx-auto"}`}>
        <SymbolItemList symbolItemList={symbolItemList} />
      </div>
    </div>
  );
}
