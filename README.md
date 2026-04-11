# YT-X Clone 📺

A full-stack, feature-rich video sharing platform built with the MERN stack (MongoDB, Express, React, Node.js). This project is inspired by YouTube and Twitter (X), combining video content with a social feed.

## 🚀 Key Features

- **User Authentication**: Secure signup and login using JWT (Access & Refresh tokens).
- **Video Management**: Upload, publish, and manage videos with Cloudinary integration.
- **Interactive Feed**: Home page with video categorization and a modern grid layout.
- **Social Integration**: A "Tweets" feed for short text-based updates.
- **User Interactions**: Like, comment, and subscribe to your favorite creators.
- **History & Playlists**: Track your watch history and manage video playlists.
- **Responsive Design**: Fully optimized for both desktop and mobile devices.

## 🛠️ Tech Stack

### Frontend
- **React (Vite)**: Modern UI development.
- **Tailwind CSS**: Utility-first styling for a sleek dark theme.
- **Zustand**: Lightweight and scalable state management.
- **Axios**: Promised-based HTTP client for API requests.
- **Lucide React**: Beautifully simple icons.
- **React Router**: Seamless client-side navigation.

### Backend
- **Node.js & Express**: Robust server-side framework.
- **MongoDB (Mongoose)**: NoSQL database for flexible data modeling.
- **Cloudinary**: Cloud-based image and video management.
- **JWT**: Secure session handling with Access and Refresh tokens.
- **Multer**: Middleware for handling file uploads.
- **Cookie-parser**: Efficient cookie handling for secure auth.

## 📦 Project Structure

```bash
yt-x-clone/
├── frontend/          # React + Vite frontend
│   ├── src/
│   │   ├── api/       # Centralized API calls (Axios)
│   │   ├── components/# Reusable UI components
│   │   ├── pages/     # Main page components
│   │   ├── store/     # Zustand state management
│   │   └── hooks/     # Custom React hooks
└── backend/           # Node.js + Express backend
    ├── src/
    │   ├── controllers/ # Request handlers
    │   ├── models/      # Mongoose schemas
    │   ├── routes/      # API endpoints
    │   ├── middlewares/ # Auth and file upload logic
    │   └── utils/       # Helper functions
```

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account
- Cloudinary account

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd yt-x-clone
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   # Create a .env file based on .env.example
   npm run dev
   ```

3. **Frontend Setup**:
   ```bash
   cd ../frontend
   npm install
   # Create a .env file based on .env.example
   npm run dev
   ```

## 📄 License

This project is open-source and available under the MIT License.
