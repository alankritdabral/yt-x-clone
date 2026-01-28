// TODO: Create Sidebar component with navigation menu
import React from 'react';
import { useUIStore } from '../../store/uiStore';

const Sidebar = () => {
  const { sidebarOpen, toggleSidebar } = useUIStore();

  return (
    <aside className={`sidebar ${sidebarOpen ? 'sidebar--open' : 'sidebar--closed'}`}>
      {/* TODO: Add toggle button */}
      <button onClick={toggleSidebar} className="sidebar__toggle">
        {/* TODO: Menu icon */}
      </button>

      {/* TODO: Add navigation menu items */}
      <nav className="sidebar__nav">
        {/* TODO: Home */}
        {/* TODO: Subscriptions */}
        {/* TODO: Library */}
        {/* TODO: History */}
        {/* TODO: Playlists */}
      </nav>

      {/* TODO: Add secondary navigation */}
      <nav className="sidebar__secondary">
        {/* TODO: Settings */}
        {/* TODO: Help */}
        {/* TODO: About */}
      </nav>
    </aside>
  );
};

export default Sidebar;
