# Razorpay Live Payment Setup - Collect Real Money

## Current Status
- ✅ Test key configured (for development)
- ❌ Live key not active (for production)
- ❌ Domain not whitelisted for live payments

## What You Need to Do

### Step 1: Switch to Live Key

1. Update `.env.local`:
```
VITE_RAZORPAY_KEY=rzp_live_SMj9EQLZSXaW4g
```

2. Rebuild:
```bash
npm run build
firebase deploy --only hosting
```

### Step 2: Whitelist Your Domain in Razorpay

1. Go to: https://dashboard.razorpay.com/app/settings/keys
2. Scroll to **Whitelisted Domains**
3. Add your domain:
   - `www.gvplacements.com`
   - `gvplacements.com`
   - `gvplacements.web.app`
   - `gravi-multiple.web.app`

4. Click **Save**
5. Wait 5-10 minutes for changes to propagate

### Step 3: Verify Live Key Configuration

1. Go to: https://dashboard.razorpay.com/app/keys
2. Check **Key ID**: `rzp_live_SMj9EQLZSXaW4g`
3. Check **Key Secret**: `WFzMF69I6ababNYiOcGfxXlc`
4. Ensure **Status**: Active ✓

### Step 4: Test Live Payment

1. Go to: https://www.gvplacements.com
2. Click "Register Now"
3. Fill the form
4. Click "Pay ₹1 via Razorpay"
5. Use real payment method (card, UPI, etc.)
6. Payment will be processed and money collected

## Payment Flow

```
User fills form
    ↓
Clicks "Pay ₹1"
    ↓
Razorpay modal opens
    ↓
User enters payment details
    ↓
Payment processed (real money deducted)
    ↓
Success screen shown
    ↓
Confirmation email sent
    ↓
Data saved to Firestore
```

## Important Notes

### Live Key vs Test Key

| Feature | Test Key | Live Key |
|---------|----------|----------|
| Real Money | ❌ No | ✅ Yes |
| Domain Whitelist | ❌ Not needed | ✅ Required |
| Test UPI | ✅ Works | ❌ Blocked |
| Production | ❌ No | ✅ Yes |
| Amount | Test only | Real INR |

### Payment Amount

Currently set to: **₹1**

To change:
1. Go to Admin Panel (password: `Gravity!)#8`)
2. Click "Payment Settings"
3. Enter new amount
4. Save

### Supported Payment Methods

- ✅ Credit/Debit Cards
- ✅ UPI (Google Pay, PhonePe, Paytm, etc.)
- ✅ Net Banking
- ✅ Wallets (PayTM, Amazon Pay, etc.)
- ✅ EMI options

## Troubleshooting

### "Payment blocked as website does not match registered website(s)"

**Solution**: Add domain to Razorpay whitelist (Step 2)

### "Invalid Razorpay key"

**Solution**: Verify live key is set in `.env.local` and rebuild

### Payment not going through

**Solution**: 
1. Check domain is whitelisted
2. Clear browser cache (Ctrl+Shift+Delete)
3. Try different payment method
4. Contact Razorpay support

### Money deducted but success screen not showing

**Solution**: 
1. Check browser console for errors
2. Verify Firestore rules are deployed
3. Check Firebase database for payment record

## Verification Checklist

Before going live:

- [ ] Live key configured in `.env.local`
- [ ] Domain whitelisted in Razorpay dashboard
- [ ] Rebuilt and deployed to Firebase
- [ ] Tested payment on production domain
- [ ] Received confirmation email
- [ ] Data saved in Firestore
- [ ] Admin can see payment in dashboard

## Support

**Razorpay Support**: https://razorpay.com/support
**Email**: support@gvplacements.com
**WhatsApp**: +91-XXXXXXXXXX

