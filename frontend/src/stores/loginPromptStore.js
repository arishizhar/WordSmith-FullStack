import { create } from "zustand";

const useLoginPromptStore = create((set) => ({
  isOpen: false,
  openPrompt: () => set({ isOpen: true }),
  closePrompt: () => set({ isOpen: false }),
}));

export default useLoginPromptStore;
