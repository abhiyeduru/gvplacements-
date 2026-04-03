# Backend Deployment - Quick Reference

## 🎯 Current Status

| Component | URL | Status |
|-----------|-----|--------|
| Frontend | https://gravi-multiple.web.app | ✅ Live |
| Backend | http://localhost:3001 | 🔄 Local |
| Database | Firebase Firestore | ✅ Live |
| Storage | Cloudinary | ✅ Live |
| Payments | Razorpay | ✅ Live |

## 🚀 Backend Deployment Options

### Option 1: Railway (⭐ Recommended)
- **Setup Time**: 5 minutes
- **Cost**: Free tier available
- **URL Format**: `https://your-project.railway.app`
- **Steps**:
  1. Go to https://railway.app
  2. Connect GitHub
  3. Deploy
  4. Copy URL

### Option 2: Render
- **Setup Time**: 5 minutes
- **Cost**: Free tier available
- **URL Format**: `https://your-project.onrender.com`
- **Steps**:
  1. Go to https://render.com
  2. Create Web Service
  3. Connect GitHub
  4. Deploy

### Option 3: Heroku
- **Setup Time**: 10 minutes
- **Cost**: Paid (free tier removed)
- **URL Format**: `https://your-app.herokuapp.com`
- **Steps**:
  1. Install Heroku CLI
  2. `heroku login`
  3. `heroku create your-app`
  4. `git push heroku main`

### Option 4: AWS EC2
- **Setup Time**: 30 minutes
- **Cost**: Paid
- **URL Format**: `https://api.gravityplacements.com`
- **Best For**: Production

## 📋 Backend Endpoints

```
POST /api/send-email
POST /api/send-whatsapp
GET /health
```

## 🔧 After Deployment

1. **Get Backend URL** from deployment platform
2. **Update .env.local**:
   ```env
   VITE_API_BASE_URL=https://your-backend-url.com
   ```
3. **Rebuild Frontend**:
   ```bash
   npm run build
   firebase deploy
   ```

## 📊 Example Deployment URLs

| Platform | Example URL |
|----------|-------------|
| Railway | https://gravity-backend-production.railway.app |
| Render | https://gravity-backend.onrender.com |
| Heroku | https://gravity-job-backend.herokuapp.com |
| AWS | https://api.gravityplacements.com |

## ✅ Testing

```bash
# Test health check
curl https://your-backend-url.com/health

# Test email endpoint
curl -X POST https://your-backend-url.com/api/send-email \
  -H "Content-Type: application/json" \
  -d '{"to":"test@example.com","subject":"Test","html":"<h1>Test</h1>"}'
```

## 🎯 Recommended Flow

1. **Deploy Backend** → Get URL
2. **Update Frontend** → Add backend URL
3. **Rebuild Frontend** → npm run build
4. **Deploy Frontend** → firebase deploy
5. **Test Everything** → Verify all endpoints

---

**Status**: Ready to deploy
**Recommended**: Railway (easiest setup)
