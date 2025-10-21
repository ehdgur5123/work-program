"use client";

import { useQuizStore } from "@/app/project/quiz/stores/useQuizStore";
import { useCreateQuiz } from "@/app/project/quiz/hooks/useCreateQuiz";
import QuizWindow from "@/app/project/quiz/components/QuizWindow";
import useQuizAnswer from "@/app/project/quiz/hooks/useQuizAnswer";
import QuizInputForm from "@/app/project/quiz/components/QuizInputForm";
import QuizDataPending from "@/app/project/quiz/components/QuizDataPending";
import { useCreateToggleStore } from "@/app/project/quiz/stores/useCreateToggleStore";

export default function ClientPage() {
  const { clearAnswerState } = useQuizAnswer();
  const quizList = useQuizStore((state) => state.quizList);
  const isLoading = useQuizStore((state) => state.isLoading);
  const { createQuiz, runCreateQuiz, loadingTime } = useCreateQuiz();
  const isCreateToggle = useCreateToggleStore((state) => state.isCreateToggle);

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    inputValue: string
  ) => {
    if (inputValue.trim().length === 0) {
      alert("주제를 입력해주세요");
      return;
    }
    event.preventDefault();
    clearAnswerState();
    runCreateQuiz(inputValue);
  };

  return (
    <div
      className="flex flex-col gap-6 justify-center items-center mx-auto
                w-full px-4 md:w-3/4 lg:w-full"
    >
      {isCreateToggle && (
        <>
          {/* 입력폼 */}
          <div className="w-full bg-white/70 backdrop-blur-md rounded-2xl shadow-md p-4">
            <QuizInputForm
              handleSubmit={handleSubmit}
              pending={createQuiz.isPending}
            />
          </div>

          {/* 로딩/시간 표시 */}
          <div className="text-sm md:text-base px-4 py-2 rounded-full bg-sky-100 text-sky-700 font-medium shadow">
            ⏱ 응답 시간 :{" "}
            {loadingTime ? (loadingTime / 1000).toFixed(2) + "초" : "-"}
          </div>
        </>
      )}

      {/* 에러 표시 */}
      {createQuiz.isError && (
        <p className="px-4 py-2 rounded-lg bg-red-100 text-red-600 font-semibold shadow-sm">
          ❌ 퀴즈 생성 실패!
        </p>
      )}

      {/* 퀴즈 영역 */}
      {quizList?.map((quizData) => (
        <div
          key={quizData._id.toString()}
          className="w-full bg-white/80 backdrop-blur-md rounded-3xl shadow-lg p-6 animate-fadeIn flex flex-col gap-4"
        >
          <QuizWindow quizData={quizData} />
        </div>
      ))}

      {/* 퀴즈 선택 로딩 */}
      {isLoading && !createQuiz.isPending && (
        <div className="w-full bg-white/80 backdrop-blur-md rounded-3xl shadow-lg p-6 animate-fadeIn">
          <QuizDataPending />
        </div>
      )}

      {/* 퀴즈 생성 Pending */}
      {createQuiz.isPending && (
        <div className="w-full bg-white/80 backdrop-blur-md rounded-3xl shadow-lg p-6 animate-fadeIn">
          <QuizDataPending />
        </div>
      )}
    </div>
  );
}
