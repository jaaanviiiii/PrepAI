import Interview from '../models/Interview.js';
import Progress from '../models/Progress.js';
import { generateInterviewQuestions, evaluateInterview } from '../services/aiService.js';

export const startInterview = async (req, res) => {
  try {
    const { role, interviewType, difficulty, count = 5 } = req.body;
    const userId = req.user._id;

    if (!role) {
      return res.status(400).json({ message: 'Target job role is required' });
    }

    const questionsList = await generateInterviewQuestions(
      role,
      interviewType || 'Mixed',
      difficulty || 'Medium',
      Number(count)
    );

    const interview = await Interview.create({
      userId,
      role,
      interviewType: interviewType || 'Mixed',
      difficulty: difficulty || 'Medium',
      totalQuestions: questionsList.length,
      questions: questionsList.map(q => ({
        questionText: q.questionText,
        category: q.category,
        userAnswer: '',
        feedback: '',
        score: 0
      })),
      status: 'in_progress'
    });

    res.status(201).json({
      message: 'Interview session created successfully',
      interviewId: interview._id,
      role: interview.role,
      interviewType: interview.interviewType,
      difficulty: interview.difficulty,
      totalQuestions: interview.totalQuestions,
      questions: interview.questions
    });
  } catch (error) {
    res.status(500).json({ message: 'Error starting interview session', error: error.message });
  }
};

export const submitAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const { questionIndex, userAnswer } = req.body;

    const interview = await Interview.findById(id);
    if (!interview) {
      return res.status(404).json({ message: 'Interview session not found' });
    }

    if (questionIndex >= 0 && questionIndex < interview.questions.length) {
      interview.questions[questionIndex].userAnswer = userAnswer || '';
      await interview.save();
    }

    res.json({ message: 'Answer saved successfully', interview });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting answer', error: error.message });
  }
};

export const completeInterview = async (req, res) => {
  try {
    const { id } = req.params;
    const { answers } = req.body; // Array of answers or uses existing stored answers

    const interview = await Interview.findById(id);
    if (!interview) {
      return res.status(404).json({ message: 'Interview session not found' });
    }

    // Merge answers if provided in payload
    if (answers && Array.isArray(answers)) {
      answers.forEach((ans, idx) => {
        if (interview.questions[idx]) {
          interview.questions[idx].userAnswer = ans || interview.questions[idx].userAnswer;
        }
      });
    }

    // AI Evaluation
    const evaluation = await evaluateInterview(
      interview.role,
      interview.interviewType,
      interview.difficulty,
      interview.questions
    );

    interview.questions = evaluation.questions;
    interview.overallScore = evaluation.overallScore;
    interview.categoryScores = evaluation.categoryScores;
    interview.aiFeedback = evaluation.aiFeedback;
    interview.status = 'completed';

    await interview.save();

    // Update Progress model for user
    const topic = interview.role;
    let progress = await Progress.findOne({ userId: req.user._id, topic });
    if (!progress) {
      progress = new Progress({
        userId: req.user._id,
        topic,
        questionsAttempted: interview.questions.length,
        correctAnswers: Math.round((interview.overallScore / 100) * interview.questions.length),
        accuracy: interview.overallScore,
        score: interview.overallScore
      });
    } else {
      progress.questionsAttempted += interview.questions.length;
      progress.correctAnswers += Math.round((interview.overallScore / 100) * interview.questions.length);
      progress.accuracy = Math.round((progress.correctAnswers / progress.questionsAttempted) * 100);
      progress.score = Math.round((progress.score + interview.overallScore) / 2);
    }
    await progress.save();

    res.json({
      message: 'Interview completed and evaluated successfully',
      interview
    });
  } catch (error) {
    res.status(500).json({ message: 'Error completing interview evaluation', error: error.message });
  }
};

export const getInterviewHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    const interviews = await Interview.find({ userId })
      .sort({ createdAt: -1 });

    res.json({ interviews });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving interview history', error: error.message });
  }
};

export const getInterviewById = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);
    if (!interview) {
      return res.status(404).json({ message: 'Interview session not found' });
    }
    res.json({ interview });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching interview details', error: error.message });
  }
};
