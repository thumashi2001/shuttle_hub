require('dotenv').config();
const nodemailer = require('nodemailer');


console.log('EMAIL', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '[REDACTED]' : 'undefined');
console.log('SHUTTLEHUB_EMAIL:', process.env.SHUTTLEHUB_EMAIL);

// Create a transporter using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS, // Your Gmail App Password (not your regular password)
  },
});

// Function to send email
const sendEmail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: `"ShuttleHub Order System" <${process.env.EMAIL_USER}>`, // Sender address
      to, // Recipient address
      subject, // Subject line
      html, // HTML body
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

module.exports = sendEmail;