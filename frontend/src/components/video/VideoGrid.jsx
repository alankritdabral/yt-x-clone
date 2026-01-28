// TODO: Create reusable video grid component with lazy loading
import React, { useEffect, useState } from 'react';
import VideoCard from './VideoCard';
import Loader from '../common/Loader';

const VideoGrid = ({ videos, loading, error, onLoadMore }) => {
  const [displayVideos, setDisplayVideos] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  // TODO: Handle pagination
  useEffect(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayVideos(videos.slice(0, endIndex));
  }, [videos, page]);

  // TODO: Handle infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.scrollHeight - 500
      ) {
        if (displayVideos.length < videos.length) {
          setPage((prev) => prev + 1);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [displayVideos.length, videos.length]);

  if (error) {
    return <div className="error-message">Error loading videos: {error}</div>;
  }

  return (
    <div className="video-grid">
      {displayVideos.length > 0 ? (
        <div className="video-grid__container">
          {displayVideos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      ) : (
        <p className="video-grid__empty">No videos found</p>
      )}

      {/* TODO: Show loader while fetching more */}
      {loading && <Loader />}

      {/* TODO: Show load more button if needed */}
      {displayVideos.length < videos.length && !loading && (
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="btn btn--secondary"
        >
          Load More Videos
        </button>
      )}
    </div>
  );
};

export default VideoGrid;
