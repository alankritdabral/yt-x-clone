// TODO: Implement email validation utility
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// TODO: Implement password validation utility
export const validatePassword = (password) => {
  // TODO: Password should be at least 8 characters with uppercase, lowercase, and number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

// TODO: Implement username validation utility
export const validateUsername = (username) => {
  // TODO: Username should be 3-20 characters, alphanumeric with underscores
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
};

// TODO: Implement file size validation utility
export const validateFileSize = (file, maxSize) => {
  return file.size <= maxSize;
};

// TODO: Implement file type validation utility
export const validateFileType = (file, allowedTypes) => {
  return allowedTypes.includes(file.type);
};

// TODO: Implement URL validation utility
export const validateURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
