"use client";
import { ChevronDoubleDownIcon } from "@heroicons/react/24/solid";
export default function DetailedSearch() {
  return (
    <button className="w-full rounded-b-2xl p-2 bg-gray-800 flex justify-center gap-1 hover:bg-gray-700 active:bg-gray-600 cursor-pointer">
      <ChevronDoubleDownIcon className="size-6" />
      <p>상세 검색</p>
    </button>
  );
}
