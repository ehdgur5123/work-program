import { create } from "zustand";
import { QuizDocument } from "../type";

interface State {
  quizList: QuizDocument[] | [];
  isLoading: boolean;
  setQuizList: (data: QuizDocument[] | []) => void;
  setIsLoading: (val: boolean) => void;
}

export const useQuizStore = create<State>((set) => ({
  quizList: [],
  isLoading: false,
  setQuizList: (data) => set({ quizList: data }),
  setIsLoading: (val) => set({ isLoading: val }),
}));
