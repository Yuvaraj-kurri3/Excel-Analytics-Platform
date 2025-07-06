import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Signup = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [responseMsg, setResponseMsg] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

   const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMsg('');
    try {
      const response = await axios.post('/api/auth/signup', form);
      setResponseMsg(response.data.message || 'Signup successful!');
      // Example: localStorage.setItem('token', response.data.token);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setResponseMsg('Error: ' + error.response.data.error);
      } else {
        setResponseMsg(' Signup failed. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-500">
      <form className="bg-white p-8 rounded-xl shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center">Signup</h2>
        <input
          type="text"
          name="username"
          placeholder="Name"
          required
          value={form.username}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">

          </input>
      
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
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
          Signup
        </button>
        {responseMsg && (
          <div className="mt-4 text-center text-sm text-red-600">{responseMsg}</div>
        )}
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/" className="text-purple-700 hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
