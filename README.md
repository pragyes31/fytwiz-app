# Fytwiz (MVP)

Coach-first fitness management platform (React + Firebase).

## Local dev

**Prerequisites:** Node.js

```bash
cd fytwiz-app-main
npm install
npm run dev
```

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
