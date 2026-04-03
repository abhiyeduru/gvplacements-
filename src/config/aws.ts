// AWS S3 Configuration (Simplified - no SDK required)
export const AWS_CONFIG = {
  accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID || '',
  secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY || '',
  region: import.meta.env.VITE_AWS_REGION || 'us-east-1',
  bucket: import.meta.env.VITE_AWS_S3_BUCKET || 'gravity-crm-uploadsBucket',
  endpoint: import.meta.env.VITE_AWS_S3_ENDPOINT || 'https://gravity-crm-uploads-7ukoujddik4gkjrx3mk8z8fbgk4yhaps3a-s3aliasvpc.s3.amazonaws.com',
};

export const S3_BUCKET = AWS_CONFIG.bucket;
export const AWS_ACCOUNT_ID = import.meta.env.VITE_AWS_ACCOUNT_ID || '432162758211';
export const VPC_ID = import.meta.env.VITE_AWS_VPC_ID || 'vpc-gravity-crm-uploadsBucket';
