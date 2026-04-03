# Razorpay Payment Issue - Domain Change Fix

## Problem Summary
Razorpay payments are not working after domain change from `gravi-multiple.web.app` to `gravityplacements.com`.

## Root Causes & Solutions

### 1. **Domain Whitelisting in Razorpay Dashboard** ⚠️ CRITICAL
Razorpay requires explicit domain whitelisting for security reasons.

**Steps to fix:**
1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Navigate to **Settings → Website & App Settings**
3. Add your domain to the whitelist:
   - Add: `gravityplacements.com`
   - Add: `www.gravityplacements.com`
   - Add: `*.gravityplacements.com` (if using subdomains)
4. Save changes
5. Wait 5-10 minutes for changes to propagate

### 2. **Verify Razorpay Key Configuration**
Current configuration in `.env.local`:
```
VITE_RAZORPAY_KEY=rzp_live_SMj9EQLZSXaW4g
```

**Verify this key is:**
- ✓ Live key (starts with `rzp_live_`)
- ✓ Associated with correct Razorpay account
- ✓ Not expired or revoked

### 3. **Check CORS Headers**
Razorpay script loads from `https://checkout.razorpay.com/v1/checkout.js`

**Verify in browser console:**
1. Open DevTools (F12)
2. Go to **Network** tab
3. Reload page
4. Check if `checkout.js` loads successfully (should be 200 OK)
5. If blocked, check for CORS errors in Console

### 4. **Callback URL Configuration**
If using payment verification callbacks:

1. Go to Razorpay Dashboard → **Settings → Webhooks**
2. Add webhook URL: `https://gravityplacements.com/api/payment-callback`
3. Select events: `payment.authorized`, `payment.failed`
4. Save webhook

### 5. **Test Payment Flow**

**Browser Console Debugging:**
```javascript
// Check if Razorpay is loaded
console.log(window.Razorpay); // Should not be undefined

// Check environment variable
console.log(import.meta.env.VITE_RAZORPAY_KEY); // Should show key
```

**Steps to test:**
1. Open app at `https://gravityplacements.com`
2. Click "Register Now"
3. Fill form and proceed to payment
4. Open DevTools Console (F12)
5. Look for errors related to:
   - Razorpay script loading
   - Domain/CORS issues
   - Payment initialization

### 6. **Common Error Messages & Fixes**

| Error | Cause | Fix |
|-------|-------|-----|
| "Razorpay not loaded" | Script failed to load | Check CORS, refresh page |
| "Domain not whitelisted" | Domain not in Razorpay settings | Add domain to whitelist |
| "Invalid key" | Wrong API key | Verify key in .env.local |
| "CORS error" | Cross-origin request blocked | Check Razorpay dashboard settings |
| "Payment cancelled" | User closed modal | Normal - user can retry |

### 7. **DNS & SSL Verification**

Ensure domain is properly configured:
```bash
# Check DNS resolution
nslookup gravityplacements.com

# Verify SSL certificate
curl -I https://gravityplacements.com
# Should return 200 OK with valid SSL
```

### 8. **Implementation Checklist**

- [ ] Domain added to Razorpay whitelist
- [ ] Razorpay script loads successfully (check Network tab)
- [ ] `window.Razorpay` is defined in console
- [ ] Environment variable `VITE_RAZORPAY_KEY` is correct
- [ ] No CORS errors in console
- [ ] Test payment initiated successfully
- [ ] Payment modal opens without errors
- [ ] Payment can be completed

## Quick Diagnostic Script

Add this to browser console to test:
```javascript
// Test Razorpay availability
console.log('Razorpay loaded:', !!window.Razorpay);
console.log('API Key:', import.meta.env.VITE_RAZORPAY_KEY);

// Test payment initialization
const testOptions = {
  key: import.meta.env.VITE_RAZORPAY_KEY,
  amount: 200000, // ₹2000
  currency: 'INR',
  name: 'Test',
  description: 'Test Payment',
  prefill: { name: 'Test User', email: 'test@example.com', contact: '9999999999' },
  theme: { color: '#f5a623' },
  handler: (response) => console.log('Success:', response),
  modal: { ondismiss: () => console.log('Dismissed') }
};

if (window.Razorpay) {
  console.log('Ready to test payment');
} else {
  console.error('Razorpay not loaded!');
}
```

## Next Steps

1. **Immediate**: Add domain to Razorpay whitelist
2. **Verify**: Test payment flow in browser
3. **Monitor**: Check browser console for errors
4. **Debug**: Use diagnostic script above if issues persist
5. **Contact**: If still failing, contact Razorpay support with error details

## Support Resources

- [Razorpay Documentation](https://razorpay.com/docs/)
- [Razorpay Dashboard](https://dashboard.razorpay.com)
- [Razorpay Support](https://razorpay.com/support/)
