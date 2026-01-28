// TODO: Implement comment API endpoints
import apiClient from './client';

// TODO: Get video comments endpoint
export const getVideoComments = (videoId, params) => {
  return apiClient.get(`/comments/${videoId}`, { params });
};

// TODO: Add comment endpoint
export const addComment = (videoId, commentData) => {
  return apiClient.post(`/comments/${videoId}`, commentData);
};

// TODO: Update comment endpoint
export const updateComment = (commentId, commentData) => {
  return apiClient.patch(`/comments/c/${commentId}`, commentData);
};

// TODO: Delete comment endpoint
export const deleteComment = (commentId) => {
  return apiClient.delete(`/comments/c/${commentId}`);
};
