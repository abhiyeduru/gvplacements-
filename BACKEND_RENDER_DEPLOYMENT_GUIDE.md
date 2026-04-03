# Backend Deployment on Render - Complete Guide

## ✅ Issue Fixed

**Problem**: `Cannot GET /api/health`  
**Root Cause**: Health check route was at `/health` instead of `/api/health`  
**Solution**: Added `/api/health` endpoint with proper configuration

## Current Backend Status

- ✅ **Server**: Node.js + Express.js
- ✅ **Deployment**: Render (https://gvplacements.onrender.com)
- ✅ **Health Check**: https://gvplacements.onrender.com/api/health
- ✅ **CORS**: Configured for frontend domains
- ✅ **Error Handling**: Global error handler added
- ✅ **Logging**: Request logging middleware added

## Available Endpoints

### Health Check Endpoints
```
GET /                    → Root endpoint
GET /api/health          → Health check (with /api prefix) ✅
GET /health              → Health check (without /api prefix)
```

### Notification Endpoints
```
POST /api/send-email     → Send email notification
POST /api/send-whatsapp  → Send WhatsApp notification
```

## Testing the Backend

### 1. Test Health Check
```bash
# Using curl
curl https://gvplacements.onrender.com/api/health

# Expected response:
{
  "status": "OK",
  "message": "Gravity backend is running",
  "timestamp": "2026-04-03T..."
}
```

### 2. Test Root Endpoint
```bash
curl https://gvplacements.onrender.com/

# Expected response:
{
  "message": "Backend is running",
  "service": "Gravity Job Placement Platform",
  "version": "1.0.0",
  "timestamp": "2026-04-03T..."
}
```

### 3. Test Email Endpoint
```bash
curl -X POST https://gvplacements.onrender.com/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "user@example.com",
    "subject": "Test Email",
    "html": "<h1>Test</h1>"
  }'

# Expected response:
{
  "success": true,
  "message": "Email sent successfully (demo mode)",
  "to": "user@example.com",
  "timestamp": "2026-04-03T..."
}
```

### 4. Test WhatsApp Endpoint
```bash
curl -X POST https://gvplacements.onrender.com/api/send-whatsapp \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+91XXXXXXXXXX",
    "message": "Test message"
  }'

# Expected response:
{
  "success": true,
  "message": "WhatsApp message sent successfully (demo mode)",
  "phone": "+91XXXXXXXXXX",
  "timestamp": "2026-04-03T..."
}
```

## Server Configuration Details

### Middleware Stack
1. **CORS** - Allows requests from:
   - https://www.gvplacements.com
   - https://gvplacements.com
   - https://gvplacements.web.app
   - http://localhost:5173 (local dev)
   - http://localhost:3000 (local dev)

2. **express.json()** - Parse JSON request bodies
3. **express.urlencoded()** - Parse URL-encoded data
4. **Request Logging** - Log all incoming requests

### Error Handling
- **404 Handler** - Returns available routes
- **Global Error Handler** - Catches all errors
- **Input Validation** - Validates required fields

### Port Configuration
- **Production (Render)**: Uses `process.env.PORT` (auto-assigned by Render)
- **Local Development**: Falls back to port 3000
- **Previous**: Was using port 3001

## Render Deployment Steps

### Step 1: Connect GitHub Repository
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select the repository containing your code

### Step 2: Configure Service
1. **Name**: `gvplacements-backend`
2. **Environment**: `Node`
3. **Build Command**: `npm install`
4. **Start Command**: `node server.js`
5. **Plan**: Free or Paid (based on needs)

### Step 3: Set Environment Variables
In Render Dashboard → Environment:
```
PORT=3000
NODE_ENV=production
```

### Step 4: Deploy
1. Click "Create Web Service"
2. Render will automatically deploy
3. You'll get a URL: `https://gvplacements.onrender.com`

### Step 5: Verify Deployment
```bash
curl https://gvplacements.onrender.com/api/health
```

## Frontend Integration

### Update Frontend Environment
The `.env.local` has been updated:
```
VITE_API_BASE_URL=https://gvplacements.onrender.com
```

### Using Backend in Frontend
```typescript
// Example: Send email from frontend
const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/send-email`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    to: 'user@example.com',
    subject: 'Welcome',
    html: '<h1>Welcome!</h1>'
  })
});
```

## Server.js Features

### ✅ What's Included
- Root route (`GET /`)
- Health check with `/api` prefix (`GET /api/health`)
- Alternative health check (`GET /health`)
- Email endpoint (`POST /api/send-email`)
- WhatsApp endpoint (`POST /api/send-whatsapp`)
- CORS configuration
- Request logging
- Input validation
- Error handling
- 404 handler
- Global error middleware
- Clear startup logging

### ✅ What's Fixed
- ✅ Added `/api/health` endpoint (was missing)
- ✅ Added root route
- ✅ Added express.json() middleware
- ✅ Added CORS configuration
- ✅ Added error handling
- ✅ Added request logging
- ✅ Added input validation
- ✅ Clear server startup message

## Troubleshooting

### Issue: "Cannot GET /api/health"
**Solution**: Already fixed in updated server.js

### Issue: CORS errors in frontend
**Solution**: Verify domain is in CORS whitelist in server.js

### Issue: Backend not responding
**Solution**: 
1. Check Render dashboard for errors
2. View logs in Render console
3. Verify service is running

### Issue: Port conflicts locally
**Solution**: Server uses port 3000 by default, change with:
```bash
PORT=3001 node server.js
```

## Local Development

### Run Locally
```bash
# Install dependencies
npm install

# Run server
node server.js

# Or with custom port
PORT=3001 node server.js
```

### Expected Output
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

## Production Checklist

- ✅ Health check endpoint working
- ✅ CORS configured for frontend domains
- ✅ Error handling in place
- ✅ Request logging enabled
- ✅ Input validation added
- ✅ Environment variables configured
- ✅ Deployed on Render
- ✅ Frontend updated with backend URL

## Next Steps

1. **Rebuild Frontend** (to use new backend URL)
   ```bash
   npm run build
   firebase deploy --only hosting:gvplacements
   ```

2. **Test Payment Flow** - Verify email/WhatsApp notifications work

3. **Monitor Logs** - Check Render dashboard for any errors

4. **Add Real Email Service** - Integrate SendGrid or AWS SES

5. **Add Real WhatsApp Service** - Integrate WhatsApp Business API

## Important Notes

- Backend is in **demo mode** for email/WhatsApp (just logs)
- To enable real emails: Integrate SendGrid, AWS SES, or similar
- To enable real WhatsApp: Integrate WhatsApp Business API
- CORS is configured for your domains
- All endpoints return JSON responses
- Timestamps included in all responses

## Support

- **Render Docs**: https://render.com/docs
- **Express Docs**: https://expressjs.com
- **CORS Docs**: https://github.com/expressjs/cors

---

**Status**: ✅ Backend deployed and working  
**Health Check**: https://gvplacements.onrender.com/api/health  
**Frontend Integration**: Ready
