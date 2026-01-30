import { useState, useEffect } from 'react'
import '../styles/ProfilePage.css'

// TODO: Fetch user profile data from backend
// TODO: Implement profile edit functionality
// TODO: Add user's video list
// TODO: Add user's playlist list
// TODO: Implement avatar upload
// TODO: Add follower/following section

const ProfilePage = () => {
  const [user, setUser] = useState(null)
  const [userVideos, setUserVideos] = useState([])
  const [userPlaylists, setUserPlaylists] = useState([])
  const [loading, setLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    // TODO: Fetch current user profile data from /api/users/profile
    const fetchProfile = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/users/profile')
        const data = await response.json()
        setUser(data.data)
      } catch (error) {
        console.error('Error fetching profile:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  const handleEditProfile = () => {
    // TODO: Submit profile changes to backend
    setIsEditing(!isEditing)
  }

  return (
    <div className="profile-page">
      {loading ? (
        <p>Loading profile...</p>
      ) : (
        <>
          <div className="profile-header">
            <img src={user?.avatar} alt="User avatar" className="profile-avatar" />
            <div className="profile-info">
              <h1>{user?.username}</h1>
              <p>{user?.email}</p>
              <div className="profile-stats">
                <div>
                  <strong>{user?.subscribers}</strong>
                  <span>Subscribers</span>
                </div>
                <div>
                  <strong>{user?.subscribedTo?.length}</strong>
                  <span>Following</span>
                </div>
                <div>
                  <strong>{userVideos?.length}</strong>
                  <span>Videos</span>
                </div>
              </div>
              <button className="edit-profile-btn" onClick={handleEditProfile}>
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </button>
            </div>
          </div>

          {isEditing && (
            <div className="edit-profile-form">
              {/* TODO: Add profile edit form fields */}
              <input type="text" placeholder="Username" defaultValue={user?.username} />
              <textarea placeholder="Bio" defaultValue={user?.bio} />
            </div>
          )}

          <div className="profile-content">
            <div className="profile-videos">
              <h2>Videos</h2>
              <div className="videos-grid">
                {/* TODO: Render user's videos */}
                {userVideos.length > 0 ? (
                  userVideos.map(video => (
                    <div key={video._id} className="video-item">
                      <img src={video.thumbnail} alt={video.title} />
                      <p>{video.title}</p>
                    </div>
                  ))
                ) : (
                  <p>No videos uploaded yet</p>
                )}
              </div>
            </div>

            <div className="profile-playlists">
              <h2>Playlists</h2>
              <div className="playlists-grid">
                {/* TODO: Render user's playlists */}
                {userPlaylists.length > 0 ? (
                  userPlaylists.map(playlist => (
                    <div key={playlist._id} className="playlist-item">
                      <h3>{playlist.name}</h3>
                      <p>{playlist.videos?.length} videos</p>
                    </div>
                  ))
                ) : (
                  <p>No playlists created yet</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ProfilePage
