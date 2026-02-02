import { useNavigate } from "react-router-dom";

const VideoCard = ({ video }) => {
  const navigate = useNavigate();

  const getThumbnailUrl = () => {
    if (!video?.thumbnail) {
      return "https://via.placeholder.com/320x180?text=No+Thumbnail";
    }

    if (video.thumbnail.startsWith("http")) {
      return video.thumbnail;
    }

    const baseUrl = "http://localhost:8000";
    return `${baseUrl}${video.thumbnail.startsWith("/") ? "" : "/"
      }${video.thumbnail}`;
  };

  // ✅ Avatar helper
  const getAvatarUrl = () => {
    if (!video?.owner?.avatar)
      return "https://via.placeholder.com/40?text=U";

    if (video.owner.avatar.startsWith("http"))
      return video.owner.avatar;

    return `http://localhost:8000/${video.owner.avatar}`;
  };

  const formatViews = (views = 0) => {
    if (views >= 1_000_000)
      return `${(views / 1_000_000).toFixed(1)}M`;
    if (views >= 1_000)
      return `${(views / 1_000).toFixed(1)}K`;
    return views;
  };

  const timeAgo = (date) => {
    const seconds = Math.floor(
      (Date.now() - new Date(date)) / 1000
    );

    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
    ];

    for (const i of intervals) {
      const count = Math.floor(seconds / i.seconds);
      if (count >= 1) {
        return `${count} ${i.label}${count > 1 ? "s" : ""
          } ago`;
      }
    }
    return "just now";
  };

  const handleClick = () => {
    navigate(`/watch/${video?._id}`);
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      {/* Thumbnail */}
      <div className="relative rounded-xl overflow-hidden bg-gray-200 group aspect-[16/10]">
        <img
          src={getThumbnailUrl()}
          alt={video?.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {video?.duration && (
          <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
            {Number(video.duration).toFixed(2)}
          </span>
        )}

      </div>

      <div className="mt-3 flex gap-2 items-start">
        <img
          src={getAvatarUrl()}
          alt={video?.owner?.username}
          className="w-9 h-9 rounded-full object-cover shrink-0"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/40?text=U";
          }}
        />

        <div className="flex flex-col flex-1">
          <h3 className="text-m font-medium text-gray-900 leading-snug line-clamp-2 text-left">
            {video?.title}
          </h3>

          <p className="text-xs text-gray-600 mt-1 truncate text-left">
            {video?.owner?.username}
          </p>


          <div className="text-xs text-gray-600 flex items-center gap-1 whitespace-nowrap">
            <span>{formatViews(video?.views)} views</span>
            <span>•</span>
            <span>{timeAgo(video?.createdAt)}</span>
          </div>
        </div>
      </div>

    </div >
  );
};

export default VideoCard;
