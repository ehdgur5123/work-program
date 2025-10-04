import { create } from "zustand";
import { QuizDocument } from "../type";

interface State {
  quizData: QuizDocument | null;
  setQuizData: (data: QuizDocument | null) => void;
}

export const useQuizStore = create<State>((set) => ({
  quizData: null,
  setQuizData: (data) => set({ quizData: data }),
}));
