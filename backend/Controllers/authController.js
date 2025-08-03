const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const session = require('express-session');
 const XLSX = require('xlsx');
const fs = require('fs');
const multer = require('multer');
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
  
 res.cookie('IsLogined', true, {
      maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
      httpOnly: true,        // prevent JS access on frontend
      sameSite: 'lax',
      secure: false          // set to true if using https
    });
  res.status(201).json({ message: 'Login successfull' });
  } catch (err) {
    console.log('From 55 login controller'+err);
    res.status(500).json({ error: 'Server error' });
  }
};
// filepath: backend/Controllers/authController.js
 
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
   try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Enter Correct Mail' });

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // ✅ Store OTP in cookie (expires in 5 minutes)
    res.cookie('otp', otp, {
      maxAge: 5 * 60 * 1000, // 5 minutes
      httpOnly: true,        // prevent JS access on frontend
      sameSite: 'lax',
      secure: false          // set to true if using https
    });

        // ✅ (optional) store email too
    res.cookie('otp_email', email, {
      maxAge: 5 * 60 * 1000,
      httpOnly: true,
      sameSite: 'lax',
      secure: false
    });
   

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
   const { otp } = req.body;
  const storedOtp = req.cookies.otp;
  const email = req.cookies.otp_email;

  if (!storedOtp || !email) {
    return res.status(400).json({ message: 'OTP expired or not set' });
  }

  if (storedOtp === otp) {
    return res.status(200).json({ message: 'Valid OTP' });
  } else {
    return res.status(400).json({ message: 'Invalid OTP' });
  }
};

// resert password controller
exports.resetPassword = async (req, res) => {
  const { newpassword } = req.body;
  const email = req.cookies.otp_email;

  if (!email) {
    return res.status(400).json({ error: 'OTP verification expired or not complete' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const hashedPassword = await bcrypt.hash(newpassword, 10);
    user.password = hashedPassword;

    await user.save();

    // Clear cookies after reset
    res.clearCookie('otp');
    res.clearCookie('otp_email');

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
  const token = req.cookies.token;
  const IsLogined = req.cookies.IsLogined;
  console.log("🔐 IsLogined:", IsLogined);
  console.log("🔐 Token:", token);
  // console.log("🔐 IsLogined:", IsLogined)
  // console.log("🔐 Token:", token);

  if (!IsLogined || !token) {
    return res.status(401).json({ isLoggedIn: false, error: 'Invalid Credidentals' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ isLoggedIn: false, error: 'Invalid token' });

    return res.status(200).json({
      isLoggedIn: true,
      decodedToken: decoded
    });
  });
};

// exports.testsession=(req, res) => {
//   res.json(req.session);
// }
 


// ✅ Upload Route



exports.uploadExcel = (req, res) => {
  try {
    const file = req.file;
    const { labelKey, valueKey, chartType } = req.body;

    if (!file) {
      return res.status(400).json({ error: 'Excel file not provided' });
    }

    const workbook = XLSX.readFile(file.path);
    const sheetName = workbook.SheetNames[0];
    const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // If just uploaded file (only excelFile present), return column names
    if (!labelKey && !valueKey && !chartType) {
      const keys = Object.keys(jsonData[0] || {});
      fs.unlinkSync(file.path); // Optional: delete after use
      return res.status(200).json({ availableKeys: keys });
    }

    // Full analysis request
    if (!labelKey || !valueKey || !chartType) {
      return res.status(400).json({ error: 'All fields (labelKey, valueKey, chartType) are required' });
    }

    if (!(labelKey in jsonData[0]) || !(valueKey in jsonData[0])) {
      return res.status(400).json({ error: 'Invalid column names' });
    }

    const labels = jsonData.map(row => row[labelKey]);
    const values = jsonData.map(row => Number(row[valueKey]) || 0);

    fs.unlinkSync(file.path); // Clean up uploaded file
    return res.status(200).json({
      chartTitle: `${valueKey} vs ${labelKey}`,
      labels,
      values,
      chartType,
      summary: `This ${chartType} shows the relationship between ${valueKey} and ${labelKey}.`
    });

  //   await ChartHistory.create({
  // user: req.user._id,              // from JWT/session middleware
  // fileName: req.file.originalname,
  // xAxis: labelKey,
  // yAxis: valueKey,
  // chartType,
  // labels,
  // values,
  // chartTitle: `${valueKey} vs ${labelKey}`,
  // summary: `This ${chartType} shows the relationship between ${valueKey} and ${labelKey}.`
// });
  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({ error: 'Server error while processing Excel file' });
  }
};

exports.getChartHistory = async (req, res) => {
  try {
    const charts = await ChartHistory.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(charts);
  } catch (err) {
    res.status(500).json({ error: 'Unable to retrieve chart history' });
  }
};
