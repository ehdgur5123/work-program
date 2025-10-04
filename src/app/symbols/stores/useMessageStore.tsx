import { create } from "zustand";
import { MessageType } from "@/app/symbols/types";

interface MessageStore {
  message: MessageType;
  setMessage: (msg: MessageType) => void;
  clearMessage: () => void;
}

export const useMessageStore = create<MessageStore>((set) => ({
  message: { text: "", state: "" },
  setMessage: (msg) => set({ message: msg }),
  clearMessage: () => set({ message: { text: "", state: "" } }),
}));
