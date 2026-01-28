// TODO: Implement video API endpoints
import apiClient from './client';

// TODO: Get all videos endpoint
export const getAllVideos = (params) => {
  return apiClient.get('/videos', { params });
};

// TODO: Get video by ID endpoint
export const getVideoById = (videoId) => {
  return apiClient.get(`/videos/${videoId}`);
};

// TODO: Upload video endpoint
export const uploadVideo = (formData) => {
  return apiClient.post('/videos', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

// TODO: Update video endpoint
export const updateVideo = (videoId, videoData) => {
  return apiClient.patch(`/videos/${videoId}`, videoData);
};

// TODO: Delete video endpoint
export const deleteVideo = (videoId) => {
  return apiClient.delete(`/videos/${videoId}`);
};

// TODO: Toggle publish status endpoint
export const togglePublishVideo = (videoId) => {
  return apiClient.patch(`/videos/toggle/publish/${videoId}`);
};

// TODO: Get user videos endpoint
export const getUserVideos = (userId) => {
  return apiClient.get(`/videos/user/${userId}`);
};
