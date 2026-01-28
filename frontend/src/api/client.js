// TODO: Configure axios instance with base URL and interceptors
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

// TODO: Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// TODO: Add request interceptor for token injection
apiClient.interceptors.request.use(
  (config) => {
    // TODO: Get token from localStorage/store and add to headers
    return config;
  },
  (error) => Promise.reject(error)
);

// TODO: Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // TODO: Handle 401, 403, 500 errors globally
    return Promise.reject(error);
  }
);

export default apiClient;
