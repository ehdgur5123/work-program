"use client";

import InputForm from "../components/InputForm";
// import useCategory from "../hooks/useCategory";
// import { useEffect } from "react";

export default function AddLinkPage() {
  return (
    <>
      <form className="flex flex-col gap-3 p-2">
        <InputForm label="URL" />
        <InputForm label="대분류" />
        <InputForm label="중분류" />
        <InputForm label="소분류" />
        <button className="p-2 border-2 text-white rounded-sm text-lg md:text-2xl cursor-pointer hover:bg-gray-500 active:scale-90 w-full">
          확인
        </button>
      </form>
    </>
  );
}
