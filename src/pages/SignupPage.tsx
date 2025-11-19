import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Sparkles, Github, Chrome, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface SignupPageProps {
  onSignupSuccess?: () => void;
  onLoginClick?: () => void;
}

export function SignupPage({ onSignupSuccess, onLoginClick }: SignupPageProps) {
  const { signup, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState(1);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await signup(formData.fullName, formData.email, formData.password, formData.company);
      onSignupSuccess?.();
    } catch (err) {
      setErrors({ submit: 'Signup failed. Please try again.' });
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600">Join thousands of teams using TaskFlow Pro</p>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div variants={itemVariants} className="mb-8 flex items-center justify-between">
          <div className="flex-1 h-1 bg-amber-600 rounded-full" />
          <span className="ml-4 text-sm font-semibold text-amber-600">Step {step} of 2</span>
        </motion.div>

        {/* Signup Form */}
        <motion.form
          variants={itemVariants}
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200"
        >
          {step === 1 ? (
            <>
              {/* Full Name Field */}
              <div className="mb-6">
                <label htmlFor="fullName" className="block text-sm font-semibold text-gray-900 mb-3">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-600" />
                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className={`w-full pl-12 pr-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-all text-gray-900 placeholder-gray-500 ${
                      errors.fullName ? 'border-red-300' : 'border-gray-200'
                    }`}
                  />
                </div>
                {errors.fullName && (
                  <p className="mt-2 text-sm text-red-600">{errors.fullName}</p>
                )}
              </div>

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
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                    className={`w-full pl-12 pr-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-all text-gray-900 placeholder-gray-500 ${
                      errors.email ? 'border-red-300' : 'border-gray-200'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Company Field */}
              <div className="mb-8">
                <label htmlFor="company" className="block text-sm font-semibold text-gray-900 mb-3">
                  Company (Optional)
                </label>
                <input
                  id="company"
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Your Company"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-all text-gray-900 placeholder-gray-500"
                />
              </div>

              {/* Next Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => {
                  if (formData.fullName && formData.email && validateEmail(formData.email)) {
                    setStep(2);
                  } else {
                    setErrors({
                      fullName: !formData.fullName ? 'Full name is required' : '',
                      email: !formData.email ? 'Email is required' : !validateEmail(formData.email) ? 'Invalid email' : '',
                    });
                  }
                }}
                className="w-full py-3 px-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all"
              >
                <span>Continue</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </>
          ) : (
            <>
              {/* Password Field */}
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-3">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-600" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className={`w-full pl-12 pr-12 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-all text-gray-900 placeholder-gray-500 ${
                      errors.password ? 'border-red-300' : 'border-gray-200'
                    }`}
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
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                )}
                <p className="mt-2 text-xs text-gray-600">
                  Must be at least 8 characters with uppercase, lowercase, and numbers
                </p>
              </div>

              {/* Confirm Password Field */}
              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-900 mb-3">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-600" />
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className={`w-full pl-12 pr-12 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-all text-gray-900 placeholder-gray-500 ${
                      errors.confirmPassword ? 'border-red-300' : 'border-gray-200'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900 transition"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Terms Checkbox */}
              <div className="mb-6 flex items-start">
                <input
                  id="terms"
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="w-4 h-4 rounded border-gray-300 text-amber-600 focus:ring-amber-600 cursor-pointer mt-1"
                />
                <label htmlFor="terms" className="ml-3 text-sm text-gray-700 cursor-pointer">
                  I agree to the{' '}
                  <a href="#" className="text-amber-600 hover:text-amber-700 font-semibold transition">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-amber-600 hover:text-amber-700 font-semibold transition">
                    Privacy Policy
                  </a>
                </label>
              </div>
              {errors.agreeToTerms && (
                <p className="mb-6 text-sm text-red-600">{errors.agreeToTerms}</p>
              )}

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-4"
              >
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Create Account</span>
                  </>
                )}
              </motion.button>

              {/* Back Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => setStep(1)}
                className="w-full py-3 px-4 border-2 border-gray-200 text-gray-900 rounded-xl font-semibold hover:border-amber-300 hover:bg-amber-50 transition-all"
              >
                Back
              </motion.button>
            </>
          )}
        </motion.form>

        {step === 1 && (
          <>
            {/* Divider */}
            <motion.div variants={itemVariants} className="my-8 flex items-center">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="px-4 text-sm text-gray-600">Or sign up with</span>
              <div className="flex-1 h-px bg-gray-200" />
            </motion.div>

            {/* Social Signup */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                className="py-3 px-4 border border-gray-200 rounded-xl hover:border-amber-300 hover:bg-amber-50 transition-all flex items-center justify-center space-x-2 font-medium text-gray-700"
              >
                <Github className="w-5 h-5" />
                <span className="hidden sm:inline">GitHub</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                className="py-3 px-4 border border-gray-200 rounded-xl hover:border-amber-300 hover:bg-amber-50 transition-all flex items-center justify-center space-x-2 font-medium text-gray-700"
              >
                <Chrome className="w-5 h-5" />
                <span className="hidden sm:inline">Google</span>
              </motion.button>
            </motion.div>
          </>
        )}

        {/* Login Link */}
        <motion.div variants={itemVariants} className="mt-8 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button
              onClick={onLoginClick}
              className="text-amber-600 hover:text-amber-700 font-semibold transition"
            >
              Sign in here
            </button>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
