// Gravity Job Placement Platform - Backend Server
// Node.js + Express.js
// Run with: node server.js

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
// MIDDLEWARE
// ============================================

// CORS Configuration - Allow frontend requests
const corsOptions = {
  origin: [
    'https://www.gvplacements.com',
    'https://gvplacements.com',
    'https://gvplacements.web.app',
    'http://localhost:5173',
    'http://localhost:3000',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ============================================
// HEALTH CHECK ROUTES
// ============================================

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Backend is running',
    service: 'Gravity Job Placement Platform',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// Health check endpoint (with /api prefix)
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Gravity backend is running',
    timestamp: new Date().toISOString(),
  });
});

// Alternative health check (without /api prefix)
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Gravity backend is running',
    timestamp: new Date().toISOString(),
  });
});

// ============================================
// API ROUTES
// ============================================

// Email endpoint
app.post('/api/send-email', async (req, res) => {
  try {
    const { to, subject, html } = req.body;

    // Validate input
    if (!to || !subject || !html) {
      return res.status(400).json({
        error: 'Missing required fields: to, subject, html',
      });
    }

    console.log(`📧 Email would be sent to: ${to}`);
    console.log(`Subject: ${subject}`);

    // In production, integrate with SendGrid, AWS SES, or similar
    // For now, just log and return success
    res.json({
      success: true,
      message: 'Email sent successfully (demo mode)',
      to,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({
      error: 'Failed to send email',
      message: error.message,
    });
  }
});

// WhatsApp endpoint
app.post('/api/send-whatsapp', async (req, res) => {
  try {
    const { phone, message } = req.body;

    // Validate input
    if (!phone || !message) {
      return res.status(400).json({
        error: 'Missing required fields: phone, message',
      });
    }

    console.log(`📱 WhatsApp message would be sent to: ${phone}`);
    console.log(`Message: ${message}`);

    // In production, integrate with WhatsApp Business API
    // For now, just log and return success
    res.json({
      success: true,
      message: 'WhatsApp message sent successfully (demo mode)',
      phone,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('WhatsApp error:', error);
    res.status(500).json({
      error: 'Failed to send WhatsApp message',
      message: error.message,
    });
  }
});

// ============================================
// ERROR HANDLING MIDDLEWARE
// ============================================

// 404 Not Found handler
app.use((_req, res) => {
  res.status(404).json({
    error: 'Route not found',
    availableRoutes: [
      'GET /',
      'GET /api/health',
      'GET /health',
      'POST /api/send-email',
      'POST /api/send-whatsapp',
    ],
  });
});

// Global error handler
app.use((err, _req, res, _next) => {
  console.error('❌ Server error:', err);
  res.status(err.status || 500).json({
    error: 'Internal server error',
    message: err.message,
    timestamp: new Date().toISOString(),
  });
});

// ============================================
// SERVER STARTUP
// ============================================

app.listen(PORT, () => {
  console.log('\n' + '='.repeat(60));
  console.log('🚀 GRAVITY BACKEND SERVER STARTED');
  console.log('='.repeat(60));
  console.log(`📍 Server running on port: ${PORT}`);
  console.log(`🌐 Base URL: http://localhost:${PORT}`);
  console.log(`⏰ Started at: ${new Date().toISOString()}`);
  console.log('='.repeat(60));
  console.log('\n📋 AVAILABLE ENDPOINTS:\n');
  console.log('✅ GET  /                    - Root endpoint');
  console.log('✅ GET  /api/health          - Health check (with /api prefix)');
  console.log('✅ GET  /health              - Health check (without /api prefix)');
  console.log('📧 POST /api/send-email      - Send email notification');
  console.log('📱 POST /api/send-whatsapp   - Send WhatsApp notification');
  console.log('\n' + '='.repeat(60));
  console.log('🔗 CORS Enabled for:');
  corsOptions.origin.forEach((url) => console.log(`   - ${url}`));
  console.log('='.repeat(60) + '\n');
});
