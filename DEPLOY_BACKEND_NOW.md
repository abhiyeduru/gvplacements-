# Deploy Backend NOW - 5 Minute Guide

## 🚀 Fastest Way: Railway

### Step 1: Go to Railway
```
https://railway.app
```

### Step 2: Click "New Project"
- Select "Deploy from GitHub"
- Connect your GitHub account
- Select your repository
- Click "Deploy"

### Step 3: Wait for Deployment
- Railway auto-deploys
- Takes 2-3 minutes
- You'll see a green checkmark

### Step 4: Copy Your URL
- Go to Railway dashboard
- Click your project
- Copy the URL (looks like: `https://gravity-backend-production.railway.app`)

### Step 5: Update Frontend

**Edit `.env.local`:**
```env
VITE_API_BASE_URL=https://your-railway-url.railway.app
```

**Rebuild:**
```bash
npm run build
firebase deploy
```

### Done! ✅

---

## 📊 What You Get

| Item | Value |
|------|-------|
| Backend URL | `https://your-project.railway.app` |
| Email Endpoint | `POST /api/send-email` |
| WhatsApp Endpoint | `POST /api/send-whatsapp` |
| Health Check | `GET /health` |
| Status | 🟢 Live |

---

## 🧪 Test Your Backend

```bash
# Test health check
curl https://your-backend-url.railway.app/health

# Should return:
# {"status":"OK","message":"Gravity backend is running"}
```

---

## 📋 Checklist

- [ ] Go to railway.app
- [ ] Click "New Project"
- [ ] Select "Deploy from GitHub"
- [ ] Connect GitHub
- [ ] Select repository
- [ ] Wait for deployment
- [ ] Copy deployment URL
- [ ] Update .env.local
- [ ] Run: npm run build
- [ ] Run: firebase deploy
- [ ] Test backend URL
- [ ] Done! 🎉

---

## 💡 Pro Tips

1. **Railway is free** - No credit card needed for free tier
2. **Auto-deploys** - Every GitHub push auto-deploys
3. **Easy env vars** - Set environment variables in Railway dashboard
4. **Good performance** - Fast response times
5. **Easy to scale** - Upgrade anytime

---

## 🎯 Your Backend URLs

After deployment, you'll have:

**Development:**
- Local: `http://localhost:3001`

**Production:**
- Railway: `https://gravity-backend-production.railway.app`
- Render: `https://gravity-backend.onrender.com`
- Heroku: `https://gravity-backend.herokuapp.com`

---

## ⏱️ Timeline

| Step | Time |
|------|------|
| Go to Railway | 1 min |
| Connect GitHub | 1 min |
| Deploy | 2-3 min |
| Copy URL | 1 min |
| Update Frontend | 1 min |
| Rebuild | 2 min |
| Deploy Frontend | 2 min |
| **Total** | **~10 min** |

---

## 🚀 Start Now!

1. Open https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub"
4. Follow the steps
5. Copy your URL
6. Update .env.local
7. Deploy frontend
8. Done! 🎉

---

**Status**: Ready to deploy
**Time**: 5-10 minutes
**Difficulty**: Easy ⭐
