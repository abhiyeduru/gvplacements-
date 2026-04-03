# Data Flow Architecture

## Overview
This document explains how data flows through the Gravity Job Assistance Platform from registration to storage.

---

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    REGISTRATION FORM (Frontend)                 │
│  Step 1: Personal Info → Step 2: Documents → Step 3: Review    │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
                    ┌────────────────┐
                    │  File Upload   │
                    │  (Resume, PAN) │
                    └────────┬───────┘
                             │
                             ▼
                    ┌────────────────┐
                    │  AWS S3 Upload │
                    │  (File Storage)│
                    └────────┬───────┘
                             │
                             ▼
                    ┌────────────────────┐
                    │ Razorpay Payment   │
                    │ (Payment Gateway)  │
                    └────────┬───────────┘
                             │
                             ▼
                    ┌────────────────────────────┐
                    │ Payment Success Handler    │
                    │ (saveCandidateProfile)     │
                    └────────┬───────────────────┘
                             │
                             ▼
                    ┌────────────────────────────┐
                    │ Firestore Database         │
                    │ (candidates collection)    │
                    └────────┬───────────────────┘
                             │
                    ┌────────┴────────┐
                    │                 │
                    ▼                 ▼
            ┌──────────────┐  ┌──────────────┐
            │ PDF Generate │  │ Notifications│
            │ (Certificate)│  │ (Email/WA)   │
            └──────────────┘  └──────────────┘
                    │                 │
                    └────────┬────────┘
                             │
                             ▼
                    ┌────────────────────┐
                    │ Success Screen     │
                    │ (Download & Share) │
                    └────────────────────┘
```

---

## Detailed Data Flow

### 1. Registration Form (Frontend)
**File:** `src/components/RegistrationForm.tsx`

**Data Collected:**
- Step 1: Name, Email, Phone, PAN, Aadhar, DOB, Gender, Qualification, Experience, Job Position
- Step 2: Current Address, Permanent Address, Resume File, PAN File
- Step 3: Review all data before payment

**Data Structure:**
```typescript
interface CandidateData {
  // Personal Info
  name: string;
  fatherName: string;
  email: string;
  phone: string;
  pan: string;
  aadhar: string;
  dob: string;
  gender: string;
  qualification: string;
  experience: string;
  position: string;
  
  // Address
  currentAddress: string;
  permanentAddress: string;
  
  // Files
  resumeUrl?: string;
  panUrl?: string;
  
  // Payment
  paymentStatus: 'pending' | 'success' | 'failed';
  paymentAmount: number;
  paymentId?: string;
  
  // Status
  status: 'registered' | 'confirmed' | 'placed';
  createdAt: string;
}
```

---

### 2. File Upload to AWS S3
**File:** `src/services/s3Service.ts`

**Process:**
1. User selects resume and PAN files in Step 2
2. Files are uploaded to AWS S3 bucket: `gravity-crm-uploadsBucket`
3. S3 returns file URLs
4. URLs are stored in candidate data

**Endpoint:**
```
VPC Endpoint: https://gravity-crm-uploads-7ukoujddik4gkjrx3mk8z8fbgk4yhaps3a-s3aliasvpc.s3.amazonaws.com
```

**Demo Mode:**
- In development, file uploads are simulated
- URLs are generated as: `s3://gravity-crm-uploadsBucket/[type]/[filename]`

---

### 3. Razorpay Payment Processing
**File:** `src/services/paymentService.ts`

**Process:**
1. User clicks "Pay Now" button in Step 3
2. Razorpay modal opens with payment form
3. User enters payment details
4. Payment is processed
5. Success callback is triggered with payment ID

**Payment Details:**
- Amount: ₹1000 (configurable)
- Key: `rzp_live_SMj9EQLZSXaW4g` (live key)
- Currency: INR

**Rate Limiting:**
- 2-second cooldown between payment attempts
- Prevents "Too many requests" errors

---

### 4. Save to Firestore Database
**File:** `src/services/candidateService.ts`

**Function:** `saveCandidateProfile(data: CandidateData)`

**Process:**
1. After payment success, `saveCandidateProfile()` is called
2. Candidate data is sent to Firestore
3. Data is stored in `candidates` collection
4. Document ID is returned

**Firestore Structure:**
```
Database: gravi-multiple
Collection: candidates
Document: {auto-generated-id}
  ├── name: string
  ├── email: string
  ├── phone: string
  ├── pan: string
  ├── aadhar: string
  ├── dob: string
  ├── gender: string
  ├── qualification: string
  ├── experience: string
  ├── position: string
  ├── currentAddress: string
  ├── permanentAddress: string
  ├── resumeUrl: string
  ├── panUrl: string
  ├── paymentStatus: string
  ├── paymentAmount: number
  ├── paymentId: string
  ├── status: string
  └── createdAt: timestamp
```

**Security Rules Required:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /candidates/{document=**} {
      allow read, write: if true;  // Development
      // allow read, write: if request.auth != null;  // Production
    }
  }
}
```

---

### 5. PDF Generation
**File:** `src/services/pdfService.ts`

**Process:**
1. After data is saved to Firestore
2. PDF certificate is generated with candidate details
3. PDF is displayed on Success Screen
4. User can download the PDF

**PDF Contents:**
- Candidate name
- Registration ID
- Date of registration
- Job position applied for
- Professional certificate design

---

### 6. Email Notifications
**File:** `src/services/notificationService.ts`

**Process:**
1. After data is saved to Firestore
2. Confirmation email is sent to candidate
3. Email includes:
   - Registration confirmation
   - Candidate details
   - Next steps
   - Support contact

**Backend:** `server.js` (Express server on port 3001)

**Email Service:** SendGrid or similar (requires API key in `.env.local`)

---

### 7. WhatsApp Notifications
**File:** `src/services/notificationService.ts`

**Process:**
1. After data is saved to Firestore
2. WhatsApp message is sent to candidate
3. Message includes:
   - Registration confirmation
   - Registration ID
   - Next steps

**Backend:** `server.js` (Express server on port 3001)

**WhatsApp Service:** Twilio WhatsApp Business API (requires credentials in `.env.local`)

---

### 8. Admin Dashboard Real-Time Sync
**File:** `src/pages/AdminDashboard.tsx`

**Process:**
1. Admin logs in with password: `Gravity!)#8`
2. Dashboard sets up real-time listener to Firestore
3. `onSnapshot()` listens for changes in `candidates` collection
4. When new candidates are added, dashboard updates automatically
5. Admin can:
   - View all candidates
   - Filter by status
   - Search by name/email/phone
   - View candidate details
   - Add demo data

**Real-Time Listener:**
```typescript
const unsubscribe = onSnapshot(
  query(collection(db, 'candidates'), orderBy('createdAt', 'desc')),
  (snapshot) => {
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCandidates(data);
  }
);
```

---

## Data Storage Methods

### Method 1: Frontend Registration (Recommended)
1. User fills registration form
2. Completes payment
3. Data automatically saved to Firestore
4. Success screen displayed

**Advantages:**
- User-friendly
- Real-time feedback
- Automatic notifications

---

### Method 2: Admin Seeding
1. Admin clicks "🌱 Add Demo Data" button
2. 5 dummy candidates are added to Firestore
3. Dashboard updates automatically

**File:** `src/services/seedData.ts`

**Use Case:**
- Testing admin dashboard
- Populating demo data
- Testing filters and search

---

### Method 3: REST API Script
1. Run: `node store-data-rest.cjs`
2. 3 test candidates are stored via REST API
3. Data is verified and saved to files

**Use Case:**
- Testing Firestore connectivity
- Verifying security rules
- Bulk data import

---

## Error Handling

### Firebase Connection Errors
- If Firebase is not available, app runs in demo mode
- Data is not persisted but UI still works
- Error message displayed in admin dashboard

### Payment Errors
- If payment fails, user is notified
- Data is not saved to Firestore
- User can retry payment

### File Upload Errors
- If file upload fails, user is notified
- Payment is not initiated
- User can retry file upload

### Firestore Write Errors
- If write fails due to security rules, error is logged
- User sees "Profile saved but error in confirmation" message
- Admin should check Firestore security rules

---

## Data Persistence

### What Gets Saved
- All candidate information
- File URLs (S3)
- Payment details
- Timestamps
- Status information

### What Doesn't Get Saved
- Actual file contents (only URLs)
- Payment card details (handled by Razorpay)
- Session data
- Temporary form state

### Data Retention
- All data is permanently stored in Firestore
- Can be accessed via admin dashboard
- Can be exported via Firebase console
- Can be backed up via Firebase backup service

---

## Security Considerations

### Current (Development)
- Firestore rules allow all reads/writes
- No authentication required
- Suitable for development and testing only

### Recommended (Production)
- Require Firebase Authentication
- Implement role-based access control
- Use environment-specific security rules
- Enable audit logging
- Implement data encryption

---

## Performance Optimization

### Current Implementation
- Real-time listeners for admin dashboard
- Pagination not implemented (suitable for < 10k documents)
- No caching layer

### Recommended Improvements
- Implement pagination for large datasets
- Add caching layer (Redis)
- Optimize Firestore queries
- Implement data archival for old records
- Add search indexing

---

## Monitoring & Debugging

### Check Data Flow
1. **Frontend:** Open browser console (F12)
2. **Firestore:** Check Firebase console
3. **Admin Dashboard:** View candidates in real-time
4. **REST API:** Run `node store-data-rest.cjs`

### Common Issues
- 403 Permission Denied: Update Firestore security rules
- Data not appearing: Check Firestore rules and browser console
- Payment not completing: Check Razorpay configuration
- Notifications not sending: Check email/WhatsApp API keys

---

## Testing Checklist

- [ ] Registration form collects all data correctly
- [ ] Files upload to S3 successfully
- [ ] Payment processes without errors
- [ ] Data saves to Firestore
- [ ] Admin dashboard displays data in real-time
- [ ] PDF generates correctly
- [ ] Email notifications are sent
- [ ] WhatsApp notifications are sent
- [ ] Dummy data seeding works
- [ ] Search and filters work in admin dashboard
