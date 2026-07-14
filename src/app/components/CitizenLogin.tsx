import { useState } from 'react';
import { LogIn, User, Lock, Mail, Phone, UserCircle } from 'lucide-react';

interface CitizenLoginProps {
  onLoginSuccess: (userData: { id: string; name: string; email: string; role: 'citizen' }) => void;
  onBackToHome: () => void;
}

export default function CitizenLogin({ onLoginSuccess, onBackToHome }: CitizenLoginProps) {
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Demo validation
    if (!emailOrPhone || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Demo login - any valid credentials work
    onLoginSuccess({
      id: 'user1',
      name: loginMethod === 'email' ? emailOrPhone.split('@')[0] : 'Citizen User',
      email: loginMethod === 'email' ? emailOrPhone : `${emailOrPhone}@janmarg.in`,
      role: 'citizen',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Home</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="flex gap-0.5">
              <div className="w-2 h-8 bg-[#FF9933] rounded-l"></div>
              <div className="w-2 h-8 bg-white"></div>
              <div className="w-2 h-8 bg-[#138808] rounded-r"></div>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#FF9933] via-gray-800 to-[#138808] bg-clip-text text-transparent">
              JANMARG
            </h1>
          </div>
        </div>
      </div>

      {/* Login Form */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-50 to-green-50 p-8 text-center border-b border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-br from-[#FF9933] to-[#138808] rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                <UserCircle className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Citizen Login</h2>
              <p className="text-sm text-gray-600">Sign in to access the JANMARG Citizen Portal</p>
            </div>

            {/* Form */}
            <div className="p-8">
              {/* Login Method Toggle */}
              <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-lg">
                <button
                  type="button"
                  onClick={() => setLoginMethod('email')}
                  className={`flex-1 py-2.5 px-4 rounded-md font-medium transition-all ${
                    loginMethod === 'email'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email
                </button>
                <button
                  type="button"
                  onClick={() => setLoginMethod('phone')}
                  className={`flex-1 py-2.5 px-4 rounded-md font-medium transition-all ${
                    loginMethod === 'phone'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone
                </button>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                {/* Email/Phone Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {loginMethod === 'email' ? 'Email Address' : 'Phone Number'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      {loginMethod === 'email' ? (
                        <Mail className="w-5 h-5 text-gray-400" />
                      ) : (
                        <Phone className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <input
                      type={loginMethod === 'email' ? 'email' : 'tel'}
                      value={emailOrPhone}
                      onChange={(e) => setEmailOrPhone(e.target.value)}
                      placeholder={loginMethod === 'email' ? 'citizen@example.com' : '+91 98765 43210'}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                {/* Demo Credentials */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-xs font-medium text-blue-900 mb-2">Demo Credentials:</p>
                  <p className="text-xs text-blue-700">
                    <strong>Email:</strong> any@example.com<br />
                    <strong>Phone:</strong> Any 10-digit number<br />
                    <strong>Password:</strong> Any password (6+ characters)
                  </p>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#FF9933] to-[#FF7722] text-white py-3.5 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <LogIn className="w-5 h-5" />
                  Sign In as Citizen
                </button>

                {/* Forgot Password */}
                <div className="text-center">
                  <button
                    type="button"
                    className="text-sm text-gray-600 hover:text-gray-900 underline"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Sign Up Link */}
                <div className="text-center pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <button type="button" className="text-[#FF9933] font-semibold hover:underline">
                      Sign Up
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Footer Info */}
          <div className="text-center mt-6 text-sm text-gray-600">
            <p>By logging in, you agree to JANMARG's Terms of Service and Privacy Policy</p>
          </div>
        </div>
      </div>
    </div>
  );
}
