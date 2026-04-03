# Razorpay Payment - Quick Fix Guide

## 🎯 Do This First (5 minutes)

### 1. Access Diagnostic Tool
```
https://gravityplacements.com/razorpay-diagnostic
```

### 2. Run Diagnostics
- Click "🔍 Run Diagnostics"
- Check for ❌ FAIL results
- Fix any failures (see below)

### 3. Test Payment
- Click "💳 Test Payment Modal"
- If modal opens → ✅ Working
- If modal doesn't open → See troubleshooting

---

## 🔴 Most Common Issues & Instant Fixes

### Issue: "Razorpay not loaded"
**Fix:** Hard refresh browser
```
Windows: Ctrl + Shift + R
Mac: Cmd + Shift + R
```

### Issue: "Domain not whitelisted"
**Fix:** Add domain to Razorpay
1. Go to https://dashboard.razorpay.com
2. Settings → Website & App Settings
3. Add: `gravityplacements.com`
4. Add: `www.gravityplacements.com`
5. Save and wait 5-10 minutes

### Issue: "Invalid key"
**Fix:** Verify API key in `.env.local`
```
VITE_RAZORPAY_KEY=rzp_live_SMj9EQLZSXaW4g
```
- Must start with `rzp_live_` (not `rzp_test_`)
- Must not be empty
- Rebuild: `npm run build && firebase deploy`

### Issue: CORS Error
**Fix:** Ensure HTTPS
- Access at: `https://gravityplacements.com` (not `http://`)
- Check SSL certificate is valid
- Verify domain in Razorpay whitelist

### Issue: Payment Modal Opens But Fails
**Fix:** Check Razorpay account
1. Go to https://dashboard.razorpay.com
2. Verify account is active
3. Check payment methods are enabled
4. Test with small amount (₹1)

---

## 🧪 Quick Test (2 minutes)

1. Open DevTools: `F12`
2. Go to Console tab
3. Paste this:
```javascript
console.log({
  razorpayLoaded: !!window.Razorpay,
  apiKey: import.meta.env.VITE_RAZORPAY_KEY?.substring(0, 10) + '...',
  domain: window.location.hostname,
  protocol: window.location.protocol
});
```
4. Check output:
   - `razorpayLoaded: true` ✅
   - `apiKey: rzp_live_...` ✅
   - `domain: gravityplacements.com` ✅
   - `protocol: https:` ✅

---

## 📋 Checklist Before Contacting Support

- [ ] Ran diagnostic tool
- [ ] Hard refreshed browser
- [ ] Added domain to Razorpay whitelist
- [ ] Verified API key in `.env.local`
- [ ] Checked browser console for errors
- [ ] Tested with diagnostic tool
- [ ] Verified HTTPS is working
- [ ] Checked Razorpay account is active

---

## 🆘 If Still Not Working

1. **Collect error details:**
   - Screenshot of error
   - Browser console errors (F12 → Console)
   - Diagnostic tool results

2. **Contact Razorpay:**
   - https://razorpay.com/support/
   - Include: domain, error, diagnostic results

3. **Check Status:**
   - https://status.razorpay.com
   - Verify no incidents

---

## 📞 Key Links

| Resource | URL |
|----------|-----|
| Diagnostic Tool | https://gravityplacements.com/razorpay-diagnostic |
| Razorpay Dashboard | https://dashboard.razorpay.com |
| Razorpay Support | https://razorpay.com/support/ |
| Razorpay Status | https://status.razorpay.com |
| Full Guide | RAZORPAY_TROUBLESHOOTING_GUIDE.md |

---

## 💡 Pro Tips

1. **Always use HTTPS** - Razorpay requires secure connection
2. **Whitelist both domains** - Add both `gravityplacements.com` and `www.gravityplacements.com`
3. **Use live keys** - Test keys won't work in production
4. **Clear cache** - Browser cache can cause issues
5. **Check network** - Ensure stable internet connection
6. **Test small amounts** - Start with ₹1 to verify setup

---

## ✅ Success Checklist

When working correctly:
- ✅ Diagnostic tool shows all checks passing
- ✅ Payment modal opens without errors
- ✅ Can enter payment details
- ✅ Payment processes successfully
- ✅ Success screen appears
- ✅ Data saved to Firestore
- ✅ PDF generated
- ✅ Notifications sent
