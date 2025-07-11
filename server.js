const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./backend/routes/auth'); // ✅ Corrected path
const session = require('express-session');
const mongooseSession = require('connect-mongodb-session')(session);
const path = require('path');
const cookieParser = require('cookie-parser');

 
dotenv.config();
const app = express();
app.use(cookieParser());
app.use(express.json());

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000', // your frontend origin
  credentials: true
}));
const sessions_store = new mongooseSession({
  uri: process.env.MONGODB_URI, // MongoDB connection string
  collection: 'MySession', // Collection to store sessions
});

app.use(session({
  secret: process.env.SESSION_SECRET || 'yourSecretKey',
  resave: false,
  saveUninitialized: false,
   store: sessions_store, // <== this line was missing
  cookie: {
    maxAge: 60 * 60 * 1000, // 1 hour
    httpOnly: true
  }
}));

app.use(express.static(path.join(__dirname, 'frontend/build')));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('MongoDB error:', err));

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
