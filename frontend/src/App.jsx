import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import HomePage from './pages/HomePage'
import VideoPage from './pages/VideoPage'
import UploadPage from './pages/UploadPage'
import ProfilePage from './pages/ProfilePage'
import SearchPage from './pages/SearchPage'
import PlaylistPage from './pages/PlaylistPage'
import TweetFeedPage from './pages/TweetFeedPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  // TODO: Check if user is already logged in on mount
  useEffect(() => {
    // TODO: Fetch user data from localStorage or API
  }, [])

  const renderPage = () => {
    // TODO: Implement page routing logic
    switch (currentPage) {
      case 'home':
        return <HomePage />
      case 'video':
        return <VideoPage />
      case 'upload':
        return <UploadPage />
      case 'profile':
        return <ProfilePage />
      case 'search':
        return <SearchPage />
      case 'playlist':
        return <PlaylistPage />
      case 'tweets':
        return <TweetFeedPage />
      case 'login':
        return <LoginPage setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
      case 'register':
        return <RegisterPage />
      default:
        return <HomePage />
    }
  }

  return (
    <div className="app">
      {/* TODO: Conditionally render navbar based on login state */}
      {isLoggedIn && <Navbar setCurrentPage={setCurrentPage} user={user} />}
      <div className="app-container">
        {/* TODO: Conditionally render sidebar based on login state */}
        {isLoggedIn && <Sidebar setCurrentPage={setCurrentPage} />}
        <main className="main-content">
          {renderPage()}
        </main>
      </div>
    </div>
  )
}

export default App
