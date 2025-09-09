"use client";

import { SymbolItemType } from "@/app/symbols/types";
import useCopySymbol from "../hooks/useCopySymbol";
import Tooltip from "../components/Tooltip";

interface SymbolItemProps {
  data: SymbolItemType;
}

export default function SymbolItem({ data }: SymbolItemProps) {
  const { copyData, tooltipPosition, symbolCopyClick } = useCopySymbol();

  return (
    <div
      className="flex flex-col gap-1 items-center justify-center border p-1 hover:bg-gray-500 active:scale-95 cursor-pointer"
      onClick={(event) => symbolCopyClick(data.symbol, event)}
    >
      <div className="text-2xl">{data.symbol}</div>
      <div className="text-sm">{data.code}</div>
      {copyData && tooltipPosition && (
        <Tooltip tooltipPosition={tooltipPosition} text="Copyed" />
      )}
    </div>
  );
}
