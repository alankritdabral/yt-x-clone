import { useState, useEffect } from "react";
import VideoCard from "../components/VideoCard";

const API = "http://localhost:8000/api/v1/playlist";

const PlaylistPage = () => {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");

  /* ===========================
     Fetch Playlists
  =========================== */
  const fetchPlaylists = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await fetch(`${API}/user/${user._id}`, {
        credentials: "include",
      });

      const data = await res.json();
      setPlaylists(data.data || []);
    } catch (err) {
      console.error("Fetch playlists error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  /* ===========================
     Fetch Playlist Details
  =========================== */
  const fetchPlaylistDetails = async (playlistId) => {
    try {
      const res = await fetch(`${API}/${playlistId}`, {
        credentials: "include",
      });

      const data = await res.json();
      setSelectedPlaylist(data.data);
    } catch (err) {
      console.error("Fetch playlist error:", err);
    }
  };

  /* ===========================
     Create Playlist
  =========================== */
  const handleCreatePlaylist = async () => {
    if (!newPlaylistName.trim()) return;

    try {
      await fetch(API, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newPlaylistName,
        }),
      });

      setNewPlaylistName("");
      setShowCreateForm(false);
      fetchPlaylists();
    } catch (err) {
      console.error("Create playlist error:", err);
    }
  };

  /* ===========================
     Delete Playlist
  =========================== */
  const handleDeletePlaylist = async (playlistId) => {
    try {
      await fetch(`${API}/${playlistId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (selectedPlaylist?._id === playlistId) {
        setSelectedPlaylist(null);
      }

      fetchPlaylists();
    } catch (err) {
      console.error("Delete playlist error:", err);
    }
  };

  return (
    <div className="playlist-page p-4">
      <div className="playlist-header flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">My Playlists</h1>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-black text-white px-3 py-1 rounded"
        >
          + Create Playlist
        </button>
      </div>

      {showCreateForm && (
        <div className="mb-4 flex gap-2">
          <input
            type="text"
            placeholder="Enter playlist name"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
            className="border p-2 rounded w-64"
          />
          <button
            onClick={handleCreatePlaylist}
            className="bg-green-600 text-white px-3 rounded"
          >
            Create
          </button>
          <button
            onClick={() => setShowCreateForm(false)}
            className="bg-gray-300 px-3 rounded"
          >
            Cancel
          </button>
        </div>
      )}

      {loading ? (
        <p>Loading playlists...</p>
      ) : (
        <div className="playlists-container flex gap-6">
          {/* Playlist list */}
          <div className="playlists-list w-64 border-r pr-4">
            {playlists.map((playlist) => (
              <div
                key={playlist._id}
                className={`p-3 mb-2 border rounded cursor-pointer ${selectedPlaylist?._id === playlist._id
                    ? "bg-gray-200"
                    : ""
                  }`}
                onClick={() => fetchPlaylistDetails(playlist._id)}
              >
                <h3 className="font-medium">{playlist.name}</h3>
                <p className="text-sm text-gray-600">
                  {playlist.videos?.length || 0} videos
                </p>

                <button
                  className="text-red-600 text-sm mt-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeletePlaylist(playlist._id);
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          {/* Playlist videos */}
          {selectedPlaylist && (
            <div className="playlist-videos flex-1">
              <h2 className="text-xl font-semibold mb-4">
                {selectedPlaylist.name}
              </h2>

              <div className="videos-grid grid grid-cols-3 gap-4">
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
  );
};

export default PlaylistPage;
