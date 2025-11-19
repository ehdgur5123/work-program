"use client";

import { useState } from "react";
import { getTest } from "../controllers/axiosTranslator";

type valueType = {
  japanese: string;
  korean: string;
  pronunciation: string;
};

export default function ClientPage() {
  const [value, setValue] = useState<valueType>({
    japanese: "산타는",
    korean: "없다",
    pronunciation: "임마",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const testValue = await getTest();
    setValue(testValue);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex gap-3 items-center justify-center h-[30px]"
      >
        <input type="text" className="bg-white h-full text-black pl-1" />
        <button
          type="submit"
          className="py-1 px-2 border h-full text-sm cursor-pointer"
        >
          버튼
        </button>
      </form>
      <div>{value.japanese}</div>
      <div>{value.korean}</div>
      <div>{value.pronunciation}</div>
    </div>
  );
}
