# Firestore Security Rules Fix

## Problem
Data is not being stored to Firestore because the database has restrictive security rules that deny all writes. The error is:
```
HTTP 403: Missing or insufficient permissions. (PERMISSION_DENIED)
```

## Solution
Update Firestore security rules to allow reads and writes to the `candidates` collection.

## Steps to Fix

### 1. Go to Firebase Console
- Open [Firebase Console](https://console.firebase.google.com/)
- Select the **gravi-multiple** project
- Click on **Firestore Database** in the left sidebar

### 2. Navigate to Security Rules
- Click on the **Rules** tab at the top
- You should see the current security rules

### 3. Replace with Permissive Rules (Development)
Replace all content with these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to read and write to candidates collection
    match /candidates/{document=**} {
      allow read, write: if true;
    }
  }
}
```

### 4. Publish the Rules
- Click the **Publish** button
- Wait for the rules to deploy (usually 1-2 minutes)
- You should see a success message

### 5. Test the Connection
After publishing, run this command to verify data can be stored:

```bash
node store-data-rest.cjs
```

You should see:
```
✓ Successfully stored 3 candidates to Firestore
✓ Retrieved 3 candidates from Firestore
✓ Data successfully stored to Firestore!
```

## Production Security Rules (Recommended)
For production, use more restrictive rules that require authentication:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read and write their own data
    match /candidates/{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Verification
After updating rules, you can verify data storage by:

1. **Via REST API Script:**
   ```bash
   node store-data-rest.cjs
   ```

2. **Via Admin Dashboard:**
   - Open the app at http://localhost:3000
   - Click "Admin" button
   - Enter password: `Gravity!)#8`
   - Click "🌱 Add Demo Data" button
   - You should see 5 candidates appear in the table

3. **Via Firebase Console:**
   - Go to Firestore Database
   - Click on **candidates** collection
   - You should see documents with candidate data

## Troubleshooting

### Still Getting 403 Error?
1. Make sure you published the rules (not just saved)
2. Wait 2-3 minutes for rules to fully deploy
3. Refresh the page and try again
4. Check that you're in the correct Firebase project (gravi-multiple)

### Rules Won't Publish?
1. Check for syntax errors in the rules
2. Make sure there are no extra spaces or characters
3. Try copying the rules again carefully

### Data Still Not Appearing?
1. Check browser console for errors (F12)
2. Check Firebase console for any error messages
3. Verify the API key in `.env.local` is correct
4. Try clearing browser cache and reloading

## Next Steps
After fixing the security rules:

1. Test the complete registration flow
2. Make a test payment to verify data saves
3. Check admin dashboard for new candidates
4. Verify PDF generation and email notifications work
5. Test dummy data seeding via admin panel

## Important Notes
- The permissive rules (`allow read, write: if true;`) are for **development only**
- Never use permissive rules in production
- Always implement proper authentication and authorization
- Consider using Firebase Authentication for user-specific access control
