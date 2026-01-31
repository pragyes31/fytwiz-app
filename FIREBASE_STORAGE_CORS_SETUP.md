# Firebase Storage CORS Setup

## Problem

When uploading photos from localhost during development, you may encounter a CORS error:

```
Access to XMLHttpRequest at 'https://firebasestorage.googleapis.com/...' 
from origin 'http://localhost:3000' has been blocked by CORS policy
```

This happens because Firebase Storage doesn't allow cross-origin requests by default.

## Solution

You need to configure CORS rules on your Firebase Storage bucket. This is a **one-time setup** that needs to be done by someone with access to the Firebase project.

### Prerequisites

- Google Cloud SDK installed (`gcloud` command)
- Access to the Firebase project (fytwiz-rhl3101)

### Step 1: Install Google Cloud SDK

If you don't have `gsutil` installed:

**macOS:**
```bash
brew install google-cloud-sdk
```

**Windows:**
Download from: https://cloud.google.com/sdk/docs/install

**Linux:**
```bash
curl https://sdk.cloud.google.com | bash
exec -l $SHELL
```

### Step 2: Authenticate with Google Cloud

```bash
gcloud auth login
```

This will open a browser window for authentication.

### Step 3: Apply CORS Configuration

Run this command from the project root directory:

```bash
gsutil cors set cors.json gs://fytwiz-rhl3101.firebasestorage.app
```

**Note:** Replace `fytwiz-rhl3101.firebasestorage.app` with your actual Firebase Storage bucket name if different.

### Step 4: Verify CORS Configuration

To check if CORS is configured correctly:

```bash
gsutil cors get gs://fytwiz-rhl3101.firebasestorage.app
```

This should display the CORS rules from `cors.json`.

## What the CORS Configuration Does

The `cors.json` file allows:
- **Origins:** localhost:3000, localhost:5173 (Vite default), and production domains
- **Methods:** GET, POST, PUT, DELETE, HEAD
- **Headers:** Standard headers needed for file uploads
- **Cache:** CORS preflight responses cached for 1 hour (3600 seconds)

## Alternative: Use Firebase Emulator (Development Only)

For local development without CORS issues, you can use Firebase Emulator Suite:

```bash
# Install Firebase tools
npm install -g firebase-tools

# Start emulator
firebase emulators:start --only storage
```

Then update your code to use the emulator endpoint when in development mode.

## Troubleshooting

### Error: "You need Owner or Editor permissions"

If you get a permissions error, you need to:
1. Ask the Firebase project owner to grant you Editor or Owner access
2. OR ask them to run the CORS setup command

### CORS Still Not Working

1. Clear browser cache and cookies
2. Check that you're using the correct bucket name
3. Wait a few minutes for changes to propagate
4. Verify the CORS configuration with the `gsutil cors get` command

### Development Without CORS Setup

If you can't configure CORS immediately, you can:
1. Use the Firebase Emulator for local development
2. Deploy to Firebase Hosting and test there (no CORS issues in production)
3. Skip photo uploads during testing

## For Repository Maintainers

This is a **one-time setup** that should be documented in the onboarding process for new developers. The CORS configuration allows the app to work seamlessly in both development and production environments.
