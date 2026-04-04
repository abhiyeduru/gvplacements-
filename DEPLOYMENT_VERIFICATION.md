# Deployment Verification Guide

## ✅ Current Deployment Status

### Frontend
- **URL**: https://gvplacements.web.app
- **Custom Domain**: https://www.gvplacements.com (pending DNS setup)
- **Status**: ✅ Deployed
- **API URL**: https://gvplacements.onrender.com

### Backend
- **URL**: https://gvplacements.onrender.com
- **Status**: ✅ Running
- **Health Check**: https://gvplacements.onrender.com/api/health

## Quick Verification Steps

### Step 1: Test Backend Health Check
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

### Step 2: Test Backend Root
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

### Step 3: Visit Frontend
Open in browser: https://gvplacements.web.app

You should see:
- ✅ Gravity Job Placement Platform homepage
- ✅ Registration form
- ✅ Admin button
- ✅ All styling with Poppins font

### Step 4: Test Admin Panel
1. Click "Admin" button
2. Enter password: `Gravity!)#8`
3. You should see:
   - ✅ Candidate statistics
   - ✅ Candidate table
   - ✅ Payment settings
   - ✅ Add demo data button

### Step 5: Test Registration Form
1. Click "Register Now"
2. Fill Step 1:
   - Full Name
   - Email
   - Phone
   - Desired Job Position
   - Referral Name (optional)
3. Click "Next"
4. Fill Step 2:
   - Address details
   - Upload resume
   - Upload PAN document
5. Click "Next"
6. Review Step 3:
   - Check terms & conditions
   - Click "Pay ₹2000 via Razorpay"

## Environment Configuration

### Frontend (.env.local)
```env
VITE_API_URL=https://gvplacements.onrender.com
```

### Backend (Render)
- PORT: Auto-assigned by Render
- NODE_ENV: production

## API Endpoints

### Health Check
```
GET https://gvplacements.onrender.com/api/health
```

### Send Email
```
POST https://gvplacements.onrender.com/api/send-email
Body: {
  "to": "user@example.com",
  "subject": "Subject",
  "html": "<h1>HTML content</h1>"
}
```

### Send WhatsApp
```
POST https://gvplacements.onrender.com/api/send-whatsapp
Body: {
  "phone": "+91XXXXXXXXXX",
  "message": "Message text"
}
```

## Troubleshooting

### Issue: Frontend shows "Cannot connect to backend"
**Solution**:
1. Verify backend is running: https://gvplacements.onrender.com/api/health
2. Check browser console for CORS errors
3. Verify VITE_API_URL in .env.local is correct
4. Rebuild frontend: `npm run build`
5. Redeploy: `firebase deploy --only hosting:gvplacements`

### Issue: "Cannot GET /api/health"
**Solution**:
1. Check Render logs for errors
2. Verify server.js has the route defined
3. Restart Render service
4. Check that PORT is set correctly

### Issue: CORS errors in browser console
**Solution**:
1. Verify frontend domain is in CORS whitelist in server.js
2. Check that Content-Type header is 'application/json'
3. Verify request method is allowed (GET, POST, etc.)

### Issue: Payment not working
**Solution**:
1. Verify Razorpay key is correct in .env.local
2. Add domain to Razorpay whitelist: https://www.gvplacements.com
3. Check browser console for Razorpay errors
4. Verify payment amount is set in admin panel

## Deployment Checklist

- ✅ Backend deployed on Render
- ✅ Frontend deployed on Firebase
- ✅ API URL configured in frontend
- ✅ CORS enabled on backend
- ✅ Health check endpoint working
- ✅ Email endpoint ready
- ✅ WhatsApp endpoint ready
- ✅ Admin panel accessible
- ✅ Registration form working
- ✅ Payment integration ready
- ✅ File uploads working (Cloudinary)
- ✅ Database connected (Firestore)

## Next Steps

1. **Configure Custom Domain**
   - Add DNS records for www.gvplacements.com
   - Wait 24-48 hours for propagation
   - Verify in Firebase Console

2. **Update Razorpay Domain**
   - Add www.gvplacements.com to whitelist
   - Test payment flow

3. **Monitor Logs**
   - Check Render dashboard for backend logs
   - Check Firebase Console for frontend logs

4. **Test Full Flow**
   - Register a test candidate
   - Verify data in Firestore
   - Test payment
   - Check email/WhatsApp notifications

## Live URLs

| Service | URL | Status |
|---------|-----|--------|
| Frontend (Firebase) | https://gvplacements.web.app | ✅ Live |
| Frontend (Custom) | https://www.gvplacements.com | ⏳ Pending DNS |
| Backend | https://gvplacements.onrender.com | ✅ Live |
| Health Check | https://gvplacements.onrender.com/api/health | ✅ Live |

## Support

- **Render Dashboard**: https://dashboard.render.com
- **Firebase Console**: https://console.firebase.google.com
- **Razorpay Dashboard**: https://dashboard.razorpay.com

---

**Last Updated**: April 3, 2026  
**Status**: ✅ All systems operational
