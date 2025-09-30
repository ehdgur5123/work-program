"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { postQuiz } from "@/app/quiz/controllers/axiosQuiz";
import { useQuizStore } from "@/app/quiz/stores/useQuizStore";
import { QuizResponse } from "@/app/quiz/type";

export function useCreateQuiz() {
  const setQuizData = useQuizStore((state) => state.setQuizData);
  const [loadingTime, setLoadingTime] = useState<number | null>(null);

  const createQuiz = useMutation<QuizResponse, Error, string>({
    mutationFn: (value: string) => postQuiz(value),
  });

  const runCreateQuiz = (inputValue: string) => {
    setQuizData(null);
    setLoadingTime(null);
    const start = performance.now();

    createQuiz.mutate(inputValue, {
      onSuccess: (data) => {
        const end = performance.now();
        setLoadingTime(end - start);
        setQuizData(data);
      },
      onError: (err) => {
        const end = performance.now();
        setLoadingTime(end - start);
        console.error(err);
        setQuizData(null);
      },
    });
  };

  return {
    createQuiz,
    runCreateQuiz,
    loadingTime,
  };
}
