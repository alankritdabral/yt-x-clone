// TODO: Create ProtectedRoute component wrapper for authentication checks
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import Loader from '../common/Loader';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  const [isLoading, setIsLoading] = React.useState(true);

  // TODO: Check authentication status on mount
  React.useEffect(() => {
    // TODO: Verify token and set authentication state
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loader fullscreen />;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
