const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const tshirtRoutes = require('./routes/tshirtRoutes');
const sendEmail = require('./utils/sendEmail'); // Import the sendEmail function
require('dotenv').config();

// Log environment variables to verify they are loaded
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '[REDACTED]' : 'undefined');
console.log('SHUTTLEHUB_EMAIL:', process.env.SHUTTLEHUB_EMAIL);

const app = express();

// Connect to MongoDB with error handling
const startServer = async () => {
  try {
    await connectDB(); // Wait for DB connection
    console.log('Database connected successfully');

    // Middleware
    app.use(cors());
    app.use(express.json());

    // Routes
    app.use('/api/tshirts', tshirtRoutes);

    // New endpoint to send email when an order is placed
    app.post('/api/orders/send-email', async (req, res) => {
      const { design, delivery, payment } = req.body;

      // Validate request body
      if (!design || !delivery || !payment) {
        return res.status(400).json({ message: 'Missing required order details' });
      }

      // Construct the email content
      const subject = `New Order Placed - ${design.name || 'Unnamed Design'}`;
      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #14b8a6;">New Order Received</h2>
          <p>A new order has been placed with the following details:</p>
          <h3 style="color: #333;">Design Details</h3>
          <ul style="list-style-type: none; padding: 0;">
            <li><strong>Name:</strong> ${design.name || 'Unnamed Design'}</li>
            <li><strong>Size:</strong> ${design.size}</li>
            <li><strong>Color:</strong> <span style="display: inline-block; width: 20px; height: 20px; background-color: ${
              design.color
            }; border: 1px solid #ccc; vertical-align: middle;"></span> ${
        design.color
      }</li>
            <li><strong>Design Text:</strong> ${design.design || 'N/A'}</li>
            <li><strong>Position:</strong> ${design.position}</li>
            <li><strong>Logo:</strong> ${design.logo || 'N/A'}</li>
          </ul>
          <h3 style="color: #333;">Delivery Details</h3>
          <ul style="list-style-type: none; padding: 0;">
            <li><strong>Address:</strong> ${delivery.address}</li>
            <li><strong>City:</strong> ${delivery.city}</li>
            <li><strong>ZIP Code:</strong> ${delivery.zip}</li>
          </ul>
          <h3 style="color: #333;">Payment Details</h3>
          <ul style="list-style-type: none; padding: 0;">
            <li><strong>Card Number:</strong> ${payment.cardNumber
              .slice(-4)
              .padStart(payment.cardNumber.length, '*')}</li>
            <li><strong>Expiry:</strong> ${payment.expiry}</li>
          </ul>
          <p style="color: #666;">Please process this order at your earliest convenience.</p>
          <footer style="margin-top: 20px; text-align: center; color: #999;">
            <p>ShuttleHub © ${new Date().getFullYear()}</p>
          </footer>
        </div>
      `;

      try {
        await sendEmail(process.env.SHUTTLEHUB_EMAIL, subject, html);
        res.status(200).json({ message: 'Email sent successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Failed to send email', error: error.message });
      }
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();