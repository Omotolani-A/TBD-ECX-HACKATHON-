import axios from 'axios';
import Payment from '../models/paymentModels.js';

export const initiatePayment = async (req, res) => {
  const { email, amount } = req.body;

  try {
    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email,
        amount: amount * 100, // Paystack expects amount in kobo
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(200).json({
      message: 'Payment initiated',
      authorization_url: response.data.data.authorization_url,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Payment initialization failed',
      error: error.response?.data || error.message,
    });
  }
};


export const verifyPayment = async (req, res) => {
  const { reference } = req.query;

  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const data = response.data.data;

    // Save to DB
    const payment = await Payment.create({
      user: req.user._id,
      reference: data.reference,
      amount: data.amount / 100,
      status: data.status,
    });

    res.status(200).json({
      message: 'Payment verified and saved',
      payment,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Payment verification failed',
      error: error.message,
    });
  }
};
