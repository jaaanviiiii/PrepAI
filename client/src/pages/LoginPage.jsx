import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Sparkles, Mail, Lock, LogIn, ArrowRight, Shield } from 'lucide-react';
import Navbar from '../components/Navbar';

const LoginPage = () => {
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const user = await login(email, password);
      addToast(`Welcome back, ${user.name}!`, 'success');
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate(from);
      }
    } catch (err) {
      setErrorMsg(err.customMessage || 'Invalid email or password');
      addToast(err.customMessage || 'Login failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setLoading(true);
    setErrorMsg('');

    try {
      const user = await login(demoEmail, demoPassword);
      addToast(`Signed in as ${user.name} (${user.role})`, 'success');
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setErrorMsg(err.customMessage || 'Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <div className="flex-1 flex items-center justify-center p-4 py-12 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="glass-panel max-w-md w-full p-8 rounded-3xl border border-slate-800 shadow-2xl relative z-10">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-3 shadow-lg shadow-indigo-500/30">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-black text-white">Welcome Back</h1>
            <p className="text-xs text-slate-400 mt-1">Sign in to continue your interview preparation</p>
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs font-medium">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@prepai.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-sm gradient-bg text-white shadow-lg shadow-indigo-500/25 hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <LogIn className="w-4 h-4" />
              <span>{loading ? 'Signing in...' : 'Sign In'}</span>
            </button>
          </form>

          {/* Quick Demo Credentials Buttons */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 text-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-3">
              One-Click Demo Credentials
            </span>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleDemoLogin('student@prepai.com', 'Student@123')}
                className="py-2.5 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-xs font-semibold text-indigo-300 border border-indigo-500/20 transition-colors"
              >
                Demo Student
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('admin@prepai.com', 'Admin@123')}
                className="py-2.5 px-3 rounded-xl bg-purple-950/40 hover:bg-purple-950/60 text-xs font-semibold text-purple-300 border border-purple-500/30 transition-colors flex items-center justify-center gap-1.5"
              >
                <Shield className="w-3.5 h-3.5" />
                Demo Admin
              </button>
            </div>
          </div>

          <p className="text-center text-xs text-slate-400 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-indigo-400 hover:text-indigo-300">
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
