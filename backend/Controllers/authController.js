const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const session = require('express-session');
const mongooseSession = require('connect-mongodb-session')(session);
//import session from 'express-session';

const app = express();
dotenv.config();  


 
exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username: username, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: 'Signup successful!' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
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

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '2d' }
    );
    res.cookie('token', token, { httpOnly: true, maxAge: 2 * 24 * 60 * 60 * 1000 });
    req.session.user = {
      email: user.email,
      isAuthenticated: true
    };
    res.json({ message: 'Login successful' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error' });
  }
};
// filepath: backend/Controllers/authController.js
 
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(200).json({ message: 'Enter Correct Mail' });

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