// TODO: Create PlaylistCard component for displaying playlists
import React from 'react';
import { Link } from 'react-router-dom';

const PlaylistCard = ({ playlist }) => {
  return (
    <Link to={`/playlist/${playlist._id}`} className="playlist-card">
      {/* TODO: Playlist thumbnail grid (4 videos) */}
      <div className="playlist-card__thumbnail">
        {playlist.videos?.slice(0, 4).map((video) => (
          <img key={video._id} src={video.thumbnail} alt="Video" />
        ))}
      </div>

      {/* TODO: Playlist info */}
      <div className="playlist-card__info">
        <h3 className="playlist-card__title">{playlist.name}</h3>
        <p className="playlist-card__count">{playlist.videos?.length} videos</p>
      </div>
    </Link>
  );
};

export default PlaylistCard;
