# Backend Deployment Guide

## 📍 Current Backend Setup

### Local Development
- **URL**: `http://localhost:3001`
- **Status**: Running locally for development
- **Endpoints**:
  - `POST /api/send-email` - Send email notifications
  - `POST /api/send-whatsapp` - Send WhatsApp messages
  - `GET /health` - Health check

## 🚀 Deployment Options

### Option 1: Heroku (Recommended for Quick Deployment)

**Steps:**
1. Create Heroku account at https://www.heroku.com
2. Install Heroku CLI
3. Login: `heroku login`
4. Create app: `heroku create gravity-job-backend`
5. Deploy: `git push heroku main`
6. Get URL: `heroku open`

**Result**: `https://gravity-job-backend.herokuapp.com`

### Option 2: Railway (Modern Alternative)

**Steps:**
1. Go to https://railway.app
2. Connect GitHub repository
3. Deploy automatically
4. Get deployment URL from dashboard

**Result**: `https://your-project.railway.app`

### Option 3: Render (Free Tier Available)

**Steps:**
1. Go to https://render.com
2. Create new Web Service
3. Connect GitHub
4. Deploy
5. Get URL from dashboard

**Result**: `https://gravity-backend.onrender.com`

### Option 4: AWS EC2 (Production Grade)

**Steps:**
1. Launch EC2 instance
2. Install Node.js
3. Clone repository
4. Install dependencies: `npm install`
5. Start server: `npm start`
6. Use PM2 for process management
7. Configure domain/SSL

**Result**: `https://api.gravityplacements.com`

### Option 5: Google Cloud Run (Serverless)

**Steps:**
1. Create Google Cloud project
2. Enable Cloud Run API
3. Deploy: `gcloud run deploy gravity-backend --source .`
4. Get URL from Cloud Run console

**Result**: `https://gravity-backend-xxxxx.run.app`

## 📋 Backend Configuration for Production

### Update .env.local for Production

```env
# Backend API (Update after deployment)
VITE_API_BASE_URL=https://your-deployed-backend-url.com

# Email Service (Configure one)
VITE_EMAIL_API_KEY=your_sendgrid_api_key
VITE_EMAIL_FROM=noreply@gravityplacements.com

# WhatsApp Business API (Configure)
VITE_WHATSAPP_API_KEY=your_whatsapp_api_key
VITE_WHATSAPP_PHONE_NUMBER=your_business_phone
VITE_WHATSAPP_BUSINESS_ACCOUNT_ID=your_account_id
```

## 🔧 Backend Endpoints

### 1. Send Email
**Endpoint**: `POST /api/send-email`

**Request**:
```json
{
  "to": "candidate@email.com",
  "subject": "Registration Confirmation",
  "html": "<h1>Welcome!</h1>"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Email sent successfully",
  "to": "candidate@email.com"
}
```

### 2. Send WhatsApp
**Endpoint**: `POST /api/send-whatsapp`

**Request**:
```json
{
  "phone": "+919876543210",
  "message": "Your registration is confirmed!"
}
```

**Response**:
```json
{
  "success": true,
  "message": "WhatsApp message sent successfully",
  "phone": "+919876543210"
}
```

### 3. Health Check
**Endpoint**: `GET /health`

**Response**:
```json
{
  "status": "OK",
  "message": "Gravity backend is running"
}
```

## 📦 Backend Dependencies

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3"
  }
}
```

## 🚀 Quick Deployment Steps

### For Heroku:
```bash
# 1. Install Heroku CLI
# 2. Login
heroku login

# 3. Create app
heroku create gravity-job-backend

# 4. Set environment variables
heroku config:set VITE_EMAIL_API_KEY=your_key
heroku config:set VITE_WHATSAPP_API_KEY=your_key

# 5. Deploy
git push heroku main

# 6. View logs
heroku logs --tail

# 7. Get URL
heroku open
```

### For Railway:
```bash
# 1. Go to railway.app
# 2. Create new project
# 3. Connect GitHub
# 4. Deploy automatically
# 5. Copy deployment URL
```

## 🔐 Environment Variables for Production

**Required**:
- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Set to "production"

**Optional**:
- `VITE_EMAIL_API_KEY` - SendGrid or similar
- `VITE_WHATSAPP_API_KEY` - WhatsApp Business API
- `CORS_ORIGIN` - Frontend URL for CORS

## 📊 Recommended Deployment

**For Production**: Use **Railway** or **Render**
- Easy setup
- Free tier available
- Auto-deploys from GitHub
- Good performance
- Easy environment variables

**Example URLs**:
- Railway: `https://gravity-backend-production.railway.app`
- Render: `https://gravity-backend.onrender.com`
- Heroku: `https://gravity-job-backend.herokuapp.com`

## 🔄 Update Frontend After Deployment

Once backend is deployed, update `.env.local`:

```env
# Change from local
VITE_API_BASE_URL=http://localhost:3001

# To production
VITE_API_BASE_URL=https://your-deployed-backend-url.com
```

Then rebuild and redeploy frontend:
```bash
npm run build
firebase deploy
```

## ✅ Testing Backend

### Test Health Check
```bash
curl https://your-backend-url.com/health
```

### Test Email Endpoint
```bash
curl -X POST https://your-backend-url.com/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "test@example.com",
    "subject": "Test",
    "html": "<h1>Test</h1>"
  }'
```

### Test WhatsApp Endpoint
```bash
curl -X POST https://your-backend-url.com/api/send-whatsapp \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+919876543210",
    "message": "Test message"
  }'
```

## 📝 Current Status

- **Frontend**: Deployed at `https://gravi-multiple.web.app`
- **Backend**: Running locally at `http://localhost:3001`
- **Database**: Firebase Firestore (gravi-multiple)
- **Storage**: Cloudinary (dp8bfdbab)
- **Payments**: Razorpay (rzp_live_SMj9EQLZSXaW4g)

## 🎯 Next Steps

1. **Choose deployment platform** (Railway recommended)
2. **Deploy backend** to chosen platform
3. **Get deployment URL**
4. **Update .env.local** with new backend URL
5. **Rebuild frontend** with new URL
6. **Redeploy frontend** to Firebase
7. **Test all endpoints** from production

## 📞 Support

- **Heroku**: https://www.heroku.com/support
- **Railway**: https://railway.app/support
- **Render**: https://render.com/support
- **Google Cloud**: https://cloud.google.com/support

---

**Status**: Ready for deployment

**Recommended**: Railway or Render for easiest setup
