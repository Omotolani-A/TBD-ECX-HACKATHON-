import express from 'express';
import { registerUser, loginUser, getUserProfile, updateUserProfile, getUserPlans, purchasePlan, submitClaim, getUserClaims } from '../controllers/userControllers.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/profile', protect, getUserProfile);

router.put('/profile', protect, updateUserProfile);

router.get('/my-plans', protect, getUserPlans);

router.post('/purchase', protect, purchasePlan);

router.post('/claims', protect, submitClaim);

router.get('/claims', protect, getUserClaims);

export default router;
