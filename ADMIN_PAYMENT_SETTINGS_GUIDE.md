# Admin Payment Settings - Quick Guide

## 🎯 How to Change Payment Amount

### Step 1: Access Payment Settings
1. Go to Admin Dashboard
2. Enter password: `Gravity!)#8`
3. Scroll down to "💰 Payment Settings" section

### Step 2: Add or Change Amount
**To add a new amount:**
1. Enter amount in input field (e.g., 5000)
2. Click "+ Add Amount"
3. See confirmation: "₹5000 added successfully"

**To select an amount:**
1. Find the amount in the grid
2. Click "Select" button
3. See confirmation: "₹5000 set as active amount"

**To remove an amount:**
1. Find the amount in the grid
2. Click "✕" button
3. Confirm deletion
4. See confirmation: "₹5000 removed successfully"

### Step 3: Verify Amount is Active
- Look at "Current Payment Amount" section
- Shows the active amount in large gold text
- This is what candidates will pay

## 📱 What Candidates See

### On Registration Form (Step 3)
- **Registration Fee**: ₹[amount set by admin]
- **Total Payable**: ₹[amount set by admin]
- **Button**: "Pay ₹[amount] via Razorpay 🔒"

### Example
If admin sets amount to ₹5000:
- Candidates see: "Total Payable: ₹5000"
- Button shows: "Pay ₹5000 via Razorpay 🔒"
- Razorpay charges: ₹5000

## 🔄 How It Works

1. **Admin sets amount** → Saved to Firestore
2. **Candidate opens form** → Amount loaded from Firestore
3. **Candidate sees amount** → Displayed on Step 3
4. **Candidate pays** → Charged the admin-set amount
5. **Data saved** → Amount recorded in candidate profile

## 💡 Tips

- **Default amounts**: 1, 100, 500, 1000, 2000, 5000
- **Add custom amounts**: Enter any amount and click "+ Add Amount"
- **Only one active**: Only one amount can be "Selected" at a time
- **Real-time**: Changes take effect immediately for new registrations
- **Existing candidates**: Already registered candidates keep their original amount

## ⚠️ Important Notes

- Amount must be positive number
- Minimum: ₹1
- Maximum: ₹99,99,999
- Changes apply to NEW registrations only
- Existing candidates' amounts don't change

## 🧪 Testing

1. **Change amount to ₹3000**
   - Go to Payment Settings
   - Add 3000
   - Select it
   - See confirmation

2. **Open registration form**
   - Click "Register Now"
   - Go to Step 3
   - Verify shows "₹3000"

3. **Complete registration**
   - Check terms checkbox
   - Click "Pay ₹3000"
   - Razorpay charges ₹3000

4. **Verify in admin**
   - View candidate details
   - Check `paymentAmount: 3000`

## 📊 Current Settings

**Default Setup:**
- Available amounts: ₹1, ₹100, ₹500, ₹1000, ₹2000, ₹5000
- Active amount: ₹2000
- Note: "This amount will be charged when candidates complete registration"

## 🚀 Common Tasks

### Change from ₹2000 to ₹5000
1. Go to Payment Settings
2. Click "Select" on ₹5000
3. Done! New candidates pay ₹5000

### Add custom amount ₹3500
1. Enter "3500" in input field
2. Click "+ Add Amount"
3. Click "Select" on ₹3500
4. Done! New candidates pay ₹3500

### Remove an amount
1. Find amount in grid
2. Click "✕" button
3. Confirm deletion
4. Done!

## ✅ Verification Checklist

- [ ] Amount changed in Payment Settings
- [ ] Confirmation message appeared
- [ ] "Current Payment Amount" shows new amount
- [ ] Opened new registration form
- [ ] Step 3 shows new amount
- [ ] Payment button shows new amount
- [ ] Completed test registration
- [ ] Verified amount in candidate details

---

**Status**: ✅ WORKING AND READY TO USE

**Key Features**:
- ✅ Admin can change payment amount
- ✅ Amount saved to Firestore
- ✅ Candidates see updated amount
- ✅ Payment processed with correct amount
- ✅ All amounts tracked in database
