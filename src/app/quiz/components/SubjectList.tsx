"use client";

import useSubjectList from "@/app/quiz/hooks/useSubjectList";
import { useSubjectStore } from "@/app/quiz/stores/useSubjectStore";
import { TrashIcon } from "@heroicons/react/24/solid";
import { getSubjectContent } from "@/app/quiz/controllers/axiosQuiz";
import { useEffect, useState } from "react";

export default function SubjectList() {
  const [content, setContent] = useState();
  const { isSubjectListLoading, isSubjectListError } = useSubjectList();
  const subjectList = useSubjectStore((state) => state.subjectList);

  const handleSelectSubject = async (subject: string) => {
    console.log(subject);
    const res = await getSubjectContent(subject);
    setContent(res);
  };

  const handleDeleteSubject = (subject: string) => {};

  useEffect(() => {
    console.log(content);
  }, [content]);

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
    <div className="flex flex-col gap-2">
      {subjectList.map((subject) => (
        <div
          key={subject}
          className="relative w-full rounded-xl bg-gradient-to-r from-pink-200 to-amber-200 shadow-md flex items-center justify-between group"
        >
          {/* 선택 영역 */}
          <button
            type="button"
            className="flex-1 text-left px-4 py-2 text-pink-700 font-semibold rounded-xl cursor-pointer"
            onClick={() => handleSelectSubject(subject)}
          >
            {subject}
          </button>

          {/* 휴지통 버튼 */}
          <button
            type="button"
            className="p-2 opacity-0 group-hover:opacity-30 hover:opacity-100 transition-opacity cursor-pointer"
            onClick={() => handleDeleteSubject(subject)}
          >
            <TrashIcon className="w-5 h-5 text-pink-700" />
          </button>
        </div>
      ))}
    </div>
  );
}
