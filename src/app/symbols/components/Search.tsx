"use client";
import { useState } from "react";

export default function Search({
  handleSearch,
}: {
  handleSearch: (val: string) => void;
}) {
  const [value, setValue] = useState("");

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
      <div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <label htmlFor="search">검색</label>
          <input
            id="search"
            className="bg-white text-black"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button type="submit" className="cursor-pointer">
            확인
          </button>
        </form>
      </div>
    </>
  );
}
