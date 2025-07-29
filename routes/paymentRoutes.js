import express from 'express';
import { initiatePayment, verifyPayment } from '../controllers/paymentControllers.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/initiate', initiatePayment);

router.get('/verify', protect, verifyPayment);

export default router;
