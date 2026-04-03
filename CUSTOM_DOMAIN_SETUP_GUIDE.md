# Custom Domain Setup Guide: www.gvplacements.com

## Current Status
- ✅ Frontend deployed to Firebase Hosting
- ✅ Firebase site created: `gvplacements`
- ✅ Firebase URL: https://gvplacements.web.app
- ⏳ Custom domain pending: https://www.gvplacements.com

## Step-by-Step Setup

### Step 1: Access Firebase Console
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select project: **gravi-multiple**
3. Click **Hosting** in the left sidebar
4. You should see two sites:
   - `gravi-multiple` (https://gravi-multiple.web.app)
   - `gvplacements` (https://gvplacements.web.app)

### Step 2: Add Custom Domain to gvplacements Site
1. Click on the **gvplacements** site
2. Click **Add custom domain** button
3. Enter domain: `www.gvplacements.com`
4. Click **Continue**

### Step 3: Verify Domain Ownership
Firebase will show you DNS records to add. You'll see something like:

```
TXT Record:
Name: _acme-challenge.www.gvplacements.com
Value: [verification-code]
TTL: 3600

A Records:
Name: www.gvplacements.com
Value: 199.36.158.100
TTL: 3600
```

### Step 4: Add DNS Records to Your Domain Registrar
1. Log in to your domain registrar (GoDaddy, Namecheap, etc.)
2. Go to DNS settings for `gvplacements.com`
3. Add the TXT record for verification
4. Add the A record for routing
5. Save changes

### Step 5: Wait for DNS Propagation
- DNS changes typically take 24-48 hours
- Firebase will automatically verify once DNS is propagated
- You'll see a checkmark in Firebase Console when verified

### Step 6: Finalize Domain Connection
Once verified, Firebase will automatically:
- ✅ Issue SSL certificate
- ✅ Enable HTTPS
- ✅ Route traffic to your app

## DNS Configuration Example

### For GoDaddy:
1. Go to DNS Management
2. Add TXT record:
   - Type: TXT
   - Name: _acme-challenge.www
   - Value: [verification-code from Firebase]
   - TTL: 3600

3. Add A record:
   - Type: A
   - Name: www
   - Value: 199.36.158.100
   - TTL: 3600

### For Namecheap:
1. Go to Advanced DNS
2. Add TXT record with same details
3. Add A record with same details

### For Other Registrars:
Follow similar steps - the key is adding the TXT and A records provided by Firebase.

## Verify DNS Records

You can verify DNS records are set correctly using:

```bash
# Check TXT record
nslookup -type=TXT _acme-challenge.www.gvplacements.com

# Check A record
nslookup www.gvplacements.com
```

## Important: Update Razorpay Domain Whitelist

Once your domain is live, update Razorpay:

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Settings → Website & App Settings
3. Add domain: `www.gvplacements.com`
4. Save changes

**Current Razorpay Configuration**:
- Live Key: `rzp_live_SMj9EQLZSXaW4g`
- Whitelisted Domains: (needs update)

## Important: Update Backend CORS (if deployed)

If you deploy backend to a new URL, update `server.js`:

```javascript
const corsOptions = {
  origin: [
    'https://www.gvplacements.com',
    'https://gvplacements.com',
    'https://gvplacements.web.app'
  ],
  credentials: true
};
```

## Testing After Domain Setup

1. **Visit your domain**: https://www.gvplacements.com
2. **Check SSL**: Should show 🔒 in browser
3. **Test registration**: Fill out form
4. **Test admin**: Click Admin, enter password `Gravity!)#8`
5. **Test payment**: Try payment flow

## Troubleshooting

### Domain not connecting after 48 hours?
1. Verify DNS records are correct in registrar
2. Check Firebase Console for verification status
3. Try clearing browser cache
4. Wait additional 24 hours (DNS can be slow)

### Payment not working on new domain?
1. Add domain to Razorpay whitelist
2. Clear browser cache
3. Check browser console for errors
4. Verify `.env.local` has correct Razorpay key

### SSL certificate not issued?
1. Ensure DNS records are correct
2. Wait 24-48 hours for certificate issuance
3. Check Firebase Console for any errors
4. Contact Firebase support if issue persists

## Firebase Console Monitoring

Monitor your domain setup in Firebase Console:
1. Go to Hosting → Domains
2. You'll see status:
   - 🟡 Pending verification
   - 🟢 Connected
   - 🔴 Error

## Current Firebase Configuration

**firebase.json** - Multi-site setup:
```json
{
  "hosting": [
    {
      "target": "gravi-multiple",
      "public": "dist",
      ...
    },
    {
      "target": "gvplacements",
      "public": "dist",
      ...
    }
  ]
}
```

**.firebaserc** - Site targets:
```json
{
  "projects": {
    "default": "gravi-multiple"
  },
  "targets": {
    "gravi-multiple": {
      "hosting": {
        "gravi-multiple": ["gravi-multiple"],
        "gvplacements": ["gvplacements"]
      }
    }
  }
}
```

## Deployment Commands

Deploy to specific sites:
```bash
# Deploy to gvplacements site
firebase deploy --only hosting:gvplacements

# Deploy to gravi-multiple site
firebase deploy --only hosting:gravi-multiple

# Deploy to both sites
firebase deploy --only hosting
```

## Next Steps

1. ✅ Frontend deployed to Firebase
2. ⏳ Add DNS records to domain registrar
3. ⏳ Wait for DNS propagation (24-48 hours)
4. ⏳ Verify domain in Firebase Console
5. ⏳ Update Razorpay domain whitelist
6. ⏳ Test payment flow on new domain

---

**Status**: Ready for DNS configuration  
**Firebase URL**: https://gvplacements.web.app  
**Custom Domain**: https://www.gvplacements.com (pending DNS setup)
