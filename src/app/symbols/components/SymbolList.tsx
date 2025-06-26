"use client";
import { SymbolItem } from "@/app/symbols/types";
import { useState } from "react";
import {
  fetchAddName,
  fetchDeleteSymbol,
} from "@/app/symbols/controllers/fetchSymbols";
import NameList from "./NameList";
import { fetchDeleteName } from "@/app/symbols/controllers/fetchSymbols";

interface SymbolListProps {
  symbol: SymbolItem;
  onNameUpdate: (updated: SymbolItem) => void;
  onSymbolDelete: (deletedId: string) => void;
}

export default function SymbolList({
  symbol,
  onNameUpdate,
  onSymbolDelete,
}: SymbolListProps) {
  const [value, setValue] = useState("");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      alert("값을 입력해주세요.");
    } else if (symbol.name.includes(trimmedValue)) {
      alert(`${trimmedValue}가 이미 있습니다`);
    } else {
      const optimistic = { ...symbol, name: [...symbol.name, trimmedValue] };
      onNameUpdate(optimistic);
      setValue("");
      try {
        const updated = await fetchAddName(symbol._id, trimmedValue);
        if (updated) {
          onNameUpdate(updated);
        }
      } catch {
        alert("추가 실패했습니다");
        onNameUpdate(symbol);
      }
    }
  };

  const deleteNameClick = async (nameToDelete: string) => {
    // 먼저 UI 업데이트 (낙관적 처리)
    onNameUpdate({
      ...symbol, // 전달받은 symbol 객체가 있다면
      name: symbol.name.filter((name) => name !== nameToDelete),
    });

    try {
      const updated = await fetchDeleteName(symbol._id, nameToDelete);
      if (updated) {
        onNameUpdate(updated); // 서버 최종 반영 결과로 덮어쓰기
      }
    } catch {
      alert("삭제 실패");
      onNameUpdate(symbol);
    }
  };

  const deleteSymbolClick = async () => {
    const confirmText = prompt(
      "정말 삭제하시겠습니까? 삭제하려면 '삭제'를 입력하세요."
    );

    if (confirmText !== "삭제") {
      alert("삭제가 취소되었습니다.");
      return;
    }

    try {
      onSymbolDelete(symbol._id);
      await fetchDeleteSymbol(symbol._id);
    } catch {
      alert("삭제 실패");
      // 삭제 실패 시, 추가하는 코드 구현 필요
    }
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
        <NameList symbol={symbol} deleteNameClick={deleteNameClick} />
      </div>

      {/* 삭제 버튼 */}
      <div className="col-start-6 flex items-center justify-end">
        <div
          className="hover:text-gray-500 rounded-full text-3xl mr-2 active:scale-80"
          onClick={deleteSymbolClick}
        >
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
