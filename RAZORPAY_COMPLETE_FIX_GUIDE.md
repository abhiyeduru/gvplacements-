# Razorpay Domain Mismatch - Complete Fix Guide

## Problem Summary
- Error: "Payment blocked as website does not match registered website(s)"
- Primary domain: https://www.gvplacements.com
- Issue: Domain not properly registered in Razorpay dashboard

## Root Causes
1. Domain not added to Razorpay whitelist
2. Domain under review status
3. Possible domain mismatch in payment initiation
4. Firebase preview URLs being used instead of custom domain

---

## STEP 1: Register Domain in Razorpay Dashboard

### Action Items:
1. **Login to Razorpay Dashboard**
   - URL: https://dashboard.razorpay.com
   - Use your Razorpay account credentials

2. **Navigate to Settings**
   - Click gear icon (⚙️) in top right
   - Select "Settings"

3. **Go to Website & App Settings**
   - Look for "Website & App Settings" section
   - Find "Whitelisted Domains" or "Website Verification"

4. **Add Both Domain Variants**
   ```
   Domain 1: www.gvplacements.com
   Domain 2: gvplacements.com
   ```

5. **Verify Domain Ownership**
   - Razorpay may ask for verification
   - Add DNS TXT record if required
   - Or upload verification file to root directory

6. **Save and Wait for Approval**
   - Status should change from "Under Review" to "Verified"
   - This typically takes 24-48 hours

---

## STEP 2: Verify Razorpay API Key

### Check Your Live Key:
```
Current Live Key: rzp_live_SMj9EQLZSXaW4g
```

### Verify in Dashboard:
1. Go to Settings → API Keys
2. Confirm you have:
   - **Live Key ID**: rzp_live_SMj9EQLZSXaW4g
   - **Live Key Secret**: (should be in your secure storage)
3. Ensure you're using LIVE mode (not TEST mode)

### Important:
- Never expose the Key Secret in code
- Only Key ID is used in frontend
- Key Secret is only for backend

---

## STEP 3: Fix Frontend Integration

### Current Payment Service Check:

**File**: `src/services/paymentService.ts`

Verify it uses:
```typescript
const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY;
// Should be: rzp_live_SMj9EQLZSXaW4g
```

### Ensure No Domain Mixing:
- ✅ Only use: https://www.gvplacements.com
- ❌ Don't use: gravi-multiple.web.app (Firebase preview)
- ❌ Don't use: localhost:3000
- ❌ Don't use: IP addresses

### Payment Initiation Check:
The payment should be initiated from the correct domain only.

---

## STEP 4: Update Environment Variables

### File: `.env.local`

Verify these are set correctly:
```env
# Razorpay - Live Keys (VERIFIED)
VITE_RAZORPAY_KEY=rzp_live_SMj9EQLZSXaW4g

# Backend API - Use custom domain
VITE_API_URL=https://gvplacements.onrender.com

# Frontend domain (for reference)
# https://www.gvplacements.com
```

### File: `.env.example`

Update for documentation:
```env
VITE_RAZORPAY_KEY=rzp_live_YOUR_LIVE_KEY_HERE
VITE_API_URL=https://your-backend-url.com
```

---

## STEP 5: Ensure Website Compliance

### ✅ Required Pages (Already Added):
- [x] About Us - `/about`
- [x] Contact Us - `/contact`
- [x] Privacy Policy - `/privacy`
- [x] Refund Policy - `/refund`
- [x] Terms & Conditions - (in Step 3 modal)

### ✅ Business Information (Already Added):
- [x] Clear business name: Gravity Job Placement
- [x] Service description: Job placement assistance
- [x] Pricing: ₹1 (for testing)
- [x] Contact information
- [x] Company address

### ✅ Payment Information (Already Added):
- [x] What users are paying for
- [x] Non-refundable policy
- [x] Commission structure
- [x] No misleading content

---

## STEP 6: Deployment Verification

### Check HTTPS:
```
✅ https://www.gvplacements.com (HTTPS enabled)
✅ Firebase Hosting (SSL certificate auto-managed)
```

### Check DNS Configuration:
1. Go to your domain registrar (GoDaddy, Namecheap, etc.)
2. Verify DNS records point to Firebase:
   ```
   A Record: 199.36.158.100
   CNAME: gvplacements.firebaseapp.com
   ```

### Check Site Accessibility:
```bash
# Test from terminal
curl -I https://www.gvplacements.com
# Should return: HTTP/2 200
```

---

## STEP 7: Testing Payment Flow

### Test 1: Verify Domain in Payment
1. Open: https://www.gvplacements.com
2. Click "Register Now"
3. Fill form (use test data)
4. Click "Pay ₹1 via Razorpay"
5. Check browser console for domain in payment request

### Test 2: Check Razorpay Logs
1. Go to Razorpay Dashboard
2. Go to Transactions
3. Look for your test payment
4. Verify domain matches: www.gvplacements.com

### Test 3: Verify No Domain Mismatch
- Error should NOT appear: "Payment blocked as website does not match"
- Payment should proceed normally

---

## STEP 8: Razorpay Approval Checklist

### Before Submitting for Approval:

**Business Information:**
- [x] Business name: Gravity Job Placement
- [x] Business type: Job Placement Services
- [x] Website: https://www.gvplacements.com
- [x] Contact email: support@gvplacements.com
- [x] Phone: +91-XXXXXXXXXX
- [x] Address: Hyderabad, India

**Website Quality:**
- [x] Professional design
- [x] Mobile responsive
- [x] Fast loading (< 3 seconds)
- [x] HTTPS enabled
- [x] No broken links
- [x] No "Under Construction" pages

**Legal Compliance:**
- [x] Privacy Policy (complete)
- [x] Terms & Conditions (complete)
- [x] Refund Policy (complete)
- [x] Contact page (complete)
- [x] About Us page (complete)

**Payment Information:**
- [x] Clear pricing: ₹1
- [x] What payment is for: Registration fee
- [x] Non-refundable policy stated
- [x] No hidden charges
- [x] Commission structure explained

**Trust Signals:**
- [x] Company statistics (500+ placed, 92% success)
- [x] Professional branding
- [x] Clear communication
- [x] Contact support available
- [x] Secure payment (Razorpay)

---

## STEP 9: Submit for Razorpay Approval

### In Razorpay Dashboard:

1. **Go to Settings → Website & App Settings**
2. **Verify Domain Status**
   - Should show: "Verified" (not "Under Review")
3. **Submit for Approval**
   - Click "Submit for Approval" or similar button
   - Razorpay will review your website
   - Approval typically takes 24-48 hours

### What Razorpay Checks:
- Domain ownership verification
- Website content and legitimacy
- Business information accuracy
- Payment flow security
- Compliance with policies

---

## STEP 10: After Approval

### Once Approved:
1. ✅ Domain status changes to "Approved"
2. ✅ Payments work without domain mismatch errors
3. ✅ Live transactions are processed
4. ✅ Payment receipts are generated

### Monitor:
- Check Razorpay dashboard regularly
- Monitor transaction logs
- Verify payment success rates
- Keep compliance pages updated

---

## Troubleshooting

### If Payment Still Fails:

**Error: "Payment blocked as website does not match"**
- [ ] Verify domain is in Razorpay whitelist
- [ ] Check domain status is "Verified"
- [ ] Clear browser cache (Ctrl+Shift+Delete)
- [ ] Try incognito/private mode
- [ ] Wait 5-10 minutes for changes to propagate

**Error: "Invalid API Key"**
- [ ] Verify VITE_RAZORPAY_KEY in .env.local
- [ ] Check key is correct: rzp_live_SMj9EQLZSXaW4g
- [ ] Ensure using LIVE key (not TEST key)
- [ ] Rebuild frontend: npm run build

**Error: "Domain not verified"**
- [ ] Go to Razorpay Settings
- [ ] Check domain verification status
- [ ] Complete any pending verification steps
- [ ] Wait for Razorpay approval (24-48 hours)

**Payment works but no confirmation:**
- [ ] Check backend is running
- [ ] Verify Firebase Firestore is accessible
- [ ] Check browser console for errors
- [ ] Verify payment ID is being saved

---

## Quick Reference

### Razorpay Dashboard:
- **URL**: https://dashboard.razorpay.com
- **Settings Path**: Settings → Website & App Settings
- **Domains to Add**: 
  - www.gvplacements.com
  - gvplacements.com

### Your Website:
- **Primary URL**: https://www.gvplacements.com
- **Backend**: https://gvplacements.onrender.com
- **Admin**: Click "Admin" button, password: Gravity!)#8

### API Keys:
- **Live Key**: rzp_live_SMj9EQLZSXaW4g
- **Environment**: .env.local

### Support:
- **Razorpay Support**: https://razorpay.com/support
- **Email**: support@razorpay.com

---

## Timeline

| Step | Action | Time |
|------|--------|------|
| 1 | Add domain to Razorpay | 5 min |
| 2 | Verify domain ownership | 5-10 min |
| 3 | Wait for Razorpay verification | 24-48 hours |
| 4 | Test payment flow | 5 min |
| 5 | Submit for approval | 5 min |
| 6 | Wait for approval | 24-48 hours |
| 7 | Start accepting payments | Immediate |

---

## Final Checklist

Before considering this complete:

- [ ] Domain added to Razorpay whitelist
- [ ] Domain status is "Verified"
- [ ] Razorpay API key is correct
- [ ] Frontend uses correct domain only
- [ ] All compliance pages are live
- [ ] HTTPS is enabled
- [ ] DNS is correctly configured
- [ ] Test payment works without domain error
- [ ] Payment confirmation is received
- [ ] Razorpay approval is obtained
- [ ] Live payments are being processed

---

**Status**: Ready for Razorpay approval  
**Last Updated**: April 2025  
**Next Action**: Add domain to Razorpay dashboard
