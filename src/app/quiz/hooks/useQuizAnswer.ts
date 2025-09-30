"use client";
import { useState } from "react";

export default function useQuizAnswer() {
  const [selectAnswer, setSelectAnswer] = useState<string | null>(null);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [answerFeedback, setAnswerFeedback] = useState("");

  const clearAnswerState = () => {
    setSelectAnswer(null);
    setIsCorrectAnswer(false);
    setAnswerFeedback("");
  };

  return {
    selectAnswer,
    setSelectAnswer,
    isCorrectAnswer,
    setIsCorrectAnswer,
    clearAnswerState,
    answerFeedback,
    setAnswerFeedback,
  };
}
