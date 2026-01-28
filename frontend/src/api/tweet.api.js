// TODO: Implement tweet API endpoints
import apiClient from './client';

// TODO: Get user tweets endpoint
export const getUserTweets = (userId, params) => {
  return apiClient.get(`/tweets/user/${userId}`, { params });
};

// TODO: Create tweet endpoint
export const createTweet = (tweetData) => {
  return apiClient.post('/tweets', tweetData);
};

// TODO: Update tweet endpoint
export const updateTweet = (tweetId, tweetData) => {
  return apiClient.patch(`/tweets/${tweetId}`, tweetData);
};

// TODO: Delete tweet endpoint
export const deleteTweet = (tweetId) => {
  return apiClient.delete(`/tweets/${tweetId}`);
};
