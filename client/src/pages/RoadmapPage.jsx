import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { getRoadmap, generateRoadmap, updateRoadmapTask } from '../services/api';
import { Map, Sparkles, CheckCircle2, Circle, Calendar, Loader2, RefreshCw } from 'lucide-react';

const RoadmapPage = () => {
  const { user } = useAuth();
  const { addToast } = useToast();

  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  const fetchRoadmap = async () => {
    setLoading(true);
    try {
      const res = await getRoadmap();
      setRoadmap(res.data.roadmap);
    } catch (err) {
      console.error('Failed to load roadmap:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoadmap();
  }, []);

  const handleRegenerate = async () => {
    setGenerating(true);
    try {
      const res = await generateRoadmap({
        targetRole: user?.targetRole || 'Software Developer',
        experienceLevel: user?.experienceLevel || 'Beginner'
      });
      setRoadmap(res.data.roadmap);
      addToast('New personalized AI roadmap generated!', 'success');
    } catch (err) {
      addToast(err.customMessage || 'Failed to generate roadmap', 'error');
    } finally {
      setGenerating(false);
    }
  };

  const handleToggleTask = async (weekNumber, topicName, currentCompleted) => {
    if (!roadmap) return;

    // Optimistic UI update
    const updatedWeeks = roadmap.weeks.map(w => {
      if (w.weekNumber === weekNumber) {
        return {
          ...w,
          topics: w.topics.map(t => t.name === topicName ? { ...t, completed: !currentCompleted } : t)
        };
      }
      return w;
    });

    let total = 0;
    let done = 0;
    updatedWeeks.forEach(w => {
      w.topics.forEach(t => {
        total++;
        if (t.completed) done++;
      });
    });

    const newProgress = total > 0 ? Math.round((done / total) * 100) : 0;
    setRoadmap({ ...roadmap, weeks: updatedWeeks, overallProgress: newProgress });

    try {
      await updateRoadmapTask(roadmap._id, {
        weekNumber,
        topicName,
        completed: !currentCompleted
      });
    } catch (err) {
      console.error('Failed updating task status:', err);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="glass-panel p-8 rounded-3xl border border-indigo-500/30 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-3">
              <Map className="w-3.5 h-3.5" />
              <span>AI-POWERED PREPARATION SCHEDULE</span>
            </div>
            <h1 className="text-3xl font-black text-white">My Study Roadmap</h1>
            <p className="text-sm text-slate-400 mt-1">
              Personalized 4-week preparation plan for <strong className="text-indigo-300">{roadmap?.targetRole || user?.targetRole || 'Software Developer'}</strong>.
            </p>
          </div>

          <button
            onClick={handleRegenerate}
            disabled={generating}
            className="px-5 py-3 rounded-2xl font-semibold text-xs bg-slate-900 border border-indigo-500/30 text-indigo-300 hover:text-white hover:bg-indigo-950/40 flex items-center gap-2 shrink-0 disabled:opacity-50"
          >
            {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4 text-amber-400" />}
            <span>{generating ? 'Re-analyzing...' : 'Regenerate AI Plan'}</span>
          </button>
        </div>
      </div>

      {/* Progress Bar Card */}
      {roadmap && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Overall Roadmap Progress
            </span>
            <span className="text-sm font-black text-indigo-400">{roadmap.overallProgress}% Completed</span>
          </div>
          <div className="w-full h-3 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
            <div
              className="h-full gradient-bg rounded-full transition-all duration-500"
              style={{ width: `${roadmap.overallProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Timeline Weeks List */}
      {loading ? (
        <div className="py-16 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
          <span className="text-sm font-medium text-slate-400">Building custom preparation roadmap...</span>
        </div>
      ) : roadmap && roadmap.weeks ? (
        <div className="space-y-6">
          {roadmap.weeks.map((week) => (
            <div key={week.weekNumber} className="glass-panel rounded-3xl p-6 border border-slate-800/80 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl gradient-bg flex items-center justify-center text-xs font-black text-white">
                    W{week.weekNumber}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white">Week {week.weekNumber}: {week.title}</h3>
                    <p className="text-xs text-slate-400">{week.focus}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {week.topics.map((topic, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleToggleTask(week.weekNumber, topic.name, topic.completed)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${
                      topic.completed
                        ? 'bg-emerald-950/20 border-emerald-500/40 text-slate-300'
                        : 'bg-slate-950/60 border-slate-800 hover:border-indigo-500/40 text-slate-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        {topic.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-500 shrink-0" />
                        )}
                        <h4 className={`text-sm font-semibold ${topic.completed ? 'line-through text-slate-400' : 'text-white'}`}>
                          {topic.name}
                        </h4>
                      </div>

                      {topic.deadline && (
                        <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 shrink-0 bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800">
                          <Calendar className="w-3 h-3 text-indigo-400" />
                          {topic.deadline}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed pl-7">{topic.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default RoadmapPage;
