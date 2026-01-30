# Testing Guide: Weekly Check-In Fix

This guide explains how to test the weekly check-in fix **without merging to the main repository**.

## Quick Start: Testing the PR Branch

### Option 1: Test Locally (Recommended for Development)

#### Prerequisites
- Node.js (v18 or higher)
- Firebase project access (fytwiz-rhl3101)
- Git

#### Steps

1. **Clone and checkout the PR branch:**
   ```bash
   git clone https://github.com/pragyes31/fytwiz-app.git
   cd fytwiz-app
   git checkout copilot/fix-weekly-checkin-submission
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`

4. **Test the weekly check-in feature** (see detailed steps below)

---

### Option 2: Deploy to Firebase Preview Channel

Firebase Hosting preview channels allow you to deploy and test without affecting production.

#### Prerequisites
- Firebase CLI installed: `npm install -g firebase-tools`
- Authenticated with Firebase: `firebase login`

#### Steps

1. **Checkout the PR branch:**
   ```bash
   git checkout copilot/fix-weekly-checkin-submission
   ```

2. **Build the application:**
   ```bash
   npm run build
   ```

3. **Deploy to a preview channel:**
   ```bash
   firebase hosting:channel:deploy test-checkin-fix --expires 7d
   ```
   
   This creates a temporary preview URL valid for 7 days (e.g., `https://fytwiz-rhl3101--test-checkin-fix-xyz.web.app`)

4. **Access the preview URL** and test the feature

5. **Delete the preview channel when done:**
   ```bash
   firebase hosting:channel:delete test-checkin-fix
   ```

---

### Option 3: GitHub Pull Request Preview (Netlify/Vercel)

If you have Netlify or Vercel connected to your repository:

1. The PR will automatically generate a preview deployment
2. Check the PR page for the preview URL (usually posted as a comment)
3. Click the URL to test the changes

---

## Testing the Weekly Check-In Feature

Follow these steps to verify the fix works correctly:

### 1. Create a Coach Account

1. Navigate to the app (local or preview URL)
2. Click "Coach Login"
3. Click "Don't have an account? Sign up"
4. Fill in:
   - Full Name: `Test Coach`
   - Email: `test-coach-[timestamp]@example.com` (use unique email)
   - Password: `testpassword123`
5. Click "Create Account"

### 2. Add a Test Client

1. After login, click "Add Athlete"
2. Fill in client details:
   - Name: `Test Client`
   - Age: `30`
   - Goal: Select any (e.g., "Fat Loss")
   - Location: `Test City`
3. Click "Create Profile"
4. You'll be redirected to the coach dashboard

### 3. Get the Client's Magic Link

1. Click on the newly created client card
2. Click "Magic Link" button
3. Copy the URL that appears in the alert
4. Open a new **incognito/private browsing window**
5. Paste and navigate to the magic link

### 4. Test the Weekly Check-In Form

This is where you test the fix!

1. In the client dashboard, click "Weekly Check-In" button
2. Fill out the form:
   - **Weight (required):** Enter a value like `75.5`
   - **Body measurements (optional):** Enter values if desired
   - **Photo (optional):** Click "Snap Progress Photo" to test camera or skip
   - **Follow the plan:** Select Yes or No
   - **Weekly Notes:** Add any text

3. **Click "Send to Coach"**

#### ✅ Expected Behavior (Fix Working):
- Button text changes to "Sending..."
- Button becomes disabled
- After 1-2 seconds, form closes automatically
- You're redirected to the "Progress" tab
- Your check-in appears in the progress list
- **No errors displayed**

#### ❌ Old Behavior (Bug):
- Button appears unresponsive
- Form stays open
- No feedback to user
- Check-in not saved

### 5. Verify Data in Coach Dashboard

1. Return to the coach dashboard window
2. Navigate to the client's detail page
3. Click "Logs" tab
4. **Verify:** The check-in you just submitted appears here

### 6. Test Error Handling

To verify error handling works:

1. **Disconnect from internet** (or simulate network failure)
2. Fill out the check-in form again
3. Click "Send to Coach"
4. **Expected:** Error message appears: "Failed to submit check-in. Please try again."
5. Button becomes re-enabled
6. Back button remains clickable

---

## What This Fix Addresses

### Before the Fix
- Submit button appeared unresponsive
- No loading state or user feedback
- Errors were silently swallowed
- Users didn't know if submission worked

### After the Fix
- ✅ Async Firebase operations properly awaited
- ✅ Loading state: "Sending..." text shown
- ✅ Submit button disabled during submission
- ✅ Error messages displayed if submission fails
- ✅ Back button stays enabled for cancellation
- ✅ Real-time updates in both client and coach dashboards

---

## Troubleshooting

### "Failed to load resource: net::ERR_BLOCKED_BY_CLIENT"
This is expected in development - it's from ad blockers or privacy extensions. The app works fine despite these warnings.

### Firebase errors
Ensure you have proper Firebase configuration and network access. The app uses:
- Firestore for data storage
- Firebase Storage for photos
- Firebase Auth for coach login

### Camera not working
Camera requires HTTPS or localhost. If testing on a preview URL, ensure it uses HTTPS.

---

## Rollback Plan

If issues are found, you can:

1. **Local testing:** Simply checkout main branch
   ```bash
   git checkout main
   ```

2. **Preview channel:** Delete the preview deployment
   ```bash
   firebase hosting:channel:delete test-checkin-fix
   ```

3. **Don't merge the PR** until all issues are resolved

---

## Reporting Issues

If you encounter problems during testing:

1. Note the exact steps to reproduce
2. Check browser console for errors (F12 → Console tab)
3. Screenshot the issue
4. Comment on the PR with:
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser/device used
   - Console errors (if any)

---

## Additional Resources

- **Firebase Console:** https://console.firebase.google.com/project/fytwiz-rhl3101
- **Repository:** https://github.com/pragyes31/fytwiz-app
- **PR Branch:** `copilot/fix-weekly-checkin-submission`

---

## Summary

The safest way to test is:
1. **Local development** for quick iteration
2. **Firebase preview channel** for realistic testing with team
3. **Never merge to main** until thoroughly tested

Once testing is complete and everything works as expected, the PR can be safely merged to main.
