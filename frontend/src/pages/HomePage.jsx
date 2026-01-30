import { useState, useEffect } from 'react'
import '../styles/HomePage.css'
import VideoCard from '../components/VideoCard'

// TODO: Fetch videos from backend API
// TODO: Implement infinite scroll or pagination
// TODO: Add filter by category
// TODO: Add sort options (newest, trending, most viewed)

const HomePage = () => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "http://localhost:8000/api/v1/videos",
          {
            method: "GET",
            credentials: "include",
          }
        );

        // 🔥 DO NOT parse JSON if backend failed
        if (!response.ok) {
          const text = await response.text();
          throw new Error(text);
        }

        const data = await response.json();
        console.log('API Response:', data);
        console.log('First video:', data.data.videos[0]);
        setVideos(data.data.videos);
      } catch (error) {
        console.error("Error fetching videos:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);
  return (
    <div className="home-page">
      <div className="filter-bar">
        {/* TODO: Add filter buttons */}
        <button>All</button>
        <button>Gaming</button>
        <button>Music</button>
        <button>Sports</button>
        <button>News</button>
      </div>

      <div className="videos-grid">
        {loading ? (
          <p>Loading videos...</p>
        ) : videos.length > 0 ? (
          videos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))
        ) : (
          <p>No videos found</p>
        )}
      </div>
    </div>
  )
}

export default HomePage
