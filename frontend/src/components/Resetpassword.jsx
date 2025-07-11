import React, { useState } from 'react';
 import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../API'; // Import the resetPassword function from API.js

const Resetpassword = () => {
  const [newpassword, setnewpassword] = useState('');
  const [responseMsg, setResponseMsg] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMsg('');
    try {
        let response = await resetPassword(newpassword);
        console.log(response.data.message);
        if (response.data.message === 'Password reset successful') {
          setResponseMsg('Password reset successful. Redirecting to login...');
          setTimeout(() => navigate('/login'), 1000);
        }
    } catch (error) {
      setResponseMsg('Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-500">
      <title>Reset - EAP</title>
      <form className="bg-white p-8 rounded-xl shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center">Reset Password</h2>
        <input
          type="text"
          name="resetpassword"
          placeholder="Enter New Password"
          required
          value={newpassword}
          onChange={(e) => setnewpassword(e.target.value)}
          className="w-full mb-4 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="w-full bg-purple-700 text-white py-2 rounded-md hover:bg-purple-800"
        >
          Reset Password
        </button>
        {responseMsg && (
          <div className="mt-4 text-center text-sm text-red-600">{responseMsg}</div>
        )}
      </form>
    </div>
  );
};

export default Resetpassword;