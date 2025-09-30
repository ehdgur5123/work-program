"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { postQuiz } from "./controllers/axiosQuiz";
import useIsMobile from "@/app/hooks/useIsMobile";
import { QuizResponse } from "./type";

export default function QuizPage() {
  const [inputValue, setInputValue] = useState("");
  const [selectAnswer, setSelectAnswer] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  const [isAnswer, setIsAnswer] = useState(false);
  const isMobile = useIsMobile();
  const [loadingTime, setLoadingTime] = useState<number | null>(null);
  const [response, setResponse] = useState<QuizResponse | null>(null);

  // mutation 훅 정의
  const quizMutation = useMutation({
    mutationFn: (value: string) => postQuiz(value),
  });

  const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSelectAnswer("");
    setResultMessage("");
    setIsAnswer(false);
    setResponse(null);
    setLoadingTime(null);
    const start = performance.now(); // 요청 시작 시점

    quizMutation.mutate(inputValue, {
      onSuccess: (data) => {
        const end = performance.now();
        setLoadingTime(end - start); // API 응답 시간
        setResponse(data);
      },
      onError: (err) => {
        const end = performance.now();
        setLoadingTime(end - start);
        console.error(err);
        setResponse(null);
      },
    });
  };

  const checkAnswerClick = () => {
    if (selectAnswer === response?.answer) {
      setResultMessage("정답입니다.");
      setIsAnswer(true);
    } else {
      setResultMessage("오답입니다.");
      setIsAnswer(false);
    }
  };

  return (
    <div
      className={`${
        isMobile ? "w-full px-7" : "w-1/2"
      } flex  gap-4 flex-col justify-center items-center mx-auto`}
    >
      <h1 className={`${isMobile ? "text-4xl" : "text-6xl"} p-5 mt-10`}>
        QUIZ 생성기
      </h1>

      {/* 입력 폼 */}
      <form className="flex gap-2" onSubmit={sendMessage}>
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
          disabled={quizMutation.isPending}
        >
          {quizMutation.isPending ? "생성 중..." : "생성"}
        </button>
      </form>
      <div>
        응답 시간 : {loadingTime ? (loadingTime / 1000).toFixed(2) + "초" : "-"}
      </div>

      {/* 에러 표시 */}
      {quizMutation.isError && (
        <p className="text-red-500">퀴즈 생성 중 오류가 발생했습니다.</p>
      )}

      {/* 퀴즈 표시 */}
      {response && (
        <div className="w-full">
          <div className={`${isMobile ? "text-[20px]" : "text-2xl"}`}>
            <p className="mb-5">{response.question}</p>
            <ul className="flex flex-col gap-2">
              {response.options.map((opt, idx) => (
                <li
                  key={idx}
                  onClick={() => setSelectAnswer(opt)}
                  className={`pl-4 cursor-pointer ${
                    selectAnswer === opt
                      ? "text-red-500"
                      : "text-white hover:text-gray-500"
                  }`}
                >{`${idx + 1}. ${opt}`}</li>
              ))}
            </ul>
          </div>
          <div className="flex justify-end mt-2">
            <button
              type="button"
              className="p-2 border bg-blue-600 text-white w-1/5 rounded-lg 
           shadow-md shadow-black/30 
           transition hover:bg-blue-500 
           active:scale-95 active:shadow-2xl active:shadow-black/60"
              onClick={checkAnswerClick}
            >
              제출
            </button>
          </div>
          <div
            className={`flex h-20 items-center justify-center ${
              isAnswer ? "text-green-500" : "text-red-500"
            }`}
          >
            {resultMessage}
          </div>
          {isAnswer && (
            <div className="p-5 border-2 rounded-2xl text-xl">
              <p>정답: {response.answer}</p>
              <p>해설: {response.explanation}</p>
            </div>
          )}
        </div>
      )}
      <div className="h-20"></div>
    </div>
  );
}
