// TODO: Configure environment variables
const ENV = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'YT X Clone',
  ENV_MODE: import.meta.env.MODE || 'development',
  CLOUDINARY_CLOUD_NAME: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '',
};

export default ENV;
