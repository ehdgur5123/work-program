"use client";

import { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import SubjectList from "@/app/project/quiz/components/SubjectList";
import { useCreateToggleStore } from "@/app/project/quiz/stores/useCreateToggleStore";
import { useQuizStore } from "@/app/project/quiz/stores/useQuizStore";

interface NavigationProps {
  isNavOpen?: boolean;
  className?: string;
}

export default function Navigation({ isNavOpen, className }: NavigationProps) {
  const [isRecordOpen, setIsRecordOpen] = useState(false);
  const setIsCreateToggle = useCreateToggleStore(
    (state) => state.setIsCreateToggle
  );
  const isCreateToggle = useCreateToggleStore((state) => state.isCreateToggle);
  const setQuizList = useQuizStore((state) => state.setQuizList);

  return (
    <div
      className={`flex flex-col bg-white/70 backdrop-blur-md w-64 sm:w-72 p-4 shadow-lg gap-4 h-full fixed top-20 left-0 z-20 ${className}`}
    >
      {isNavOpen && <div className="h-20"></div>}
      {/* 생성하기 버튼 */}
      <button
        type="button"
        className={`w-full py-3 rounded-full  text-white font-bold shadow-md
         ${
           isCreateToggle
             ? "bg-gray-400 cursor-not-allowed"
             : "bg-gradient-to-r from-pink-400 to-amber-300 hover:scale-105 hover:shadow-lg transition active:scale-95 cursor-pointer"
         }`}
        disabled={isCreateToggle}
        onClick={() => {
          setIsCreateToggle(true);
          setQuizList([]);
        }}
      >
        생성하기
      </button>

      {/* 목록보기 버튼 */}
      <button
        type="button"
        className="flex justify-between items-center w-full px-4 py-3 rounded-full bg-gradient-to-r from-sky-200 to-pink-200 text-pink-700 font-semibold shadow-md
        hover:scale-105 hover:shadow-lg transition active:scale-95 relative cursor-pointer"
        onClick={() => setIsRecordOpen((prev) => !prev)}
      >
        <p className="mx-auto">목록보기</p>
        <div className="absolute right-4">
          {!isRecordOpen ? (
            <ChevronDownIcon className="w-5 h-5 text-pink-700" />
          ) : (
            <ChevronRightIcon className="w-5 h-5 text-pink-700" />
          )}
        </div>
      </button>

      {/* 목록 */}
      <div
        className={`flex flex-col p-1 bg-amber-100 h-80 overflow-auto ${
          isRecordOpen ? "hidden" : "block"
        }`}
      >
        <SubjectList />
      </div>
    </div>
  );
}
