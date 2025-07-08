const express = require('express');
const router = express.Router();
const { signup, login } = require('../Controllers/authController');
const { forgotPassword } = require('../Controllers/authController');
const { verifyOtp } = require('../Controllers/authController');
const { resetPassword } = require('../Controllers/authController'); // Uncomment if you have a reset password controller

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgot', forgotPassword);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword); // Uncomment if you have a reset password controller

module.exports = router;
