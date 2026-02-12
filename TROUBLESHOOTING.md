# Troubleshooting Guide

## Issue: Do I need to add my Firebase keys to the .env file?

### Question
My .env file has placeholder values like:
```
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
...
```

Do I need to replace these with my actual Firebase credentials?

### Answer

**YES!** You MUST replace ALL placeholder values with your actual Firebase credentials. The app will NOT work with placeholder values.

📖 **See [ENV_SETUP_README.md](./ENV_SETUP_README.md) for complete step-by-step instructions.**

**Quick Summary:**
1. Go to https://console.firebase.google.com/
2. Select your project (fytwiz-rhl3101)
3. Click gear icon ⚙️ → Project Settings
4. Scroll to "Your apps" section → Find your web app
5. Copy all 7 values from the firebaseConfig
6. Replace the placeholder values in your .env file
7. Save the file

**Example - What you need to do:**

❌ **BEFORE (Won't Work):**
```env
VITE_FIREBASE_API_KEY=your_api_key_here
```

✅ **AFTER (Will Work):**
```env
VITE_FIREBASE_API_KEY=AIzaSyD4sJdhARoFthYCztOLAPedjsB1typPcXs
```

Replace **ALL 7 variables** with your actual values!

---

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

## Issue: Firebase Authentication API Not Enabled

### Problem

When trying to log in as a coach, you get this error:

```
Firebase: Error (auth/identity-toolkit-api-has-not-been-used-in-project-XXXX-before-or-it-is-disabled.-enable-it-by-visiting-https://console.developers.google.com/apis/api/identitytoolkit.googleapis.com/overview?project=XXXX-then-retry.-if-you-enabled-this-api-recently,-wait-a-few-minutes-for-the-action-to-propagate-to-our-systems-and-retry.).
```

Or a shorter version:
```
Firebase: Error (auth/identity-toolkit-api-has-not-been-used...)
```

### What This Means

The **Identity Toolkit API** (which powers Firebase Authentication) is not enabled in your Firebase project. This is required for user login/authentication to work.

### Solution

You need to enable Firebase Authentication in your Firebase project. Here's how:

#### Method 1: Enable via Direct Link (Fastest)

1. **Click the link from the error message** (or use this format):
   ```
   https://console.developers.google.com/apis/api/identitytoolkit.googleapis.com/overview?project=YOUR_PROJECT_NUMBER
   ```
   Replace `YOUR_PROJECT_NUMBER` with your project number from the error (e.g., 1006195040222)

2. **Click the "Enable" button** on the page

3. **Wait 2-5 minutes** for the API to activate

4. **Try logging in again**

#### Method 2: Enable via Firebase Console (Recommended)

**Step 1: Go to Firebase Console**
1. Open https://console.firebase.google.com/
2. Select your project

**Step 2: Navigate to Authentication**
1. In the left sidebar, click **"Authentication"**
2. If you see a "Get Started" button, click it
3. This will automatically enable the Authentication API

**Step 3: Set Up Sign-in Method**
1. Click on the **"Sign-in method"** tab
2. Enable **"Email/Password"** provider:
   - Click on "Email/Password"
   - Toggle "Enable" to ON
   - Click "Save"

**Step 4: Wait and Test**
1. Wait 2-5 minutes for changes to propagate
2. Try logging in to your app again

#### Method 3: Enable via Google Cloud Console

1. **Open Google Cloud Console:**
   - Go to https://console.cloud.google.com/
   - Select your Firebase project from the dropdown

2. **Navigate to APIs & Services:**
   - Click the menu (☰) → "APIs & Services" → "Library"

3. **Search for Identity Toolkit:**
   - In the search box, type "Identity Toolkit API"
   - Click on "Identity Toolkit API" in the results

4. **Enable the API:**
   - Click the blue "ENABLE" button
   - Wait for it to be enabled (takes a few seconds)

5. **Verify it's enabled:**
   - Go to "APIs & Services" → "Dashboard"
   - You should see "Identity Toolkit API" in the list of enabled APIs

### After Enabling

1. **Wait 2-5 minutes** for the API to fully activate across Google's systems

2. **Clear your browser cache** (or use incognito/private mode):
   - Press Ctrl+Shift+Delete (Windows/Linux)
   - Press Cmd+Shift+Delete (Mac)
   - Select "Cached images and files"
   - Click "Clear data"

3. **Try logging in again**:
   - Go to your app
   - Try the coach login
   - It should work now!

### Troubleshooting

**If Authentication is ALREADY enabled but you still get the error:**

#### Issue 1: API Key Restrictions Blocking Identity Toolkit

Your Firebase API key might be restricted and not allowing the Identity Toolkit API.

**Solution:**

1. **Go to Google Cloud Console:**
   - https://console.cloud.google.com/
   - Select your Firebase project

2. **Find your API key:**
   - Navigate to "APIs & Services" → "Credentials"
   - Find your Browser key (the one in your .env file)
   - Click on it to edit

3. **Check API restrictions:**
   - Scroll to "API restrictions" section
   - If "Restrict key" is selected, make sure these APIs are checked:
     - ✅ Identity Toolkit API
     - ✅ Cloud Firestore API
     - ✅ Firebase Installations API
     - ✅ Token Service API
   - If "Identity Toolkit API" is NOT in the list, ADD IT
   - Click "Save"

4. **Wait 2-5 minutes** and try again

#### Issue 2: Wrong Firebase Project

You might be using credentials from a different Firebase project.

**Solution:**

1. **Check your .env file:**
   ```env
   VITE_FIREBASE_PROJECT_ID=your-project-id
   ```

2. **Verify it matches Firebase Console:**
   - Go to Firebase Console
   - Check the project name at the top
   - Compare with your `VITE_FIREBASE_PROJECT_ID`

3. **Check the project number in the error:**
   - Error message shows: `project-1006195040222`
   - This should match your Firebase project number
   - Find your project number: Firebase Console → Project Settings

4. **If they don't match:**
   - You're using the wrong credentials
   - Go back to correct Firebase project
   - Copy the correct credentials
   - Update your .env file

#### Issue 3: Identity Toolkit API Not Enabled in Google Cloud

Even if Firebase Authentication is enabled, the underlying API might not be.

**Solution:**

1. **Go directly to the API page:**
   - Use the link from your error message, OR
   - Go to: https://console.developers.google.com/apis/api/identitytoolkit.googleapis.com/overview?project=YOUR_PROJECT_NUMBER
   - Replace YOUR_PROJECT_NUMBER with your actual project number

2. **Click "ENABLE"** if you see the button

3. **Wait 2-5 minutes**

4. **Verify it's enabled:**
   - Go to https://console.cloud.google.com/apis/dashboard
   - Search for "Identity Toolkit"
   - Should show as "Enabled"

#### Issue 4: Recently Enabled - Propagation Delay

If you just enabled Authentication, it can take time to propagate.

**Solution:**

1. **Wait longer:**
   - Initial enablement: 2-5 minutes
   - Sometimes takes: 10-15 minutes
   - In rare cases: up to 30 minutes

2. **While waiting:**
   - Clear browser cache
   - Try in incognito/private mode
   - Restart your dev server: `npm run dev`

3. **Check status:**
   - Google Cloud Console → APIs & Services → Dashboard
   - Look for "Identity Toolkit API"
   - If it shows "Enabling..." wait longer

#### Issue 5: Multiple Firebase Projects

You might have multiple Firebase projects and enabled auth in the wrong one.

**Solution:**

1. **Check which project you're using:**
   - Look at your .env file's `VITE_FIREBASE_PROJECT_ID`
   - This tells you which project your app uses

2. **Go to that specific project:**
   - Firebase Console → Select the correct project from dropdown
   - Make sure you're in the RIGHT project

3. **Enable Authentication in THAT project:**
   - Not in your other projects
   - Only in the project matching your .env file

**If it still doesn't work after 5 minutes:**

1. **Check if Authentication is really enabled:**
   - Go to Firebase Console → Authentication
   - You should see the Authentication dashboard (not a "Get Started" button)

2. **Verify Email/Password is enabled:**
   - Firebase Console → Authentication → Sign-in method
   - Email/Password should show as "Enabled"

3. **Check API is enabled:**
   - Go to https://console.cloud.google.com/
   - Navigate to "APIs & Services" → "Dashboard"
   - Search for "Identity Toolkit API"
   - Status should be "Enabled"

4. **Create a test user:**
   - Firebase Console → Authentication → Users tab
   - Click "Add user"
   - Create a test account with email/password
   - Try logging in with these credentials

5. **Check your .env file:**
   - Make sure all Firebase credentials are correct
   - Especially check `VITE_FIREBASE_AUTH_DOMAIN`
   - It should match your project's auth domain

**If you see "API disabled" or similar:**
- Your Firebase project might be on a restricted plan
- Check Firebase Console → Usage and billing
- Free tier (Spark plan) should be sufficient for this app

**Error persists after 10+ minutes:**
- Contact Firebase Support
- Or create a new Firebase project and migrate

### Prevention

When setting up a new Firebase project in the future:

1. ✅ Always enable Authentication first
2. ✅ Set up Email/Password sign-in method
3. ✅ Test with a dummy user before connecting your app
4. ✅ Wait a few minutes after enabling before testing

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
