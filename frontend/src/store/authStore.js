import { create } from "zustand";
import apiClient from "../api/axiosClient";

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  accessToken: localStorage.getItem("accessToken") || null,
  isLoggedIn: !!localStorage.getItem("user"),
  loading: false,
  error: null,

  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user, isLoggedIn: !!user });
  },

  setAccessToken: (token) => {
    localStorage.setItem("accessToken", token);
    set({ accessToken: token });
  },

  setError: (error) => set({ error }),

  register: async (formData) => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.post("/users/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      set({ loading: false });
      return { success: true, data: response.data.data };
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Registration failed";
      set({ error: errorMessage, loading: false });
      return { success: false, message: errorMessage };
    }
  },

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.post("/users/login", { email, password });
      const { user, accessToken } = response.data.data;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("accessToken", accessToken);

      set({ user, accessToken, isLoggedIn: true, loading: false });
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed";
      set({ error: errorMessage, loading: false });
      return { success: false, message: errorMessage };
    }
  },

  logout: async () => {
    try {
      await apiClient.post("/users/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      set({ user: null, accessToken: null, isLoggedIn: false });
    }
  },

  refreshSession: async () => {
    try {
      const response = await apiClient.post("/users/refresh-token");
      const { accessToken, user } = response.data.data;
      
      if (accessToken) localStorage.setItem("accessToken", accessToken);
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        set({ user, accessToken, isLoggedIn: true });
      }
    } catch (error) {
      console.error("Session refresh failed:", error);
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      set({ user: null, accessToken: null, isLoggedIn: false });
    }
  },
}));
