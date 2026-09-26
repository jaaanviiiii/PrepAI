import React, { useEffect, useState } from 'react';
import { getQuestions } from '../services/api';
import QuestionCard from '../components/QuestionCard';
import { BookOpen, Search, Filter, Sparkles, Loader2, BookmarkCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const QuestionBankPage = () => {
  const { isAdmin } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const technicalCategories = [
    'All',
    'Data Structures',
    'Algorithms',
    'Java',
    'Python',
    'JavaScript',
    'React',
    'Node.js',
    'DBMS',
    'Operating Systems',
    'Computer Networks',
    'OOP',
    'SQL'
  ];

  const hrCategories = ['HR'];

  const fetchQuestionBank = async () => {
    setLoading(true);
    try {
      const params = {};
      if (selectedCategory !== 'All') params.category = selectedCategory;
      if (selectedDifficulty !== 'All') params.difficulty = selectedDifficulty;
      if (search) params.search = search;

      const res = await getQuestions(params);
      setQuestions(res.data.questions || []);
    } catch (err) {
      console.error('Failed to load question bank:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestionBank();
  }, [selectedCategory, selectedDifficulty]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchQuestionBank();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Page Title & Search Bar */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>OVER 500+ VERIFIED INTERVIEW QUESTIONS</span>
            </div>
            <h1 className="text-3xl font-black text-white">Question Bank & Practice</h1>
            <p className="text-sm text-slate-400 mt-1">
              Browse, search, and practice model solutions across technical domains and HR rounds.
            </p>
          </div>

          <form onSubmit={handleSearchSubmit} className="relative max-w-md w-full">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions by keyphrase, e.g. Event Loop, SQL JOIN..."
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-10 pr-24 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-xl text-xs font-semibold gradient-bg text-white shadow-md"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Category Pills & Difficulty Filter */}
      <div className="space-y-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {technicalCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'gradient-bg text-white shadow-md shadow-indigo-500/25'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              {cat}
            </button>
          ))}
          <button
            onClick={() => setSelectedCategory('HR')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'HR'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-slate-900 border border-slate-800 text-purple-400 hover:bg-purple-950/40'
            }`}
          >
            HR & Behavioral
          </button>
        </div>

        {/* Difficulty Filter Pills */}
        <div className="flex items-center justify-between flex-wrap gap-4 pt-2 border-t border-slate-800/60">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Difficulty:</span>
            {['All', 'Beginner', 'Intermediate', 'Advanced'].map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  selectedDifficulty === diff
                    ? 'bg-slate-800 text-white border border-slate-700 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          <span className="text-xs text-slate-400">
            Showing <strong className="text-white">{questions.length}</strong> questions
          </span>
        </div>
      </div>

      {/* Questions List */}
      {loading ? (
        <div className="py-16 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
          <span className="text-sm font-medium text-slate-400">Loading Question Bank...</span>
        </div>
      ) : questions.length > 0 ? (
        <div className="grid grid-cols-1 gap-5">
          {questions.map((q) => (
            <QuestionCard key={q._id} question={q} isAdmin={isAdmin} />
          ))}
        </div>
      ) : (
        <div className="glass-panel p-12 rounded-3xl text-center border border-slate-800 space-y-3">
          <BookOpen className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No questions found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search query or selecting a different category filter.
          </p>
        </div>
      )}
    </div>
  );
};

export default QuestionBankPage;
