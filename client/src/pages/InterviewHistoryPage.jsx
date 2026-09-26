import React, { useEffect, useState } from 'react';
import { getInterviewHistory } from '../services/api';
import FeedbackModal from '../components/FeedbackModal';
import { History, Award, Calendar, Bot, Eye, Loader2, Search } from 'lucide-react';

const InterviewHistoryPage = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [search, setSearch] = useState('');

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await getInterviewHistory();
      setInterviews(res.data.interviews || []);
    } catch (err) {
      console.error('Failed fetching interview history:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const filtered = interviews.filter(i => 
    i.role.toLowerCase().includes(search.toLowerCase()) ||
    i.interviewType.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Title Header */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-3">
              <History className="w-3.5 h-3.5" />
              <span>PAST MOCK INTERVIEWS & EVALUATIONS</span>
            </div>
            <h1 className="text-3xl font-black text-white">Interview History</h1>
            <p className="text-sm text-slate-400 mt-1">
              Review detailed score reports, question breakdowns, and AI feedback from previous mock sessions.
            </p>
          </div>

          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by role or type..."
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* History Data Table */}
      {loading ? (
        <div className="py-16 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
          <span className="text-sm font-medium text-slate-400">Loading interview records...</span>
        </div>
      ) : filtered.length > 0 ? (
        <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950/80 border-b border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-4 px-6">Date</th>
                  <th className="py-4 px-6">Role</th>
                  <th className="py-4 px-6">Interview Type</th>
                  <th className="py-4 px-6">Questions</th>
                  <th className="py-4 px-6">Score</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-sm">
                {filtered.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-900/60 transition-colors">
                    <td className="py-4 px-6 text-slate-300 font-medium whitespace-nowrap">
                      {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="py-4 px-6 text-white font-semibold">
                      {item.role}
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                        {item.interviewType}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-300">
                      {item.questions ? item.questions.length : item.totalQuestions} Questions
                    </td>
                    <td className="py-4 px-6">
                      <span className={`font-black text-sm ${item.overallScore >= 80 ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {item.overallScore}/100
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        Completed
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => setSelectedInterview(item)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 text-indigo-300 hover:text-white hover:bg-indigo-600 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View AI Report</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="glass-panel p-12 rounded-3xl text-center border border-slate-800 space-y-3">
          <History className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No interview records found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Take an AI Mock Interview session to generate your first detailed evaluation report.
          </p>
        </div>
      )}

      {/* AI Feedback Modal Popup */}
      {selectedInterview && (
        <FeedbackModal
          interview={selectedInterview}
          onClose={() => setSelectedInterview(null)}
        />
      )}
    </div>
  );
};

export default InterviewHistoryPage;
