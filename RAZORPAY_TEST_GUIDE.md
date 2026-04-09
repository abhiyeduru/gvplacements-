# Razorpay Payment Test Guide

**Date**: April 9, 2025  
**Status**: Test Page Ready

---

## 🧪 HOW TO TEST RAZORPAY PAYMENT

### Step 1: Access the Test Page

Go to: **https://www.gvplacements.com/razorpay-test**

Or locally: **http://localhost:5173/razorpay-test**

---

### Step 2: Test Page Features

The test page shows:

1. **Configuration Status**
   - Razorpay Key: ✅ Configured or ❌ Missing
   - Script Loaded: ✅ Yes or ❌ No
   - Current Domain
   - Protocol (HTTP/HTTPS)

2. **Test Payment Form**
   - Amount (₹) - Default: ₹1
   - Name - Default: Test User
   - Email - Default: test@example.com
   - Phone - Default: 9999999999

3. **Test Card Details**
   - Card Number: 4111 1111 1111 1111
   - Expiry: Any future date (e.g., 12/25)
   - CVV: Any 3 digits (e.g., 123)

---

### Step 3: Run a Test Payment

1. **Fill in the form** (or use defaults)
2. **Click "Test Payment ₹1"** button
3. **Razorpay modal opens**
4. **Select payment method** (Card, UPI, etc.)
5. **Use test card details**:
   - Card: 4111 1111 1111 1111
   - Expiry: 12/25
   - CVV: 123
   - Name: Any name
6. **Complete payment**
7. **See success message** with Payment ID

---

## 📋 WHAT TO EXPECT

### If Everything Works ✅

```
Configuration:
  ✅ Razorpay Key: Configured
  ✅ Script Loaded: Yes
  ✅ Domain: www.gvplacements.com
  ✅ Protocol: https

Payment Result:
  ✅ Payment Successful!
  Payment ID: pay_XXXXXXXXXXXXX
  Order ID: order_XXXXXXXXXXXXX
  Signature: XXXXXXXXXXXXX
```

### If Domain Not Registered ❌

```
Error: Payment blocked as website does not match registered website(s)

Solution:
1. Go to: https://dashboard.razorpay.com
2. Settings → Website & App Settings
3. Add Domain: www.gvplacements.com
4. Add Domain: gvplacements.com
5. Verify via email
6. Wait for approval (24-48 hours)
```

### If Script Not Loaded ❌

```
Error: Razorpay script not loaded

Solution:
1. Check internet connection
2. Refresh the page
3. Check browser console for errors
4. Try in incognito mode
```

### If Invalid Key ❌

```
Error: Invalid Razorpay key

Solution:
1. Check .env.local file
2. Verify VITE_RAZORPAY_KEY is set
3. Key should start with: rzp_live_
4. Restart development server
```

---

## 🔍 TROUBLESHOOTING

### Issue: "Razorpay script not loaded"

**Causes**:
- Internet connection issue
- Razorpay CDN down
- Browser blocking script

**Solutions**:
1. Check internet connection
2. Refresh page (Ctrl+R or Cmd+R)
3. Clear browser cache (Ctrl+Shift+Delete)
4. Try in incognito mode
5. Try different browser

### Issue: "Payment blocked as website does not match"

**Causes**:
- Domain not registered in Razorpay
- Domain not verified
- Domain not approved

**Solutions**:
1. Go to Razorpay dashboard
2. Add domain to whitelist
3. Verify domain via email
4. Wait for approval (24-48 hours)

### Issue: "Invalid Razorpay key"

**Causes**:
- Wrong key in .env.local
- Key not set
- Key expired

**Solutions**:
1. Check .env.local file
2. Verify key: rzp_live_SMj9EQLZSXaW4g
3. Restart development server
4. Check Razorpay dashboard for correct key

### Issue: "CORS error"

**Causes**:
- Domain not in CORS whitelist
- Backend not configured

**Solutions**:
1. Check Razorpay CORS settings
2. Add domain to whitelist
3. Check backend CORS configuration

---

## 📊 TEST SCENARIOS

### Scenario 1: Test with ₹1

**Purpose**: Verify payment flow works

**Steps**:
1. Go to: /razorpay-test
2. Amount: ₹1
3. Click "Test Payment ₹1"
4. Complete payment
5. See success message

**Expected Result**: ✅ Payment successful

---

### Scenario 2: Test with Different Amount

**Purpose**: Verify amount calculation

**Steps**:
1. Go to: /razorpay-test
2. Amount: ₹100
3. Click "Test Payment ₹100"
4. Complete payment
5. Verify amount charged

**Expected Result**: ✅ ₹100 charged

---

### Scenario 3: Test with Custom Details

**Purpose**: Verify prefill works

**Steps**:
1. Go to: /razorpay-test
2. Name: Your Name
3. Email: your@email.com
4. Phone: 9876543210
5. Click "Test Payment"
6. Check prefilled details in modal

**Expected Result**: ✅ Details prefilled in Razorpay modal

---

### Scenario 4: Test Payment Cancellation

**Purpose**: Verify error handling

**Steps**:
1. Go to: /razorpay-test
2. Click "Test Payment"
3. Close modal without paying
4. See error message

**Expected Result**: ✅ Error message: "Payment cancelled by user"

---

## ✅ VERIFICATION CHECKLIST

After testing, verify:

- [ ] Razorpay key is configured
- [ ] Script is loaded
- [ ] Domain is correct
- [ ] Protocol is HTTPS
- [ ] Payment modal opens
- [ ] Test card works
- [ ] Payment succeeds
- [ ] Payment ID is returned
- [ ] Success message displays
- [ ] Error handling works

---

## 🎯 NEXT STEPS

### If Test Successful ✅

1. Domain is registered in Razorpay
2. Payment integration is working
3. Ready for live payments
4. Change amount from ₹1 to actual value
5. Start accepting payments

### If Test Failed ❌

1. Check error message
2. Follow troubleshooting steps
3. Add domain to Razorpay if needed
4. Wait for verification/approval
5. Test again

---

## 📞 SUPPORT

### Razorpay Support
- Dashboard: https://dashboard.razorpay.com
- Support: https://razorpay.com/support
- Email: support@razorpay.com

### Your Website
- Test Page: https://www.gvplacements.com/razorpay-test
- Website: https://www.gvplacements.com
- Admin: Click "Admin" button (password: Gravity!)#8)

---

## 💡 TIPS

1. **Use Test Card**: Always use 4111 1111 1111 1111 for testing
2. **Any Expiry**: Use any future date (e.g., 12/25)
3. **Any CVV**: Use any 3 digits (e.g., 123)
4. **Any Name**: Use any name for cardholder
5. **Multiple Tests**: You can test multiple times
6. **No Charges**: Test payments don't charge your account

---

## 🚀 READY TO TEST?

1. Go to: https://www.gvplacements.com/razorpay-test
2. Fill in test details
3. Click "Test Payment"
4. Use test card: 4111 1111 1111 1111
5. Complete payment
6. See success message

**That's it! Your Razorpay integration is working!**

---

**Last Updated**: April 9, 2025  
**Status**: Test Page Ready  
**Test URL**: https://www.gvplacements.com/razorpay-test

