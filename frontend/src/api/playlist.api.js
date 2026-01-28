// TODO: Implement playlist API endpoints
import apiClient from './client';

// TODO: Get all playlists endpoint
export const getAllPlaylists = () => {
  return apiClient.get('/playlists');
};

// TODO: Get playlist by ID endpoint
export const getPlaylistById = (playlistId) => {
  return apiClient.get(`/playlists/${playlistId}`);
};

// TODO: Create playlist endpoint
export const createPlaylist = (playlistData) => {
  return apiClient.post('/playlists', playlistData);
};

// TODO: Update playlist endpoint
export const updatePlaylist = (playlistId, playlistData) => {
  return apiClient.patch(`/playlists/${playlistId}`, playlistData);
};

// TODO: Delete playlist endpoint
export const deletePlaylist = (playlistId) => {
  return apiClient.delete(`/playlists/${playlistId}`);
};

// TODO: Add video to playlist endpoint
export const addVideoToPlaylist = (playlistId, videoId) => {
  return apiClient.patch(`/playlists/add/${videoId}/${playlistId}`);
};

// TODO: Remove video from playlist endpoint
export const removeVideoFromPlaylist = (playlistId, videoId) => {
  return apiClient.patch(`/playlists/remove/${videoId}/${playlistId}`);
};

// TODO: Get user playlists endpoint
export const getUserPlaylists = (userId) => {
  return apiClient.get(`/playlists/user/${userId}`);
};
