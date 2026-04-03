# Gravity Job Assistance - Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables

Create `.env.local` in the root directory:

```env
# Firebase (Already configured)
VITE_FIREBASE_API_KEY=AIzaSyD461Rr1DxefKVV7lnaWglgH3yFtb9F1sg
VITE_FIREBASE_AUTH_DOMAIN=gravi-multiple.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=gravi-multiple
VITE_FIREBASE_STORAGE_BUCKET=gravi-multiple.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=1041107905972
VITE_FIREBASE_APP_ID=1:1041107905972:web:f60b32fbd81676554bd6e1
VITE_FIREBASE_MEASUREMENT_ID=G-XWN6VCP381

# AWS S3 - Replace with your credentials
VITE_AWS_ACCESS_KEY_ID=your_access_key_here
VITE_AWS_SECRET_ACCESS_KEY=your_secret_key_here
VITE_AWS_REGION=us-east-1
VITE_AWS_S3_BUCKET=gravity-crm-uploadsBucket
VITE_AWS_S3_ENDPOINT=https://gravity-crm-uploads-7ukoujddik4gkjrx3mk8z8fbgk4yhaps3a-s3aliasvpc.s3.amazonaws.com
VITE_AWS_ACCOUNT_ID=432162758211
VITE_AWS_VPC_ID=vpc-gravity-crm-uploadsBucket

# Razorpay - Replace with your key
VITE_RAZORPAY_KEY=rzp_test_your_key_here
```

### 3. Run Development Server
```bash
npm run dev
```

The app will start at `http://localhost:5173`

### 4. Build for Production
```bash
npm run build
```

## Architecture

```
Frontend (React)
    ↓
├── Firebase Firestore (Candidate Data)
├── AWS S3 (File Uploads)
└── Razorpay (Payments)
```

## Features

✅ Multi-step registration form
✅ File uploads (Resume, PAN)
✅ Firebase Firestore integration
✅ AWS S3 file storage
✅ Razorpay payment processing
✅ Demo mode for testing
✅ Error handling & validation
✅ Responsive design

## Demo Mode

If you don't have AWS/Razorpay credentials yet, the app runs in demo mode:
- File uploads are simulated
- Payments are simulated
- Data still saves to Firebase

## Troubleshooting

**Dependencies not installing?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Port 5173 already in use?**
```bash
npm run dev -- --port 3000
```

**Firebase not connecting?**
- Check `.env.local` has all Firebase keys
- Verify Firebase project is active

**S3 uploads failing?**
- Check AWS credentials in `.env.local`
- Verify bucket name and region
- Check IAM user has S3 permissions

## File Structure

```
src/
├── components/          # React components
├── config/             # Firebase & AWS config
├── services/           # API services
├── styles/             # Theme & styles
├── types/              # TypeScript types
├── App.tsx             # Main app
└── main.tsx            # Entry point
```

## Next Steps

1. Add your AWS credentials to `.env.local`
2. Add your Razorpay key to `.env.local`
3. Run `npm run dev`
4. Test the registration flow
5. Deploy to production

## Support

For issues or questions, check the README.md or contact support.
