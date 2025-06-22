"use client";

import { useState } from "react";
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

  const handleSearch = async (search: string) => {
    const newSymbols = await fetchSymbols(search);
    if (newSymbols) setSymbols(newSymbols);
    else setSymbols([]); // 에러 시 빈 배열 처리
  };

  return (
    <div className="flex flex-col w-180 justify-center gap-10">
      <div className="flex justify-between items-center">
        <Search handleSearch={handleSearch} />
        <button className="p-2 border-1" onClick={() => setMode(!mode)}>
          {mode ? "Copy Mode" : "Tag Mode"}
        </button>
      </div>
      <div>
        <SymbolLists symbols={symbols} mode={mode} />
      </div>
    </div>
  );
}
