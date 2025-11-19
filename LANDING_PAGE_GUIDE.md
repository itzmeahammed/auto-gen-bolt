# Landing Page, Login & Signup Guide

## Overview

This guide covers the newly created landing page, login page, and signup page for TaskFlow Pro. All pages feature enhanced UI with the color palette of white and #9c8a63 (amber/beige), 3D animations, and smooth transitions.

## Color Palette

- **Primary**: #9c8a63 (Amber/Beige)
- **Secondary**: #b8a896, #c9bfb0, #d7d3c4, #b5a07c
- **Background**: White (#FFFFFF) and Cream (#FAFAF7)
- **Text**: Gray-900 for primary, Gray-600 for secondary
- **Accents**: Amber-600 to Amber-700 gradients

## Files Created

### 1. **LandingPage.tsx** (600+ lines)
Location: `src/pages/LandingPage.tsx`

#### Features:
- **3D Scene with Three.js**
  - Animated rotating sphere with phong material
  - Rotating torus with auto-rotation
  - Three floating boxes with independent animations
  - OrbitControls for user interaction
  - Professional lighting setup with ambient and point lights

- **Sections**:
  1. **Navigation Bar** - Fixed header with logo, links, and CTA buttons
  2. **Hero Section** - Main headline with 3D visualization
  3. **Stats Counter** - Key metrics (10K+ users, 50M+ tasks, etc.)
  4. **Features Section** - 6 feature cards with icons and descriptions
  5. **Pricing Section** - 3 pricing tiers with highlighted "Most Popular"
  6. **Testimonials** - 3 customer testimonials with 5-star ratings
  7. **CTA Section** - Call-to-action with gradient background
  8. **Footer** - Multi-column footer with links

- **Animations**:
  - Smooth scroll animations with Framer Motion
  - Staggered entrance animations
  - Hover effects on cards
  - Floating background elements
  - 3D object rotations and movements

#### Usage:
```tsx
import { LandingPage } from './pages';

function App() {
  return <LandingPage />;
}
```

### 2. **LoginPage.tsx**
Location: `src/pages/LoginPage.tsx`

#### Features:
- **Form Fields**:
  - Email input with validation
  - Password input with show/hide toggle
  - Remember me checkbox
  - Forgot password link

- **UI Elements**:
  - Animated rotating logo
  - Error message display
  - Loading state with spinner
  - Social login buttons (GitHub, Google)
  - Sign up link for new users

- **Animations**:
  - Staggered form animations
  - Smooth transitions on focus
  - Loading spinner animation
  - Floating background elements

#### Props:
```tsx
interface LoginPageProps {
  onLoginSuccess?: () => void;  // Callback when login succeeds
  onSignupClick?: () => void;   // Callback when signup link clicked
}
```

#### Usage:
```tsx
import { LoginPage } from './pages';

function App() {
  return (
    <LoginPage 
      onLoginSuccess={() => console.log('Logged in!')}
      onSignupClick={() => setPage('signup')}
    />
  );
}
```

### 3. **SignupPage.tsx**
Location: `src/pages/SignupPage.tsx`

#### Features:
- **Two-Step Form**:
  - Step 1: Full name, email, company
  - Step 2: Password, confirm password, terms agreement

- **Validation**:
  - Email format validation
  - Password strength requirements (8+ chars)
  - Password confirmation matching
  - Terms agreement requirement
  - Real-time error messages

- **UI Elements**:
  - Progress indicator showing step 1 of 2
  - Back button to return to step 1
  - Social signup buttons
  - Sign in link for existing users

- **Animations**:
  - Smooth step transitions
  - Staggered field animations
  - Error message animations
  - Loading state with spinner

#### Props:
```tsx
interface SignupPageProps {
  onSignupSuccess?: () => void;  // Callback when signup succeeds
  onLoginClick?: () => void;     // Callback when login link clicked
}
```

#### Usage:
```tsx
import { SignupPage } from './pages';

function App() {
  return (
    <SignupPage 
      onSignupSuccess={() => console.log('Account created!')}
      onLoginClick={() => setPage('login')}
    />
  );
}
```

## 3D Components

### AnimatedSphere
- Rotating sphere with phong material
- Vertical floating animation
- Color: #9c8a63 with emissive effect

### AnimatedTorus
- Rotating torus geometry
- Independent rotation on X and Z axes
- Color: #b8a896 with emissive glow

### FloatingBoxes
- Three boxes with different sizes
- Independent animations:
  - Box 1: Vertical floating
  - Box 2: Horizontal movement
  - Box 3: Depth movement
- Multiple colors from palette

## Integration with App

To integrate these pages into your main App.tsx:

```tsx
import { useState } from 'react';
import { LandingPage, LoginPage, SignupPage } from './pages';

function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'login' | 'signup'>('landing');

  return (
    <>
      {currentPage === 'landing' && (
        <LandingPage />
      )}
      {currentPage === 'login' && (
        <LoginPage 
          onLoginSuccess={() => setCurrentPage('dashboard')}
          onSignupClick={() => setCurrentPage('signup')}
        />
      )}
      {currentPage === 'signup' && (
        <SignupPage 
          onSignupSuccess={() => setCurrentPage('dashboard')}
          onLoginClick={() => setCurrentPage('login')}
        />
      )}
    </>
  );
}
```

## Styling

All pages use:
- **Tailwind CSS** for utility classes
- **Custom colors** from the beige/amber palette
- **Rounded corners**: xl (rounded-xl) and 2xl (rounded-2xl)
- **Shadows**: Elegant shadows for depth
- **Gradients**: Amber-600 to Amber-700 for primary CTAs

## Responsive Design

All pages are fully responsive:
- **Mobile**: Single column, optimized spacing
- **Tablet**: 2-column grids where applicable
- **Desktop**: Full multi-column layouts

## Performance Optimizations

1. **3D Scene**: Uses `dpr={[1, 2]}` for device pixel ratio optimization
2. **Animations**: Framer Motion with optimized transitions
3. **Lazy Loading**: Components load on viewport intersection
4. **Canvas**: Three.js canvas optimized for performance

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Requires WebGL support for 3D rendering

## Dependencies

Ensure these are installed:
```json
{
  "react": "^18.3.0",
  "react-dom": "^18.3.0",
  "framer-motion": "^10.x",
  "@react-three/fiber": "^8.x",
  "@react-three/drei": "^9.x",
  "three": "^r128+",
  "lucide-react": "^0.x",
  "tailwindcss": "^3.x"
}
```

## Customization

### Changing Colors
Update the color values in the components:
```tsx
// Change primary color from #9c8a63 to your color
<meshPhongMaterial color="#YOUR_COLOR" />
```

### Adjusting Animations
Modify animation speeds:
```tsx
// Change rotation speed
useFrame(({ clock }) => {
  meshRef.current.rotation.y += 0.002; // Increase for faster rotation
});
```

### Adding More Features
Each component is modular and can be extended with:
- Additional 3D objects
- More form fields
- Additional sections
- Custom animations

## Known Issues & Solutions

### Issue: 3D Scene not rendering
**Solution**: Ensure WebGL is enabled in browser and Three.js is properly installed

### Issue: Animations feel sluggish
**Solution**: Reduce animation complexity or increase `dpr` value in Canvas

### Issue: Form validation not working
**Solution**: Check that all validation functions are properly imported

## Future Enhancements

1. Add email verification
2. Implement OAuth integration
3. Add password strength meter
4. Create onboarding tutorial
5. Add analytics tracking
6. Implement dark mode toggle

## Support

For issues or questions:
1. Check the component props
2. Verify all dependencies are installed
3. Check browser console for errors
4. Ensure Tailwind CSS is properly configured

---

**Last Updated**: 2024
**Status**: ✅ Production Ready
