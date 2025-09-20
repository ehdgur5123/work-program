import { create } from "zustand";
import { SymbolItemType } from "@/app/symbols/types";

type State = {
  symbolData: SymbolItemType | null;
  setSymbolData: (data: SymbolItemType) => void;
  clearSymbolData: () => void;
};

export const useSymbolStore = create<State>((set) => ({
  symbolData: null,
  setSymbolData: (data) => set({ symbolData: data }),
  clearSymbolData: () => set({ symbolData: null }),
}));
