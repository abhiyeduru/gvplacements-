# Test Database Storage - Gravity Job Assistance Platform

## Quick Test Steps

### Step 1: Start the Application
```bash
npm run dev:all
```

This starts:
- Frontend: http://localhost:5173
- Backend: http://localhost:3001

### Step 2: Add Dummy Data to Database
1. Open http://localhost:5173
2. Click "Admin" button
3. Enter password: `Gravity!)#8`
4. Click "🌱 Add Demo Data" button
5. Wait for confirmation
6. You should see 5 dummy candidates in the table

### Step 3: Test Registration & Database Storage

#### Test Case 1: Complete Registration Flow
1. Go to http://localhost:5173
2. Click "Register Now"
3. Fill Step 1:
   - Full Name: `Test User`
   - Father's Name: `Test Father`
   - Phone: `9876543210`
   - Email: `test@example.com`
   - PAN: `ABCDE1234F`
   - Aadhar: `123456789012`
   - DOB: `1995-05-15`
   - Gender: `Male`
   - Qualification: `Bachelor's Degree`
   - Experience: `1-3 years`
   - Position: `Senior Developer` (custom text)
4. Click "Next: Address →"
5. Fill Step 2:
   - Current Address: `123 Test Street, City, State 400001`
   - Permanent Address: `456 Test Road, City, State 411001`
   - Upload Resume (optional)
   - Upload PAN (optional)
6. Click "Review & Pay →"
7. Review all information in Step 3
8. Check "I agree to Terms & Conditions"
9. Click "Pay ₹1,000 via Razorpay 🔒"
10. Complete payment in Razorpay modal
11. Success screen appears with:
    - ✓ Registration Complete
    - Email status
    - WhatsApp status
    - Download Certificate button

#### Test Case 2: Verify Data in Admin Dashboard
1. Click "Admin" button
2. Enter password: `Gravity!)#8`
3. Look for your newly registered candidate in the table
4. Click "View" to see full details
5. Verify all information matches what you entered
6. Update status from "Registered" to "Confirmed"
7. Verify status change is saved

#### Test Case 3: Verify PDF Download
1. After successful registration, click "📥 Download Certificate"
2. PDF should download with filename: `Gravity_Registration_[ID].pdf`
3. Open PDF and verify:
   - All personal information is correct
   - Confirmation ID matches
   - Payment information is correct
   - Professional information is correct

## Database Verification

### Check Firestore Database

1. Go to Firebase Console: https://console.firebase.google.com
2. Select project: `gravi-multiple`
3. Go to Firestore Database
4. Look for `candidates` collection
5. You should see:
   - 5 dummy candidates (from seed data)
   - Your test registration (if completed)

### Expected Data Structure

Each candidate document should have:
```json
{
  "name": "Test User",
  "fatherName": "Test Father",
  "phone": "9876543210",
  "email": "test@example.com",
  "pan": "ABCDE1234F",
  "aadhar": "123456789012",
  "dob": "1995-05-15",
  "gender": "Male",
  "qualification": "Bachelor's Degree",
  "experience": "1-3 years",
  "position": "Senior Developer",
  "currentAddress": "123 Test Street, City, State 400001",
  "permanentAddress": "456 Test Road, City, State 411001",
  "paymentStatus": "success",
  "paymentAmount": 1000,
  "paymentId": "pay_XXXXXXXXXXXXX",
  "status": "registered",
  "createdAt": "2026-04-01T16:30:00.000Z",
  "resumeUrl": "optional_url",
  "panUrl": "optional_url"
}
```

## Testing Checklist

### Registration Form
- [ ] All fields accept input
- [ ] Validation works (required fields)
- [ ] Custom job position accepts any text
- [ ] File uploads work (optional)
- [ ] Navigation between steps works
- [ ] Back button works

### Payment
- [ ] Razorpay modal opens
- [ ] Payment can be completed
- [ ] Success callback triggers
- [ ] Data saves to Firestore

### Success Screen
- [ ] PDF download button works
- [ ] Email status shows
- [ ] WhatsApp status shows
- [ ] Close button works

### Admin Dashboard
- [ ] Can login with password
- [ ] Dummy data displays
- [ ] Can search candidates
- [ ] Can filter by status
- [ ] Can view candidate details
- [ ] Can update candidate status
- [ ] New registrations appear

### Database
- [ ] Data appears in Firestore
- [ ] All fields are saved
- [ ] Timestamps are correct
- [ ] Payment ID is saved
- [ ] Status is correct

## Troubleshooting

### Data Not Appearing in Admin Dashboard
1. Check browser console for errors
2. Verify Firebase is connected (no error banner)
3. Try refreshing the page
4. Check Firestore database directly

### Payment Not Completing
1. Use Razorpay test card: `4111 1111 1111 1111`
2. Any future expiry date
3. Any 3-digit CVV
4. Check browser console for errors

### PDF Not Downloading
1. Check browser console for errors
2. Verify jsPDF is installed: `npm list jspdf`
3. Try different browser
4. Check popup blocker settings

### Email/WhatsApp Not Sending
1. Backend must be running: `npm run server`
2. Check backend console for logs
3. Verify API endpoints are accessible
4. Check `.env.local` configuration

## Test Data Examples

### Test Registration 1
```
Name: Rajesh Kumar
Father: Suresh Kumar
Phone: 9876543210
Email: rajesh@test.com
PAN: ABCDE1234F
Aadhar: 123456789012
DOB: 1995-05-15
Gender: Male
Qualification: Bachelor's Degree
Experience: 1-3 years
Position: Senior Developer
Address: 123 Main St, Mumbai, MH 400001
```

### Test Registration 2
```
Name: Priya Singh
Father: Vikram Singh
Phone: 9876543211
Email: priya@test.com
PAN: BCDEF2345G
Aadhar: 234567890123
DOB: 1996-08-22
Gender: Female
Qualification: Master's Degree
Experience: 3-5 years
Position: Data Science Manager
Address: 456 Park Ave, Bangalore, KA 560001
```

## Expected Results

### After Dummy Data Seeding
- Admin dashboard shows 5 candidates
- All have "success" payment status
- Mix of "registered", "confirmed", "placed" statuses
- Can filter and search

### After Test Registration
- New candidate appears in admin dashboard
- All entered data is visible
- PDF can be downloaded
- Status can be updated
- Data persists after page refresh

### Database Verification
- Firestore `candidates` collection has documents
- Each document has all required fields
- Timestamps are in ISO format
- Payment IDs are present
- Status values are correct

## Performance Notes

- First load may take 2-3 seconds (Firebase initialization)
- Admin dashboard loads candidates in real-time
- PDF generation is instant
- Database queries are optimized with indexes

## Next Steps

1. **Test with Real Data**
   - Register multiple candidates
   - Verify all data is saved
   - Check admin dashboard updates

2. **Test Admin Features**
   - Update candidate statuses
   - Search and filter
   - View detailed information

3. **Test PDF & Notifications**
   - Download PDF certificates
   - Check email logs (console)
   - Check WhatsApp logs (console)

4. **Test Edge Cases**
   - Special characters in names
   - Long addresses
   - Multiple registrations
   - Rapid status updates

## Success Criteria

✅ Registration form accepts all data
✅ Payment completes successfully
✅ Data saves to Firestore
✅ Admin dashboard displays data
✅ PDF downloads correctly
✅ Notifications show status
✅ All features work together

---

**Ready to test?** Start with `npm run dev:all` and follow the steps above!
