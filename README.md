# Gravity Job Assistance - React + Firebase + AWS S3

A modern job placement assistance platform built with React, Firebase, and AWS S3.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    React Frontend                        │
│  (Components, Form Validation, State Management)         │
└────────────────┬────────────────────────────────────────┘
                 │
    ┌────────────┼────────────┐
    │            │            │
    ▼            ▼            ▼
Firebase      AWS S3      Razorpay
Firestore    (File Upload) (Payments)
```

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Database**: Firebase Firestore
- **File Storage**: AWS S3
- **Payments**: Razorpay
- **Styling**: Inline styles with theme system

## Project Structure

```
src/
├── components/
│   ├── RegistrationForm.tsx      # Main form container
│   ├── SuccessScreen.tsx         # Success confirmation
│   └── form/
│       ├── Step1.tsx             # Personal info
│       ├── Step2.tsx             # Address & documents
│       └── Step3.tsx             # Review & payment
├── config/
│   ├── firebase.ts               # Firebase initialization
│   └── aws.ts                    # AWS S3 configuration
├── services/
│   ├── candidateService.ts       # Firestore operations
│   ├── s3Service.ts              # S3 file uploads
│   └── paymentService.ts         # Razorpay integration
├── styles/
│   └── theme.ts                  # Design tokens
├── types/
│   └── index.ts                  # TypeScript interfaces
├── App.tsx                       # Main app component
├── main.tsx                      # Entry point
└── index.css                     # Global styles
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

**Firebase Setup:**
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable Firestore Database
4. Copy your config values to `.env.local`

**AWS S3 Setup:**
1. Create an S3 bucket in AWS Console
2. Create an IAM user with S3 access
3. Add credentials to `.env.local`

**Razorpay Setup:**
1. Sign up at [Razorpay](https://razorpay.com)
2. Get your API key from dashboard
3. Add to `.env.local`

### 3. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
```

## Key Features

### Multi-Step Form
- **Step 1**: Personal information (name, phone, email, position)
- **Step 2**: Address & document uploads (resume, PAN)
- **Step 3**: Review & payment confirmation

### File Uploads
- Resume (PDF/DOC) → AWS S3
- PAN Card (PDF/Image) → AWS S3
- Automatic URL generation for Firestore storage

### Payment Integration
- Razorpay payment gateway
- Demo mode for testing
- Success/failure handling

### Data Persistence
- Candidate profiles saved to Firestore
- File URLs stored with profile
- Payment status tracking

## Firebase Cloud Functions (Optional)

To send WhatsApp/Email notifications, set up a Cloud Function:

```javascript
// functions/index.js
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.onCandidateRegistered = functions.firestore
  .document('candidates/{docId}')
  .onCreate(async (snap, context) => {
    const data = snap.data();
    
    // Send WhatsApp via Twilio
    // Send Email via SendGrid/Nodemailer
    
    console.log('Notifications sent for:', data.email);
  });
```

## Environment Variables Reference

```env
# Firebase
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

# AWS S3
VITE_AWS_ACCESS_KEY_ID=
VITE_AWS_SECRET_ACCESS_KEY=
VITE_AWS_REGION=us-east-1
VITE_AWS_S3_BUCKET=

# Razorpay
VITE_RAZORPAY_KEY=rzp_test_xxxxx
```

## API Integration Points

### Firestore Collections

**candidates**
```typescript
{
  id: string;
  name: string;
  fatherName: string;
  phone: string;
  email: string;
  position: string;
  currentAddress: string;
  permanentAddress: string;
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

### S3 Bucket Structure

```
s3://your-bucket/
├── resumes/
│   └── {timestamp}_{filename}
└── pan/
    └── {timestamp}_{filename}
```

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## Security Considerations

1. **Never commit `.env.local`** - Add to `.gitignore`
2. **AWS Credentials** - Use IAM roles in production, not access keys
3. **Firebase Rules** - Restrict Firestore access:
   ```
   match /candidates/{document=**} {
     allow create: if request.auth != null;
     allow read, update: if request.auth.uid == resource.data.userId;
   }
   ```
4. **S3 CORS** - Configure CORS for your domain
5. **Razorpay** - Use live keys only in production

## Troubleshooting

**Firebase not initializing?**
- Check `.env.local` has all required keys
- Verify Firebase project exists and is active

**S3 upload failing?**
- Verify bucket name and region
- Check IAM user has `s3:PutObject` permission
- Ensure CORS is configured

**Razorpay payment not working?**
- Use test key for development
- Check browser console for errors
- Verify amount is in paise (₹1000 = 100000 paise)

## License

MIT
