"use client";

import { ChevronDoubleDownIcon } from "@heroicons/react/24/solid";

export default function Search() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="rounded-2xl p-3 flex flex-col items-end justify-center gap-3">
      <form
        className="flex gap-3 justify-center items-center"
        onSubmit={handleSubmit}
      >
        <label htmlFor="search">SEARCH</label>
        <input type="text" id="search" className="bg-white h-8" />
        <button className="bg-blue-500 h-8 pl-2 pr-2 hover:bg-blue-400 active:bg-blue-300">
          확인
        </button>
      </form>
      <button className="w-full rounded-b-2xl p-2 bg-gray-800 flex justify-center gap-1 hover:bg-gray-700 active:p-1">
        <ChevronDoubleDownIcon className="size-6" />
        <p>상세 검색</p>
      </button>
    </div>
  );
}
