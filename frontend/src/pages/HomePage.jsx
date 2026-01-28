// TODO: Create Home page component
import React, { useEffect, useState } from 'react';
import { useVideoStore } from '../store/videoStore';
import { videoService } from '../services/videoService';

const HomePage = () => {
  const { videos, loading, error } = useVideoStore();
  const [filters, setFilters] = useState({});

  // TODO: Fetch videos on component mount
  useEffect(() => {
    const loadVideos = async () => {
      try {
        await videoService.fetchAllVideos(filters);
      } catch (err) {
        console.error('Failed to load videos:', err);
      }
    };
    loadVideos();
  }, [filters]);

  return (
    <div className="home-page">
      {/* TODO: Add filter section */}
      <section className="home-page__filters">
        {/* TODO: Category filters */}
        {/* TODO: Sort options */}
      </section>

      {/* TODO: Add video grid */}
      <section className="home-page__videos">
        {loading && <p>Loading videos...</p>}
        {error && <p className="error">Error: {error}</p>}
        {videos.length > 0 ? (
          <div className="video-grid">
            {videos.map((video) => (
              // TODO: Create VideoCard component
              <div key={video._id} className="video-card">
                {/* TODO: Video thumbnail */}
                {/* TODO: Video title */}
                {/* TODO: Channel info */}
                {/* TODO: View count and date */}
              </div>
            ))}
          </div>
        ) : (
          <p>No videos found</p>
        )}
      </section>
    </div>
  );
};

export default HomePage;
