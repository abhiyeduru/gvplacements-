# Firebase & Razorpay Configuration Fix

**Date**: April 9, 2025  
**Issues**: 
1. Firebase permission denied errors
2. Razorpay key not loading

**Solution**: Update Firestore security rules and verify environment variables

---

## 🔴 ISSUES IDENTIFIED

### Issue 1: Firebase Permission Denied
```
Error: FirebaseError: [code=permission-denied]: Missing or insufficient permissions
```

**Cause**: Firestore security rules are too restrictive

**Solution**: Update security rules to allow public reads

### Issue 2: Razorpay Key Not Loading
```
Error: No key passed
Error: Invalid Razorpay key. Check configuration.
```

**Cause**: Environment variable not being loaded in production

**Solution**: Verify .env.local and rebuild

---

## ✅ FIX 1: UPDATE FIRESTORE SECURITY RULES

### Step 1: Go to Firebase Console

1. Go to: https://console.firebase.google.com
2. Select project: **gravi-multiple**
3. Go to: **Firestore Database**
4. Click: **Rules** tab

### Step 2: Replace Security Rules

Replace all content with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read access to payment settings
    match /admin_settings/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    // Allow public read/write to candidates (for testing)
    match /candidates/{document=**} {
      allow read, write: if true;
    }

    // Allow public read/write to paymentSettings
    match /paymentSettings/{document=**} {
      allow read, write: if true;
    }

    // Default: deny all
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

### Step 3: Publish Rules

1. Click: **Publish**
2. Confirm: **Publish**
3. Wait for deployment (usually 1-2 minutes)

---

## ✅ FIX 2: VERIFY RAZORPAY KEY IN .env.local

### Check Current Configuration

Your `.env.local` should have:

```
VITE_RAZORPAY_KEY=rzp_live_SMj9EQLZSXaW4g
```

### Verify It's Set

1. Open: `.env.local`
2. Check line: `VITE_RAZORPAY_KEY=rzp_live_SMj9EQLZSXaW4g`
3. Make sure there are NO spaces before or after the key
4. Make sure there are NO quotes around the key

### Correct Format
```
VITE_RAZORPAY_KEY=rzp_live_SMj9EQLZSXaW4g
```

### Incorrect Formats (DON'T USE)
```
VITE_RAZORPAY_KEY = rzp_live_SMj9EQLZSXaW4g  (spaces)
VITE_RAZORPAY_KEY="rzp_live_SMj9EQLZSXaW4g"  (quotes)
VITE_RAZORPAY_KEY='rzp_live_SMj9EQLZSXaW4g'  (quotes)
```

---

## ✅ FIX 3: REBUILD AND REDEPLOY

### Step 1: Rebuild Frontend

```bash
npm run build
```

### Step 2: Deploy to Firebase

```bash
firebase deploy --only hosting
```

### Step 3: Verify Deployment

1. Go to: https://www.gvplacements.com/razorpay-test
2. Check browser console for errors
3. Should see: "✅ Razorpay Key: Configured"

---

## 📋 VERIFICATION CHECKLIST

### Firebase Rules
- [ ] Logged in to Firebase Console
- [ ] Selected project: gravi-multiple
- [ ] Went to Firestore Database → Rules
- [ ] Replaced security rules
- [ ] Clicked Publish
- [ ] Rules deployed successfully

### Environment Variables
- [ ] Opened .env.local
- [ ] Verified VITE_RAZORPAY_KEY is set
- [ ] No spaces around the key
- [ ] No quotes around the key
- [ ] Correct key: rzp_live_SMj9EQLZSXaW4g

### Rebuild & Deploy
- [ ] Ran: npm run build
- [ ] Build successful
- [ ] Ran: firebase deploy --only hosting
- [ ] Deployment successful
- [ ] Visited test page
- [ ] No permission errors
- [ ] Razorpay key showing as configured

---

## 🧪 TEST AFTER FIX

### Test 1: Check Configuration

1. Go to: https://www.gvplacements.com/razorpay-test
2. Look at "Configuration" section
3. Should show:
   - ✅ Razorpay Key: Configured
   - ✅ Script Loaded: Yes
   - ✅ Domain: www.gvplacements.com
   - ✅ Protocol: https

### Test 2: Test Payment

1. Fill test details
2. Click "Test Payment ₹1"
3. Razorpay modal should open
4. Use test card: 4111 1111 1111 1111
5. Complete payment
6. See success message

---

## 🔗 IMPORTANT LINKS

### Firebase Console
- URL: https://console.firebase.google.com
- Project: gravi-multiple
- Section: Firestore Database → Rules

### Test Page
- URL: https://www.gvplacements.com/razorpay-test

### Your Website
- URL: https://www.gvplacements.com

---

## 📞 SUPPORT

### If Rules Update Fails
- Check Firebase Console for error messages
- Make sure you're in the correct project
- Try publishing again

### If Razorpay Key Still Not Working
- Clear browser cache
- Try incognito mode
- Check .env.local file
- Rebuild and redeploy

### If Payment Still Blocked
- Domain not registered in Razorpay yet
- Follow: RAZORPAY_DOMAIN_REGISTRATION_STEPS.md

---

## ✨ SUMMARY

1. **Update Firestore Security Rules** - Allow public reads
2. **Verify Razorpay Key** - Check .env.local
3. **Rebuild & Deploy** - npm run build && firebase deploy
4. **Test** - Go to test page and verify

**After these fixes, your system should work!**

---

**Last Updated**: April 9, 2025  
**Status**: Ready for Implementation  
**Action Required**: Follow steps above

