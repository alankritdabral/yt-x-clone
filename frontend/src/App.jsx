import './App.css';
import { Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

import HomePage from './pages/HomePage';
import VideoPage from './pages/VideoPage';
import UploadPage from './pages/UploadPage';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';
import PlaylistPage from './pages/PlaylistPage';
import TweetFeedPage from './pages/TweetFeedPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import { useState } from "react";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState({
    username: 'SignIn',
    avatar:
      'https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg',
  });

  return (
    <div className="flex flex-col h-screen bg-[#F6F0D7]">
      {/* Navbar */}
      <Navbar
        user={user}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main Content */}
        <main
          className={`
    flex-1 overflow-y-auto p-6 bg-[#F6F0D7]
    transition-all duration-300
    ${sidebarOpen ? "ml-56" : "ml-20"}
  `}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/watch/:videoId" element={<VideoPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/profile/:username" element={<ProfilePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/playlist/:id" element={<PlaylistPage />} />
            <Route path="/tweets" element={<TweetFeedPage />} />
            <Route
              path="/login"
              element={<LoginPage setIsLoggedIn={setIsLoggedIn} setUser={setUser} />}
            />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>

      </div>
    </div>
  );
}

export default App;
