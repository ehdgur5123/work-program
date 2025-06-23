"use client";
import { SymbolItem } from "@/app/symbols/types";
import SymbolList from "./SymbolList";
import { useEffect, useState } from "react";

interface SymbolListProps {
  symbols: SymbolItem[];
  mode: boolean;
}

export default function SymbolLists({ symbols, mode }: SymbolListProps) {
  // 기호를 복사합니다.
  const [symbolDataList, setSymbolDataList] = useState<SymbolItem[]>([]);

  const copySymbol = (symbol: string) => {
    navigator.clipboard.writeText(symbol);
    console.log(`Copied: ${symbol}`);
  };

  useEffect(() => {
    setSymbolDataList(symbols);
  }, [symbols]);

  return (
    <>
      {mode ? (
        <div className="grid grid-cols-8 gap-2">
          {symbols
            ? symbolDataList.map((symbol) => (
                <div
                  key={symbol._id}
                  className="border-1 pt-2 pl-2 pr-2 text-center hover:scale-110 active:scale-90"
                  onClick={() => copySymbol(symbol.symbol)}
                >
                  <div>{symbol.symbol}</div>
                  <div>{symbol.code}</div>
                </div>
              ))
            : null}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2">
          {symbols
            ? symbolDataList.map((symbol) => (
                <SymbolList
                  key={symbol._id}
                  symbol={symbol}
                  onUpdate={(updated) => {
                    setSymbolDataList((prev) =>
                      prev.map((item) =>
                        item._id === updated._id ? updated : item
                      )
                    );
                  }}
                  onDelete={(deletedId) => {
                    setSymbolDataList((prev) =>
                      prev.filter((item) => item._id !== deletedId)
                    );
                  }}
                />
              ))
            : null}
        </div>
      )}
    </>
  );
}
