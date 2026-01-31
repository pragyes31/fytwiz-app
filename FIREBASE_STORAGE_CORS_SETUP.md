# Firebase Storage CORS Setup

## 🆕 Starting Fresh? Clone to Desktop

**Do you have multiple fytwiz folders and confused which one to use?** Start fresh with a clean clone!

### ⚠️ IMPORTANT: cors.json is in a PR Branch

The `cors.json` file and other fixes are currently in the `copilot/fix-weekly-checkin-submission` branch (pending merge to main). You have two options:

**Option A: Clone and checkout the PR branch** (Recommended - includes all fixes)

**Option B: Wait for merge to main** (cors.json will be available after PR is merged)

### Option A: Clone Repository with PR Branch (Recommended)

**Windows PowerShell:**
```powershell
# Navigate to Desktop
cd $env:USERPROFILE\Desktop

# Clone the repository
git clone https://github.com/pragyes31/fytwiz-app.git

# Navigate into the project
cd fytwiz-app

# Checkout the PR branch with all fixes
git checkout copilot/fix-weekly-checkin-submission

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

# Checkout the PR branch with all fixes
git checkout copilot/fix-weekly-checkin-submission

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

# Checkout the PR branch with all fixes
git checkout copilot/fix-weekly-checkin-submission

# Verify you're in the right place
ls cors.json
# Should show cors.json file

# Install dependencies
npm install

# You're ready! Continue with Step 2 (Authentication) below
```

**Troubleshooting: "cors.json not found" after clone**

If `dir cors.json` or `ls cors.json` shows "file not found", you're on the wrong branch!

**Solution:**
```powershell
# Check which branch you're on
git branch

# If not on copilot/fix-weekly-checkin-submission, switch to it:
git checkout copilot/fix-weekly-checkin-submission

# Verify cors.json now exists
dir cors.json    # Windows
ls cors.json     # macOS/Linux
```

**After cloning:**
- Your project is now at: Desktop/fytwiz-app
- You're on the branch with all the latest fixes
- cors.json file is available
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

**⚠️ IMPORTANT: Find Your Firebase Storage Bucket Name First!**

The bucket name in the commands below (`fytwiz-rhl3101.firebasestorage.app`) is an example. **You MUST use YOUR OWN bucket name!**

**How to find your bucket name:**

**Option 1: Check firebaseConfig.ts file**
```bash
# Look for storageBucket value in your project
cat firebaseConfig.ts | grep storageBucket
# or on Windows:
type firebaseConfig.ts | findstr storageBucket
```

Example output:
```
storageBucket: "your-project-name.firebasestorage.app",
```

**Option 2: Firebase Console**
1. Go to https://console.firebase.google.com
2. Select your Firebase project
3. Click "Storage" in the left menu
4. Click "Get Started" if not set up yet
5. Your bucket name is shown at the top (e.g., `your-project.firebasestorage.app`)

**Option 3: Check .firebaserc file**
```bash
cat .firebaserc
```
Your project ID is there. Your bucket is usually: `[project-id].firebasestorage.app`

**Now run the CORS configuration command with YOUR bucket name:**

**⚠️ CRITICAL: Before running the command, verify everything first!**

Don't just run the command yet! Follow the pre-flight checklist below to avoid errors.

### Pre-Flight Checklist - Do This FIRST!

**Step 1: Verify you found YOUR bucket name (not the example)**

```bash
# Check what's in your firebaseConfig.ts
type firebaseConfig.ts | findstr storageBucket    # Windows
grep storageBucket firebaseConfig.ts              # macOS/Linux
```

**What did you get?**
- If you see `fytwiz-rhl3101.firebasestorage.app` → ⚠️ STOP! This is the EXAMPLE bucket from the docs!
- If you see YOUR OWN project name → ✅ Good! Use THIS bucket name!

**Step 2: Test if you're authenticated with gcloud**

```bash
# Check who you're logged in as
gcloud auth list

# Should show an email with ACTIVE status
# If you see "No credentialed accounts", you need to login:
gcloud auth login
```

**Step 3: Verify the bucket actually exists**

```bash
# List ALL buckets you have access to
gsutil ls

# This should show your bucket like:
# gs://your-project-name.firebasestorage.app/

# If you don't see any buckets, Firebase Storage isn't enabled!
```

**Step 4: Test if you can access YOUR specific bucket**

```bash
# Try to list contents of YOUR bucket (replace with YOUR bucket name!)
gsutil ls gs://YOUR-BUCKET-NAME.firebasestorage.app

# If this works, you have access!
# If you get "bucket does not exist", see troubleshooting below
```

**Step 5: Only NOW run the CORS command**

After ALL the above checks pass, run:

**⚠️ IMPORTANT: Use gs:// with TWO forward slashes!**

The correct format is `gs://` (TWO slashes), not `gs:/` (one slash).

**macOS/Linux:**
```bash
# Replace YOUR-BUCKET-NAME with your actual bucket!
# Note the gs:// with TWO slashes!
gsutil cors set cors.json gs://YOUR-BUCKET-NAME.firebasestorage.app
                               ^^
                               TWO slashes here!

# Example (don't copy this exactly - use YOUR bucket):
# gsutil cors set cors.json gs://fytwiz-rhl3101.firebasestorage.app
```

**Windows PowerShell:**
```powershell
# Replace YOUR-BUCKET-NAME with your actual bucket!
# Note the gs:// with TWO slashes!
gsutil cors set cors.json gs://YOUR-BUCKET-NAME.firebasestorage.app
                               ^^
                               TWO slashes here!

# Example (don't copy this exactly - use YOUR bucket):
# gsutil cors set cors.json gs://fytwiz-rhl3101.firebasestorage.app
```

**Windows Command Prompt:**
```cmd
REM Replace YOUR-BUCKET-NAME with your actual bucket!
REM Note the gs:// with TWO slashes!
gsutil cors set cors.json gs://YOUR-BUCKET-NAME.firebasestorage.app

REM Example (don't copy this exactly - use YOUR bucket):
REM gsutil cors set cors.json gs://fytwiz-rhl3101.firebasestorage.app
```

**Common Errors and Solutions:**

**Error: "CommandException: Incorrect option(s) specified" or URL parsing errors**

**Cause:** You're missing the second slash in `gs://`!

**Common mistake:**
```bash
# WRONG - only one slash after gs:
gsutil cors set cors.json gs:/fytwiz-rhl3101.firebasestorage.app
                               ^
                               Missing second slash!
```

**Correct format:**
```bash
# CORRECT - TWO slashes after gs:
gsutil cors set cors.json gs://fytwiz-rhl3101.firebasestorage.app
                               ^^
                               TWO slashes!
```

**Solution:** Make sure you use `gs://` with TWO forward slashes, not just one!

**Error: "NotFoundException: 404 The specified bucket does not exist"**

This means you're using the wrong bucket name!

**Solutions:**

1. **Verify your bucket name from firebaseConfig.ts:**
   ```bash
   # Check the storageBucket value
   grep storageBucket firebaseConfig.ts
   # or on Windows:
   type firebaseConfig.ts | findstr storageBucket
   ```

2. **Make sure Firebase Storage is enabled:**
   - Go to Firebase Console → Storage
   - If you see "Get Started", click it to enable Storage
   - Once enabled, your bucket will be created

3. **Use the EXACT bucket name from your Firebase project:**
   - Don't use `fytwiz-rhl3101.firebasestorage.app` (that's the example!)
   - Use YOUR project's bucket name
   - Example: If your project is `my-fitness-app`, use `gs://my-fitness-app.firebasestorage.app`

4. **Check the format has TWO slashes:** `gs://` not `gs:/`

5. **Test if bucket exists:**
   ```bash
   # List your project's buckets
   gsutil ls
   
   # This should show your bucket like:
   # gs://your-project-name.firebasestorage.app/
   ```

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
**macOS/Linux:**
```bash
# Use YOUR bucket name!
gsutil cors get gs://YOUR-BUCKET.firebasestorage.app

# Example (use YOUR bucket, not this):
# gsutil cors get gs://fytwiz-rhl3101.firebasestorage.app
```

**Windows:**
```powershell
# Use YOUR bucket name!
gsutil cors get gs://YOUR-BUCKET.firebasestorage.app

# Example (use YOUR bucket, not this):
# gsutil cors get gs://fytwiz-rhl3101.firebasestorage.app
```

This should display the CORS rules from `cors.json`.

If you get "bucket does not exist" error, you're using the wrong bucket name! See the Troubleshooting section below.

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

### 🆘 Still Getting "Bucket Does Not Exist" Error?

**If you've tried everything and still get the error, follow this diagnostic flowchart:**

**Step 1: What bucket name are you using?**

```bash
# Tell us what you're seeing
type firebaseConfig.ts | findstr storageBucket    # Windows
grep storageBucket firebaseConfig.ts              # macOS/Linux
```

**If you see `fytwiz-rhl3101.firebasestorage.app`:**
- ⚠️ **PROBLEM FOUND!** This is the EXAMPLE bucket from the documentation!
- ❌ You CANNOT use this bucket - it's someone else's project!
- ✅ **Solution:** You need to use YOUR OWN Firebase project
- 👉 See "Setting Up Your Own Firebase Project" section below

**If you see YOUR OWN project name (e.g., `my-app-123.firebasestorage.app`):**
- ✅ Good! Continue to Step 2

**Step 2: Are you authenticated?**

```bash
gcloud auth list
```

**What do you see?**
- ❌ "No credentialed accounts" → **You need to login!**
  ```bash
  gcloud auth login
  ```
  Follow the browser prompts to authenticate.

- ✅ Shows your email with `ACTIVE` → Good! Continue to Step 3

**Step 3: Does the bucket actually exist?**

```bash
gsutil ls
```

**What do you see?**
- ❌ "Access denied" or "Invalid credentials" → Run `gcloud auth login` again
- ❌ Empty list or no buckets → **Firebase Storage is NOT enabled!** See Step 4
- ✅ See your bucket (gs://your-project.firebasestorage.app/) → Good! Continue to Step 5

**Step 4: Is Firebase Storage enabled for your project?**

Go to https://console.firebase.google.com:
1. Select YOUR project (not fytwiz-rhl3101!)
2. Click "Storage" in the left sidebar
3. Do you see "Get Started" button?
   - ✅ **YES:** Click it! Follow prompts to enable Storage. Your bucket will be created.
   - ✅ **NO:** Storage is already enabled. Your bucket exists.
4. After enabling, wait 30 seconds, then run `gsutil ls` again

**Step 5: Can you access your specific bucket?**

```bash
# Replace YOUR-BUCKET with what you see in firebaseConfig.ts
gsutil ls gs://YOUR-BUCKET.firebasestorage.app

# Example:
# gsutil ls gs://my-fitness-app-123.firebasestorage.app
```

**What happens?**
- ❌ "bucket does not exist" → The bucket name is wrong or doesn't exist
  - Double-check spelling
  - Make sure you're using the EXACT name from firebaseConfig.ts
  - Make sure Storage is enabled (Step 4)
- ❌ "Access denied" → You don't have permission
  - Ask the Firebase project owner to add you as Editor or Owner
  - Or use the project owner's account
- ✅ Shows empty list or files → **SUCCESS!** You have access!

**Step 6: Now try the CORS command**

```bash
# Use YOUR bucket name (from firebaseConfig.ts)
gsutil cors set cors.json gs://YOUR-BUCKET.firebasestorage.app

# Make sure:
# - You're in the project directory (where cors.json is)
# - You use gs:// with TWO slashes
# - You use YOUR bucket name (not the example)
```

---

### Setting Up Your Own Firebase Project

**If you don't have your own Firebase project yet:**

1. Go to https://console.firebase.google.com
2. Click "Add project" or "Create a project"
3. Enter a project name (e.g., "my-fitness-app")
4. Follow the setup wizard
5. After creation, click "Storage" and enable it
6. Update your `firebaseConfig.ts` with YOUR project details
7. Then follow the CORS setup from the beginning

---

### Error: "NotFoundException: 404 The specified bucket does not exist"

**Cause:** You're using the wrong Firebase Storage bucket name, or Firebase Storage isn't enabled for your project!

**Solution:**

1. **Find YOUR actual bucket name:**
   
   **Check firebaseConfig.ts:**
   ```bash
   # Look for storageBucket in your project
   grep storageBucket firebaseConfig.ts
   
   # or on Windows:
   type firebaseConfig.ts | findstr storageBucket
   ```
   
   You'll see something like:
   ```
   storageBucket: "your-project-123.firebasestorage.app",
   ```
   
   **Use THAT bucket name** (not `fytwiz-rhl3101.firebasestorage.app`)!

2. **Make sure Firebase Storage is enabled:**
   - Go to https://console.firebase.google.com
   - Select your Firebase project
   - Click "Storage" in left menu
   - If you see "Get Started", click it to enable Storage
   - Your bucket will be automatically created

3. **Verify the bucket exists:**
   ```bash
   # List all buckets in your project
   gsutil ls
   
   # Should show: gs://your-project-name.firebasestorage.app/
   ```
   
   If this command shows your bucket, use that exact name in the cors command!

4. **Common mistakes:**
   - ❌ Using `gs:/` instead of `gs://` (missing second slash!)
   - ❌ Using `fytwiz-rhl3101.firebasestorage.app` (that's the example bucket!)
   - ❌ Using wrong project ID
   - ❌ Typo in bucket name
   - ❌ Firebase Storage not enabled in Firebase Console
   - ❌ Not authenticated with gcloud
   - ✅ Use YOUR bucket name from firebaseConfig.ts
   - ✅ Use `gs://` with TWO slashes
   - ✅ Authenticate with `gcloud auth login`

5. **Correct command format:**
   ```bash
   # Replace YOUR-BUCKET with actual bucket name!
   # Make sure to use gs:// with TWO slashes!
   gsutil cors set cors.json gs://YOUR-BUCKET.firebasestorage.app
                                  ^^
                                  TWO slashes!
   
   # Example with YOUR bucket (not the example one):
   gsutil cors set cors.json gs://my-fitness-app-abc123.firebasestorage.app
   ```

### Error: "CommandException" or URL parsing errors

**Cause:** You're using `gs:/` (one slash) instead of `gs://` (two slashes)!

**Wrong:**
```bash
gsutil cors set cors.json gs:/your-bucket.firebasestorage.app
                               ^
                               Only ONE slash - WRONG!
```

**Correct:**
```bash
gsutil cors set cors.json gs://your-bucket.firebasestorage.app
                               ^^
                               TWO slashes - CORRECT!
```

**Solution:** Always use `gs://` with TWO forward slashes after `gs:`

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
   # Use YOUR bucket name here too!
   gsutil cors set /full/path/to/fytwiz-app/cors.json gs://YOUR-BUCKET.firebasestorage.app
   ```

### Error: "You need Owner or Editor permissions"

If you get a permissions error, you need to:
1. Ask the Firebase project owner to grant you Editor or Owner access
2. OR ask them to run the CORS setup command

### CORS Still Not Working

1. Clear browser cache and cookies
2. **Check that you're using YOUR bucket name (not the example one!)**
3. Wait a few minutes for changes to propagate
4. Verify the CORS configuration with: `gsutil cors get gs://YOUR-BUCKET.firebasestorage.app`

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
