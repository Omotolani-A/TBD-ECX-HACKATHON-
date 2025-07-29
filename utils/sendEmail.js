import nodemailer from 'nodemailer';

const sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Claimr" <${process.env.EMAIL_USERNAME}>`,
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error.message);
  }
};

export default sendEmail;
