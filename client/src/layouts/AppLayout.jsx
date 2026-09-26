import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const AppLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        isMobileMenuOpen={sidebarOpen}
      />

      <div className="flex-1 flex max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 gap-8">
        <Sidebar
          isOpen={sidebarOpen}
          closeSidebar={() => setSidebarOpen(false)}
        />

        <main className="flex-1 min-w-0 pb-12">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
