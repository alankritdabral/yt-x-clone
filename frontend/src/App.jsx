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
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState({
    username: 'SignIn',
    avatar: 'https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg'
  }) // Mock user for testing

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage />
      case 'video': return <VideoPage />
      case 'upload': return <UploadPage />
      case 'profile': return <ProfilePage />
      case 'search': return <SearchPage />
      case 'playlist': return <PlaylistPage />
      case 'tweets': return <TweetFeedPage />
      case 'login': return <LoginPage setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
      case 'register': return <RegisterPage />
      default: return <HomePage />
    }
  }

  return (
    <div className="flex flex-col h-screen bg-[#F6F0D7]">
      {/* Navbar stays at the top */}
      <Navbar setCurrentPage={setCurrentPage} user={user} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar as hamburger menu */}
        <Sidebar setCurrentPage={setCurrentPage} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main content area takes full width */}
        <main className="flex-1 overflow-y-auto p-6 bg-[#F6F0D7]">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
export default App