# Updated Features - Gravity Job Assistance Platform

## New Form Fields Added

### Step 1: Personal Information (Enhanced)
The registration form now collects comprehensive candidate information:

**Basic Details:**
- Full Name
- Father's Name
- Phone Number (10 digits)
- Email Address

**Identity & Documents:**
- PAN Card (10 characters, auto-uppercase)
- Aadhar Number (12 digits, auto-formatted)

**Personal Information:**
- Date of Birth (date picker)
- Gender (Male/Female/Other)
- Qualification (10th Pass to PhD)
- Years of Experience (Fresher to 10+ years)

**Career:**
- Desired Job Position (10+ positions available)

### Step 2: Address & Documents
- Current Address
- Permanent Address (optional)
- Resume Upload (PDF, DOC, DOCX)
- PAN Card Upload (PDF, JPG, PNG)
- Additional Notes

### Step 3: Review & Payment
- Complete review of all entered information
- Payment summary (₹1,000)
- Terms & Conditions acceptance
- Razorpay payment integration

## Admin Dashboard Enhancements

### New Features:
1. **Seed Database Button** - Add 5 dummy candidates for testing
   - Located in the sidebar under filters
   - Button: "🌱 Add Demo Data"
   - Creates realistic test data with various statuses

### Dummy Data Included:
1. **Rajesh Kumar** - Software Engineer (Confirmed)
2. **Priya Singh** - Data Analyst (Placed)
3. **Amit Patel** - Marketing Executive (Registered)
4. **Neha Sharma** - Graphic Designer (Confirmed)
5. **Vikram Desai** - Business Development (Placed)

Each dummy candidate includes:
- Complete personal information
- PAN and Aadhar numbers
- Date of birth and qualification
- Experience level
- Payment status (all successful)
- Different registration statuses for testing

## Database Schema Update

### CandidateData Interface:
```typescript
{
  id?: string;
  name: string;
  fatherName: string;
  phone: string;
  email: string;
  position: string;
  currentAddress: string;
  permanentAddress: string;
  pan: string;              // NEW
  aadhar: string;           // NEW
  dob: string;              // NEW
  gender: string;           // NEW
  qualification: string;    // NEW
  experience: string;       // NEW
  notes?: string;
  resumeUrl?: string;
  panUrl?: string;
  paymentStatus: 'pending' | 'success' | 'failed';
  paymentId?: string;
  paymentAmount: number;
  status: 'registered' | 'confirmed' | 'placed';
  createdAt: string;
}
```

## How to Use

### Testing the Registration Form:
1. Click "Register Now" on the homepage
2. Fill in all Step 1 fields (including new PAN/Aadhar fields)
3. Proceed to Step 2 (address and documents)
4. Review all information in Step 3
5. Complete payment via Razorpay

### Testing with Dummy Data:
1. Access Admin Dashboard (password: `Gravity!)#8`)
2. Click "🌱 Add Demo Data" button in the sidebar
3. Wait for seeding to complete
4. View 5 dummy candidates in the table
5. Click "View" to see detailed candidate information
6. Update candidate status as needed

### Firebase Rate Limiting:
If you see 429 or 400 errors:
- These are Firebase rate limiting errors
- The app gracefully falls back to demo mode
- Dummy data helps test without hitting rate limits
- Wait a few moments before retrying

## Testing Scenarios

### Scenario 1: New Registration
1. Fill complete form with all new fields
2. Upload resume and PAN card
3. Complete payment
4. Verify data appears in admin dashboard

### Scenario 2: Admin Management
1. View dummy candidates
2. Filter by payment status
3. Search by name/email/phone
4. Update candidate status (Registered → Confirmed → Placed)
5. View detailed candidate information

### Scenario 3: Data Verification
1. Check that all new fields are displayed in Step 3 review
2. Verify PAN auto-uppercase works
3. Verify Aadhar auto-formatting works
4. Confirm all data saves to Firestore

## Notes
- All dummy data has realistic Indian names and addresses
- Payment IDs are demo values (pay_demo_001, etc.)
- Timestamps are spread across different dates for realistic testing
- All dummy candidates have successful payment status
- Different registration statuses for comprehensive testing
