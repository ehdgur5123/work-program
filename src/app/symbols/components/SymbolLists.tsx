"use client";
import { SymbolItem } from "@/app/symbols/types";
import SymbolList from "./SymbolList";

interface SymbolListProps {
  symbols: SymbolItem[];
  setSymbols: React.Dispatch<React.SetStateAction<SymbolItem[]>>;
  mode: boolean;
}

export default function SymbolLists({
  symbols,
  setSymbols,
  mode,
}: SymbolListProps) {
  // 기호를 복사합니다.
  const copySymbol = (symbol: string) => {
    navigator.clipboard.writeText(symbol);
    console.log(`Copied: ${symbol}`);
  };

  return (
    <>
      {mode ? (
        <div className="grid md:grid-cols-8 grid-cols-4 gap-2">
          {symbols
            ? symbols.map((symbol) => (
                <div
                  key={symbol._id}
                  className="border-1 md:pt-2 md:pl-2 md:pr-2 text-center hover:scale-110 active:scale-90 rounded-2xl"
                  onClick={() => copySymbol(symbol.symbol)}
                >
                  <div className="pt-1">{symbol.symbol}</div>
                  <div className="text-xs md:text-sm p-1">{symbol.code}</div>
                </div>
              ))
            : null}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2">
          {symbols
            ? symbols.map((symbol) => (
                <SymbolList
                  key={symbol._id}
                  symbol={symbol}
                  onNameUpdate={(updated) => {
                    setSymbols((prev) =>
                      prev.map((item) =>
                        item._id === updated._id ? updated : item
                      )
                    );
                  }}
                  onSymbolDelete={(deletedId) => {
                    setSymbols((prev) =>
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
