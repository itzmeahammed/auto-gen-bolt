# Setup & Running Instructions

## Prerequisites

- Node.js 16+ installed
- npm or yarn package manager
- Modern web browser with WebGL support

## Installation

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## First Run

### What You'll See
1. **Landing Page** - Public page with 3D scene and features
2. Click **"Get Started"** to sign up
3. Fill signup form (any email/password works)
4. Click **"Create Account"**
5. You'll be logged in and see the **Dashboard**

## Testing Credentials

You can use any email and password combination:

```
Email: test@example.com
Password: TestPassword123

Email: john@example.com
Password: SecurePass456

Email: jane@example.com
Password: MyPassword789
```

## Key Features to Try

### Landing Page
- Scroll through all sections
- View 3D scene (rotate with mouse)
- Click pricing cards
- Read testimonials

### Signup
- Step 1: Enter name, email, company
- Step 2: Enter password and confirm
- Check form validation (try invalid email)
- Click "Create Account"

### Dashboard
- View your profile in header
- Click different tabs (3D View, Dashboard, Agents, etc.)
- Click "New Task" to create tasks
- Click "Logout" to sign out

### Login
- After logout, click "Sign In"
- Enter same email/password
- Click "Sign In"
- You'll be logged back in

## File Structure

```
src/
├── context/
│   └── AuthContext.tsx              # Authentication logic
├── pages/
│   ├── LandingPage.tsx              # Landing page
│   ├── LoginPage.tsx                # Login form
│   ├── SignupPage.tsx               # Signup form
│   └── index.ts                     # Exports
├── AppRouter.tsx                    # Main routing
├── App.tsx                          # Dashboard
├── main.tsx                         # Entry point
└── ...other files
```

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Customization

### Change Colors
Edit color values in components:
- Primary: `#9c8a63` (amber/beige)
- Secondary: `#b8a896`, `#c9bfb0`, `#d7d3c4`
- Accents: `from-amber-600 to-amber-700`

### Change App Name
- Landing page: Update "TaskFlow Pro" text
- Header: Update logo and title
- Footer: Update company name

### Change Features
- Edit feature cards in LandingPage.tsx
- Update pricing tiers
- Modify testimonials

### Change Authentication
- Edit `src/context/AuthContext.tsx`
- Replace mock API with real backend
- Add real password validation

## Troubleshooting

### Issue: Blank page
**Solution**: 
- Check browser console (F12)
- Ensure all dependencies installed: `npm install`
- Clear cache: `npm run dev` and refresh

### Issue: 3D scene not showing
**Solution**:
- Enable WebGL in browser settings
- Try different browser
- Check console for errors

### Issue: Can't login
**Solution**:
- Check email and password are filled
- Try different email/password
- Check browser console for errors

### Issue: Stuck on loading
**Solution**:
- Wait 1.5 seconds (simulated API delay)
- Check console for errors
- Refresh page

### Issue: Responsive design looks wrong
**Solution**:
- Refresh page
- Clear browser cache
- Try different browser
- Check screen size

## Browser Compatibility

✅ Works on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers

❌ Doesn't work on:
- IE 11 (no WebGL)
- Very old browsers

## Performance Tips

1. **Faster loading**: Disable 3D scene if not needed
2. **Better animations**: Use Chrome for best performance
3. **Mobile**: Use modern mobile browser
4. **Slow network**: App simulates 1.5s API delay

## Next Steps

### Learn More
- Read INTEGRATION_GUIDE.md for architecture
- Read TESTING_GUIDE.md for test scenarios
- Read LANDING_PAGE_GUIDE.md for components

### Customize
- Change colors and fonts
- Add your logo
- Update company info
- Modify features list

### Deploy
- Build: `npm run build`
- Deploy to Netlify, Vercel, or your server
- Connect to real backend API
- Add email verification
- Add password reset

### Extend
- Add more pages
- Add user profile
- Add settings
- Add notifications
- Add real-time features

## Support

### Documentation
- INTEGRATION_GUIDE.md - Architecture & flows
- TESTING_GUIDE.md - Test scenarios
- LANDING_PAGE_GUIDE.md - Component details
- IMPLEMENTATION_COMPLETE.md - Full summary

### Debugging
1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Check Network tab for API calls
4. Check Application tab for localStorage

### Common Issues
- See TROUBLESHOOTING section above
- Check browser console for specific errors
- Try different browser
- Clear cache and refresh

## Production Deployment

### Before Deploying
1. ✅ Test all flows (see TESTING_GUIDE.md)
2. ✅ Connect real backend API
3. ✅ Add email verification
4. ✅ Add password reset
5. ✅ Enable HTTPS
6. ✅ Add security headers
7. ✅ Set up monitoring
8. ✅ Add error tracking

### Deployment Steps
```bash
# Build production version
npm run build

# Deploy dist/ folder to your server
# Examples:
# - Netlify: drag & drop dist/
# - Vercel: connect GitHub repo
# - AWS: upload to S3 + CloudFront
# - Your server: upload via FTP/SSH
```

### Environment Variables
Create `.env` file:
```
VITE_API_URL=https://api.example.com
VITE_APP_NAME=TaskFlow Pro
VITE_ENABLE_ANALYTICS=true
```

## Maintenance

### Regular Tasks
- Update dependencies: `npm update`
- Run linter: `npm run lint`
- Test all features
- Check error logs
- Monitor performance

### Security Updates
- Keep Node.js updated
- Keep dependencies updated
- Review security advisories
- Update authentication
- Rotate secrets

## Getting Help

### Resources
- Documentation files (*.md)
- Browser console (F12)
- GitHub issues
- Stack Overflow
- Community forums

### Reporting Issues
Include:
- Browser and version
- Steps to reproduce
- Expected vs actual
- Console errors
- Screenshots

---

**Happy coding! 🚀**

For detailed information, see the other documentation files:
- INTEGRATION_GUIDE.md
- TESTING_GUIDE.md
- LANDING_PAGE_GUIDE.md
- IMPLEMENTATION_COMPLETE.md
