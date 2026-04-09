# Vercel Environment Variables Setup

The Razorpay payment is now working on Firebase but showing 404 on Vercel because environment variables aren't configured there.

## Quick Fix (5 minutes)

1. Go to: https://vercel.com/dashboard
2. Select your project: `gvplacements`
3. Click **Settings** → **Environment Variables**
4. Add these variables:

```
VITE_RAZORPAY_KEY = rzp_live_SMj9EQLZSXaW4g
VITE_FIREBASE_API_KEY = AIzaSyD461Rr1DxefKVV7lnaWglgH3yFtb9F1sg
VITE_FIREBASE_AUTH_DOMAIN = gravi-multiple.firebaseapp.com
VITE_FIREBASE_PROJECT_ID = gravi-multiple
VITE_FIREBASE_STORAGE_BUCKET = gravi-multiple.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID = 1041107905972
VITE_FIREBASE_APP_ID = 1:1041107905972:web:f60b32fbd81676554bd6e1
VITE_FIREBASE_MEASUREMENT_ID = G-XWN6VCP381
VITE_CLOUDINARY_CLOUD_NAME = dp8bfdbab
VITE_CLOUDINARY_UPLOAD_PRESET = cryptchat
VITE_CLOUDINARY_API_KEY = 337739287121541
VITE_API_URL = https://gvplacements.onrender.com
```

5. Click **Save**
6. Go to **Deployments** and click **Redeploy** on the latest deployment
7. Wait for build to complete (2-3 minutes)
8. Test at: https://gvplacements.com/razorpay-test

## What Changed

- ✅ Firebase: Working (environment variables embedded in build)
- ⏳ Vercel: Needs environment variables configured in dashboard
- ✅ Razorpay key: `rzp_live_SMj9EQLZSXaW4g` (live key)

## Troubleshooting

If payment still shows "No key passed":
1. Clear browser cache (Ctrl+Shift+Delete)
2. Hard refresh (Ctrl+F5)
3. Check Vercel deployment logs for build errors
4. Verify all env vars are set to "Production" environment

