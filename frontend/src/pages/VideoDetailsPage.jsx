// TODO: Create Video Details page component
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useVideoStore } from '../store/videoStore';
import { videoService } from '../services/videoService';

const VideoDetailsPage = () => {
  const { videoId } = useParams();
  const { currentVideo, loading, error } = useVideoStore();
  const [comments, setComments] = useState([]);

  // TODO: Fetch video details on mount
  useEffect(() => {
    const loadVideo = async () => {
      try {
        await videoService.fetchVideoById(videoId);
      } catch (err) {
        console.error('Failed to load video:', err);
      }
    };
    loadVideo();
  }, [videoId]);

  return (
    <div className="video-details-page">
      {loading && <p>Loading video...</p>}
      {error && <p className="error">Error: {error}</p>}
      {currentVideo && (
        <>
          {/* TODO: Video player section */}
          <section className="video-player">
            {/* TODO: Video player component */}
            <video controls>
              <source src={currentVideo.videoFile} type="video/mp4" />
            </video>
          </section>

          {/* TODO: Video info section */}
          <section className="video-info">
            <h1>{currentVideo.title}</h1>
            {/* TODO: View count, likes, date */}
            {/* TODO: Channel info and subscribe button */}
            {/* TODO: Description */}
          </section>

          {/* TODO: Comments section */}
          <section className="comments-section">
            {/* TODO: Add comment form */}
            {/* TODO: List comments */}
          </section>

          {/* TODO: Related videos section */}
          <section className="related-videos">
            {/* TODO: Display related videos */}
          </section>
        </>
      )}
    </div>
  );
};

export default VideoDetailsPage;
