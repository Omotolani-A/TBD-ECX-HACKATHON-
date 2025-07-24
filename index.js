import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Connect to DB
connectDB();

// Test route
app.get('/', (req, res) => {
  res.send('Claimr is live!');
});

app.use('/api/users', userRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});



