// TODO: Create VideoPlayer component with HLS streaming support
import React, { useRef, useEffect } from 'react';

const VideoPlayer = ({ src, thumbnail, onEnded }) => {
  const videoRef = useRef(null);

  // TODO: Handle video player initialization
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // TODO: Add play/pause event listeners
    const handlePlay = () => {
      // TODO: Track video play event
    };

    const handlePause = () => {
      // TODO: Track video pause event
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, []);

  return (
    <div className="video-player">
      {/* TODO: Add custom video player controls */}
      <video
        ref={videoRef}
        controls
        poster={thumbnail}
        onEnded={onEnded}
        className="video-player__video"
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* TODO: Add playback rate selector */}
      {/* TODO: Add quality selector */}
      {/* TODO: Add fullscreen button */}
    </div>
  );
};

export default VideoPlayer;
