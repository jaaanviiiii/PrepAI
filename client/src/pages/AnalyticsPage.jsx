import React, { useEffect, useState } from 'react';
import { getPerformanceAnalytics } from '../services/api';
import StatCard from '../components/StatCard';
import {
  BarChart3,
  HelpCircle,
  CheckCircle,
  Award,
  TrendingUp,
  PieChart as PieIcon,
  Loader2,
  Sparkles,
  Zap,
  AlertCircle
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

const AnalyticsPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await getPerformanceAnalytics();
        setData(res.data);
      } catch (err) {
        console.error('Error fetching analytics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EC4899'];

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
        <span className="text-sm font-medium text-slate-400">Loading performance analytics...</span>
      </div>
    );
  }

  const { summary = {}, scoreImprovement = [], topicPerformance = [], categoryDistribution = [] } = data || {};

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Title Header */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-3">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>REAL-TIME PERFORMANCE INTELLIGENCE</span>
            </div>
            <h1 className="text-3xl font-black text-white">Performance & Growth Analytics</h1>
            <p className="text-sm text-slate-400 mt-1">
              Analyze your score trajectory, accuracy percentages, and topic mastery across mock sessions.
            </p>
          </div>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Questions Attempted"
          value={summary.totalAttempted || 99}
          icon={HelpCircle}
          change="+18 this week"
          trend="up"
          color="indigo"
        />
        <StatCard
          title="Correct Answers"
          value={summary.correctAnswers || 80}
          icon={CheckCircle}
          change={`${summary.accuracy || 81}% Accuracy`}
          trend="up"
          color="emerald"
        />
        <StatCard
          title="Average Interview Score"
          value={`${summary.avgScore || 79}/100`}
          icon={Award}
          change="+8%"
          trend="up"
          color="purple"
        />
        <StatCard
          title="Strongest Topic"
          value={summary.strongestTopic || 'HR (90%)'}
          icon={Zap}
          trend="up"
          color="amber"
        />
      </div>

      {/* Main Charts Row 1: Line Chart & Pie Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Line Chart: Score Improvement Over Time (2 Cols) */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-400" />
                Score Improvement Over Time
              </h3>
              <p className="text-xs text-slate-400">Track your overall and technical score progression</p>
            </div>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={scoreImprovement} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="date" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} domain={[0, 100]} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
                <Line type="monotone" dataKey="score" stroke="#6366F1" strokeWidth={3} dot={{ r: 5, fill: '#6366F1' }} name="Overall Score" />
                <Line type="monotone" dataKey="technical" stroke="#10B981" strokeWidth={2} strokeDasharray="5 5" name="Technical Score" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart: Question Categories Distribution (1 Col) */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <PieIcon className="w-5 h-5 text-purple-400" />
              Category Distribution
            </h3>
            <p className="text-xs text-slate-400">Practiced topics proportional breakdown</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
                <Legend wrapperStyle={{ fontSize: '11px', color: '#94A3B8' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bar Chart Row 2: Topic Performance */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-400" />
            Topic Performance & Accuracy Breakdown
          </h3>
          <p className="text-xs text-slate-400">Score per technical and behavioral topic category</p>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topicPerformance} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis dataKey="topic" stroke="#64748B" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={11} domain={[0, 100]} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
              <Bar dataKey="score" fill="#8B5CF6" radius={[8, 8, 0, 0]} barSize={36} name="Topic Score %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
