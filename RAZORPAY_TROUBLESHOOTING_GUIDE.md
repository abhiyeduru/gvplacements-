# Razorpay Payment Integration - Complete Troubleshooting Guide

## 🚀 Quick Start - What to Do Now

### Step 1: Access the Diagnostic Tool
1. Open your app at `https://gravityplacements.com/razorpay-diagnostic`
2. Click "🔍 Run Diagnostics"
3. Review the results

### Step 2: Fix Issues Based on Results
- **❌ FAIL**: Razorpay Script Loaded → See "Script Loading Issues" below
- **❌ FAIL**: API Key Configured → Check `.env.local` file
- **⚠️ WARNING**: Domain Configuration → See "Domain Whitelisting" below

### Step 3: Test Payment Flow
1. Click "💳 Test Payment Modal" in diagnostic tool
2. If modal opens → Payment system is working
3. If modal doesn't open → Check browser console (F12) for errors

---

## 🔧 Common Issues & Solutions

### Issue 1: "Razorpay not loaded" Error

**Symptoms:**
- Error message: "Razorpay not loaded. Please refresh the page."
- Browser console shows: `window.Razorpay is undefined`

**Causes:**
1. Razorpay script failed to load from CDN
2. CORS/CSP (Content Security Policy) blocking the script
3. Network connectivity issue

**Solutions:**

**A. Check if script is loading:**
1. Open DevTools (F12)
2. Go to **Network** tab
3. Reload page
4. Search for "checkout.razorpay"
5. Check if it shows **200 OK** (green)

**B. If script shows 404 or blocked:**
- Check your firewall/proxy settings
- Try accessing `https://checkout.razorpay.com/v1/checkout.js` directly in browser
- If blocked, contact your ISP or network admin

**C. If script shows 200 but still not loading:**
- Check **Console** tab for errors
- Look for CORS errors or CSP violations
- Try hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

---

### Issue 2: "Domain not whitelisted" Error

**Symptoms:**
- Error message: "Domain not whitelisted in Razorpay"
- Payment modal doesn't open
- Browser console shows domain-related errors

**Root Cause:**
Razorpay requires explicit domain whitelisting for security.

**Solution - Add Domain to Razorpay:**

1. **Login to Razorpay Dashboard:**
   - Go to https://dashboard.razorpay.com
   - Login with your credentials

2. **Navigate to Settings:**
   - Click **Settings** (gear icon)
   - Select **Website & App Settings**

3. **Add Your Domain:**
   - Find "Allowed Domains" or "Whitelisted Domains" section
   - Add these domains:
     ```
     gravityplacements.com
     www.gravityplacements.com
     *.gravityplacements.com
     ```
   - Click **Save** or **Add**

4. **Wait for Propagation:**
   - Changes take 5-10 minutes to propagate
   - Clear browser cache: `Ctrl+Shift+Delete` (Windows) or `Cmd+Shift+Delete` (Mac)
   - Reload page and test again

---

### Issue 3: "Invalid key" or "Key not found" Error

**Symptoms:**
- Error message: "Invalid Razorpay key"
- Payment modal shows error about authentication

**Causes:**
1. Wrong API key in `.env.local`
2. Using test key instead of live key
3. Key is expired or revoked

**Solution:**

1. **Verify API Key:**
   - Open `.env.local` file
   - Check: `VITE_RAZORPAY_KEY=rzp_live_SMj9EQLZSXaW4g`
   - Key should start with `rzp_live_` (not `rzp_test_`)

2. **Get Correct Key from Razorpay:**
   - Go to https://dashboard.razorpay.com
   - Click **Settings** → **API Keys**
   - Copy the **Key ID** (starts with `rzp_live_`)
   - Update `.env.local`:
     ```
     VITE_RAZORPAY_KEY=your_new_key_here
     ```

3. **Rebuild and Redeploy:**
   ```bash
   npm run build
   firebase deploy
   ```

---

### Issue 4: CORS Error

**Symptoms:**
- Browser console shows: "CORS error" or "Cross-Origin Request Blocked"
- Payment modal doesn't open
- Network tab shows red X on checkout.razorpay request

**Causes:**
1. Domain not properly configured in Razorpay
2. Browser security policy blocking cross-origin requests
3. SSL certificate issues

**Solutions:**

**A. Check Razorpay Domain Settings:**
- Follow "Issue 2" solution above
- Ensure domain is properly whitelisted

**B. Verify HTTPS/SSL:**
- Your domain must use HTTPS (not HTTP)
- Check: `https://gravityplacements.com` (not `http://`)
- Verify SSL certificate is valid

**C. Check Browser Console:**
1. Open DevTools (F12)
2. Go to **Console** tab
3. Look for specific CORS error message
4. Copy error and search Razorpay docs

---

### Issue 5: Payment Modal Opens But Payment Fails

**Symptoms:**
- Modal opens successfully
- User enters payment details
- Payment fails with error message

**Causes:**
1. Razorpay account not properly configured
2. Payment gateway not activated
3. Amount is too low or too high
4. Network connectivity issue during payment

**Solutions:**

1. **Check Razorpay Account Status:**
   - Go to https://dashboard.razorpay.com
   - Check if account is active and verified
   - Verify payment methods are enabled

2. **Check Payment Amount:**
   - Minimum amount: ₹1 (1 paise)
   - Maximum amount: ₹99,99,999 (99.99 lakh)
   - Current amount: ₹2000 (should be fine)

3. **Test with Small Amount:**
   - Use diagnostic tool to test with ₹1
   - If ₹1 works, issue is with amount
   - If ₹1 fails, issue is with account/key

4. **Check Network Connection:**
   - Ensure stable internet connection
   - Try from different network (mobile hotspot)
   - Check if Razorpay servers are up: https://status.razorpay.com

---

## 🧪 Testing Checklist

Use this checklist to verify everything is working:

- [ ] **Script Loading**
  - [ ] Open DevTools (F12)
  - [ ] Go to Network tab
  - [ ] Reload page
  - [ ] Search for "checkout.razorpay"
  - [ ] Verify it shows 200 OK

- [ ] **API Key**
  - [ ] Open `.env.local`
  - [ ] Verify `VITE_RAZORPAY_KEY` is set
  - [ ] Key starts with `rzp_live_`
  - [ ] Key is not empty

- [ ] **Domain Whitelisting**
  - [ ] Go to Razorpay Dashboard
  - [ ] Check Settings → Website & App Settings
  - [ ] Verify `gravityplacements.com` is listed
  - [ ] Verify `www.gravityplacements.com` is listed

- [ ] **HTTPS/SSL**
  - [ ] App is accessible at `https://gravityplacements.com`
  - [ ] No SSL certificate warnings
  - [ ] Browser shows padlock icon

- [ ] **Diagnostic Tool**
  - [ ] Access `/razorpay-diagnostic`
  - [ ] Run diagnostics
  - [ ] All checks show ✅ PASS or ⚠️ MANUAL CHECK
  - [ ] No ❌ FAIL results

- [ ] **Payment Modal**
  - [ ] Click "Test Payment Modal" in diagnostic
  - [ ] Modal opens without errors
  - [ ] Can see payment form

- [ ] **Full Registration Flow**
  - [ ] Fill registration form
  - [ ] Proceed to payment step
  - [ ] Click "Complete Payment"
  - [ ] Payment modal opens
  - [ ] Can complete payment

---

## 🔍 Advanced Debugging

### Browser Console Commands

Open DevTools (F12) → Console tab and run:

```javascript
// Check Razorpay availability
console.log('Razorpay loaded:', !!window.Razorpay);

// Check API key
console.log('API Key:', import.meta.env.VITE_RAZORPAY_KEY);

// Check domain
console.log('Current domain:', window.location.hostname);

// Check protocol
console.log('Protocol:', window.location.protocol);

// Full diagnostic
console.log({
  razorpayLoaded: !!window.Razorpay,
  apiKey: import.meta.env.VITE_RAZORPAY_KEY?.substring(0, 10) + '...',
  domain: window.location.hostname,
  protocol: window.location.protocol,
  userAgent: navigator.userAgent.substring(0, 50)
});
```

### Network Tab Analysis

1. Open DevTools (F12)
2. Go to **Network** tab
3. Reload page
4. Look for these requests:
   - `checkout.razorpay.com/v1/checkout.js` → Should be **200 OK**
   - Any payment-related requests → Should be **200 OK**
5. If any show **403 Forbidden** or **CORS error**:
   - Right-click → Copy as cURL
   - Check error details
   - Compare with Razorpay documentation

### Local Testing

If you want to test locally before deploying:

1. Update `.env.local`:
   ```
   VITE_RAZORPAY_KEY=rzp_test_YOUR_TEST_KEY
   ```

2. Add `localhost` to Razorpay whitelist:
   - Razorpay Dashboard → Settings → Website & App Settings
   - Add: `localhost`
   - Add: `127.0.0.1`

3. Run locally:
   ```bash
   npm run dev
   ```

4. Access at `http://localhost:5173`

5. Test payment flow

---

## 📞 Getting Help

### If You're Still Stuck:

1. **Collect Information:**
   - Screenshot of error message
   - Browser console errors (F12 → Console)
   - Network tab errors (F12 → Network)
   - Razorpay diagnostic results
   - Current domain and API key (first 10 chars only)

2. **Contact Razorpay Support:**
   - Go to https://razorpay.com/support/
   - Provide collected information
   - Include: domain, error message, steps to reproduce

3. **Check Razorpay Status:**
   - https://status.razorpay.com
   - Verify no ongoing incidents

4. **Review Razorpay Docs:**
   - https://razorpay.com/docs/
   - Search for your specific error
   - Check integration guide

---

## 📋 Configuration Summary

**Current Setup:**
- **Domain:** `gravityplacements.com`
- **API Key:** `rzp_live_SMj9EQLZSXaW4g` (live key)
- **Amount:** ₹2000
- **Currency:** INR
- **Payment Method:** Razorpay Checkout

**Files Involved:**
- `.env.local` - Environment variables
- `src/services/paymentService.ts` - Payment logic
- `src/components/RegistrationForm.tsx` - Payment trigger
- `index.html` - Razorpay script loading

**Diagnostic Tool:**
- Access at: `https://gravityplacements.com/razorpay-diagnostic`
- Tests: Script loading, API key, domain, HTTPS, browser compatibility

---

## ✅ Success Indicators

When everything is working correctly, you should see:

1. ✅ Diagnostic tool shows all checks passing
2. ✅ Payment modal opens when clicking "Complete Payment"
3. ✅ Can enter payment details in modal
4. ✅ Payment processes successfully
5. ✅ Success screen appears after payment
6. ✅ Candidate data saved to Firestore
7. ✅ PDF generated and available for download
8. ✅ Email/WhatsApp notifications sent

---

## 🚨 Emergency Contacts

- **Razorpay Support:** https://razorpay.com/support/
- **Razorpay Status:** https://status.razorpay.com
- **Razorpay Docs:** https://razorpay.com/docs/
- **Your Admin:** Check admin dashboard for payment settings
