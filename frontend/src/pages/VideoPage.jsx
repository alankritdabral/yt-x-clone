import { useState, useEffect } from 'react'
import '../styles/VideoPage.css'

// TODO: Fetch video details from backend using video ID
// TODO: Implement video player
// TODO: Add like/dislike functionality
// TODO: Implement subscribe button
// TODO: Add comment section
// TODO: Display related videos
// TODO: Implement share functionality

const VideoPage = () => {
  const [video, setVideo] = useState(null)
  const [comments, setComments] = useState([])
  const [relatedVideos, setRelatedVideos] = useState([])
  const [loading, setLoading] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    // TODO: Fetch video details from /api/videos/:videoId
    const fetchVideo = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/videos/${videoId}`)
        const data = await response.json()
        setVideo(data.data)
      } catch (error) {
        console.error('Error fetching video:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchVideo()
  }, [])

  const handleLike = () => {
    // TODO: Send like request to /api/likes/toggle?videoId=
    setIsLiked(!isLiked)
  }

  const handleSubscribe = () => {
    // TODO: Send subscribe request to /api/subscriptions/subscribe
    setIsSubscribed(!isSubscribed)
  }

  const handleAddComment = () => {
    if (!newComment.trim()) return
    // TODO: Send comment to /api/comments
    setNewComment('')
  }

  return (
    <div className="video-page">
      {loading ? (
        <p>Loading video...</p>
      ) : video ? (
        <>
          <div className="video-container">
            <video
              className="video-player"
              controls
              poster={video?.thumbnail}
            >
              <source src={video?.videoFile} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="video-details">
            <h1>{video?.title}</h1>
            <div className="video-meta">
              <span>{video?.views} views</span>
              <span>•</span>
              <span>{video?.createdAt}</span>
            </div>

            <div className="video-actions">
              <button 
                className={`action-btn ${isLiked ? 'active' : ''}`}
                onClick={handleLike}
              >
                👍 {video?.likes || 0}
              </button>
              <button className="action-btn">
                👎 {video?.dislikes || 0}
              </button>
              <button className="action-btn">
                🔗 Share
              </button>
              <button className="action-btn">
                📌 Save
              </button>
            </div>

            <div className="channel-section">
              <div className="channel-info">
                <img 
                  src={video?.owner?.avatar} 
                  alt="Channel avatar" 
                  className="channel-avatar"
                />
                <div>
                  <h3>{video?.owner?.username}</h3>
                  <p>{video?.owner?.subscribers} subscribers</p>
                </div>
              </div>
              <button 
                className={`subscribe-btn ${isSubscribed ? 'subscribed' : ''}`}
                onClick={handleSubscribe}
              >
                {isSubscribed ? 'Subscribed' : 'Subscribe'}
              </button>
            </div>

            <div className="video-description">
              <h3>Description</h3>
              <p>{video?.description}</p>
            </div>
          </div>

          <div className="comments-section">
            <h2>Comments ({comments.length})</h2>
            
            <div className="comment-compose">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                rows="3"
              />
              <button 
                onClick={handleAddComment}
                disabled={!newComment.trim()}
              >
                Comment
              </button>
            </div>

            <div className="comments-list">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment._id} className="comment-item">
                    <img 
                      src={comment.owner?.avatar} 
                      alt="User avatar"
                      className="comment-avatar"
                    />
                    <div className="comment-content">
                      <div className="comment-header">
                        <strong>{comment.owner?.username}</strong>
                        <span>{comment.createdAt}</span>
                      </div>
                      <p>{comment.content}</p>
                      <div className="comment-actions">
                        <button>👍 {comment.likes || 0}</button>
                        <button>👎</button>
                        <button>Reply</button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No comments yet</p>
              )}
            </div>
          </div>

          <div className="related-videos">
            <h2>Related Videos</h2>
            <div className="related-grid">
              {/* TODO: Render related videos */}
              {relatedVideos.length > 0 ? (
                relatedVideos.map((video) => (
                  <div key={video._id} className="related-item">
                    <img src={video.thumbnail} alt={video.title} />
                    <h4>{video.title}</h4>
                    <p>{video.owner?.username}</p>
                    <p>{video.views} views</p>
                  </div>
                ))
              ) : (
                <p>No related videos</p>
              )}
            </div>
          </div>
        </>
      ) : (
        <p>Video not found</p>
      )}
    </div>
  )
}

export default VideoPage
