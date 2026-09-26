import express from 'express';
import { getRoadmap, generateRoadmap, updateTaskStatus } from '../controllers/roadmapController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', verifyToken, getRoadmap);
router.post('/generate', verifyToken, generateRoadmap);
router.put('/:id/task', verifyToken, updateTaskStatus);

export default router;
