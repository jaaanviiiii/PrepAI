import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import questionRoutes from './routes/questionRoutes.js';
import bookmarkRoutes from './routes/bookmarkRoutes.js';
import interviewRoutes from './routes/interviewRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import roadmapRoutes from './routes/roadmapRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

import User from './models/User.js';
import Question from './models/Question.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Connect Database
await connectDB();

// Auto-seed admin and basic questions if empty
const autoSeedIfEmpty = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('No users found. Auto-seeding initial admin and demo user...');
      const adminPassword = await bcrypt.hash('Admin@123', 10);
      const studentPassword = await bcrypt.hash('Student@123', 10);

      await User.create([
        {
          name: 'Admin PrepAI',
          email: 'admin@prepai.com',
          password: adminPassword,
          role: 'admin',
          targetRole: 'Full Stack Developer',
          experienceLevel: 'Advanced',
          skills: ['System Design', 'Security', 'Node.js', 'React'],
          programmingLanguages: ['JavaScript', 'Python', 'Java']
        },
        {
          name: 'Alex Johnson',
          email: 'student@prepai.com',
          password: studentPassword,
          role: 'user',
          targetRole: 'Software Developer',
          experienceLevel: 'Intermediate',
          skills: ['React', 'JavaScript', 'SQL', 'DSA'],
          programmingLanguages: ['JavaScript', 'Java', 'Python'],
          streakCount: 5
        }
      ]);
    }

    const qCount = await Question.countDocuments();
    if (qCount === 0) {
      console.log('No questions found. Auto-seeding sample questions...');
      await Question.create([
        {
          question: 'Explain the difference between an Array and a Linked List in memory representation and complexity.',
          category: 'Data Structures',
          difficulty: 'Beginner',
          answer: 'Arrays use contiguous memory providing O(1) random access. Linked lists use non-contiguous nodes connected by pointers.',
          explanation: 'Memory layout impacts spatial locality and CPU cache efficiency.',
          tags: ['DSA', 'Arrays', 'LinkedList']
        },
        {
          question: 'What is the JavaScript Event Loop and Microtask Queue?',
          category: 'JavaScript',
          difficulty: 'Intermediate',
          answer: 'The event loop handles execution of callbacks. Microtasks (Promises) execute completely before macrotasks (setTimeout).',
          explanation: 'Prevents blocking UI thread and ensures predictable async execution.',
          tags: ['JavaScript', 'Async', 'EventLoop']
        },
        {
          question: 'Tell me about yourself and your technical background.',
          category: 'HR',
          difficulty: 'Beginner',
          answer: 'Structure answer as a 2-minute elevator pitch covering background, key projects, and alignment with target role.',
          explanation: 'Keep concise, positive, and focused on target job requirements.',
          tags: ['HR', 'ElevatorPitch']
        },
        {
          question: 'Explain Database Indexing and how B-Trees improve query performance.',
          category: 'SQL',
          difficulty: 'Intermediate',
          answer: 'Indices maintain sorted pointers allowing logarithmic O(log N) lookup instead of full table scans.',
          explanation: 'Speeds up SELECT queries at cost of slight overhead on writes.',
          tags: ['SQL', 'DBMS', 'Indexing']
        }
      ]);
    }
  } catch (err) {
    console.error('Auto-seed error:', err.message);
  }
};

await autoSeedIfEmpty();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/bookmarks', bookmarkRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/roadmap', roadmapRoutes);
app.use('/api/admin', adminRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'PrepAI API server is running smoothly' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`PrepAI Backend Server running on http://localhost:${PORT}`);
});
