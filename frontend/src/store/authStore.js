// TODO: Create Zustand store for authentication state management
import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),

  // TODO: Implement setUser action
  setUser: (user) => set({ user }),

  // TODO: Implement login action
  login: (user, token) =>
    set({
      user,
      token,
      isAuthenticated: true,
    }),

  // TODO: Implement logout action
  logout: () => {
    localStorage.removeItem('token');
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },

  // TODO: Implement updateUser action
  updateUser: (updatedUser) =>
    set((state) => ({
      user: { ...state.user, ...updatedUser },
    })),
}));
