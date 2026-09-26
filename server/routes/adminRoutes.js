import express from 'express';
import { getUsers, deleteUser, getStatistics, getReportedQuestions } from '../controllers/adminController.js';
import { verifyToken, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/users', verifyToken, isAdmin, getUsers);
router.delete('/users/:id', verifyToken, isAdmin, deleteUser);
router.get('/statistics', verifyToken, isAdmin, getStatistics);
router.get('/reported', verifyToken, isAdmin, getReportedQuestions);

export default router;
