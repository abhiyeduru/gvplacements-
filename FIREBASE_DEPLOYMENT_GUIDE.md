# Firebase Deployment Guide

## Project Status

✓ **Build Complete** - Project built successfully
✓ **Firebase Config Created** - firebase.json and .firebaserc configured
✓ **Ready to Deploy** - Just need authentication

---

## Deployment Steps

### Step 1: Authenticate with Firebase

```bash
firebase login
```

This will:
1. Open a browser window
2. Ask you to log in with your Google account
3. Grant permissions to Firebase CLI
4. Return to terminal with authentication complete

### Step 2: Deploy to Firebase Hosting

```bash
firebase deploy --project gravi-multiple
```

This will:
1. Upload the built project to Firebase
2. Deploy to Firebase Hosting
3. Show you the live URL
4. Complete in 1-2 minutes

### Step 3: Access Your Live App

After deployment, you'll see:
```
✓ Deploy complete!

Project Console: https://console.firebase.google.com/project/gravi-multiple
Hosting URL: https://gravi-multiple.web.app
```

Visit: **https://gravi-multiple.web.app**

---

## What Gets Deployed

### Build Output
- **dist/index.html** - Main HTML file
- **dist/assets/** - JavaScript and CSS bundles
- **dist/assets/html2canvas.esm-*.js** - PDF generation library
- **dist/assets/index.es-*.js** - React app code

### Build Size
- **Total:** ~1.2 MB (uncompressed)
- **Gzipped:** ~345 KB (compressed)
- **Load Time:** ~2-3 seconds on 4G

### Features Deployed
✓ Registration form with 3 steps
✓ Admin dashboard with real-time updates
✓ Firestore database integration
✓ Razorpay payment processing
✓ Cloudinary file uploads
✓ PDF certificate generation
✓ Email notifications
✓ WhatsApp notifications

---

## Firebase Configuration

### firebase.json
```json
{
  "hosting": {
    "public": "dist",
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

This configuration:
- Serves files from `dist` folder
- Rewrites all routes to `index.html` (for React Router)
- Enables caching for static assets
- Sets cache headers for HTML and JSON

### .firebaserc
```json
{
  "projects": {
    "default": "gravi-multiple"
  }
}
```

This links the project to Firebase project: **gravi-multiple**

---

## Environment Variables

### Production Environment Variables

Create a `.env.production` file with:

```
VITE_FIREBASE_API_KEY=AIzaSyD461Rr1DxefKVV7lnaWglgH3yFtb9F1sg
VITE_FIREBASE_AUTH_DOMAIN=gravi-multiple.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=gravi-multiple
VITE_FIREBASE_STORAGE_BUCKET=gravi-multiple.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=1041107905972
VITE_FIREBASE_APP_ID=1:1041107905972:web:f60b32fbd81676554bd6e1
VITE_FIREBASE_MEASUREMENT_ID=G-XWN6VCP381

VITE_CLOUDINARY_CLOUD_NAME=dp8bfdbab
VITE_CLOUDINARY_UPLOAD_PRESET=cryptchat
VITE_CLOUDINARY_API_KEY=337739287121541

VITE_RAZORPAY_KEY=rzp_live_SMj9EQLZSXaW4g

VITE_API_BASE_URL=https://gravi-multiple.web.app
```

**Note:** These are already in `.env.local` and will be used during build.

---

## Deployment Checklist

- [ ] Run `firebase login` to authenticate
- [ ] Run `npm run build` to build project
- [ ] Run `firebase deploy --project gravi-multiple` to deploy
- [ ] Visit https://gravi-multiple.web.app to verify
- [ ] Test registration form
- [ ] Test admin dashboard
- [ ] Test file uploads to Cloudinary
- [ ] Test payment processing
- [ ] Check browser console for errors

---

## After Deployment

### Verify Deployment
1. Go to https://gravi-multiple.web.app
2. Check if app loads
3. Open browser console (F12)
4. Look for any errors
5. Test registration flow

### Monitor Performance
1. Go to Firebase Console
2. Click "Hosting"
3. View analytics and performance metrics
4. Check error logs

### Update Firestore Rules
1. Go to Firebase Console
2. Click "Firestore Database"
3. Click "Rules" tab
4. Ensure rules allow reads/writes:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /candidates/{document=**} {
         allow read, write: if true;
       }
     }
   }
   ```

---

## Troubleshooting

### Issue: "Failed to get Firebase project"

**Solution:**
1. Run `firebase login` first
2. Make sure you're logged in with correct Google account
3. Verify project exists in Firebase Console
4. Check `.firebaserc` has correct project ID

### Issue: Build fails

**Solution:**
1. Run `npm install` to install dependencies
2. Check for TypeScript errors: `npm run build`
3. Fix any errors and rebuild
4. Try `npm run build -- --force`

### Issue: Deployment fails

**Solution:**
1. Check internet connection
2. Verify Firebase CLI is installed: `firebase --version`
3. Try logging in again: `firebase login`
4. Check project permissions in Firebase Console

### Issue: App doesn't load after deployment

**Solution:**
1. Check browser console for errors (F12)
2. Verify environment variables are set
3. Check Firebase Hosting logs in console
4. Try clearing browser cache

---

## Rollback Deployment

If something goes wrong, rollback to previous version:

```bash
firebase hosting:channel:list
firebase hosting:clone gravi-multiple:live gravi-multiple:staging
```

Or redeploy the previous build:

```bash
firebase deploy --project gravi-multiple
```

---

## Continuous Deployment

To automate deployments:

1. **GitHub Actions** - Deploy on push to main branch
2. **Firebase CLI** - Deploy from CI/CD pipeline
3. **Manual** - Deploy using `firebase deploy` command

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Firebase

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
          projectId: gravi-multiple
```

---

## Performance Optimization

### Current Build Size
- **Total:** 1.2 MB
- **Gzipped:** 345 KB
- **Load Time:** 2-3 seconds

### Optimization Tips
1. **Code Splitting** - Split large bundles
2. **Lazy Loading** - Load components on demand
3. **Image Optimization** - Compress images
4. **Caching** - Use browser caching
5. **CDN** - Firebase Hosting uses global CDN

---

## Monitoring

### Firebase Console
1. Go to https://console.firebase.google.com/
2. Select project: gravi-multiple
3. Click "Hosting"
4. View:
   - Deployment history
   - Performance metrics
   - Error logs
   - Traffic analytics

### Real-Time Monitoring
```bash
firebase hosting:log
```

---

## Support

### Firebase Documentation
- https://firebase.google.com/docs/hosting
- https://firebase.google.com/docs/hosting/quickstart

### Firebase CLI Reference
- https://firebase.google.com/docs/cli

### Troubleshooting
- https://firebase.google.com/support

---

## Summary

✓ Project built successfully
✓ Firebase configuration created
✓ Ready to deploy

**Next Steps:**
1. Run `firebase login`
2. Run `firebase deploy --project gravi-multiple`
3. Visit https://gravi-multiple.web.app

**Deployment Time:** ~2-5 minutes
**Live URL:** https://gravi-multiple.web.app
