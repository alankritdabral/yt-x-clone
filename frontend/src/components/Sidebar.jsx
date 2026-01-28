import '../styles/Sidebar.css'

// TODO: Add active page highlighting
// TODO: Add sidebar collapse/expand functionality
// TODO: Add subscription list

const Sidebar = ({ setCurrentPage }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-menu">
        <button className="menu-item" onClick={() => setCurrentPage('home')}>
          🏠 Home
        </button>
        <button className="menu-item" onClick={() => setCurrentPage('search')}>
          🔍 Search
        </button>
        <button className="menu-item" onClick={() => setCurrentPage('tweets')}>
          🐦 Tweets
        </button>
        <button className="menu-item" onClick={() => setCurrentPage('playlist')}>
          📋 Playlists
        </button>
        <button className="menu-item" onClick={() => setCurrentPage('profile')}>
          👤 Profile
        </button>
        <button className="menu-item" onClick={() => setCurrentPage('upload')}>
          📤 Upload Video
        </button>
      </div>

      {/* TODO: Add subscription section */}
      <div className="sidebar-subscriptions">
        <h3>Subscriptions</h3>
        <ul className="subscription-list">
          {/* TODO: Fetch and render subscribed channels */}
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar
