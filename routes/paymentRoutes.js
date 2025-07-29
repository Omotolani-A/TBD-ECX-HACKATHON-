import express from 'express';
import { initiatePayment } from '../controllers/paymentControllers.js';

const router = express.Router();

router.post('/initiate', initiatePayment);

export default router;
