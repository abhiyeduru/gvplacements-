# Backend & Frontend Integration Guide

## ✅ Current Setup

### Backend (Render)
- **URL**: https://gvplacements.onrender.com
- **Health Check**: https://gvplacements.onrender.com/api/health
- **Status**: ✅ Running

### Frontend (Firebase)
- **URL**: https://www.gvplacements.com
- **Build Tool**: Vite
- **Status**: ✅ Deployed

## Environment Configuration

### Frontend .env.local
```env
VITE_API_URL=https://gvplacements.onrender.com
```

### Backend server.js
```javascript
const PORT = process.env.PORT || 3000;
```

## Backend Endpoints

### Health Check
```
GET /api/health
Response: { "status": "OK", "message": "Gravity backend is running" }
```

### Root
```
GET /
Response: { "message": "Backend is running", "service": "Gravity Job Placement Platform" }
```

### Send Email
```
POST /api/send-email
Body: { "to": "user@example.com", "subject": "...", "html": "..." }
Response: { "success": true, "message": "Email sent successfully (demo mode)" }
```

### Send WhatsApp
```
POST /api/send-whatsapp
Body: { "phone": "+91XXXXXXXXXX", "message": "..." }
Response: { "success": true, "message": "WhatsApp message sent successfully (demo mode)" }
```

## Frontend Integration

### Option 1: Using API Client (Recommended)

Create `src/services/apiClient.ts`:
```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const apiClient = {
  async healthCheck() {
    const response = await fetch(`${API_URL}/api/health`);
    return await response.json();
  },

  async sendEmail(to: string, subject: string, html: string) {
    const response = await fetch(`${API_URL}/api/send-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to, subject, html }),
    });
    return await response.json();
  },

  async sendWhatsApp(phone: string, message: string) {
    const response = await fetch(`${API_URL}/api/send-whatsapp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, message }),
    });
    return await response.json();
  },
};
```

### Option 2: Direct Fetch Calls

```typescript
// Health check
const response = await fetch(`${import.meta.env.VITE_API_URL}/api/health`);
const data = await response.json();
console.log(data); // { status: "OK", ... }

// Send email
const emailResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/send-email`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    to: 'user@example.com',
    subject: 'Welcome',
    html: '<h1>Welcome!</h1>'
  })
});
const emailData = await emailResponse.json();
console.log(emailData); // { success: true, ... }
```

## Testing Backend

### Test 1: Health Check
```bash
curl https://gvplacements.onrender.com/api/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Gravity backend is running",
  "timestamp": "2026-04-03T..."
}
```

### Test 2: Root Endpoint
```bash
curl https://gvplacements.onrender.com/
```

Expected response:
```json
{
  "message": "Backend is running",
  "service": "Gravity Job Placement Platform",
  "version": "1.0.0",
  "timestamp": "2026-04-03T..."
}
```

### Test 3: Send Email
```bash
curl -X POST https://gvplacements.onrender.com/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "test@example.com",
    "subject": "Test",
    "html": "<h1>Test</h1>"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "Email sent successfully (demo mode)",
  "to": "test@example.com",
  "timestamp": "2026-04-03T..."
}
```

## Frontend Component Example

### Using API Client in React Component

```typescript
import { useEffect, useState } from 'react';
import apiClient from '../services/apiClient';

export function BackendTest() {
  const [status, setStatus] = useState<string>('Loading...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const data = await apiClient.healthCheck();
        setStatus(`✅ Backend OK: ${data.status}`);
      } catch (err) {
        setError(`❌ Backend Error: ${err.message}`);
      }
    };

    checkBackend();
  }, []);

  return (
    <div>
      <h2>Backend Status</h2>
      {error ? <p style={{ color: 'red' }}>{error}</p> : <p>{status}</p>}
    </div>
  );
}
```

### Using API Client in Success Screen

```typescript
import { useEffect } from 'react';
import apiClient from '../services/apiClient';

export function SuccessScreen() {
  useEffect(() => {
    const sendNotifications = async () => {
      try {
        // Send email
        await apiClient.sendEmail(
          'user@example.com',
          'Registration Successful',
          '<h1>Welcome to Gravity!</h1>'
        );

        // Send WhatsApp
        await apiClient.sendWhatsApp(
          '+91XXXXXXXXXX',
          'Your registration is complete!'
        );
      } catch (error) {
        console.error('Failed to send notifications:', error);
      }
    };

    sendNotifications();
  }, []);

  return <div>Registration successful!</div>;
}
```

## CORS Configuration

Backend CORS is configured to allow:
- https://www.gvplacements.com
- https://gvplacements.com
- https://gvplacements.web.app
- http://localhost:5173 (local dev)
- http://localhost:3000 (local dev)

If you get CORS errors:
1. Check that your frontend domain is in the CORS whitelist
2. Verify the request method is allowed (GET, POST, etc.)
3. Check that Content-Type header is set correctly

## Troubleshooting

### Issue: "Cannot GET /api/health"
**Solution**: 
- Verify backend is running on Render
- Check that the route exists in server.js
- Ensure PORT is set correctly

### Issue: CORS Error in Frontend
**Solution**:
- Add your domain to CORS whitelist in server.js
- Verify Content-Type header is 'application/json'
- Check browser console for exact error

### Issue: 404 Not Found
**Solution**:
- Verify the endpoint path is correct
- Check that the route is defined in server.js
- Ensure no typos in the URL

### Issue: Backend not responding
**Solution**:
- Check Render dashboard for errors
- View logs in Render console
- Verify service is running
- Check network connectivity

## Local Development

### Run Backend Locally
```bash
node server.js
```

Expected output:
```
============================================================
🚀 GRAVITY BACKEND SERVER STARTED
============================================================
📍 Server running on port: 3000
🌐 Base URL: http://localhost:3000
⏰ Started at: 2026-04-03T...
============================================================

📋 AVAILABLE ENDPOINTS:

✅ GET  /                    - Root endpoint
✅ GET  /api/health          - Health check (with /api prefix)
✅ GET  /health              - Health check (without /api prefix)
📧 POST /api/send-email      - Send email notification
📱 POST /api/send-whatsapp   - Send WhatsApp notification

============================================================
🔗 CORS Enabled for:
   - https://www.gvplacements.com
   - https://gvplacements.com
   - https://gvplacements.web.app
   - http://localhost:5173
   - http://localhost:3000
============================================================
```

### Run Frontend Locally
```bash
npm run dev
```

Frontend will be at: http://localhost:5173

### Test Locally
```bash
# Terminal 1: Run backend
node server.js

# Terminal 2: Run frontend
npm run dev

# Terminal 3: Test health check
curl http://localhost:3000/api/health
```

## Production Deployment

### Backend on Render
1. Connect GitHub repository
2. Set build command: `npm install`
3. Set start command: `node server.js`
4. Deploy

### Frontend on Firebase
1. Build: `npm run build`
2. Deploy: `firebase deploy --only hosting:gvplacements`

## Environment Variables

### Frontend (.env.local)
```env
VITE_API_URL=https://gvplacements.onrender.com
```

### Backend (Render)
```env
PORT=3000
NODE_ENV=production
```

## API Response Format

All endpoints return JSON with consistent format:

### Success Response
```json
{
  "status": "OK",
  "message": "...",
  "timestamp": "2026-04-03T..."
}
```

### Error Response
```json
{
  "error": "Error message",
  "message": "Detailed error",
  "timestamp": "2026-04-03T..."
}
```

## Next Steps

1. ✅ Backend deployed on Render
2. ✅ Frontend deployed on Firebase
3. ✅ CORS configured
4. ✅ API client created
5. ⏳ Test health check endpoint
6. ⏳ Integrate email notifications
7. ⏳ Integrate WhatsApp notifications
8. ⏳ Monitor logs in Render dashboard

## Support

- **Render Docs**: https://render.com/docs
- **Express Docs**: https://expressjs.com
- **Vite Docs**: https://vitejs.dev
- **Firebase Docs**: https://firebase.google.com/docs

---

**Status**: ✅ Backend & Frontend Connected  
**Backend URL**: https://gvplacements.onrender.com  
**Frontend URL**: https://www.gvplacements.com  
**Health Check**: https://gvplacements.onrender.com/api/health
