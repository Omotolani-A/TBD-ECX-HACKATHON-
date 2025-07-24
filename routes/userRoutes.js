import express from 'express';
import { registerUser, loginUser } from '../controllers/userControllers.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/profile', protect, (req, res) => {
  res.json({
    message: 'Welcome to your profile!',
    user: req.user,
  });
});

export default router;
