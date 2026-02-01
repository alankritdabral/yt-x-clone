import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const VideoPage = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/v1/videos/${videoId}`,
          { credentials: "include" }
        );

        if (!res.ok) throw new Error();

        const data = await res.json();

        // ✅ FIX HERE
        setVideo(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [videoId]);

  if (loading) return <p>Loading...</p>;
  if (!video) return <p>Video not found</p>;

  const videoUrl = video.videoFile.startsWith("http")
    ? video.videoFile
    : `http://localhost:8000${video.videoFile}`;

  return (
    <div className="max-w-6xl mx-auto">
      <video
        src={videoUrl}
        controls
        autoPlay
        className="w-full rounded-xl bg-black"
      />

      <h1 className="text-xl font-bold mt-4">
        {video.title}
      </h1>

      <p className="text-gray-600 mt-2">
        {video.views} views •{" "}
        {new Date(video.createdAt).toDateString()}
      </p>

      <p className="mt-4">{video.description}</p>
    </div>
  );
};

export default VideoPage;
