import React, { useEffect } from 'react';

// Placeholder profile images (using placehold.co for demonstration)
const PROFILE_IMAGES = [
  "https://placehold.co/150x150/22c55e/ffffff?text=Member+1", // Green
  "https://placehold.co/150x150/3b82f6/ffffff?text=Member+2", // Blue
  "https://placehold.co/150x150/ef4444/ffffff?text=Member+3", // Red
  "https://placehold.co/150x150/f97316/ffffff?text=Member+4", // Orange
  "https://placehold.co/150x150/a855f7/ffffff?text=Member+5", // Purple
  "https://res.cloudinary.com/dqz2hem3m/image/upload/v1750665381/yuva2_iyhcer.png"  // Pink
];

// Team Members Data
const teamMembers = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Lead Frontend Developer",
    image: PROFILE_IMAGES[0],
    social: {
      github: "https://github.com/alicej",
      linkedin: "https://linkedin.com/in/alicej",
      other: "https://alicej.portfolio.com"
    }
  },
  {
    id: 2,
    name: "Bob Williams",
    role: "Backend Architect",
    image: PROFILE_IMAGES[1],
    social: {
      github: "https://github.com/bobw",
      linkedin: "https://linkedin.com/in/bobw",
      other: "https://bobw.dev"
    }
  },
  {
    id: 3,
    name: "Charlie Brown",
    role: "UI/UX Designer",
    image: PROFILE_IMAGES[2],
    social: {
      github: "https://github.com/charlieb",
      linkedin: "https://linkedin.com/in/charlieb",
      other: "https://dribbble.com/charlieb"
    }
  },
  {
    id: 4,
    name: "Diana Miller",
    role: "Data Scientist",
    image: PROFILE_IMAGES[3],
    social: {
      github: "https://github.com/dianam",
      linkedin: "https://linkedin.com/in/dianam",
      other: "https://medium.com/@dianam"
    }
  },
  {
    id: 5,
    name: "Eve Davis",
    role: "DevOps Engineer",
    image: PROFILE_IMAGES[4],
    social: {
      github: "https://github.com/eved",
      linkedin: "https://linkedin.com/in/eved",
      other: "https://eved.tech"
    }
  },
  {
    id: 6,
    name: "Yuvaraj Kurri",
    role: "Backend Developer",
    image: PROFILE_IMAGES[5],
    social: {
      github: "https://github.com/Yuvaraj-kurri3",
      linkedin: "https://linkedin.com/in/yuvarajkurri",
      other: "https://www.instagram.com/undobharatofficial/"
    }
  }
];

// TeamMemberCard Component
const TeamMemberCard = ({ member, index }) => {
  return (
    <div
      className="bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center
                 transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl
                 opacity-0 animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }} // Staggered animation
    >
      <title>About - EAP</title>
      <img
        src={member.image}
        alt={member.name}
        className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-green-500 shadow-md"
        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/150x150/6b7280/ffffff?text=No+Image"; }} // Fallback
      />
      <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
      <p className="text-green-400 text-md mb-4">{member.role}</p>
      <div className="flex space-x-4">
        {member.social.github && (
          <a
            href={member.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition duration-200"
            title="GitHub"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.499.09.679-.217.679-.481 0-.237-.008-.865-.013-1.702-2.782.602-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.618.069-.606.069-.606 1.003.07 1.531 1.032 1.531 1.032.892 1.529 2.341 1.087 2.91.829.091-.645.356-1.087.654-1.336-2.22-.253-4.555-1.113-4.555-4.93 0-1.091.39-1.984 1.029-2.682-.103-.253-.446-1.272.098-2.65 0 0 .84-.268 2.75 1.022A9.606 9.606 0 0112 6.865c.85.004 1.705.115 2.504.337 1.909-1.29 2.747-1.022 2.747-1.022.546 1.379.202 2.398.099 2.65.64.698 1.028 1.591 1.028 2.682 0 3.822-2.339 4.675-4.562 4.922.357.307.676.915.676 1.855 0 1.336-.012 2.413-.012 2.748 0 .268.18.58.685.483C21.133 20.197 24 16.421 24 12.017 24 6.484 19.522 2 14 2h-2z" clipRule="evenodd" />
            </svg>
          </a>
        )}
        {member.social.linkedin && (
          <a
            href={member.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition duration-200"
            title="LinkedIn"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38-1.11-2.5-2.48-2.5S0 2.12 0 3.5c0 1.381-1.11 2.5-2.48 2.5S-4.96 4.881-4.96 3.5zm.04 7.5h-4.96V24h4.96zM12 10h-4v14h4v-8.4c0-2.84 2.06-3.23 2.86-1.74V24h4V10z" />
            </svg>
          </a>
        )}
        {member.social.other && (
          <a
            href={member.social.other}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition duration-200"
            title="Other Link"
          >
            {/* Simple link icon or custom icon for 'Other' */}
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
            </svg>
          </a>
        )}
      </div>
    </div>
  );
};

// Main App component for the About Us Page
export default function About() {
  return (
    <div className="min-h-screen bg-black text-white font-inter p-4 relative overflow-hidden">
      {/* Subtle Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-75"></div>

      {/* Header */}
      <header className="relative z-10 p-4 md:p-6 flex flex-col md:flex-row items-center justify-between bg-gray-900 shadow-lg rounded-xl mb-6">
        <div className="text-3xl font-extrabold text-white mb-4 md:mb-0">
          Excel <span className="text-green-400">Analytics Platform</span>
        </div>
        <nav>
          <ul className="flex space-x-4 md:space-x-8">
            <li>
              <a href="/dashboard" className="text-white hover:text-green-300 transition duration-200">Dashboard</a>
            </li>
            <li>
              <a href="/" className="text-white hover:text-green-300 transition duration-200">Home</a>
            </li>
            <li>
              <a href="/" className="text-white hover:text-green-300 transition duration-200">Reports</a>
            </li>
            <li>
              <a href="/logout" className="text-white hover:text-red-400 transition duration-200">Logout</a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto py-8 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
          Meet Our Team
        </h1>

        {/* Intro Paragraph */}
        <p className="text-lg md:text-xl text-gray-300 text-center max-w-3xl mx-auto mb-12 leading-relaxed">
          We are a passionate team of 6 developers working together to build innovative solutions with a shared love for clean code and impactful design.
        </p>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={member.id} member={member} index={index} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-gray-500 mt-10">
        <p>&copy; 2025 Excel Analytics Platform. All rights reserved.</p>
      </footer>

      {/* Custom CSS for Animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
