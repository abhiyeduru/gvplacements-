// Cloudinary Configuration
export const CLOUDINARY_CONFIG = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dp8bfdbab',
  uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'cryptchat',
  apiKey: import.meta.env.VITE_CLOUDINARY_API_KEY || '337739287121541',
};

console.log('☁️ Cloudinary Config:', {
  cloudName: CLOUDINARY_CONFIG.cloudName,
  uploadPreset: CLOUDINARY_CONFIG.uploadPreset,
  apiKey: CLOUDINARY_CONFIG.apiKey ? '✓ Set' : '✗ Missing',
});
