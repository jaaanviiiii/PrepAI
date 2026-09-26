import mongoose from 'mongoose';

const interviewSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    role: { type: String, required: true },
    interviewType: { type: String, enum: ['Technical', 'HR', 'Mixed'], default: 'Mixed' },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
    totalQuestions: { type: Number, default: 5 },
    questions: [
      {
        questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
        questionText: { type: String, required: true },
        category: { type: String, default: 'General' },
        userAnswer: { type: String, default: '' },
        feedback: { type: String, default: '' },
        score: { type: Number, default: 0 }
      }
    ],
    overallScore: { type: Number, default: 0 },
    categoryScores: {
      technicalKnowledge: { type: Number, default: 0 },
      problemSolving: { type: Number, default: 0 },
      communication: { type: Number, default: 0 },
      confidence: { type: Number, default: 0 }
    },
    aiFeedback: {
      strengths: [{ type: String }],
      weaknesses: [{ type: String }],
      missingConcepts: [{ type: String }],
      suggestedTopics: [{ type: String }],
      sampleImprovedAnswer: { type: String, default: '' },
      overallSummary: { type: String, default: '' }
    },
    status: { type: String, enum: ['in_progress', 'completed'], default: 'in_progress' }
  },
  { timestamps: true }
);

export default mongoose.model('Interview', interviewSchema);
