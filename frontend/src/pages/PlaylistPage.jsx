import { useState, useEffect } from 'react'
import VideoCard from '../components/VideoCard'

// TODO: Fetch playlists from backend
// TODO: Implement create new playlist
// TODO: Add delete playlist functionality
// TODO: Implement add/remove video from playlist
// TODO: Add reorder videos in playlist
// TODO: Implement share playlist

const PlaylistPage = () => {
  const [playlists, setPlaylists] = useState([])
  const [selectedPlaylist, setSelectedPlaylist] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newPlaylistName, setNewPlaylistName] = useState('')

  useEffect(() => {
    // TODO: Fetch user's playlists from /api/playlists
    // const fetchPlaylists = async () => {
    //   try {
    //     setLoading(true)
    //     const response = await fetch('/api/playlists')
    //     const data = await response.json()
    //     setPlaylists(data.data)
    //   } catch (error) {
    //     console.error('Error fetching playlists:', error)
    //   } finally {
    //     setLoading(false)
    //   }
    // }
    // fetchPlaylists()
  }, [])

  const handleCreatePlaylist = () => {
    // TODO: Send create playlist request to backend
    setNewPlaylistName('')
    setShowCreateForm(false)
  }

  const handleDeletePlaylist = (playlistId) => {
    // TODO: Send delete playlist request to backend
  }

  return (
    <div className="playlist-page">
      <div className="playlist-header">
        <h1>My Playlists</h1>
        <button onClick={() => setShowCreateForm(true)} className="create-playlist-btn">
          + Create Playlist
        </button>
      </div>

      {showCreateForm && (
        <div className="create-playlist-form">
          <input
            type="text"
            placeholder="Enter playlist name"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
          />
          <button onClick={handleCreatePlaylist}>Create</button>
          <button onClick={() => setShowCreateForm(false)}>Cancel</button>
        </div>
      )}

      {loading ? (
        <p>Loading playlists...</p>
      ) : (
        <div className="playlists-container">
          <div className="playlists-list">
            {playlists.map((playlist) => (
              <div
                key={playlist._id}
                className={`playlist-item ${selectedPlaylist?._id === playlist._id ? 'active' : ''}`}
                onClick={() => setSelectedPlaylist(playlist)}
              >
                <h3>{playlist.name}</h3>
                <p>{playlist.videos?.length || 0} videos</p>
                <button
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeletePlaylist(playlist._id)
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          {selectedPlaylist && (
            <div className="playlist-videos">
              <h2>{selectedPlaylist.name}</h2>
              <div className="videos-grid">
                {/* TODO: Render videos in selected playlist */}
                {selectedPlaylist.videos?.length > 0 ? (
                  selectedPlaylist.videos.map((video) => (
                    <VideoCard key={video._id} video={video} />
                  ))
                ) : (
                  <p>No videos in this playlist</p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default PlaylistPage
