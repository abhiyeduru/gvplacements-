# Complete Backend Deployment Guide

## 🎯 Overview

Your backend (`server.js`) is ready to deploy. Choose your platform and follow the steps.

---

## ⭐ RECOMMENDED: Railway (Easiest)

### Why Railway?
- ✅ Free tier (no credit card)
- ✅ Auto-deploys from GitHub
- ✅ 5-minute setup
- ✅ Great performance
- ✅ Easy environment variables

### Railway Deployment

**Step 1: Prepare GitHub**
```bash
git add .
git commit -m "Add backend and all features"
git push origin main
```

**Step 2: Go to Railway**
- Visit https://railway.app
- Click "New Project"
- Select "Deploy from GitHub"

**Step 3: Connect GitHub**
- Click "Connect GitHub"
- Authorize Railway
- Select your repository
- Click "Deploy"

**Step 4: Wait for Deployment**
- Railway builds and deploys automatically
- Takes 2-3 minutes
- You'll see a green checkmark when done

**Step 5: Get Your URL**
- Go to Railway dashboard
- Click your project
- Look for "Domains" section
- Copy the URL (e.g., `https://gravity-backend-production.railway.app`)

**Step 6: Update Frontend**

Edit `.env.local`:
```env
VITE_API_BASE_URL=https://gravity-backend-production.railway.app
```

**Step 7: Rebuild Frontend**
```bash
npm run build
firebase deploy
```

**Done!** Your backend is live! 🎉

---

## 🔄 Alternative Platforms

### Render (Also Free)

**Steps:**
1. Go to https://render.com
2. Click "New +"
3. Select "Web Service"
4. Connect GitHub
5. Select repository
6. Build command: `npm install`
7. Start command: `node server.js`
8. Deploy
9. Copy URL from dashboard

**Result:** `https://gravity-backend.onrender.com`

### Heroku (Paid)

**Steps:**
1. Install Heroku CLI: `brew install heroku`
2. Login: `heroku login`
3. Create app: `heroku create gravity-backend`
4. Deploy: `git push heroku main`
5. Get URL: `heroku open`

**Result:** `https://gravity-backend.herokuapp.com`

### Vercel (Free)

**Steps:**
1. Go to https://vercel.com
2. Import from GitHub
3. Select repository
4. Deploy
5. Copy URL

**Result:** `https://gravity-backend.vercel.app`

### AWS EC2 (Production)

**Steps:**
1. Launch EC2 instance
2. SSH into instance
3. Install Node.js
4. Clone repository
5. Install dependencies: `npm install`
6. Start server: `node server.js`
7. Use public IP

**Result:** `http://your-ec2-ip:3001`

---

## 📋 Backend Configuration

### Environment Variables

Create `.env` file (for production):

```env
# Server
PORT=3001
NODE_ENV=production

# Email (Optional)
VITE_EMAIL_API_KEY=your_sendgrid_key
VITE_EMAIL_FROM=noreply@gravityplacements.com

# WhatsApp (Optional)
VITE_WHATSAPP_API_KEY=your_whatsapp_key
VITE_WHATSAPP_PHONE_NUMBER=+919876543210

# CORS
CORS_ORIGIN=https://gravityplacements.com
```

### Backend Endpoints

**1. Health Check**
```
GET /health
Response: {"status":"OK","message":"Gravity backend is running"}
```

**2. Send Email**
```
POST /api/send-email
Body: {
  "to": "email@example.com",
  "subject": "Subject",
  "html": "<h1>Content</h1>"
}
Response: {"success":true,"message":"Email sent successfully","to":"email@example.com"}
```

**3. Send WhatsApp**
```
POST /api/send-whatsapp
Body: {
  "phone": "+919876543210",
  "message": "Your message"
}
Response: {"success":true,"message":"WhatsApp message sent successfully","phone":"+919876543210"}
```

---

## 🧪 Testing Your Backend

### Test 1: Health Check
```bash
curl https://your-backend-url.com/health
```

### Test 2: Email
```bash
curl -X POST https://your-backend-url.com/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "test@example.com",
    "subject": "Test",
    "html": "<h1>Test</h1>"
  }'
```

### Test 3: WhatsApp
```bash
curl -X POST https://your-backend-url.com/api/send-whatsapp \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+919876543210",
    "message": "Test"
  }'
```

---

## 🔗 Update Frontend After Deployment

### Step 1: Update .env.local
```env
VITE_API_BASE_URL=https://your-deployed-backend-url.com
```

### Step 2: Rebuild Frontend
```bash
npm run build
```

### Step 3: Deploy Frontend
```bash
firebase deploy
```

---

## 📊 Deployment Comparison

| Platform | Setup | Cost | Performance | Best For |
|----------|-------|------|-------------|----------|
| Railway | 5 min | Free | ⭐⭐⭐⭐⭐ | Quick deploy |
| Render | 5 min | Free | ⭐⭐⭐⭐⭐ | Production |
| Heroku | 10 min | Paid | ⭐⭐⭐⭐ | Reliable |
| Vercel | 5 min | Free | ⭐⭐⭐⭐ | Serverless |
| AWS EC2 | 30 min | Paid | ⭐⭐⭐⭐⭐ | Enterprise |

---

## ✅ Deployment Checklist

### Before Deployment
- [ ] Backend code is ready (`server.js`)
- [ ] Dependencies are listed in `package.json`
- [ ] `.env.local` has all required variables
- [ ] Code is pushed to GitHub

### During Deployment
- [ ] Choose deployment platform
- [ ] Connect GitHub
- [ ] Deploy
- [ ] Wait for build to complete
- [ ] Copy deployment URL

### After Deployment
- [ ] Test health endpoint
- [ ] Update `.env.local` with backend URL
- [ ] Rebuild frontend
- [ ] Deploy frontend
- [ ] Test all endpoints
- [ ] Verify emails/WhatsApp work

---

## 🚨 Troubleshooting

### Issue: "Cannot find module"
**Solution:**
```bash
npm install
```

### Issue: "Port already in use"
**Solution:**
Change PORT in `.env`:
```env
PORT=3002
```

### Issue: "CORS error"
**Solution:**
Update `.env`:
```env
CORS_ORIGIN=https://gravityplacements.com
```

### Issue: "Backend not responding"
**Solution:**
1. Check deployment URL is correct
2. Test health endpoint
3. Check logs in deployment platform
4. Verify environment variables

---

## 📞 Support

- **Railway Support:** https://railway.app/support
- **Render Support:** https://render.com/support
- **Heroku Support:** https://www.heroku.com/support
- **Vercel Support:** https://vercel.com/support

---

## 🎉 Success!

After deployment, you'll have:

**Backend URL:** `https://your-backend-url.com`

**Endpoints:**
- Health: `GET /health`
- Email: `POST /api/send-email`
- WhatsApp: `POST /api/send-whatsapp`

**Frontend:** Updated with backend URL

**Status:** 🟢 Live and Running

---

## 📝 Quick Reference

| Item | Value |
|------|-------|
| Backend File | `server.js` |
| Framework | Express.js |
| Port | 3001 |
| Endpoints | 3 (health, email, whatsapp) |
| Deployment Time | 5-10 minutes |
| Recommended Platform | Railway |

---

**Status**: Ready to deploy
**Difficulty**: Easy ⭐
**Time**: 5-10 minutes
