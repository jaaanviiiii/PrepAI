import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAdminStatistics, getReportedQuestions } from '../services/api';
import StatCard from '../components/StatCard';
import {
  Users,
  HelpCircle,
  Bot,
  Award,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  Plus,
  Loader2
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [reportedCount, setReportedCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [statsRes, reportedRes] = await Promise.all([
          getAdminStatistics(),
          getReportedQuestions()
        ]);
        setStats(statsRes.data);
        setReportedCount(reportedRes.data.total || 0);
      } catch (err) {
        console.error('Failed to load admin dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EC4899'];

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
        <span className="text-sm font-medium text-slate-400">Loading admin analytics...</span>
      </div>
    );
  }

  const { metrics = {}, categoryStats = [], userRegistrations = [] } = stats || {};

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Admin Header Banner */}
      <div className="glass-panel p-8 rounded-3xl border border-purple-500/30 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              <span>PREPAI SYSTEM ADMINISTRATION PANEL</span>
            </div>
            <h1 className="text-3xl font-black text-white">Admin Dashboard</h1>
            <p className="text-sm text-slate-400 mt-1">
              Manage platform users, question bank content, system metrics, and reported questions.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/admin/questions"
              className="px-5 py-3 rounded-2xl font-bold text-sm bg-purple-600 text-white hover:bg-purple-500 shadow-lg shadow-purple-500/30 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Question</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Admin Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Users"
          value={metrics.totalUsers || 2}
          icon={Users}
          change="+12%"
          trend="up"
          color="indigo"
        />
        <StatCard
          title="Active Users"
          value={metrics.activeUsers || 2}
          icon={Users}
          change="Active"
          trend="up"
          color="purple"
        />
        <StatCard
          title="Total Questions"
          value={metrics.totalQuestions || 23}
          icon={HelpCircle}
          change="Question Bank"
          trend="up"
          color="emerald"
        />
        <StatCard
          title="Mock Interviews"
          value={metrics.totalInterviews || 1}
          icon={Bot}
          change="Completed"
          trend="up"
          color="amber"
        />
        <StatCard
          title="Avg Platform Score"
          value={`${metrics.averageScore || 78}/100`}
          icon={Award}
          change="Avg"
          trend="up"
          color="rose"
        />
      </div>

      {/* Admin Reported Questions Banner */}
      {reportedCount > 0 && (
        <div className="p-5 rounded-2xl bg-amber-950/40 border border-amber-500/40 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-amber-300">
                {reportedCount} Question(s) Reported by Users
              </h4>
              <p className="text-xs text-slate-400">
                Review flagged questions for accuracy or typographical issues.
              </p>
            </div>
          </div>
          <Link
            to="/admin/statistics"
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30"
          >
            Inspect Reports
          </Link>
        </div>
      )}

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Registrations Line Chart (2 Cols) */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              User Registration Growth
            </h3>
            <p className="text-xs text-slate-400">New candidate onboarding timeline</p>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userRegistrations} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="date" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
                <Line type="monotone" dataKey="count" stroke="#A855F7" strokeWidth={3} dot={{ r: 5, fill: '#A855F7' }} name="Registered Candidates" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Popularity Pie Chart (1 Col) */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-400" />
              Category Popularity
            </h3>
            <p className="text-xs text-slate-400">Question distribution by category</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryStats}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="count"
                  nameKey="category"
                >
                  {categoryStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
                <Legend wrapperStyle={{ fontSize: '10px', color: '#94A3B8' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
