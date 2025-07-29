import express from 'express';
import { getPlans, purchasePlan } from '../controllers/insuranceControllers.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/plans', getPlans); // Anyone can view
router.post('/purchase', protect, purchasePlan); // Only logged-in users

export default router;
