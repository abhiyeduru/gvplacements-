# Razorpay Payment Link Integration

## Overview

Using Razorpay Payment Links instead of embedded checkout. This is simpler and more reliable.

## How It Works

1. **User fills registration form**
2. **Clicks "Pay ₹1 via Razorpay"**
3. **Payment link opens in new tab**: https://rzp.io/rzp/ekZO55G
4. **User completes payment**
5. **Returns to app**
6. **Success screen shown**
7. **Data saved to Firestore**

## Payment Link Details

**Link**: https://rzp.io/rzp/ekZO55G

This link is configured with:
- ✅ Amount: ₹1 (configurable)
- ✅ Currency: INR
- ✅ Description: Candidate Registration Fee
- ✅ Supported methods: Cards, UPI, Net Banking, Wallets

## Flow Diagram

```
Registration Form
    ↓
User fills details
    ↓
Clicks "Pay ₹1"
    ↓
Payment link opens (new tab)
    ↓
User pays via UPI/Card/etc
    ↓
Payment successful
    ↓
User returns to app
    ↓
/payment-return page processes
    ↓
Success screen shown
    ↓
Email/WhatsApp sent
    ↓
Data saved to Firestore
```

## Implementation Details

### Payment Service (`src/services/paymentService.ts`)

- Opens payment link in new tab
- Stores candidate data in session storage
- Monitors when payment window closes
- Triggers success callback

### Payment Return Page (`src/pages/PaymentReturn.tsx`)

- Retrieves candidate data from session storage
- Saves profile to Firestore
- Shows success screen
- Sends notifications

## Testing

### Test Payment

1. Go to: https://www.gvplacements.com
2. Click "Register Now"
3. Fill form completely
4. Click "Pay ₹1 via Razorpay"
5. Payment link opens in new tab
6. Complete payment with test card or UPI
7. Return to original tab
8. Success screen should appear

### Test Cards

- **Visa**: 4111 1111 1111 1111
- **Mastercard**: 5555 5555 5555 4444
- **Expiry**: Any future date
- **CVV**: Any 3 digits

### Test UPI

- **UPI ID**: 9182146476-3@ybl

## Advantages

✅ **Simpler**: No complex integration needed
✅ **Reliable**: Razorpay handles all payment logic
✅ **Mobile-friendly**: Works on all devices
✅ **Secure**: PCI-DSS compliant
✅ **Multiple methods**: Cards, UPI, Net Banking, Wallets
✅ **No domain issues**: Works from any domain

## Troubleshooting

### Payment link not opening

**Solution**: Check browser pop-up settings. Allow pop-ups for the domain.

### Payment completed but success screen not showing

**Solution**: 
1. Check browser console for errors
2. Verify Firestore rules are deployed
3. Try refreshing the page

### Payment link shows error

**Solution**: 
1. Check internet connection
2. Try different payment method
3. Contact Razorpay support

## Customizing Payment Link

To change the payment link:

1. Go to: https://dashboard.razorpay.com/app/payment-links
2. Create new payment link with desired amount
3. Update `RAZORPAY_PAYMENT_LINK` in `src/services/paymentService.ts`
4. Rebuild and deploy

## Current Configuration

- **Payment Link**: https://rzp.io/rzp/ekZO55G
- **Amount**: ₹1
- **Currency**: INR
- **Return URL**: https://www.gvplacements.com/payment-return

## Support

For issues with payment link:
- Razorpay Support: https://razorpay.com/support
- Email: support@gvplacements.com

