// TODO: Create custom hook for authentication logic
import { useState, useCallback } from 'react';
import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, login, logout, setUser } = useAuthStore();

  // TODO: Implement login handler
  const handleLogin = useCallback(async (credentials) => {
    // TODO: Call login API and handle response
  }, []);

  // TODO: Implement logout handler
  const handleLogout = useCallback(async () => {
    // TODO: Call logout API and clear store
  }, []);

  // TODO: Implement register handler
  const handleRegister = useCallback(async (userData) => {
    // TODO: Call register API and handle response
  }, []);

  return {
    user,
    loading,
    error,
    handleLogin,
    handleLogout,
    handleRegister,
    isAuthenticated: !!user,
  };
};
