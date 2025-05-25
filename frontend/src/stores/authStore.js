import { create } from "zustand";
import { persist } from "zustand/middleware";

const API_BASE_URL = process.env.BACKEND_API_URL || "http://localhost:5173/api";

const useAuthStore = create(
  persist((set, get) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  }))
);
