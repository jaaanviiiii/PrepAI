import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Target,
  Bot,
  Map,
  BarChart3,
  BookOpen,
  Bookmark,
  History,
  User,
  Settings,
  Users,
  HelpCircle,
  FolderKanban,
  LineChart,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

const Sidebar = ({ isOpen, closeSidebar }) => {
  const { isAdmin } = useAuth();

  const userNavItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Practice', path: '/practice', icon: Target },
    { label: 'AI Mock Interview', path: '/mock-interview', icon: Bot, badge: 'AI' },
    { label: 'My Roadmap', path: '/roadmap', icon: Map },
    { label: 'Analytics', path: '/analytics', icon: BarChart3 },
    { label: 'Question Bank', path: '/questions', icon: BookOpen },
    { label: 'Bookmarks', path: '/bookmarks', icon: Bookmark },
    { label: 'Interview History', path: '/history', icon: History },
    { label: 'Profile', path: '/profile', icon: User },
    { label: 'Settings', path: '/settings', icon: Settings }
  ];

  const adminNavItems = [
    { label: 'Admin Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Users', path: '/admin/users', icon: Users },
    { label: 'Questions', path: '/admin/questions', icon: HelpCircle },
    { label: 'Categories', path: '/admin/categories', icon: FolderKanban },
    { label: 'Statistics', path: '/admin/statistics', icon: LineChart }
  ];

  return (
    <>
      {/* Backdrop for Mobile */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed lg:sticky top-16 left-0 z-40 w-64 h-[calc(100vh-4rem)] bg-slate-900/95 light:bg-white/95 border-r border-slate-800 light:border-slate-200 transition-transform duration-300 ease-in-out flex flex-col justify-between overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-4 space-y-6">
          {/* Main User Navigation */}
          <div>
            <div className="px-3 mb-2 flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Student Menu
              </span>
            </div>
            <nav className="space-y-1">
              {userNavItems.map(item => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={closeSidebar}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 ${
                        isActive
                          ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30 shadow-sm'
                          : 'text-slate-400 light:text-slate-600 hover:text-slate-100 light:hover:text-slate-900 hover:bg-slate-800/60 light:hover:bg-slate-100'
                      }`
                    }
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 text-[10px] font-extrabold rounded-md gradient-bg text-white shadow-xs">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* Admin Navigation (if role === admin) */}
          {isAdmin && (
            <div className="pt-4 border-t border-slate-800 light:border-slate-200">
              <div className="px-3 mb-2 flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider">
                  Admin Panel
                </span>
              </div>
              <nav className="space-y-1">
                {adminNavItems.map(item => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={closeSidebar}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                          isActive
                            ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30 shadow-sm'
                            : 'text-slate-400 light:text-slate-600 hover:text-purple-300 hover:bg-purple-950/30'
                        }`
                      }
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </NavLink>
                  );
                })}
              </nav>
            </div>
          )}
        </div>

        {/* Upgrade Card / AI Prompt Banner */}
        <div className="p-4 m-3 rounded-2xl bg-gradient-to-b from-indigo-900/40 to-slate-900 border border-indigo-500/20 text-center">
          <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center mx-auto mb-2 shadow-md">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <h4 className="text-xs font-bold text-white mb-1">AI Mock Simulator Active</h4>
          <p className="text-[11px] text-slate-400 mb-3">Practice live technical & HR rounds anytime.</p>
          <NavLink
            to="/mock-interview"
            onClick={closeSidebar}
            className="inline-block w-full py-2 px-3 rounded-xl text-xs font-semibold gradient-bg text-white hover:opacity-90 shadow-sm transition-opacity"
          >
            Start AI Practice
          </NavLink>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
