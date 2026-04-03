import { CLOUDINARY_CONFIG } from '../config/cloudinary';

/**
 * Upload file to Cloudinary
 * @param file - File to upload
 * @param folder - Folder name (resumes, pan, etc.)
 * @returns URL of uploaded file
 */
export const uploadFileToCloudinary = async (
  file: File,
  folder: string
): Promise<string> => {
  try {
    console.log(`📤 Uploading ${folder} file to Cloudinary...`, file.name);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);
    formData.append('folder', `gravity/${folder}`);
    formData.append('resource_type', 'auto');

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`✓ File uploaded successfully:`, data.secure_url);

    return data.secure_url;
  } catch (error) {
    console.error(`❌ Error uploading ${folder} file:`, error);
    throw error;
  }
};

/**
 * Delete file from Cloudinary
 * @param publicId - Public ID of file to delete
 */
export const deleteFileFromCloudinary = async (publicId: string): Promise<void> => {
  try {
    console.log(`🗑️ Deleting file from Cloudinary:`, publicId);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/resources/image/upload`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `Basic ${btoa(`api_key:${CLOUDINARY_CONFIG.apiKey}`)}`,
        },
        body: JSON.stringify({ public_ids: [publicId] }),
      }
    );

    if (!response.ok) {
      throw new Error(`Delete failed: ${response.statusText}`);
    }

    console.log(`✓ File deleted successfully`);
  } catch (error) {
    console.error(`❌ Error deleting file:`, error);
    throw error;
  }
};

/**
 * Get file info from Cloudinary
 * @param publicId - Public ID of file
 */
export const getFileInfoFromCloudinary = async (publicId: string): Promise<any> => {
  try {
    console.log(`ℹ️ Getting file info from Cloudinary:`, publicId);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/resources/image/upload/${publicId}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${btoa(`api_key:${CLOUDINARY_CONFIG.apiKey}`)}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Get info failed: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`✓ File info retrieved:`, data);

    return data;
  } catch (error) {
    console.error(`❌ Error getting file info:`, error);
    throw error;
  }
};
