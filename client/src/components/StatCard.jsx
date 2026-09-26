import React from 'react';

const StatCard = ({ title, value, icon: Icon, change, trend = 'up', color = 'indigo' }) => {
  const colorMap = {
    indigo: 'from-indigo-500/20 to-blue-500/10 border-indigo-500/30 text-indigo-400',
    purple: 'from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-400',
    emerald: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400',
    amber: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400',
    rose: 'from-rose-500/20 to-pink-500/10 border-rose-500/30 text-rose-400'
  };

  return (
    <div className="glass-panel p-5 rounded-2xl border transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-slate-400 light:text-slate-600 uppercase tracking-wider">
          {title}
        </span>
        <div className={`p-2.5 rounded-xl bg-gradient-to-br border ${colorMap[color] || colorMap.indigo}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="flex items-baseline justify-between">
        <h3 className="text-2xl font-black text-white light:text-slate-900 tracking-tight">
          {value}
        </h3>

        {change && (
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
              trend === 'up'
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
            }`}
          >
            {trend === 'up' ? '+' : ''}{change}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
