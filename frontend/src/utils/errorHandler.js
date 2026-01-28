// TODO: Implement centralized error handling utility
export const handleError = (error) => {
  // TODO: Handle axios errors
  if (error.response) {
    return {
      status: error.response.status,
      message: error.response.data?.message || 'An error occurred',
      data: error.response.data,
    };
  }

  // TODO: Handle network errors
  if (error.request) {
    return {
      status: 0,
      message: 'Network error. Please check your connection.',
    };
  }

  // TODO: Handle other errors
  return {
    status: -1,
    message: error.message || 'An unexpected error occurred',
  };
};

// TODO: Implement error logger
export const logError = (error, context = '') => {
  if (import.meta.env.MODE === 'development') {
    console.error(`[${context}]`, error);
  }
  // TODO: Send error to error tracking service (e.g., Sentry)
};
