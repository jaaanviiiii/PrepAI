import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    topic: { type: String, required: true },
    questionsAttempted: { type: Number, default: 0 },
    correctAnswers: { type: Number, default: 0 },
    accuracy: { type: Number, default: 0 },
    score: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model('Progress', progressSchema);
