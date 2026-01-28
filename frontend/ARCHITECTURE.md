# Frontend Architecture Guide

## 📊 Complete Directory Structure

```
frontend/
├── public/                          # Static assets
│   └── vite.svg
├── src/
│   ├── api/                         # API Service Layer
│   │   ├── client.js               # Axios instance with interceptors
│   │   ├── user.api.js             # User endpoints
│   │   ├── video.api.js            # Video endpoints
│   │   ├── comment.api.js          # Comment endpoints
│   │   ├── like.api.js             # Like endpoints
│   │   ├── playlist.api.js         # Playlist endpoints
│   │   ├── subscription.api.js     # Subscription endpoints
│   │   ├── tweet.api.js            # Tweet endpoints
│   │   └── index.js                # API exports
│   │
│   ├── components/                  # Reusable React Components
│   │   ├── auth/
│   │   │   └── ProtectedRoute.jsx  # Route protection wrapper
│   │   ├── common/                 # Shared components
│   │   │   ├── Header.jsx          # Navigation header
│   │   │   ├── Sidebar.jsx         # Side navigation
│   │   │   ├── ErrorBoundary.jsx   # Error fallback
│   │   │   ├── Loader.jsx          # Loading indicator
│   │   │   └── index.js
│   │   ├── dashboard/              # Dashboard components
│   │   │   ├── VideoUploadForm.jsx # Video upload form
│   │   │   └── AnalyticsChart.jsx  # Analytics visualization
│   │   ├── layout/                 # Page layouts
│   │   │   ├── MainLayout.jsx      # Main app layout
│   │   │   ├── AuthLayout.jsx      # Auth page layout
│   │   │   └── index.js
│   │   ├── video/                  # Video components
│   │   │   ├── VideoCard.jsx       # Video card display
│   │   │   ├── VideoPlayer.jsx     # Video player
│   │   │   └── VideoGrid.jsx       # Video grid with pagination
│   │   ├── comment/                # Comment components
│   │   │   └── CommentSection.jsx  # Comments section
│   │   └── playlist/               # Playlist components
│   │       ├── PlaylistCard.jsx    # Playlist display card
│   │       └── PlaylistManager.jsx # Playlist CRUD operations
│   │
│   ├── config/                      # Configuration Files
│   │   └── env.js                  # Environment variables
│   │
│   ├── constants/                   # Application Constants
│   │   └── index.js                # HTTP status, messages, routes
│   │
│   ├── context/                     # React Context (Optional)
│   │   └── [TODO: Add as needed]
│   │
│   ├── hooks/                       # Custom React Hooks
│   │   ├── useAuth.js              # Authentication hook
│   │   ├── useVideo.js             # Video operations hook
│   │   ├── useFetch.js             # Data fetching hook
│   │   └── index.js
│   │
│   ├── pages/                       # Page Components
│   │   ├── HomePage.jsx            # Home/feed page
│   │   ├── LoginPage.jsx           # Login page
│   │   ├── RegisterPage.jsx        # Register page
│   │   ├── VideoDetailsPage.jsx    # Single video page
│   │   ├── UserProfilePage.jsx     # User profile page
│   │   ├── DashboardPage.jsx       # Channel dashboard
│   │   ├── auth/
│   │   │   └── LoginAuth.jsx       # Auth variants
│   │   ├── main/
│   │   │   └── MainPageWrapper.jsx # Main page wrapper
│   │   └── profile/
│   │       └── ProfileWrapper.jsx  # Profile wrapper
│   │
│   ├── services/                    # Business Logic Layer
│   │   ├── authService.js          # Auth operations
│   │   ├── videoService.js         # Video operations
│   │   └── index.js
│   │
│   ├── store/                       # Zustand State Management
│   │   ├── authStore.js            # Auth state
│   │   ├── videoStore.js           # Video state
│   │   ├── uiStore.js              # UI state
│   │   └── index.js
│   │
│   ├── styles/                      # Global Styling
│   │   ├── variables.css           # Design tokens
│   │   └── globals.css             # Global styles
│   │
│   ├── utils/                       # Utility Functions
│   │   ├── formatDate.js           # Date formatting
│   │   ├── validators.js           # Input validation
│   │   ├── errorHandler.js         # Error handling
│   │   ├── localStorage.js         # Storage utilities
│   │   └── index.js
│   │
│   ├── App.jsx                      # Main app component
│   ├── main.jsx                     # Entry point
│   ├── index.css                    # Global styles
│   └── App.css                      # App styles
│
├── .env.example                     # Environment template
├── .eslintrc.js                     # ESLint configuration
├── eslint.config.js                 # ESLint rules
├── vite.config.js                   # Vite configuration
├── package.json                     # Dependencies
├── index.html                       # HTML entry point
├── README.md                        # Project documentation
├── ARCHITECTURE.md                  # This file
└── CONTRIBUTING.md                 # Contribution guidelines

```

## 🏗️ Layer Architecture

### 1. **Presentation Layer** (`components/`, `pages/`)
- UI components and page layouts
- React Router integration
- User interactions and forms
- Styling and animations

### 2. **State Management** (`store/`)
- Zustand for global state
- Auth, Video, UI stores
- Persistent state management
- Centralized state logic

### 3. **Business Logic Layer** (`services/`)
- Authentication logic
- Video operations
- Data transformation
- Error handling
- Logging

### 4. **API Service Layer** (`api/`)
- Axios configuration
- API endpoints
- Request/response interceptors
- Token management

### 5. **Utilities** (`utils/`, `hooks/`)
- Helper functions
- Custom hooks
- Validators
- Date formatting
- Error handling

## 🔄 Data Flow

```
User Interaction (Component)
    ↓
Custom Hook (useAuth, useVideo, useFetch)
    ↓
Service Layer (authService, videoService)
    ↓
API Layer (apiClient)
    ↓
Backend API
    ↓
State Management (Zustand Store)
    ↓
Component Re-render
```

## 🎯 Feature Implementation Checklist

### Authentication Module
- [ ] Login with email/password
- [ ] User registration
- [ ] JWT token management
- [ ] Protected routes
- [ ] Auto-logout on token expiry
- [ ] Password reset flow
- [ ] Email verification

### Video Module
- [ ] Video upload with progress
- [ ] Video player with HLS support
- [ ] Video quality selection
- [ ] Playback progress tracking
- [ ] Video search and filtering
- [ ] Related videos suggestion
- [ ] Video editing/deletion

### Comments Module
- [ ] Post comments
- [ ] Edit comments
- [ ] Delete comments
- [ ] Comment threading
- [ ] Comment liking

### Playlists Module
- [ ] Create playlists
- [ ] Edit playlists
- [ ] Delete playlists
- [ ] Add/remove videos
- [ ] View playlist

### Subscriptions Module
- [ ] Subscribe to channels
- [ ] Unsubscribe
- [ ] View subscriptions
- [ ] Subscriber management

### Dashboard Module
- [ ] Video analytics
- [ ] Engagement metrics
- [ ] Subscriber growth
- [ ] Channel settings
- [ ] Video management table

## 💾 State Management Pattern

### Auth Store
```javascript
{
  user: {},
  token: string,
  isAuthenticated: boolean,
  login(), logout(), updateUser()
}
```

### Video Store
```javascript
{
  videos: [],
  currentVideo: {},
  loading: boolean,
  error: null|string,
  setVideos(), setCurrentVideo(), addVideo(), removeVideo()
}
```

### UI Store
```javascript
{
  sidebarOpen: boolean,
  theme: 'light'|'dark',
  notification: null|object,
  toggleSidebar(), setTheme(), showNotification()
}
```

## 🔐 Security Considerations

- [ ] Implement JWT token refresh
- [ ] Sanitize user inputs
- [ ] CSRF protection
- [ ] XSS prevention
- [ ] Rate limiting
- [ ] Secure password validation
- [ ] HTTPS in production
- [ ] Secure storage of tokens

## 🚀 Performance Optimization

- [ ] Code splitting by routes
- [ ] Lazy loading components
- [ ] Image optimization
- [ ] Memoization of expensive computations
- [ ] Virtual scrolling for large lists
- [ ] Caching strategies
- [ ] Bundle size analysis
- [ ] Network request optimization

## 📱 Responsive Design

- [ ] Mobile-first approach
- [ ] Breakpoints: 320px, 640px, 1024px, 1280px
- [ ] Flexible layouts
- [ ] Touch-friendly interactions
- [ ] Viewport configuration

## ♿ Accessibility

- [ ] Semantic HTML
- [ ] ARIA labels
- [ ] Keyboard navigation
- [ ] Focus management
- [ ] Color contrast compliance
- [ ] Screen reader support
- [ ] Alt text for images

## 🧪 Testing Strategy

- [ ] Unit tests (Jest)
- [ ] Component tests (React Testing Library)
- [ ] Integration tests
- [ ] E2E tests (Cypress/Playwright)
- [ ] Performance testing
- [ ] Accessibility testing

## 🔗 API Integration Points

### User Endpoints
- POST /users/register
- POST /users/login
- POST /users/logout
- GET /users/current-user
- PATCH /users/update-account
- PATCH /users/avatar

### Video Endpoints
- GET /videos
- GET /videos/{id}
- POST /videos
- PATCH /videos/{id}
- DELETE /videos/{id}
- PATCH /videos/toggle/publish/{id}

### Comment Endpoints
- GET /comments/{videoId}
- POST /comments/{videoId}
- PATCH /comments/c/{id}
- DELETE /comments/c/{id}

### Like Endpoints
- POST /likes/toggle/v/{videoId}
- POST /likes/toggle/c/{commentId}
- GET /likes/videos/{videoId}

### Playlist Endpoints
- GET /playlists
- GET /playlists/{id}
- POST /playlists
- PATCH /playlists/{id}
- DELETE /playlists/{id}
- PATCH /playlists/add/{videoId}/{playlistId}

### Subscription Endpoints
- POST /subscriptions/c/{channelId}
- GET /subscriptions/c/{channelId}
- GET /subscriptions/u/{userId}

## 📚 Best Practices Applied

1. **Component Organization**: Feature-based folder structure
2. **Separation of Concerns**: API, Services, Components, State separate
3. **DRY Principle**: Reusable components and utilities
4. **Error Handling**: Centralized error handling with logging
5. **State Management**: Single source of truth with Zustand
6. **Naming Conventions**: Descriptive, consistent naming
7. **Code Comments**: TODO markers for incomplete features
8. **Documentation**: README and ARCHITECTURE guides

## 🚀 Next Steps

1. Implement missing TODO items
2. Set up testing infrastructure
3. Configure CI/CD pipeline
4. Optimize bundle size
5. Add E2E tests
6. Performance monitoring
7. Error tracking (Sentry)
8. Analytics integration
