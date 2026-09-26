import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    category: { type: String, required: true }, // Data Structures, Algorithms, Java, Python, JavaScript, React, Node.js, DBMS, Operating Systems, Computer Networks, OOP, SQL, HR
    difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Intermediate' },
    answer: { type: String, required: true },
    explanation: { type: String, required: true },
    tags: [{ type: String }],
    isReported: { type: Boolean, default: false },
    reportReason: { type: String, default: '' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

export default mongoose.model('Question', questionSchema);
