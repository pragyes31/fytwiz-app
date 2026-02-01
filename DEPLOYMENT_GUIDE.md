# 🚀 Deployment Guide - Push to Production

Complete guide for deploying your fytwiz-app to Firebase Hosting.

---

## Quick Deploy (2 minutes)

If you're already on the `copilot/fix-weekly-checkin-submission` branch:

```bash
npm run build
firebase deploy
```

That's it! Your site will be live at: `https://fytwiz-rhl3101.web.app`

---

## Deployment Options

### Option A: Deploy from PR Branch (Quick Testing)

**Use when:** You want to test in production before merging to main.

```bash
# Make sure you're on the right branch
git checkout copilot/fix-weekly-checkin-submission

# Install dependencies (if needed)
npm install

# Build for production
npm run build

# Deploy to Firebase
firebase deploy
```

**Time:** ~2 minutes
**Best for:** Quick testing in production environment

### Option B: Merge to Main First (Recommended)

**Use when:** Ready for permanent production deployment.

**Step 1: Merge PR on GitHub**
1. Go to: https://github.com/pragyes31/fytwiz-app/pulls
2. Find PR: `Fix weekly check-in submission`
3. Click "Merge pull request"
4. Confirm merge

**Step 2: Deploy from main branch**
```bash
# Switch to main branch
git checkout main

# Pull latest code
git pull origin main

# Install dependencies
npm install

# Build for production
npm run build

# Deploy to Firebase
firebase deploy
```

**Time:** ~5 minutes
**Best for:** Production releases following best practices

---

## Prerequisites

Before deploying, ensure you have:

### 1. Firebase CLI Installed

```bash
# Check if installed
firebase --version

# If not installed:
npm install -g firebase-tools
```

### 2. Authentication

```bash
# Login to Firebase
firebase login

# Verify you're logged in
firebase projects:list
```

Should show `fytwiz-rhl3101` in the list.

### 3. Project Selected

```bash
# Make sure you're using the right project
firebase use fytwiz-rhl3101

# Verify
firebase use
```

---

## Post-Deployment Verification

After deployment completes, verify everything works:

### 1. Access the Site

Visit: `https://fytwiz-rhl3101.web.app`

### 2. Test Coach Dashboard

- [ ] Login as coach works
- [ ] Can view existing clients
- [ ] Can create new client
- [ ] Can edit client details
- [ ] Magic link generation works

### 3. Test Client Dashboard (Magic Link)

- [ ] Generate magic link for a client
- [ ] Open link in incognito/private window
- [ ] Client dashboard loads correctly
- [ ] Can see workout plan
- [ ] Can see nutrition plan
- [ ] Can view progress history

### 4. Test Weekly Check-In

- [ ] Click "Weekly Check-In" button
- [ ] Form opens correctly
- [ ] Fill in weight (required)
- [ ] Fill in optional measurements
- [ ] Add feedback/notes
- [ ] Click "Send to Coach"
- [ ] Button shows "Sending..." while submitting
- [ ] Form closes after successful submission
- [ ] Check-in appears in Progress tab
- [ ] Coach can see check-in in their dashboard

### 5. Check for Errors

- [ ] Open browser console (F12)
- [ ] Check for any errors (red text)
- [ ] Navigate through all tabs
- [ ] No errors should appear

**All green?** ✅ Deployment successful!

---

## Troubleshooting

### Error: "Firebase Storage has not been set up"

**This should NOT happen anymore** - we removed Storage configuration to avoid the paid plan requirement.

**If you still see this error:**

1. **Verify firebase.json doesn't have Storage section:**
   ```bash
   cat firebase.json
   ```
   Should NOT contain:
   ```json
   "storage": {
     "rules": "storage.rules"
   }
   ```

2. **Verify firebaseConfig.ts doesn't import Storage:**
   ```bash
   grep "getStorage" firebaseConfig.ts
   ```
   Should return nothing (no matches).

3. **Make sure you have latest code:**
   ```bash
   git pull origin copilot/fix-weekly-checkin-submission
   ```

4. **Rebuild:**
   ```bash
   npm run build
   firebase deploy
   ```

### Error: "Command not found: firebase"

Firebase CLI not installed.

**Solution:**
```bash
npm install -g firebase-tools
firebase login
```

### Error: "Not authorized"

Not logged into Firebase or wrong account.

**Solution:**
```bash
firebase logout
firebase login
```

### Error: "Build failed"

Dependencies or code issues.

**Solution:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Try build again
npm run build
```

### Error: "Permission denied" or "403"

Not authorized for this Firebase project.

**Solution:**
- Ask project owner to add you as a collaborator
- Or use owner's account to deploy

### Deploy hangs or takes too long

Network issues or large files.

**Solution:**
```bash
# Cancel with Ctrl+C
# Try again
firebase deploy
```

---

## What Gets Deployed

### Code Changes ✅

1. **Fixed weekly check-in submission**
   - Async form submission with proper error handling
   - Loading states (button shows "Sending...")
   - User-friendly error messages

2. **Fixed Firebase errors**
   - No more "undefined field" errors
   - Proper document creation without undefined values

3. **MVP-friendly architecture**
   - Photo upload feature removed (no Storage costs)
   - No Firebase Storage needed
   - No CORS setup required

4. **Bug fixes**
   - Dashboard crash fixed (Video icon)
   - All imports properly resolved

### Bundle Size 📦

- **Main JavaScript:** ~773 kB
- **HTML:** 1.39 kB
- **Gzipped:** ~200 kB

### Firebase Services Used

- ✅ **Hosting** - Web app hosting
- ✅ **Firestore** - Database
- ✅ **Authentication** - User login
- ❌ **Storage** - Removed (not needed for MVP)

---

## Rollback (If Needed)

If deployment causes issues, you can rollback:

### View Previous Deployments

```bash
firebase hosting:releases:list
```

### Rollback to Previous Version

```bash
firebase hosting:rollback
```

This reverts to the previous deployment immediately.

---

## Notes

### Photo Upload Feature

Photo upload has been **removed for MVP** because Firebase Storage requires upgrading to the Blaze (paid) plan. All other weekly check-in features work perfectly without it.

**To re-enable photo uploads later:**
1. Upgrade to Firebase Blaze plan
2. Enable Storage in Firebase Console
3. Restore Storage configuration from git history
4. See git commit `f782ab4` for photo upload code

### CORS Setup

**Not needed!** Since we removed photo uploads, you don't need to set up CORS for Firebase Storage.

The CORS setup guide (FIREBASE_STORAGE_CORS_SETUP.md) can be ignored unless you add photo uploads back.

### Firebase Security Rules

Firestore security rules are already configured in `firestore.rules` and will be deployed automatically. No manual configuration needed in Firebase Console.

---

## Summary

**Deployment is simple:**

1. Build: `npm run build`
2. Deploy: `firebase deploy`
3. Verify: Visit https://fytwiz-rhl3101.web.app
4. Test: Follow verification checklist

**Deployment time:** 2-5 minutes
**Downtime:** None (instant switch)
**Risk:** Low (can rollback)

You're ready to deploy! 🚀
