import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Signup from './Signup';

function App() {
  const [page, setPage] = useState('login');
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleSignup = (userData) => {
    setUser(userData);
  };

  if (user) {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome, {user.email}!</h2>
          <button onClick={() => { setUser(null); setPage('login'); }}>Logout</button>
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        {page === 'login' ? (
          <>
            <Login onLogin={handleLogin} />
            <p>Don't have an account? <button onClick={() => setPage('signup')}>Sign Up</button></p>
          </>
        ) : (
          <>
            <Signup onSignup={handleSignup} />
            <p>Already have an account? <button onClick={() => setPage('login')}>Login</button></p>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
