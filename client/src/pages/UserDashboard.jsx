import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getDashboardAnalytics } from '../services/api';
import StatCard from '../components/StatCard';
import {
  HelpCircle,
  Bot,
  Award,
  Flame,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  Clock,
  Target
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const UserDashboard = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await getDashboardAnalytics();
        setAnalytics(res.data);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const performanceChartData = analytics
    ? [
        { category: 'Technical Knowledge', score: analytics.categoryScores?.technicalKnowledge || 82 },
        { category: 'Problem Solving', score: analytics.categoryScores?.problemSolving || 75 },
        { category: 'Communication', score: analytics.categoryScores?.communication || 80 },
        { category: 'Overall Score', score: analytics.metrics?.averageScore || 78 }
      ]
    : [];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Greeting Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/30 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Target Role: {user?.targetRole || 'Software Developer'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              {getTimeGreeting()}, {user?.name || 'User'} 👋
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Here is your AI interview preparation activity and performance overview.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/mock-interview"
              className="px-5 py-3 rounded-2xl font-bold text-sm gradient-bg text-white shadow-lg shadow-indigo-500/30 hover:opacity-95 transition-all flex items-center gap-2 shrink-0"
            >
              <Bot className="w-4 h-4" />
              <span>Start AI Mock Interview</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Questions Practiced"
          value={analytics?.metrics?.questionsPracticed || 28}
          icon={HelpCircle}
          change="12%"
          trend="up"
          color="indigo"
        />
        <StatCard
          title="Mock Interviews"
          value={analytics?.metrics?.mockInterviewsCount || 4}
          icon={Bot}
          change="2 new"
          trend="up"
          color="purple"
        />
        <StatCard
          title="Average Score"
          value={`${analytics?.metrics?.averageScore || 78}/100`}
          icon={Award}
          change="5 pts"
          trend="up"
          color="emerald"
        />
        <StatCard
          title="Preparation Streak"
          value={`${analytics?.metrics?.streakCount || 3} Days`}
          icon={Flame}
          change="Active"
          trend="up"
          color="amber"
        />
      </div>

      {/* Main Content Grid: Performance & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Performance Overview Chart (2 Columns) */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-400" />
                Performance Overview
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Category mastery breakdown across recent sessions</p>
            </div>

            <Link to="/analytics" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
              <span>View Deep Analytics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="category" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} domain={[0, 100]} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                />
                <Bar dataKey="score" fill="url(#colorBar)" radius={[8, 8, 0, 0]} barSize={40} />
                <defs>
                  <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366F1" stopOpacity={1} />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recommended Practice Box (1 Column) */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-bold text-white">Recommended AI Focus</h3>
            </div>

            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Based on your latest mock interview evaluation, focus on these weak topics next:
            </p>

            <div className="space-y-3">
              {(analytics?.recommendations || [
                'Practice Dynamic Programming & Sliding Window questions',
                'Refine STAR method timing for behavioral HR questions',
                'Review SQL JOIN syntax & indexing strategies'
              ]).map((rec, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
                  <Target className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-200 font-medium leading-normal">{rec}</span>
                </div>
              ))}
            </div>
          </div>

          <Link
            to="/roadmap"
            className="mt-6 w-full py-3 rounded-xl font-semibold text-xs bg-slate-800 hover:bg-slate-750 text-indigo-300 border border-indigo-500/20 text-center transition-colors block"
          >
            Open My Preparation Roadmap
          </Link>
        </div>
      </div>

      {/* Recent Activity List */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-400" />
            Recent Activity
          </h3>

          <Link to="/history" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300">
            View All History
          </Link>
        </div>

        <div className="space-y-3">
          {analytics?.recentActivity && analytics.recentActivity.length > 0 ? (
            analytics.recentActivity.map((act) => (
              <div
                key={act.id}
                className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800/80 flex items-center justify-between flex-wrap gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{act.title}</h4>
                    <span className="text-xs text-slate-400">
                      {act.type} Round • {new Date(act.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    Score: {act.score}/100
                  </span>
                  <Link
                    to="/history"
                    className="text-xs font-semibold text-slate-400 hover:text-white"
                  >
                    Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Full Stack Mock Interview</h4>
                  <span className="text-xs text-slate-400">Technical Round • Completed</span>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                Score: 84/100
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
