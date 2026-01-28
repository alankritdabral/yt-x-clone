import { useState } from 'react'
import '../styles/UploadPage.css'

// TODO: Implement file upload with drag and drop
// TODO: Add thumbnail preview
// TODO: Add video preview before upload
// TODO: Implement form validation
// TODO: Add upload progress indicator
// TODO: Implement cancel upload functionality

const UploadPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoFile: null,
    thumbnail: null,
    category: 'general',
    isPublished: true
  })
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: files[0]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // TODO: Upload video to backend using FormData
    // TODO: Handle upload errors
    // const formDataToSend = new FormData()
    // formDataToSend.append('title', formData.title)
    // formDataToSend.append('description', formData.description)
    // formDataToSend.append('videoFile', formData.videoFile)
    // formDataToSend.append('thumbnail', formData.thumbnail)
    // formDataToSend.append('category', formData.category)
    // formDataToSend.append('isPublished', formData.isPublished)
  }

  return (
    <div className="upload-page">
      <h1>Upload Video</h1>
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <label>Video Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter video title"
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter video description"
            rows="5"
          />
        </div>

        <div className="form-group">
          <label>Video File *</label>
          <input
            type="file"
            name="videoFile"
            onChange={handleFileChange}
            accept="video/*"
            required
          />
          {/* TODO: Add drag and drop zone */}
        </div>

        <div className="form-group">
          <label>Thumbnail</label>
          <input
            type="file"
            name="thumbnail"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select name="category" value={formData.category} onChange={handleInputChange}>
            <option value="general">General</option>
            <option value="gaming">Gaming</option>
            <option value="music">Music</option>
            <option value="sports">Sports</option>
            <option value="news">News</option>
            <option value="education">Education</option>
          </select>
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="isPublished"
              checked={formData.isPublished}
              onChange={(e) => setFormData(prev => ({ ...prev, isPublished: e.target.checked }))}
            />
            Publish video
          </label>
        </div>

        {uploading && (
          <div className="upload-progress">
            <p>Uploading... {uploadProgress}%</p>
            <progress value={uploadProgress} max="100" />
          </div>
        )}

        <button type="submit" disabled={uploading} className="submit-btn">
          {uploading ? 'Uploading...' : 'Upload Video'}
        </button>
      </form>
    </div>
  )
}

export default UploadPage
