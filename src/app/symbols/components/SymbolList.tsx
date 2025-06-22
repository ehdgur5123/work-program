"use client";
import { SymbolItem } from "@/app/symbols/types";
import { useState } from "react";
import { fetchAddName } from "@/app/symbols/controllers/fetchSymbols";
import NameList from "./NameList";

interface SymbolListProps {
  symbol: SymbolItem;
  onUpdate: (updated: SymbolItem) => void;
}

export default function SymbolList({ symbol, onUpdate }: SymbolListProps) {
  const [value, setValue] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      alert("값을 입력해주세요.");
    } else if (symbol.name.includes(trimmedValue)) {
      alert(`${trimmedValue}가 이미 있습니다`);
    } else {
      try {
        await fetchAddName(symbol._id, trimmedValue);
        const optimistic = { ...symbol, name: [...symbol.name, trimmedValue] };
        onUpdate(optimistic);
      } catch {
        alert("추가 실패했습니다");
      }
    }
    setValue("");
  };

  return (
    <div className="border border-gray-300 rounded-xl shadow-sm p-4 grid grid-rows-6 grid-cols-6 gap-2 text-center">
      {/* 심볼 크게 표시 */}
      <div className="row-start-1 row-span-3 col-span-2 flex text-6xl text-black items-center justify-center border rounded-md bg-gray-100">
        {symbol.symbol}
      </div>

      {/* 유니코드 */}
      <p className="row-start-4 col-start-1 col-span-1 p-2 font-semibold text-sm text-gray-600">
        유니코드
      </p>
      <div className="row-start-4 col-start-2 col-span-4 p-2 text-left text-sm">
        {symbol.unicode}
      </div>

      {/* HTML */}
      <p className="row-start-5 col-start-1 p-2 font-semibold text-sm text-gray-600">
        html
      </p>
      <div className="row-start-5 col-start-2 col-span-4 p-2 text-left text-sm">
        {symbol.html}
      </div>

      {/* Alt Code */}
      <p className="row-start-6 col-start-1 p-2 font-semibold text-sm text-gray-600">
        alt Code
      </p>
      <div className="row-start-6 col-start-2 col-span-4 p-2 text-left text-sm">
        {symbol.code}
      </div>

      {/* 태그 영역 */}
      <div className="col-start-3 row-start-1 row-span-1 text-lg font-semibold text-gray-600 flex items-center justify-start ml-3">
        태그
      </div>
      <div className="col-start-3 col-span-4 row-start-2 row-span-4 p-2 border border-dashed rounded-md text-left text-sm overflow-auto max-h-[168px]">
        <NameList symbol={symbol} onUpdatedSymbol={onUpdate} />
      </div>

      {/* 삭제 버튼 */}
      <div className="col-start-6 flex items-center justify-end">
        <div className="hover:text-gray-500 rounded-full text-3xl mr-2 active:scale-80">
          ×
        </div>
      </div>
      {/* 태그 추가 폼 */}
      <form
        className="col-span-4 row-start-6 col-start-3 flex justify-end items-center gap-3"
        onSubmit={handleSubmit}
      >
        <label htmlFor="add_tag" className="text-sm">
          추가
        </label>
        <input
          type="text"
          id="add_tag"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="bg-white text-black border px-2 py-1 rounded text-sm"
        />
        <button
          type="submit"
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm cursor-pointer hover:bg-blue-400 active:bg-blue-200"
        >
          확인
        </button>
      </form>
    </div>
  );
}
