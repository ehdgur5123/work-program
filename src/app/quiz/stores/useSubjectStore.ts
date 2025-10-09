import { create } from "zustand";

interface State {
  subjectList: string[] | [];
  setSubjectList: (data: string[] | []) => void;
}

export const useSubjectStore = create<State>((set) => ({
  subjectList: [],
  setSubjectList: (data) => set({ subjectList: data }),
}));
