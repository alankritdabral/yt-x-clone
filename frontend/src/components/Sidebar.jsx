import '../styles/Sidebar.css'

// TODO: Add active page highlighting
// TODO: Add subscription list

const Sidebar = ({ setCurrentPage, sidebarOpen, setSidebarOpen }) => {
  const handleMenuClick = (page) => {
    setCurrentPage(page)
    // Close sidebar on mobile/tablet after selecting
    if (window.innerWidth < 1024) {
      setSidebarOpen(false)
    }
  }

  return (
    <>
      {/* Overlay backdrop when sidebar is open */}
      {sidebarOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-menu">
          <button className="menu-item" onClick={() => handleMenuClick('home')}>
            🏠 Home
          </button>
          <button className="menu-item" onClick={() => handleMenuClick('search')}>
            🔍 Search
          </button>
          <button className="menu-item" onClick={() => handleMenuClick('tweets')}>
            🐦 Tweets
          </button>
          <button className="menu-item" onClick={() => handleMenuClick('playlist')}>
            📋 Playlists
          </button>
          <button className="menu-item" onClick={() => handleMenuClick('profile')}>
            👤 Profile
          </button>
          <button className="menu-item" onClick={() => handleMenuClick('upload')}>
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
    </>
  )
}

export default Sidebar
