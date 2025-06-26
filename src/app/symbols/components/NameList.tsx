"use client";

import { fetchDeleteName } from "@/app/symbols/controllers/fetchSymbols";
import { SymbolItem } from "@/app/symbols/types";

interface NameListProps {
  symbol: SymbolItem;
  onNameUpdate: (updated: SymbolItem) => void;
}

export default function NameList({ symbol, onNameUpdate }: NameListProps) {
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

  return (
    <>
      {symbol.name.map((name, index) => (
        <div
          key={index}
          className="inline-flex items-center bg-gray-400 text-white text-sm rounded-full px-2 m-1 cursor-default select-none"
        >
          <span>{name}</span>
          <button
            onClick={() => deleteNameClick(name)}
            className="text-white text-lg ml-2 pl-1 pr-1 rounded-full cursor-pointer active:scale-70 hover:text-blue-500"
            aria-label={`Remove tag ${name}`}
          >
            ×
          </button>
        </div>
      ))}
    </>
  );
}
