# Payment Receipt & Logo Setup Guide

## Overview
This guide explains the new payment management features added to the Gravity Job Assistance Platform:

1. **Admin Payment Settings** - Set fixed payment amounts (₹1, ₹100, ₹500, ₹1000, ₹2000, ₹5000, etc.)
2. **Payment Receipts** - Professional receipts generated after payment with logo
3. **Logo Integration** - Upload company logo that appears on receipts and throughout the app

---

## Features Added

### 1. Admin Payment Settings Panel

**Location:** Admin Dashboard → ⚙️ Payment Settings button

**Features:**
- Upload company logo (GV Consultancy logo)
- Add/remove fixed payment amounts
- Select which amount is currently active
- All settings stored in Firebase

**How to Use:**
1. Click "⚙️ Payment Settings" button in admin sidebar
2. Upload your logo in the "Company Logo" section
3. Add payment amounts in the "Fixed Payment Amounts" section
4. Click "Select" to make an amount active
5. The selected amount will be charged when candidates register

**Default Amounts:**
- ₹1
- ₹100
- ₹500
- ₹1000
- ₹2000
- ₹5000

You can add any custom amount you want.

---

### 2. Payment Receipt Generation

**When Generated:**
- Automatically created after successful payment
- Available for download on success screen

**Receipt Contents:**
- Company logo (if uploaded)
- Candidate information (name, email, phone, position)
- PAN and Aadhar numbers
- Payment ID and date
- Amount paid
- Professional formatting

**How to Access:**
1. After successful payment, click "🧾 View Receipt" button
2. Receipt displays in a modal with all details
3. Click "📥 Download Receipt PDF" to save as PDF
4. Receipt is also sent via email and WhatsApp

---

### 3. Logo Integration

**Upload Location:**
- Admin Dashboard → Payment Settings → Company Logo section

**Logo Usage:**
- Appears on payment receipts
- Can be used throughout the app
- Stored in browser localStorage
- Persists across sessions

**Supported Formats:**
- PNG, JPG, JPEG, GIF, WebP
- Recommended size: 200x150px or similar aspect ratio
- Max file size: 5MB

**How to Upload:**
1. Go to Admin Dashboard
2. Click "⚙️ Payment Settings"
3. Click "Upload Logo" in the Company Logo section
4. Select your GV Consultancy logo image
5. Logo is immediately saved and used on receipts

---

## Technical Implementation

### New Services Created

#### 1. `logoService.ts`
Manages logo storage and retrieval:
```typescript
logoService.setLogoUrl(url)      // Store logo
logoService.getLogoUrl()         // Get logo URL
logoService.clearLogoUrl()       // Remove logo
logoService.hasLogo()            // Check if logo exists
```

#### 2. `paymentSettingsService.ts`
Manages payment amounts in Firebase:
```typescript
paymentSettingsService.getSettings()        // Get all settings
paymentSettingsService.updateSettings()     // Update settings
paymentSettingsService.addAmount()          // Add new amount
paymentSettingsService.removeAmount()       // Remove amount
paymentSettingsService.setSelectedAmount()  // Set active amount
paymentSettingsService.getSelectedAmount()  // Get active amount
```

#### 3. `receiptService.ts`
Generates professional receipts:
```typescript
receiptService.generateReceiptHTML()    // Create receipt HTML
receiptService.downloadReceiptPDF()     // Download as PDF
receiptService.displayReceiptPreview()  // Show in modal
```

### New Components

#### 1. `PaymentSettings.tsx`
Admin panel for managing:
- Logo upload
- Payment amounts
- Active amount selection

#### 2. Updated `SuccessScreen.tsx`
Now includes:
- "🧾 View Receipt" button
- Receipt modal display
- PDF download functionality

### Updated Services

#### `paymentService.ts`
- Now fetches admin-set amount from Firebase
- Dynamically sets Razorpay payment amount
- Made async to support Firebase queries

#### `candidateService.ts`
- Stores `paymentDate` with candidate data
- Used for receipt generation

---

## Firebase Structure

### Collections

**`admin_settings/payment_settings`**
```json
{
  "amounts": [1, 100, 500, 1000, 2000, 5000],
  "selectedAmount": 1000,
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

**`candidates/{candidateId}`**
```json
{
  "paymentAmount": 1000,
  "paymentDate": "2024-01-15T10:30:00Z",
  "paymentId": "pay_xxxxx",
  "paymentStatus": "success",
  ...
}
```

---

## Workflow

### Admin Sets Payment Amount

1. Admin logs in to dashboard
2. Clicks "⚙️ Payment Settings"
3. Uploads company logo
4. Adds/removes payment amounts
5. Selects active amount (e.g., ₹1000)
6. Settings saved to Firebase

### Candidate Registers & Pays

1. Candidate fills registration form
2. Clicks "Complete Payment"
3. System fetches admin-set amount from Firebase
4. Razorpay opens with correct amount
5. Candidate completes payment
6. Success screen shows with receipt option

### Candidate Views Receipt

1. On success screen, clicks "🧾 View Receipt"
2. Receipt modal opens with:
   - Company logo
   - All candidate details
   - Payment information
   - Professional formatting
3. Can download as PDF
4. Receipt also sent via email/WhatsApp

---

## Admin Dashboard Changes

### Sidebar Updates

**New Button:** "⚙️ Payment Settings"
- Toggles between candidates list and settings panel
- Shows "✕ Close Settings" when active
- Blue color (#3b82f6) for distinction

### Settings Panel

**Logo Section:**
- Upload area with drag-and-drop support
- Preview of uploaded logo
- Remove button to clear logo

**Payment Amounts Section:**
- Input field to add new amounts
- Grid display of all amounts
- Select/Remove buttons for each amount
- Highlighted selected amount
- Info box showing current active amount

---

## Testing Checklist

- [ ] Upload logo in admin settings
- [ ] Logo appears on receipts
- [ ] Add new payment amount (e.g., ₹2500)
- [ ] Select different amount as active
- [ ] Complete registration with new amount
- [ ] Verify Razorpay shows correct amount
- [ ] View receipt after payment
- [ ] Download receipt as PDF
- [ ] Check receipt contains logo and all details
- [ ] Verify receipt sent via email
- [ ] Verify receipt sent via WhatsApp

---

## Troubleshooting

### Logo Not Appearing on Receipt
- Check if logo was uploaded successfully
- Verify logo URL is stored in localStorage
- Try uploading logo again

### Payment Amount Not Updating
- Verify Firebase connection
- Check if amount was saved in admin settings
- Try refreshing the page
- Check browser console for errors

### Receipt Not Generating
- Ensure all candidate data is complete
- Check if html2canvas library is loaded
- Verify jsPDF is installed
- Check browser console for errors

### Firebase Errors
- Verify Firebase credentials in `.env.local`
- Check Firestore security rules allow reads/writes
- Ensure `admin_settings` collection exists
- Check network connectivity

---

## Environment Variables

No new environment variables needed. Uses existing:
- `VITE_FIREBASE_*` - Firebase configuration
- `VITE_RAZORPAY_KEY` - Razorpay key

---

## Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Full support

---

## Performance Notes

- Logo stored in localStorage (no server upload)
- Payment settings cached in Firebase
- Receipt generation happens client-side
- PDF download is instant

---

## Security Notes

- Logo stored in browser localStorage (client-side only)
- Payment amounts controlled by admin only
- Receipts generated with candidate data
- No sensitive data exposed in receipts

---

## Future Enhancements

- Email receipt directly from admin panel
- Receipt templates customization
- Payment history export
- Bulk payment amount updates
- Receipt archival system

---

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review browser console for errors
3. Verify Firebase connection
4. Check admin settings are saved

---

**Last Updated:** April 2, 2026
**Version:** 1.0.0
