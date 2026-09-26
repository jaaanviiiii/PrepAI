import Question from '../models/Question.js';
import Bookmark from '../models/Bookmark.js';

export const getQuestions = async (req, res) => {
  try {
    const { category, difficulty, search, page = 1, limit = 50 } = req.query;

    const query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (difficulty && difficulty !== 'All') {
      query.difficulty = difficulty;
    }

    if (search) {
      query.$or = [
        { question: { $regex: search, $options: 'i' } },
        { answer: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const total = await Question.countDocuments(query);
    const questions = await Question.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    // Get bookmarked question IDs for the user if logged in
    let bookmarkedIds = [];
    if (req.user) {
      const bookmarks = await Bookmark.find({ userId: req.user._id });
      bookmarkedIds = bookmarks.map(b => b.questionId.toString());
    }

    const formattedQuestions = questions.map(q => ({
      ...q.toObject(),
      isBookmarked: bookmarkedIds.includes(q._id.toString())
    }));

    res.json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      questions: formattedQuestions
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving questions', error: error.message });
  }
};

export const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    let isBookmarked = false;
    if (req.user) {
      const bookmark = await Bookmark.findOne({ userId: req.user._id, questionId: question._id });
      if (bookmark) isBookmarked = true;
    }

    res.json({ question: { ...question.toObject(), isBookmarked } });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching question', error: error.message });
  }
};

export const createQuestion = async (req, res) => {
  try {
    const { question, category, difficulty, answer, explanation, tags } = req.body;

    if (!question || !category || !answer || !explanation) {
      return res.status(400).json({ message: 'Please provide question, category, answer, and explanation' });
    }

    const newQuestion = await Question.create({
      question,
      category,
      difficulty: difficulty || 'Intermediate',
      answer,
      explanation,
      tags: tags || [],
      createdBy: req.user ? req.user._id : null
    });

    res.status(201).json({ message: 'Question created successfully', question: newQuestion });
  } catch (error) {
    res.status(500).json({ message: 'Error creating question', error: error.message });
  }
};

export const updateQuestion = async (req, res) => {
  try {
    const { question, category, difficulty, answer, explanation, tags } = req.body;

    const existing = await Question.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ message: 'Question not found' });
    }

    if (question) existing.question = question;
    if (category) existing.category = category;
    if (difficulty) existing.difficulty = difficulty;
    if (answer) existing.answer = answer;
    if (explanation) existing.explanation = explanation;
    if (tags) existing.tags = tags;

    await existing.save();

    res.json({ message: 'Question updated successfully', question: existing });
  } catch (error) {
    res.status(500).json({ message: 'Error updating question', error: error.message });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    await Bookmark.deleteMany({ questionId: req.params.id });

    res.json({ message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting question', error: error.message });
  }
};

export const reportQuestion = async (req, res) => {
  try {
    const { reason } = req.body;
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    question.isReported = true;
    question.reportReason = reason || 'Reported by user';
    await question.save();

    res.json({ message: 'Question reported to administrators' });
  } catch (error) {
    res.status(500).json({ message: 'Error reporting question', error: error.message });
  }
};
