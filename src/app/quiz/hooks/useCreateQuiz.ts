"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { postQuiz } from "@/app/quiz/controllers/axiosQuiz";
import { useQuizStore } from "@/app/quiz/stores/useQuizStore";
import { QuizDocument } from "@/app/quiz/type";

export function useCreateQuiz() {
  const setQuizList = useQuizStore((state) => state.setQuizList);
  const [loadingTime, setLoadingTime] = useState<number | null>(null);
  const createQuiz = useMutation<QuizDocument, Error, string>({
    mutationFn: (value: string) => postQuiz(value),
  });

  const runCreateQuiz = (inputValue: string) => {
    setQuizList([]);
    setLoadingTime(null);
    const start = performance.now();

    createQuiz.mutate(inputValue, {
      onSuccess: (data) => {
        const end = performance.now();
        setLoadingTime(end - start);
        setQuizList([data]);
      },
      onError: (err) => {
        const end = performance.now();
        setLoadingTime(end - start);
        console.error(err);
        setQuizList([]);
      },
    });
  };

  return {
    createQuiz,
    runCreateQuiz,
    loadingTime,
  };
}
