import axios from 'axios';

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
