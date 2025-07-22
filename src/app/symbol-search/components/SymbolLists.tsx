"use client";

import { SymbolItem, hambergerToggleListType } from "@/app/symbol-search/types";
import { useState } from "react";

interface SymbolListProps {
  symbols: SymbolItem[] | null;
  handleSymbol: (symbol: SymbolItem) => void;
  hambergerToggleList: hambergerToggleListType;
}

export default function SymbolLists({
  symbols,
  handleSymbol,
  hambergerToggleList,
}: SymbolListProps) {
  const [copiedSymbol, setCopiedSymbol] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const showToggleTrue =
    hambergerToggleList.symbolAddToggle ||
    hambergerToggleList.symbolUpdateToggle ||
    hambergerToggleList.symbolDeleteToggle;

  const symbolCopy = (symbol: string, event: React.MouseEvent) => {
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
      <div
        className={`grid grid-cols-4 items-center justify-center gap-3 ${
          showToggleTrue ? "md:grid-cols-5" : "md:grid-cols-8"
        }`}
      >
        {symbols?.map((symbol) => (
          <div
            key={symbol._id}
            onClick={(e) => {
              symbolCopy(symbol.symbol, e);
              handleSymbol(symbol);
            }}
            className="border-2 rounded-2xl flex flex-col gap-2 p-2 items-center justify-center hover:scale-110 active:scale-90 cursor-pointer"
          >
            <div className="text-2xl">{symbol.symbol}</div>
            <div className="text-sm">{symbol.code}</div>
          </div>
        ))}
      </div>
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
    </>
  );
}
