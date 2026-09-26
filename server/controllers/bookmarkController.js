import Bookmark from '../models/Bookmark.js';
import Question from '../models/Question.js';

export const getBookmarks = async (req, res) => {
  try {
    const userId = req.user._id;
    const { category, search } = req.query;

    const bookmarks = await Bookmark.find({ userId }).populate('questionId');
    let validBookmarks = bookmarks.filter(b => b.questionId != null);

    if (category && category !== 'All') {
      validBookmarks = validBookmarks.filter(b => b.questionId.category === category);
    }

    if (search) {
      const qLower = search.toLowerCase();
      validBookmarks = validBookmarks.filter(b => 
        b.questionId.question.toLowerCase().includes(qLower) ||
        b.questionId.answer.toLowerCase().includes(qLower)
      );
    }

    const questions = validBookmarks.map(b => ({
      ...b.questionId.toObject(),
      bookmarkId: b._id,
      isBookmarked: true
    }));

    res.json({ total: questions.length, bookmarks: questions });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving bookmarked questions', error: error.message });
  }
};

export const addBookmark = async (req, res) => {
  try {
    const { questionId } = req.body;
    const userId = req.user._id;

    if (!questionId) {
      return res.status(400).json({ message: 'questionId is required' });
    }

    const questionExists = await Question.findById(questionId);
    if (!questionExists) {
      return res.status(404).json({ message: 'Question not found' });
    }

    const existing = await Bookmark.findOne({ userId, questionId });
    if (existing) {
      return res.status(200).json({ message: 'Question already bookmarked', bookmark: existing });
    }

    const bookmark = await Bookmark.create({ userId, questionId });
    res.status(201).json({ message: 'Bookmark added successfully', bookmark });
  } catch (error) {
    res.status(500).json({ message: 'Error adding bookmark', error: error.message });
  }
};

export const removeBookmark = async (req, res) => {
  try {
    const questionId = req.params.id; // Can be questionId or bookmarkId
    const userId = req.user._id;

    await Bookmark.deleteOne({
      userId,
      $or: [{ _id: questionId }, { questionId }]
    });

    res.json({ message: 'Bookmark removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing bookmark', error: error.message });
  }
};
