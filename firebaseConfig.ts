
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
  apiKey: "AIzaSyD4sJdhARoFthYCztOLAPedjsB1typPcXs",
  authDomain: "fytwiz-rhl3101.firebaseapp.com",
  projectId: "fytwiz-rhl3101",
  storageBucket: "fytwiz-rhl3101.firebasestorage.app",
  messagingSenderId: "792457556112",
  appId: "1:792457556112:web:d8e5ab672bd93254a5e815",
  measurementId: "G-E475NG18J6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// Storage export removed - photo upload feature disabled for MVP

export const isFirebaseConfigured = () => true;
