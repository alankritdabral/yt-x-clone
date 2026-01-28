import '../styles/Navbar.css'

// TODO: Implement search functionality
// TODO: Add notification bell
// TODO: Add user profile dropdown menu
// TODO: Implement logout functionality

const Navbar = ({ setCurrentPage, user }) => {
  const handleSearch = (e) => {
    // TODO: Handle search input and navigate to search page
  }

  const handleLogout = () => {
    // TODO: Clear user data and reset app state
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo" onClick={() => setCurrentPage('home')}>
          <h1>YT-X Clone</h1>
        </div>
      </div>

      <div className="navbar-center">
        <input
          type="text"
          className="search-bar"
          placeholder="Search videos, tweets..."
          onChange={handleSearch}
        />
        <button className="search-btn">Search</button>
      </div>

      <div className="navbar-right">
        {/* TODO: Add notification icon */}
        <button className="notification-btn">🔔</button>

        {/* TODO: Add user profile section */}
        <div className="user-profile">
          <img src={user?.avatar} alt="User avatar" className="user-avatar" />
          <span className="user-name">{user?.username}</span>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
