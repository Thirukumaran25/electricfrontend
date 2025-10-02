import React, { useState } from "react";
import { sendOtp, verifyOtp, emailLogin, registerUser } from "../api/api";
import { useAuth } from "../contexts/AuthContext";
import RegisterPopup from '../components/RegisterPopup';

function Account() {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [authMessage, setAuthMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated, logout } = useAuth();
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);

  // If user is already authenticated, show logout option
  if (isAuthenticated) {
    return (
      <div className="flex flex-col items-center py-20 px-2">
        <div className="w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-8">You are logged in!</h2>
          <p className="text-gray-600 mb-8">You are currently logged in to your account.</p>
          <button
            onClick={logout}
            className="bg-red-600 text-white rounded-full px-8 py-3 font-bold hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  const handlePhoneLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAuthMessage("");
    try {
      await sendOtp(phone);
      setOtpSent(true);
      setAuthMessage("OTP sent to your phone.");
    } catch (err) {
      console.log(err);
      setAuthMessage("Failed to send OTP. Please try again.");
    }
    setLoading(false);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAuthMessage("");
    try {
      const res = await verifyOtp(phone, otp);
      setAuthMessage(res.message || "OTP verified, login successful.");
      // Store tokens/user info in localStorage
      localStorage.setItem("access_token", res.access);
      localStorage.setItem("refresh_token", res.refresh);
      localStorage.setItem("user_id", res.user_id);
      
      // Update auth context
      login({ id: res.user_id });
      
      // Update auth context
      login({ id: res.user_id });
    } catch (err) {
      console.log(err);
      setAuthMessage("Invalid OTP or error verifying. Try again.");
    }
    setLoading(false);
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAuthMessage("");
    try {
      const res = await emailLogin(email, password);
      setAuthMessage(res.message || "Login successful.");
      localStorage.setItem("access_token", res.access);
      localStorage.setItem("refresh_token", res.refresh);
      localStorage.setItem("user_id", res.user_id);
      
      // Update auth context
      login({ id: res.user_id });
    } catch (err) {
      console.log(err);
      setAuthMessage("Invalid credentials or error logging in.");
    }
    setLoading(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAuthMessage("");
    try {
      const res = await registerUser(email, password);
      setAuthMessage(res.message || "Registration successful.");
      localStorage.setItem("access_token", res.access);
      localStorage.setItem("refresh_token", res.refresh);
      localStorage.setItem("user_id", res.user_id);
      
      // Update auth context
      login({ id: res.user_id });
    } catch (err) {
      console.log(err);
      setAuthMessage("Error registering. Email may already be used.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center py-10 px-4">
      <h2 className="text-2xl font-bold mb-8 text-center">Account Log in or Sign in| <span
      onClick={() => setShowRegisterPopup(true)}
        className="nav-link hover:text-blue-600 text-orange-600 font-semibold">
        Register here </span></h2>

      <RegisterPopup 
      isOpen={showRegisterPopup} 
      onClose={() => setShowRegisterPopup(false)} />
      <div className="w-full max-w-2xl space-y-6">
        
        {/* Main Phone Login Section */}
        <div className="border-2 border-gray-300 rounded-3xl p-6 bg-white shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="font-semibold text-lg">Log in to book your services</span>
          </div>
          
          <form onSubmit={handlePhoneLogin}>
            <div className="mb-4">
              <label className="block mb-2 font-medium text-gray-700">Enter Phone Number</label>
              <input
                type="tel"
                className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <div className="text-sm text-gray-500 mt-2">
                Enter mobile number; we will send a verification code
              </div>
            </div>
            
            {!otpSent ? (
              <button
                type="submit"
                disabled={loading}
                className="bg-orange-600 hover:bg-orange-700 text-white rounded-full px-8 py-2 font-bold transition-colors disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Log in'}
              </button>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 font-medium text-gray-700">Enter OTP</label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength="6"
                    required
                  />
                </div>
                <button
                  onClick={handleVerifyOtp}
                  disabled={loading}
                  className="bg-orange-600 hover:bg-orange-700 text-white rounded-full px-8 py-2 font-bold transition-colors disabled:opacity-50"
                >
                  {loading ? 'Verifying...' : 'Verify'}
                </button>
              </div>
            )}
            
            {authMessage && (
              <div className={`text-sm mt-3 p-2 rounded ${
                authMessage.includes('successful') || authMessage.includes('sent') 
                  ? 'text-green-600 bg-green-50' 
                  : 'text-red-600 bg-red-50'
              }`}>
                {authMessage}
              </div>
            )}
          </form>
        </div>

        {/* Email/Phone Login Section */}
        <div className="border-2 border-gray-300 rounded-3xl p-6 bg-white shadow-sm">
          <h3 className="text-lg font-semibold mb-6 text-center">Sign in with email or mobile number</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Phone Number Section */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                className="border border-gray-300 rounded-lg px-4 py-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <button
                type="button"
                onClick={handlePhoneLogin}
                disabled={loading}
                className="bg-orange-600 hover:bg-orange-700 text-white rounded-full px-6 py-2 font-bold w-full transition-colors disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Verify'}
              </button>
            </div>

            {/* Email Section */}
            <div>
              <form onSubmit={handleEmailLogin}>
                <div className="mb-4">
                  <label className="block mb-2 font-medium text-gray-700">Email address</label>
                  <input
                    type="email"
                    className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Email id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block mb-2 font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-orange-600 hover:bg-orange-700 text-white rounded-full px-6 py-2 font-bold w-full transition-colors disabled:opacity-50"
                >
                  {loading ? 'Signing in...' : 'Sign in'}
                </button>
              </form>
            </div>
          </div>
          
          {authMessage && (
            <div className={`text-sm mt-4 p-3 rounded text-center ${
              authMessage.includes('successful') || authMessage.includes('sent') 
                ? 'text-green-600 bg-green-50' 
                : 'text-red-600 bg-red-50'
            }`}>
              {authMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Account;
