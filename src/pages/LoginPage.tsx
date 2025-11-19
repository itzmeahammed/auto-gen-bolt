import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, Github, Chrome } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface LoginPageProps {
  onLoginSuccess?: () => void;
  onSignupClick?: () => void;
}

export function LoginPage({ onLoginSuccess, onSignupClick }: LoginPageProps) {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      await login(email, password);
      onLoginSuccess?.();
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-amber-50 to-white flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-10 left-10 w-40 h-40 bg-amber-100 rounded-full blur-3xl opacity-20"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute bottom-10 right-10 w-60 h-60 bg-amber-100 rounded-full blur-3xl opacity-15"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md relative z-10"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 bg-gradient-to-br from-amber-600 to-amber-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
          >
            <Sparkles className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your TaskFlow Pro account</p>
        </motion.div>

        {/* Login Form */}
        <motion.form
          variants={itemVariants}
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200"
        >
          {/* Email Field */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-3">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-600" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-all text-gray-900 placeholder-gray-500"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-900">
                Password
              </label>
              <a href="#" className="text-sm text-amber-600 hover:text-amber-700 font-medium transition">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-600" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-all text-gray-900 placeholder-gray-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900 transition"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="mb-6 flex items-center">
            <input
              id="remember"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-amber-600 focus:ring-amber-600 cursor-pointer"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-gray-700 cursor-pointer">
              Remember me for 30 days
            </label>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium"
            >
              {error}
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </motion.button>
        </motion.form>

        {/* Divider */}
        <motion.div variants={itemVariants} className="my-8 flex items-center">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="px-4 text-sm text-gray-600">Or continue with</span>
          <div className="flex-1 h-px bg-gray-200" />
        </motion.div>

        {/* Social Login */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="py-3 px-4 border border-gray-200 rounded-xl hover:border-amber-300 hover:bg-amber-50 transition-all flex items-center justify-center space-x-2 font-medium text-gray-700"
          >
            <Github className="w-5 h-5" />
            <span className="hidden sm:inline">GitHub</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="py-3 px-4 border border-gray-200 rounded-xl hover:border-amber-300 hover:bg-amber-50 transition-all flex items-center justify-center space-x-2 font-medium text-gray-700"
          >
            <Chrome className="w-5 h-5" />
            <span className="hidden sm:inline">Google</span>
          </motion.button>
        </motion.div>

        {/* Signup Link */}
        <motion.div variants={itemVariants} className="mt-8 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={onSignupClick}
              className="text-amber-600 hover:text-amber-700 font-semibold transition"
            >
              Sign up here
            </button>
          </p>
        </motion.div>

        {/* Footer */}
        <motion.div variants={itemVariants} className="mt-8 pt-8 border-t border-gray-200 text-center text-xs text-gray-600">
          <p>
            By signing in, you agree to our{' '}
            <a href="#" className="text-amber-600 hover:text-amber-700 transition">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-amber-600 hover:text-amber-700 transition">
              Privacy Policy
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
