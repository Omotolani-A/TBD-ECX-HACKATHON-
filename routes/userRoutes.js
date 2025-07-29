import express from 'express';
import { registerUser, loginUser, getUserProfile, updateUserProfile, getUserPlans } from '../controllers/userControllers.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/profile', protect, getUserProfile);

router.put('/profile', protect, updateUserProfile);

 router.get('/my-plans', protect, getUserPlans);
export default router;
