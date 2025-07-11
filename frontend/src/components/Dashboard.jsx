import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutAPI } from '../API'; // Import the logout function from API.js

// Placeholder Components (you'll replace these with your actual content)
const UploadContent = () => (
  <div className="bg-gray-900 p-6 rounded-lg shadow-md mb-10">
    <h2 className="text-2xl font-semibold text-white mb-4">Upload New File</h2>
    <p className="text-gray-400">This is where your file upload form will go.</p>
    {/* Add your file upload component here */}
    <div className="mt-4 p-8 border-2 border-dashed border-gray-700 rounded-lg text-center">
      <p className="text-gray-500">Drag and drop your Excel file here, or click to browse.</p>
      <input type="file" className="hidden" id="file-upload" />
      <label htmlFor="file-upload" className="mt-4 inline-block bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded cursor-pointer transition duration-200">
        Browse Files
      </label>
    <p className='opcaity-0'>Supported files .xls & .xsx</p>

    </div>
  </div>
);

const HistoryContent = () => (
  <div className="bg-gray-900 p-6 rounded-lg shadow-md mb-10">
    <h2 className="text-2xl font-semibold text-white mb-4">Upload History</h2>
    <p className="text-gray-400">Here you will see a list of all your past uploads and their statuses.</p>
    {/* Example history table, you'd populate this dynamically */}
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full text-left text-sm whitespace-nowrap">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="py-3 px-4 text-gray-400">File Name</th>
            <th className="py-3 px-4 text-gray-400">Upload Date</th>
            <th className="py-3 px-4 text-gray-400">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-800">
            <td className="py-3 px-4">Sales_Report_Q4_2024.xlsx</td>
            <td className="py-3 px-4 text-gray-400">2024-12-30</td>
            <td className="py-3 px-4 text-green-500">Analyzed</td>
          </tr>
          <tr className="border-b border-gray-800">
            <td className="py-3 px-4">Budget_Forecast_2025.xls</td>
            <td className="py-3 px-4 text-gray-400">2025-01-15</td>
            <td className="py-3 px-4 text-yellow-500">Pending</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const RecentChartsContent = () => (
  <div className="bg-gray-900 p-6 rounded-lg shadow-md mb-10">
    <h2 className="text-2xl font-semibold text-white mb-4">Your Recent Charts</h2>
    <p className="text-gray-400">Browse your recently generated charts and visualizations.</p>
    {/* Example chart cards, you'd populate this dynamically */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      <div className="bg-gray-800 p-5 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold text-blue-300 mb-2">Regional Sales Overview</h3>
        <p className="text-gray-400 text-sm mb-3">Type: Bar Chart</p>
        <div className="text-gray-500 text-xs">Generated: 2025-07-08</div>
        <button className="mt-3 bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-3 rounded transition duration-200">
          View Chart
        </button>
      </div>
      <div className="bg-gray-800 p-5 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold text-blue-300 mb-2">Customer Acquisition Trends</h3>
        <p className="text-gray-400 text-sm mb-3">Type: Line Chart</p>
        <div className="text-gray-500 text-xs">Generated: 2025-07-05</div>
        <button className="mt-3 bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-3 rounded transition duration-200">
          View Chart
        </button>
      </div>
    </div>
  </div>
);

// Main Dashboard component (now serving as the Dashboard Page)
export default function Dashboard() {
  const navigate = useNavigate();
  // State variables for recent uploads and analysis results
  const [recentUploads, setRecentUploads] = useState([
    { id: 1, name: 'Q1_Sales_Report.xlsx', date: '2025-07-01', status: 'Analyzed' },
    { id: 2, name: 'Marketing_Campaign_Data.xls', date: '2025-06-28', status: 'Pending' },
    { id: 3, name: 'Inventory_Audit_2025.xlsx', date: '2025-06-25', status: 'Analyzed' },
  ]);

  const [analysisResults, setAnalysisResults] = useState([
    { id: 1, title: 'Sales Performance by Region', type: 'Chart', date: '2025-07-01' },
    { id: 2, title: 'Customer Churn Prediction', type: 'Table', date: '2025-06-29' },
    { id: 3, title: 'Expense Breakdown', type: 'Summary', date: '2025-06-26' },
  ]);

  // State for sidebar visibility on mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // State to control which main content section is displayed
  const [activeContent, setActiveContent] = useState('dashboard'); // 'dashboard', 'upload', 'history', 'recent-charts', 'profile'

  // Logout handler
  const handleLogout = async () => {
    try {
      await logoutAPI(); // Call the logout function from API.js
      // Optionally clear any auth state here
      alert("You have been logged out successfully.");
      navigate('/home');
    } catch (error) {
      alert('Logout failed. Please try again.');
    }
  };

  // Function to render content based on activeContent state
  const renderContent = () => {
    switch (activeContent) {
      case 'dashboard':
        return (
          <>
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-10">
              Welcome to Your Dashboard
            </h1>

            {/* Overview Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-gray-900 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-green-400 mb-2">Total Files</h2>
                <p className="text-3xl font-bold">128</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-blue-400 mb-2">Analyzed Reports</h2>
                <p className="text-3xl font-bold">95</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-yellow-400 mb-2">Pending Analysis</h2>
                <p className="text-3xl font-bold">12</p>
              </div>
            </div>

            {/* Recent Uploads Section */}
            <div className="bg-gray-900 p-6 rounded-lg shadow-md mb-10">
              <h2 className="text-2xl font-semibold text-white mb-4">Recent Uploads</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm whitespace-nowrap">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="py-3 px-4 text-gray-400">File Name</th>
                      <th className="py-3 px-4 text-gray-400">Upload Date</th>
                      <th className="py-3 px-4 text-gray-400">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUploads.map((upload) => (
                      <tr key={upload.id} className="border-b border-gray-800 last:border-b-0">
                        <td className="py-3 px-4">{upload.name}</td>
                        <td className="py-3 px-4 text-gray-400">{upload.date}</td>
                        <td className={`py-3 px-4 ${upload.status === 'Analyzed' ? 'text-green-500' : 'text-yellow-500'}`}>
                          {upload.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Analysis Results Section */}
            <div className="bg-gray-900 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-white mb-4">Analysis Results</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {analysisResults.map((result) => (
                  <div key={result.id} className="bg-gray-800 p-5 rounded-lg shadow-sm flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-blue-300 mb-2">{result.title}</h3>
                      <p className="text-gray-400 text-sm mb-3">Type: {result.type}</p>
                    </div>
                    <div className="flex justify-between items-center text-gray-500 text-xs">
                      <span>Generated: {result.date}</span>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-3 rounded transition duration-200">
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        );
      case 'upload':
        return <UploadContent />;
      case 'history':
        return <HistoryContent />;
      case 'recent-charts':
        return <RecentChartsContent />;
      case 'profile':
        return (
          <div className="bg-gray-900 p-6 rounded-lg shadow-md mb-10">
            <h2 className="text-2xl font-semibold text-white mb-4">User Profile</h2>
            <p className="text-gray-400">This section will contain your profile information and settings.</p>
            {/* Add profile details here */}
          </div>
        );
      default:
        return null;
    }
  };


  return (
    <div className="min-h-screen bg-black text-white font-inter">
      <title>Dashboard -EAP</title>
      {/* Header */}
      <header className="p-4 md:p-6 flex flex-col md:flex-row items-center justify-between bg-gray-900 shadow-lg rounded-xl mb-6">
        <div className="text-3xl font-extrabold text-white mb-4 md:mb-0">
          Excel <span className="text-green-400">Analytics Platform</span>
        </div>
        <nav className="hidden md:flex"> {/* Desktop navigation */}
          <ul className="flex space-x-8">
            <li>
              <a href="/" className="text-white hover:text-green-300 transition duration-200">Home</a>
            </li>
            <li>
              <a href="/about" className="text-white hover:text-green-300 transition duration-200">About</a>
            </li>
            <li>
              <a href="/login" className="text-white hover:text-green-300 transition duration-200">Login</a>
            </li>
            <li>
              <button onClick={handleLogout} className="text-white hover:text-red-400 transition duration-200 bg-transparent border-none cursor-pointer">Logout</button>
            </li>
          </ul>
        </nav>
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className={`w-64 bg-gray-800 p-6 space-y-6 md:relative fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition duration-200 ease-in-out z-40 md:z-auto`}>
          <div className="text-2xl font-bold text-white mb-8">Navigation</div>
          <nav>
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => { setActiveContent('dashboard'); setIsSidebarOpen(false); }}
                  className={`flex items-center w-full text-left p-3 rounded-lg transition duration-200 ${activeContent === 'dashboard' ? 'text-green-400 bg-gray-700' : 'text-gray-300 hover:text-green-400 hover:bg-gray-700'}`}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0l-7 7m7-7v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                  Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveContent('upload'); setIsSidebarOpen(false); }}
                  className={`flex items-center w-full text-left p-3 rounded-lg transition duration-200 ${activeContent === 'upload' ? 'text-green-400 bg-gray-700' : 'text-gray-300 hover:text-green-400 hover:bg-gray-700'}`}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                  Upload File
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveContent('history'); setIsSidebarOpen(false); }}
                  className={`flex items-center w-full text-left p-3 rounded-lg transition duration-200 ${activeContent === 'history' ? 'text-green-400 bg-gray-700' : 'text-gray-300 hover:text-green-400 hover:bg-gray-700'}`}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  History
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveContent('recent-charts'); setIsSidebarOpen(false); }}
                  className={`flex items-center w-full text-left p-3 rounded-lg transition duration-200 ${activeContent === 'recent-charts' ? 'text-green-400 bg-gray-700' : 'text-gray-300 hover:text-green-400 hover:bg-gray-700'}`}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                  Recent Charts
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveContent('profile'); setIsSidebarOpen(false); }}
                  className={`flex items-center w-full text-left p-3 rounded-lg transition duration-200 ${activeContent === 'profile' ? 'text-green-400 bg-gray-700' : 'text-gray-300 hover:text-green-400 hover:bg-gray-700'}`}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  Profile
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black opacity-50 z-30 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>
        )}

        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto">
          {renderContent()}
        </main>
      </div>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 mt-10">
        <p>&copy; 2025 Excel Analytics Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}