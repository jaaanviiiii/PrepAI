import User from '../models/User.js';
import Interview from '../models/Interview.js';
import Bookmark from '../models/Bookmark.js';
import Progress from '../models/Progress.js';

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user profile', error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, targetRole, experienceLevel, skills, programmingLanguages, preferredInterviewType, avatar } = req.body;
    
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name) user.name = name;
    if (targetRole) user.targetRole = targetRole;
    if (experienceLevel) user.experienceLevel = experienceLevel;
    if (skills) user.skills = skills;
    if (programmingLanguages) user.programmingLanguages = programmingLanguages;
    if (preferredInterviewType) user.preferredInterviewType = preferredInterviewType;
    if (avatar !== undefined) user.avatar = avatar;

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        targetRole: user.targetRole,
        experienceLevel: user.experienceLevel,
        skills: user.skills,
        programmingLanguages: user.programmingLanguages,
        preferredInterviewType: user.preferredInterviewType,
        avatar: user.avatar,
        streakCount: user.streakCount
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user profile', error: error.message });
  }
};

export const getUserStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const totalInterviews = await Interview.countDocuments({ userId, status: 'completed' });
    const interviews = await Interview.find({ userId, status: 'completed' });
    
    let totalQuestionsAttempted = 0;
    let totalScoreSum = 0;

    interviews.forEach(i => {
      totalQuestionsAttempted += (i.questions ? i.questions.length : 0);
      totalScoreSum += (i.overallScore || 0);
    });

    const averageScore = totalInterviews > 0 ? Math.round(totalScoreSum / totalInterviews) : 0;
    const totalBookmarks = await Bookmark.countDocuments({ userId });
    
    const progressDocs = await Progress.find({ userId });

    res.json({
      totalInterviews,
      totalQuestionsAttempted,
      averageScore,
      totalBookmarks,
      streakCount: req.user.streakCount || 3,
      progress: progressDocs
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user statistics', error: error.message });
  }
};
