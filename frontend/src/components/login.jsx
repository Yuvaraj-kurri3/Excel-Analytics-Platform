import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import Forgot from './Forgotpassword';
 
const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [responseMsg, setResponseMsg] = useState('');
   const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMsg('');
    try {
      const response = await axios.post('/api/auth/login', form);
      setResponseMsg(response.data.message || 'Login successful!');
      if (response.data.message === 'Login successful') {
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-500">
      <form className="bg-white p-8 rounded-xl shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center">Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
          />
        <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
            tabIndex={0}
            role="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
             {showPassword ? (
              // Eye open SVG
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
                   ) : (
              // Eye closed SVG
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.269-2.943-9.543-7a9.956 9.956 0 012.293-3.95M6.873 6.873A9.956 9.956 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.956 9.956 0 01-4.043 5.197M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
              </svg>
            )}
          </span>
        </div>
        {/* // add forgot password link */}
        <div className="text-right mb-4">
          <Link to="/Forgot" className="text-purple-700 hover:underline">Forgot Password?</Link>
        </div>
        <button
          type="submit"
          className="w-full bg-purple-700 text-white py-2 rounded-md hover:bg-purple-800"
        >
          Login
        </button>
        {responseMsg && (
          <div className="mt-4 text-center text-sm text-red-600">{responseMsg}</div>
        )}
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-purple-700 hover:underline">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;