# Complete Testing Instructions - Gravity Job Assistance Platform

## 🚀 Quick Start

### 1. Start the Application
```bash
npm run dev:all
```

This starts:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001

### 2. Access Test Page
Open: **http://localhost:3000/test**

This page allows you to:
- ✓ Test database connection
- ✓ Add test data
- ✓ Verify all candidates in database

## 📋 Testing Workflow

### Phase 1: Database Connectivity Test

1. Go to http://localhost:3000/test
2. Click "🔌 Test Connection"
3. You should see:
   ```
   ✓ Success
   Database connected! Found X candidates
   ```

### Phase 2: Add Test Data

1. On test page, click "➕ Add Test Data"
2. You should see:
   ```
   ✓ Success
   Test candidate added successfully with ID: [ID]
   Document ID: [ID]
   ```
3. This adds one test candidate to Firestore

### Phase 3: Verify Database

1. On test page, click "✓ Verify All Data"
2. You should see all candidates listed with:
   - Name
   - Email
   - Phone
   - Position
   - Status
   - Payment Status
   - Document ID

### Phase 4: Seed Dummy Data

1. Go to http://localhost:3000
2. Click "Admin" button
3. Enter password: `Gravity!)#8`
4. Click "🌱 Add Demo Data" button
5. Wait for completion
6. You should see 5 dummy candidates in the table

### Phase 5: Complete Registration

1. Go to http://localhost:3000
2. Click "Register Now"
3. Fill all fields in Step 1:
   - Full Name: `John Doe`
   - Father's Name: `James Doe`
   - Phone: `9876543210`
   - Email: `john@example.com`
   - PAN: `ABCDE1234F`
   - Aadhar: `123456789012`
   - DOB: `1995-05-15`
   - Gender: `Male`
   - Qualification: `Bachelor's Degree`
   - Experience: `1-3 years`
   - Position: `Senior Developer` (custom text)

4. Click "Next: Address →"

5. Fill Step 2:
   - Current Address: `123 Main Street, Mumbai, MH 400001`
   - Permanent Address: `456 Park Road, Pune, MH 411001`
   - (Optional) Upload Resume
   - (Optional) Upload PAN Card

6. Click "Review & Pay →"

7. Review all information in Step 3

8. Check "I agree to Terms & Conditions"

9. Click "Pay ₹1,000 via Razorpay 🔒"

10. In Razorpay modal:
    - Use test card: `4111 1111 1111 1111`
    - Any future expiry date
    - Any 3-digit CVV
    - Click Pay

11. Success screen appears with:
    - ✓ Registration Complete
    - Email status (Sending/Sent/Failed)
    - WhatsApp status (Sending/Sent/Failed)
    - "📥 Download Certificate" button

### Phase 6: Verify Registration in Database

1. Go to http://localhost:3000/test
2. Click "✓ Verify All Data"
3. Your new registration should appear in the list
4. Verify all data matches what you entered

### Phase 7: Verify in Admin Dashboard

1. Go to http://localhost:3000
2. Click "Admin"
3. Enter password: `Gravity!)#8`
4. Your new registration should appear in the table
5. Click "View" to see full details
6. Verify all information is correct
7. Try updating status from "Registered" to "Confirmed"
8. Verify status change is saved

### Phase 8: Test PDF Download

1. After successful registration, click "📥 Download Certificate"
2. PDF should download with filename: `Gravity_Registration_[ID].pdf`
3. Open PDF and verify:
   - Gravity branding
   - Confirmation ID
   - All personal information
   - All professional information
   - Payment information
   - Registration date

## ✅ Verification Checklist

### Database Tests
- [ ] Test connection shows "Database connected"
- [ ] Can add test data successfully
- [ ] Verify data shows all candidates
- [ ] New registrations appear in database
- [ ] All fields are saved correctly

### Registration Tests
- [ ] All form fields accept input
- [ ] Custom job position works (not dropdown)
- [ ] Validation works (required fields)
- [ ] File uploads work (optional)
- [ ] Navigation between steps works
- [ ] Back button works

### Payment Tests
- [ ] Razorpay modal opens
- [ ] Payment completes successfully
- [ ] Success screen appears
- [ ] Data saves to database

### Admin Tests
- [ ] Can login with password
- [ ] Dummy data displays
- [ ] New registrations appear
- [ ] Can search candidates
- [ ] Can filter by status
- [ ] Can view details
- [ ] Can update status

### PDF Tests
- [ ] Download button works
- [ ] PDF opens correctly
- [ ] All information is present
- [ ] Formatting looks professional
- [ ] Can print PDF

### Notification Tests
- [ ] Email status shows in success screen
- [ ] WhatsApp status shows in success screen
- [ ] Check browser console for logs

## 🔍 Expected Results

### After Test Connection
```
✓ Success
Database connected! Found X candidates
```

### After Add Test Data
```
✓ Success
Test candidate added successfully with ID: abc123def456
Document ID: abc123def456
```

### After Verify Data
```
✓ Success
Found X candidates in database

[List of all candidates with details]
```

### After Registration
```
✓ Success
Registration Complete
Email Sent (or Email Failed)
WhatsApp Sent (or WhatsApp Failed)
```

### In Admin Dashboard
- New candidate appears in table
- All fields are visible
- Status can be updated
- Data persists after refresh

### PDF Download
- File downloads automatically
- Filename: `Gravity_Registration_[ID].pdf`
- PDF opens in viewer
- All information is correct

## 🐛 Troubleshooting

### Test Page Not Loading
- Check URL: http://localhost:3000/test
- Check browser console for errors
- Verify dev server is running

### Database Connection Failed
- Check Firebase credentials in `.env.local`
- Verify Firebase project is active
- Check browser console for errors
- Try refreshing page

### Data Not Appearing
- Wait 2-3 seconds for real-time sync
- Refresh admin dashboard
- Check Firestore console directly
- Check browser console for errors

### Payment Not Completing
- Use test card: `4111 1111 1111 1111`
- Use any future expiry date
- Use any 3-digit CVV
- Check browser console for errors

### PDF Not Downloading
- Check browser console for errors
- Verify jsPDF is installed
- Try different browser
- Check popup blocker settings

### Admin Login Failed
- Password is: `Gravity!)#8` (case-sensitive)
- Check for typos
- Try copying password from this document

## 📊 Test Data Examples

### Test Candidate 1
```
Name: John Doe
Father: James Doe
Phone: 9876543210
Email: john@example.com
PAN: ABCDE1234F
Aadhar: 123456789012
DOB: 1995-05-15
Gender: Male
Qualification: Bachelor's Degree
Experience: 1-3 years
Position: Senior Developer
Address: 123 Main St, Mumbai, MH 400001
```

### Test Candidate 2
```
Name: Jane Smith
Father: Robert Smith
Phone: 9876543211
Email: jane@example.com
PAN: BCDEF2345G
Aadhar: 234567890123
DOB: 1996-08-22
Gender: Female
Qualification: Master's Degree
Experience: 3-5 years
Position: Data Science Manager
Address: 456 Park Ave, Bangalore, KA 560001
```

## 🎯 Success Criteria

All of the following should work:

✅ Test page loads and shows buttons
✅ Database connection test passes
✅ Can add test data
✅ Can verify all data
✅ Registration form accepts all input
✅ Payment completes successfully
✅ Data saves to Firestore
✅ Admin dashboard displays data
✅ PDF downloads correctly
✅ Notifications show status
✅ All features work together

## 📝 Notes

- First load may take 2-3 seconds (Firebase initialization)
- Real-time updates may take 1-2 seconds
- PDF generation is instant
- Test page is for development only
- Remove test page before production

## 🚀 Next Steps

1. **Complete all tests** using this guide
2. **Verify database** has all data
3. **Test admin features** thoroughly
4. **Download PDF** and verify content
5. **Check notifications** in console
6. **Deploy to production** when ready

## 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Check backend console for logs
3. Verify `.env.local` configuration
4. Check Firebase project is active
5. Try refreshing the page
6. Check TEST_DATABASE.md for more details

---

**Ready to test?** Start with `npm run dev:all` and visit http://localhost:3000/test
