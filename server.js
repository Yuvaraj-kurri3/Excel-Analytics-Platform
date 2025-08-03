const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const multer= require('multer');
const authRoutes = require('./backend/routes/auth'); // ✅ Corrected path
const session = require('express-session');
// const mongooseSession = require('connect-mongodb-session')(session);
const MongoStore = require('connect-mongo');
const path = require('path');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const app = express();

 
dotenv.config();
app.use(cors({
  origin: 'https://excel-analytics-platform-d8c0.onrender.com', // your frontend origin
  // origin: 'http://localhost:3000', // your frontend origin
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
 
 
app.use(session({
  secret: process.env.SESSION_SECRET || 'yourSecretKey',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    collectionName: 'MySessions',
      mongoOptions: {
      ssl: true,
      tls: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  }),
  cookie: {
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'none',
    secure: true
  }
}));
// ✅ Ensure uploads folder exists
const uploadPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}


// ✅ Define storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});


// ✅ File type filter (only allow .xls and .xlsx)
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext !== '.xls' && ext !== '.xlsx') {
    return cb(new Error('Only .xls and .xlsx files are allowed'));
  }
  cb(null, true);
};
 
const upload = multer({ storage, fileFilter });


app.use(express.static(path.join(__dirname, 'frontend/build')));

mongoose.connect(process.env.MONGODB_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('MongoDB error:', err));

 

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
