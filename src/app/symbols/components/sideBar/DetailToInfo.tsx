"use client";

import { SymbolItemType } from "@/app/symbols/types";
import { useEffect, useState } from "react";

interface SymbolInfoProps {
  label: string;
  value?: string;
  element?: "div" | "input";
  dependencyData?: SymbolItemType | null;
  onChange?: (newValue: string) => void;
}

export default function InfoToSymbol({
  label,
  value,
  element,
  dependencyData,
  onChange,
}: SymbolInfoProps) {
  const [inputValue, setInputValue] = useState(value);

  // 다른 기호 선택 시, inputValue값 초기화
  useEffect(() => {
    setInputValue(value);
  }, [dependencyData]);

  // input값 변경 시, 부모 컴포넌트로 데이터 전달 handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="flex gap-2 w-64">
      <div className="border w-1/3 text-center p-1">{label}</div>
      {element === "input" ? (
        <input
          type="text"
          className="flex-1 bg-white py-1 px-2 w-40 text-black"
          value={inputValue}
          onChange={handleChange}
        />
      ) : (
        <div className="flex-1 border py-1 px-2 truncate w-2/3">{value}</div>
      )}
    </div>
  );
}
