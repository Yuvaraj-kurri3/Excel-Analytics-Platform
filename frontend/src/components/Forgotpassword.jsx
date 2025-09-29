import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../API'; // Import the forgotPassword function from API.js
// import OtpVerification from './verification';  

const Forgot = () => {
  const [email, setEmail] = useState('');
  const [responseMsg, setResponseMsg] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMsg('');
    // You can replace this with your backend API call
    try {
      let response= await forgotPassword(email);
       if(response.data.message === 'OTP sent to your email.') {
        setResponseMsg('OTP sent to your email. Redirecting to verification page...');
        setTimeout(() => navigate('/OtpVerification'), 2500);
      }
      else {
        setResponseMsg(response.data.message || 'Enter correct Email.');
      }
     } catch (error) {
      setResponseMsg('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-500">
            <title>ForgotPassword -EAP</title>
      <form className="bg-white p-8 rounded-xl shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center">Forgot Password</h2>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="w-full bg-purple-700 text-white py-2 rounded-md hover:bg-purple-800"
        >
          Send OTP
        </button>
        {responseMsg && (
          <div className="mt-4 text-center text-sm text-red-600">{responseMsg}</div>
        )}
      </form>
    </div>
  );
};

export default Forgot;