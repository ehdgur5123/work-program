"use client";

import { SymbolItemType } from "@/app/project/symbols/types";
import useCopySymbol from "../hooks/useCopySymbol";
import CopyTooltip from "./CopyTooltip";
import { useSymbolStore } from "../stores/useSymbolStore";

interface SymbolItemProps {
  data: SymbolItemType;
}

export default function SymbolItem({ data }: SymbolItemProps) {
  const { copyData, tooltipPosition, symbolCopyClick } = useCopySymbol();
  const { setSymbolData } = useSymbolStore();

  return (
    <div
      className="flex flex-col gap-1 items-center justify-center border p-1 hover:bg-gray-500 active:scale-95 cursor-pointer"
      onClick={(event) => {
        symbolCopyClick(data.symbol, event);
        setSymbolData(data);
      }}
    >
      <div className="text-2xl">{data.symbol}</div>
      <div className="text-sm">{data.code}</div>
      {copyData && tooltipPosition && (
        <CopyTooltip tooltipPosition={tooltipPosition} text="Copyed" />
      )}
    </div>
  );
}
