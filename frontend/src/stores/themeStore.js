import { create } from "zustand";

const useThemeStore = create((set) => ({
  mode: localStorage.getItem("theme") || "light",
  toggleMode: () =>
    set((state) => {
      const newMode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("theme", newMode);
      return { mode: newMode };
    }),
}));

export default useThemeStore;
