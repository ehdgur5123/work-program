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
    <form
      className="flex flex-col gap-3 w-full sm:flex-row sm:items-center sm:justify-center"
      onSubmit={(e) => handleSubmit(e, inputValue)}
    >
      {/* 입력창 */}
      <input
        type="text"
        value={inputValue}
        placeholder="주제를 입력해주세요 🎯"
        onChange={(e) => setInputValue(e.target.value)}
        className="
      w-full sm:flex-1 
      px-4 py-3 rounded-full 
      border border-pink-300 
      focus:outline-none focus:ring-2 focus:ring-pink-400 
      bg-white/90 text-gray-800 placeholder-gray-400 shadow-sm
    "
      />

      {/* 버튼 */}
      <button
        type="submit"
        disabled={pending}
        className={`
      w-full sm:w-32
      px-5 py-3 rounded-full font-bold shadow-md transition 
      ${
        pending
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-pink-500 text-white hover:bg-pink-600 active:scale-95"
      }
    `}
      >
        {pending ? "🎲 생성 중..." : "🚀 생성"}
      </button>
    </form>
  );
}
