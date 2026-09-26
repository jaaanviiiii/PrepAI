import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Bot,
  BrainCircuit,
  Target,
  LineChart,
  Map,
  History,
  CheckCircle2,
  ArrowRight,
  Code2,
  Database,
  Cpu,
  Star,
  ShieldCheck,
  Zap
} from 'lucide-react';
import Navbar from '../components/Navbar';

const LandingPage = () => {
  const features = [
    {
      icon: Bot,
      title: 'AI Mock Interviews',
      desc: 'Simulate real technical and HR interview rounds with adaptive AI question flow and instant evaluation.'
    },
    {
      icon: Target,
      title: 'Technical Question Practice',
      desc: 'Master DSA, System Design, SQL, Java, Python, and JavaScript with complete solutions and explanations.'
    },
    {
      icon: BrainCircuit,
      title: 'HR Interview Preparation',
      desc: 'Practice behavioral STAR questions, leadership scenarios, strengths/weaknesses with AI feedback.'
    },
    {
      icon: Map,
      title: 'Personalized Roadmaps',
      desc: 'AI-generated multi-week study schedules tailored directly to your target role and weak concepts.'
    },
    {
      icon: LineChart,
      title: 'Performance Analytics',
      desc: 'Detailed category score breakdown, accuracy tracking, score improvement timeline charts.'
    },
    {
      icon: History,
      title: 'Interview History',
      desc: 'Review past mock sessions, replay question attempts, and trace overall readiness over time.'
    }
  ];

  const steps = [
    { number: '01', title: 'Create your profile', desc: 'Set up your target role, experience level, and preferred tech stack.' },
    { number: '02', title: 'Choose your target role', desc: 'Select from Software Engineer, Full Stack, Data Scientist, DevOps, etc.' },
    { number: '03', title: 'Practice with AI', desc: 'Take live voice/text adaptive mock interviews generated specifically for you.' },
    { number: '04', title: 'Analyze your performance', desc: 'Get category breakdown scores, missing concepts, and AI sample answers.' },
    { number: '05', title: 'Improve your weak areas', desc: 'Follow your dynamic study roadmap to lock in interview readiness.' }
  ];

  const roles = [
    { name: 'Software Developer', icon: Code2, count: '150+ Questions' },
    { name: 'Full Stack Developer', icon: Zap, count: '200+ Questions' },
    { name: 'Frontend Developer', icon: Code2, count: '120+ Questions' },
    { name: 'Backend Developer', icon: Cpu, count: '140+ Questions' },
    { name: 'Data Analyst', icon: Database, count: '90+ Questions' },
    { name: 'Data Scientist', icon: BrainCircuit, count: '110+ Questions' },
    { name: 'Java Developer', icon: Code2, count: '130+ Questions' },
    { name: 'Python Developer', icon: Code2, count: '125+ Questions' },
    { name: 'DevOps Engineer', icon: Cpu, count: '85+ Questions' }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Software Engineer @ TechCorp',
      content: 'PrepAI transformed my interview prep! The AI feedback highlighted my missing dynamic programming concepts and gave me the exact confidence boost I needed.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
    },
    {
      name: 'Marcus Vance',
      role: 'Full Stack Developer',
      content: 'The mock interview simulator feels identical to real senior technical rounds. The personalized roadmap kept me disciplined every week.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
    },
    {
      name: 'Priya Sharma',
      role: 'Data Analyst @ Fintech Solutions',
      content: 'From SQL joins to behavioral STAR questions, PrepAI had every category covered. I cracked my dream job offer in 3 weeks!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-8 animate-in fade-in slide-in-from-bottom-3">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>AI-POWERED INTERVIEW PREPARATION PLATFORM</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none mb-6">
            Prepare Smarter. <br className="hidden sm:inline" />
            <span className="gradient-text">Interview Better.</span>
          </h1>

          <p className="max-w-3xl mx-auto text-lg sm:text-xl text-slate-400 font-normal leading-relaxed mb-10">
            Practice technical and HR interviews with AI-powered feedback and personalized preparation. Boost your confidence and land your dream tech offer.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base gradient-bg text-white shadow-xl shadow-indigo-500/30 hover:opacity-95 transition-all flex items-center justify-center gap-2 group"
            >
              <span>Start Preparing</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="#features"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-semibold text-base bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 transition-all text-center"
            >
              Explore Features
            </a>
          </div>

          {/* Social Proof Badges */}
          <div className="mt-16 pt-8 border-t border-slate-900 flex flex-wrap items-center justify-center gap-8 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Real-time AI Feedback</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-400" />
              <span>500+ Curated Questions</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>4.9/5 Student Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-slate-900/60 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3">Everything You Need</h2>
            <h3 className="text-3xl sm:text-4xl font-black text-white">Comprehensive AI Interview Suite</h3>
            <p className="text-slate-400 text-sm mt-3">From mock interview drills to customized roadmaps, we turn weak topics into strengths.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="glass-card p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">{feat.title}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3">Simple 5-Step Process</h2>
            <h3 className="text-3xl sm:text-4xl font-black text-white">How PrepAI Works</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {steps.map((step, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-2xl border relative flex flex-col justify-between">
                <span className="text-3xl font-black gradient-text mb-4 block">{step.number}</span>
                <div>
                  <h4 className="text-base font-bold text-white mb-2">{step.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Roles */}
      <section id="roles" className="py-24 bg-slate-900/60 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3">Tailored Question Banks</h2>
            <h3 className="text-3xl sm:text-4xl font-black text-white">Supported Target Job Roles</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {roles.map((r, idx) => {
              const Icon = r.icon;
              return (
                <div key={idx} className="glass-panel p-6 rounded-2xl border flex items-center justify-between hover:border-indigo-500/40 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">{r.name}</h4>
                      <span className="text-xs text-slate-400">{r.count}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3">Student Success Stories</h2>
            <h3 className="text-3xl sm:text-4xl font-black text-white">Loved by Engineers & Job Seekers</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="glass-panel p-8 rounded-3xl border flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 mb-4 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-300 italic mb-6">"{t.content}"</p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
                  <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center font-bold text-white text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white">{t.name}</h5>
                    <p className="text-xs text-slate-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-slate-900 border-t border-slate-800 py-12 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center text-white">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="font-bold text-lg text-white">PrepAI</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Empowering candidates worldwide with AI-driven interview practice, mock evaluations, and structured roadmaps.
              </p>
            </div>

            <div>
              <h5 className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">Features</h5>
              <ul className="space-y-2">
                <li><Link to="/mock-interview" className="hover:text-white">AI Mock Interview</Link></li>
                <li><Link to="/questions" className="hover:text-white">Question Bank</Link></li>
                <li><Link to="/roadmap" className="hover:text-white">Study Roadmap</Link></li>
                <li><Link to="/analytics" className="hover:text-white">Analytics</Link></li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">Resources</h5>
              <ul className="space-y-2">
                <li><a href="#how-it-works" className="hover:text-white">How It Works</a></li>
                <li><a href="#roles" className="hover:text-white">Supported Roles</a></li>
                <li><a href="#testimonials" className="hover:text-white">Testimonials</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">Contact</h5>
              <p className="text-slate-400 mb-2">support@prepai.com</p>
              <p className="text-slate-500">Built for Excellence in Technical Hiring.</p>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800/60 text-center text-slate-500">
            <p>© {new Date().getFullYear()} PrepAI – AI Interview Preparation Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
