import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const API = "http://localhost:8000/api/v1";

const VideoPage = () => {
  const { videoId } = useParams();

  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const [subscribed, setSubscribed] = useState(false);
  const [subscribersCount, setSubscribersCount] = useState(0);

  const [showFullDesc, setShowFullDesc] = useState(false);

  /* ---------------- Fetch Video & Comments ---------------- */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await fetch(`${API}/videos/${videoId}`, {
          credentials: "include",
        });

        const videoData = await videoRes.json();
        const videoInfo = videoData.data;

        setVideo(videoInfo);
        setLikesCount(videoInfo?.likesCount || 0);
        setLiked(videoInfo?.isLiked || false);
        setSubscribed(videoInfo?.isSubscribed || false);

        // fetch subscribers count
        if (videoInfo?.owner?._id) {
          const subRes = await fetch(
            `${API}/subscriptions/u/${videoInfo.owner._id}`,
            { credentials: "include" }
          );

          const subData = await subRes.json();
          setSubscribersCount(subData.data?.length || 0);
        }

        const commentRes = await fetch(`${API}/comments/${videoId}`, {
          credentials: "include",
        });

        const commentData = await commentRes.json();
        setComments(commentData.data?.comments || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [videoId]);

  /* ---------------- Toggle Video Like ---------------- */
  const toggleLike = async () => {
    const nextLiked = !liked;

    setLiked(nextLiked);
    setLikesCount((c) => (nextLiked ? c + 1 : Math.max(c - 1, 0)));

    try {
      const res = await fetch(
        `${API}/likes/toggle/v/${videoId}`,
        { method: "POST", credentials: "include" }
      );

      const data = await res.json();
      setLiked(data.data.liked);
      setLikesCount(data.data.likesCount);
    } catch {
      setLiked(!nextLiked);
      setLikesCount((c) => (nextLiked ? c - 1 : c + 1));
    }
  };

  /* ---------------- Subscription ---------------- */
  const toggleSubscribe = async () => {
    if (!video?.owner?._id) return;

    setSubscribed((s) => !s);
    setSubscribersCount((c) =>
      subscribed ? Math.max(c - 1, 0) : c + 1
    );

    await fetch(
      `${API}/subscriptions/c/${video.owner._id}`,
      { method: "POST", credentials: "include" }
    );
  };

  /* ---------------- Add Comment ---------------- */
  const addComment = async () => {
    if (!newComment.trim()) return;

    const res = await fetch(`${API}/comments/${videoId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ content: newComment }),
    });

    const data = await res.json();

    setComments((prev) => [data.data, ...prev]);
    setNewComment("");
  };

  /* ---------------- Delete Comment ---------------- */
  const deleteComment = async (id) => {
    await fetch(`${API}/comments/c/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    setComments((prev) => prev.filter((c) => c._id !== id));
  };

  /* ---------------- Like Comment ---------------- */
  const toggleCommentLike = async (id) => {
    setComments((prev) =>
      prev.map((c) =>
        c._id === id
          ? {
            ...c,
            isLiked: !c.isLiked,
            likesCount: c.isLiked
              ? Math.max((c.likesCount || 1) - 1, 0)
              : (c.likesCount || 0) + 1,
          }
          : c
      )
    );

    await fetch(`${API}/likes/toggle/c/${id}`, {
      method: "POST",
      credentials: "include",
    });
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (!video) return <p className="p-4">Video not found</p>;

  const videoUrl = video.videoFile.startsWith("http")
    ? video.videoFile
    : `http://localhost:8000${video.videoFile}`;

  const formattedDate = new Date(
    video.createdAt
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const shortDescription = video.description?.slice(0, 150);

  return (
    <div className="max-w-5xl mx-auto px-4 mt-4">
      {/* Video Player */}
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

      {/* Channel + Actions Row */}
      <div className="flex flex-wrap justify-between items-center mt-3 gap-4 border-b pb-4">
        {/* LEFT: Channel */}
        <div className="flex items-center gap-3">
          <img
            src={
              video.owner?.avatar ||
              "https://via.placeholder.com/40"
            }
            className="w-10 h-10 rounded-full object-cover"
            alt=""
          />

          <div>
            <p className="font-semibold text-left">
              {video.owner?.username}
            </p>
            <p className="text-sm text-gray-500">
              {subscribersCount} subscribers
            </p>
          </div>

          {/* Subscribe */}
          <button
            onClick={toggleSubscribe}
            className={`ml-4 px-4 py-2 rounded-full text-white ${subscribed ? "bg-gray-500" : "bg-black"
              }`}
          >
            {subscribed ? "Subscribed" : "Subscribe"}
          </button>
        </div>

        {/* RIGHT: Actions */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={toggleLike}
            className="px-4 py-2 bg-gray-200 rounded-full"
          >
            {liked ? "👍 Liked" : "👍 Like"} ({likesCount})
          </button>

          <button className="px-4 py-2 bg-gray-200 rounded-full">
            ➕ Playlist
          </button>

          <button className="px-4 py-2 bg-gray-200 rounded-full">
            🔗 Share
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="bg-gray-100 rounded-xl p-4 mt-4">
        <p className="text-sm text-gray-600 mb-2">
          Uploaded on {formattedDate}
        </p>

        <p>
          {showFullDesc
            ? video.description
            : shortDescription}
        </p>

        {video.description?.length > 150 && (
          <button
            className="mt-2 text-sm font-semibold"
            onClick={() => setShowFullDesc(!showFullDesc)}
          >
            {showFullDesc ? "Show less" : "Show more"}
          </button>
        )}
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
            className="flex-1 border rounded-full px-4 py-2"
            placeholder="Add comment..."
          />

          <button
            onClick={addComment}
            className="bg-black text-white px-4 py-2 rounded-full"
          >
            Comment
          </button>
        </div>

        {/* Comment list */}
        <div className="space-y-4">
          {comments.map((c) => (
            <div key={c._id} className="flex gap-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>

              <div>
                <p className="font-medium text-sm">
                  {c.owner?.username}
                </p>

                <p className="text-sm">{c.content}</p>

                <div className="flex gap-3 text-sm mt-1">
                  <button
                    onClick={() =>
                      toggleCommentLike(c._id)
                    }
                  >
                    👍 {c.likesCount || 0}
                  </button>

                  <button
                    onClick={() =>
                      deleteComment(c._id)
                    }
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

};

export default VideoPage;
