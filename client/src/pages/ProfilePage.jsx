import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { updateUserProfile } from '../services/api';
import { User, Mail, Briefcase, Award, Code, CheckCircle, Save, Sparkles } from 'lucide-react';

const ProfilePage = () => {
  const { user, updateUserState } = useAuth();
  const { addToast } = useToast();

  const [name, setName] = useState(user?.name || '');
  const [targetRole, setTargetRole] = useState(user?.targetRole || 'Software Developer');
  const [experienceLevel, setExperienceLevel] = useState(user?.experienceLevel || 'Beginner');
  const [preferredInterviewType, setPreferredInterviewType] = useState(user?.preferredInterviewType || 'Mixed');
  const [skills, setSkills] = useState(user?.skills ? user.skills.join(', ') : 'React, Node.js, SQL, Data Structures');
  const [programmingLanguages, setProgrammingLanguages] = useState(
    user?.programmingLanguages ? user.programmingLanguages.join(', ') : 'JavaScript, Java, Python'
  );
  const [loading, setLoading] = useState(false);

  const targetRoles = [
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        name,
        targetRole,
        experienceLevel,
        preferredInterviewType,
        skills: skills.split(',').map(s => s.trim()).filter(Boolean),
        programmingLanguages: programmingLanguages.split(',').map(p => p.trim()).filter(Boolean)
      };

      const res = await updateUserProfile(payload);
      updateUserState(res.data.user);
      addToast('Profile updated successfully!', 'success');
    } catch (err) {
      addToast(err.customMessage || 'Failed to update profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 relative overflow-hidden flex flex-col sm:flex-row items-center gap-6">
        <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center font-black text-white text-3xl shadow-xl shadow-indigo-500/30 shrink-0">
          {name ? name.charAt(0).toUpperCase() : 'U'}
        </div>
        <div className="text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
            <h1 className="text-2xl font-black text-white">{name}</h1>
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {user?.role === 'admin' ? 'Admin Account' : 'Student'}
            </span>
          </div>
          <p className="text-xs text-slate-400 flex items-center justify-center sm:justify-start gap-1">
            <Mail className="w-3.5 h-3.5 text-slate-500" />
            {user?.email}
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3">
            <span className="px-2.5 py-1 rounded-lg text-xs bg-slate-800 text-slate-300 border border-slate-700">
              🎯 {targetRole}
            </span>
            <span className="px-2.5 py-1 rounded-lg text-xs bg-slate-800 text-slate-300 border border-slate-700">
              ⚡ {experienceLevel} Level
            </span>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800">
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-800">
          <User className="w-5 h-5 text-indigo-400" />
          <h2 className="text-lg font-bold text-white">Edit Profile Details</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Email Address (ReadOnly)
              </label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full bg-slate-950/50 border border-slate-800/50 rounded-xl p-3 text-sm text-slate-500 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Target Job Role *
              </label>
              <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                {targetRoles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Experience Level *
              </label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Beginner">Beginner (0-1 yrs)</option>
                <option value="Intermediate">Intermediate (1-3 yrs)</option>
                <option value="Advanced">Advanced (3+ yrs)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Preferred Interview Type *
              </label>
              <select
                value={preferredInterviewType}
                onChange={(e) => setPreferredInterviewType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Technical">Technical Only</option>
                <option value="HR">HR Only</option>
                <option value="Mixed">Mixed (Technical + HR)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Primary Technical Skills (comma separated)
            </label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="React, Node.js, System Design, SQL"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Programming Languages (comma separated)
            </label>
            <input
              type="text"
              value={programmingLanguages}
              onChange={(e) => setProgrammingLanguages(e.target.value)}
              placeholder="JavaScript, Java, Python, C++"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-800">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm gradient-bg text-white shadow-lg disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{loading ? 'Saving Changes...' : 'Save Profile Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
