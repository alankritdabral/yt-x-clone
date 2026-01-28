// TODO: Implement authentication service with business logic
import * as userApi from '../api/user.api';
import { useAuthStore } from '../store/authStore';
import { handleError, logError } from '../utils/errorHandler';

export const authService = {
  // TODO: Handle user registration
  async register(userData) {
    try {
      const response = await userApi.registerUser(userData);
      return response.data;
    } catch (error) {
      logError(error, 'Registration Service');
      throw handleError(error);
    }
  },

  // TODO: Handle user login
  async login(credentials) {
    try {
      const response = await userApi.loginUser(credentials);
      const { user, token } = response.data.data;
      
      // TODO: Save token and update store
      localStorage.setItem('token', token);
      useAuthStore.setState({ user, token, isAuthenticated: true });
      
      return { user, token };
    } catch (error) {
      logError(error, 'Login Service');
      throw handleError(error);
    }
  },

  // TODO: Handle user logout
  async logout() {
    try {
      await userApi.logoutUser();
      useAuthStore.getState().logout();
    } catch (error) {
      logError(error, 'Logout Service');
      useAuthStore.getState().logout();
    }
  },

  // TODO: Handle password change
  async changePassword(passwordData) {
    try {
      const response = await userApi.changePassword(passwordData);
      return response.data;
    } catch (error) {
      logError(error, 'Change Password Service');
      throw handleError(error);
    }
  },

  // TODO: Handle profile update
  async updateProfile(userData) {
    try {
      const response = await userApi.updateUserProfile(userData);
      const { user } = response.data.data;
      useAuthStore.getState().updateUser(user);
      return user;
    } catch (error) {
      logError(error, 'Update Profile Service');
      throw handleError(error);
    }
  },
};
