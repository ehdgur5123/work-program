"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { postQuiz } from "@/app/project/quiz/controllers/axiosQuiz";
import { useQuizStore } from "@/app/project/quiz/stores/useQuizStore";
import { QuizDocument } from "@/app/project/quiz/type";
import { useSubjectStore } from "@/app/project/quiz/stores/useSubjectStore";

export function useCreateQuiz() {
  const setQuizList = useQuizStore((state) => state.setQuizList);
  const [loadingTime, setLoadingTime] = useState<number | null>(null);
  const setSubjectList = useSubjectStore((state) => state.setSubjectList);
  const subjectList = useSubjectStore((state) => state.subjectList);
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
        if (!subjectList.includes(inputValue)) {
          setSubjectList([...subjectList, inputValue]);
        }
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
