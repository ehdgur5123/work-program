import { create } from "zustand";

interface State {
  isCreateToggle: boolean;
  setIsCreateToggle: (data: boolean) => void;
}

export const useCreateToggleStore = create<State>((set) => ({
  isCreateToggle: true,
  setIsCreateToggle: (data) => set({ isCreateToggle: data }),
}));
