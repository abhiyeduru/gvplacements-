# Razorpay Domain Whitelist Fix

## Problem
Payment is blocked with error: "Payment blocked as website does not match registered website(s)"

## Root Cause
You're accessing the site from `gravi-multiple.web.app` but Razorpay is only configured for `www.gvplacements.com`.

## Solution

### Step 1: Add Firebase Domain to Razorpay Whitelist

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Click **Settings** (gear icon)
3. Go to **Website & App Settings**
4. Under **Whitelisted Domains**, add:
   - `gravi-multiple.web.app`
   - `gvplacements.web.app`
   - `www.gvplacements.com`
   - `gvplacements.com`

5. Click **Save**

### Step 2: Test Payment

After adding domains, test payment on:
- https://gravi-multiple.web.app (Firebase default)
- https://gvplacements.web.app (Firebase custom site)
- https://www.gvplacements.com (Custom domain - once DNS is configured)

### Step 3: Verify Razorpay Configuration

**Current Razorpay Setup:**
- Live Key: `rzp_live_SMj9EQLZSXaW4g`
- Payment Amount: ₹1 (for testing)
- CORS: Enabled for all domains

## Domains to Whitelist in Razorpay

| Domain | Status | Purpose |
|--------|--------|---------|
| gravi-multiple.web.app | ✅ Add | Firebase default URL |
| gvplacements.web.app | ✅ Add | Firebase custom site |
| www.gvplacements.com | ✅ Add | Custom domain (primary) |
| gvplacements.com | ✅ Add | Custom domain (without www) |

## Steps to Add Domain in Razorpay

1. **Login to Razorpay Dashboard**
   - URL: https://dashboard.razorpay.com
   - Use your Razorpay account credentials

2. **Navigate to Settings**
   - Click the gear icon (⚙️) in top right
   - Select "Settings"

3. **Go to Website & App Settings**
   - Look for "Website & App Settings" section
   - Or search for "Whitelisted Domains"

4. **Add Domains**
   - Click "Add Domain" or "Add Whitelisted Domain"
   - Enter: `gravi-multiple.web.app`
   - Click "Add"
   - Repeat for other domains

5. **Save Changes**
   - Click "Save" or "Update"

## After Adding Domains

- Wait 5-10 minutes for changes to propagate
- Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
- Try payment again

## Testing Payment

### Test 1: Firebase Default URL
```
URL: https://gravi-multiple.web.app
Amount: ₹1
Expected: Payment should work
```

### Test 2: Firebase Custom Site
```
URL: https://gvplacements.web.app
Amount: ₹1
Expected: Payment should work
```

### Test 3: Custom Domain (after DNS setup)
```
URL: https://www.gvplacements.com
Amount: ₹1
Expected: Payment should work
```

## Troubleshooting

### If Payment Still Fails

1. **Check Domain Whitelist**
   - Go to Razorpay Settings
   - Verify all domains are listed
   - Check for typos

2. **Clear Cache**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - Clear cookies for the domain
   - Try in incognito/private mode

3. **Check Razorpay Key**
   - Verify live key is correct: `rzp_live_SMj9EQLZSXaW4g`
   - Check that you're using live mode (not test mode)

4. **Check CORS**
   - Backend CORS is configured for all domains
   - Payment service has proper error handling

5. **Contact Razorpay Support**
   - If issue persists, contact Razorpay support
   - Provide: Domain, Live Key, Error message

## Important Notes

- **Live Key**: `rzp_live_SMj9EQLZSXaW4g` (already configured)
- **Test Mode**: Not needed for ₹1 payment
- **Domain Matching**: Razorpay checks exact domain match
- **Subdomains**: Each subdomain must be whitelisted separately
- **HTTPS**: All domains must use HTTPS

## Quick Reference

**Razorpay Dashboard**: https://dashboard.razorpay.com  
**Settings Path**: Settings → Website & App Settings → Whitelisted Domains  
**Domains to Add**:
- gravi-multiple.web.app
- gvplacements.web.app
- www.gvplacements.com
- gvplacements.com

---

**Status**: Follow these steps to fix the payment issue  
**Time to Fix**: 5-10 minutes  
**Testing**: After adding domains, wait 5 minutes before testing
