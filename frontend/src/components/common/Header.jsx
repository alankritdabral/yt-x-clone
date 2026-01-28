// TODO: Create Header component with navigation, search, and user menu
import React from 'react';
import { useAuthStore } from '../../store/authStore';

const Header = () => {
  const { user, isAuthenticated } = useAuthStore();

  return (
    <header className="header">
      {/* TODO: Add logo */}
      <div className="header__logo">
        {/* TODO: Logo component */}
      </div>

      {/* TODO: Add search bar */}
      <div className="header__search">
        {/* TODO: Search input component */}
      </div>

      {/* TODO: Add user navigation */}
      <nav className="header__nav">
        {isAuthenticated ? (
          <>
            {/* TODO: Add upload video button */}
            {/* TODO: Add notifications dropdown */}
            {/* TODO: Add user profile dropdown */}
          </>
        ) : (
          <>
            {/* TODO: Add login button */}
            {/* TODO: Add register button */}
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
