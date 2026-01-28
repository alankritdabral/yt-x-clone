// TODO: Create reusable VideoCard component for video grid display
import React from 'react';
import { Link } from 'react-router-dom';
import { formatRelativeTime } from '../../utils/formatDate';

const VideoCard = ({ video }) => {
  return (
    <Link to={`/video/${video._id}`} className="video-card">
      {/* TODO: Video thumbnail with play button overlay */}
      <div className="video-card__thumbnail">
        <img src={video.thumbnail} alt={video.title} />
        {/* TODO: Add duration badge */}
        <div className="video-card__duration">{video.duration}</div>
      </div>

      {/* TODO: Video metadata */}
      <div className="video-card__info">
        {/* TODO: Channel avatar */}
        <img
          src={video.owner?.avatar}
          alt={video.owner?.username}
          className="video-card__avatar"
        />

        <div className="video-card__details">
          {/* TODO: Video title with ellipsis */}
          <h3 className="video-card__title">{video.title}</h3>

          {/* TODO: Channel name */}
          <p className="video-card__channel">{video.owner?.username}</p>

          {/* TODO: View count and upload date */}
          <div className="video-card__meta">
            <span>{video.views} views</span>
            <span>•</span>
            <span>{formatRelativeTime(video.createdAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
