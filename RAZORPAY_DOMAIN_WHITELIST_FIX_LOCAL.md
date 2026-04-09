# Razorpay Domain Whitelist - Local Testing Fix

## Problem
Getting "Payment blocked as website does not match registered website(s)" error on localhost.

This happens because Razorpay's live key only accepts payments from whitelisted domains.

## Solution for Local Testing

### Option 1: Use Test Key (Recommended for Development)

1. Go to: https://dashboard.razorpay.com/app/keys
2. Copy your **Test Key ID** (starts with `rzp_test_`)
3. Update `.env.local`:

```
VITE_RAZORPAY_KEY=rzp_test_SbOVFwRYtywoYr2NTvD11vNr5C9otH2G850ZuR2
```

4. Rebuild: `npm run build`
5. Test locally with test UPI: `9182146476-3@ybl`

### Option 2: Add Localhost to Razorpay Whitelist (Live Key)

If you want to use the live key on localhost:

1. Go to: https://dashboard.razorpay.com/app/settings/keys
2. Scroll to **Whitelisted Domains**
3. Add these domains:
   - `localhost:5173` (local dev)
   - `localhost:3000` (if using different port)
   - `127.0.0.1:5173`

4. Save changes
5. Restart your dev server: `npm run dev`

### Option 3: Use Production Domain for Testing

If you want to test the live key:

1. Go to: https://www.gvplacements.com
2. Click "Register Now"
3. Fill form and test payment
4. Use test UPI: `9182146476-3@ybl`

## Test UPI Details

- **UPI ID**: `9182146476-3@ybl`
- **Amount**: ₹1 (or whatever you set)
- **Status**: Will show "Payment blocked" but that's expected for test UPI on live key

## Key Differences

| Aspect | Test Key | Live Key |
|--------|----------|----------|
| Domain Whitelist | Not required | Required |
| Real Money | No | Yes |
| Test UPI | Works | Blocked |
| Production | No | Yes |

## Current Setup

- **Live Key**: `rzp_live_SMj9EQLZSXaW4g` (for production)
- **Test Key**: `rzp_test_SbOVFwRYtywoYr2NTvD11vNr5C9otH2G850ZuR2` (for development)
- **Whitelisted Domains**: 
  - www.gvplacements.com
  - gvplacements.web.app
  - gravi-multiple.web.app

## Next Steps

1. For local testing: Use test key (Option 1)
2. For production: Use live key (already configured)
3. For live key on localhost: Add domains to whitelist (Option 2)

