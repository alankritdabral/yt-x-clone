// TODO: Implement user API endpoints
import apiClient from './client';

// TODO: Register user endpoint
export const registerUser = (userData) => {
  return apiClient.post('/users/register', userData);
};

// TODO: Login user endpoint
export const loginUser = (credentials) => {
  return apiClient.post('/users/login', credentials);
};

// TODO: Logout user endpoint
export const logoutUser = () => {
  return apiClient.post('/users/logout');
};

// TODO: Get current user endpoint
export const getCurrentUser = () => {
  return apiClient.get('/users/current-user');
};

// TODO: Update user profile endpoint
export const updateUserProfile = (userData) => {
  return apiClient.patch('/users/update-account', userData);
};

// TODO: Change password endpoint
export const changePassword = (passwordData) => {
  return apiClient.post('/users/change-password', passwordData);
};

// TODO: Update avatar endpoint
export const updateAvatar = (formData) => {
  return apiClient.patch('/users/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

// TODO: Get user profile endpoint
export const getUserProfile = (userId) => {
  return apiClient.get(`/users/c/${userId}`);
};

// TODO: Get user watch history endpoint
export const getUserWatchHistory = () => {
  return apiClient.get('/users/watch-history');
};
