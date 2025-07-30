import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const TERMII_API_KEY = process.env.TERMII_API_KEY;

const sendSMS = async (phoneNumber, message) => {
  try {
    const response = await axios.post('https://api.ng.termii.com/api/sms/send', {
      to: phoneNumber, 
      from: 'Claimr',   
      sms: message,
      type: 'plain',
      channel: 'generic',
      api_key: TERMII_API_KEY,
    });

    return response.data;
  } catch (error) {
    console.error('❌ Error sending SMS:', error?.response?.data || error.message);
    throw new Error('Failed to send SMS');
  }
};

export default sendSMS;
