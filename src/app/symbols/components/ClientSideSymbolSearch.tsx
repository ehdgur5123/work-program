"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useEffect, useState } from "react";
import { fetchSymbols } from "@/app/symbols/controllers/fetchSymbols";
import SymbolLists from "./SymbolLists";
import Search from "./Search";
import { SymbolItem } from "@/app/symbols/types";

interface ClientSideSymbolSearchProps {
  initialSymbols: SymbolItem[];
}

export default function ClientSideSymbolSearch({
  initialSymbols,
}: ClientSideSymbolSearchProps) {
  const [symbols, setSymbols] = useState<SymbolItem[]>(initialSymbols);
  const [mode, setMode] = useState(true);
  const [searchValue, setSearchValue] = useState(true);
  const handleSearch = async (search: string) => {
    const newSymbols = await fetchSymbols(search);
    if (Array.isArray(newSymbols) && newSymbols.length > 0) {
      setSymbols(newSymbols);
      setSearchValue(true); // 검색 결과 있음
    } else if (Array.isArray(newSymbols) && newSymbols.length === 0) {
      setSearchValue(false); // 검색 결과 없음
      setSymbols([]);
    } else {
      setSymbols([]); // 에러 혹은 예외 상황
      setSearchValue(false);
    }
  };

  return (
    <div className="flex flex-col w-180 justify-center gap-10">
      <div className="flex justify-between items-center">
        <Search handleSearch={handleSearch} />
        <div className="flex flex-row gap-2">
          <button
            className="text-sm p-1 border-1 cursor-pointer hover:text-blue-100 active:scale-90"
            onClick={() => {
              setSymbols(initialSymbols);
              setSearchValue(true);
            }}
          >
            전체보기
          </button>
          <button className="text-sm p-1 border-1 cursor-pointer hover:text-blue-100 active:scale-90">
            기호추가
          </button>
          <button
            className="text-sm p-1 border-1 cursor-pointer hover:text-blue-100 active:scale-90"
            onClick={() => setMode(!mode)}
          >
            {mode ? "카피모드" : "태그모드"}
          </button>
        </div>
      </div>
      <div>
        {searchValue ? (
          <SymbolLists symbols={symbols} mode={mode} />
        ) : (
          <div className="flex items-center justify-center">
            <DotLottieReact
              src="https://lottie.host/7568b83c-65f6-4a6b-bd4a-1bdbc2b65276/lgWezNYmwt.lottie"
              loop
              autoplay
              style={{ width: 600, height: 400 }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
