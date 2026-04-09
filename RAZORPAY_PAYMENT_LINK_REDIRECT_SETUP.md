# Razorpay Payment Link - Redirect Setup

## Problem
After payment completion, users need to be redirected back to the website to see the success screen and download PDF receipt.

## Solution
Configure the Razorpay payment link with a return URL.

## Setup Steps

### Step 1: Configure Return URL in Razorpay Dashboard

1. Go to: https://dashboard.razorpay.com/app/payment-links
2. Find your payment link: https://rzp.io/rzp/vgMJARt
3. Click **Edit** or **Settings**
4. Look for **Redirect URL** or **Callback URL** field
5. Enter this URL:
```
https://www.gvplacements.com/payment-return
```

6. **Save** the changes

### Step 2: How It Works

**Flow:**
```
1. User fills registration form
2. Clicks "Pay ₹1 via Razorpay"
3. Redirected to payment link
4. Completes payment
5. Razorpay redirects to: /payment-return
6. Success screen appears
7. User can download PDF receipt
```

### Step 3: Test the Flow

1. Go to: https://www.gvplacements.com
2. Click "Register Now"
3. Fill form completely
4. Click "Pay ₹1 via Razorpay"
5. Complete payment
6. **Should redirect to success page automatically**
7. Click "📥 Download Certificate" to get PDF

## Success Screen Features

After payment and redirect:

✅ **Registration Confirmation**
- Shows unique registration ID
- Displays candidate name
- Shows payment status

✅ **Notifications**
- Email sent confirmation
- WhatsApp sent confirmation
- Receipt generated

✅ **Download Options**
- 📥 Download Certificate (PDF)
- 🧾 View Receipt (HTML)

✅ **Next Steps**
- "Expect a call within 48 hours"
- Contact information provided

## Troubleshooting

### Not redirecting after payment

**Solution:**
1. Check Razorpay dashboard - verify return URL is set
2. Clear browser cache
3. Try different payment method
4. Check browser console for errors

### Success page shows but data not saved

**Solution:**
1. Check Firestore rules are deployed
2. Verify Firebase connection
3. Check browser console for errors
4. Try again with different payment

### PDF download not working

**Solution:**
1. Check browser pop-up settings
2. Try different browser
3. Check console for errors
4. Contact support

## URL Parameters

The return URL can include payment details:

```
https://www.gvplacements.com/payment-return?candidate=...&payment_id=...
```

The app automatically extracts and processes these parameters.

## Current Configuration

- **Payment Link**: https://rzp.io/rzp/vgMJARt
- **Return URL**: https://www.gvplacements.com/payment-return
- **Success Page**: Shows registration confirmation + PDF download
- **Notifications**: Email + WhatsApp sent automatically

## Important Notes

⚠️ **Must Configure in Razorpay Dashboard**
- The return URL must be set in Razorpay payment link settings
- Without this, users won't be redirected after payment
- Check your Razorpay dashboard to verify it's configured

✅ **Automatic Processing**
- Once redirected, the app automatically:
  - Saves candidate data to Firestore
  - Sends email notification
  - Sends WhatsApp notification
  - Generates receipt
  - Shows success screen

## Support

For issues:
- Razorpay Support: https://razorpay.com/support
- Email: support@gvplacements.com

