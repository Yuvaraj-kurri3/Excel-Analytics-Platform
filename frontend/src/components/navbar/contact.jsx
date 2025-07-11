import React, { useState } from 'react';
import { Mail,} from 'lucide-react'; // Using lucide-react for icons

// Main App component for the Contact Us page
const App = () => {
  // State for contact form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // State for form submission message
  const [submitMessage, setSubmitMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Handle input changes for the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setSubmitMessage('Please fill in all fields.');
      setIsSuccess(false);
      return;
    }

    // Simulate form submission (e.g., sending data to an API)
    console.log('Form Data Submitted:', formData);

    // Display success message
    setSubmitMessage('Message sent successfully! We will get back to you soon.');
    setIsSuccess(true);

    // Clear form fields after submission
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });

    // Clear message after a few seconds
    setTimeout(() => {
      setSubmitMessage('');
    }, 5000);
  };

  // Team members data
   
  return (
    <div className="min-h-screen bg-gray-50 font-inter text-gray-800 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Tailwind CSS CDN script for styling */}
      <script src="https://cdn.tailwindcss.com"></script>
      {/* Google Fonts for 'Inter' */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      {/* Header Section */}
      <header className="text-center mb-12 w-full max-w-4xl">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-blue-700 mb-4 animate-fade-in">
          Contact Us
        </h1>
        <p className="text-lg sm:text-xl text-gray-600">
          We'd love to hear from you! Reach out to the Excel Analytics Platform team.
        </p>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-6xl space-y-16">

        {/* Contact Form Section */}
        <section className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 animate-fade-in-up">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out focus:outline-none"
                required
              />
            </div>
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out focus:outline-none"
                required
              />
            </div>
            {/* Subject Input */}
            <div className="sm:col-span-2">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out focus:outline-none"
                required
              />
            </div>
            {/* Message Textarea */}
            <div className="sm:col-span-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out focus:outline-none"
                required
              ></textarea>
            </div>
            {/* Submit Button */}
            <div className="sm:col-span-2 text-center">
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Submit Message
              </button>
            </div>
            {/* Submission Message */}
            {submitMessage && (
              <div className={`sm:col-span-2 text-center mt-4 p-3 rounded-lg ${isSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {submitMessage}
              </div>
            )}
          </form>
        </section>

        {/* Team Section */}
      

        {/* Project Email & Internship Info Section */}
        <section className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 text-center animate-fade-in-up delay-400">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Project Information</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p className="flex items-center justify-center gap-2">
              <Mail size={24} className="text-blue-600" />
              Shared Project Email: <a href="mailto:excelanalytics2025@gmail.com" className="text-blue-600 hover:underline">excelanalytics2025@gmail.com</a>
            </p>
            <p>
              Internship done under <span className="font-semibold text-gray-900">Zidio Development</span>
            </p>
            <p>
              Duration: <span className="font-semibold text-gray-900">June 2025 – September 2025</span>
            </p>
          </div>
        </section>
      </main>

      {/* Custom CSS for animations (optional, can be done with Tailwind JIT if configured) */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animate-fade-in-up.delay-200 {
          animation-delay: 0.2s;
        }
        .animate-fade-in-up.delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
};

export default App;
