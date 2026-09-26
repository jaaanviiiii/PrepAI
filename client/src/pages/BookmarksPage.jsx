import React, { useEffect, useState } from 'react';
import { getBookmarks } from '../services/api';
import QuestionCard from '../components/QuestionCard';
import { Bookmark, Search, Filter, Loader2 } from 'lucide-react';

const BookmarksPage = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

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

  const fetchSavedBookmarks = async () => {
    setLoading(true);
    try {
      const params = {};
      if (category !== 'All') params.category = category;
      if (search) params.search = search;

      const res = await getBookmarks(params);
      setBookmarks(res.data.bookmarks || []);
    } catch (err) {
      console.error('Failed to load bookmarks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedBookmarks();
  }, [category]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchSavedBookmarks();
  };

  const handleBookmarkToggle = (qId) => {
    setBookmarks(prev => prev.filter(q => q._id !== qId));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Title Header */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
              <Bookmark className="w-3.5 h-3.5 fill-amber-400" />
              <span>SAVED PRACTICE COLLECTION</span>
            </div>
            <h1 className="text-3xl font-black text-white">Bookmarked Questions</h1>
            <p className="text-sm text-slate-400 mt-1">
              Your saved collection of important questions and explanations for quick revision.
            </p>
          </div>

          <form onSubmit={handleSearchSubmit} className="relative max-w-md w-full">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search saved questions..."
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

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              category === cat
                ? 'gradient-bg text-white shadow-md shadow-indigo-500/25'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Questions Grid */}
      {loading ? (
        <div className="py-16 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
          <span className="text-sm font-medium text-slate-400">Loading saved bookmarks...</span>
        </div>
      ) : bookmarks.length > 0 ? (
        <div className="grid grid-cols-1 gap-5">
          {bookmarks.map((q) => (
            <QuestionCard key={q._id} question={q} onBookmarkToggle={handleBookmarkToggle} />
          ))}
        </div>
      ) : (
        <div className="glass-panel p-12 rounded-3xl text-center border border-slate-800 space-y-3">
          <Bookmark className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No bookmarked questions</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Click the bookmark icon on any question in the Question Bank to save it here for offline review.
          </p>
        </div>
      )}
    </div>
  );
};

export default BookmarksPage;
