"use client";

import { SymbolItem } from "@/app/symbols/types";

interface NameListProps {
  symbol: SymbolItem;
  deleteNameClick: (name: string) => void;
}

export default function NameList({ symbol, deleteNameClick }: NameListProps) {
  const handleClick = (name: string) => {
    deleteNameClick(name);
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
            onClick={() => handleClick(name)}
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
