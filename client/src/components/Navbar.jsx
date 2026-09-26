import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  Sparkles,
  Sun,
  Moon,
  LogOut,
  User,
  Shield,
  Bell,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';

const Navbar = ({ toggleSidebar, isMobileMenuOpen }) => {
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-slate-900/85 light:bg-white/85 backdrop-blur-md border-b border-slate-800 light:border-slate-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section: Logo & Mobile Toggle */}
          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={toggleSidebar}
                className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            )}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight text-white light:text-slate-900">
                  Prep<span className="gradient-text">AI</span>
                </span>
                <span className="text-[10px] text-indigo-400 font-medium tracking-wider uppercase -mt-1">
                  Interview Mastery
                </span>
              </div>
            </Link>
          </div>

          {/* Center Links for Landing Page when unauthenticated */}
          {!isAuthenticated && (
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-slate-300 hover:text-indigo-400 transition-colors">Features</a>
              <a href="#how-it-works" className="text-sm font-medium text-slate-300 hover:text-indigo-400 transition-colors">How It Works</a>
              <a href="#roles" className="text-sm font-medium text-slate-300 hover:text-indigo-400 transition-colors">Roles</a>
              <a href="#testimonials" className="text-sm font-medium text-slate-300 hover:text-indigo-400 transition-colors">Testimonials</a>
            </div>
          )}

          {/* Right section: Actions & Profile */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-800/80 light:bg-slate-100 text-slate-300 light:text-slate-700 hover:text-white hover:bg-slate-700 transition-colors border border-slate-700/50 light:border-slate-200"
              title="Toggle Dark/Light Mode"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pr-3 rounded-xl bg-slate-800/70 light:bg-slate-100 hover:bg-slate-800 border border-slate-700/60 light:border-slate-200 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white text-sm shadow-md">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="hidden sm:inline-block text-sm font-medium text-slate-200 light:text-slate-800">
                    {user.name}
                  </span>
                  {isAdmin && (
                    <span className="hidden sm:inline-block text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-md font-semibold">
                      Admin
                    </span>
                  )}
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900 light:bg-white border border-slate-800 light:border-slate-200 shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-2.5 border-b border-slate-800 light:border-slate-100">
                      <p className="text-xs text-slate-400">Signed in as</p>
                      <p className="text-sm font-semibold text-white light:text-slate-900 truncate">{user.email}</p>
                    </div>

                    <Link
                      to={isAdmin ? "/admin/dashboard" : "/dashboard"}
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-300 light:text-slate-700 hover:bg-slate-800 light:hover:bg-slate-100 transition-colors"
                    >
                      <User className="w-4 h-4 text-indigo-400" />
                      Dashboard
                    </Link>

                    <Link
                      to="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-300 light:text-slate-700 hover:bg-slate-800 light:hover:bg-slate-100 transition-colors"
                    >
                      <User className="w-4 h-4 text-emerald-400" />
                      My Profile
                    </Link>

                    {isAdmin && (
                      <Link
                        to="/admin/dashboard"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-purple-400 hover:bg-purple-950/40 transition-colors"
                      >
                        <Shield className="w-4 h-4 text-purple-400" />
                        Admin Panel
                      </Link>
                    )}

                    <div className="border-t border-slate-800 light:border-slate-100 my-1"></div>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-rose-400 hover:bg-rose-950/30 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-xl text-sm font-medium gradient-bg text-white shadow-lg shadow-indigo-500/25 hover:opacity-95 transition-opacity"
                >
                  Start Preparing
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
