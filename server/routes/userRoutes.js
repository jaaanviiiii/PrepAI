import express from 'express';
import { getProfile, updateProfile, getUserStats } from '../controllers/userController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/profile', verifyToken, getProfile);
router.put('/profile', verifyToken, updateProfile);
router.get('/stats', verifyToken, getUserStats);

export default router;
