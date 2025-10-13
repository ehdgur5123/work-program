"use client";

import React from "react";
import { XCircleIcon } from "@heroicons/react/24/solid";
interface Props {
  searchValue: string;
  setSearchValue: (v: string) => void;
  handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
  placeholder?: string;
  mode?: "realtime" | "submit";
}

export default function Search({
  searchValue,
  setSearchValue,
  handleSubmit,
  placeholder = "검색어를 입력하세요",
  mode,
}: Props) {
  return (
    <>
      <form
        className="flex gap-2 relative my-2 items-center"
        onSubmit={handleSubmit}
      >
        <label htmlFor="search">검색</label>
        <input
          type="text"
          id="search"
          className="bg-white px-2 py-1 text-black"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          placeholder={placeholder}
        ></input>
        {mode === "submit" && (
          <button
            type="submit"
            className="p-2 border w-full cursor-pointer hover:bg-gray-400 active:scale-95"
          >
            검색
          </button>
        )}
        {searchValue && (
          <button
            onClick={() => setSearchValue("")}
            type="button"
            className="cursor-pointer hover:text-gray-400 active:scale-95 absolute right-3 top-1/2 transform -translate-y-1/2 text-black"
          >
            <XCircleIcon className="size-7" />
          </button>
        )}
      </form>
    </>
  );
}
