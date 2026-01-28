import '../styles/VideoCard.css'

// TODO: Add video thumbnail hover effects
// TODO: Implement video duration display
// TODO: Add view count formatting
// TODO: Implement click handler to navigate to video page

const VideoCard = ({ video }) => {
  return (
    <div className="video-card">
      <div className="video-thumbnail">
        <img src={video?.thumbnail} alt={video?.title} />
        <span className="video-duration">{video?.duration}</span>
      </div>
      <div className="video-info">
        <h3 className="video-title">{video?.title}</h3>
        <p className="channel-name">{video?.owner?.username}</p>
        <div className="video-stats">
          <span>{video?.views} views</span>
          <span>•</span>
          <span>{video?.createdAt}</span>
        </div>
      </div>
    </div>
  )
}

export default VideoCard
