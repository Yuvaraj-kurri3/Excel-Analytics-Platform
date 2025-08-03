const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const { signup, login } = require('../Controllers/authController');
const { forgotPassword } = require('../Controllers/authController');
const { verifyOtp } = require('../Controllers/authController');
const { resetPassword } = require('../Controllers/authController'); // Uncomment if you have a reset password controller
const { logout } = require('../Controllers/authController'); // Uncomment if you have a logout controller
const { isLoggedIn } = require('../Controllers/authController');
const { uploadExcel } = require('../Controllers/authController'); // Uncomment if you have an upload controller
// const {testSession} = require('../Controllers/authController'); // Uncomment if you have a test session controller

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgot', forgotPassword);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword); // Uncomment if you have a reset password controller
router.post('/logout', logout); // Uncomment if you have a logout controller
router.get('/check-login', isLoggedIn); // Check if user is logged in

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
  }),
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.xls' && ext !== '.xlsx') {
      return cb(new Error('Only .xls and .xlsx files allowed'));
    }
    cb(null, true);
  }
});
router.post('/upload', upload.single('excelFile'), uploadExcel);

 

module.exports = router;
