"use client";

import useIsMobile from "@/app/hooks/useIsMobile";
import { useQuizStore } from "@/app/quiz/stores/useQuizStore";
import { useCreateQuiz } from "@/app/quiz/hooks/useCreateQuiz";
import QuizWindow from "@/app/quiz/components/QuizWindow";
import useQuizAnswer from "@/app/quiz/hooks/useQuizAnswer";
import QuizInputForm from "./components/QuizInputForm";

export default function QuizPage() {
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
        isMobile ? "w-full px-7" : "w-1/2"
      } flex flex-col gap-4 justify-center items-center mx-auto`}
    >
      <h1 className={`${isMobile ? "text-4xl" : "text-6xl"} p-5 mt-10`}>
        QUIZ 생성기
      </h1>

      <QuizInputForm
        handleSubmit={handleSubmit}
        pending={createQuiz.isPending}
      />

      <div>
        응답 시간 : {loadingTime ? (loadingTime / 1000).toFixed(2) + "초" : "-"}
      </div>

      {/* 에러 표시 */}
      {createQuiz.isError && <p className="text-red-500">퀴즈 생성 실패!</p>}

      {/* 퀴즈 표시 */}
      {quizData && <QuizWindow />}
      <footer className="h-20"></footer>
    </div>
  );
}
