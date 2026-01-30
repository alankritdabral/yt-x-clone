import '../styles/Navbar.css'

// TODO: Implement search functionality
// TODO: Add notification bell
// TODO: Add user profile dropdown menu
// TODO: Implement logout functionality

const Navbar = ({ setCurrentPage, user, sidebarOpen, setSidebarOpen }) => {
  const handleSearch = (e) => {
    // TODO: Handle search input and navigate to search page
  }

  const handleLogout = async () => {
    const response = await fetch("http://localhost:8000/api/v1/users/logout",
      {
        method: "GET",
        credentials: 'include'
      },)
    if (response.ok) {
      loginStastus = "flase"
    }
    else {
      alert("logout fail")
    }

  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button 
          className="hamburger-btn" 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className="logo" onClick={() => setCurrentPage('home')}>
          <h2>YT-X Clone</h2>
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
