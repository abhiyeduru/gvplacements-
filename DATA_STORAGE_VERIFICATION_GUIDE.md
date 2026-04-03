# Data Storage Verification Guide

## Current Status
✗ **Data is NOT being stored to Firestore**

### Root Cause
Firestore security rules are set to deny all writes. Error: `HTTP 403 PERMISSION_DENIED`

### Why This Happens
By default, Firebase Firestore has restrictive security rules that prevent any reads or writes. This is a security feature to prevent unauthorized access.

---

## Complete Fix & Verification Process

### Phase 1: Fix Firestore Security Rules

#### 1.1 Access Firebase Console
1. Go to https://console.firebase.google.com/
2. Select project: **gravi-multiple**
3. Click **Firestore Database** (left sidebar)
4. Click **Rules** tab

#### 1.2 Update Security Rules
Replace all existing rules with:

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

#### 1.3 Publish Rules
- Click **Publish** button
- Wait for green checkmark ✓
- Wait 1-2 minutes for deployment

---

### Phase 2: Verify REST API Works

#### 2.1 Test Data Storage via REST API
```bash
node store-data-rest.cjs
```

**Expected Output:**
```
✓ Successfully stored 3 candidates to Firestore
✓ Retrieved 3 candidates from Firestore
✓ Data successfully stored to Firestore!
```

**If you see this, REST API is working!** ✓

#### 2.2 Verify in Firebase Console
1. Go to Firestore Database
2. Click **candidates** collection
3. You should see 3 documents with candidate data

---

### Phase 3: Verify Frontend Works

#### 3.1 Test Dummy Data Seeding
1. Open http://localhost:3000
2. Click **Admin** button
3. Enter password: `Gravity!)#8`
4. Click **🌱 Add Demo Data** button
5. Wait 2-3 seconds

**Expected Result:**
- 5 candidates appear in the table
- Each with different statuses (Registered, Confirmed, Placed)

#### 3.2 Verify in Firebase Console
1. Go to Firestore Database
2. Click **candidates** collection
3. You should now see 8 documents total (3 from REST API + 5 from seeding)

---

### Phase 4: Test Complete Registration Flow

#### 4.1 Register a New Candidate
1. Open http://localhost:3000
2. Click **Register** button
3. Fill in all form fields:
   - **Step 1:** Personal info (name, email, phone, PAN, Aadhar, DOB, etc.)
   - **Step 2:** Address & documents (upload resume & PAN)
   - **Step 3:** Review & payment
4. Click **Pay Now** button
5. Complete Razorpay payment (use test card if available)

#### 4.2 Verify Data Saved
After payment completes:
1. You should see **Success Screen** with:
   - Confirmation ID
   - Download PDF button
   - Email notification status
   - WhatsApp notification status

2. Go to Admin Dashboard
3. You should see the new candidate in the table

4. Go to Firebase Console → Firestore Database → candidates collection
5. You should see the new candidate document

---

### Phase 5: Verify All Features

#### 5.1 PDF Generation
- On Success Screen, click **Download Certificate**
- A PDF should download with candidate details

#### 5.2 Email Notifications
- Check the email address provided in registration
- You should receive a confirmation email

#### 5.3 WhatsApp Notifications
- Check the phone number provided
- You should receive a WhatsApp message (if WhatsApp API is configured)

#### 5.4 Admin Dashboard
- View all candidates
- Filter by status (Pending, Success, Placed)
- Search by name, email, or phone
- Click on a candidate to see full details

---

## Troubleshooting

### Issue: Still Getting 403 Error

**Solution:**
1. Verify you're in the correct project: **gravi-multiple**
2. Check that rules were actually published (look for green checkmark)
3. Wait 2-3 minutes for rules to fully deploy
4. Refresh the page and try again
5. Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)

### Issue: Rules Won't Publish

**Solution:**
1. Check for syntax errors in the rules
2. Make sure there are no extra spaces or characters
3. Copy the rules again carefully
4. Try a simpler rule first:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       allow read, write;
     }
   }
   ```

### Issue: Data Appears in REST API but Not in Admin Dashboard

**Solution:**
1. Refresh the admin dashboard page
2. Check browser console for errors (F12)
3. Verify Firebase config in `.env.local` is correct
4. Check that the app is connected to the correct Firebase project

### Issue: Payment Completes but Data Doesn't Save

**Solution:**
1. Check browser console for errors (F12)
2. Verify Firestore security rules allow writes
3. Check that `saveCandidateProfile()` is being called
4. Look for error messages in Firebase console

### Issue: Admin Dashboard Shows "Firebase not connected"

**Solution:**
1. Verify `.env.local` has correct Firebase credentials
2. Check that Firebase config is loaded (check browser console)
3. Verify internet connection
4. Try refreshing the page

---

## Verification Checklist

- [ ] Firestore security rules updated and published
- [ ] REST API test successful (`node store-data-rest.cjs`)
- [ ] Dummy data seeding works (5 candidates appear)
- [ ] Complete registration flow works
- [ ] New candidate data appears in Firestore
- [ ] Admin dashboard displays all candidates
- [ ] PDF download works
- [ ] Email notifications sent
- [ ] WhatsApp notifications sent (if configured)

---

## Next Steps

Once all verification is complete:

1. **Test with Real Data:** Register multiple candidates and verify all data saves
2. **Test Payments:** Complete actual payments and verify data persistence
3. **Test Admin Features:** Try all admin dashboard filters and searches
4. **Test Notifications:** Verify emails and WhatsApp messages are sent
5. **Production Deployment:** Update security rules for production use

---

## Production Security Rules

When deploying to production, replace the permissive rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Require authentication for all operations
    match /candidates/{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

This ensures only authenticated users can access the data.
