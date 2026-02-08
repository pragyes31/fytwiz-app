# 🔐 Firebase Authentication Setup Guide

## Quick Fix: Identity Toolkit API Error

If you're seeing this error:
```
Firebase: Error (auth/identity-toolkit-api-has-not-been-used...)
```

**This means Firebase Authentication is not enabled.** Here's the 2-minute fix:

---

## ✅ Solution (2 Minutes)

### Method 1: Via Firebase Console (Easiest)

1. **Open Firebase Console**
   - Go to: https://console.firebase.google.com/
   - Select your project

2. **Enable Authentication**
   - Click **"Authentication"** in the left sidebar
   - Click **"Get Started"** button (if you see it)

3. **Enable Email/Password Sign-in**
   - Click the **"Sign-in method"** tab
   - Click on **"Email/Password"**
   - Toggle **"Enable"** to ON
   - Click **"Save"**

4. **Wait & Test**
   - Wait 2-5 minutes for the API to activate
   - Try logging in to your app again
   - ✅ Should work now!

---

### Method 2: Via Direct Link (Alternative)

If you have the error message with a URL:

1. **Click the link from your error message**
   - It looks like: `https://console.developers.google.com/apis/api/identitytoolkit.googleapis.com/overview?project=XXXX`
   - Or copy it from the error

2. **Enable the API**
   - Click the blue **"Enable"** button
   - Wait for it to activate (takes 30 seconds)

3. **Test**
   - Wait 2-5 minutes total
   - Try logging in again

---

## 📸 Visual Guide

### Step 1: Firebase Console - Authentication
```
Firebase Console
├── [Your Project Name]
    ├── ⚙️ Project Settings
    ├── 👤 Authentication  ← Click here
    │   ├── Users
    │   ├── Sign-in method ← Enable Email/Password here
    │   └── Settings
    ├── 📊 Firestore Database
    └── ...
```

### Step 2: Sign-in Method Tab
```
Authentication > Sign-in method

Providers:
┌────────────────────────────────────────┐
│ Email/Password          [Enable] ←────┤ Toggle this ON
├────────────────────────────────────────┤
│ Phone                   [Disabled]     │
├────────────────────────────────────────┤
│ Google                  [Disabled]     │
└────────────────────────────────────────┘
```

### What You Should See After Enabling

**Before (Not Enabled):**
- Authentication page shows "Get Started" button
- Can't log in to your app
- Get "Identity Toolkit API" error

**After (Enabled):**
- Authentication dashboard shows Users, Sign-in methods, etc.
- Email/Password shows as "Enabled" in Sign-in method tab
- Can log in to your app successfully

---

## 🔍 Verify It's Working

### Check 1: Firebase Console
1. Go to Firebase Console → Authentication
2. You should see the full dashboard (not a "Get Started" button)
3. Sign-in method tab should show Email/Password as "Enabled"

### Check 2: Google Cloud Console
1. Go to https://console.cloud.google.com/
2. Navigate to "APIs & Services" → "Dashboard"
3. Search for "Identity Toolkit API"
4. Status should be "Enabled"

### Check 3: Test Login
1. Go to your app (http://localhost:5173)
2. Try logging in as a coach
3. Should work without errors!

---

## 🆘 Still Not Working?

### Wait Longer
- Sometimes it takes 5-10 minutes for the API to fully activate
- Clear your browser cache and try again
- Try in an incognito/private window

### Create a Test User
1. Firebase Console → Authentication → Users
2. Click "Add user"
3. Create a test account:
   - Email: test@example.com
   - Password: TestPassword123!
4. Try logging in with this account

### Check Your .env File
Make sure your Firebase credentials are correct:
```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com  ← Must match!
VITE_FIREBASE_PROJECT_ID=your-project
...
```

### Check Firestore Rules
Make sure you deployed the security rules:
```bash
firebase deploy --only firestore:rules
```

---

## 📋 Complete Setup Checklist

Before you can use Firebase Authentication:

- [ ] Created Firebase project
- [ ] Added web app to project
- [ ] Copied Firebase credentials to .env
- [ ] **Enabled Authentication in Firebase Console**
- [ ] **Enabled Email/Password sign-in method**
- [ ] Waited 2-5 minutes for API activation
- [ ] Deployed Firestore rules
- [ ] Tested login in your app

---

## 🎯 Why This Happens

Firebase Authentication is a separate service that needs to be explicitly enabled. When you create a new Firebase project:

- ✅ Firebase is created
- ✅ Firestore is available
- ❌ Authentication is NOT enabled by default

You must manually:
1. Enable the Authentication service
2. Choose which sign-in methods to allow
3. Wait for the Identity Toolkit API to activate

This is a security feature to prevent accidental authentication setup.

---

## 🔗 Related Documentation

- **Full Setup Guide:** [SECURITY_SETUP.md](./SECURITY_SETUP.md)
- **Environment Variables:** [ENV_SETUP_README.md](./ENV_SETUP_README.md)
- **All Troubleshooting:** [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- **API Key Rotation:** [FIREBASE_KEY_ROTATION.md](./FIREBASE_KEY_ROTATION.md)

---

## 💡 Pro Tips

**For Future Projects:**
1. ✅ Always enable Authentication first when setting up Firebase
2. ✅ Enable Email/Password before connecting your app
3. ✅ Create a test user to verify it's working
4. ✅ Wait a few minutes after enabling before testing

**Security Best Practices:**
- Only enable sign-in methods you actually use
- Set up Firebase App Check for additional security
- Use strong password requirements
- Enable multi-factor authentication (MFA) for production

---

## ✅ Success!

Once you complete these steps:
- ✅ Identity Toolkit API will be enabled
- ✅ Authentication service will be active
- ✅ You can log in as a coach
- ✅ Email/Password authentication works

Your app is now ready to use! 🎉

---

**Still stuck?** See the detailed troubleshooting section in [TROUBLESHOOTING.md](./TROUBLESHOOTING.md#issue-firebase-authentication-api-not-enabled)
