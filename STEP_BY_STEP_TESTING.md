# Step-by-Step Testing Guide

## What We Know

✓ **Data CAN be stored to Firestore** (confirmed via REST API)
- REST API successfully stores 3 candidates
- REST API successfully retrieves 3 candidates
- Firestore security rules are working

✗ **Frontend is not displaying data** (reason unknown)
- Admin dashboard shows no data
- Registration form may not be saving data
- Need to investigate why

---

## Testing Plan

### Phase 1: Check Firebase Initialization (5 minutes)

**Step 1: Open Browser Console**
1. Open http://localhost:3000
2. Press F12 to open Developer Tools
3. Click on "Console" tab
4. You should see logs like:
   ```
   🔥 Firebase Config: {projectId: "gravi-multiple", ...}
   ✓ Firebase app initialized
   ✓ Firestore database initialized
   ✓ Firebase auth initialized
   ```

**What to look for:**
- ✓ All three initialization messages appear
- ✗ Any error messages
- ✗ "Firebase not ready" messages

**If you see errors:**
- Screenshot the error
- Note the exact error message
- This tells us Firebase SDK is not initializing

**If you see success messages:**
- Firebase is initialized correctly
- Move to Phase 2

---

### Phase 2: Test Debug Page (5 minutes)

**Step 1: Open Debug Page**
1. Go to http://localhost:3000/debug
2. Wait for page to load
3. Check the "Connection Status" section

**What to look for:**
- ✓ "Successfully fetched X candidates from Firestore"
- ✗ "Firebase DB not initialized"
- ✗ "Error fetching data"

**If you see success:**
- Firebase is working in browser
- Data is in Firestore
- Move to Phase 3

**If you see error:**
- Screenshot the error
- Check browser console (F12) for details
- This tells us why frontend can't read data

---

### Phase 3: Test Admin Dashboard (5 minutes)

**Step 1: Access Admin Dashboard**
1. Go to http://localhost:3000
2. Click "Admin" button
3. Enter password: `Gravity!)#8`
4. You should see admin dashboard

**Step 2: Check Console**
1. Press F12 to open Developer Tools
2. Click on "Console" tab
3. You should see logs like:
   ```
   📡 Setting up Firestore listener...
   ✓ Snapshot received: 3 documents
   ✓ Data mapped: [...]
   ```

**What to look for:**
- ✓ "Snapshot received: X documents"
- ✗ "Firebase not connected"
- ✗ "Error fetching candidates"

**If you see success:**
- Admin dashboard should show candidates
- If it doesn't, there's a UI issue
- Move to Phase 4

**If you see error:**
- Screenshot the error
- This tells us why admin dashboard can't fetch data

---

### Phase 4: Test Demo Data Seeding (5 minutes)

**Step 1: Add Demo Data**
1. In admin dashboard, click "🌱 Add Demo Data" button
2. Wait 2-3 seconds
3. Check if 5 candidates appear in the table

**Step 2: Check Console**
1. Press F12 to open Developer Tools
2. Click on "Console" tab
3. Look for logs from seedDatabase function

**What to look for:**
- ✓ 5 candidates appear in table
- ✓ Console shows "Database seeded successfully"
- ✗ No candidates appear
- ✗ Error messages in console

**If you see success:**
- Seeding is working
- Data is being saved
- Move to Phase 5

**If you see error:**
- Screenshot the error
- This tells us why seeding is failing

---

### Phase 5: Test Registration Flow (10 minutes)

**Step 1: Start Registration**
1. Go to http://localhost:3000
2. Click "Register Now" button
3. Fill in all form fields:
   - Name, Email, Phone
   - PAN, Aadhar, DOB
   - Gender, Qualification, Experience
   - Job Position
   - Current Address, Permanent Address

**Step 2: Upload Files**
1. Upload a resume file
2. Upload a PAN file
3. Click "Next"

**Step 3: Review & Pay**
1. Review all information
2. Click "Pay Now"
3. Complete Razorpay payment

**Step 4: Check Console**
1. Press F12 to open Developer Tools
2. Click on "Console" tab
3. Look for logs like:
   ```
   📝 Saving candidate profile...
   ✓ Candidate saved successfully: [ID]
   ```

**What to look for:**
- ✓ "Candidate saved successfully"
- ✓ Success screen appears
- ✗ "Error saving candidate"
- ✗ Success screen doesn't appear

**If you see success:**
- Registration is working
- Data is being saved
- Check admin dashboard to verify

**If you see error:**
- Screenshot the error
- This tells us why registration is failing

---

### Phase 6: Verify Data in Firestore (5 minutes)

**Step 1: Check Firebase Console**
1. Go to https://console.firebase.google.com/
2. Select project: gravi-multiple
3. Click "Firestore Database"
4. Click "candidates" collection
5. You should see all documents

**What to look for:**
- ✓ Documents from REST API (3 candidates)
- ✓ Documents from demo seeding (5 candidates)
- ✓ Documents from registration (if you registered)
- ✗ No documents at all

**If you see documents:**
- Data is being stored correctly
- Issue is with frontend display

**If you see no documents:**
- Data is not being stored
- Issue is with Firestore write permissions

---

## Troubleshooting by Phase

### Phase 1 Issues: Firebase Not Initializing

**Problem:** Console shows error during Firebase initialization

**Possible causes:**
1. Firebase config is wrong
2. Environment variables not loaded
3. Firebase SDK not installed

**Solution:**
1. Check `.env.local` has correct values
2. Check `src/config/firebase.ts` is correct
3. Run: `npm install firebase`

---

### Phase 2 Issues: Debug Page Shows Error

**Problem:** Debug page shows "Firebase DB not initialized" or error

**Possible causes:**
1. Firebase SDK not initializing
2. Query syntax error
3. Firestore security rules issue

**Solution:**
1. Check Phase 1 - Firebase initialization
2. Check browser console for specific error
3. Verify Firestore security rules are published

---

### Phase 3 Issues: Admin Dashboard Shows No Data

**Problem:** Admin dashboard loads but shows no candidates

**Possible causes:**
1. Listener not working
2. Data not in Firestore
3. Query not matching data

**Solution:**
1. Check Phase 2 - Debug page
2. Check Firebase console for documents
3. Check browser console for listener errors

---

### Phase 4 Issues: Demo Data Seeding Fails

**Problem:** Clicking "Add Demo Data" doesn't add candidates

**Possible causes:**
1. seedDatabase function error
2. Firebase write permission issue
3. Data format issue

**Solution:**
1. Check browser console for errors
2. Check Firestore security rules
3. Check seedData.ts for issues

---

### Phase 5 Issues: Registration Doesn't Save Data

**Problem:** Registration completes but data doesn't appear

**Possible causes:**
1. saveCandidateProfile not being called
2. Payment callback not triggering
3. Firebase write error

**Solution:**
1. Check browser console for "Saving candidate profile" log
2. Check if payment callback is triggered
3. Check for Firebase write errors

---

### Phase 6 Issues: No Data in Firestore

**Problem:** Firebase console shows no documents

**Possible causes:**
1. Data not being written
2. Wrong collection name
3. Firestore security rules denying writes

**Solution:**
1. Check browser console for write errors
2. Verify collection name is "candidates"
3. Check Firestore security rules

---

## Quick Checklist

- [ ] Phase 1: Firebase initializes (check console)
- [ ] Phase 2: Debug page shows candidates
- [ ] Phase 3: Admin dashboard shows candidates
- [ ] Phase 4: Demo data seeding works
- [ ] Phase 5: Registration saves data
- [ ] Phase 6: Data appears in Firebase console

---

## What to Report

After testing, report:

1. **Which phase failed?**
   - Phase 1, 2, 3, 4, 5, or 6?

2. **What error did you see?**
   - Screenshot or exact error message

3. **What did console show?**
   - Any error messages?
   - Any success messages?

4. **What did you expect?**
   - What should have happened?

5. **What actually happened?**
   - What did happen instead?

---

## Example Report

**Phase:** 3 (Admin Dashboard)

**Error:** Admin dashboard shows "Firebase not connected"

**Console shows:**
```
⚠️ Firebase not connected
```

**Expected:** Admin dashboard should show candidates

**Actually happened:** Shows "Firebase not connected" message

---

## Next Steps

1. **Run through all phases**
2. **Note which phase fails**
3. **Report the failure**
4. **We'll fix the specific issue**

---

## Important Notes

- Keep browser console open (F12) during all tests
- Take screenshots of any errors
- Note exact error messages
- Check both console and page display
- Test in order (don't skip phases)

---

## Timeline

- Phase 1: 5 minutes
- Phase 2: 5 minutes
- Phase 3: 5 minutes
- Phase 4: 5 minutes
- Phase 5: 10 minutes
- Phase 6: 5 minutes

**Total: ~35 minutes**

After testing, we'll know exactly what's wrong and how to fix it.
