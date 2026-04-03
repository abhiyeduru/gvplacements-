# Complete Testing Guide - Gravity Job Assistance

## ✅ System Status

**Dev Server**: Running on http://localhost:3000/
**Firebase**: gravi-multiple project
**Razorpay**: Live keys configured (rzp_live_SMj9EQLZSXaW4g)
**Admin Password**: Gravity!)#8

---

## 🧪 Testing Checklist

### 1. Frontend Load Test
- [ ] Open http://localhost:3000/ in browser
- [ ] Page loads without errors
- [ ] See "gravity." logo
- [ ] See "Register Now" button
- [ ] See "Admin" button
- [ ] See statistics (500+, 92%, 48hr)

### 2. Registration Form Test

**Step 1: Personal Information**
- [ ] Click "Register Now"
- [ ] Modal opens
- [ ] Fill in:
  - Full Name: `John Doe`
  - Father's Name: `Jane Doe`
  - Phone: `9876543210`
  - Email: `john@example.com`
  - Position: `Software Engineer`
- [ ] Click "Next: Address →"

**Step 2: Address & Documents**
- [ ] Current Address: `123 Main St, City, State 12345`
- [ ] Permanent Address: (leave blank)
- [ ] Resume: (optional - skip for now)
- [ ] PAN Card: (optional - skip for now)
- [ ] Notes: `Experienced in React and Node.js`
- [ ] Click "Review & Pay →"

**Step 3: Review & Payment**
- [ ] Review all information displays correctly
- [ ] Payment summary shows ₹1,000
- [ ] Check "I agree to Terms & Conditions"
- [ ] Click "Pay ₹1,000 via Razorpay 🔒"

### 3. Razorpay Payment Test

**Expected Behavior:**
- [ ] Razorpay modal opens
- [ ] Shows ₹1,000 amount
- [ ] Shows "Gravity Job Assistance"
- [ ] Shows your email and phone

**Payment Options:**
- [ ] Use test card: 4111 1111 1111 1111
- [ ] Expiry: Any future date (e.g., 12/25)
- [ ] CVV: Any 3 digits (e.g., 123)
- [ ] OTP: 123456 (if prompted)

### 4. Success Screen Test
- [ ] After payment, see "Registration Successful!"
- [ ] See confirmation ID (DEMO-xxxxx or real ID)
- [ ] See badges: ✓ WhatsApp sent, ✓ Email sent, ✓ Profile saved
- [ ] Click "Close" button

### 5. Admin Panel Test

**Login:**
- [ ] Click "Admin" button
- [ ] Enter password: `Gravity!)#8`
- [ ] Admin dashboard loads

**Dashboard:**
- [ ] See statistics cards:
  - Total Candidates
  - Successful Payments
  - Placed Candidates
  - Total Revenue
- [ ] See candidate list table
- [ ] See search box
- [ ] See filter buttons (All, Pending, Success, Placed)

**Candidate List:**
- [ ] Your registered candidate appears
- [ ] Shows name, email, phone, position
- [ ] Shows payment status (✓ Success)
- [ ] Shows registration date
- [ ] Click "View" button

**Candidate Details:**
- [ ] See all personal information
- [ ] See address information
- [ ] See payment details
- [ ] See status dropdown
- [ ] Change status to "Confirmed"
- [ ] Click "Update Status"
- [ ] See success message

### 6. Real-time Updates Test
- [ ] Open admin panel in two browser tabs
- [ ] In Tab 1: Update candidate status
- [ ] In Tab 2: See update appear instantly
- [ ] Confirms real-time Firestore sync

### 7. Search & Filter Test
- [ ] In admin panel, type name in search box
- [ ] Candidate filters in real-time
- [ ] Click "Success" filter button
- [ ] See only successful payments
- [ ] Click "All" to reset

### 8. Database Verification

**Check Firestore:**
1. Go to Firebase Console
2. Navigate to gravi-multiple project
3. Go to Firestore Database
4. Check `candidates` collection
5. Verify your registration data:
   - name: "John Doe"
   - email: "john@example.com"
   - paymentStatus: "success"
   - paymentId: (Razorpay ID)
   - status: "registered" or "confirmed"
   - createdAt: (timestamp)

---

## 📊 Expected Results

### Successful Registration Flow:
```
User fills form
    ↓
Validates input ✓
    ↓
Opens Razorpay modal ✓
    ↓
Processes payment ✓
    ↓
Saves to Firestore ✓
    ↓
Shows success screen ✓
    ↓
Admin sees candidate ✓
```

### Data Stored in Firestore:
```
candidates/
└── {docId}
    ├── name: "John Doe"
    ├── fatherName: "Jane Doe"
    ├── phone: "9876543210"
    ├── email: "john@example.com"
    ├── position: "Software Engineer"
    ├── currentAddress: "123 Main St..."
    ├── permanentAddress: "123 Main St..."
    ├── notes: "Experienced in React..."
    ├── paymentStatus: "success"
    ├── paymentId: "pay_xxxxx"
    ├── paymentAmount: 1000
    ├── status: "registered"
    └── createdAt: "2025-01-15T10:30:00Z"
```

---

## 🔍 Troubleshooting

### Issue: "Too many requests" error
**Solution**: Wait 2 seconds before trying payment again

### Issue: Firebase not connecting
**Solution**: Check Firebase credentials in .env.local
- Verify project ID: gravi-multiple
- Check API key is valid

### Issue: Razorpay modal not opening
**Solution**: 
- Check Razorpay key in .env.local
- Verify key starts with `rzp_live_`
- Check browser console for errors

### Issue: Admin panel not loading
**Solution**:
- Verify password: `Gravity!)#8`
- Check Firebase connection
- Clear browser cache

### Issue: Data not saving to Firestore
**Solution**:
- Check Firebase security rules
- Verify Firestore database exists
- Check network tab for errors

---

## 📝 Test Results Template

```
Date: ___________
Tester: ___________

Frontend Load: ✓ / ✗
Registration Form: ✓ / ✗
Razorpay Payment: ✓ / ✗
Success Screen: ✓ / ✗
Admin Panel: ✓ / ✗
Database Storage: ✓ / ✗
Real-time Updates: ✓ / ✗
Search & Filter: ✓ / ✗

Overall Status: ✓ PASS / ✗ FAIL

Notes:
_________________________________
_________________________________
```

---

## 🚀 Next Steps After Testing

1. **If all tests pass:**
   - ✅ Application is production-ready
   - ✅ Deploy to production
   - ✅ Monitor Razorpay transactions
   - ✅ Monitor Firestore usage

2. **If tests fail:**
   - Check error messages
   - Review troubleshooting section
   - Check browser console
   - Check Firebase logs
   - Contact support

---

## 📞 Support

**Application URL**: http://localhost:3000/
**Admin Panel**: Click "Admin" button, password: `Gravity!)#8`
**Firebase Project**: gravi-multiple
**Razorpay Key**: rzp_live_SMj9EQLZSXaW4g

---

**Testing Status**: Ready to test
**Last Updated**: 2025
**Version**: 1.0.0
