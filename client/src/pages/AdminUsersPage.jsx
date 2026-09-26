import React, { useEffect, useState } from 'react';
import { getAdminUsers, deleteAdminUser } from '../services/api';
import { useToast } from '../context/ToastContext';
import { Users, Search, Trash2, Shield, User, Loader2 } from 'lucide-react';

const AdminUsersPage = () => {
  const { addToast } = useToast();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getAdminUsers();
      setUsers(res.data.users || []);
    } catch (err) {
      console.error('Failed fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteAdminUser(id);
      addToast('User account removed successfully', 'success');
      setUsers(prev => prev.filter(u => u._id !== id));
      setDeleteConfirmId(null);
    } catch (err) {
      addToast(err.customMessage || 'Failed to delete user', 'error');
    }
  };

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    (u.targetRole && u.targetRole.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Title Header */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-3">
              <Users className="w-3.5 h-3.5 text-purple-400" />
              <span>USER & CANDIDATE MANAGEMENT</span>
            </div>
            <h1 className="text-3xl font-black text-white">Registered Users</h1>
            <p className="text-sm text-slate-400 mt-1">
              View and manage candidate accounts registered on PrepAI.
            </p>
          </div>

          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Users Table */}
      {loading ? (
        <div className="py-16 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
          <span className="text-sm font-medium text-slate-400">Loading user database...</span>
        </div>
      ) : filtered.length > 0 ? (
        <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950/80 border-b border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-4 px-6">User Name</th>
                  <th className="py-4 px-6">Email</th>
                  <th className="py-4 px-6">Target Role</th>
                  <th className="py-4 px-6">Experience</th>
                  <th className="py-4 px-6">Role</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-sm">
                {filtered.map((u) => (
                  <tr key={u._id} className="hover:bg-slate-900/60 transition-colors">
                    <td className="py-4 px-6 font-semibold text-white flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
                        {u.name.charAt(0).toUpperCase()}
                      </div>
                      <span>{u.name}</span>
                    </td>
                    <td className="py-4 px-6 text-slate-300 font-sans">{u.email}</td>
                    <td className="py-4 px-6 text-slate-300">{u.targetRole || 'Software Developer'}</td>
                    <td className="py-4 px-6 text-slate-400 text-xs">{u.experienceLevel || 'Beginner'}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                          u.role === 'admin'
                            ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        {u.role === 'admin' ? 'Admin' : 'Candidate'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      {u.role !== 'admin' ? (
                        <button
                          onClick={() => setDeleteConfirmId(u._id)}
                          className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors"
                          title="Delete User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      ) : (
                        <span className="text-xs text-slate-500 italic">Protected</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="glass-panel p-12 rounded-3xl text-center border border-slate-800">
          <p className="text-slate-400 text-sm">No user accounts found.</p>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white">Delete User Account?</h3>
            <p className="text-xs text-slate-400">
              This action will permanently delete this candidate's account, mock interviews, and bookmarks.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 text-white hover:bg-rose-500"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsersPage;
