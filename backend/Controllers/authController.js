const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const session = require('express-session');
const mongooseSession = require('connect-mongodb-session')(session);
//import session from 'express-session';

 dotenv.config();  


 
exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username: username, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: 'Signup successful!' });
  } catch (err) {
    res.status(500).json({ error: 'Server error from route' });
  }
  // if(!username || !email || !password) {
  //   return res.status(400).json({ error: 'All fields are required' });
  // }
  // res.status(200).json({ message: 'Signup successful' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, username: user.email }, process.env.JWT_SECRET,{ expiresIn: '2d' });
  // storing JWT token in cookie

  res.cookie('token', token, {
  httpOnly: true,
  maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
  sameSite: 'lax',
  secure: false // set true in production
});
  
    req.session.user = {
  id: user._id,
  email: user.email,
  isAuthenticated: true,
 
};
console.log("🔐 Session after login:", req.session);
  res.status(201).json({ message: 'Login successfull' });
  } catch (err) {
    console.log('From 55 login controller'+err);
    res.status(500).json({ error: 'Server error' });
  }
};
// filepath: backend/Controllers/authController.js
 
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log("Forgot Password Request:", req.body);
  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Enter Correct Mail' });

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP to user (optional, for later verification)
      req.session.user = {
      email: user.email,
      otp: otp,
    };
   

    // Send OTP via email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // your email
        pass: process.env.EMAIL_PASS  // your email password or app password
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code for Excel Analytics Platform',
      text: `Your OTP code is: ${otp}`
    });

    res.status(200).json({ message: 'OTP sent to your email.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.verifyOtp = async (req, res) => {
  const {  otp } = req.body;
  console.log("OTP Verification Request:", req.body);
  try {
    // Check if OTP exists for the user
    if (req.session.user &&req.session.user.otp === otp) {
      return res.status(200).json({ message: 'Valid OTP' });
    }

    // Invalid OTP handling
    res.status(400).json({ message: 'Invalid OTP' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// resert password controller
exports.resetPassword = async (req, res) => {
  const { newpassword } = req.body;
  try {
    // Check if user exists
    if (!req.session.user) {
      return res.status(400).json({ error: 'User not authenticated' });
    }

    const user = await User.findOne({ email: req.session.user.email });
    if (!user) return res.status(400).json({ error: 'User not found' });

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newpassword, 10);
    user.password = hashedPassword;

    await user.save();
    req.session.destroy(); // Clear session after password reset
    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}

// logout controller
exports.logout = async (req, res) => {
  res.clearCookie('token');
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to log out' });
      }
       res.status(200).json({ message: 'Logout successful' });
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}

// Middleware to verify JWT token from cookies
exports.verifyToken = (req, res, next) => {
  const token = req.session.user.TOKEN ;
  if (!token) {
    return res.status(401).json({ isLoggedIn: false, error: 'No token provided' });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ isLoggedIn: false, error: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
};

// check user login or not using JWT token
exports.isLoggedIn = (req, res) => {
  const sessionUser = req.session.user;
  const token = req.cookies.token;

  if (!sessionUser || !token) {
    return res.status(401).json({ isLoggedIn: false, error: 'Invalid Credidentals' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ isLoggedIn: false, error: 'Invalid token' });

    return res.status(200).json({
      isLoggedIn: true,
      sessionUser,
      decodedToken: decoded
    });
  });
};

// exports.testsession=(req, res) => {
//   res.json(req.session);
// }
 