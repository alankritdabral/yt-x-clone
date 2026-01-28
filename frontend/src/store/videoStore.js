// TODO: Create Zustand store for video state management
import { create } from 'zustand';

export const useVideoStore = create((set) => ({
  videos: [],
  currentVideo: null,
  loading: false,
  error: null,

  // TODO: Implement setVideos action
  setVideos: (videos) => set({ videos }),

  // TODO: Implement setCurrentVideo action
  setCurrentVideo: (video) => set({ currentVideo: video }),

  // TODO: Implement addVideo action
  addVideo: (video) =>
    set((state) => ({
      videos: [video, ...state.videos],
    })),

  // TODO: Implement removeVideo action
  removeVideo: (videoId) =>
    set((state) => ({
      videos: state.videos.filter((v) => v._id !== videoId),
    })),

  // TODO: Implement updateVideo action
  updateVideo: (videoId, updatedData) =>
    set((state) => ({
      videos: state.videos.map((v) =>
        v._id === videoId ? { ...v, ...updatedData } : v
      ),
    })),

  // TODO: Implement setLoading action
  setLoading: (loading) => set({ loading }),

  // TODO: Implement setError action
  setError: (error) => set({ error }),
}));
