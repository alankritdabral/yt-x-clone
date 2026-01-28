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
    // TODO: Fetch videos from /api/videos endpoint
    // const fetchVideos = async () => {
    //   try {
    //     setLoading(true)
    //     const response = await fetch('/api/videos')
    //     const data = await response.json()
    //     setVideos(data.data)
    //   } catch (error) {
    //     console.error('Error fetching videos:', error)
    //   } finally {
    //     setLoading(false)
    //   }
    // }
    // fetchVideos()
  }, [])

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
