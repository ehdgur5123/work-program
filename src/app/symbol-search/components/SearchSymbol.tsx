"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useState, useRef } from "react";

interface SearchSymbolProps {
  handleSearch: (searchValue: string) => void;
}
export default function SearchSymbol({ handleSearch }: SearchSymbolProps) {
  const [inputValue, setInputValue] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const searchValueSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedValue = inputValue.trim();
    if (!trimmedValue) {
      alert("검색어를 입력하세요");
    } else {
      handleSearch(trimmedValue);
      setInputValue("");
    }
  };

  return (
    <>
      <form
        onSubmit={searchValueSubmit}
        className="p-2 flex gap-3 items-center"
      >
        <label htmlFor="search" className="text-2xl">
          검색
        </label>
        <input
          id="search"
          className="bg-white text-black pl-2 py-1 w-40"
          value={inputValue}
          ref={inputRef}
          spellCheck={false}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          type="submit"
          className="cursor-pointer rounded-lg w-6 hover:text-gray-500 active:scale-80"
        >
          <MagnifyingGlassIcon className="size-7" />
        </button>
      </form>
    </>
  );
}
