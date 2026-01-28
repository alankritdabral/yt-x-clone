// TODO: Create CommentSection component for video comments
import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';

const CommentSection = ({ videoId }) => {
  const { user, isAuthenticated } = useAuthStore();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  // TODO: Fetch comments on mount
  useEffect(() => {
    const loadComments = async () => {
      try {
        setLoading(true);
        // TODO: Call comments API to fetch all comments
      } catch (error) {
        console.error('Failed to load comments:', error);
      } finally {
        setLoading(false);
      }

      
    };
    loadComments();
  }, [videoId]);

  // TODO: Handle adding new comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !isAuthenticated) return;

    try {
      // TODO: Call create comment API
      setNewComment('');
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  return (
    <div className="comment-section">
      <h3>Comments ({comments.length})</h3>

      {/* TODO: Comment form for authenticated users */}
      {isAuthenticated ? (
        <form onSubmit={handleAddComment} className="comment-form">
          <img src={user?.avatar} alt="User avatar" className="comment-form__avatar" />
          <div className="comment-form__input">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
            />
            <button type="submit" disabled={!newComment.trim()}>
              Comment
            </button>
          </div>
        </form>
      ) : (
        <p>Sign in to comment</p>
      )}

      {/* TODO: Comments list */}
      <div className="comments-list">
        {loading && <p>Loading comments...</p>}
        {comments.length > 0 ? (
          comments.map((comment) => (
            // TODO: CommentItem component
            <div key={comment._id} className="comment-item">
              <img src={comment.owner?.avatar} alt="Avatar" />
              <div>
                <p className="comment-author">{comment.owner?.username}</p>
                <p className="comment-text">{comment.content}</p>
                {/* TODO: Like, Reply buttons */}
              </div>
            </div>
          ))
        ) : (
          <p>No comments yet</p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
