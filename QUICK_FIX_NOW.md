# Quick Fix - Do This Now

**Time**: 5 minutes  
**Status**: Critical fixes needed

---

## 🚨 TWO QUICK FIXES NEEDED

### FIX 1: Update Firestore Security Rules (2 minutes)

1. Go to: https://console.firebase.google.com
2. Select project: **gravi-multiple**
3. Click: **Firestore Database**
4. Click: **Rules** tab
5. Replace ALL content with this:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /admin_settings/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /candidates/{document=**} {
      allow read, write: if true;
    }
    match /paymentSettings/{document=**} {
      allow read, write: if true;
    }
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

6. Click: **Publish**
7. Wait for deployment (1-2 minutes)

---

### FIX 2: Verify .env.local (1 minute)

1. Open: `.env.local`
2. Find line: `VITE_RAZORPAY_KEY=`
3. Make sure it says: `VITE_RAZORPAY_KEY=rzp_live_SMj9EQLZSXaW4g`
4. NO spaces, NO quotes
5. Save file

---

### FIX 3: Rebuild & Deploy (2 minutes)

Run these commands:

```bash
npm run build
firebase deploy --only hosting
```

---

## ✅ VERIFY IT WORKS

1. Go to: https://www.gvplacements.com/razorpay-test
2. Check Configuration section
3. Should show:
   - ✅ Razorpay Key: Configured
   - ✅ Script Loaded: Yes
   - ✅ No permission errors

---

## 🎯 THAT'S IT!

After these 3 quick fixes, your system should work!

---

**Time**: 5 minutes  
**Difficulty**: Easy  
**Impact**: Critical

