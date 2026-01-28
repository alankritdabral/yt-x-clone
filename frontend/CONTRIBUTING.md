# Contributing to Frontend

## 🎯 Development Guidelines

### Code Standards
- Use ES6+ syntax
- Follow functional component patterns
- Use custom hooks for logic reuse
- Add TODO comments for incomplete features
- Use meaningful variable and function names

### Git Workflow
1. Create feature branch from `main`
2. Make changes with clear commit messages
3. Keep commits atomic and logical
4. Push to your branch
5. Create pull request with description

### Component Development

#### File Naming
- Components: PascalCase (e.g., `VideoCard.jsx`)
- Utils: camelCase (e.g., `formatDate.js`)
- Stores: camelCase (e.g., `authStore.js`)
- Pages: PascalCase (e.g., `HomePage.jsx`)

#### Component Structure
```jsx
// TODO: Import dependencies
import React, { useState, useEffect } from 'react';

// TODO: Import utils and hooks
import { useAuth } from '../hooks';

// TODO: Component definition
const ComponentName = ({ prop1, prop2 }) => {
  // TODO: State management
  const [state, setState] = useState(null);
  
  // TODO: Custom hooks
  const { user } = useAuth();
  
  // TODO: Side effects
  useEffect(() => {
    // TODO: Implementation
  }, []);
  
  // TODO: Event handlers
  const handleClick = () => {
    // TODO: Implementation
  };
  
  return (
    // TODO: JSX
    <div>Content</div>
  );
};

export default ComponentName;
```

### Testing Requirements
- [ ] Component renders correctly
- [ ] User interactions work as expected
- [ ] Error states are handled
- [ ] Loading states are displayed
- [ ] Accessibility features work

### Code Review Checklist
- [ ] Code follows project standards
- [ ] No console errors or warnings
- [ ] Components are reusable
- [ ] Props are properly validated
- [ ] Error handling is implemented
- [ ] Loading states are managed
- [ ] Accessibility is considered
- [ ] Performance is optimized

## 🔄 Common Development Tasks

### Adding a New API Endpoint
1. Create endpoint in `src/api/[feature].api.js`
2. Create/update service in `src/services/[feature]Service.js`
3. Use service in component or hook
4. Handle loading, error, and success states

### Adding a New Store
1. Create store in `src/store/[feature]Store.js`
2. Export from `src/store/index.js`
3. Use `useStore` hook in components
4. Add initial state and actions

### Adding a New Page
1. Create page in `src/pages/[PageName].jsx`
2. Add route in `App.jsx`
3. Add protection if needed (ProtectedRoute)
4. Import layout (MainLayout or AuthLayout)

### Adding a New Component
1. Create component in appropriate folder
2. Add component logic and styling
3. Export from folder's `index.js`
4. Add prop validation/TypeScript types
5. Use in page or other components

## 📝 Commit Message Guidelines

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Build/dependencies

### Examples
```
feat(auth): implement login form
fix(video): resolve player buffering issue
docs(api): update API documentation
refactor(store): simplify auth store logic
```

## 🚀 Deployment Checklist

Before deploying to production:
- [ ] All features implemented
- [ ] Tests passing
- [ ] No console errors
- [ ] Bundle size optimized
- [ ] Environment variables configured
- [ ] Error tracking enabled
- [ ] Analytics configured
- [ ] Performance monitored
- [ ] Accessibility verified
- [ ] Security review done

## 📦 Dependency Management

### Adding Dependencies
```bash
npm install package-name
```

### Updating Dependencies
```bash
npm update
npm audit fix
```

### Removing Dependencies
```bash
npm uninstall package-name
```

## 🐛 Debugging Tips

### Development Tools
- React DevTools browser extension
- Redux DevTools (with Zustand integration)
- Network tab in DevTools
- Console for logging

### Common Issues
1. **Component not rendering**: Check props and state
2. **API errors**: Verify endpoint and request format
3. **State not updating**: Ensure immutability
4. **Performance issues**: Check for unnecessary re-renders
5. **Build errors**: Clear node_modules and reinstall

## 📚 Resources

- [React Documentation](https://react.dev)
- [React Router Documentation](https://reactrouter.com)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Axios Documentation](https://axios-http.com)
- [Vite Documentation](https://vitejs.dev)

## 💬 Getting Help

- Check existing issues and PRs
- Review project documentation
- Ask in project discussions
- Refer to component examples in codebase
