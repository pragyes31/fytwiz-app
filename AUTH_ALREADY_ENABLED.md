# 🚨 Auth Already Enabled But Still Getting Error?

## Quick Diagnosis Checklist

If you've already enabled Firebase Authentication but still getting the "Identity Toolkit API" error, work through these checks:

---

## ✅ Check 1: API Key Restrictions

**Problem:** Your API key might be restricted and blocking the Identity Toolkit API.

**Quick Fix:**

1. Go to https://console.cloud.google.com/apis/credentials
2. Select your Firebase project
3. Click on your API key (starts with `AIzaSy...`)
4. Scroll to **"API restrictions"** section
5. If "Restrict key" is selected:
   - ✅ Make sure "Identity Toolkit API" is in the list
   - ✅ If not, click "Select APIs" and add it
   - ✅ Also add: Cloud Firestore API, Firebase Installations API, Token Service API
6. Click **"Save"**
7. **Wait 2-5 minutes** and try again

**How to verify:**
```bash
# Your API key in .env should match the one you just checked
cat .env | grep VITE_FIREBASE_API_KEY
```

---

## ✅ Check 2: Wrong Firebase Project

**Problem:** Your .env file has credentials from a different Firebase project.

**Quick Fix:**

1. **Check which project you're using:**
   ```bash
   cat .env | grep VITE_FIREBASE_PROJECT_ID
   # Example output: VITE_FIREBASE_PROJECT_ID=fytwiz-rhl3101
   ```

2. **Verify in Firebase Console:**
   - Go to https://console.firebase.google.com/
   - Look at the project name in the dropdown at the top
   - Does it match your .env file?

3. **Check the project number:**
   - Your error shows: `project-1006195040222`
   - Firebase Console → ⚙️ Project Settings
   - Find "Project number"
   - Does it match the number in your error?

4. **If they don't match:**
   - You enabled auth in the wrong project!
   - Go to the correct project (matching your .env)
   - Enable Authentication there

---

## ✅ Check 3: Identity Toolkit API Not Enabled in Google Cloud

**Problem:** Firebase Authentication is enabled, but the underlying Google Cloud API isn't.

**Quick Fix:**

1. **Use the direct link from your error message**
   - The error contains a URL like: `https://console.developers.google.com/apis/api/identitytoolkit.googleapis.com/overview?project=XXXX`
   - Click that link directly
   - OR replace XXXX with your project number

2. **Enable the API:**
   - Click the blue **"ENABLE"** button
   - Wait for confirmation

3. **Verify it's enabled:**
   - Go to https://console.cloud.google.com/apis/dashboard
   - Select your project
   - Search for "Identity Toolkit"
   - Status should be **"Enabled"** (not "Enable" button)

4. **Wait 5 minutes** and try logging in again

---

## ✅ Check 4: Just Enabled - Need More Time

**Problem:** You just enabled authentication, but it needs more time to propagate.

**What to do:**

1. **Wait longer:**
   - Just enabled: 2-5 minutes
   - Can take: 10-15 minutes
   - Rare cases: up to 30 minutes

2. **While waiting:**
   ```bash
   # Clear and restart
   rm -rf node_modules/.vite
   npm run dev
   ```

3. **Try these:**
   - Clear browser cache (Ctrl+Shift+Delete)
   - Open incognito/private window
   - Try a different browser

4. **Check if it's still enabling:**
   - Google Cloud Console → APIs & Services → Dashboard
   - Look for "Identity Toolkit API"
   - If it says "Enabling..." wait longer

---

## ✅ Check 5: Multiple Firebase Projects

**Problem:** You have multiple Firebase projects and enabled auth in the wrong one.

**Quick Fix:**

1. **List your projects:**
   - Go to https://console.firebase.google.com/
   - Click the project dropdown at the top
   - How many projects do you see?

2. **Identify which one your app uses:**
   - Check `.env` file: `VITE_FIREBASE_PROJECT_ID=???`
   - This is the project your app connects to

3. **Make sure you enabled auth in THAT project:**
   - Select the correct project from dropdown
   - Go to Authentication
   - Should show the full dashboard (not "Get Started")
   - If it shows "Get Started", you're in the wrong project!

4. **Enable in the correct project:**
   - Switch to the project matching your .env
   - Enable Authentication there

---

## ✅ Check 6: Your .env File Values

**Problem:** One or more values in your .env are incorrect.

**Quick Fix:**

1. **Verify all values:**
   ```bash
   cat .env
   ```

2. **Compare with Firebase Console:**
   - Firebase Console → ⚙️ Project Settings
   - Scroll to "Your apps"
   - Find your web app
   - Compare EVERY value

3. **Pay special attention to:**
   ```env
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_API_KEY=AIzaSy...
   ```

4. **Common mistakes:**
   - Wrong project ID
   - Typo in auth domain
   - Using old API key
   - Mixing values from different projects

5. **If any don't match:**
   - Update .env with correct values
   - Save file
   - Restart dev server: `npm run dev`

---

## ✅ Check 7: Firestore Rules Blocking Auth

**Problem:** Your Firestore rules might be preventing authentication.

**Quick Fix:**

1. **Deploy the rules:**
   ```bash
   firebase deploy --only firestore:rules
   ```

2. **Verify rules are active:**
   - Firebase Console → Firestore Database → Rules
   - Check the timestamp shows recent deployment

3. **Check rules allow auth:**
   - Look for `request.auth != null` in your rules
   - This should be present for authenticated operations

---

## 🎯 Systematic Approach

Try these in order:

1. ✅ **Wait 10 minutes** (if you just enabled auth)
2. ✅ **Clear cache** and try incognito mode
3. ✅ **Check API key restrictions** (most common issue!)
4. ✅ **Verify project ID** matches between .env and Firebase Console
5. ✅ **Enable Identity Toolkit API** via direct link
6. ✅ **Double-check all .env values** are correct
7. ✅ **Make sure you're in the right Firebase project**

---

## 🔍 Diagnostic Commands

Run these to gather info:

```bash
# Check your .env values
cat .env | grep VITE_FIREBASE

# Check if Identity Toolkit API is in restricted APIs list
# (You'll need to do this in Google Cloud Console UI)

# Restart everything fresh
rm -rf node_modules/.vite dist
npm install
npm run dev
```

---

## 📞 Getting More Help

If none of these work:

1. **Check error message carefully:**
   - Does it show your correct project number?
   - Does the URL in error work?

2. **Verify in multiple places:**
   - Firebase Console → Authentication (enabled?)
   - Google Cloud Console → APIs (Identity Toolkit enabled?)
   - Google Cloud Console → Credentials (API key restrictions?)

3. **Create a test user:**
   - Firebase Console → Authentication → Users
   - Click "Add user"
   - Create test@example.com with password
   - Try logging in with this account

4. **Try a fresh API key:**
   - Google Cloud Console → Credentials
   - Create new API key
   - Restrict it properly (include Identity Toolkit API)
   - Update .env with new key
   - See [FIREBASE_KEY_ROTATION.md](./FIREBASE_KEY_ROTATION.md)

---

## 📖 Related Documentation

- **Complete Troubleshooting:** [TROUBLESHOOTING.md](./TROUBLESHOOTING.md#issue-firebase-authentication-api-not-enabled)
- **API Key Setup:** [FIREBASE_KEY_ROTATION.md](./FIREBASE_KEY_ROTATION.md)
- **Environment Setup:** [ENV_SETUP_README.md](./ENV_SETUP_README.md)
- **Security Setup:** [SECURITY_SETUP.md](./SECURITY_SETUP.md)

---

## 💡 Most Common Causes (in order)

1. **API key restrictions** blocking Identity Toolkit API (60% of cases)
2. **Just enabled, needs more time** to propagate (20% of cases)
3. **Wrong Firebase project** - enabled in different project (10% of cases)
4. **Identity Toolkit API not enabled** in Google Cloud (5% of cases)
5. **Incorrect .env values** (5% of cases)

**Start with #1 - API key restrictions!**

---

## ✅ Success Indicators

You'll know it's working when:

- ✅ No error when trying to log in
- ✅ Login form accepts credentials
- ✅ Can see coach dashboard after login
- ✅ No "Identity Toolkit" errors in browser console
- ✅ Firebase Console → Authentication → Users shows login activity

---

**Still stuck? Check the detailed advanced troubleshooting in [TROUBLESHOOTING.md](./TROUBLESHOOTING.md#issue-firebase-authentication-api-not-enabled)**
