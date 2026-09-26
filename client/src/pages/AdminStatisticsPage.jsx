import React, { useEffect, useState } from 'react';
import { getAdminStatistics, getReportedQuestions } from '../services/api';
import QuestionCard from '../components/QuestionCard';
import { LineChart, AlertTriangle, ShieldCheck, Loader2 } from 'lucide-react';

const AdminStatisticsPage = () => {
  const [stats, setStats] = useState(null);
  const [reportedQuestions, setReportedQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, reportedRes] = await Promise.all([
          getAdminStatistics(),
          getReportedQuestions()
        ]);
        setStats(statsRes.data);
        setReportedQuestions(reportedRes.data.questions || []);
      } catch (err) {
        console.error('Failed fetching statistics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
        <span className="text-sm font-medium text-slate-400">Loading system statistics...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-3">
          <LineChart className="w-3.5 h-3.5 text-purple-400" />
          <span>PLATFORM STATISTICS & AUDITING</span>
        </div>
        <h1 className="text-3xl font-black text-white">System Statistics</h1>
        <p className="text-sm text-slate-400 mt-1">
          Platform usage statistics and candidate issue reports.
        </p>
      </div>

      {/* Reported Questions Audit Section */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg font-bold text-white">Flagged & Reported Questions ({reportedQuestions.length})</h2>
        </div>

        {reportedQuestions.length > 0 ? (
          <div className="space-y-4">
            {reportedQuestions.map(q => (
              <div key={q._id} className="space-y-2">
                <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-300 font-medium">
                  <strong>Reason Reported:</strong> {q.reportReason || 'User flagged issue'}
                </div>
                <QuestionCard question={q} isAdmin={true} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400 py-4 text-center">
            No questions currently reported. Platform content quality is clean.
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminStatisticsPage;
