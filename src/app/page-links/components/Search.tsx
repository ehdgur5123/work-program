"use client";

import { useState } from "react";
import { ArrowTurnDownLeftIcon } from "@heroicons/react/24/solid";

interface SearchProps {
  handleSearch: (search: string) => void;
}
export default function Search({ handleSearch }: SearchProps) {
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchValue.length === 0) {
      alert("검색어를 입력하세요.");
    } else if (searchValue.length >= 50) {
      alert("글자수는 50자 이내로 작성하세요.");
    } else {
      handleSearch(searchValue);
    }
    setSearchValue("");
  };

  return (
    <form
      className="flex gap-3 justify-center items-center"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="search"
        className="bg-white h-8 text-black pl-2"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button className="hover:text-gray-500 active:scale-90 cursor-pointer">
        <ArrowTurnDownLeftIcon className="size-8" />
      </button>
    </form>
  );
}
