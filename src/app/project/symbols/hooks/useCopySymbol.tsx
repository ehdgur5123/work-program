"use client";
import { useState } from "react";

// 기호 클릭 시, 해당 기호를 복사하는 커스텀훅
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
