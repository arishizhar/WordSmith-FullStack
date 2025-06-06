import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

// const API_BASE_URL = process.env.BACKEND_API_URL || "http://localhost:5173/api";

// const API = axios.create({
//   baseURL: API_BASE_URL,
// });

const API = axios.create({
  baseURL: "http://localhost:5001/api",
});

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      clearError: () => {
        set({ error: null });
      },

      // Login function
      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const response = await API.post("/auth/login", { email, password });
          const { accessToken } = response.data;
          console.log("Access Token:", accessToken);

          const meResponse = await API.get("/user/me", {
            headers: { Authorization: `Bearer ${accessToken}` },
          });

          console.log("Me Response:", meResponse.data);
          const user = meResponse.data;

          set({
            user,
            token: accessToken,
            isAuthenticated: true,
            loading: false,
          });

          return { success: true };
        } catch (err) {
          console.error("Login error:", err);
          const message =
            err.response?.data?.message || err.message || "Login failed";
          set({ loading: false, error: message });
          return { success: false, error: message };
        }
      },
      // logout function
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },
      //verify token function
      verifyToken: async () => {
        const token = get().token;

        if (!token) return;

        set({ loading: true });

        try {
          const res = await API.get("/user/me", {
            headers: { Authorization: `Bearer ${token}` },
          });

          set({
            user: res.data,
            isAuthenticated: true,
            loading: false,
          });
        } catch {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            loading: false,
            error: null,
          });
        }
      },

      //api helper for protected routes
      apiCall: async (endpoint, options = {}) => {
        const token = get().token;

        try {
          const config = {
            method: options.method || "GET",
            url: endpoint,
            data: options.body || undefined,
            headers: {
              ...options.headers,
              ...(token && { Authorization: `Bearer ${token}` }),
            },
          };
          const res = await API(config);
          return res.data;
        } catch (err) {
          if (err.response?.status === 401) get().logout();
          throw new Error(err.response?.data?.message || "Request failed");
        }
      },
    }),

    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
