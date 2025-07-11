import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../API'; // Assuming you have an API.js file for login function

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [responseMsg, setResponseMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const navigate = useNavigate();

  // Handles input changes for email and password
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Toggles password visibility
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handles form submission for login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMsg(''); // Clear previous messages
    try {
      const response = await login(form,{
  withCredentials: true
});
      setResponseMsg(response.data.message || 'Login successful!');
      if (response.data.message === 'Login successfull') {
         // Redirect to dashboard or home page after successful login
        setTimeout(() => navigate('/'), 1000);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setResponseMsg('Error: ' + error.response.data.error);
      } else {
        setResponseMsg('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-pink-600 to-red-500 font-inter p-4 sm:p-6 lg:p-8">
      <form
        className="bg-white p-8 sm:p-10 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 hover:scale-105"
        onSubmit={handleSubmit}
      >
        <title>Login - EAP</title>
        <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">Welcome Back!</h2>

        {/* Email Input */}
        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="your.email@example.com"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 ease-in-out text-gray-900"
          />
        </div>

        {/* Password Input with Toggle */}
        <div className="mb-6 relative">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            id="password"
            placeholder="••••••••"
            required
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 ease-in-out text-gray-900 pr-10"
          />
          <button
            type="button"
            onClick={handleTogglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 top-7"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              // Eye open SVG
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            ) : (
              // Eye closed SVG
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.269-2.943-9.543-7a9.956 9.956 0 012.293-3.95M6.873 6.873A9.956 9.956 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.956 9.956 0 01-4.043 5.197M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
              </svg>
            )}
          </button>
        </div>

        {/* Forgot Password Link */}
        <div className="text-right mb-6">
          <Link to="/forgot" className="text-sm text-purple-600 hover:text-purple-800 transition duration-200">
            Forgot password?
          </Link>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-md hover:from-purple-700 hover:to-pink-600 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
        >
          Login
        </button>

        {/* Response Message */}
        {responseMsg && (
          <div className={`mt-4 text-center text-sm ${responseMsg.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>
            {responseMsg}
          </div>
        )}

        {/* Sign Up Redirect Link */}
        <p className="mt-6 text-center text-gray-600 text-sm">
          Don't have an account?{' '}
          <Link to="/signup" className="text-purple-600 hover:text-purple-800 font-semibold transition duration-200">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
