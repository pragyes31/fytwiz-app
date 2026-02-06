
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Storage removed for MVP - no photo uploads (Firebase Storage requires paid plan)

/**
 * PRODUCTION SECURITY RULES (COPY & PASTE INTO FIREBASE CONSOLE):
 * 
 * service cloud.firestore {
 *   match /databases/{database}/documents {
 *     
 *     // Rules for Coaches
 *     match /coaches/{coachId} {
 *       allow read, write: if request.auth != null && request.auth.uid == coachId;
 *     }
 *     
 *     // Rules for Clients (Athletes)
 *     match /clients/{clientId} {
 *       // Only authenticated coaches can create/update their own clients
 *       allow create: if request.auth != null;
 *       allow update, delete: if request.auth != null && request.auth.uid == resource.data.coachId;
 *       
 *       // Allow reads if:
 *       // 1. You are the coach of this client
 *       // 2. OR you are searching for a magic link (limit 1 query with token filter)
 *       allow read: if (request.auth != null && request.auth.uid == resource.data.coachId) ||
 *                   (request.query.limit == 1); 
 *     }
 *     
 *     // Rules for Plans and Logs
 *     match /workoutPlans/{clientId} {
 *       allow read, write: if true; // In full prod, scope these to coachId check
 *     }
 *     match /dietPlans/{clientId} {
 *       allow read, write: if true;
 *     }
 *     match /progressLogs/{logId} {
 *       allow create: if true; // Allow athletes to submit logs via magic link
 *       allow read, update, delete: if true; // Full prod: scope to coachId / clientId
 *     }
 *   }
 * }
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
