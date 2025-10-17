"use client";

import useSubjectList from "@/app/project/quiz/hooks/useSubjectList";
import { useSubjectStore } from "@/app/project/quiz/stores/useSubjectStore";
import { TrashIcon } from "@heroicons/react/24/solid";
import { getSubjectContent } from "@/app/project/quiz/controllers/axiosQuiz";
import { useQuizStore } from "@/app/project/quiz/stores/useQuizStore";
import { useCreateToggleStore } from "@/app/project/quiz/stores/useCreateToggleStore";

export default function SubjectList() {
  const { isSubjectListLoading, isSubjectListError } = useSubjectList();
  const subjectList = useSubjectStore((state) => state.subjectList);
  const setQuizList = useQuizStore((state) => state.setQuizList);
  const setIsCreateToggle = useCreateToggleStore(
    (state) => state.setIsCreateToggle
  );
  const handleSelectSubject = async (subject: string) => {
    const res = await getSubjectContent(subject);
    setQuizList(res);
  };

  const handleDeleteSubject = (subject: string) => {
    console.log(subject);
  };

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
          className="relative w-full rounded-xl hover:bg-gradient-to-r hover:from-pink-200 hover:to-amber-200 hover:shadow-md flex items-center justify-between group "
        >
          {/* 선택 영역 */}
          <button
            type="button"
            className="flex-1 text-left px-4 text-pink-700 font-semibold rounded-xl cursor-pointer active:scale-95"
            onClick={() => {
              handleSelectSubject(subject);
              setIsCreateToggle(false);
            }}
          >
            {subject}
          </button>

          {/* 휴지통 버튼 */}
          <button
            type="button"
            className="p-2 opacity-0 group-hover:opacity-30 hover:opacity-100 transition-opacity cursor-pointer active:scale-80"
            onClick={() => handleDeleteSubject(subject)}
          >
            <TrashIcon className="w-5 h-5 text-pink-700" />
          </button>
        </div>
      ))}
    </div>
  );
}
