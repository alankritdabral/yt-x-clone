// TODO: Implement like API endpoints
import apiClient from './client';

// TODO: Toggle video like endpoint
export const toggleVideoLike = (videoId) => {
  return apiClient.post(`/likes/toggle/v/${videoId}`);
};

// TODO: Toggle comment like endpoint
export const toggleCommentLike = (commentId) => {
  return apiClient.post(`/likes/toggle/c/${commentId}`);
};

// TODO: Toggle tweet like endpoint
export const toggleTweetLike = (tweetId) => {
  return apiClient.post(`/likes/toggle/t/${tweetId}`);
};

// TODO: Get video likes endpoint
export const getVideoLikes = (videoId) => {
  return apiClient.get(`/likes/videos/${videoId}`);
};

// TODO: Get liked videos endpoint
export const getLikedVideos = () => {
  return apiClient.get('/likes/videos');
};
