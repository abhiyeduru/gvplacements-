# Cloudinary Integration Guide

## Overview

The Gravity Job Assistance Platform now uses **Cloudinary** for file uploads instead of AWS S3. This provides:

- ✓ Easier setup (no AWS credentials needed)
- ✓ Automatic image optimization
- ✓ CDN delivery
- ✓ Secure file storage
- ✓ Easy file management

---

## Configuration

### Environment Variables

The following Cloudinary credentials are already configured in `.env.local`:

```
VITE_CLOUDINARY_CLOUD_NAME=dp8bfdbab
VITE_CLOUDINARY_UPLOAD_PRESET=cryptchat
VITE_CLOUDINARY_API_KEY=337739287121541
```

### Files Modified

1. **src/config/cloudinary.ts** (NEW)
   - Cloudinary configuration
   - Loads environment variables
   - Logs configuration status

2. **src/services/cloudinaryService.ts** (NEW)
   - Upload files to Cloudinary
   - Delete files from Cloudinary
   - Get file information

3. **src/components/RegistrationForm.tsx** (UPDATED)
   - Changed from S3 to Cloudinary
   - Uses `uploadFileToCloudinary()` function
   - Maintains same file upload flow

4. **.env.local** (UPDATED)
   - Replaced AWS S3 config with Cloudinary config

5. **.env.example** (UPDATED)
   - Updated example environment variables

---

## How It Works

### File Upload Flow

```
User selects file
    ↓
File is uploaded to Cloudinary
    ↓
Cloudinary returns secure URL
    ↓
URL is stored in Firestore
    ↓
File is accessible via URL
```

### Upload Process

1. **User selects file** in registration form (Step 2)
2. **File is sent to Cloudinary** via REST API
3. **Cloudinary processes the file**:
   - Validates file type
   - Optimizes image (if image)
   - Stores securely
   - Generates CDN URL
4. **URL is returned** to the app
5. **URL is stored** in Firestore with candidate data
6. **File is accessible** via the URL

---

## Supported File Types

### Resumes
- PDF (.pdf)
- Word (.doc, .docx)
- Text (.txt)
- Images (.jpg, .png, .gif)

### PAN Cards
- Images (.jpg, .png, .gif)
- PDF (.pdf)

### Other Documents
- Any file type supported by Cloudinary

---

## API Functions

### uploadFileToCloudinary()

Upload a file to Cloudinary.

```typescript
import { uploadFileToCloudinary } from '../services/cloudinaryService';

const url = await uploadFileToCloudinary(file, 'resumes');
// Returns: https://res.cloudinary.com/...
```

**Parameters:**
- `file` (File) - File to upload
- `folder` (string) - Folder name (resumes, pan, etc.)

**Returns:**
- `string` - Secure URL of uploaded file

**Example:**
```typescript
const resumeFile = document.getElementById('resume').files[0];
const resumeUrl = await uploadFileToCloudinary(resumeFile, 'resumes');
console.log('Resume URL:', resumeUrl);
```

---

### deleteFileFromCloudinary()

Delete a file from Cloudinary.

```typescript
import { deleteFileFromCloudinary } from '../services/cloudinaryService';

await deleteFileFromCloudinary('gravity/resumes/filename');
```

**Parameters:**
- `publicId` (string) - Public ID of file to delete

**Example:**
```typescript
await deleteFileFromCloudinary('gravity/resumes/resume_123');
```

---

### getFileInfoFromCloudinary()

Get information about a file in Cloudinary.

```typescript
import { getFileInfoFromCloudinary } from '../services/cloudinaryService';

const info = await getFileInfoFromCloudinary('gravity/resumes/filename');
console.log('File size:', info.bytes);
console.log('File type:', info.resource_type);
```

**Parameters:**
- `publicId` (string) - Public ID of file

**Returns:**
- `object` - File information (size, type, created_at, etc.)

---

## File Organization

Files are organized in Cloudinary with the following structure:

```
gravity/
├── resumes/
│   ├── resume_user1.pdf
│   ├── resume_user2.pdf
│   └── ...
├── pan/
│   ├── pan_user1.jpg
│   ├── pan_user2.jpg
│   └── ...
└── documents/
    ├── doc_user1.pdf
    └── ...
```

---

## URL Format

Uploaded files are accessible via Cloudinary CDN URLs:

```
https://res.cloudinary.com/dp8bfdbab/image/upload/v1234567890/gravity/resumes/filename.pdf
```

**URL Components:**
- `dp8bfdbab` - Cloud name
- `image/upload` - Upload type
- `v1234567890` - Version (timestamp)
- `gravity/resumes/filename.pdf` - Public ID

---

## Security

### Upload Preset

The upload preset `cryptchat` is configured to:
- Allow unsigned uploads (no backend signature needed)
- Restrict file types
- Limit file size
- Organize files in folders

### API Key

The API key is used for:
- Deleting files
- Getting file information
- Advanced operations

**Note:** The API key is stored in environment variables and not exposed to users.

---

## Error Handling

### Upload Errors

If upload fails, the error is caught and logged:

```typescript
try {
  const url = await uploadFileToCloudinary(file, 'resumes');
} catch (error) {
  console.error('Upload failed:', error);
  // Show error to user
}
```

### Common Errors

1. **File too large**
   - Solution: Compress file or increase limit

2. **Invalid file type**
   - Solution: Use supported file type

3. **Network error**
   - Solution: Check internet connection

4. **Cloudinary service down**
   - Solution: Retry or contact support

---

## Testing

### Test Upload

1. Open http://localhost:3000
2. Click "Register Now"
3. Fill in Step 1 (personal info)
4. Go to Step 2 (documents)
5. Upload a resume file
6. Upload a PAN file
7. Check browser console for upload logs
8. Proceed to payment

### Check Uploaded Files

1. Go to https://cloudinary.com/console
2. Log in with your account
3. Click "Media Library"
4. Navigate to `gravity/resumes` or `gravity/pan`
5. You should see uploaded files

### Verify in Firestore

1. Go to Firebase Console
2. Select gravi-multiple project
3. Click Firestore Database
4. Click candidates collection
5. Open a candidate document
6. Check `resumeUrl` and `panUrl` fields
7. URLs should be Cloudinary URLs

---

## Advantages Over AWS S3

| Feature | Cloudinary | AWS S3 |
|---------|-----------|--------|
| Setup | Easy | Complex |
| Credentials | Simple | Multiple keys |
| Image optimization | Automatic | Manual |
| CDN | Built-in | Requires CloudFront |
| File management | Web UI | AWS Console |
| Pricing | Pay-as-you-go | Storage + transfer |
| API | Simple REST | Complex |

---

## Limitations

1. **File size limit**: 100MB per file (configurable)
2. **Storage limit**: Depends on plan
3. **Bandwidth limit**: Depends on plan
4. **Rate limiting**: API rate limits apply

---

## Troubleshooting

### Upload Not Working

**Problem:** Files don't upload

**Solution:**
1. Check internet connection
2. Check file size (< 100MB)
3. Check file type (supported)
4. Check browser console for errors
5. Verify Cloudinary credentials in `.env.local`

### Files Not Appearing in Cloudinary

**Problem:** Files uploaded but not visible in Cloudinary console

**Solution:**
1. Refresh Cloudinary console
2. Check correct folder (gravity/resumes or gravity/pan)
3. Check upload preset settings
4. Verify API key is correct

### URLs Not Working

**Problem:** Uploaded file URLs return 404

**Solution:**
1. Check URL format
2. Verify file was actually uploaded
3. Check Cloudinary console for file
4. Verify public ID is correct

---

## Next Steps

1. **Test file uploads** in registration form
2. **Verify files appear** in Cloudinary console
3. **Check URLs** in Firestore
4. **Test complete registration flow**
5. **Verify admin dashboard** displays file URLs

---

## Support

For Cloudinary support:
- Documentation: https://cloudinary.com/documentation
- Dashboard: https://cloudinary.com/console
- Support: https://support.cloudinary.com

---

## Summary

✓ Cloudinary is now configured
✓ File uploads use Cloudinary
✓ Files are organized in folders
✓ URLs are stored in Firestore
✓ Easy file management

**Status:** Ready to use

**Next step:** Test file uploads in registration form
