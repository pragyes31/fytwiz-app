# Firebase Storage CORS Setup

## 🆕 Starting Fresh? Clone to Desktop

**Do you have multiple fytwiz folders and confused which one to use?** Start fresh with a clean clone!

### Clone Repository to Desktop

**Windows PowerShell:**
```powershell
# Navigate to Desktop
cd $env:USERPROFILE\Desktop

# Clone the repository
git clone https://github.com/pragyes31/fytwiz-app.git

# Navigate into the project
cd fytwiz-app

# Verify you're in the right place
dir cors.json
# Should show cors.json file

# Install dependencies
npm install

# You're ready! Continue with Step 2 (Authentication) below
```

**Windows Command Prompt:**
```cmd
# Navigate to Desktop
cd %USERPROFILE%\Desktop

# Clone the repository
git clone https://github.com/pragyes31/fytwiz-app.git

# Navigate into the project
cd fytwiz-app

# Verify you're in the right place
dir cors.json

# Install dependencies
npm install
```

**macOS/Linux:**
```bash
# Navigate to Desktop
cd ~/Desktop

# Clone the repository
git clone https://github.com/pragyes31/fytwiz-app.git

# Navigate into the project
cd fytwiz-app

# Verify you're in the right place
ls cors.json
# Should show cors.json file

# Install dependencies
npm install

# You're ready! Continue with Step 2 (Authentication) below
```

**After cloning:**
- Your project is now at: Desktop/fytwiz-app
- All files are fresh from the repository
- You can delete the old folders in Documents if you want
- Continue with Step 2 (Authenticate with Google Cloud) below for CORS setup

---

## ⚠️ IMPORTANT: Production vs Local Development

**TL;DR:** 
- ✅ **PRODUCTION WORKS WITHOUT THIS SETUP** - When deployed to Firebase Hosting, photo uploads work perfectly without any CORS configuration
- ⚠️ **LOCAL DEVELOPMENT NEEDS THIS** - CORS setup is ONLY required for testing from localhost (npm run dev)

### Why the difference?

**Production (Firebase Hosting):**
- App is served from `fytwiz-rhl3101.web.app` or `fytwiz-rhl3101.firebaseapp.com`
- Firebase Storage is at `fytwiz-rhl3101.firebasestorage.app`
- Both are under the same `*.firebaseapp.com` domain → **No CORS issues!**
- Photo uploads work out of the box ✓

**Local Development (localhost):**
- App runs on `http://localhost:3000`
- Firebase Storage is still at `fytwiz-rhl3101.firebasestorage.app`
- Different origins → Browser enforces CORS policy → **Blocks requests!**
- Need CORS configuration to allow localhost ✗

**Bottom line:** You can skip this setup if you only test on deployed versions. This is purely for localhost convenience.

---

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

### 🪟 Windows Quick Start

If you're on Windows and getting "gsutil is not recognized as a command" error, follow these steps:

1. **Download & Install:**
   - Download: https://dl.google.com/dl/cloudsdk/channels/rapid/GoogleCloudSDKInstaller.exe
   - Run the installer
   - ✅ Check "Add gcloud to PATH" during installation
   - Complete the installation

2. **IMPORTANT - Restart your terminal:**
   - Close PowerShell/Command Prompt completely
   - Open a NEW PowerShell/Command Prompt window
   - The PATH is only updated in new terminal windows!

3. **Verify it works:**
   ```powershell
   gsutil version
   ```
   If this shows a version number, you're good to go! Continue to Step 2 below.
   
   If you still get "not recognized" error, see detailed troubleshooting in Step 1.

---

### Step 1: Install Google Cloud SDK

If you don't have `gsutil` installed:

**macOS:**
```bash
brew install google-cloud-sdk
```

**Windows (Detailed Instructions):**

1. **Download the Google Cloud SDK installer:**
   - Go to: https://cloud.google.com/sdk/docs/install
   - Click "Download for Windows (x86_64)" 
   - Or direct link: https://dl.google.com/dl/cloudsdk/channels/rapid/GoogleCloudSDKInstaller.exe

2. **Run the installer:**
   - Double-click the downloaded `GoogleCloudSDKInstaller.exe`
   - Click "Yes" if prompted by User Account Control
   - Follow the installation wizard
   - **Important:** Keep the default installation path (usually `C:\Users\[YourUsername]\AppData\Local\Google\Cloud SDK\`)

3. **During installation, make sure to check these options:**
   - ✅ "Install bundled Python"
   - ✅ "Run gcloud init after installation"
   - ✅ "Add gcloud command line tools to PATH"

4. **Complete the installation:**
   - Click "Finish"
   - A new command prompt window will open automatically
   - If it asks to run `gcloud init`, you can skip it for now (type `N` and press Enter)

5. **Verify installation:**
   - Open a **NEW** PowerShell or Command Prompt window (important - old windows won't have updated PATH)
   - Run: `gsutil version`
   - You should see version information (e.g., "gsutil version: 5.xx")
   - If you get "command not recognized", see Troubleshooting below

**Troubleshooting Windows Installation:**

If you get "gsutil is not recognized as an internal or external command":

1. **Close and reopen PowerShell/Command Prompt**
   - The PATH is only updated for new terminal windows
   - Close all PowerShell/CMD windows and open a new one

2. **Manually add to PATH (if still not working):**
   - Press `Win + R`, type `sysdm.cpl`, press Enter
   - Go to "Advanced" tab → "Environment Variables"
   - Under "User variables", select "Path" → Click "Edit"
   - Click "New" and add: `C:\Users\[YourUsername]\AppData\Local\Google\Cloud SDK\google-cloud-sdk\bin`
   - Replace `[YourUsername]` with your actual Windows username
   - Click "OK" on all dialogs
   - Close and reopen PowerShell/CMD

3. **Use full path (temporary workaround):**
   - Instead of `gsutil`, use the full path:
   ```powershell
   & "C:\Users\[YourUsername]\AppData\Local\Google\Cloud SDK\google-cloud-sdk\bin\gsutil.cmd" version
   ```

**Linux:**
```bash
curl https://sdk.cloud.google.com | bash
exec -l $SHELL
```

### Step 2: Authenticate with Google Cloud

**For all operating systems (macOS, Windows, Linux):**

```bash
gcloud auth login
```

**For Windows PowerShell, you can also use:**
```powershell
gcloud auth login
```

This will open a browser window for authentication. Follow the prompts to sign in with your Google account that has access to the Firebase project.

### Step 3: Apply CORS Configuration

**⚠️ IMPORTANT:** You MUST run this command from the project root directory (where `cors.json` is located)!

**First, navigate to the project directory:**

**Windows PowerShell:**
```powershell
cd C:\path\to\fytwiz-app
```

**Windows Command Prompt:**
```cmd
cd C:\path\to\fytwiz-app
```

**macOS/Linux:**
```bash
cd /path/to/fytwiz-app
```

**Verify you're in the correct directory:**

**Windows:**
```powershell
# Check current directory
pwd
# or
cd

# Verify cors.json exists
dir cors.json
# or
ls cors.json
```

**macOS/Linux:**
```bash
# Check current directory
pwd

# Verify cors.json exists
ls -la cors.json
```

You should see the cors.json file listed. If not, you're in the wrong directory!

**Now run the CORS configuration command:**

**macOS/Linux:**
```bash
gsutil cors set cors.json gs://fytwiz-rhl3101.firebasestorage.app
```

**Windows PowerShell:**
```powershell
gsutil cors set cors.json gs://fytwiz-rhl3101.firebasestorage.app
```

**Windows Command Prompt:**
```cmd
gsutil cors set cors.json gs://fytwiz-rhl3101.firebasestorage.app
```

**Note:** Replace `fytwiz-rhl3101.firebasestorage.app` with your actual Firebase Storage bucket name if different.

**Common Errors and Solutions:**

**Error: "OSError: No such file or directory" or "cors.json not found"**

This means you're not in the correct directory! Solutions:

1. **Check where you are:**
   ```powershell
   # Windows
   cd
   
   # macOS/Linux
   pwd
   ```

2. **Check if cors.json exists in current directory:**
   ```powershell
   # Windows PowerShell
   Test-Path cors.json
   # Should return: True
   
   # Or use:
   dir cors.json
   
   # macOS/Linux
   ls cors.json
   ```
   
   If cors.json is NOT found, navigate to the correct directory!

3. **Find your project directory:**
   ```powershell
   # Windows - Search for fytwiz-app folder
   # Usually in: C:\Users\[YourUsername]\Documents\fytwiz-app
   # Or wherever you cloned the repository
   
   cd C:\Users\[YourUsername]\Documents\fytwiz-app
   
   # macOS/Linux
   cd ~/fytwiz-app
   # Or wherever you cloned it
   ```

4. **Use absolute path (if nothing else works):**
   ```powershell
   # Windows PowerShell
   gsutil cors set C:\Users\[YourUsername]\Documents\fytwiz-app\cors.json gs://fytwiz-rhl3101.firebasestorage.app
   
   # macOS/Linux
   gsutil cors set /full/path/to/fytwiz-app/cors.json gs://fytwiz-rhl3101.firebasestorage.app
   ```

**Error: "gsutil is not recognized" on Windows:**
- Make sure you opened a NEW terminal window after installation
- See the troubleshooting steps in Step 1 above
- Or use the full path: `& "C:\Users\[YourUsername]\AppData\Local\Google\Cloud SDK\google-cloud-sdk\bin\gsutil.cmd" cors set cors.json gs://fytwiz-rhl3101.firebasestorage.app`

### Step 4: Verify CORS Configuration

To check if CORS is configured correctly:

**macOS/Linux:**
```bash
gsutil cors get gs://fytwiz-rhl3101.firebasestorage.app
```

**Windows:**
```powershell
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

### Error: "OSError: No such file or directory" or "cors.json not found"

**Cause:** You're running the gsutil command from the wrong directory!

**Solution:**

1. **Navigate to the project root directory:**
   ```powershell
   # Windows - Find your project folder
   cd C:\Users\[YourUsername]\Documents\fytwiz-app
   # Or wherever you cloned the repository
   
   # macOS/Linux
   cd ~/fytwiz-app
   ```

2. **Verify you're in the right place:**
   ```powershell
   # Windows
   dir cors.json
   
   # macOS/Linux
   ls cors.json
   ```
   
   If you see "cors.json" listed, you're in the right place! If not, keep looking for the project folder.

3. **If you can't find the project folder:**
   - Did you clone the repository? If not: `git clone https://github.com/pragyes31/fytwiz-app.git`
   - Check your Downloads folder, Documents folder, or Desktop
   - Try: `where.exe /r C:\ cors.json` (Windows) or `find ~ -name cors.json` (macOS/Linux)

4. **Use absolute path as last resort:**
   ```bash
   gsutil cors set /full/path/to/fytwiz-app/cors.json gs://fytwiz-rhl3101.firebasestorage.app
   ```

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

### Decision Guide: Do You Need CORS Setup?

**Skip CORS Setup if:**
- ✅ You only test on deployed Firebase Hosting (production/staging)
- ✅ Team members don't need to test photo uploads locally
- ✅ You're okay with deploying to test photo upload features

**Set Up CORS if:**
- ✅ Developers need to test photo uploads from localhost
- ✅ Team wants full feature testing in local development
- ✅ You want faster iteration without deploying for every test

### Key Points for Documentation

1. **Production Deployment** → CORS NOT NEEDED
   - Firebase Hosting serves app from same domain as Storage
   - Photo uploads work automatically ✓

2. **Local Development** → CORS NEEDED
   - localhost is different origin than Firebase Storage
   - Browser blocks requests without CORS configuration ✗

3. **One-Time Setup** → Apply once per Firebase project
   - All developers benefit after setup
   - No per-developer configuration needed
