import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {isLoggedIn} from '../API'; // Import the isLoggedIn function from API.js
import { logoutAPI } from '../API'; // Import the logout function from API.js


// Main App component
export default function Home() {
  const [fileName, setFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  // Function to handle file upload (placeholder)
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      // Simulate upload process
      setIsUploading(true);
      setTimeout(() => {
        setIsUploading(false);
        console.log(`File "${file.name}" uploaded.`);
        // In a real app, you would send the file to a server here
      }, 1500);
    }
  };

  // Function to handle "Analyze" button click (placeholder)
  const handleAnalyze = () => {
    if (fileName) {
      console.log(`Analyzing file: ${fileName}`);
      alert(`Analyzing "${fileName}". Results will be displayed here!`);
    } else {
      alert("Please upload an Excel file first.");
    }
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await logoutAPI(); // Call the logout function from API.js
      alert('You have been logged out successfully.');
      navigate('/');
    } catch (error) {
      alert('Logout failed. Please try again.');
    }
  };

  // Check login status and redirect on Get Started
  const handleGetStarted = async () => {
    try {
      const res = await isLoggedIn();
 
      if (res.data.isLoggedIn) {
        // Scroll to the UploadBox div if logged in
        const uploadBox = document.getElementById('UploadBox');
        if (uploadBox) {
          uploadBox.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        alert("You need to log in first.");
        navigate('/login');
      }
    } catch (err) {
              alert("You need to log in first.");

      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-inter relative overflow-hidden">
      {/* Background animation elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute w-64 h-64 bg-white opacity-10 rounded-full blur-3xl animate-blob animation-delay-0 top-1/4 left-1/4"></div>
        <div className="absolute w-72 h-72 bg-purple-300 opacity-10 rounded-full blur-3xl animate-blob animation-delay-2000 top-1/2 left-3/4"></div>
        <div className="absolute w-80 h-80 bg-blue-300 opacity-10 rounded-full blur-3xl animate-blob animation-delay-4000 bottom-1/4 right-1/4"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 p-4 md:p-6 flex flex-col md:flex-row items-center justify-between  rounded-b-xl mx-2 md:mx-4 mt-2">
        <div className="text-3xl font-extrabold text-white mb-4 md:mb-0">
          Excel <span className="text-green-400">Logo</span>
        </div>
        <nav>
          <ul className="flex space-x-4 md:space-x-8">
            <li>
              <a href="/" className="text-white hover:text-green-300 transition duration-300 ease-in-out transform hover:scale-110">Home</a>
                </li>
            <li>
                <Link to={"/about"} className="text-white hover:text-green-300 transition duration-300 ease-in-out transform hover:scale-110">About</Link>
            </li>
            <li>
                <Link to={"/contact"} className="text-white hover:text-green-300 transition duration-300 ease-in-out transform hover:scale-110">Contact</Link>
            </li>
             <li>
                <Link to={"/dashboard"} className="text-white hover:text-green-300 transition duration-300 ease-in-out transform hover:scale-110">Dashboard</Link>
            </li>
            <li>
              <button onClick={handleLogout} className='text-white hover:text-red-600 transition duration-300 ease-in-out transform hover:scale-110'>Logout</button>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center py-16 px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight animate-fade-in">
          <span className="text-green-300">Excel</span> Analytics Platform
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl animate-fade-in animation-delay-500">
          Upload Excel files & instantly generate smart visuals
        </p>
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-opacity-75 animate-bounce-in"
          onClick={handleGetStarted}
        >
          Get Started
        </button>

        {/* Auth Buttons */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 mt-12 animate-fade-in animation-delay-1000">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          
          >
         <Link to={"/login"}>Signin</Link>
          </button>
          <button
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75"
          
          >
          <Link to={"/signup"}>Sign Up</Link>
          </button>
        </div>

        {/* File Upload Section */}
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-8 rounded-2xl shadow-2xl mt-16 w-full max-w-lg animate-slide-up" id='UploadBox'>
          <h2 className="text-3xl font-bold text-white mb-6">Upload File Here</h2>
          <div className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center cursor-pointer hover:border-green-400 transition duration-300 ease-in-out">
            <label htmlFor="file-upload" className="block text-gray-300 text-lg mb-2">
              Drag and drop your Excel file here, or click to browse
            </label>
            <input
              id="file-upload"
              type="file"
              accept=".xlsx,.xls"
              className="hidden"
              onChange={handleFileUpload}
            />
            <button
              onClick={() => document.getElementById('file-upload').click()}
              className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75"
            >
              Browse Files
            </button>
            {fileName && (
              <p className="mt-4 text-green-300 text-md">
                {isUploading ? 'Uploading...' : `Selected: ${fileName}`}
              </p>
            )}
          </div>
          <p className="text-sm text-gray-400 mt-4">
            Supported formats: .xlsx, .xls
          </p>
          <button
            className="mt-8 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-10 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-75"
            onClick={handleAnalyze}
            disabled={!fileName || isUploading}
          >
            Analyze
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-gray-300 bg-black bg-opacity-20 rounded-t-xl mx-2 md:mx-4 mb-2 mt-auto">
        <p>&copy; 2025 Copyrights Excel by Zidio.</p>
      </footer>

      {/* Tailwind CSS Custom Animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .animation-delay-500 { animation-delay: 0.5s; }
        .animation-delay-1000 { animation-delay: 1s; }

        @keyframes bounce-in {
          0% { opacity: 0; transform: scale(0.5); }
          60% { opacity: 1; transform: scale(1.1); }
          80% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
        .animate-bounce-in {
          animation: bounce-in 0.7s ease-out forwards;
        }

        @keyframes slide-up {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
          animation-delay: 1.2s; /* Delay for this section */
        }

        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite ease-in-out;
        }
        .animation-delay-0 { animation-delay: 0s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
}
