"use client";
import { useEffect, useState, useRef } from "react";

export default function Search({
  handleSearch,
}: {
  handleSearch: (val: string) => void;
}) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus(); // 페이지 로드 시 자동 포커스
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedValue = value.trim();
    if (!trimmedValue) {
      alert("검색어를 입력하세요");
    } else {
      handleSearch(value);
      setValue("");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 justify-end items-center mb-2"
      >
        <label htmlFor="search">검색</label>
        <input
          id="search"
          className="bg-white text-black"
          value={value}
          ref={inputRef}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          type="submit"
          className="cursor-pointer rounded-lg w-6 hover:text-gray-500 active:scale-80"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </form>
    </>
  );
}
