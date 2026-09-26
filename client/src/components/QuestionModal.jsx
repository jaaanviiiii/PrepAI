import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { createQuestion, updateQuestion } from '../services/api';
import { useToast } from '../context/ToastContext';

const QuestionModal = ({ question, isOpen, onClose, onSaveSuccess }) => {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    question: '',
    category: 'Data Structures',
    difficulty: 'Intermediate',
    answer: '',
    explanation: '',
    tags: ''
  });
  const [loading, setLoading] = useState(false);

  const categories = [
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

  useEffect(() => {
    if (question) {
      setFormData({
        question: question.question || '',
        category: question.category || 'Data Structures',
        difficulty: question.difficulty || 'Intermediate',
        answer: question.answer || '',
        explanation: question.explanation || '',
        tags: question.tags ? question.tags.join(', ') : ''
      });
    } else {
      setFormData({
        question: '',
        category: 'Data Structures',
        difficulty: 'Intermediate',
        answer: '',
        explanation: '',
        tags: ''
      });
    }
  }, [question, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
      };

      if (question && question._id) {
        await updateQuestion(question._id, payload);
        addToast('Question updated successfully!', 'success');
      } else {
        await createQuestion(payload);
        addToast('New question created successfully!', 'success');
      }

      onSaveSuccess();
      onClose();
    } catch (err) {
      addToast(err.customMessage || 'Failed to save question', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl my-8 relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold text-white mb-6">
          {question ? 'Edit Question' : 'Add New Question to Bank'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Question Text *
            </label>
            <textarea
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              placeholder="e.g. Explain how Garbage Collection works in V8 engine..."
              rows={3}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Difficulty Level *
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Expected Model Answer *
            </label>
            <textarea
              value={formData.answer}
              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
              placeholder="Provide a clear, correct model answer..."
              rows={3}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Key Concept Explanation *
            </label>
            <textarea
              value={formData.explanation}
              onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
              placeholder="Underlying principles, time complexities, or edge cases..."
              rows={2}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="DSA, Memory, Async, V8"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold gradient-bg text-white shadow-lg disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{loading ? 'Saving...' : 'Save Question'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionModal;
