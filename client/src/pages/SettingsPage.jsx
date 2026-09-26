import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { Settings, Sun, Moon, Bell, Shield, Sliders } from 'lucide-react';

const SettingsPage = () => {
  const { theme, toggleTheme } = useTheme();
  const { addToast } = useToast();

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [dailyReminders, setDailyReminders] = useState(true);
  const [aiSpeechSpeed, setAiSpeechSpeed] = useState('1.0');

  const handleSaveSettings = (e) => {
    e.preventDefault();
    addToast('Preferences saved successfully', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div className="glass-panel p-8 rounded-3xl border border-slate-800">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
          <Settings className="w-6 h-6 text-indigo-400" />
          <div>
            <h1 className="text-2xl font-black text-white">Platform Settings & Preferences</h1>
            <p className="text-xs text-slate-400">Configure appearance, notifications, and AI audio settings</p>
          </div>
        </div>

        <form onSubmit={handleSaveSettings} className="space-y-8">
          {/* Appearance Section */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-400" />
              Appearance & Theme Mode
            </h3>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">Theme Preference</h4>
                <p className="text-xs text-slate-400">Toggle between Dark Mode and Light Mode</p>
              </div>

              <button
                type="button"
                onClick={toggleTheme}
                className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs font-semibold text-white flex items-center gap-2"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
                <span>Current: {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
              </button>
            </div>
          </div>

          {/* AI Audio & Speech */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              AI Speech & Mock Interview Audio
            </h3>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">AI Voice Playback Speed</h4>
                <p className="text-xs text-slate-400">Speed rate for reading questions during mock interviews</p>
              </div>

              <select
                value={aiSpeechSpeed}
                onChange={(e) => setAiSpeechSpeed(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
              >
                <option value="0.8">0.8x (Slower)</option>
                <option value="1.0">1.0x (Normal)</option>
                <option value="1.2">1.2x (Faster)</option>
              </select>
            </div>
          </div>

          {/* Notifications */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Bell className="w-4 h-4 text-indigo-400" />
              Notifications & Daily Streak
            </h3>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Daily Practice Reminders</h4>
                  <p className="text-xs text-slate-400">Receive reminders to maintain your preparation streak</p>
                </div>

                <input
                  type="checkbox"
                  checked={dailyReminders}
                  onChange={(e) => setDailyReminders(e.target.checked)}
                  className="w-5 h-5 accent-indigo-600 rounded cursor-pointer"
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Email Digest & Score Reports</h4>
                  <p className="text-xs text-slate-400">Receive weekly score summaries and roadmap progress</p>
                </div>

                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="w-5 h-5 accent-indigo-600 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl font-bold text-sm gradient-bg text-white shadow-lg"
            >
              Save Preferences
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
