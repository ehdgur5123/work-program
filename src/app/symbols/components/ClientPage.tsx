"use client";

import useSearch from "@/app/symbols/hooks/useSearch";
import Search from "@/app/symbols/components/Search";
import SymbolItemList from "@/app/symbols/components/SymbolItemList";
import useIsMobile from "@/app/hooks/useIsMobile";
import useGetSymbols from "../hooks/useGetSymbols";
import SymbolItemListLoading from "@/app/symbols/components/SymbolItemListLoading";

export default function ClientPage() {
  const { symbolItemList, isSymbolLoading } = useGetSymbols();
  const isMobile = useIsMobile();

  // useSearch에 원본 데이터 전달 (realtime 모드, 200ms debounce)
  const { searchValue, setSearchValue, handleSubmit, filteredData, mode } =
    useSearch(symbolItemList, { mode: "realtime", debounceMs: 200 });

  return (
    <div className="flex flex-row">
      <div className="flex-1">
        <div
          className={`flex flex-col gap-2 ${
            isMobile ? "mx-3" : "mx-auto w-2/3"
          }`}
        >
          <div className="flex flex-row justify-end">
            <Search
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              handleSubmit={handleSubmit}
              mode={mode}
            />
          </div>
          {isSymbolLoading ? (
            <SymbolItemListLoading />
          ) : (
            <SymbolItemList symbolItemList={filteredData} />
          )}
        </div>
      </div>
    </div>
  );
}
