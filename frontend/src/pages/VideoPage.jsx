import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const VideoPage = () => {
  const { videoId } = useParams();

  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/v1/videos/${videoId}`,
          { credentials: "include" }
        );

        if (!res.ok) throw new Error();

        const data = await res.json();
        setVideo(data.data);

        setLikes(data.data.likes || 0);
        setDislikes(data.data.dislikes || 0);

        // fake comments for now
        setComments(data.data.comments || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [videoId]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (!video) return <p className="p-4">Video not found</p>;

  const videoUrl = video.videoFile.startsWith("http")
    ? video.videoFile
    : `http://localhost:8000${video.videoFile}`;

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      user: "You",
      text: newComment,
    };

    setComments([comment, ...comments]);
    setNewComment("");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 mt-4">
      {/* Video */}
      <video
        src={videoUrl}
        controls
        autoPlay
        className="w-full rounded-xl bg-black"
      />

      {/* Title */}
      <h1 className="text-xl font-semibold mt-4">
        {video.title}
      </h1>

      {/* Views + Actions */}
      <div className="flex flex-wrap items-center justify-between mt-2 gap-2">
        <p className="text-gray-600 text-sm">
          {video.views} views •{" "}
          {new Date(video.createdAt).toDateString()}
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => setLikes(likes + 1)}
            className="px-4 py-1.5 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            👍 {likes}
          </button>

          <button
            onClick={() => setDislikes(dislikes + 1)}
            className="px-4 py-1.5 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            👎 {dislikes}
          </button>

          <button
            className="px-4 py-1.5 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            ➕ Add to Playlist
          </button>
        </div>
      </div>

      {/* Channel */}
      <div className="flex items-center justify-between mt-4 border-b pb-4">
        <div className="flex items-center gap-3">
          <img
            src={
              video.owner?.avatar ||
              "https://via.placeholder.com/40"
            }
            alt="channel"
            className="w-10 h-10 rounded-full object-cover"
          />

          <div>
            <p className="font-semibold">
              {video.owner?.username || "Channel"}
            </p>
          </div>
        </div>

        <button className="bg-black text-white px-4 py-2 rounded-full">
          Subscribe
        </button>
      </div>

      {/* Description */}
      <div className="bg-gray-100 rounded-xl p-4 mt-4 whitespace-pre-line">
        {video.description}
      </div>

      {/* Comments */}
      <div className="mt-6">
        <h2 className="font-semibold mb-3">
          {comments.length} Comments
        </h2>

        {/* Add comment */}
        <div className="flex gap-2 mb-4">
          <input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 border rounded-full px-4 py-2"
          />
          <button
            onClick={handleAddComment}
            className="px-4 py-2 bg-black text-white rounded-full"
          >
            Comment
          </button>
        </div>

        {/* Comment list */}
        <div className="space-y-3">
          {comments.map((c) => (
            <div key={c.id} className="flex gap-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div>
                <p className="font-medium text-sm">{c.user}</p>
                <p className="text-sm">{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
