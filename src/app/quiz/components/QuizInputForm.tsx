"use client";
import { useState } from "react";

interface QuizInputFormProps {
  handleSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    inputValue: string
  ) => void;
  pending: boolean;
}
export default function QuizInputForm({
  handleSubmit,
  pending,
}: QuizInputFormProps) {
  const [inputValue, setInputValue] = useState("");

  return (
    <form className="flex gap-2" onSubmit={(e) => handleSubmit(e, inputValue)}>
      <input
        type="text"
        className="bg-white text-black pl-2"
        value={inputValue}
        placeholder="주제를 입력해주세요."
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        type="submit"
        className="p-1 border cursor-pointer w-28"
        disabled={pending}
      >
        {pending ? "생성 중..." : "생성"}
      </button>
    </form>
  );
}
