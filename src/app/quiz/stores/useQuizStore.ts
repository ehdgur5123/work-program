import { create } from "zustand";
import { QuizResponse } from "../type";

interface State {
  quizData: QuizResponse | null;
  setQuizData: (data: QuizResponse | null) => void;
}

export const useQuizStore = create<State>((set) => ({
  quizData: null,
  setQuizData: (data) => set({ quizData: data }),
}));
