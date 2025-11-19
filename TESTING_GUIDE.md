# Testing Guide - Authentication & Routing

## Quick Start Testing

### Prerequisites
- Node.js installed
- Dependencies installed: `npm install`
- Dev server running: `npm run dev`

### Test Scenarios

#### Scenario 1: Landing Page
**Steps:**
1. Open http://localhost:5173
2. Verify landing page displays with:
   - Navigation bar with logo and buttons
   - Hero section with 3D scene
   - "Get Started" button (no demo video)
   - Features section
   - Pricing section
   - Testimonials section
   - Footer

**Expected Result:** Landing page fully visible with all sections

---

#### Scenario 2: Sign Up Flow
**Steps:**
1. Click "Get Started" button on landing page
2. Verify SignupPage Step 1 displays:
   - Full Name field
   - Email field
   - Company field (optional)
   - "Continue" button
   - Social signup buttons
   - "Sign in here" link

3. Enter test data:
   - Full Name: "John Doe"
   - Email: "john@example.com"
   - Company: "Acme Corp"

4. Click "Continue"
5. Verify SignupPage Step 2 displays:
   - Progress indicator showing "Step 2 of 2"
   - Password field
   - Confirm Password field
   - Terms checkbox
   - "Create Account" button
   - "Back" button

6. Enter test data:
   - Password: "TestPassword123"
   - Confirm Password: "TestPassword123"
   - Check "I agree to terms"

7. Click "Create Account"
8. Verify loading spinner appears
9. Wait ~1.5 seconds
10. Verify redirected to dashboard

**Expected Result:** 
- Form validates correctly
- Loading state shows
- User is created and logged in
- Dashboard displays with user info

---

#### Scenario 3: Login Flow
**Steps:**
1. From dashboard, click "Logout" button
2. Verify redirected to landing page
3. Click "Sign In" button in navigation
4. Verify LoginPage displays:
   - Email field
   - Password field with show/hide toggle
   - "Forgot password?" link
   - "Remember me" checkbox
   - "Sign In" button
   - Social login buttons
   - "Sign up here" link

5. Enter test data:
   - Email: "john@example.com"
   - Password: "TestPassword123"

6. Click "Sign In"
7. Verify loading spinner appears
8. Wait ~1.5 seconds
9. Verify redirected to dashboard

**Expected Result:**
- Form validates
- Loading state shows
- User is logged in
- Dashboard displays with same user info

---

#### Scenario 4: Dashboard Features
**Steps:**
1. Verify dashboard header displays:
   - User avatar with first letter "J"
   - User full name "John Doe"
   - User email "john@example.com"
   - Navigation tabs (3D View, Dashboard, Agents, Analytics, Team)
   - "New Task" button
   - "Logout" button

2. Click on different tabs:
   - 3D View
   - Dashboard
   - Agents
   - Analytics
   - Team

3. Verify each tab loads correctly

4. Click "New Task" button
5. Verify task form modal opens

6. Click "Logout" button
7. Verify redirected to landing page

**Expected Result:**
- All dashboard features work
- User info displays correctly
- Navigation works
- Logout clears session

---

#### Scenario 5: Session Persistence
**Steps:**
1. Log in with test credentials
2. Verify dashboard displays
3. Refresh page (F5 or Cmd+R)
4. Verify dashboard still displays
5. Verify user info is still visible
6. Verify no login page appears

7. Open browser DevTools (F12)
8. Go to Application → LocalStorage
9. Verify `taskflow_user` key exists
10. Verify it contains user data

**Expected Result:**
- Session persists after refresh
- User data stored in localStorage
- No login required after refresh

---

#### Scenario 6: Form Validation

**SignUp Validation:**
1. Go to signup page
2. Leave Full Name empty, click Continue
3. Verify error: "Full name is required"
4. Enter name, leave Email empty, click Continue
5. Verify error: "Email is required"
6. Enter invalid email "notanemail", click Continue
7. Verify error: "Please enter a valid email"
8. Enter valid email, click Continue
9. Go to Step 2
10. Leave password empty, click Create Account
11. Verify error: "Password is required"
12. Enter password < 8 chars, click Create Account
13. Verify error: "Password must be at least 8 characters"
14. Enter password, leave confirm empty, click Create Account
15. Verify error: "Passwords do not match"
16. Enter matching passwords, uncheck terms, click Create Account
17. Verify error: "You must agree to the terms"

**Login Validation:**
1. Go to login page
2. Leave email empty, click Sign In
3. Verify error: "Please fill in all fields"
4. Enter email, leave password empty, click Sign In
5. Verify error: "Please fill in all fields"

**Expected Result:**
- All validations work correctly
- Error messages display
- Form prevents invalid submission

---

#### Scenario 7: UI/UX Features

**Password Toggle:**
1. On login page, enter password
2. Verify password appears as dots
3. Click eye icon
4. Verify password becomes visible
5. Click eye icon again
6. Verify password becomes dots again

**Loading States:**
1. Click "Sign In" or "Create Account"
2. Verify button shows loading spinner
3. Verify button text changes to "Signing in..." or "Creating Account..."
4. Verify button is disabled during loading

**Animations:**
1. Observe landing page
2. Verify smooth scroll animations
3. Verify card hover effects
4. Verify 3D scene animations
5. Verify page transitions are smooth

**Responsive Design:**
1. Open on desktop (1920px)
2. Verify layout looks good
3. Resize to tablet (768px)
4. Verify layout adapts
5. Resize to mobile (375px)
6. Verify layout is mobile-friendly

**Expected Result:**
- All UI features work smoothly
- Animations are fluid
- Responsive design works on all sizes

---

## Test Data

### Valid Test Credentials
```
Email: test@example.com
Password: TestPassword123

Email: john@example.com
Password: SecurePass456

Email: jane@example.com
Password: MyPassword789
```

### Invalid Test Data
```
Email: notanemail (invalid format)
Email: test@.com (missing domain)
Password: short (too short)
Password: 12345678 (no letters)
```

---

## Browser Testing

### Desktop Browsers
- [ ] Chrome 90+
- [ ] Firefox 88+
- [ ] Safari 14+
- [ ] Edge 90+

### Mobile Browsers
- [ ] Chrome Mobile
- [ ] Safari iOS
- [ ] Firefox Mobile

### Tablet Browsers
- [ ] iPad Safari
- [ ] Android Chrome

---

## Performance Testing

### Metrics to Check
1. **Page Load Time**
   - Landing page: < 2s
   - Login page: < 1s
   - Dashboard: < 2s

2. **3D Scene Performance**
   - Smooth 60 FPS
   - No stuttering
   - Responsive controls

3. **Form Submission**
   - Loading state appears immediately
   - Submission completes in ~1.5s
   - No UI freezing

4. **Navigation**
   - Tab switching is instant
   - No lag between pages
   - Smooth transitions

---

## Error Handling Testing

### Network Errors
1. Open DevTools Network tab
2. Throttle to "Slow 3G"
3. Try to sign in
4. Verify loading state handles slow network

### Storage Errors
1. Open DevTools → Application → Storage
2. Disable localStorage
3. Try to sign in
4. Verify app handles gracefully

### Console Errors
1. Open DevTools Console
2. Check for any errors or warnings
3. Verify no critical errors appear

---

## Accessibility Testing

### Keyboard Navigation
1. Press Tab to navigate form fields
2. Verify focus states are visible
3. Press Enter to submit forms
4. Verify all buttons are keyboard accessible

### Screen Reader Testing
1. Use VoiceOver (Mac) or NVDA (Windows)
2. Verify form labels are read correctly
3. Verify button purposes are clear
4. Verify error messages are announced

### Color Contrast
1. Use Chrome DevTools Lighthouse
2. Run accessibility audit
3. Verify all text has sufficient contrast
4. Verify color is not only indicator

---

## Checklist

### Landing Page
- [ ] All sections visible
- [ ] 3D scene renders
- [ ] "Get Started" button works
- [ ] Navigation links work
- [ ] Responsive on mobile

### Sign Up
- [ ] Step 1 displays correctly
- [ ] Step 2 displays correctly
- [ ] Validation works
- [ ] Loading state shows
- [ ] Redirects to dashboard

### Login
- [ ] Form displays correctly
- [ ] Validation works
- [ ] Password toggle works
- [ ] Loading state shows
- [ ] Redirects to dashboard

### Dashboard
- [ ] User info displays
- [ ] All tabs work
- [ ] New Task button works
- [ ] Logout button works
- [ ] Session persists

### General
- [ ] No console errors
- [ ] Responsive design works
- [ ] Animations are smooth
- [ ] Performance is good
- [ ] Accessibility is good

---

## Reporting Issues

When reporting issues, include:
1. Browser and version
2. Device/screen size
3. Steps to reproduce
4. Expected vs actual result
5. Console errors (if any)
6. Screenshots/videos

---

**Last Updated**: 2024
**Status**: ✅ Ready for Testing
