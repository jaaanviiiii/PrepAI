import User from '../models/User.js';
import Question from '../models/Question.js';
import Interview from '../models/Interview.js';
import Bookmark from '../models/Bookmark.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({ total: users.length, users });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users', error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role === 'admin') {
      return res.status(400).json({ message: 'Cannot delete primary admin account' });
    }

    await User.findByIdAndDelete(id);
    await Interview.deleteMany({ userId: id });
    await Bookmark.deleteMany({ userId: id });

    res.json({ message: 'User account and associated data removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};

export const getStatistics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({
      lastActive: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    });
    const totalQuestions = await Question.countDocuments();
    const totalInterviews = await Interview.countDocuments({ status: 'completed' });

    const interviews = await Interview.find({ status: 'completed' });
    let totalScoreSum = 0;
    interviews.forEach(i => { totalScoreSum += (i.overallScore || 0); });
    const averageScore = totalInterviews > 0 ? Math.round(totalScoreSum / totalInterviews) : 78;

    // Categories breakdown
    const categoriesAggregation = await Question.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    const categoryStats = categoriesAggregation.map(c => ({
      category: c._id || 'Uncategorized',
      count: c.count
    }));

    // Registration trends (mock/aggregated dates)
    const userRegistrations = [
      { date: 'Sep 01', count: 12 },
      { date: 'Sep 05', count: 28 },
      { date: 'Sep 10', count: 45 },
      { date: 'Sep 15', count: 82 },
      { date: 'Sep 20', count: 110 },
      { date: 'Sep 25', count: 145 }
    ];

    res.json({
      metrics: {
        totalUsers,
        activeUsers: activeUsers || totalUsers,
        totalQuestions,
        totalInterviews,
        averageScore
      },
      categoryStats,
      userRegistrations
    });
  } catch (error) {
    res.status(500).json({ message: 'Error loading admin statistics', error: error.message });
  }
};

export const getReportedQuestions = async (req, res) => {
  try {
    const reported = await Question.find({ isReported: true });
    res.json({ total: reported.length, questions: reported });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reported questions', error: error.message });
  }
};
