import React from 'react';
import {
  X,
  Award,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Sparkles,
  TrendingUp,
  FileText
} from 'lucide-react';

const FeedbackModal = ({ interview, onClose }) => {
  if (!interview) return null;

  const {
    role,
    interviewType,
    difficulty,
    overallScore = 0,
    categoryScores = {},
    aiFeedback = {},
    questions = []
  } = interview;

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30';
    if (score >= 65) return 'text-amber-400 bg-amber-500/15 border-amber-500/30';
    return 'text-rose-400 bg-rose-500/15 border-rose-500/30';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl my-8 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Header */}
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-800">
          <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center shadow-lg shadow-indigo-500/30 shrink-0">
            <Award className="w-7 h-7 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {interviewType} Round
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-400">
                {difficulty} Level
              </span>
            </div>
            <h2 className="text-2xl font-black text-white">{role} AI Interview Report</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Completed on {new Date(interview.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Top Score Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Overall Score Card */}
          <div className="glass-panel p-6 rounded-2xl text-center flex flex-col items-center justify-center border border-indigo-500/30">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Overall Score</span>
            <div className={`w-20 h-20 rounded-full flex items-center justify-center border-4 font-black text-2xl shadow-inner ${getScoreColor(overallScore)}`}>
              {overallScore}/100
            </div>
            <p className="text-xs text-slate-300 mt-3 font-medium">
              {overallScore >= 80 ? '🎉 Ready for Live Interview!' : '👍 Good baseline - needs targeted polish'}
            </p>
          </div>

          {/* Category Scores */}
          <div className="md:col-span-2 glass-panel p-6 rounded-2xl border border-slate-800 space-y-3.5">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-indigo-400" />
              Category Score Breakdown
            </h4>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                <span>Technical Knowledge</span>
                <span className="font-bold text-indigo-400">{categoryScores.technicalKnowledge || 80}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${categoryScores.technicalKnowledge || 80}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                <span>Problem Solving</span>
                <span className="font-bold text-purple-400">{categoryScores.problemSolving || 75}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: `${categoryScores.problemSolving || 75}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                <span>Communication Clarity</span>
                <span className="font-bold text-emerald-400">{categoryScores.communication || 82}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${categoryScores.communication || 82}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                <span>Confidence & Delivery</span>
                <span className="font-bold text-amber-400">{categoryScores.confidence || 76}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${categoryScores.confidence || 76}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* AI Key Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Strengths */}
          <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30">
            <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2 mb-3">
              <CheckCircle className="w-4 h-4" />
              What You Did Well
            </h4>
            <ul className="space-y-2">
              {(aiFeedback.strengths || ['Good technical syntax understanding', 'Structured communication']).map((item, i) => (
                <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}
          <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30">
            <h4 className="text-sm font-bold text-rose-400 flex items-center gap-2 mb-3">
              <AlertCircle className="w-4 h-4" />
              Areas to Improve
            </h4>
            <ul className="space-y-2">
              {(aiFeedback.weaknesses || ['Elaborate more on time-complexity trade-offs', 'Provide more concrete real-world examples']).map((item, i) => (
                <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Missing Concepts & Suggested Topics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Missing Key Concepts
            </h4>
            <div className="flex flex-wrap gap-2">
              {(aiFeedback.missingConcepts || ['Edge case validation', 'Memory spatial locality', 'B-Tree Indexing']).map((concept, i) => (
                <span key={i} className="px-3 py-1 rounded-lg text-xs bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  {concept}
                </span>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
            <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Suggested Focus Topics
            </h4>
            <div className="flex flex-wrap gap-2">
              {(aiFeedback.suggestedTopics || ['Dynamic Programming', 'SQL Query Optimization', 'STAR Behavioral Framework']).map((topic, i) => (
                <span key={i} className="px-3 py-1 rounded-lg text-xs bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sample Improved Answer Box */}
        {aiFeedback.sampleImprovedAnswer && (
          <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-900 border border-indigo-500/30 mb-8">
            <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-400" />
              AI Sample Improved Answer
            </h4>
            <p className="text-xs text-slate-200 leading-relaxed font-sans bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
              {aiFeedback.sampleImprovedAnswer}
            </p>
          </div>
        )}

        {/* Question-by-Question Breakdown */}
        {questions.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white mb-3">Detailed Answers Review</h4>
            {questions.map((q, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-400">Question {idx + 1} ({q.category})</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${getScoreColor(q.score || 80)}`}>
                    Score: {q.score || 80}/100
                  </span>
                </div>
                <p className="text-sm font-semibold text-white">{q.questionText}</p>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                  <span className="font-bold text-slate-400 block mb-1">Your Answer:</span>
                  {q.userAnswer || <span className="italic text-slate-500">No answer submitted</span>}
                </div>
                {q.feedback && (
                  <p className="text-xs text-emerald-400 font-medium">
                    💡 AI Feedback: {q.feedback}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-semibold text-sm gradient-bg text-white shadow-lg"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
