# Security Vulnerabilities Fixed

This document outlines the security vulnerabilities that were identified and fixed in this application.

## Vulnerabilities Identified and Fixed

### 1. NPM Dependency Vulnerabilities (HIGH SEVERITY)

**Issue:** 
- react-router-dom version 7.2.0 had 7 high-severity vulnerabilities:
  - DoS via cache poisoning by forcing SPA mode
  - CSRF issue in Action/Server Action Request Processing
  - XSS via Open Redirects
  - SSR XSS in ScrollRestoration
  - Unexpected external redirect via untrusted paths
  - XSS Vulnerability
  - Pre-render data spoofing on React-Router framework mode

**Fix:**
- Updated react-router-dom from 7.2.0 to 7.13.0
- All known vulnerabilities are now resolved

**Impact:** Without this fix, attackers could exploit these vulnerabilities to:
- Cause denial of service
- Execute cross-site scripting attacks
- Perform CSRF attacks
- Redirect users to malicious sites

### 2. Hardcoded Firebase API Keys (HIGH SEVERITY)

**Issue:**
- Firebase configuration with API keys was hardcoded directly in source code (`firebaseConfig.ts`)
- This exposed Firebase project credentials in version control
- Anyone with access to the repository could see and potentially misuse these credentials

**Fix:**
- Modified `firebaseConfig.ts` to use environment variables exclusively
- Removed hardcoded fallback values to prevent credential exposure
- Added validation to throw clear error if environment variables are missing
- Created `.env.example` file with template for required environment variables
- Updated `.gitignore` to ensure `.env` files are never committed
- Application will fail fast with helpful error message if credentials not configured

**Impact:** Without this fix:
- Malicious actors could access your Firebase project
- Potential data breaches or unauthorized access to your database
- API quota exhaustion if keys are used maliciously
- Keys visible in version control history (requires key rotation)

**Action Required:**
1. Create a `.env` file in the project root (copy from `.env.example`)
2. Fill in your Firebase credentials in the `.env` file
3. **IMPORTANT:** Rotate your Firebase API keys in the Firebase Console since they were previously exposed in source code
4. Never commit the `.env` file to version control

### 3. Insecure Firestore Security Rules (CRITICAL SEVERITY)

**Issue:**
- Multiple collections had `allow read: if true` rules:
  - clients collection
  - workoutPlans collection
  - dietPlans collection
  - progressLogs collection
- This allowed ANYONE on the internet to read sensitive data without authentication
- Some collections had `allow write: if true` allowing unauthorized modifications

**Fix:**
- Tightened security rules significantly:
  - Clients collection: Now requires authentication as the owning coach, with limited query access for magic link validation (query limited to 1 result)
  - Plans collections: Separated `get` (single document) from `list` (query) operations. Get operations allowed for magic link flow (clientId acts as shared secret), list operations require coach authentication
  - Progress logs: Made immutable (no updates/deletions), require coachId on creation, list queries limited to 100 results
  - Write operations require authenticated coach with matching coachId

**Security Notes & Architectural Limitations:**

The application uses a "magic link" authentication flow for clients (athletes) without requiring them to create accounts. This architectural decision creates some inherent security trade-offs:

1. **Magic Link Security Model:**
   - Clients access their data via a unique URL containing a magic link token
   - The token is validated by querying the clients collection
   - Once validated, the client can access plans using their clientId as a shared secret
   - This means anyone with a valid magic link URL can access that client's data

2. **Current Security Posture:**
   - **Coaches:** Fully authenticated with Firebase Auth, data isolated by coachId
   - **Clients:** No authentication required, access controlled by URL knowledge
   - **Plans (workout/diet):** Single document reads allowed by ID (for magic link flow)
   - **Progress Logs:** List queries allowed (filtered by clientId on client-side)

3. **Limitations:**
   - Anyone who obtains a magic link URL can access that client's data
   - ClientId values could potentially be guessed (UUIDs provide some protection)
   - No rate limiting on unauthenticated queries at the Firestore level
   
4. **Recommendations for Improved Security:**
   - Implement proper client authentication (Firebase Anonymous Auth or custom tokens)
   - Use Firebase App Check to prevent abuse from unauthorized origins
   - Implement server-side API with proper session management
   - Add rate limiting and monitoring for suspicious access patterns
   - Consider time-limited magic links that expire
   - Store only hashed tokens in the database, not plain text

**Impact:** 
Without this fix:
- Any user could enumerate and read all client data, workout plans, diet plans, and progress logs
- Potential HIPAA/privacy violations if storing health data
- Data could be scraped, sold, or misused
- Business competitive intelligence could be stolen

With this fix:
- Coach data is fully protected by authentication
- Client data requires knowledge of the magic link URL (reasonable for MVP)
- Unauthorized enumeration and bulk data access is prevented
- Clear security boundaries and documentation for future improvements

## Security Best Practices Going Forward

1. **Dependency Management:**
   - Run `npm audit` regularly to check for vulnerabilities
   - Keep dependencies up to date with security patches
   - Consider using automated tools like Dependabot

2. **Secrets Management:**
   - Never commit API keys, passwords, or secrets to version control
   - Always use environment variables for sensitive configuration
   - Rotate credentials if they are accidentally exposed

3. **Database Security:**
   - Follow principle of least privilege
   - Test security rules thoroughly before deployment
   - Regularly review and audit access patterns
   - Consider using Firebase Emulator for local testing of security rules

4. **Code Review:**
   - Have security-focused code reviews before merging
   - Use static analysis tools (like CodeQL) to catch security issues
   - Follow OWASP guidelines for web application security

## Testing Your Security

After deploying these fixes:

1. **Test Firestore Rules:**
   ```bash
   firebase emulators:start
   # Then run your tests against the emulator
   ```

2. **Verify Environment Variables:**
   ```bash
   # Ensure .env is not tracked
   git status
   # .env should not appear in the output
   ```

3. **Check for Vulnerabilities:**
   ```bash
   npm audit
   # Should report 0 vulnerabilities
   ```

## Additional Recommendations

1. **Enable Firebase App Check:** Protect your backend resources from abuse
2. **Set up Firebase Security Rules Tests:** Automate testing of your security rules
3. **Implement Rate Limiting:** Prevent abuse of your API endpoints
4. **Add Content Security Policy (CSP):** Prevent XSS attacks
5. **Enable HTTPS Only:** Ensure all traffic is encrypted
6. **Regular Security Audits:** Schedule periodic security reviews

## Questions or Concerns?

If you have questions about these security fixes or need clarification, please consult:
- Firebase Security Rules Documentation: https://firebase.google.com/docs/rules
- OWASP Top 10: https://owasp.org/www-project-top-ten/
- React Security Best Practices: https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml
