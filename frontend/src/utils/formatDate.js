// TODO: Implement date formatting utility
export const formatDate = (date) => {
  // TODO: Format date to readable format (e.g., "Jan 28, 2026")
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// TODO: Implement relative time formatting (e.g., "2 hours ago")
export const formatRelativeTime = (date) => {
  const now = new Date();
  const target = new Date(date);
  const seconds = Math.floor((now - target) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [name, secondsInInterval] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInInterval);
    if (interval >= 1) {
      return `${interval} ${name}${interval > 1 ? 's' : ''} ago`;
    }
  }
  return 'just now';
};
