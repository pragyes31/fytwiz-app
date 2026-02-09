
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Storage removed for MVP - no photo uploads (Firebase Storage requires paid plan)

/**
 * PRODUCTION SECURITY RULES:
 * See firestore.rules for the full ruleset.
 * Key security model:
 * - Coach writes require request.auth.uid == coachId
 * - Client reads rely on unguessable doc IDs + magic link token hashing
 * - Magic link lookup queries by SHA-256 hash, not raw token
 * - Progress logs are validated and immutable (no update/delete)
 * - Collection-wide listing is blocked where possible
 */

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Validate that all required environment variables are set
if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId) {
  throw new Error(
    'Missing required Firebase environment variables. Please copy .env.example to .env and fill in your Firebase credentials.'
  );
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// Storage export removed - photo upload feature disabled for MVP

export const isFirebaseConfigured = () => true;
