// TODO: Create Zustand store for UI state management
import { create } from 'zustand';

export const useUIStore = create((set) => ({
  sidebarOpen: true,
  theme: localStorage.getItem('theme') || 'light',
  notification: null,

  // TODO: Implement toggleSidebar action
  toggleSidebar: () =>
    set((state) => ({
      sidebarOpen: !state.sidebarOpen,
    })),

  // TODO: Implement setTheme action
  setTheme: (theme) => {
    localStorage.setItem('theme', theme);
    set({ theme });
  },

  // TODO: Implement showNotification action
  showNotification: (notification) => set({ notification }),

  // TODO: Implement clearNotification action
  clearNotification: () => set({ notification: null }),
}));
