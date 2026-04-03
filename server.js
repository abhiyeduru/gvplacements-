// Simple Node.js backend for email and WhatsApp notifications
// Run with: node server.js

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Email endpoint
app.post('/api/send-email', async (req, res) => {
  try {
    const { to, subject, html } = req.body;

    console.log(`📧 Email would be sent to: ${to}`);
    console.log(`Subject: ${subject}`);

    // In production, integrate with SendGrid, AWS SES, or similar
    // For now, just log and return success
    res.json({
      success: true,
      message: 'Email sent successfully (demo mode)',
      to,
    });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// WhatsApp endpoint
app.post('/api/send-whatsapp', async (req, res) => {
  try {
    const { phone, message } = req.body;

    console.log(`📱 WhatsApp message would be sent to: ${phone}`);
    console.log(`Message: ${message}`);

    // In production, integrate with WhatsApp Business API
    // For now, just log and return success
    res.json({
      success: true,
      message: 'WhatsApp message sent successfully (demo mode)',
      phone,
    });
  } catch (error) {
    console.error('WhatsApp error:', error);
    res.status(500).json({ error: 'Failed to send WhatsApp message' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Gravity backend is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Gravity backend server running on http://localhost:${PORT}`);
  console.log('📧 Email endpoint: POST /api/send-email');
  console.log('📱 WhatsApp endpoint: POST /api/send-whatsapp');
});
