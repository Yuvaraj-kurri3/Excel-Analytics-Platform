import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyOtp } from '../API'; // Import the verifyOtp function from API.js

const OtpVerification = () => {
  const [otp, setOtp] = useState('');
  const [responseMsg, setResponseMsg] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMsg('');
    try {
        let response= await verifyOtp(otp);
     if (response.data.message === 'Valid OTP') {
        setTimeout(() => navigate('/Resetpassword'), 1000);
      }
      // Redirect or further logic here
    } catch (error) {
      setResponseMsg('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-500">
      <title>OTP Verification - EAP</title>
      <form className="bg-white p-8 rounded-xl shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center">OTP Verification</h2>
        <input
          type="text"
          name="otp"
          placeholder="Enter OTP"
          required
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full mb-4 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="w-full bg-purple-700 text-white py-2 rounded-md hover:bg-purple-800"
        >
          Verify OTP
        </button>
        {responseMsg && (
          <div className="mt-4 text-center text-sm text-red-600">{responseMsg}</div>
        )}
      </form>
    </div>
  );
};

export default OtpVerification;