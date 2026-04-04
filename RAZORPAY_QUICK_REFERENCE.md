# Razorpay Domain Mismatch - Quick Reference Card

## The Problem
```
Error: "Payment blocked as website does not match registered website(s)"
```

## The Solution (3 Steps)

### Step 1: Add Domain to Razorpay
```
1. Go to: https://dashboard.razorpay.com
2. Settings → Website & App Settings
3. Add: www.gvplacements.com
4. Add: gvplacements.com
5. Verify domain (DNS or file)
6. Save
```

### Step 2: Wait for Verification
```
Status: Under Review → Verified
Time: 24-48 hours
```

### Step 3: Test & Submit
```
1. Test payment at: https://www.gvplacements.com
2. Payment should work
3. Submit for approval
4. Wait: 24-48 hours
```

---

## Your Setup

| Component | Value | Status |
|-----------|-------|--------|
| Website | https://www.gvplacements.com | ✅ Live |
| Backend | https://gvplacements.onrender.com | ✅ Running |
| Razorpay Key | rzp_live_SMj9EQLZSXaW4g | ✅ Correct |
| Payment Amount | ₹1 | ✅ Set |
| Compliance Pages | All 5 pages | ✅ Complete |
| HTTPS | Enabled | ✅ Yes |
| Domain in Razorpay | www.gvplacements.com | ❌ Pending |

---

## Razorpay Dashboard Path

```
https://dashboard.razorpay.com
    ↓
Settings (⚙️)
    ↓
Website & App Settings
    ↓
Whitelisted Domains
    ↓
Add Domain
    ↓
www.gvplacements.com
    ↓
Verify
    ↓
Save
```

---

## What to Add

```
Domain 1: www.gvplacements.com
Domain 2: gvplacements.com
```

---

## Verification Methods

### Method 1: DNS (Recommended)
```
Add TXT record to your domain:
Name: _acme-challenge.www.gvplacements.com
Value: [code from Razorpay]
TTL: 3600
```

### Method 2: File Upload
```
Upload file to:
https://www.gvplacements.com/verification-file.txt
```

---

## Testing Payment

```
1. Open: https://www.gvplacements.com
2. Click: Register Now
3. Fill: Test data
4. Click: Pay ₹1 via Razorpay
5. Expected: Payment modal opens
6. Error should NOT appear
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Domain verification fails | Wait 24 hours, try again |
| Payment still shows error | Clear cache, try incognito |
| Approval rejected | Check email, fix issues, resubmit |
| No confirmation | Check backend, verify Firestore |

---

## Important

✅ Use ONLY: https://www.gvplacements.com  
❌ Don't use: gravi-multiple.web.app  
❌ Don't use: localhost  
❌ Don't use: IP addresses  

---

## Timeline

| Step | Time |
|------|------|
| Add domain | 5 min |
| Verify domain | 24-48 hrs |
| Test payment | 5 min |
| Submit approval | 5 min |
| Get approval | 24-48 hrs |
| **Total** | **48-72 hrs** |

---

## Contact

- **Razorpay**: https://dashboard.razorpay.com
- **Your Site**: https://www.gvplacements.com
- **Admin**: Click "Admin" button
- **Password**: Gravity!)#8

---

## Next Action

**GO TO RAZORPAY DASHBOARD AND ADD YOUR DOMAIN NOW!**

https://dashboard.razorpay.com → Settings → Website & App Settings → Add Domain

---

**Status**: Ready to implement  
**Time to Fix**: 5 minutes  
**Time to Approval**: 48-72 hours
