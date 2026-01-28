// TODO: Implement subscription API endpoints
import apiClient from './client';

// TODO: Toggle subscription endpoint
export const toggleSubscription = (channelId) => {
  return apiClient.post(`/subscriptions/c/${channelId}`);
};

// TODO: Get user subscribers endpoint
export const getUserSubscribers = (channelId) => {
  return apiClient.get(`/subscriptions/c/${channelId}`);
};

// TODO: Get subscribed channels endpoint
export const getSubscribedChannels = (userId) => {
  return apiClient.get(`/subscriptions/u/${userId}`);
};
