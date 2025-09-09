"use client";
import { useState } from "react";
export default function useCopySymbol() {
  const [copyData, setCopyData] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const symbolCopyClick = (symbol: string, event: React.MouseEvent) => {
    navigator.clipboard.writeText(symbol);
    setCopyData(symbol);
    setTooltipPosition({ x: event.clientX, y: event.clientY });

    setTimeout(() => {
      setCopyData(null);
      setTooltipPosition(null);
    }, 500);
  };

  return {
    copyData,
    tooltipPosition,
    symbolCopyClick,
  };
}
