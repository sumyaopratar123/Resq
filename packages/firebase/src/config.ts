import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env?.VITE_FIREBASE_API_KEY || 'AIzaSyASfDD3-QLU__UuElnxKf0In_VCIME5RAI',
  authDomain: import.meta.env?.VITE_FIREBASE_AUTH_DOMAIN || 'resq-82cfb.firebaseapp.com',
  projectId: import.meta.env?.VITE_FIREBASE_PROJECT_ID || 'resq-82cfb',
  storageBucket: import.meta.env?.VITE_FIREBASE_STORAGE_BUCKET || 'resq-82cfb.firebasestorage.app',
  messagingSenderId: import.meta.env?.VITE_FIREBASE_MESSAGING_SENDER_ID || '279085712104',
  appId: import.meta.env?.VITE_FIREBASE_APP_ID || '1:279085712104:web:b4fc7edbc337aba722ff5d',
  measurementId: import.meta.env?.VITE_FIREBASE_MEASUREMENT_ID || 'G-1WFK0WWG2X',
  databaseURL: import.meta.env?.VITE_FIREBASE_DATABASE_URL || 'https://resq-82cfb-default-rtdb.firebaseio.com'
};

export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
export const storage = getStorage(app);

// Initialize Analytics (only in browser environment)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
