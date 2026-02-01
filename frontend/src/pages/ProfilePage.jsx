import { useState } from "react";

const tabs = ["Home", "Videos", "Playlists", "About"];

const videos = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  title: `Sample Video Title ${i + 1}`,
  views: `${Math.floor(Math.random() * 100)}K views`,
  time: "2 days ago",
  thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
}));

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <div className="w-full bg-[#F6F0D7] min-h-screen">
      {/* ===== Channel Banner ===== */}
      <div className="h-48 md:h-60 bg-gray-300">
        <img
          src="https://images.unsplash.com/photo-1542281286-9e0a16bb7366"
          alt="Channel Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* ===== Channel Info ===== */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-6 gap-4">
          <div className="flex items-center gap-5">
            <img
              src="https://i.pravatar.cc/150"
              alt="Avatar"
              className="w-24 h-24 rounded-full"
            />

            <div>
              <h1 className="text-2xl font-bold">YT-X Channel</h1>
              <p className="text-sm text-gray-600">
                @ytx • 120K subscribers • 45 videos
              </p>
            </div>
          </div>

          <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-900 w-fit">
            Subscribe
          </button>
        </div>

        {/* ===== Tabs ===== */}
        <div className="border-b border-gray-300 flex gap-6 text-sm font-medium">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 ${
                activeTab === tab
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ===== Content ===== */}
        <div className="py-6">
          {activeTab === "Home" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {videos.map((video) => (
                <div key={video.id} className="cursor-pointer">
                  <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h3 className="mt-2 text-sm font-semibold line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-xs text-gray-600">
                    {video.views} • {video.time}
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "Videos" && (
            <p className="text-gray-600">All uploaded videos will appear here.</p>
          )}

          {activeTab === "Playlists" && (
            <p className="text-gray-600">Public playlists will appear here.</p>
          )}

          {activeTab === "About" && (
            <div className="max-w-xl text-sm text-gray-700 space-y-2">
              <p>
                Welcome to the YT-X Channel. This channel focuses on tech,
                programming, and full-stack development.
              </p>
              <p>
                📧 Business Email: ytx@business.com
              </p>
              <p>
                🌍 Joined Jan 2024
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
