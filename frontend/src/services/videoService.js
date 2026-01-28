// TODO: Implement video service with business logic
import * as videoApi from '../api/video.api';
import { useVideoStore } from '../store/videoStore';
import { handleError, logError } from '../utils/errorHandler';

export const videoService = {
  // TODO: Handle fetch all videos
  async fetchAllVideos(params = {}) {
    try {
      const response = await videoApi.getAllVideos(params);
      useVideoStore.getState().setVideos(response.data.data);
      return response.data.data;
    } catch (error) {
      logError(error, 'Fetch Videos Service');
      throw handleError(error);
    }
  },

  // TODO: Handle fetch single video
  async fetchVideoById(videoId) {
    try {
      const response = await videoApi.getVideoById(videoId);
      useVideoStore.getState().setCurrentVideo(response.data.data);
      return response.data.data;
    } catch (error) {
      logError(error, 'Fetch Video Service');
      throw handleError(error);
    }
  },

  // TODO: Handle video upload with progress tracking
  async uploadVideo(formData, onProgress) {
    try {
      const response = await videoApi.uploadVideo(formData);
      const newVideo = response.data.data;
      useVideoStore.getState().addVideo(newVideo);
      return newVideo;
    } catch (error) {
      logError(error, 'Upload Video Service');
      throw handleError(error);
    }
  },

  // TODO: Handle video deletion
  async deleteVideo(videoId) {
    try {
      await videoApi.deleteVideo(videoId);
      useVideoStore.getState().removeVideo(videoId);
    } catch (error) {
      logError(error, 'Delete Video Service');
      throw handleError(error);
    }
  },

  // TODO: Handle video update
  async updateVideo(videoId, videoData) {
    try {
      const response = await videoApi.updateVideo(videoId, videoData);
      useVideoStore.getState().updateVideo(videoId, response.data.data);
      return response.data.data;
    } catch (error) {
      logError(error, 'Update Video Service');
      throw handleError(error);
    }
  },
};
