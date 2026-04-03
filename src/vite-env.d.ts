/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_FIREBASE_PROJECT_ID: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly VITE_FIREBASE_APP_ID: string;
  readonly VITE_FIREBASE_MEASUREMENT_ID: string;
  readonly VITE_AWS_ACCESS_KEY_ID: string;
  readonly VITE_AWS_SECRET_ACCESS_KEY: string;
  readonly VITE_AWS_REGION: string;
  readonly VITE_AWS_S3_BUCKET: string;
  readonly VITE_AWS_S3_ENDPOINT: string;
  readonly VITE_AWS_ACCOUNT_ID: string;
  readonly VITE_AWS_VPC_ID: string;
  readonly VITE_RAZORPAY_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
