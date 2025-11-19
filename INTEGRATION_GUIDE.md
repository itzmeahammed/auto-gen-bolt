# Authentication & Routing Integration Guide

## Overview

TaskFlow Pro now has complete authentication and routing integration with:
- Landing page with "Get Started" CTA
- Login page with email/password authentication
- Signup page with two-step form validation
- Protected dashboard accessible only to authenticated users
- User profile display in header
- Logout functionality

## Architecture

### File Structure

```
src/
├── context/
│   └── AuthContext.tsx          # Authentication context & hooks
├── pages/
│   ├── LandingPage.tsx          # Public landing page
│   ├── LoginPage.tsx            # Login form
│   ├── SignupPage.tsx           # Signup form (2-step)
│   └── index.ts                 # Page exports
├── AppRouter.tsx                # Main routing component
├── App.tsx                       # Dashboard (protected)
├── main.tsx                      # Entry point with providers
└── ...
```

## Components

### 1. AuthContext (`src/context/AuthContext.tsx`)

Provides authentication state and methods:

```tsx
interface AuthContextType {
  user: User | null;              // Current logged-in user
  isAuthenticated: boolean;        // Auth status
  isLoading: boolean;              // Loading state
  login: (email, password) => Promise<void>;
  signup: (fullName, email, password, company?) => Promise<void>;
  logout: () => void;
}
```

**Features:**
- Persistent authentication (localStorage)
- Mock API calls with 1.5s delay
- User data storage
- Automatic session restoration

### 2. AppRouter (`src/AppRouter.tsx`)

Main routing component that:
- Checks authentication status
- Shows loading screen while checking auth
- Redirects to dashboard if authenticated
- Shows landing/login/signup pages if not authenticated

**Flow:**
```
AppRouter
├── isLoading → Loading Screen
├── isAuthenticated → Dashboard (App.tsx)
└── !isAuthenticated → Landing/Login/Signup Pages
```

### 3. LandingPage (`src/pages/LandingPage.tsx`)

**Changes:**
- Removed demo video modal
- Added `onGetStarted` callback prop
- "Get Started" button navigates to signup

**Props:**
```tsx
interface LandingPageProps {
  onGetStarted?: () => void;  // Called when "Get Started" clicked
}
```

### 4. LoginPage (`src/pages/LoginPage.tsx`)

**Integrated with AuthContext:**
- Uses `login()` method from context
- Handles authentication errors
- Shows loading state during login
- Redirects to dashboard on success

**Features:**
- Email/password validation
- Show/hide password toggle
- Remember me checkbox
- Social login buttons (UI only)
- Link to signup page

### 5. SignupPage (`src/pages/SignupPage.tsx`)

**Integrated with AuthContext:**
- Uses `signup()` method from context
- Two-step form process
- Real-time validation
- Error handling

**Features:**
- Step 1: Full name, email, company
- Step 2: Password, confirm password, terms
- Progress indicator
- Back button between steps

### 6. Dashboard (App.tsx)

**New Features:**
- User profile display in header
  - Avatar with first letter
  - Full name and email
  - Responsive on mobile
- Logout button
  - Red styling for visibility
  - Clears user data and localStorage
  - Returns to landing page

## Authentication Flow

### Login Flow
```
User clicks "Sign In" on Landing
    ↓
LoginPage renders
    ↓
User enters email/password
    ↓
Clicks "Sign In" button
    ↓
login() called from AuthContext
    ↓
User stored in state + localStorage
    ↓
onLoginSuccess callback
    ↓
AppRouter detects isAuthenticated = true
    ↓
Dashboard (App.tsx) renders
```

### Signup Flow
```
User clicks "Get Started" on Landing
    ↓
SignupPage renders (Step 1)
    ↓
User enters full name, email, company
    ↓
Clicks "Continue"
    ↓
SignupPage Step 2 renders
    ↓
User enters password, confirms, agrees to terms
    ↓
Clicks "Create Account"
    ↓
signup() called from AuthContext
    ↓
User stored in state + localStorage
    ↓
onSignupSuccess callback
    ↓
AppRouter detects isAuthenticated = true
    ↓
Dashboard (App.tsx) renders
```

### Logout Flow
```
User clicks "Logout" button in dashboard
    ↓
logout() called from AuthContext
    ↓
User state cleared
    ↓
localStorage cleared
    ↓
AppRouter detects isAuthenticated = false
    ↓
Landing page renders
```

## Usage

### Using useAuth Hook

```tsx
import { useAuth } from './context/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();

  return (
    <div>
      {isAuthenticated && (
        <p>Welcome, {user?.fullName}!</p>
      )}
    </div>
  );
}
```

### Protected Routes

The AppRouter automatically protects routes:
- Unauthenticated users see landing/login/signup
- Authenticated users see dashboard
- Logout returns to landing page

## Data Persistence

### localStorage Keys

- `taskflow_user`: Stores user object as JSON

```json
{
  "id": "user_1234567890",
  "fullName": "John Doe",
  "email": "john@example.com",
  "company": "Acme Corp",
  "createdAt": "2024-11-19T10:00:00Z"
}
```

### Session Restoration

On app load:
1. AuthProvider checks localStorage
2. If user exists, restores session
3. AppRouter detects authenticated state
4. Dashboard loads automatically

## Customization

### Changing Authentication Logic

Edit `src/context/AuthContext.tsx`:

```tsx
const login = async (email: string, password: string) => {
  // Replace with real API call
  const response = await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
  
  const user = await response.json();
  setUser(user);
  localStorage.setItem('taskflow_user', JSON.stringify(user));
};
```

### Adding OAuth

Update LoginPage and SignupPage social buttons:

```tsx
const handleGoogleLogin = async () => {
  // Implement Google OAuth
  const user = await googleLogin();
  await login(user.email, user.id);
};
```

### Changing Routes

Edit `src/AppRouter.tsx` to add new pages:

```tsx
type PageType = 'landing' | 'login' | 'signup' | 'dashboard' | 'onboarding';

// Add new page rendering
{currentPage === 'onboarding' && (
  <OnboardingPage onComplete={() => setCurrentPage('dashboard')} />
)}
```

## API Integration

### Mock vs Real API

**Current (Mock):**
- 1.5s delay simulates network
- No actual authentication
- Data stored in localStorage only

**To use real API:**

1. Update AuthContext:
```tsx
const login = async (email: string, password: string) => {
  const response = await fetch('https://api.example.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  if (!response.ok) throw new Error('Login failed');
  
  const user = await response.json();
  setUser(user);
  localStorage.setItem('taskflow_user', JSON.stringify(user));
};
```

2. Add token management:
```tsx
const token = localStorage.getItem('taskflow_token');
localStorage.setItem('taskflow_token', response.token);
```

3. Add token to requests:
```tsx
headers: {
  'Authorization': `Bearer ${token}`
}
```

## Security Considerations

### Current Implementation
- Passwords stored in mock only
- No actual validation
- For demo/development only

### Production Recommendations
1. Use HTTPS only
2. Implement proper password hashing
3. Add JWT token management
4. Implement refresh tokens
5. Add CSRF protection
6. Validate on backend
7. Use secure cookies
8. Implement rate limiting
9. Add email verification
10. Add 2FA support

## Testing

### Test Login
1. Go to http://localhost:5173
2. Click "Get Started" or "Sign In"
3. Enter any email and password
4. Click submit
5. Should redirect to dashboard

### Test Signup
1. Go to http://localhost:5173
2. Click "Get Started"
3. Fill in Step 1 (name, email, company)
4. Click "Continue"
5. Fill in Step 2 (password, confirm, terms)
6. Click "Create Account"
7. Should redirect to dashboard

### Test Persistence
1. Log in with any credentials
2. Refresh page
3. Dashboard should still be visible
4. User info should be displayed

### Test Logout
1. Click "Logout" button
2. Should redirect to landing page
3. Refresh page
4. Landing page should still be visible

## Troubleshooting

### Issue: Stuck on loading screen
**Solution**: Check browser console for errors, ensure AuthProvider wraps AppRouter

### Issue: Can't login
**Solution**: Check that email and password fields are filled, check console for errors

### Issue: Session not persisting
**Solution**: Check localStorage is enabled, check browser console for storage errors

### Issue: Logout not working
**Solution**: Check that logout button is properly connected, check console for errors

## Next Steps

1. **Connect Real API**: Replace mock authentication with real backend
2. **Add Email Verification**: Send verification emails on signup
3. **Add Password Reset**: Implement forgot password flow
4. **Add OAuth**: Integrate Google, GitHub, etc.
5. **Add 2FA**: Implement two-factor authentication
6. **Add User Profile**: Create user settings/profile page
7. **Add Role-Based Access**: Implement admin/user roles
8. **Add Audit Logging**: Log authentication events

---

**Status**: ✅ Complete and Ready for Integration
**Last Updated**: 2024
