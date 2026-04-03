# PDF Generation, Email & WhatsApp Integration Guide

## Overview

The Gravity platform now includes:
1. **PDF Certificate Generation** - Automatic PDF creation after successful registration
2. **Email Notifications** - Confirmation emails sent to candidates
3. **WhatsApp Notifications** - WhatsApp messages sent via Business API
4. **Custom Job Position** - Users can enter any job position they want

## New Features

### 1. PDF Certificate Download

**What it does:**
- Generates a professional PDF certificate after payment completion
- Includes all candidate information
- Shows confirmation ID
- Can be downloaded immediately

**How it works:**
```typescript
// In SuccessScreen component
<button onClick={handleDownloadPDF}>
  📥 Download Certificate
</button>
```

**PDF Contents:**
- Gravity branding and header
- Confirmation ID
- Personal Information (name, email, phone, DOB, gender)
- Identity Information (PAN, Aadhar)
- Professional Information (position, qualification, experience)
- Address Information
- Payment Information
- Registration date
- Footer with contact information

### 2. Email Notifications

**What it does:**
- Sends confirmation email to candidate's email address
- Includes registration details
- Provides confirmation ID
- Automated after successful payment

**Configuration:**
```env
VITE_EMAIL_API_KEY=your_email_api_key_here
VITE_EMAIL_FROM=noreply@gravity.com
```

**Email Content:**
- Welcome message
- Confirmation ID
- Candidate details
- Next steps (48-hour contact window)

**Status Display:**
- Shows "Sending Email..." while sending
- Shows "Email Sent" if successful
- Shows "Email Failed" if there's an error

### 3. WhatsApp Notifications

**What it does:**
- Sends WhatsApp message to candidate's phone
- Includes registration confirmation
- Provides confirmation ID
- Automated after successful payment

**Configuration:**
```env
VITE_WHATSAPP_API_KEY=your_whatsapp_api_key_here
VITE_WHATSAPP_PHONE_NUMBER=your_business_phone_number
VITE_WHATSAPP_BUSINESS_ACCOUNT_ID=your_business_account_id
```

**WhatsApp Message Format:**
```
Hello [Name]! 👋

Welcome to Gravity Job Assistance! 🎉

Your registration is confirmed!
📋 Confirmation ID: [ID]
📱 Phone: [Phone]
💼 Position: [Position]
💰 Fee: ₹1000

Our team will contact you within 48 hours to schedule interviews.

Thank you for choosing Gravity! 🚀
```

**Status Display:**
- Shows "Sending WhatsApp..." while sending
- Shows "WhatsApp Sent" if successful
- Shows "WhatsApp Failed" if there's an error

### 4. Custom Job Position

**What it does:**
- Allows users to enter any job position they want
- Not limited to predefined options
- Supports any text input

**How it works:**
```typescript
// In Step1 component
<input
  type="text"
  placeholder="e.g., Software Engineer, Data Analyst, Marketing Manager..."
  value={data.position}
  onChange={(e) => onChange('position', e.target.value)}
/>
```

**Examples:**
- Software Engineer
- Data Analyst
- Marketing Manager
- Full Stack Developer
- Business Analyst
- Any custom position

## Installation & Setup

### Step 1: Install Dependencies

```bash
npm install
```

This installs:
- `jspdf` - PDF generation
- `html2canvas` - HTML to canvas conversion
- `express` - Backend server
- `cors` - Cross-origin requests
- `dotenv` - Environment variables
- `concurrently` - Run multiple processes

### Step 2: Configure Environment Variables

Update `.env.local`:

```env
# Backend API
VITE_API_BASE_URL=http://localhost:3001

# Email Service (SendGrid example)
VITE_EMAIL_API_KEY=your_sendgrid_api_key
VITE_EMAIL_FROM=noreply@gravity.com

# WhatsApp Business API
VITE_WHATSAPP_API_KEY=your_whatsapp_api_key
VITE_WHATSAPP_PHONE_NUMBER=+91XXXXXXXXXX
VITE_WHATSAPP_BUSINESS_ACCOUNT_ID=your_account_id
```

### Step 3: Run Frontend & Backend

**Option 1: Run both together**
```bash
npm run dev:all
```

**Option 2: Run separately**
```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
npm run server
```

## Backend API Endpoints

### Send Email
```
POST /api/send-email
Content-Type: application/json

{
  "to": "candidate@email.com",
  "subject": "Registration Confirmation - ABC123",
  "html": "<h2>Welcome to Gravity...</h2>"
}

Response:
{
  "success": true,
  "message": "Email sent successfully",
  "to": "candidate@email.com"
}
```

### Send WhatsApp
```
POST /api/send-whatsapp
Content-Type: application/json

{
  "phone": "919876543210",
  "message": "Hello! Your registration is confirmed..."
}

Response:
{
  "success": true,
  "message": "WhatsApp message sent successfully",
  "phone": "919876543210"
}
```

## Integration with Real Services

### Email Integration (SendGrid Example)

Update `server.js`:

```javascript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post('/api/send-email', async (req, res) => {
  try {
    const { to, subject, html } = req.body;
    
    await sgMail.send({
      to,
      from: process.env.EMAIL_FROM,
      subject,
      html,
    });
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### WhatsApp Integration (Twilio Example)

Update `server.js`:

```javascript
import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

app.post('/api/send-whatsapp', async (req, res) => {
  try {
    const { phone, message } = req.body;
    
    await client.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${phone}`,
      body: message,
    });
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

## Testing

### Test PDF Generation
1. Fill registration form
2. Complete payment
3. Click "📥 Download Certificate"
4. PDF should download automatically

### Test Email (Demo Mode)
1. Complete registration
2. Check browser console for email logs
3. In production, email will be sent to candidate

### Test WhatsApp (Demo Mode)
1. Complete registration
2. Check browser console for WhatsApp logs
3. In production, WhatsApp will be sent to candidate

### Test Custom Job Position
1. In Step 1, enter any job position
2. Examples: "Senior Developer", "Product Manager", "Consultant"
3. Position appears in review and PDF

## Success Screen Flow

After successful payment:

1. **PDF Generated** - Certificate ready for download
2. **Email Sent** - Confirmation email queued
3. **WhatsApp Sent** - WhatsApp message queued
4. **Status Display** - Shows success/failure for each

```
✓ Registration Complete
✓ Email Sent (or Email Failed)
✓ WhatsApp Sent (or WhatsApp Failed)
```

## Files Created/Modified

### New Files:
- `src/services/pdfService.ts` - PDF generation
- `src/services/notificationService.ts` - Email & WhatsApp
- `src/config/api.ts` - API client
- `server.js` - Backend server

### Modified Files:
- `src/components/SuccessScreen.tsx` - Added PDF download & notification status
- `src/components/RegistrationForm.tsx` - Pass candidate data to success screen
- `src/components/form/Step1.tsx` - Changed position to text input
- `package.json` - Added dependencies
- `.env.local` - Added API configuration

## Troubleshooting

### PDF not downloading
- Check browser console for errors
- Ensure jsPDF is installed: `npm install jspdf`
- Try different browser

### Email not sending
- Check backend is running: `npm run server`
- Verify API endpoint: `http://localhost:3001/api/send-email`
- Check environment variables in `.env.local`

### WhatsApp not sending
- Check backend is running
- Verify phone number format (include country code)
- Check WhatsApp Business API credentials

### Backend not starting
- Ensure Node.js is installed
- Run: `npm install` to install dependencies
- Check port 3001 is not in use

## Next Steps

1. **Integrate Real Email Service**
   - Sign up for SendGrid, AWS SES, or similar
   - Add API key to `.env.local`
   - Update `server.js` with real implementation

2. **Integrate WhatsApp Business API**
   - Set up WhatsApp Business Account
   - Get API credentials
   - Update `server.js` with real implementation

3. **Customize PDF**
   - Add company logo
   - Customize colors and fonts
   - Add additional sections

4. **Add Email Templates**
   - Create HTML email templates
   - Add dynamic content
   - Support multiple languages
