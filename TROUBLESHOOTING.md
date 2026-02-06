# Troubleshooting Guide

## Issue: `.env.example` file not found

### Problem
When running `cp .env.example .env`, you get an error:
```
cp : Cannot find path 'C:\Users\rahul\Desktop\fytwiz-app\.env.example' because it does not exist.
```

### Solution

The `.env.example` file was added in recent security fixes. You need to pull the latest changes from the repository:

**Step 1: Pull the latest changes**
```bash
# Save any local changes first (if you have any)
git stash

# Pull the latest changes from the branch
git pull origin copilot/review-app-vulnerabilities

# If you had local changes, restore them
git stash pop
```

**Step 2: Verify the file exists**
```bash
# On Windows (PowerShell/CMD):
dir .env.example

# On Linux/Mac:
ls -la .env.example
```

**Step 3: Copy the file**
```bash
# On Windows (PowerShell):
Copy-Item .env.example .env

# On Windows (CMD):
copy .env.example .env

# On Linux/Mac:
cp .env.example .env
```

**Alternative: Manually create .env file**

If you can't pull the changes, create the `.env` file manually with this content:

```env
# Firebase Configuration
# Copy this file to .env and fill in your Firebase project credentials
# DO NOT commit .env file to version control

VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id_here
```

Then fill in your Firebase credentials (see section below on where to find them).

---

## Issue: Build fails with "Missing required Firebase environment variables"

### Problem
When running `npm run dev` or `npm run build`, you get:
```
Error: Missing required Firebase environment variables. Please copy .env.example to .env and fill in your Firebase credentials.
```

### Solution

1. **Create .env file** (see above)
2. **Get your Firebase credentials** from Firebase Console:
   - Go to https://console.firebase.google.com/
   - Select your project
   - Click the gear icon (⚙️) → Project Settings
   - Scroll down to "Your apps" section
   - Find your web app (or create one)
   - Copy the configuration values

3. **Fill in your .env file** with the values from Firebase Console

**Example:**
```env
VITE_FIREBASE_API_KEY=AIzaSyD4sJdhARoFthYCztOLAPedjsB1typPcXs
VITE_FIREBASE_AUTH_DOMAIN=fytwiz-rhl3101.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=fytwiz-rhl3101
VITE_FIREBASE_STORAGE_BUCKET=fytwiz-rhl3101.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=792457556112
VITE_FIREBASE_APP_ID=1:792457556112:web:d8e5ab672bd93254a5e815
VITE_FIREBASE_MEASUREMENT_ID=G-E475NG18J6
```

4. **Restart your dev server**
```bash
# Stop the server (Ctrl+C)
# Start it again
npm run dev
```

---

## Issue: Firestore permission denied errors

### Problem
Getting `FirebaseError: Missing or insufficient permissions` when trying to access data.

### Solution

1. **Deploy the new Firestore security rules:**
   
   **Option A: Using Firebase CLI (Recommended)**
   ```bash
   # Install Firebase CLI if you haven't
   npm install -g firebase-tools
   
   # Login to Firebase
   firebase login
   
   # Deploy only the rules
   firebase deploy --only firestore:rules
   ```

   **Option B: Using Firebase Console**
   - Go to https://console.firebase.google.com/
   - Select your project
   - Click "Firestore Database" in the left sidebar
   - Click on the "Rules" tab
   - Copy the entire content of your local `firestore.rules` file
   - Paste into the rules editor
   - Click "Publish"

2. **Verify rules are active:**
   - In Firebase Console → Firestore Database → Rules
   - Check that the rules show your recent changes
   - Look for the functions `isCoach()` and `isOwnerCoach()`

3. **Test your application:**
   - Try logging in as a coach
   - Try accessing client data via magic link
   - Check browser console for any permission errors

---

## Issue: npm dependencies have vulnerabilities

### Problem
Running `npm audit` shows vulnerabilities.

### Solution

```bash
# Update dependencies to fix vulnerabilities
npm audit fix

# For major version updates, use force (backup first!)
npm audit fix --force

# Verify vulnerabilities are fixed
npm audit
```

**Note:** The security fixes included updating react-router-dom to fix 7 high-severity vulnerabilities.

---

## Issue: Git merge conflicts

### Problem
When pulling the latest changes, you get merge conflicts.

### Solution

**If you have NO local changes you want to keep:**
```bash
# Reset to match the remote branch exactly
git fetch origin
git reset --hard origin/copilot/review-app-vulnerabilities
```

**If you have local changes to preserve:**
```bash
# See what conflicts exist
git status

# For each conflicted file, choose what to keep:
# Keep remote version:
git checkout --theirs path/to/file

# Keep your version:
git checkout --ours path/to/file

# After resolving all conflicts:
git add .
git commit -m "Resolved merge conflicts"
```

---

## Issue: Application doesn't start / blank page

### Problem
The application loads but shows a blank page or crashes immediately.

### Troubleshooting Steps

1. **Check browser console for errors:**
   - Press F12 in your browser
   - Look at the Console tab
   - Look for red error messages

2. **Common causes and fixes:**

   **A. Environment variables not loaded:**
   - Make sure `.env` file exists in project root
   - Restart dev server after creating `.env`
   - Verify variables start with `VITE_` prefix

   **B. Firebase configuration invalid:**
   - Double-check all values in `.env` are correct
   - Make sure there are no extra quotes or spaces
   - Verify project ID matches your Firebase project

   **C. Firestore rules too restrictive:**
   - Check Firebase Console for permission errors
   - Verify you deployed the new `firestore.rules`
   - Test with Firebase Console to isolate the issue

3. **Check the dev server logs:**
   ```bash
   # Look for error messages in the terminal where you ran:
   npm run dev
   ```

4. **Try a clean rebuild:**
   ```bash
   # Stop the dev server
   # Remove build artifacts
   rm -rf dist node_modules/.vite
   
   # Restart
   npm run dev
   ```

---

## Issue: Magic links not working

### Problem
Clicking on a magic link shows "Invalid Link" or doesn't work.

### Solution

1. **Check the magic link format:**
   - Should be: `https://your-domain.com/#/client-login/TOKEN`
   - Token is a base64-encoded string
   - Make sure the full URL is being copied

2. **Check Firestore rules:**
   - Magic links require specific query permissions
   - Verify `clients` collection allows queries with `limit == 1`
   - Deploy the latest `firestore.rules`

3. **Test in browser console:**
   ```javascript
   // In browser console, test the token lookup:
   const token = "YOUR_TOKEN_HERE";
   const q = query(collection(db, 'clients'), where('magicLinkToken', '==', token), limit(1));
   getDocs(q).then(s => console.log("Found:", s.docs.length, "docs"));
   ```

4. **Check if token exists in Firestore:**
   - Go to Firebase Console → Firestore Database
   - Open the `clients` collection
   - Find your client document
   - Verify `magicLinkToken` field exists and has a value

---

## Issue: Can't deploy to Firebase Hosting

### Problem
`firebase deploy` fails or application doesn't work after deployment.

### Solution

1. **Build the application first:**
   ```bash
   # Make sure .env has production values
   npm run build
   
   # This creates the 'dist' folder
   ```

2. **Verify firebase.json configuration:**
   ```json
   {
     "hosting": {
       "public": "dist",
       "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
       "rewrites": [{
         "source": "**",
         "destination": "/index.html"
       }]
     }
   }
   ```

3. **Deploy:**
   ```bash
   firebase deploy --only hosting
   ```

4. **Set environment variables for hosting:**
   - **IMPORTANT:** Vite environment variables are bundled at BUILD time
   - Make sure your `.env` has the correct values BEFORE running `npm run build`
   - The variables are compiled into the JavaScript bundle
   - You cannot change them after deployment without rebuilding

5. **Test the deployed application:**
   - Visit your Firebase Hosting URL
   - Check browser console for errors
   - Test both coach and client flows

---

## Getting Help

If you're still stuck after trying these solutions:

1. **Check the documentation:**
   - `SECURITY.md` - Security details and architecture
   - `MIGRATION.md` - Step-by-step migration guide
   - `SUMMARY.md` - Quick reference

2. **Check Firebase Console:**
   - Look for error messages in Usage and Logs
   - Verify your rules are deployed
   - Check authentication status

3. **Create a detailed issue report with:**
   - What you're trying to do
   - What error message you're seeing
   - What you've already tried
   - Screenshots of errors (browser console and terminal)
   - Your operating system (Windows/Mac/Linux)

4. **Common information needed:**
   ```bash
   # Node version
   node --version
   
   # npm version
   npm --version
   
   # Check if .env exists
   ls -la .env  # Mac/Linux
   dir .env     # Windows
   
   # Check npm audit status
   npm audit
   
   # Check Firebase CLI version
   firebase --version
   ```
