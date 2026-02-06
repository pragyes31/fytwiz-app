# Firebase API Key Rotation Guide

## Why Rotate API Keys?

Your Firebase API keys were previously exposed in the source code repository. Anyone with access to the repository (including through Git history) could see these credentials. To maintain security, you should rotate (replace) these keys with new ones.

## ⚠️ Important Notes Before Starting

- **Backup First:** Make sure you have access to Firebase Console with proper permissions
- **Downtime:** There will be brief downtime during the rotation (typically 2-5 minutes)
- **Test Environment:** If possible, test this process in a development/staging environment first
- **Coordinate:** If working in a team, notify everyone before rotating keys

## Step-by-Step Process

### Phase 1: Preparation (5 minutes)

#### Step 1: Document Current Configuration

1. **Open your current `.env` file** and save a backup:
   ```bash
   # Create a backup (DO NOT commit this file!)
   cp .env .env.backup
   ```

2. **Note your current configuration:**
   - API Key
   - Project ID
   - Auth Domain
   - All other Firebase settings

3. **Verify you have admin access:**
   - Go to https://console.firebase.google.com/
   - Select your project (fytwiz-rhl3101)
   - Make sure you can access Project Settings

---

### Phase 2: Create New API Key (10 minutes)

#### Step 2: Navigate to Google Cloud Console

1. **Open Google Cloud Console:**
   - Go to https://console.cloud.google.com/
   - You'll be redirected to sign in with your Google account

2. **Select your Firebase project:**
   - Click the project dropdown at the top
   - Find and select your project (fytwiz-rhl3101)

#### Step 3: Find Current API Keys

1. **Navigate to API Keys:**
   - In the left sidebar, click "APIs & Services"
   - Click "Credentials"

2. **Identify your Firebase API key:**
   - Look for a key named "Browser key (auto created by Firebase)" or similar
   - It will start with `AIzaSy...`
   - **DO NOT delete this yet!** (we'll delete it after testing the new one)

#### Step 4: Create New API Key

1. **Create a new API key:**
   - Click the "+ CREATE CREDENTIALS" button at the top
   - Select "API key"
   - A popup will show your new API key - **COPY THIS IMMEDIATELY**

2. **Save your new key temporarily:**
   - Paste it in a secure note/text editor
   - You'll need this for your `.env` file

#### Step 5: Restrict the New API Key (IMPORTANT!)

**This is crucial for security!**

1. **Click "RESTRICT KEY" in the popup** (or click the pencil/edit icon next to your new key)

2. **Set Application Restrictions:**
   - Choose "HTTP referrers (web sites)"
   - Click "ADD AN ITEM"
   - Add your domains:
     ```
     https://your-domain.com/*
     https://fytwiz-rhl3101.web.app/*
     https://fytwiz-rhl3101.firebaseapp.com/*
     http://localhost:5173/*
     http://localhost:3000/*
     ```
   - Add `*` for development (remove in production): `http://localhost:*/*`

3. **Set API Restrictions:**
   - Select "Restrict key"
   - Enable these APIs (check the boxes):
     - ✅ Firebase App Check API
     - ✅ Cloud Firestore API
     - ✅ Identity Toolkit API (Firebase Authentication)
     - ✅ Token Service API
     - ✅ Firebase Installations API
     - ✅ Firebase Remote Config API (if you use it)
     - ✅ Firebase Storage API (if you use it)

4. **Click "SAVE"**

5. **Name your key:**
   - Edit the name to something meaningful like "Firebase Web App Key (2026-02)"
   - This helps you track which key is which

---

### Phase 3: Update Your Application (5 minutes)

#### Step 6: Update .env File

1. **Open your `.env` file** in a text editor

2. **Replace ONLY the API key:**
   ```env
   # OLD (remove this line):
   VITE_FIREBASE_API_KEY=AIzaSyD4sJdhARoFthYCztOLAPedjsB1typPcXs
   
   # NEW (use your new key from Step 4):
   VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   
   # Keep all other values the same:
   VITE_FIREBASE_AUTH_DOMAIN=fytwiz-rhl3101.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=fytwiz-rhl3101
   VITE_FIREBASE_STORAGE_BUCKET=fytwiz-rhl3101.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=792457556112
   VITE_FIREBASE_APP_ID=1:792457556112:web:d8e5ab672bd93254a5e815
   VITE_FIREBASE_MEASUREMENT_ID=G-E475NG18J6
   ```

3. **Save the file**

4. **DO NOT commit this to Git!**
   - Verify `.env` is in `.gitignore`
   ```bash
   git check-ignore .env
   # Should output: .env
   ```

---

### Phase 4: Test the New Key (10 minutes)

#### Step 7: Test Locally

1. **Restart your development server:**
   ```bash
   # Stop the current server (Ctrl+C)
   
   # Clear any cached builds
   rm -rf dist node_modules/.vite
   
   # Start the dev server
   npm run dev
   ```

2. **Test all functionality:**

   **A. Test Coach Login:**
   - Navigate to your app (usually http://localhost:5173)
   - Try to log in as a coach
   - ✅ Should work without errors

   **B. Test Reading Data:**
   - After login, view your dashboard
   - Try to access client list
   - Open a client's details
   - ✅ All data should load properly

   **C. Test Writing Data:**
   - Try to create a new client
   - Try to edit a workout plan
   - Add a progress log
   - ✅ All writes should succeed

   **D. Test Magic Link:**
   - Create a test client
   - Copy their magic link
   - Open in an incognito/private window
   - ✅ Should authenticate and show client dashboard

3. **Check browser console:**
   - Press F12
   - Look for any Firebase errors (there should be none)

#### Step 8: Test Production Build

1. **Build for production:**
   ```bash
   npm run build
   ```
   - ✅ Should complete without errors

2. **Preview production build:**
   ```bash
   npm run preview
   ```
   - Test the same functionality as above
   - ✅ Everything should work

---

### Phase 5: Deploy and Verify (10 minutes)

#### Step 9: Deploy to Firebase Hosting

1. **Deploy with the new key:**
   ```bash
   # Deploy hosting
   firebase deploy --only hosting
   ```

2. **Wait for deployment to complete:**
   - Should take 1-2 minutes
   - You'll see a URL when it's done

#### Step 10: Test Production

1. **Open your live application:**
   - Go to your Firebase Hosting URL
   - Usually: https://fytwiz-rhl3101.web.app/

2. **Test all functionality again:**
   - ✅ Coach login
   - ✅ Data reading
   - ✅ Data writing  
   - ✅ Magic links

3. **Check for errors:**
   - Open browser console (F12)
   - Look for any Firebase authentication or permission errors
   - ✅ Should see no errors

---

### Phase 6: Clean Up Old Key (5 minutes)

⚠️ **ONLY proceed if Step 10 testing was successful!**

#### Step 11: Disable Old API Key

1. **Go back to Google Cloud Console:**
   - https://console.cloud.google.com/
   - Navigate to APIs & Services → Credentials

2. **Find the OLD API key:**
   - Look for the key starting with `AIzaSyD4sJdhARoFthYCztOLAPedjsB1typPcXs`
   - It's probably named "Browser key (auto created by Firebase)"

3. **Disable it first (DON'T delete yet):**
   - Click on the key name
   - Click "DISABLE" button
   - Confirm

4. **Monitor for 24-48 hours:**
   - Make sure your app still works
   - Check for any errors in Firebase Console
   - Check usage logs

5. **After 48 hours, if no issues, DELETE the old key:**
   - Go back to the old key
   - Click "DELETE"
   - Confirm deletion

---

## Update Team Members

If you work with a team:

### Step 12: Notify Your Team

1. **Send message to team:**
   ```
   Subject: Firebase API Key Rotated - Action Required
   
   The Firebase API key has been rotated for security purposes.
   
   Action Required:
   1. Pull the latest code: git pull
   2. Delete your local .env file
   3. Copy .env.example to .env
   4. Contact [your name] for the new Firebase credentials
   5. DO NOT use the old credentials from Git history
   
   Timeline:
   - New key is active now
   - Old key will be disabled in 48 hours
   - Old key will be deleted in 1 week
   ```

2. **Share new credentials securely:**
   - Use a password manager (1Password, LastPass, etc.)
   - Or use encrypted messaging (Signal, etc.)
   - **NEVER share via email, Slack, or other unencrypted channels**

3. **Verify everyone has updated:**
   - Ask team members to confirm
   - Check that everyone can run the app locally

---

## Troubleshooting

### Error: "API key not valid"

**Cause:** The API key is not properly configured or restricted incorrectly.

**Solution:**
1. Check that you copied the full key (starts with `AIzaSy...`)
2. Verify HTTP referrer restrictions include your domain
3. Make sure you enabled the correct APIs in restrictions

### Error: "This API key is not authorized to use this service or API"

**Cause:** You restricted the API key but didn't enable the necessary APIs.

**Solution:**
1. Go to Google Cloud Console → Credentials
2. Edit your API key
3. In "API restrictions", make sure all Firebase APIs are enabled
4. Save changes and wait 1-2 minutes for propagation

### App works locally but not in production

**Cause:** HTTP referrer restrictions don't include your production domain.

**Solution:**
1. Edit the API key in Google Cloud Console
2. Add your production domain to HTTP referrers:
   ```
   https://your-production-domain.com/*
   https://fytwiz-rhl3101.web.app/*
   https://fytwiz-rhl3101.firebaseapp.com/*
   ```
3. Save and wait 1-2 minutes

### Old API key still being used somewhere

**Cause:** Cached builds or team members using old .env files.

**Solution:**
1. Clear build cache: `rm -rf dist node_modules/.vite`
2. Rebuild: `npm run build`
3. Redeploy: `firebase deploy --only hosting`
4. Notify team to update their .env files

---

## Security Best Practices After Rotation

### 1. Regular Rotation Schedule
- Rotate keys every 90 days
- Set a calendar reminder
- Document each rotation

### 2. Key Management
- Store keys in a password manager
- Never commit keys to version control
- Use separate keys for dev/staging/production

### 3. Monitoring
- Enable Firebase App Check
- Monitor usage in Google Cloud Console
- Set up alerts for unusual activity
- Review Firebase Console logs regularly

### 4. Access Control
- Limit who has access to Google Cloud Console
- Use the principle of least privilege
- Audit team member access regularly
- Remove access for team members who leave

### 5. Additional Security Measures
- Enable 2FA on all Google accounts with Firebase access
- Use a dedicated Google account for production Firebase projects
- Regularly review Firestore security rules
- Keep dependencies updated (`npm audit`)

---

## Checklist

Use this checklist to ensure you've completed all steps:

- [ ] Backed up current `.env` file
- [ ] Documented current configuration
- [ ] Created new API key in Google Cloud Console
- [ ] Copied new API key
- [ ] Restricted new API key (HTTP referrers)
- [ ] Restricted new API key (API restrictions)
- [ ] Named new API key clearly
- [ ] Updated `.env` with new key
- [ ] Tested locally (coach login, data read/write, magic links)
- [ ] Built for production successfully
- [ ] Deployed to Firebase Hosting
- [ ] Tested production (all functionality)
- [ ] Disabled old API key
- [ ] Monitored for 48 hours
- [ ] Deleted old API key (after 48 hours)
- [ ] Notified team members (if applicable)
- [ ] Updated password manager with new key
- [ ] Set reminder for next rotation (90 days)

---

## Quick Reference

**Google Cloud Console (API Keys):**
https://console.cloud.google.com/apis/credentials

**Firebase Console:**
https://console.firebase.google.com/

**Project ID:** fytwiz-rhl3101

**Old API Key (to delete):** AIzaSyD4sJdhARoFthYCztOLAPedjsB1typPcXs

**Rotation Frequency:** Every 90 days

**Support:** See TROUBLESHOOTING.md for common issues

---

## Summary

You've successfully rotated your Firebase API key! 🎉

Key takeaways:
- Old key was exposed in source control
- New key is properly restricted
- Application is tested and working
- Old key will be deleted after monitoring period
- Set a reminder to rotate again in 90 days

Remember: API key rotation is a critical security practice. Make it a regular part of your security maintenance routine.
