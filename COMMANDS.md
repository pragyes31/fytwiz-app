# Testing Commands Cheatsheet

## Local Testing

```bash
# Switch to the PR branch
git checkout copilot/fix-weekly-checkin-submission

# Install dependencies (first time only)
npm install

# Start development server
npm run dev
# Opens at http://localhost:3000

# Stop the server: Ctrl+C
```

## Firebase Preview Deploy

```bash
# Install Firebase CLI (first time only)
npm install -g firebase-tools

# Login to Firebase (first time only)
firebase login

# Build the app
npm run build

# Deploy to preview channel (expires in 7 days)
firebase hosting:channel:deploy test-checkin-fix --expires 7d
# Returns a preview URL like: https://fytwiz-rhl3101--test-checkin-fix-xyz.web.app

# List active preview channels
firebase hosting:channel:list

# Delete preview channel when done
firebase hosting:channel:delete test-checkin-fix
```

## Useful Git Commands

```bash
# See what branch you're on
git branch

# Switch back to main
git checkout main

# Get latest changes from PR
git checkout copilot/fix-weekly-checkin-submission
git pull origin copilot/fix-weekly-checkin-submission

# See what changed
git diff main copilot/fix-weekly-checkin-submission

# See commit history
git log --oneline -10
```

## Build Commands

```bash
# Development build (with hot reload)
npm run dev

# Production build (creates dist/ folder)
npm run build

# Preview production build locally
npm run preview
```

## Troubleshooting

```bash
# Clear node modules and reinstall (if issues)
rm -rf node_modules package-lock.json
npm install

# Clear build cache
rm -rf dist

# Check Node.js version (should be v18+)
node --version
```

## Quick Test Flow

```bash
# 1. Get the code
git checkout copilot/fix-weekly-checkin-submission

# 2. Run it
npm install
npm run dev

# 3. Test it
# - Open http://localhost:3000
# - Create coach account
# - Add client
# - Copy magic link
# - Test check-in form (new incognito window)

# 4. Done? Switch back
git checkout main
```

## Firebase Commands Reference

```bash
# See current Firebase project
firebase projects:list
firebase use

# Deploy to production (main branch only!)
npm run build
firebase deploy

# Preview channels are safer for testing!
firebase hosting:channel:deploy my-test --expires 7d
firebase hosting:channel:delete my-test
```

---

**Remember:** Preview channels are perfect for testing without affecting production!
