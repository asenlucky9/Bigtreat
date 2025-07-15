import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signin } = useAuth();
  const navigate = useNavigate();
  const [loginMode, setLoginMode] = useState('user'); // 'user' or 'admin'

  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  useEffect(() => {
    if (loginMode === 'admin') {
      setValue('email', 'admin@bigtreat.com');
    }
  }, [loginMode, setValue]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      // If admin mode, optionally pre-fill admin email
      const email = loginMode === 'admin' ? 'admin@bigtreat.com' : data.email;
      const password = data.password;
      await signin(email, password);
      navigate(loginMode === 'admin' ? '/admin' : '/dashboard');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="text-center">
          <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">BT</span>
            </div>
          </div>
          
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your Big Treat account
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Login Mode Toggle */}
          <div className="flex justify-center mb-8">
            <button
              className={`px-4 py-2 rounded-l-lg font-semibold border ${loginMode === 'user' ? 'bg-pink-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setLoginMode('user')}
            >
              User Login
            </button>
            <button
              className={`px-4 py-2 rounded-r-lg font-semibold border ${loginMode === 'admin' ? 'bg-pink-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setLoginMode('admin')}
            >
              Admin Login
            </button>
          </div>
          {loginMode === 'admin' && (
            <div className="mb-4 text-center text-pink-600 font-medium">Admin Login: Use your admin credentials</div>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  {...register('email', { required: true })}
                  className="input-field pl-10"
                  placeholder={loginMode === 'admin' ? 'admin@bigtreat.com' : 'Enter your email'}
                  readOnly={loginMode === 'admin'}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                  className="input-field pl-10 pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary flex justify-center items-center"
              >
                {loading ? (
                  <div className="spinner"></div>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Don't have an account?</span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/register"
                className="w-full btn-secondary flex justify-center"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            By signing in, you agree to our{' '}
            <Link to="/terms" className="text-pink-600 hover:text-pink-500">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-pink-600 hover:text-pink-500">
              Privacy Policy
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login; 