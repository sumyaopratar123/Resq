import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env?.VITE_FIREBASE_API_KEY || 'demo-key',
  authDomain: import.meta.env?.VITE_FIREBASE_AUTH_DOMAIN || 'resq-emergency.firebaseapp.com',
  projectId: import.meta.env?.VITE_FIREBASE_PROJECT_ID || 'resq-emergency',
  storageBucket: import.meta.env?.VITE_FIREBASE_STORAGE_BUCKET || 'resq-emergency.appspot.com',
  messagingSenderId: import.meta.env?.VITE_FIREBASE_MESSAGING_SENDER_ID || '1234567890',
  appId: import.meta.env?.VITE_FIREBASE_APP_ID || '1:1234567890:web:12345',
  databaseURL: import.meta.env?.VITE_FIREBASE_DATABASE_URL || 'https://resq-emergency-default-rtdb.firebaseio.com'
};

export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
export const storage = getStorage(app);
