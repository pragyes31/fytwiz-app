# 📝 .env File Setup - Quick Answer

## ❓ Do I need to add my keys to the .env file?

**YES!** You need to replace ALL the placeholder values with your actual Firebase credentials.

The `.env` file you have right now looks like this:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
...
```

**These are just placeholders!** The app will NOT work until you replace them with real values from your Firebase Console.

---

## 🔑 How to Get Your Firebase Credentials

### Step 1: Open Firebase Console

Go to: **https://console.firebase.google.com/**

### Step 2: Select Your Project

Click on your project: **fytwiz-rhl3101**

### Step 3: Go to Project Settings

1. Click the **gear icon** ⚙️ (top left, next to "Project Overview")
2. Click **"Project Settings"**

### Step 4: Find Your Web App Config

1. Scroll down to the **"Your apps"** section
2. Look for the **web app** icon (</>)
3. If you don't see a web app, click **"Add app"** → **Web** (</>) → follow prompts
4. You'll see a code snippet that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyD4sJdhARoFthYCztOLAPedjsB1typPcXs",
  authDomain: "fytwiz-rhl3101.firebaseapp.com",
  projectId: "fytwiz-rhl3101",
  storageBucket: "fytwiz-rhl3101.firebasestorage.app",
  messagingSenderId: "792457556112",
  appId: "1:792457556112:web:d8e5ab672bd93254a5e815",
  measurementId: "G-E475NG18J6"
};
```

### Step 5: Copy Values to Your .env File

Open your `.env` file in any text editor (Notepad, VS Code, etc.) and replace:

```env
# BEFORE (won't work):
VITE_FIREBASE_API_KEY=your_api_key_here

# AFTER (will work):
VITE_FIREBASE_API_KEY=AIzaSyD4sJdhARoFthYCztOLAPedjsB1typPcXs
```

Do this for **ALL 7 values**:
- ✅ VITE_FIREBASE_API_KEY
- ✅ VITE_FIREBASE_AUTH_DOMAIN
- ✅ VITE_FIREBASE_PROJECT_ID
- ✅ VITE_FIREBASE_STORAGE_BUCKET
- ✅ VITE_FIREBASE_MESSAGING_SENDER_ID
- ✅ VITE_FIREBASE_APP_ID
- ✅ VITE_FIREBASE_MEASUREMENT_ID

---

## 📋 Example: Before and After

### ❌ BEFORE (Won't Work)

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id_here
```

### ✅ AFTER (Will Work)

```env
VITE_FIREBASE_API_KEY=AIzaSyD4sJdhARoFthYCztOLAPedjsB1typPcXs
VITE_FIREBASE_AUTH_DOMAIN=fytwiz-rhl3101.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=fytwiz-rhl3101
VITE_FIREBASE_STORAGE_BUCKET=fytwiz-rhl3101.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=792457556112
VITE_FIREBASE_APP_ID=1:792457556112:web:d8e5ab672bd93254a5e815
VITE_FIREBASE_MEASUREMENT_ID=G-E475NG18J6
```

---

## ✅ After You Fill In Your Values

1. **Save the .env file**

2. **Deploy Firestore security rules:**
   ```bash
   firebase deploy --only firestore:rules
   ```

3. **Start your development server:**
   ```bash
   npm run dev
   ```

4. **Test your app:**
   - Open http://localhost:5173
   - Try logging in
   - Everything should work now!

---

## 🔐 Security: Rotate Your API Key

The old Firebase API key was exposed in the repository's source code. After getting your app working, you should rotate (replace) it with a new key.

**See:** [FIREBASE_KEY_ROTATION.md](./FIREBASE_KEY_ROTATION.md) for step-by-step instructions.

---

## ⚠️ Common Mistakes

### Mistake 1: Keeping the Placeholder Values
**Wrong:** `VITE_FIREBASE_API_KEY=your_api_key_here`  
**Right:** `VITE_FIREBASE_API_KEY=AIzaSyD4sJdhARoFthYCztOLAPedjsB1typPcXs`

### Mistake 2: Adding Quotes
**Wrong:** `VITE_FIREBASE_API_KEY="AIzaSy..."`  
**Right:** `VITE_FIREBASE_API_KEY=AIzaSy...` (no quotes needed)

### Mistake 3: Adding Spaces Around =
**Wrong:** `VITE_FIREBASE_API_KEY = AIzaSy...`  
**Right:** `VITE_FIREBASE_API_KEY=AIzaSy...` (no spaces)

### Mistake 4: Committing .env to Git
The `.env` file should **NEVER** be committed to Git. It's already in `.gitignore`, but double-check:
```bash
git status
# .env should NOT appear in the list
```

---

## 🆘 Troubleshooting

### Error: "Missing required Firebase environment variables"

**This means:** You haven't filled in your .env file, or you didn't restart the dev server.

**Solution:**
1. Make sure you replaced ALL placeholder values
2. Save the .env file
3. Stop the dev server (Ctrl+C)
4. Start it again: `npm run dev`

### Error: "Cannot find module '@env'"

**This means:** The .env file doesn't exist.

**Solution:**
1. Make sure you created `.env` (not `.env.example`)
2. It should be in the root directory of your project

### App starts but I get Firebase errors

**This means:** One or more values in your .env are incorrect.

**Solution:**
1. Double-check each value against Firebase Console
2. Make sure you copied the complete values (no truncation)
3. Check for typos or extra characters

---

## 📚 Need More Help?

- **Full setup guide:** [SECURITY_SETUP.md](./SECURITY_SETUP.md)
- **Troubleshooting:** [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- **API key rotation:** [FIREBASE_KEY_ROTATION.md](./FIREBASE_KEY_ROTATION.md)

---

## Quick Summary

✅ **YES, you must replace the placeholder values**  
✅ **Get values from Firebase Console → Project Settings**  
✅ **Replace ALL 7 values in your .env file**  
✅ **Save, deploy rules, then npm run dev**  
✅ **Never commit .env to Git**  
✅ **Rotate the exposed API key after setup**

**That's it!** Your app should work once you fill in the real Firebase credentials. 🎉
