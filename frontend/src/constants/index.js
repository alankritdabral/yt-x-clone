// TODO: Define application constants
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

// TODO: Define API error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'Please log in to continue.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'Resource not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input.',
};

// TODO: Define success messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  LOGOUT_SUCCESS: 'Logged out successfully.',
  REGISTER_SUCCESS: 'Registration successful!',
  UPDATE_SUCCESS: 'Updated successfully!',
  DELETE_SUCCESS: 'Deleted successfully!',
  UPLOAD_SUCCESS: 'Uploaded successfully!',
};

// TODO: Define route paths
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile/:userId',
  VIDEO: '/video/:videoId',
  DASHBOARD: '/dashboard',
  PLAYLIST: '/playlist/:playlistId',
  CHANNEL: '/channel/:channelId',
  WATCH_HISTORY: '/watch-history',
};

// TODO: Define pagination defaults
export const PAGINATION = {
  DEFAULT_LIMIT: 10,
  DEFAULT_PAGE: 1,
};

// TODO: Define video upload constraints
export const VIDEO_UPLOAD = {
  MAX_SIZE: 100 * 1024 * 1024, // 100MB
  ALLOWED_FORMATS: ['video/mp4', 'video/webm', 'video/ogg'],
};

// TODO: Define image upload constraints
export const IMAGE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_FORMATS: ['image/jpeg', 'image/png', 'image/webp'],
};
