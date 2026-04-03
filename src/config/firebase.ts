import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyD461Rr1DxefKVV7lnaWglgH3yFtb9F1sg",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "gravi-multiple.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "gravi-multiple",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "gravi-multiple.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1041107905972",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1041107905972:web:f60b32fbd81676554bd6e1",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-XWN6VCP381",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
