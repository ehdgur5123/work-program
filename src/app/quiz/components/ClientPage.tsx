"use client";

import useIsMobile from "@/app/hooks/useIsMobile";
import { useQuizStore } from "@/app/quiz/stores/useQuizStore";
import { useCreateQuiz } from "@/app/quiz/hooks/useCreateQuiz";
import QuizWindow from "@/app/quiz/components/QuizWindow";
import useQuizAnswer from "@/app/quiz/hooks/useQuizAnswer";
import QuizInputForm from "@/app/quiz/components/QuizInputForm";
import QuizDataPending from "@/app/quiz/components/QuizDataPending";

export default function ClientPage() {
  const { clearAnswerState } = useQuizAnswer();
  const isMobile = useIsMobile();
  const quizData = useQuizStore((state) => state.quizData);
  const { createQuiz, runCreateQuiz, loadingTime } = useCreateQuiz();

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    inputValue: string
  ) => {
    event.preventDefault();
    clearAnswerState();
    runCreateQuiz(inputValue);
  };

  return (
    <div
      className={`${
        isMobile ? "w-full px-4" : "w-3/4 md:w-2/3"
      } flex flex-col gap-6 justify-center items-center mx-auto`}
    >
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

      {/* 에러 표시 */}
      {createQuiz.isError && (
        <p className="px-4 py-2 rounded-lg bg-red-100 text-red-600 font-semibold shadow-sm">
          ❌ 퀴즈 생성 실패!
        </p>
      )}

      {/* 퀴즈 영역 */}
      {quizData && (
        <div className="w-full bg-white/80 backdrop-blur-md rounded-3xl shadow-lg p-6 animate-fadeIn">
          <QuizWindow />
        </div>
      )}

      {/* Pending 영역 */}
      {createQuiz.isPending && (
        <div className="w-full bg-white/80 backdrop-blur-md rounded-3xl shadow-lg p-6 animate-fadeIn">
          <QuizDataPending />
        </div>
      )}
    </div>
  );
}
