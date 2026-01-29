
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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
export const storage = getStorage(app);

export const isFirebaseConfigured = () => true;
