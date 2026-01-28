// TODO: Create playlist manager component for CRUD operations
import React, { useState } from 'react';

const PlaylistManager = ({ onPlaylistCreated }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // TODO: Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // TODO: Handle form submission for creating playlist
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Playlist name is required');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      // TODO: Call playlist creation API
      // await playlistService.createPlaylist(formData);
      onPlaylistCreated?.();
      setFormData({ name: '', description: '' });
      setShowForm(false);
    } catch (err) {
      setError(err.message || 'Failed to create playlist');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="playlist-manager">
      {/* TODO: Create playlist button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="btn btn--primary"
      >
        Create Playlist
      </button>

      {/* TODO: Playlist creation form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="playlist-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="name">Playlist Name*</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter playlist name"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter playlist description"
              rows="3"
              disabled={loading}
            />
          </div>

          <button type="submit" disabled={loading} className="btn btn--primary">
            {loading ? 'Creating...' : 'Create'}
          </button>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="btn btn--secondary"
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default PlaylistManager;
