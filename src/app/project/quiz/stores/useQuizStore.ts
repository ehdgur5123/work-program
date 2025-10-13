import { create } from "zustand";
import { QuizDocument } from "../type";

interface State {
  quizList: QuizDocument[] | [];
  setQuizList: (data: QuizDocument[] | []) => void;
}

export const useQuizStore = create<State>((set) => ({
  quizList: [],
  setQuizList: (data) => set({ quizList: data }),
}));
