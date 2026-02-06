# Security Migration Guide

This guide helps you migrate to the new secure configuration after the security vulnerability fixes.

## Quick Start

If you're in a hurry, follow these minimal steps:

1. **Pull the latest changes:**
   ```bash
   git pull origin copilot/review-app-vulnerabilities
   ```

2. **Create .env file:**
   ```bash
   cp .env.example .env
   ```
   
   **Troubleshooting:** If you get "file not found" error, see [TROUBLESHOOTING.md](./TROUBLESHOOTING.md#issue-envexample-file-not-found)

3. **Add your Firebase credentials to .env:**
   - Get your credentials from [Firebase Console](https://console.firebase.google.com/)
   - Fill in all the `VITE_FIREBASE_*` variables in your `.env` file

4. **Deploy updated Firestore rules:**
   - Go to [Firebase Console](https://console.firebase.google.com/) → Firestore Database → Rules
   - Copy the contents of `firestore.rules` 
   - Paste into the Firebase Console rules editor
   - Click "Publish"

5. **Test the application:**
   ```bash
   npm run dev
   ```

**Having Issues?** See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for common problems and solutions.

## Detailed Migration Steps

### Step 1: Environment Variables Setup

1. **Copy the example file:**
   ```bash
   cp .env.example .env
   ```

2. **Get your Firebase credentials:**
   - Open [Firebase Console](https://console.firebase.google.com/)
   - Select your project (fytwiz-rhl3101)
   - Go to Project Settings (gear icon) → General
   - Scroll down to "Your apps" section
   - Click on your web app or create one if it doesn't exist
   - Copy the config values from the `firebaseConfig` object

3. **Fill in your .env file:**
   ```env
   VITE_FIREBASE_API_KEY=AIzaSy...
   VITE_FIREBASE_AUTH_DOMAIN=fytwiz-rhl3101.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=fytwiz-rhl3101
   VITE_FIREBASE_STORAGE_BUCKET=fytwiz-rhl3101.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=792457556112
   VITE_FIREBASE_APP_ID=1:792457556112:web:...
   VITE_FIREBASE_MEASUREMENT_ID=G-...
   ```

4. **Verify .env is in .gitignore:**
   ```bash
   git check-ignore .env
   # Should output: .env
   ```

### Step 2: Rotate Your API Keys (IMPORTANT!)

Since your Firebase API keys were previously exposed in the source code, you should rotate them:

**📖 See [FIREBASE_KEY_ROTATION.md](./FIREBASE_KEY_ROTATION.md) for complete step-by-step instructions.**

**Quick Summary:**

1. **Go to Google Cloud Console:**
   - Open [Google Cloud Console](https://console.cloud.google.com/)
   - Select your Firebase project

2. **Create new API key:**
   - Navigate to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy the new key immediately

3. **Restrict the new key:**
   - Add HTTP referrers (your domains)
   - Enable required Firebase APIs
   - Save changes

4. **Update your .env file:**
   - Replace `VITE_FIREBASE_API_KEY` with your new key
   - Keep all other values the same

5. **Test thoroughly:**
   - Test locally: `npm run dev`
   - Test production: `npm run build` then deploy

6. **Delete the old key:**
   - Wait 48 hours to ensure no issues
   - Go back to Google Cloud Console
   - Delete the old exposed key

**Full detailed guide with screenshots and troubleshooting:** [FIREBASE_KEY_ROTATION.md](./FIREBASE_KEY_ROTATION.md)

### Step 3: Deploy New Firestore Security Rules

1. **Review the rules file:**
   - Open `firestore.rules` in your editor
   - Understand the security model (see comments)

2. **Deploy via Firebase Console:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select your project
   - Click "Firestore Database" in the left sidebar
   - Click on the "Rules" tab
   - Copy the entire content of your local `firestore.rules` file
   - Paste into the editor
   - Click "Publish"

3. **Or deploy via Firebase CLI:**
   ```bash
   # Install Firebase CLI if you haven't
   npm install -g firebase-tools
   
   # Login to Firebase
   firebase login
   
   # Deploy rules
   firebase deploy --only firestore:rules
   ```

4. **Test the rules:**
   - Try accessing data as a coach (should work)
   - Try accessing data as a client via magic link (should work)
   - Try accessing data without authentication (should fail)

### Step 4: Verify the Migration

1. **Test as Coach:**
   - Navigate to your app
   - Login as a coach
   - Verify you can see your clients
   - Verify you can create/edit plans
   - Verify you can see progress logs

2. **Test as Client (Magic Link):**
   - Create a test client
   - Copy the magic link
   - Open in incognito/private window
   - Verify you can see the client dashboard
   - Verify you can see workout/diet plans
   - Verify you can submit progress logs

3. **Test Security:**
   - Try accessing `/client/dashboard/random-id` with invalid ID
   - Should show no data or error
   - Try querying Firestore directly with no auth (using Firebase Console)
   - Should be denied for protected collections

4. **Check for errors:**
   ```bash
   # Run the build
   npm run build
   
   # Check for console errors
   npm run dev
   # Open browser console, look for Firebase errors
   ```

### Step 5: Update Deployment Configuration

If you deploy to hosting services (Netlify, Vercel, Firebase Hosting), add environment variables:

**For Netlify:**
- Go to Site Settings → Build & Deploy → Environment
- Add each `VITE_FIREBASE_*` variable

**For Vercel:**
- Go to Project Settings → Environment Variables
- Add each `VITE_FIREBASE_*` variable

**For Firebase Hosting:**
```bash
# Firebase Hosting doesn't support server-side env vars for static sites
# The .env variables are bundled at build time
# Make sure to build with the correct .env file
npm run build
firebase deploy --only hosting
```

## Troubleshooting

### Error: "Missing required Firebase environment variables"

**Solution:** 
- Make sure you created the `.env` file
- Verify all required variables are filled in
- Restart your dev server after creating `.env`

### Error: "FirebaseError: Missing or insufficient permissions"

**Solution:**
- Make sure you deployed the new Firestore rules
- Check that the rules published successfully in Firebase Console
- Verify your authentication state (logged in as coach for protected operations)

### Magic links not working

**Solution:**
- Check that the `clients` collection query rules allow `limit(1)` queries
- Verify the magic link token is being passed correctly in the URL
- Check browser console for Firestore permission errors

### Build errors with environment variables

**Solution:**
- Vite requires variables to start with `VITE_` prefix
- Make sure you're using `import.meta.env.VITE_*` not `process.env.*`
- Restart dev server after changing `.env`

## Rollback Plan

If you need to rollback:

1. **Revert Firestore rules:**
   - Go to Firebase Console → Firestore → Rules
   - Click "Version history"
   - Select previous version
   - Click "Publish"

2. **Revert code changes:**
   ```bash
   git revert <commit-hash>
   git push
   ```

3. **Redeploy:**
   - The old code will use hardcoded credentials (insecure but functional)
   - Plan to re-apply security fixes ASAP

## Support

If you encounter issues during migration:

1. Check the error messages in browser console
2. Verify Firestore rules in Firebase Console
3. Test with Firebase Emulator for local debugging
4. Review the SECURITY.md file for additional context

## Next Steps

After successful migration:

1. ✅ Delete any exposed API keys from Google Cloud Console
2. ✅ Enable Firebase App Check for additional security
3. ✅ Set up monitoring for unusual access patterns
4. ✅ Consider implementing proper client authentication
5. ✅ Schedule regular security audits

Remember: Security is an ongoing process, not a one-time fix!
