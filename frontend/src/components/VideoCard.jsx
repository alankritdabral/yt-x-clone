import '../styles/VideoCard.css'

// TODO: Add video thumbnail hover effects
// TODO: Implement video duration display
// TODO: Add view count formatting
// TODO: Implement click handler to navigate to video page

const VideoCard = ({ video }) => {
  // Construct full thumbnail URL if it's just a path
  const getThumbnailUrl = () => {
    if (!video?.thumbnail) return 'https://via.placeholder.com/320x180?text=No+Thumbnail';
    
    // If it's already a full URL, return as is
    if (video.thumbnail.startsWith('http')) {
      return video.thumbnail;
    }
    
    // If it's a path, construct full URL
    const baseUrl = 'http://localhost:8000';
    return `${baseUrl}${video.thumbnail.startsWith('/') ? '' : '/'}${video.thumbnail}`;
  };

  return (
    <div className="video-card">
      <div className="video-thumbnail">
        <img 
          src={getThumbnailUrl()} 
          alt={video?.title} 
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/320x180?text=No+Thumbnail';
          }}
        />
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
