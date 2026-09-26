import React, { useState } from 'react';
import {
  Bookmark,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Tag,
  Edit,
  Trash2
} from 'lucide-react';
import { addBookmark, removeBookmark, reportQuestion } from '../services/api';
import { useToast } from '../context/ToastContext';

const QuestionCard = ({ question, onBookmarkToggle, isAdmin = false, onEdit, onDelete }) => {
  const { addToast } = useToast();
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(question.isBookmarked || false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState('');

  const difficultyColors = {
    Beginner: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    Intermediate: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    Advanced: 'bg-rose-500/15 text-rose-400 border-rose-500/30'
  };

  const handleBookmark = async () => {
    try {
      if (isBookmarked) {
        await removeBookmark(question._id);
        setIsBookmarked(false);
        addToast('Bookmark removed', 'info');
      } else {
        await addBookmark(question._id);
        setIsBookmarked(true);
        addToast('Question saved to bookmarks!', 'success');
      }
      if (onBookmarkToggle) onBookmarkToggle(question._id, !isBookmarked);
    } catch (err) {
      addToast(err.customMessage || 'Failed to update bookmark', 'error');
    }
  };

  const handleReport = async (e) => {
    e.preventDefault();
    try {
      await reportQuestion(question._id, reportReason);
      addToast('Report submitted to administrators', 'success');
      setReportModalOpen(false);
      setReportReason('');
    } catch (err) {
      addToast(err.customMessage || 'Failed to report question', 'error');
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-5 border border-slate-800/80 light:border-slate-200 transition-all duration-200 hover:border-indigo-500/40">
      {/* Header Badges & Actions */}
      <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
            {question.category}
          </span>
          <span
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
              difficultyColors[question.difficulty] || difficultyColors.Intermediate
            }`}
          >
            {question.difficulty}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Completion toggle */}
          <button
            onClick={() => setIsCompleted(!isCompleted)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium border transition-colors ${
              isCompleted
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-slate-800/60 text-slate-400 border-slate-700/60 hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isCompleted ? 'Completed' : 'Mark Done'}</span>
          </button>

          {/* Bookmark toggle */}
          <button
            onClick={handleBookmark}
            className={`p-1.5 rounded-xl border transition-colors ${
              isBookmarked
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                : 'bg-slate-800/60 text-slate-400 border-slate-700/60 hover:text-white'
            }`}
            title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Question'}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
          </button>

          {/* Admin edit/delete buttons */}
          {isAdmin && (
            <>
              <button
                onClick={() => onEdit(question)}
                className="p-1.5 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30 transition-colors"
                title="Edit Question"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(question._id)}
                className="p-1.5 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30 transition-colors"
                title="Delete Question"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Question Text */}
      <h3 className="text-base font-semibold text-white light:text-slate-900 mb-3 leading-snug">
        {question.question}
      </h3>

      {/* Tags */}
      {question.tags && question.tags.length > 0 && (
        <div className="flex items-center gap-1.5 mb-4 flex-wrap">
          <Tag className="w-3 h-3 text-slate-500" />
          {question.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-[10px] font-medium bg-slate-800/80 light:bg-slate-100 text-slate-400 light:text-slate-600 px-2 py-0.5 rounded-md border border-slate-700/40"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Show Answer Accordion Toggle */}
      <div className="pt-2 border-t border-slate-800/80 light:border-slate-200">
        <button
          onClick={() => setShowAnswer(!showAnswer)}
          className="w-full flex items-center justify-between py-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>{showAnswer ? 'Hide Solution & Explanation' : 'Show Solution & Detailed Explanation'}</span>
          </div>
          {showAnswer ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showAnswer && (
          <div className="mt-3 space-y-3 pt-3 border-t border-slate-800/50 light:border-slate-200 animate-in fade-in duration-200">
            <div className="p-3.5 rounded-xl bg-slate-950/60 light:bg-slate-100 border border-indigo-500/20">
              <h4 className="text-xs font-bold text-indigo-300 light:text-indigo-700 uppercase tracking-wider mb-1.5">
                Model Answer:
              </h4>
              <p className="text-sm text-slate-200 light:text-slate-800 leading-relaxed font-sans whitespace-pre-line">
                {question.answer}
              </p>
            </div>

            {question.explanation && (
              <div className="p-3.5 rounded-xl bg-slate-900/60 light:bg-slate-50 border border-slate-800">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                  Key Concept Explanation:
                </h4>
                <p className="text-xs text-slate-300 light:text-slate-600 leading-relaxed">
                  {question.explanation}
                </p>
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={() => setReportModalOpen(true)}
                className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-rose-400 transition-colors"
              >
                <AlertTriangle className="w-3 h-3" />
                <span>Report issue</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Report Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-2">Report Question</h3>
            <p className="text-xs text-slate-400 mb-4">
              Help us maintain high quality questions. Describe the error or issue.
            </p>
            <form onSubmit={handleReport} className="space-y-4">
              <textarea
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                placeholder="Specify inaccurate answer, typos, or wrong category..."
                className="w-full h-24 bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                required
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setReportModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 text-white hover:bg-rose-500"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
