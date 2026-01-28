# Frontend - YT X Clone

Industry-standard React frontend for the YouTube X Clone application.

## 📁 Project Structure

```
src/
├── api/                 # API service layer (endpoints)
├── components/          # Reusable React components
│   ├── auth/           # Authentication components
│   ├── common/         # Common components (Header, Sidebar, etc.)
│   ├── dashboard/      # Dashboard components
│   ├── layout/         # Layout wrappers
│   ├── playlist/       # Playlist components
│   ├── comment/        # Comment components
│   └── video/          # Video components
├── config/             # Configuration files
├── constants/          # Application constants
├── context/            # React Context (if needed)
├── hooks/              # Custom React hooks
├── pages/              # Page components (full pages)
├── services/           # Business logic layer
├── store/              # Zustand state management
├── styles/             # Global CSS and variables
├── utils/              # Utility functions
└── App.jsx             # Main app component
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Update .env with your API base URL and configuration
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

### Building

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🏗️ Architecture

### API Layer (`src/api/`)
- Axios instance with interceptors
- Organized by feature (user.api.js, video.api.js, etc.)
- TODO: Implement request/response interceptors
- TODO: Handle authentication tokens
- TODO: Global error handling

### Components (`src/components/`)
- Follows atomic design principles
- Reusable components in `common/`
- Feature-specific components organized by domain
- TODO: Implement styling system
- TODO: Add accessibility attributes

### State Management (`src/store/`)
- Zustand for global state
- Separate stores: auth, video, ui
- TODO: Persist state to localStorage
- TODO: Add devtools integration

### Services (`src/services/`)
- Business logic layer
- Integrates API and state management
- Error handling and logging
- TODO: Implement caching strategy
- TODO: Add retry logic

### Hooks (`src/hooks/`)
- `useAuth`: Authentication logic
- `useVideo`: Video operations
- `useFetch`: Generic data fetching with caching
- TODO: Add custom hooks for other features

### Utilities (`src/utils/`)
- Date formatting
- Input validation
- Error handling
- localStorage helpers
- TODO: Add more utility functions as needed

## 📋 TODO List

### Authentication
- [ ] Implement login flow
- [ ] Implement register flow
- [ ] Implement logout flow
- [ ] Add token refresh mechanism
- [ ] Add password reset flow
- [ ] Add email verification

### Videos
- [ ] Implement video upload
- [ ] Implement video player with HLS support
- [ ] Add video quality selection
- [ ] Add playback progress tracking
- [ ] Implement related videos
- [ ] Add video search

### Comments
- [ ] Implement comment posting
- [ ] Implement comment editing
- [ ] Implement comment deletion
- [ ] Add comment threading/replies
- [ ] Implement comment liking

### Playlists
- [ ] Implement playlist creation
- [ ] Implement add video to playlist
- [ ] Implement remove video from playlist
- [ ] Add playlist editing

### User Profiles
- [ ] Implement profile viewing
- [ ] Implement profile editing
- [ ] Add subscriber count
- [ ] Add subscription button
- [ ] Implement channel banner

### Dashboard
- [ ] Implement analytics charts
- [ ] Add video upload form
- [ ] Add video management table
- [ ] Implement channel settings

### UI/UX
- [ ] Add loading states
- [ ] Add error boundaries
- [ ] Add toast notifications
- [ ] Implement dark mode
- [ ] Add responsive design
- [ ] Improve accessibility

### Performance
- [ ] Add code splitting
- [ ] Implement lazy loading
- [ ] Add image optimization
- [ ] Optimize bundle size
- [ ] Add caching strategy

### Testing
- [ ] Add unit tests
- [ ] Add integration tests
- [ ] Add E2E tests
- [ ] Add visual regression tests

## 🔑 Key Features

### Authentication
- User registration and login
- JWT token management
- Protected routes
- Auto-logout on token expiry

### Videos
- Video upload and streaming
- Video metadata editing
- Video deletion
- Video search and filtering

### Comments
- Post, edit, delete comments
- Comment threading
- Comment liking

### Playlists
- Create, edit, delete playlists
- Add/remove videos from playlists

### User Profiles
- View user profiles
- Edit own profile
- View user videos
- Subscribe to channels

### Dashboard
- Channel analytics
- Video management
- Channel settings

## 🎨 Styling

- CSS-in-JS with custom properties
- Design tokens defined in `styles/variables.css`
- Global styles in `styles/globals.css`
- BEM naming convention for classes

### Color Scheme
- Primary: #1f2937 (Dark Gray)
- Accent: #ef4444 (Red)
- Success: #10b981 (Green)
- Warning: #f59e0b (Amber)
- Error: #ef4444 (Red)

## 🔧 Configuration

### Environment Variables

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_APP_NAME=YT X Clone
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_ERROR_TRACKING=false
```

## 📦 Dependencies

- **React 19**: UI library
- **React Router DOM**: Client-side routing
- **Axios**: HTTP client
- **Zustand**: State management
- **Vite**: Build tool and dev server

## 🤝 Contributing

TODO: Add contribution guidelines

## 📝 License

TODO: Add license information
