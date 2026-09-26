import express from 'express';
import {
  startInterview,
  submitAnswer,
  completeInterview,
  getInterviewHistory,
  getInterviewById
} from '../controllers/interviewController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/start', verifyToken, startInterview);
router.post('/:id/answer', verifyToken, submitAnswer);
router.post('/:id/complete', verifyToken, completeInterview);
router.get('/history', verifyToken, getInterviewHistory);
router.get('/:id', verifyToken, getInterviewById);

export default router;
