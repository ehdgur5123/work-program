"use client";

import useSubjectList from "@/app/project/quiz/hooks/useSubjectList";
import { useSubjectStore } from "@/app/project/quiz/stores/useSubjectStore";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useQuizStore } from "@/app/project/quiz/stores/useQuizStore";
import { useCreateToggleStore } from "@/app/project/quiz/stores/useCreateToggleStore";
import { useEffect, useRef, useState } from "react";
import useSubjectContent from "@/app/project/quiz/hooks/useSubjectContent";
import { useDeleteSubject } from "@/app/project/quiz/hooks/useDeleteSubject";

export default function SubjectList() {
  const { isSubjectListLoading, isSubjectListError } = useSubjectList();
  const subjectList = useSubjectStore((state) => state.subjectList);
  const setQuizList = useQuizStore((state) => state.setQuizList);
  const setIsLoading = useQuizStore((state) => state.setIsLoading);
  const setIsCreateToggle = useCreateToggleStore(
    (state) => state.setIsCreateToggle
  );
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const { data: subjectContentData, isSubjectContentLoading } =
    useSubjectContent(selectedSubject);

  const { mutate: deleteSubjectMutate } = useDeleteSubject();
  const [swipedItem, setSwipedItem] = useState<string | null>(null);
  const startX = useRef<number>(0);

  useEffect(() => {
    setQuizList(subjectContentData);
  }, [subjectContentData, setQuizList]);

  useEffect(() => {
    setIsLoading(isSubjectContentLoading);
  }, [isSubjectContentLoading, setIsLoading]);

  const handleSelectSubject = async (subject: string) => {
    setSelectedSubject(subject);
  };

  const handleDeleteSubject = (subject: string) => {
    const isConfirmed = window.confirm(
      `${subject}의 모든 목록이 삭제됩니다. 삭제하시겠습니까?`
    );
    if (isConfirmed) {
      deleteSubjectMutate(subject);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent, subject: string) => {
    const currentX = e.touches[0].clientX;
    const diff = startX.current - currentX;

    // 왼쪽으로 50px 이상 밀면 삭제버튼 보이기
    if (diff > 50) {
      setSwipedItem(subject);
    }

    // 오른쪽으로 밀면 닫기
    if (diff < -50) {
      setSwipedItem(null);
    }
  };

  const handleTouchEnd = () => {};

  if (isSubjectListLoading)
    return (
      <div className="w-full px-4 py-3 rounded-2xl bg-sky-100/70 text-sky-700 font-semibold shadow-md text-center">
        ⏳ 로딩 중...
      </div>
    );

  if (isSubjectListError)
    return (
      <div className="w-full px-4 py-3 rounded-2xl bg-red-100/70 text-red-600 font-semibold shadow-md text-center">
        ❌ 불러오기 실패 😢
      </div>
    );

  return (
    <div className="flex flex-col">
      {subjectList.map((subject) => (
        <div
          key={subject}
          className="relative w-full overflow-hidden rounded-xl mb-2 group"
        >
          {/* 휴지통 (항상 오른쪽 배치) */}
          <div className="absolute right-0 top-0 bottom-0 flex items-center pr-4 bg-red-100 z-0">
            <button
              className="p-2 rounded-full bg-red-500 hover:bg-red-600 active:scale-95 transition"
              onClick={() => handleDeleteSubject(subject)}
            >
              <TrashIcon className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* 실제 아이템 */}
          <div
            className={`relative z-10 flex items-center justify-between bg-white text-pink-700 font-semibold rounded-xl shadow-sm transition-transform duration-300 
              md:hover:bg-gradient-to-r md:hover:from-pink-200 md:hover:to-amber-200`}
            style={{
              transform:
                swipedItem === subject
                  ? "translateX(-4rem)"
                  : "translateX(0px)",
            }}
            onTouchStart={(e) => handleTouchStart(e)}
            onTouchMove={(e) => handleTouchMove(e, subject)}
            onTouchEnd={handleTouchEnd}
          >
            <button
              type="button"
              className="flex-1 text-left px-4 py-3 cursor-pointer active:scale-95"
              onClick={() => {
                handleSelectSubject(subject);
                setIsCreateToggle(false);
              }}
            >
              {subject}
            </button>

            {/* 휴지통 버튼 (데스크톱 전용 hover 시 표시) */}
            <button
              type="button"
              className="hidden md:block p-2 opacity-0 group-hover:opacity-30 hover:opacity-100 transition-opacity cursor-pointer active:scale-80"
              onClick={() => handleDeleteSubject(subject)}
            >
              <TrashIcon className="w-5 h-5 text-pink-700" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
