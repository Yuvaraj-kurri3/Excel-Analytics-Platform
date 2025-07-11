const express = require('express');
const router = express.Router();
const { signup, login } = require('../Controllers/authController');
const { forgotPassword } = require('../Controllers/authController');
const { verifyOtp } = require('../Controllers/authController');
const { resetPassword } = require('../Controllers/authController'); // Uncomment if you have a reset password controller
const { logout } = require('../Controllers/authController'); // Uncomment if you have a logout controller
const { isLoggedIn } = require('../Controllers/authController');
// const {testSession} = require('../Controllers/authController'); // Uncomment if you have a test session controller

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgot', forgotPassword);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword); // Uncomment if you have a reset password controller
router.post('/logout', logout); // Uncomment if you have a logout controller
// router.get('/api/test-session',testSession)

// Add login check route
router.get('/check-login', isLoggedIn, (req, res) => {
  res.status(200).json({ isLoggedIn: true });
});

router.get("/test-session", (req, res) => {
  console.log("🧪 TEST SESSION:", req.session);
  res.json(req.session);
});

module.exports = router;
