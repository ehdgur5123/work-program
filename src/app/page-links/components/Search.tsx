"use client";

import { useState } from "react";

interface SearchProps {
  handleSearch: (search: string) => void;
}
export default function Search({ handleSearch }: SearchProps) {
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchValue.length === 0) {
      alert("검색어를 입력하세요.");
    } else {
      handleSearch(searchValue);
    }
    setSearchValue("");
  };

  return (
    <div className="rounded-2xl pr-3 flex flex-col items-end justify-center gap-3">
      <form
        className="flex gap-3 justify-center items-center"
        onSubmit={handleSubmit}
      >
        <label htmlFor="search">SEARCH</label>
        <input
          type="text"
          id="search"
          className="bg-white h-8 text-black"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button className="bg-blue-500 h-8 pl-2 pr-2 hover:bg-blue-400 active:bg-blue-300 cursor-pointer">
          확인
        </button>
      </form>
    </div>
  );
}
