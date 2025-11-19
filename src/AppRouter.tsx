import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from './context/AuthContext';
import { LandingPage, LoginPage, SignupPage } from './pages';
import App from './App';

type PageType = 'landing' | 'login' | 'signup' | 'dashboard';

export function AppRouter() {
  const { isAuthenticated, isLoading } = useAuth();
  const [currentPage, setCurrentPage] = useState<PageType>('landing');

  // Show loading screen while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-amber-50 to-white flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-amber-200 border-t-amber-600 rounded-full"
        />
      </div>
    );
  }

  // If authenticated, show dashboard
  if (isAuthenticated) {
    return <App />;
  }

  // Show auth pages
  return (
    <motion.div
      key={currentPage}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {currentPage === 'landing' && (
        <LandingPage onGetStarted={() => setCurrentPage('signup')} />
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
    </motion.div>
  );
}
