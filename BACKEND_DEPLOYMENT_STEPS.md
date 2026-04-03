# Backend Deployment - Step by Step Guide

## 🚀 Quick Deploy (5 minutes with Railway)

### Step 1: Prepare Your Backend

Your backend is ready at `server.js`. It includes:
- Email endpoint: `POST /api/send-email`
- WhatsApp endpoint: `POST /api/send-whatsapp`
- Health check: `GET /health`

### Step 2: Deploy to Railway (Easiest)

**Option A: Using GitHub (Recommended)**

1. **Push code to GitHub first:**
   ```bash
   git add .
   git commit -m "Add backend server and all features"
   git push origin main
   ```

2. **Go to Railway:**
   - Visit https://railway.app
   - Click "New Project"
   - Select "Deploy from GitHub"
   - Connect your GitHub account
   - Select your repository
   - Railway auto-deploys

3. **Get Your URL:**
   - Go to Railway dashboard
   - Click your project
   - Copy the deployment URL (e.g., `https://gravity-backend-production.railway.app`)

**Option B: Using Railway CLI**

1. **Install Railway CLI:**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway:**
   ```bash
   railway login
   ```

3. **Initialize and Deploy:**
   ```bash
   railway init
   railway up
   ```

4. **Get URL:**
   ```bash
   railway open
   ```

### Step 3: Update Frontend with Backend URL

1. **Update .env.local:**
   ```env
   VITE_API_BASE_URL=https://your-railway-url.railway.app
   ```

2. **Rebuild Frontend:**
   ```bash
   npm run build
   ```

3. **Deploy Frontend:**
   ```bash
   firebase deploy
   ```

---

## 📋 Alternative Deployment Options

### Option 1: Render (Free Tier)

**Steps:**
1. Go to https://render.com
2. Click "New +"
3. Select "Web Service"
4. Connect GitHub
5. Select repository
6. Set build command: `npm install`
7. Set start command: `node server.js`
8. Deploy
9. Copy URL from dashboard

**Result:** `https://gravity-backend.onrender.com`

### Option 2: Heroku (Paid)

**Steps:**
1. Install Heroku CLI: `brew install heroku`
2. Login: `heroku login`
3. Create app: `heroku create gravity-backend`
4. Deploy: `git push heroku main`
5. Get URL: `heroku open`

**Result:** `https://gravity-backend.herokuapp.com`

### Option 3: Vercel (Free)

**Steps:**
1. Go to https://vercel.com
2. Import project from GitHub
3. Set root directory: `.` (current)
4. Add environment variables
5. Deploy
6. Copy URL

**Result:** `https://gravity-backend.vercel.app`

### Option 4: AWS EC2 (Production)

**Steps:**
1. Launch EC2 instance (Ubuntu)
2. SSH into instance
3. Install Node.js: `sudo apt install nodejs npm`
4. Clone repo: `git clone your-repo`
5. Install dependencies: `npm install`
6. Install PM2: `npm install -g pm2`
7. Start server: `pm2 start server.js`
8. Get public IP from AWS console

**Result:** `http://your-ec2-public-ip:3001`

---

## 🔧 Environment Variables for Production

Create `.env` file in root (not `.env.local`):

```env
# Server
PORT=3001
NODE_ENV=production

# Email Service (Optional)
VITE_EMAIL_API_KEY=your_sendgrid_key
VITE_EMAIL_FROM=noreply@gravityplacements.com

# WhatsApp (Optional)
VITE_WHATSAPP_API_KEY=your_whatsapp_key
VITE_WHATSAPP_PHONE_NUMBER=+919876543210
VITE_WHATSAPP_BUSINESS_ACCOUNT_ID=your_account_id

# CORS
CORS_ORIGIN=https://gravityplacements.com
```

---

## 📊 Deployment Comparison

| Platform | Setup Time | Cost | Ease | Best For |
|----------|-----------|------|------|----------|
| Railway | 5 min | Free tier | ⭐⭐⭐⭐⭐ | Quick deploy |
| Render | 5 min | Free tier | ⭐⭐⭐⭐⭐ | Production |
| Heroku | 10 min | Paid | ⭐⭐⭐⭐ | Reliable |
| Vercel | 5 min | Free tier | ⭐⭐⭐⭐ | Serverless |
| AWS EC2 | 30 min | Paid | ⭐⭐⭐ | Enterprise |

---

## ✅ Testing Your Deployed Backend

### Test 1: Health Check
```bash
curl https://your-backend-url.com/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Gravity backend is running"
}
```

### Test 2: Email Endpoint
```bash
curl -X POST https://your-backend-url.com/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "test@example.com",
    "subject": "Test Email",
    "html": "<h1>Test</h1>"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "Email sent successfully (demo mode)",
  "to": "test@example.com"
}
```

### Test 3: WhatsApp Endpoint
```bash
curl -X POST https://your-backend-url.com/api/send-whatsapp \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+919876543210",
    "message": "Test message"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "WhatsApp message sent successfully (demo mode)",
  "phone": "+919876543210"
}
```

---

## 🔄 Complete Deployment Flow

```
1. Prepare Backend (server.js ready)
   ↓
2. Push to GitHub
   ↓
3. Deploy to Railway/Render
   ↓
4. Get Deployment URL
   ↓
5. Update .env.local with backend URL
   ↓
6. Rebuild Frontend (npm run build)
   ↓
7. Deploy Frontend (firebase deploy)
   ↓
8. Test All Endpoints
   ↓
9. Done! 🎉
```

---

## 📝 Backend Files

**Main file:** `server.js`

**Dependencies:**
- express
- cors
- dotenv

**Endpoints:**
- `POST /api/send-email` - Send emails
- `POST /api/send-whatsapp` - Send WhatsApp messages
- `GET /health` - Health check

---

## 🎯 Recommended: Railway Deployment

### Why Railway?
- ✅ Free tier available
- ✅ Auto-deploys from GitHub
- ✅ Easy environment variables
- ✅ Good performance
- ✅ 5-minute setup

### Railway Deployment Steps:

1. **Go to https://railway.app**

2. **Click "New Project"**

3. **Select "Deploy from GitHub"**

4. **Connect GitHub account**

5. **Select your repository**

6. **Railway auto-deploys**

7. **Copy deployment URL**

8. **Update .env.local:**
   ```env
   VITE_API_BASE_URL=https://your-railway-url.railway.app
   ```

9. **Rebuild and deploy frontend:**
   ```bash
   npm run build
   firebase deploy
   ```

---

## 🚨 Common Issues & Solutions

### Issue: "Cannot find module 'express'"
**Solution:**
```bash
npm install
```

### Issue: "Port already in use"
**Solution:**
```bash
# Change PORT in .env
PORT=3002
```

### Issue: "CORS error"
**Solution:**
Update `.env`:
```env
CORS_ORIGIN=https://gravityplacements.com
```

### Issue: "Backend URL not working"
**Solution:**
1. Check deployment URL is correct
2. Test health endpoint: `curl https://url/health`
3. Check environment variables
4. Check logs in deployment platform

---

## 📞 Support Links

- **Railway:** https://railway.app/support
- **Render:** https://render.com/support
- **Heroku:** https://www.heroku.com/support
- **Vercel:** https://vercel.com/support

---

## 🎉 After Deployment

Your backend will be live at:
- **Railway:** `https://your-project.railway.app`
- **Render:** `https://your-project.onrender.com`
- **Heroku:** `https://your-app.herokuapp.com`

Update frontend and you're done!

---

**Status**: Ready to deploy
**Recommended**: Railway (easiest & fastest)
**Time**: 5-10 minutes total
