"use client";

import { SymbolItemType } from "@/app/symbols/types";
import { useEffect, useState } from "react";

interface SymbolInfoProps {
  label: string;
  value?: string;
  element?: "div" | "input";
  dependencyData?: SymbolItemType | null;
}

export default function InfoToSymbol({
  label,
  value,
  element,
  dependencyData,
}: SymbolInfoProps) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [dependencyData]);

  return (
    <div className="flex gap-2 w-64">
      <div className="border w-1/3 text-center p-1">{label}</div>
      {element === "input" ? (
        <input
          type="text"
          className="flex-1 bg-white py-1 px-2 w-40 text-black"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      ) : (
        <div className="flex-1 border py-1 px-2 truncate w-2/3">{value}</div>
      )}
    </div>
  );
}
