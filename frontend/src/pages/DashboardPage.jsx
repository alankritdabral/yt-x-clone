// TODO: Create Dashboard page component for channel management
import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';

const DashboardPage = () => {
  const { user } = useAuthStore();
  const [stats, setStats] = useState({
    totalViews: 0,
    totalVideos: 0,
    totalSubscribers: 0,
  });
  const [userVideos, setUserVideos] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  // TODO: Fetch dashboard statistics
  useEffect(() => {
    const loadDashboard = async () => {
      try {
        // TODO: Call dashboard API
        // TODO: Call user videos API
      } catch (error) {
        console.error('Failed to load dashboard:', error);
      }
    };
    loadDashboard();
  }, [user?._id]);

  return (
    <div className="dashboard-page">
      <h1>Channel Dashboard</h1>

      {/* TODO: Navigation tabs */}
      <nav className="dashboard-tabs">
        <button
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`tab ${activeTab === 'videos' ? 'active' : ''}`}
          onClick={() => setActiveTab('videos')}
        >
          Videos
        </button>
        <button
          className={`tab ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          Analytics
        </button>
        <button
          className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </nav>

      {/* TODO: Overview section */}
      {activeTab === 'overview' && (
        <section className="dashboard-overview">
          <div className="stats-grid">
            {/* TODO: Stat cards */}
            <div className="stat-card">
              <h3>Total Views</h3>
              <p className="stat-value">{stats.totalViews}</p>
            </div>
            <div className="stat-card">
              <h3>Total Videos</h3>
              <p className="stat-value">{stats.totalVideos}</p>
            </div>
            <div className="stat-card">
              <h3>Subscribers</h3>
              <p className="stat-value">{stats.totalSubscribers}</p>
            </div>
          </div>

          {/* TODO: Recent activity section */}
          <div className="recent-activity">
            <h2>Recent Activity</h2>
            {/* TODO: Activity list */}
          </div>
        </section>
      )}

      {/* TODO: Videos section */}
      {activeTab === 'videos' && (
        <section className="dashboard-videos">
          <button className="btn btn--primary">Upload New Video</button>
          {/* TODO: Videos table */}
          <table className="videos-table">
            <thead>
              <tr>
                <th>Thumbnail</th>
                <th>Title</th>
                <th>Views</th>
                <th>Likes</th>
                <th>Published</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userVideos.map((video) => (
                // TODO: Video row
                <tr key={video._id}>
                  <td>{/* Thumbnail */}</td>
                  <td>{video.title}</td>
                  <td>{video.views}</td>
                  <td>{video.likes}</td>
                  <td>{video.isPublished ? 'Yes' : 'No'}</td>
                  <td>{/* Edit, Delete buttons */}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* TODO: Analytics section */}
      {activeTab === 'analytics' && (
        <section className="dashboard-analytics">
          {/* TODO: Chart components for views over time */}
          {/* TODO: Chart components for engagement metrics */}
          {/* TODO: Chart components for subscriber growth */}
        </section>
      )}

      {/* TODO: Settings section */}
      {activeTab === 'settings' && (
        <section className="dashboard-settings">
          {/* TODO: Channel settings form */}
          {/* TODO: Privacy settings */}
          {/* TODO: Notification preferences */}
        </section>
      )}
    </div>
  );
};

export default DashboardPage;
