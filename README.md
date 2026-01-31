# Fytwiz (MVP)

Coach-first fitness management platform (React + Firebase).

## Local dev

**Prerequisites:** Node.js

```bash
cd fytwiz-app-main
npm install
npm run dev
```

### Photo Upload Setup (For Local Development Only)

**⚠️ IMPORTANT:** This is ONLY needed for local development (localhost). **Production works without CORS setup!**

When deployed to Firebase Hosting, photo uploads work automatically because the app and Firebase Storage are served from the same domain (no CORS issues).

If you encounter CORS errors when uploading photos from localhost, you need to configure Firebase Storage CORS rules. This is a **one-time setup**:

**See: [FIREBASE_STORAGE_CORS_SETUP.md](./FIREBASE_STORAGE_CORS_SETUP.md) for detailed instructions**

Quick setup (requires Google Cloud SDK):
```bash
gsutil cors set cors.json gs://fytwiz-rhl3101.firebasestorage.app
```

**Can't set up CORS?** Just deploy and test on Firebase Hosting - photo uploads work perfectly there!

## Production deploy (Firebase Hosting)

### 1) Install Firebase CLI

```bash
npm i -g firebase-tools
firebase login
```

### 2) Build + deploy

```bash
cd fytwiz-app-main
npm run build
firebase deploy
```

This repo includes:
- `firebase.json` (Hosting + Firestore + Storage rules)
- `.firebaserc` (default project set to `fytwiz-rhl3101`)
- `firestore.rules` and `storage.rules`

### 3) Connect custom domain `fytwiz.com`

In Firebase Console:
- Go to **Hosting → Add custom domain**
- Add `fytwiz.com` (and optionally `www.fytwiz.com`)
- Follow the DNS instructions Firebase gives you (TXT verification + A/AAAA records)

## MVP security notes (important)

- **Progress photos** are uploaded to **Firebase Storage** and only the URL is stored in Firestore.
- The included Firestore/Storage rules are **MVP-safe-ish**, but **still allow public reads** to support the current magic-link flow (no athlete authentication).
- For a true production launch, add an auth-backed athlete session (e.g. exchange magic link for a Firebase Auth custom token via Cloud Functions), then tighten rules so reads require authentication.
