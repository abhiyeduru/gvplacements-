# Action Plan - Data Storage Investigation

## Current Status

✓ **Data CAN be stored to Firestore** (confirmed via REST API)
- 3 candidates successfully stored
- 3 candidates successfully retrieved
- Firestore security rules working

✗ **Frontend not displaying data** (reason unknown)
- Admin dashboard shows no data
- Need to investigate why

---

## What You Need to Do

### Step 1: Open Debug Page (2 minutes)

**URL:** http://localhost:3000/debug

**What to look for:**
- Does it show "Successfully fetched X candidates"?
- Or does it show an error?
- How many candidates does it find?

**Screenshot this and report:**
- What status does it show?
- How many candidates?
- Any error messages?

---

### Step 2: Open Browser Console (2 minutes)

**How to open:**
1. Go to http://localhost:3000
2. Press F12 (or Cmd+Option+I on Mac)
3. Click "Console" tab

**What to look for:**
- Do you see initialization logs?
- Do you see any error messages?
- Do you see "Firebase DB initialized"?

**Screenshot this and report:**
- What logs do you see?
- Any error messages?
- Any warnings?

---

### Step 3: Test Admin Dashboard (3 minutes)

**How to access:**
1. Go to http://localhost:3000
2. Click "Admin" button
3. Enter password: `Gravity!)#8`

**What to look for:**
- Does admin dashboard load?
- Does it show any candidates?
- Does it show "Firebase not connected"?

**Check console (F12) for:**
- "Setting up Firestore listener" log?
- "Snapshot received" log?
- Any error messages?

**Screenshot this and report:**
- What does admin dashboard show?
- What does console show?
- Any errors?

---

### Step 4: Test Demo Data Seeding (3 minutes)

**How to test:**
1. In admin dashboard
2. Click "🌱 Add Demo Data" button
3. Wait 2-3 seconds

**What to look for:**
- Do 5 candidates appear in the table?
- Does console show success message?
- Any error messages?

**Screenshot this and report:**
- Did candidates appear?
- What does console show?
- Any errors?

---

### Step 5: Report Your Findings

**Create a report with:**

1. **Debug Page Result**
   - Screenshot of debug page
   - How many candidates found?
   - Any errors?

2. **Console Logs**
   - Screenshot of console
   - What initialization logs appear?
   - Any error messages?

3. **Admin Dashboard Result**
   - Screenshot of admin dashboard
   - Does it show candidates?
   - What does console show?

4. **Demo Seeding Result**
   - Did 5 candidates appear?
   - What does console show?
   - Any errors?

5. **Summary**
   - Which phase worked?
   - Which phase failed?
   - What error did you see?

---

## Expected Results

### Best Case: Everything Works
```
✓ Debug page shows 3 candidates
✓ Console shows initialization logs
✓ Admin dashboard shows candidates
✓ Demo seeding adds 5 more candidates
✓ All working!
```

### Likely Case: Frontend Issue
```
✓ Debug page shows candidates
✗ Admin dashboard shows no data
→ Issue is with admin dashboard display
```

### Possible Case: Firebase SDK Issue
```
✗ Debug page shows error
✗ Console shows initialization error
→ Issue is with Firebase SDK initialization
```

### Possible Case: Query Issue
```
✓ Debug page shows 0 candidates
✓ But REST API shows 3 candidates
→ Issue is with query syntax
```

---

## What Happens Next

### If Everything Works
- Great! The issue is resolved
- Data is being stored and displayed
- All features should work

### If Debug Page Shows Error
- We need to fix Firebase SDK initialization
- Check `.env.local` and `src/config/firebase.ts`
- May need to reinstall Firebase SDK

### If Admin Dashboard Shows No Data
- We need to fix the real-time listener
- Check `src/pages/AdminDashboard.tsx`
- May need to fix the query

### If Demo Seeding Fails
- We need to fix the seedDatabase function
- Check `src/services/seedData.ts`
- May need to fix error handling

### If Registration Doesn't Save
- We need to fix the payment callback
- Check `src/components/RegistrationForm.tsx`
- May need to fix `saveCandidateProfile()` call

---

## Timeline

| Step | Time | Action |
|------|------|--------|
| 1 | 2 min | Open debug page |
| 2 | 2 min | Open console |
| 3 | 3 min | Test admin dashboard |
| 4 | 3 min | Test demo seeding |
| 5 | 5 min | Create report |
| **Total** | **~15 min** | **Complete investigation** |

---

## Important Notes

1. **Keep console open** (F12) during all tests
2. **Take screenshots** of any errors
3. **Note exact error messages**
4. **Check both console and page display**
5. **Test in order** (don't skip steps)

---

## How to Report

**Send us:**
1. Screenshots of each step
2. Console logs (copy-paste or screenshot)
3. What you expected vs. what happened
4. Any error messages

**Or tell us:**
1. Which phase failed?
2. What error did you see?
3. What does console show?
4. What does the page show?

---

## Quick Links

- **Debug Page:** http://localhost:3000/debug
- **Home Page:** http://localhost:3000
- **Admin Dashboard:** http://localhost:3000 → Click Admin
- **Browser Console:** F12 → Console tab

---

## Files We Modified

These files now have enhanced logging:

1. `src/config/firebase.ts` - Firebase initialization logs
2. `src/services/candidateService.ts` - Save function logs
3. `src/pages/AdminDashboard.tsx` - Listener logs
4. `src/pages/FirestoreDebugPage.tsx` - Debug page (NEW)
5. `src/App.tsx` - Added /debug route

---

## What We're Looking For

**In Console Logs:**
- ✓ "Firebase app initialized"
- ✓ "Firestore database initialized"
- ✓ "Setting up Firestore listener"
- ✓ "Snapshot received: X documents"
- ✓ "Candidate saved successfully"

**Errors to Watch For:**
- ✗ "Firebase not ready"
- ✗ "Error fetching candidates"
- ✗ "Error saving candidate"
- ✗ "Firebase DB not initialized"

---

## Next Steps

1. **Follow the 5 steps above** (takes ~15 minutes)
2. **Take screenshots** of results
3. **Report your findings**
4. **We'll fix the specific issue**

---

## Questions?

- **How do I open console?** → Press F12
- **Where is debug page?** → http://localhost:3000/debug
- **What password?** → Gravity!)#8
- **What if I get stuck?** → Take a screenshot and report

---

## Start Now

👉 **Step 1:** Open http://localhost:3000/debug

👉 **Step 2:** Press F12 to open console

👉 **Step 3:** Take a screenshot

👉 **Step 4:** Report what you see

---

**Estimated time to complete:** ~15 minutes

**Estimated time to fix:** Depends on findings

**Total time to resolution:** ~30-60 minutes
