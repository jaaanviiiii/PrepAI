import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  completed: { type: Boolean, default: false },
  deadline: { type: String, default: '' }
});

const weekSchema = new mongoose.Schema({
  weekNumber: { type: Number, required: true },
  title: { type: String, required: true },
  focus: { type: String, default: '' },
  topics: [taskSchema]
});

const roadmapSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    targetRole: { type: String, required: true },
    experienceLevel: { type: String, default: 'Beginner' },
    weeks: [weekSchema],
    overallProgress: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model('Roadmap', roadmapSchema);
