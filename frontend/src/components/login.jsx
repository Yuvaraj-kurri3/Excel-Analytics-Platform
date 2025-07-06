import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [responseMsg, setResponseMsg] = useState('');
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
        setTimeout(() => navigate('/home'), 1000);
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
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
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