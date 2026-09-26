import express from 'express';
import {
  getQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  reportQuestion
} from '../controllers/questionController.js';
import { verifyToken, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', verifyToken, getQuestions);
router.get('/:id', verifyToken, getQuestionById);
router.post('/', verifyToken, isAdmin, createQuestion);
router.put('/:id', verifyToken, isAdmin, updateQuestion);
router.delete('/:id', verifyToken, isAdmin, deleteQuestion);
router.post('/:id/report', verifyToken, reportQuestion);

export default router;
