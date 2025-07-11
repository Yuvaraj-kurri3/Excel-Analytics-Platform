import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import About from './components/navbar/about';
import Services from './components/navbar/services';
import Contact from './components/navbar/contact';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Forgot from './components/Forgotpassword'; // Uncomment if you want to use Forgot password component
import OtpVerification from './components/verification';
import Resetpassword from './components/Resetpassword';  

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/forgot" element={<Forgot  />} />
      <Route path="/OtpVerification" element={<OtpVerification />} />
      <Route path="/Resetpassword" element={<Resetpassword />} />

    </Routes>
  );
}

export default App;