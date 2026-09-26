import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    targetRole: { type: String, default: 'Software Developer' },
    experienceLevel: { type: String, default: 'Beginner' }, // Beginner, Intermediate, Advanced
    skills: [{ type: String }],
    programmingLanguages: [{ type: String }],
    preferredInterviewType: { type: String, default: 'Mixed' }, // Technical, HR, Mixed
    avatar: { type: String, default: '' },
    streakCount: { type: Number, default: 3 },
    lastActive: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
