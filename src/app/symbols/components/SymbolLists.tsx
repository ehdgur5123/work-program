"use client";
import { SymbolItem } from "@/app/symbols/types";
import SymbolList from "./SymbolList";
import { useState } from "react";

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
  // 기호 복사
  const [copiedSymbol, setCopiedSymbol] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const copySymbol = (symbol: string, event: React.MouseEvent) => {
    navigator.clipboard.writeText(symbol);
    setCopiedSymbol(symbol);
    setTooltipPosition({ x: event.clientX, y: event.clientY });

    setTimeout(() => {
      setCopiedSymbol(null);
      setTooltipPosition(null);
    }, 500);
  };

  return (
    <>
      {copiedSymbol && tooltipPosition && (
        <div
          style={{
            position: "fixed",
            left: tooltipPosition.x + 10,
            top: tooltipPosition.y + 10,
            background: "black",
            color: "white",
            padding: "6px 12px",
            borderRadius: "8px",
            fontSize: "14px",
            zIndex: 9999,
            pointerEvents: "none",
          }}
        >
          Copyed!
        </div>
      )}
      {mode ? (
        <div className="grid md:grid-cols-8 grid-cols-4 gap-2">
          {symbols
            ? symbols.map((symbol) => (
                <div
                  key={symbol._id}
                  className="flex flex-col min-h-20 justify-center gap-2 min-w-20 border-1 md:pt-2 md:pl-2 md:pr-2 text-center hover:scale-110 active:scale-90 rounded-2xl"
                  onClick={(e) => copySymbol(symbol.symbol, e)}
                >
                  <div className="min-h-8 inline-block pt-1">
                    {symbol.symbol}
                  </div>
                  <div className="inline-block text-xs md:text-sm p-1">
                    {symbol.code}
                  </div>
                </div>
              ))
            : null}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
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
