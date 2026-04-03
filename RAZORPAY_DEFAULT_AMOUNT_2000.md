# Razorpay Default Amount - Updated to ₹2000

## ✅ What's Been Fixed

Changed the default Razorpay payment amount from **₹1** to **₹2000** across the entire application.

## 📋 Changes Made

### 1. **Payment Settings Service** (src/services/paymentSettingsService.ts)
- **Before**: `return settings?.selectedAmount || 1;`
- **After**: `return settings?.selectedAmount || 2000;`
- **Impact**: Default fallback amount is now ₹2000

### 2. **Registration Form** (src/components/RegistrationForm.tsx)
- **Already Set**: `const [paymentAmount, setPaymentAmount] = useState(2000);`
- **Already Set**: `paymentAmount: 2000` in formData
- **Status**: ✅ Already correct

### 3. **Payment Settings Component** (src/components/admin/PaymentSettings.tsx)
- **Already Set**: `selectedAmount: 2000` in default settings
- **Status**: ✅ Already correct

## 🎯 Default Amount Flow

```
User Opens Registration Form
        ↓
RegistrationForm initializes with ₹2000
        ↓
useEffect loads amount from Firestore
        ↓
If Firestore has settings → Use that amount
If Firestore is empty → Use ₹2000 (default)
        ↓
Step 3 displays the amount
        ↓
Payment button shows "Pay ₹2000 via Razorpay"
        ↓
Razorpay charges ₹2000
```

## 📊 Amount Configuration

### Default Amounts Available
- ₹1 (for testing)
- ₹100
- ₹500
- ₹1000
- ₹2000 ⭐ (default)
- ₹5000

### Current Selected Amount
- **Default**: ₹2000
- **Can be changed by**: Admin in Payment Settings
- **Applies to**: All new registrations

## 🧪 Testing

### Test 1: Verify Default Amount
1. Open registration form
2. Go to Step 3 (Review & Payment)
3. ✅ Should show "Total Payable: ₹2000"
4. ✅ Button should show "Pay ₹2000 via Razorpay 🔒"

### Test 2: Change Amount in Admin
1. Go to Admin Dashboard (password: `Gravity!)#8`)
2. Click "💰 Payment Settings"
3. Add new amount (e.g., 5000)
4. Click "Select" on new amount
5. ✅ New registrations should use new amount

### Test 3: Verify Fallback
1. If Firestore settings are deleted
2. New registrations should still use ₹2000
3. ✅ Fallback to default works

## 💾 Firestore Configuration

When settings are saved to Firestore:
```json
{
  "admin_settings": {
    "payment_settings": {
      "amounts": [1, 100, 500, 1000, 2000, 5000],
      "selectedAmount": 2000,
      "updatedAt": "2024-04-03T10:30:00.000Z"
    }
  }
}
```

## 🔄 Backward Compatibility

- ✅ Existing registrations keep their original amount
- ✅ No database migration needed
- ✅ Admin can still change amount anytime
- ✅ Fallback to ₹2000 if settings missing

## 📝 Files Modified

1. **src/services/paymentSettingsService.ts**
   - Updated `getSelectedAmount()` fallback from 1 to 2000

## ✨ Features

- ✅ Default amount is ₹2000
- ✅ Admin can change amount anytime
- ✅ Fallback to ₹2000 if settings missing
- ✅ All new registrations use correct amount
- ✅ Payment button shows correct amount
- ✅ Razorpay charges correct amount

## 🚀 Deployment

1. **Build:**
   ```bash
   npm run build
   ```

2. **Deploy:**
   ```bash
   firebase deploy
   ```

3. **Verify:**
   - Access `https://gravityplacements.com`
   - Open registration form
   - Go to Step 3
   - Verify shows "₹2000"

## 📊 Payment Amount Summary

| Component | Amount | Status |
|-----------|--------|--------|
| Default | ₹2000 | ✅ |
| Fallback | ₹2000 | ✅ |
| Admin Can Change | Yes | ✅ |
| Razorpay Charges | ₹2000 | ✅ |
| Payment Button | "Pay ₹2000" | ✅ |

---

**Status**: ✅ COMPLETE AND READY

**Default Amount**: ₹2000
**Fallback Amount**: ₹2000
**Admin Control**: Yes
