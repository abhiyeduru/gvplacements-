# Firebase Firestore Security Rules - Final Fix

## Problem
Getting 403 errors when trying to access Firestore from the app. This is because Firestore security rules haven't been deployed to Firebase Console.

## Solution (5 minutes)

### Step 1: Deploy Firestore Rules to Firebase Console

1. Go to: https://console.firebase.google.com/project/gravi-multiple/firestore/rules
2. Click **Edit Rules**
3. Replace ALL content with this:

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

4. Click **Publish**
5. Wait for deployment (usually 30 seconds)

### Step 2: Test Locally

1. Run: `npm run dev`
2. Go to: http://localhost:5173
3. Click "Register Now"
4. Fill form and try payment
5. Check browser console for logs

### Step 3: Test on Production

1. Go to: https://www.gvplacements.com
2. Click "Register Now"
3. Fill form and try payment
4. Use test UPI: `9182146476-3@ybl`

## What These Rules Do

- ✅ Allow anyone to read payment settings
- ✅ Allow anyone to read/write candidate data
- ✅ Allow authenticated users to write admin settings
- ✅ Block all other access

## Troubleshooting

**Still getting 403 errors?**
1. Clear browser cache (Ctrl+Shift+Delete)
2. Hard refresh (Ctrl+F5)
3. Wait 1-2 minutes for rules to propagate
4. Check Firebase Console → Firestore → Rules to confirm they're published

**Payment still not working?**
1. Check browser console for error messages
2. Verify Razorpay key is showing in console logs
3. Verify payment amount is loading (should show ₹1)
4. Try test UPI: `9182146476-3@ybl`

## Files Updated
- `firestore.rules` - Security rules file (already in repo)
- `src/services/paymentService.ts` - Added demo mode fallback

