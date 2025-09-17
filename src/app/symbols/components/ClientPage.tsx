"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSymbols } from "@/app/symbols/controllers/axiosSymbols";
import useSearch from "@/app/symbols/hooks/useSearch";
import Search from "@/app/symbols/components/Search";
import SymbolItemList from "@/app/symbols/components/SymbolItemList";
import { LoadingSpinner } from "@/app/components/Loading";
import useIsMobile from "@/app/hooks/useIsMobile";
import { SymbolItemType } from "@/app/symbols/types";
import SideBar from "./sideBar/SideBar";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

interface InitialDataProps {
  initialData?: SymbolItemType[];
}

export default function ClientPage({ initialData = [] }: InitialDataProps) {
  const {
    data: queryData,
    isLoading,
    isFetching,
  } = useQuery<SymbolItemType[]>({
    queryKey: ["symbols"],
    queryFn: getSymbols,
    initialData,
    staleTime: 1000 * 60 * 5, // 5분 동안 stale 처리 (필요 시 조절)
    refetchOnWindowFocus: false, // 필요하면 true로
  });

  // 쿼리에서 받은 데이터(캐시/서버 병합)
  const symbolItemList = queryData ?? [];
  const [isSideBar, setIsSideBar] = useState(false);
  const isMobile = useIsMobile();

  // useSearch에 원본 데이터 전달 (realtime 모드, 200ms debounce)
  const { searchValue, setSearchValue, handleSubmit, filteredData, mode } =
    useSearch(symbolItemList, { mode: "realtime", debounceMs: 200 });

  // 초기 로딩: SSR 데이터도 없고 useQuery가 로딩 중일 때만 스피너
  if (isLoading && (!initialData || initialData.length === 0)) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-row">
      <div className="flex-1">
        <h1 className="text-5xl text-center p-2 m-10">기호검색</h1>
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

          {/* 백그라운드 refetch 중일 때 얕은 알림 */}
          {isFetching && (
            <div className="text-sm text-gray-500 mb-2">
              데이터 업데이트 중…
            </div>
          )}

          <SymbolItemList symbolItemList={filteredData} />
        </div>

        <div className="h-20"></div>
      </div>
      {!isMobile && (
        <div className="sticky top-[15%] self-start right-0 border-2 rounded-l-2xl">
          <button
            className="cursor-pointer p-2 h-32"
            onClick={() => setIsSideBar(!isSideBar)}
          >
            {isSideBar ? (
              <ChevronRightIcon className="size-6" />
            ) : (
              <ChevronLeftIcon className="size-6" />
            )}
          </button>
        </div>
      )}
      {isMobile
        ? null
        : isSideBar && (
            <div className="w-1/3 border-4 min-w-[440px]">
              <SideBar />
            </div>
          )}
    </div>
  );
}
