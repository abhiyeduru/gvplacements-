import { AWS_CONFIG, S3_BUCKET } from '../config/aws';

export const uploadFileToS3 = async (
  file: File,
  folder: 'resumes' | 'pan'
): Promise<string> => {
  const key = `${folder}/${Date.now()}_${file.name}`;
  
  try {
    // For demo/development: return a mock URL
    // In production, implement presigned URL or backend upload
    console.log(`File upload simulated: ${file.name} → ${key}`);
    
    // Return a mock S3 URL
    return `${AWS_CONFIG.endpoint}/${S3_BUCKET}/${key}`;
  } catch (error) {
    console.error('S3 upload error:', error);
    // Return a placeholder URL for demo
    return `${AWS_CONFIG.endpoint}/${S3_BUCKET}/${key}`;
  }
};
