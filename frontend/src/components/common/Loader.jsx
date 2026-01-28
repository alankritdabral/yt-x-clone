// TODO: Create reusable Loader component for loading states
import React from 'react';

const Loader = ({ size = 'md', fullscreen = false }) => {
  const sizeClasses = {
    sm: 'loader--sm',
    md: 'loader--md',
    lg: 'loader--lg',
  };

  return (
    <div className={`loader ${sizeClasses[size]} ${fullscreen ? 'loader--fullscreen' : ''}`}>
      {/* TODO: Add spinning animation */}
      <div className="loader__spinner"></div>
      {/* TODO: Add loading text */}
      <p className="loader__text">Loading...</p>
    </div>
  );
};

export default Loader;
