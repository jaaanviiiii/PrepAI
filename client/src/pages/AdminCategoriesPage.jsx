import React, { useEffect, useState } from 'react';
import { getAdminStatistics } from '../services/api';
import { FolderKanban, HelpCircle, Loader2 } from 'lucide-react';

const AdminCategoriesPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getAdminStatistics();
        setStats(res.data);
      } catch (err) {
        console.error('Failed loading categories stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const { categoryStats = [] } = stats || {};

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-3">
          <FolderKanban className="w-3.5 h-3.5 text-purple-400" />
          <span>CATEGORY MANAGEMENT</span>
        </div>
        <h1 className="text-3xl font-black text-white">Question Categories</h1>
        <p className="text-sm text-slate-400 mt-1">
          Overview of question distribution and active topics across the PrepAI database.
        </p>
      </div>

      {loading ? (
        <div className="py-16 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
          <span className="text-sm font-medium text-slate-400">Loading categories...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryStats.map((item, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{item.category}</h3>
                  <span className="text-xs text-slate-400">{item.count} Questions Available</span>
                </div>
              </div>

              <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20">
                Active
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminCategoriesPage;
