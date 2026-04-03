# Quick Setup Guide - Gravity Job Assistance Platform

## What's New

✅ PDF Certificate Generation - Download after registration
✅ Email Notifications - Automated confirmation emails
✅ WhatsApp Notifications - Automated WhatsApp messages
✅ Custom Job Position - Users can enter any position
✅ Dummy Data - 5 test candidates for admin testing

## Installation (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Frontend & Backend
```bash
npm run dev:all
```

Or run separately:
```bash
# Terminal 1
npm run dev

# Terminal 2
npm run server
```

### 3. Access the App
- Frontend: http://localhost:5173
- Backend: http://localhost:3001
- Admin: http://localhost:5173 (password: `Gravity!)#8`)

## Testing the Complete Flow

### Test 1: Registration with PDF Download
1. Click "Register Now"
2. Fill Step 1 (all fields including custom job position)
3. Fill Step 2 (address and documents)
4. Review in Step 3
5. Complete payment
6. **Download Certificate** button appears
7. Check email/WhatsApp status

### Test 2: Admin Dashboard
1. Click "Admin" button
2. Enter password: `Gravity!)#8`
3. Click "🌱 Add Demo Data" to populate test candidates
4. View, filter, and manage candidates
5. Update candidate status

### Test 3: Custom Job Position
1. In registration Step 1
2. Enter any job position (not limited to dropdown)
3. Examples: "Senior Developer", "Product Manager", "Consultant"
4. Position appears in review and PDF

## Key Features

### PDF Certificate
- Professional design with Gravity branding
- Includes all candidate information
- Shows confirmation ID
- Downloads automatically
- Can be printed or shared

### Email Notification
- Sent to candidate's email
- Includes confirmation ID
- Shows registration details
- Status displayed in success screen

### WhatsApp Notification
- Sent to candidate's phone
- Includes confirmation ID
- Professional message format
- Status displayed in success screen

### Custom Job Position
- No predefined list
- Users enter their desired position
- Supports any text input
- Appears in all forms and reports

## Configuration

### Email Setup (Optional)
To enable real email sending:

1. Sign up for SendGrid (https://sendgrid.com)
2. Get API key
3. Update `.env.local`:
   ```env
   VITE_EMAIL_API_KEY=your_sendgrid_api_key
   VITE_EMAIL_FROM=noreply@gravity.com
   ```
4. Update `server.js` with SendGrid integration

### WhatsApp Setup (Optional)
To enable real WhatsApp sending:

1. Set up WhatsApp Business Account
2. Get API credentials
3. Update `.env.local`:
   ```env
   VITE_WHATSAPP_API_KEY=your_api_key
   VITE_WHATSAPP_PHONE_NUMBER=+91XXXXXXXXXX
   VITE_WHATSAPP_BUSINESS_ACCOUNT_ID=your_account_id
   ```
4. Update `server.js` with WhatsApp integration

## File Structure

```
src/
├── services/
│   ├── pdfService.ts          # PDF generation
│   ├── notificationService.ts # Email & WhatsApp
│   └── seedData.ts            # Dummy data
├── components/
│   ├── SuccessScreen.tsx      # PDF download & notifications
│   └── form/
│       └── Step1.tsx          # Custom job position
├── config/
│   └── api.ts                 # API client
└── ...

server.js                       # Backend server
package.json                    # Dependencies
.env.local                      # Configuration
```

## Troubleshooting

### "Cannot find module 'jspdf'"
```bash
npm install jspdf html2canvas
```

### Backend not starting
```bash
npm install express cors dotenv
node server.js
```

### PDF not downloading
- Check browser console for errors
- Ensure backend is running
- Try different browser

### Email/WhatsApp not working
- Backend must be running: `npm run server`
- Check `.env.local` configuration
- Check browser console for API errors

## Next Steps

1. **Customize PDF**
   - Edit `src/services/pdfService.ts`
   - Add company logo
   - Change colors and fonts

2. **Integrate Real Services**
   - SendGrid for email
   - Twilio for WhatsApp
   - See `PDF_EMAIL_WHATSAPP_GUIDE.md` for details

3. **Deploy**
   - Frontend: Vercel, Netlify, AWS
   - Backend: Heroku, AWS Lambda, Railway

## Support

For issues or questions:
- Check `PDF_EMAIL_WHATSAPP_GUIDE.md` for detailed documentation
- Check browser console for errors
- Check backend logs: `npm run server`

## Demo Credentials

- Admin Password: `Gravity!)#8`
- Firebase Project: `gravi-multiple`
- Razorpay: Live keys configured
- AWS S3: Configured

## What Works

✅ Registration form with all fields
✅ Payment processing (Razorpay)
✅ PDF certificate generation
✅ Email notifications (demo mode)
✅ WhatsApp notifications (demo mode)
✅ Admin dashboard
✅ Candidate management
✅ Dummy data seeding
✅ Custom job positions
✅ Firebase integration
✅ AWS S3 file uploads

## What Needs Configuration

⚙️ Real email service (SendGrid, AWS SES)
⚙️ Real WhatsApp API (Twilio, WhatsApp Business)
⚙️ Email API key
⚙️ WhatsApp API key
⚙️ AWS S3 credentials (for production)

---

**Ready to test?** Run `npm run dev:all` and visit http://localhost:5173
