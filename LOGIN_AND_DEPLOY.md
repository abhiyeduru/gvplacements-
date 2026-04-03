# Login and Deploy Instructions

## Current Status

✓ Logged out from: `abhiyeduru8@gmail.com`
✓ Ready to login with: `mentlearn@gmail.com`

---

## Step 1: Login with Correct Email

Run this command:

```bash
firebase login
```

This will:
1. Open a browser window
2. Ask you to log in with Google
3. **Use email: mentlearn@gmail.com**
4. Grant permissions to Firebase CLI
5. Return to terminal with authentication complete

---

## Step 2: Verify Login

After login, verify you're logged in with the correct account:

```bash
firebase projects:list
```

You should see:
```
✓ gravi-multiple
```

---

## Step 3: Deploy Project

Once logged in with `mentlearn@gmail.com`, deploy the project:

```bash
firebase deploy --project gravi-multiple
```

Or use the automated script:

```bash
./deploy.sh
```

---

## What Happens During Deployment

1. **Build verification** - Checks if dist/ folder exists
2. **Upload files** - Uploads to Firebase Hosting
3. **Deploy** - Activates the deployment
4. **Show URL** - Displays live URL

**Time:** 1-2 minutes

---

## Live URL After Deployment

```
https://gravi-multiple.web.app
```

---

## Troubleshooting

### If Login Fails

```bash
firebase logout
firebase login
```

### If Deployment Fails

```bash
firebase deploy --project gravi-multiple --debug
```

### Check Current Login

```bash
firebase projects:list
```

---

## Summary

1. Run: `firebase login`
2. Use email: `mentlearn@gmail.com`
3. Run: `firebase deploy --project gravi-multiple`
4. Visit: `https://gravi-multiple.web.app`

Done!
