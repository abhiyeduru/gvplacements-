# Payment Settings - Quick Reference

## 🎯 What's Fixed

Admin can now change payment amount and candidates see the updated amount on the registration form.

## 📱 How to Use

### For Admin
1. Go to Admin Dashboard (password: `Gravity!)#8`)
2. Scroll to "💰 Payment Settings"
3. Enter new amount (e.g., 5000)
4. Click "+ Add Amount"
5. Click "Select" on the new amount
6. Done! ✅

### For Candidates
1. Open registration form
2. Fill Steps 1 & 2
3. Reach Step 3 (Review & Payment)
4. See "Total Payable: ₹[amount set by admin]"
5. Click "Pay ₹[amount]"
6. Complete payment

## 🔄 How It Works

```
Admin sets amount → Saved to Firestore → 
Candidate opens form → Amount loaded → 
Step 3 shows amount → Payment processed
```

## ✅ Testing

1. **Change amount to ₹3000**
   - Admin → Payment Settings → Add 3000 → Select

2. **Open registration form**
   - Click "Register Now"
   - Go to Step 3
   - Verify shows "₹3000"

3. **Complete registration**
   - Check terms
   - Click "Pay ₹3000"
   - Razorpay charges ₹3000

## 📊 Current Setup

- **Available amounts**: ₹1, ₹100, ₹500, ₹1000, ₹2000, ₹5000
- **Active amount**: ₹2000 (default)
- **Can add custom amounts**: Yes
- **Real-time updates**: Yes

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Amount not updating | Hard refresh (Ctrl+Shift+R) |
| Shows ₹1 | Check Firestore settings exist |
| Payment fails | Check Razorpay dashboard |
| Amount not visible | Close and reopen form |

## 📝 Key Points

- ✅ Amount is dynamic (not hardcoded)
- ✅ Admin controls the amount
- ✅ Candidates see updated amount
- ✅ Payment uses correct amount
- ✅ All amounts tracked in database

## 🚀 Status

**✅ WORKING AND READY TO USE**

---

**Frontend**: http://localhost:3000
**Admin Password**: `Gravity!)#8`
**Payment Settings**: Admin Dashboard → 💰 Payment Settings
