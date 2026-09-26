import Roadmap from '../models/Roadmap.js';
import User from '../models/User.js';
import { generateRoadmapAI } from '../services/aiService.js';

export const getRoadmap = async (req, res) => {
  try {
    const userId = req.user._id;
    let roadmap = await Roadmap.findOne({ userId });

    if (!roadmap) {
      // Auto-generate initial roadmap for user based on target role
      const aiPlan = await generateRoadmapAI(
        req.user.targetRole || 'Software Developer',
        req.user.experienceLevel || 'Beginner',
        req.user.skills || []
      );

      roadmap = await Roadmap.create({
        userId,
        targetRole: aiPlan.targetRole,
        experienceLevel: aiPlan.experienceLevel,
        weeks: aiPlan.weeks,
        overallProgress: aiPlan.overallProgress
      });
    }

    res.json({ roadmap });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving preparation roadmap', error: error.message });
  }
};

export const generateRoadmap = async (req, res) => {
  try {
    const userId = req.user._id;
    const { targetRole, experienceLevel, skills } = req.body;

    const userTargetRole = targetRole || req.user.targetRole || 'Software Developer';
    const userExp = experienceLevel || req.user.experienceLevel || 'Beginner';

    const aiPlan = await generateRoadmapAI(userTargetRole, userExp, skills || req.user.skills || []);

    // Remove old roadmap if exists
    await Roadmap.deleteMany({ userId });

    const newRoadmap = await Roadmap.create({
      userId,
      targetRole: aiPlan.targetRole,
      experienceLevel: aiPlan.experienceLevel,
      weeks: aiPlan.weeks,
      overallProgress: 0
    });

    res.status(201).json({ message: 'Personalized roadmap generated', roadmap: newRoadmap });
  } catch (error) {
    res.status(500).json({ message: 'Error generating roadmap', error: error.message });
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params; // roadmap ID
    const { weekNumber, topicName, completed } = req.body;

    const roadmap = await Roadmap.findById(id);
    if (!roadmap) {
      return res.status(404).json({ message: 'Roadmap not found' });
    }

    let totalTasks = 0;
    let completedTasks = 0;

    roadmap.weeks.forEach(week => {
      week.topics.forEach(topic => {
        if (week.weekNumber === Number(weekNumber) && topic.name === topicName) {
          topic.completed = completed;
        }
        totalTasks++;
        if (topic.completed) completedTasks++;
      });
    });

    roadmap.overallProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    await roadmap.save();

    res.json({ message: 'Task status updated', roadmap });
  } catch (error) {
    res.status(500).json({ message: 'Error updating task status', error: error.message });
  }
};
