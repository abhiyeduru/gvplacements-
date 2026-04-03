# Quick Firestore Fix - 3 Steps

## The Problem
Data won't save to Firestore because security rules deny all writes.

## The Fix

### Step 1: Open Firebase Console
Go to: https://console.firebase.google.com/project/gravi-multiple/firestore/rules

### Step 2: Copy & Paste These Rules
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

### Step 3: Click "Publish"
Wait for the green checkmark ✓

## Verify It Works
Run this command:
```bash
node store-data-rest.cjs
```

You should see:
```
✓ Successfully stored 3 candidates to Firestore
✓ Retrieved 3 candidates from Firestore
✓ Data successfully stored to Firestore!
```

## Then Test the App
1. Open http://localhost:3000
2. Click "Admin" → Enter password: `Gravity!)#8`
3. Click "🌱 Add Demo Data"
4. You should see 5 candidates in the table

Done! 🎉
