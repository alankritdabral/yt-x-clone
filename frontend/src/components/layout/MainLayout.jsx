// TODO: Create Main layout component for authenticated routes
import React from 'react';
import Header from '../common/Header';
import Sidebar from '../common/Sidebar';

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Header />
      <div className="main-layout__container">
        <Sidebar />
        <main className="main-layout__content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
