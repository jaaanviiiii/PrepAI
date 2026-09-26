import express from 'express';
import { getDashboardAnalytics, getPerformanceAnalytics } from '../controllers/analyticsController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/dashboard', verifyToken, getDashboardAnalytics);
router.get('/performance', verifyToken, getPerformanceAnalytics);

export default router;
