// TODO: Create User Profile page component
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const UserProfilePage = () => {
  const { userId } = useParams();
  const { user: currentUser } = useAuthStore();
  const [profileUser, setProfileUser] = useState(null);
  const [profileVideos, setProfileVideos] = useState([]);
  const [activeTab, setActiveTab] = useState('videos');
  const [loading, setLoading] = useState(true);

  // TODO: Fetch user profile and videos
  useEffect(() => {
    const loadProfile = async () => {
      try {
        // TODO: Call user profile API
        // TODO: Call user videos API
      } catch (error) {
        console.error('Failed to load profile:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, [userId]);

  return (
    <div className="profile-page">
      {loading && <p>Loading profile...</p>}
      {profileUser && (
        <>
          {/* TODO: Profile header section */}
          <section className="profile-header">
            {/* TODO: Banner image */}
            <div className="profile-banner"></div>

            {/* TODO: Profile info */}
            <div className="profile-info">
              {/* TODO: Avatar */}
              {/* TODO: Channel name */}
              {/* TODO: Subscriber count */}
              {/* TODO: Subscribe button (if not own profile) */}
              {/* TODO: Edit profile button (if own profile) */}
            </div>
          </section>

          {/* TODO: Tabs for videos, playlists, about */}
          <section className="profile-tabs">
            <button
              className={`tab ${activeTab === 'videos' ? 'active' : ''}`}
              onClick={() => setActiveTab('videos')}
            >
              Videos
            </button>
            <button
              className={`tab ${activeTab === 'playlists' ? 'active' : ''}`}
              onClick={() => setActiveTab('playlists')}
            >
              Playlists
            </button>
            <button
              className={`tab ${activeTab === 'about' ? 'active' : ''}`}
              onClick={() => setActiveTab('about')}
            >
              About
            </button>
          </section>

          {/* TODO: Tab content */}
          <section className="profile-content">
            {activeTab === 'videos' && (
              <div className="videos-grid">
                {profileVideos.map((video) => (
                  // TODO: VideoCard component
                  <div key={video._id}>Video: {video.title}</div>
                ))}
              </div>
            )}
            {activeTab === 'playlists' && <div>{/* TODO: Playlists grid */}</div>}
            {activeTab === 'about' && <div>{/* TODO: About section */}</div>}
          </section>
        </>
      )}
    </div>
  );
};

export default UserProfilePage;
