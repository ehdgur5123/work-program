"use client";

import { SymbolItemType } from "@/app/symbols/types";
import SymbolItem from "@/app/symbols/components/SymbolItem";
import useIsMobile from "@/app/hooks/useIsMobile";

interface SymbolItemListProps {
  symbolItemList: SymbolItemType[];
}

export default function SymbolItemList({
  symbolItemList,
}: SymbolItemListProps) {
  const isMobile = useIsMobile();

  return (
    <div className={`grid gap-2 ${isMobile ? "grid-cols-4" : "grid-cols-8"}`}>
      {symbolItemList.map((item) => (
        <SymbolItem data={item} />
      ))}
    </div>
  );
}
