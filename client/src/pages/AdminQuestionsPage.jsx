import React, { useEffect, useState } from 'react';
import { getQuestions, deleteQuestion } from '../services/api';
import QuestionCard from '../components/QuestionCard';
import QuestionModal from '../components/QuestionModal';
import { useToast } from '../context/ToastContext';
import { HelpCircle, Plus, Search, Filter, Loader2 } from 'lucide-react';

const AdminQuestionsPage = () => {
  const { addToast } = useToast();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [difficulty, setDifficulty] = useState('All');

  const [modalOpen, setModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

  const categories = [
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
    'SQL',
    'HR'
  ];

  const fetchQuestionsList = async () => {
    setLoading(true);
    try {
      const params = {};
      if (category !== 'All') params.category = category;
      if (difficulty !== 'All') params.difficulty = difficulty;
      if (search) params.search = search;

      const res = await getQuestions(params);
      setQuestions(res.data.questions || []);
    } catch (err) {
      console.error('Failed fetching questions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestionsList();
  }, [category, difficulty]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchQuestionsList();
  };

  const handleOpenAdd = () => {
    setEditingQuestion(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (q) => {
    setEditingQuestion(q);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this question?')) return;

    try {
      await deleteQuestion(id);
      addToast('Question deleted successfully', 'success');
      setQuestions(prev => prev.filter(q => q._id !== id));
    } catch (err) {
      addToast(err.customMessage || 'Failed to delete question', 'error');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Title Header */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-3">
              <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
              <span>QUESTION BANK MANAGEMENT</span>
            </div>
            <h1 className="text-3xl font-black text-white">Manage Questions</h1>
            <p className="text-sm text-slate-400 mt-1">
              Add, edit, or delete questions and model answers in the PrepAI repository.
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="px-6 py-3.5 rounded-2xl font-bold text-sm bg-purple-600 text-white hover:bg-purple-500 shadow-lg shadow-purple-500/30 transition-all flex items-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Question</span>
          </button>
        </div>
      </div>

      {/* Filters & Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <form onSubmit={handleSearch} className="relative max-w-md w-full">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions by phrase..."
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-10 pr-24 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-xl text-xs font-semibold gradient-bg text-white"
            >
              Search
            </button>
          </form>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-400">Difficulty:</span>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
            >
              <option value="All">All Difficulties</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                category === cat
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Questions List */}
      {loading ? (
        <div className="py-16 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
          <span className="text-sm font-medium text-slate-400">Loading questions list...</span>
        </div>
      ) : questions.length > 0 ? (
        <div className="grid grid-cols-1 gap-5">
          {questions.map((q) => (
            <QuestionCard
              key={q._id}
              question={q}
              isAdmin={true}
              onEdit={handleOpenEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="glass-panel p-12 rounded-3xl text-center border border-slate-800">
          <p className="text-slate-400 text-sm">No questions found for selected criteria.</p>
        </div>
      )}

      {/* Create / Edit Question Modal */}
      <QuestionModal
        question={editingQuestion}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSaveSuccess={fetchQuestionsList}
      />
    </div>
  );
};

export default AdminQuestionsPage;
