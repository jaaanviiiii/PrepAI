import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { startInterview, submitInterviewAnswer, completeInterview } from '../services/api';
import FeedbackModal from '../components/FeedbackModal';
import {
  Bot,
  Sparkles,
  Clock,
  Send,
  Volume2,
  Award,
  CheckCircle2,
  Loader2,
  ArrowRight,
  RefreshCw
} from 'lucide-react';

const MockInterviewPage = () => {
  const { user } = useAuth();
  const { addToast } = useToast();

  // Setup Step state
  const [step, setStep] = useState(1); // 1 = Setup, 2 = Interview Session, 3 = Completed Evaluation
  const [role, setRole] = useState(user?.targetRole || 'Software Developer');
  const [interviewType, setInterviewType] = useState('Mixed');
  const [difficulty, setDifficulty] = useState('Medium');
  const [questionCount, setQuestionCount] = useState(5);

  // Active Session state
  const [loading, setLoading] = useState(false);
  const [interviewId, setInterviewId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Completed Evaluation state
  const [completedInterviewData, setCompletedInterviewData] = useState(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (step === 2) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [step]);

  const roles = [
    'Software Developer',
    'Full Stack Developer',
    'Frontend Developer',
    'Backend Developer',
    'Data Analyst',
    'Data Scientist',
    'Java Developer',
    'Python Developer',
    'DevOps Engineer'
  ];

  const handleStartInterview = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await startInterview({
        role,
        interviewType,
        difficulty,
        count: questionCount
      });

      const data = res.data;
      setInterviewId(data.interviewId);
      setQuestions(data.questions || []);
      setUserAnswers(new Array(data.questions.length).fill(''));
      setCurrentIdx(0);
      setCurrentAnswer('');
      setTimerSeconds(0);
      setStep(2);
      addToast('AI Interview Session initialized!', 'success');
    } catch (err) {
      addToast(err.customMessage || 'Failed to start interview', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSpeech = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      if (isSpeaking) {
        setIsSpeaking(false);
        return;
      }
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    } else {
      addToast('Speech synthesis not supported in this browser', 'info');
    }
  };

  const handleNextQuestion = async () => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentIdx] = currentAnswer;
    setUserAnswers(updatedAnswers);

    // Persist current answer to backend
    if (interviewId) {
      try {
        await submitInterviewAnswer(interviewId, {
          questionIndex: currentIdx,
          userAnswer: currentAnswer
        });
      } catch (err) {
        console.error('Failed saving answer progress:', err);
      }
    }

    if (currentIdx < questions.length - 1) {
      const nextIdx = currentIdx + 1;
      setCurrentIdx(nextIdx);
      setCurrentAnswer(updatedAnswers[nextIdx] || '');
      if (isSpeaking) window.speechSynthesis.cancel();
    } else {
      // Finalize and trigger AI Evaluation
      await finalizeInterview(updatedAnswers);
    }
  };

  const finalizeInterview = async (finalAnswers) => {
    setLoading(true);
    try {
      const res = await completeInterview(interviewId, { answers: finalAnswers });
      setCompletedInterviewData(res.data.interview);
      setStep(3);
      setShowFeedbackModal(true);
      addToast('AI Evaluation completed!', 'success');
    } catch (err) {
      addToast(err.customMessage || 'Evaluation failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Step 1: Configuration Setup */}
      {step === 1 && (
        <div className="space-y-8">
          <div className="glass-panel p-8 rounded-3xl border border-indigo-500/30 relative overflow-hidden">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-3">
              <Bot className="w-3.5 h-3.5" />
              <span>AI MOCK INTERVIEW SIMULATOR</span>
            </div>
            <h1 className="text-3xl font-black text-white">AI Mock Interview Setup</h1>
            <p className="text-sm text-slate-400 mt-1">
              Configure your interview environment. Our AI will dynamically generate adaptive questions tailored to your profile.
            </p>
          </div>

          <form onSubmit={handleStartInterview} className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Target Job Role *
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                {roles.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Interview Type *
                </label>
                <select
                  value={interviewType}
                  onChange={(e) => setInterviewType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Technical">Technical Only</option>
                  <option value="HR">HR & Behavioral</option>
                  <option value="Mixed">Mixed (Technical + HR)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Difficulty Level *
                </label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Number of Questions *
                </label>
                <select
                  value={questionCount}
                  onChange={(e) => setQuestionCount(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value={3}>3 Questions (Quick Drill)</option>
                  <option value={5}>5 Questions (Standard)</option>
                  <option value={10}>10 Questions (Full Round)</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base gradient-bg text-white shadow-xl shadow-indigo-500/30 hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Generating Session...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <span>Start Interview Session</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Step 2: Live Interview Session */}
      {step === 2 && questions.length > 0 && (
        <div className="space-y-6">
          {/* Top Bar: Progress & Timer */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Question {currentIdx + 1} of {questions.length}
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline-block">
                {role} • {interviewType}
              </span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-mono font-bold">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>{formatTimer(timerSeconds)}</span>
            </div>
          </div>

          {/* Active Question Box */}
          <div className="glass-panel p-8 rounded-3xl border border-indigo-500/30 space-y-6 relative">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Category: {questions[currentIdx]?.category || 'General'}
              </span>

              <button
                onClick={() => handleSpeech(questions[currentIdx]?.questionText)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold border transition-colors ${
                  isSpeaking
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                }`}
              >
                <Volume2 className="w-4 h-4 text-indigo-400" />
                <span>{isSpeaking ? 'Speaking...' : 'Listen Question'}</span>
              </button>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white leading-relaxed">
              {questions[currentIdx]?.questionText}
            </h2>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Your Answer:
                </label>
                <span className="text-[11px] text-slate-500">
                  {currentAnswer.trim().split(/\s+/).filter(Boolean).length} words
                </span>
              </div>
              <textarea
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                placeholder="Type your structured answer clearly using STAR method (Situation, Task, Action, Result) or technical principles..."
                rows={7}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-indigo-500 leading-relaxed font-sans"
              />
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-slate-800">
              <span className="text-xs text-slate-500 hidden sm:inline-block">
                Take your time to structure your response.
              </span>

              <button
                onClick={handleNextQuestion}
                disabled={loading}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm gradient-bg text-white shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Evaluating Answers...</span>
                  </>
                ) : (
                  <>
                    <span>{currentIdx < questions.length - 1 ? 'Submit & Next Question' : 'Complete & Evaluate Interview'}</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Evaluation Summary Screen */}
      {step === 3 && completedInterviewData && (
        <div className="glass-panel p-8 rounded-3xl border border-emerald-500/30 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h2 className="text-3xl font-black text-white">Interview Complete!</h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            Your answers have been analyzed by our AI engine.
          </p>

          <div className="py-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Overall Score</span>
            <div className="text-5xl font-black gradient-text">
              {completedInterviewData.overallScore}/100
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <button
              onClick={() => setShowFeedbackModal(true)}
              className="px-6 py-3.5 rounded-2xl font-bold text-sm gradient-bg text-white shadow-lg flex items-center justify-center gap-2"
            >
              <Award className="w-4 h-4" />
              <span>View Detailed AI Report</span>
            </button>

            <button
              onClick={() => setStep(1)}
              className="px-6 py-3.5 rounded-2xl font-semibold text-sm bg-slate-800 text-slate-300 hover:text-white border border-slate-700 flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Start Another Mock Interview</span>
            </button>
          </div>
        </div>
      )}

      {/* AI Feedback Detailed Modal */}
      {showFeedbackModal && (
        <FeedbackModal
          interview={completedInterviewData}
          onClose={() => setShowFeedbackModal(false)}
        />
      )}
    </div>
  );
};

export default MockInterviewPage;
