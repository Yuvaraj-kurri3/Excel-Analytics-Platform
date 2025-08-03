import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutAPI,Upload } from '../API'; // Import the logout function from API.js
// import axios from 'axios';
// Chart.js chart display component
import {  Bar, Line, Pie, Scatter, Bubble, Radar} from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, LineElement, PointElement, Tooltip, Legend } from 'chart.js';
// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);
 
// Placeholder Components (you'll replace these with your actual content)


const HistoryContent = ({ userEmail, history }) => (
  <div className="bg-gray-900 p-6 rounded-lg shadow-md mb-10">

    <h2 className="text-2xl font-semibold text-white mb-4">Your Analysis History</h2>
    <p className="text-gray-400">View your past analysis results and generated charts.</p>
    <ul className="mt-4 space-y-3">
      {history && history.length > 0 ? (
        history.map((item, idx) => (
          <li key={idx} className="bg-gray-800 p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-blue-300">{item.title || item.fileName}</h3>
            <p className="text-gray-400 text-sm">Generated on: {item.date}</p>
            {item.chartType && <p className="text-gray-400 text-xs">Type: {item.chartType}</p>}
          </li>
        ))
      ) : (
        <li className="text-gray-400">No history found.</li>
      )}
    </ul>
  </div>
);

const RecentChartsContent = ({ history, onViewChart, onDeleteChart }) => {
  const recent = (history || []).slice(0, 3);
  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-md mb-10">
      <h2 className="text-2xl font-semibold text-white mb-4">Your Recent Charts</h2>
      <p className="text-gray-400">Browse your recently generated charts and visualizations.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {recent.length > 0 ? recent.map((item, idx) => (
          <div key={idx} className="bg-gray-800 p-5 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-blue-300 mb-2">{item.title || item.fileName}</h3>
            <p className="text-gray-400 text-sm mb-3">Type: {item.chartType}</p>
            <div className="text-gray-500 text-xs">Generated: {item.date}</div>
            <div className="flex gap-2 mt-3">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-3 rounded transition duration-200"
                onClick={() => onViewChart(item)}
              >
                View Chart
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white text-sm py-1 px-3 rounded transition duration-200"
                onClick={() => onDeleteChart(item)}
              >
                Delete
              </button>
            </div>
          </div>
        )) : (
          <div className="text-gray-400">No recent charts found.</div>
        )}
      </div>
    </div>
  );
};

const generateColors = (count) => {
  const colors = [
    '#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0',
    '#9966ff', '#ff9f40', '#c9cbcf', '#8dd17e',
    '#ff6b6b', '#845ec2', '#ffc75f', '#008f7a'
  ];
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(colors[i % colors.length]);
  }
  return result;
};

const ChartDisplay = ({ chartType, labels, values, title }) => {
const backgroundColors = generateColors(labels.length);

const data = {
  labels,
  datasets: [{
    label: title,
    data: values,
    backgroundColor: chartType.toLowerCase().includes('pie') ? backgroundColors : backgroundColors[0],
    borderColor: 'rgba(0,0,0,0.1)',
    borderWidth: 1,
  }]
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: chartType.toLowerCase().includes('pie'),
      position: 'top'
    },
    title: {
      display: true,
      text: title,
      color: 'white',
      font: {
        size: 18
      }
    }
  },
  scales: chartType.toLowerCase().includes('pie') ? {} : {
    x: {
      ticks: { color: 'white' },
      grid: { color: '#333' }
    },
    y: {
      ticks: { color: 'white' },
      grid: { color: '#333' }
    }
  }
};


  if (chartType.toLowerCase().includes('bar')) {
    return <Bar data={data} options={options} />;
  } else if (chartType.toLowerCase().includes('line')) {
    return <Line key={chartType + JSON.stringify(labels) + JSON.stringify(values)}
  data={data}
  options={options} />;
  } else if (chartType.toLowerCase().includes('pie')) {
    return <Pie  key={chartType + JSON.stringify(labels) + JSON.stringify(values)}
  data={data}
  options={options}/>;
  } else if (chartType.toLowerCase().includes('scatter')) {
    return <Scatter  key={chartType + JSON.stringify(labels) + JSON.stringify(values)}
  data={data}
  options={options} />;
  } else if (chartType.toLowerCase().includes('bubble')) {
    // Bubble chart expects data in a specific format
    const bubbleData = {
      datasets: [
        {
          label: title,
          data: values.map((v, i) => ({ x: i, y: v, r: 5 })),
          backgroundColor: backgroundColors,
        },
      ],
    };
    return <Bubble data={bubbleData} options={options} />;
  } else if (chartType.toLowerCase().includes('radar')) {
    return <Radar data={data} options={options} />;
  } else if (chartType.toLowerCase().includes('area')) {
    // Area chart is a Line chart with fill
    const areaData = {
      ...data,
      datasets: data.datasets.map(ds => ({ ...ds, fill: true }))
    };
    return <Line data={areaData} options={options} />;
  } else {
    return <p className="text-red-400">Unsupported chart type: {chartType}</p>;
  }
};

const UploadContent = ({ userEmail, onHistoryUpdate }) => {
  const [excelFile, setExcelFile] = useState(null);
  const [availableKeys, setAvailableKeys] = useState([]);
  const [labelKey, setLabelKey] = useState('');
  const [valueKey, setValueKey] = useState('');
  const [chartType, setChartType] = useState('Bar Chart');
  const [response, setResponse] = useState(null);
  const [status, setStatus] = useState('');

  // Helper to get and set localStorage history per user
  const getHistory = () => {
    if (!userEmail) return [];
    const all = JSON.parse(localStorage.getItem('eap_history') || '{}');
    return all[userEmail] || [];
  };
  const setHistory = (historyArr) => {
    if (!userEmail) return;
    const all = JSON.parse(localStorage.getItem('eap_history') || '{}');
    all[userEmail] = historyArr;
    localStorage.setItem('eap_history', JSON.stringify(all));
    if (onHistoryUpdate) onHistoryUpdate(historyArr);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setExcelFile(file);
    setStatus('');
    setAvailableKeys([]);
    setLabelKey('');
    setValueKey('');
    setResponse(null);

    const formData = new FormData();
    formData.append('excelFile', file);

    try {
      const res = await Upload(formData, { withCredentials: true });
      setAvailableKeys(res.data.availableKeys || []);
    } catch (err) {
      setStatus(err.response?.data?.error || 'Failed to analyze file');
    }
  };

  const handleSubmit = async () => {
    if (!excelFile || !labelKey || !valueKey || !chartType) {
      setStatus('❌ Please fill all fields');
      return;
    }

    const formData = new FormData();
    formData.append('excelFile', excelFile);
    formData.append('labelKey', labelKey);
    formData.append('valueKey', valueKey);
    formData.append('chartType', chartType);

    try {
      const res = await Upload(formData, { withCredentials: true });
      setResponse(res.data);
      setStatus('✅ Chart data generated successfully.');
      // Add to history
      const newEntry = {
        fileName: excelFile.name,
        date: new Date().toISOString().slice(0, 10),
        chartType,
        title: res.data.chartTitle || excelFile.name
      };
      const prev = getHistory();
      const updated = [newEntry, ...prev].slice(0, 10); // keep last 10
      setHistory(updated);
    } catch (err) {
      setStatus(err.response?.data?.error || 'Upload failed');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-green-400">Excel Analytics Dashboard</h1>
      {/* File Upload */}
      <div className="mb-4">
        <label className="block text-sm text-gray-300 mb-1">Upload Excel File</label>
        <input
          type="file"
          accept=".xls,.xlsx"
          name='excelFile'
          onChange={handleFileChange}
          className="text-white bg-gray-800 p-2 rounded w-full"
        />
      </div>
      {/* Dropdowns if keys available */}
      {availableKeys.length > 0 && (
        <>
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-1">X-axis (labelKey)</label>
            <select
              value={labelKey}
              onChange={(e) => setLabelKey(e.target.value)}
              className="bg-gray-800 text-white p-2 rounded w-full"
            >
              <option value="">-- Select Column --</option>
              {availableKeys.map((key) => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-1">Y-axis (valueKey)</label>
            <select
              value={valueKey}
              onChange={(e) => setValueKey(e.target.value)}
              className="bg-gray-800 text-white p-2 rounded w-full"
            >
              <option value="">-- Select Column --</option>
              {availableKeys.map((key) => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-1">Chart Type</label>
            <select
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
              className="bg-gray-800 text-white p-2 rounded w-full"
            >
              <option>Bar Chart</option>
              <option>Line Chart</option>
              <option>Pie Chart</option>
              <option>Area Chart</option>
              <option>Scatter Chart</option>
              <option>Bubble Chart</option>
            </select>
          </div>
          <button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
          >
            Analyze & Generate Chart
          </button>
        </>
      )}
      {status && <p className="mt-4 text-yellow-400">{status}</p>}
      {/* Chart Response Preview */}
      {response && (
        <div className="mt-8 p-4 bg-gray-900 rounded">
          <h2 className="text-xl font-semibold mb-4 text-white">Chart Preview</h2>
          <ChartDisplay
            chartType={response.chartType}
            labels={response.labels}
            values={response.values}
            title={response.chartTitle}
          />
        </div>
      )}
    </div>
  );
};



// Main Dashboard component (now serving as the Dashboard Page)
export default function Dashboard() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(() => {
    return localStorage.getItem('eap_user_email') || '';
  });
  const [userHistory, setUserHistory] = useState(() => {
    if (!userEmail) return [];
    const all = JSON.parse(localStorage.getItem('eap_history') || '{}');
    return all[userEmail] || [];
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeContent, setActiveContent] = useState('dashboard');
  // For viewing a chart from recent charts
  const [viewedChart, setViewedChart] = useState(null);

  React.useEffect(() => {
    if (!userEmail) {
      const email = window.prompt('Enter your email to view your dashboard:');
      if (email) {
        setUserEmail(email);
        localStorage.setItem('eap_user_email', email);
        const all = JSON.parse(localStorage.getItem('eap_history') || '{}');
        setUserHistory(all[email] || []);
      }
    }
  }, [userEmail]);

  React.useEffect(() => {
    if (userEmail) {
      const all = JSON.parse(localStorage.getItem('eap_history') || '{}');
      setUserHistory(all[userEmail] || []);
    }
  }, [userEmail]);

  const handleLogout = async () => {
    try {
      await logoutAPI();
      alert("You have been logged out successfully.");
      localStorage.removeItem('eap_user_email');
      setUserEmail('');
      setUserHistory([]);
      navigate('/home');
    } catch (error) {
      alert('Logout failed. Please try again.');
    }
  };

  const handleHistoryUpdate = (newHistory) => {
    setUserHistory(newHistory);
  };


  // Handler for viewing a chart from recent charts
  const handleViewChart = (chart) => {
    setViewedChart(chart);
    setActiveContent('dashboard'); // Show in dashboard section
  };

  // Handler for deleting a chart from history
  const handleDeleteChart = (chart) => {
    const filtered = userHistory.filter(
      (item) =>
        !(item.fileName === chart.fileName && item.date === chart.date && item.chartType === chart.chartType)
    );
    setUserHistory(filtered);
    // Update localStorage
    const all = JSON.parse(localStorage.getItem('eap_history') || '{}');
    all[userEmail] = filtered;
    localStorage.setItem('eap_history', JSON.stringify(all));
    // If the deleted chart is currently viewed, clear it
    if (
      viewedChart &&
      viewedChart.fileName === chart.fileName &&
      viewedChart.date === chart.date &&
      viewedChart.chartType === chart.chartType
    ) {
      setViewedChart(null);
    }
  };

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
                <p className="text-3xl font-bold">{userHistory.length}</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-blue-400 mb-2">Analyzed Reports</h2>
                <p className="text-3xl font-bold">{userHistory.length}</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-yellow-400 mb-2">Pending Analysis</h2>
                <p className="text-3xl font-bold">0</p>
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
                      <th className="py-3 px-4 text-gray-400">Chart Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userHistory.map((upload, idx) => (
                      <tr key={idx} className="border-b border-gray-800 last:border-b-0">
                        <td className="py-3 px-4">{upload.fileName}</td>
                        <td className="py-3 px-4 text-gray-400">{upload.date}</td>
                        <td className="py-3 px-4 text-gray-400">{upload.chartType}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Chart Preview Section if a chart is selected */}
            {viewedChart && (
              <div className="bg-gray-900 p-6 rounded-lg shadow-md mb-10">
                <h2 className="text-xl font-semibold text-white mb-4">Chart Preview</h2>
                <p className="text-gray-400 mb-2">Chart Type: <b>{viewedChart.chartType}</b></p>
                {/* ChartDisplay expects chartType, labels, values, title. We'll use dummy data for preview. */}
                <ChartDisplay
                  chartType={viewedChart.chartType}
                  labels={viewedChart.labels || []}
                  values={viewedChart.values || []}
                  title={viewedChart.title || viewedChart.fileName}
                />
              </div>
            )}
          </>
        );
      case 'upload':
        return <UploadContent userEmail={userEmail} onHistoryUpdate={handleHistoryUpdate} />;
      case 'history':
        return <HistoryContent userEmail={userEmail} history={userHistory} />;
      case 'recent-charts':
        return <RecentChartsContent history={userHistory} onViewChart={handleViewChart} onDeleteChart={handleDeleteChart} />;
      case 'profile':
        return (
            //  <!-- Admin Profile Card -->
            
      <div class="max-w-md mx-auto mb-8 bg-white rounded-lg shadow flex items-center p-6 space-x-6">
        <div class="w-20 h-20 rounded-full bg-green-600 flex items-center justify-center overflow-hidden">
          {/* <img src="https://res.cloudinary.com/dqz2hem3m/image/upload/v1750665330/logo_ep4az4.png" alt="Admin Profile" class="w-full h-full object-cover"></img> */}
          <p style={{fontSize:"32px"}}><b>{userEmail && userEmail.split('@')[0][0].toUpperCase()}</b></p>        </div>
        <div>
    <p class="text-gray-600 text-sm mb-1">Name:{userEmail.split('@')[0]}
            </p>
          <p class="text-gray-600 text-sm mb-1">Email:{userEmail}</p>
          <p class="text-gray-600 text-sm">Role: <span class="font-medium">user</span></p>
        </div>
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