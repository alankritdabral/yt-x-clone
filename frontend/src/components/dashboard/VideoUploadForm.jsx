// TODO: Create video upload form component with progress tracking
import React, { useState } from 'react';
import { videoService } from '../../services/videoService';

const VideoUploadForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoFile: null,
    thumbnail: null,
    isPublished: false,
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // TODO: Handle file input changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    }
  };

  // TODO: Handle text input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // TODO: Handle form submission with upload progress
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.videoFile) {
      setError('Please select a video file');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const uploadFormData = new FormData();
      uploadFormData.append('videoFile', formData.videoFile);
      uploadFormData.append('thumbnail', formData.thumbnail);
      uploadFormData.append('title', formData.title);
      uploadFormData.append('description', formData.description);
      uploadFormData.append('isPublished', formData.isPublished);

      // TODO: Call upload service with progress callback
      await videoService.uploadVideo(uploadFormData, (progress) => {
        setUploadProgress(progress);
      });

      onSuccess?.();
      setFormData({
        title: '',
        description: '',
        videoFile: null,
        thumbnail: null,
        isPublished: false,
      });
      setUploadProgress(0);
    } catch (err) {
      setError(err.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="video-upload-form">
      <h2>Upload Video</h2>

      {/* TODO: Display error message */}
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        {/* TODO: Video file input */}
        <div className="form-group">
          <label htmlFor="videoFile">Video File*</label>
          <input
            type="file"
            id="videoFile"
            name="videoFile"
            accept="video/*"
            onChange={handleFileChange}
            required
            disabled={loading}
          />
          <small>Max size: 100MB</small>
        </div>

        {/* TODO: Thumbnail input */}
        <div className="form-group">
          <label htmlFor="thumbnail">Thumbnail</label>
          <input
            type="file"
            id="thumbnail"
            name="thumbnail"
            accept="image/*"
            onChange={handleFileChange}
            disabled={loading}
          />
        </div>

        {/* TODO: Title input */}
        <div className="form-group">
          <label htmlFor="title">Title*</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            maxLength="100"
            required
            disabled={loading}
          />
        </div>

        {/* TODO: Description textarea */}
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            maxLength="5000"
            disabled={loading}
          />
        </div>

        {/* TODO: Publish checkbox */}
        <div className="form-group">
          <label htmlFor="isPublished">
            <input
              type="checkbox"
              id="isPublished"
              name="isPublished"
              checked={formData.isPublished}
              onChange={handleChange}
              disabled={loading}
            />
            Publish immediately
          </label>
        </div>

        {/* TODO: Upload progress bar */}
        {uploadProgress > 0 && (
          <div className="progress-bar">
            <div
              className="progress-bar__fill"
              style={{ width: `${uploadProgress}%` }}
            >
              {uploadProgress}%
            </div>
          </div>
        )}

        {/* TODO: Submit button */}
        <button
          type="submit"
          disabled={loading || !formData.videoFile}
          className="btn btn--primary"
        >
          {loading ? `Uploading... ${uploadProgress}%` : 'Upload Video'}
        </button>
      </form>
    </div>
  );
};

export default VideoUploadForm;
