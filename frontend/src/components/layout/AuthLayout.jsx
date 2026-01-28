// TODO: Create Auth layout component for login/register pages
import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-layout">
      <div className="auth-layout__background">
        {/* TODO: Add background gradient or image */}
      </div>
      <div className="auth-layout__content">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
