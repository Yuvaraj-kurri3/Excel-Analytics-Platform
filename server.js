const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./backend/routes/auth'); // ✅ Corrected path
const session = require('express-session');
// const mongooseSession = require('connect-mongodb-session')(session);
const MongoStore = require('connect-mongo');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();

 
dotenv.config();
app.use(cors({
  origin: 'https://excel-analytics-platform-d8c0.onrender.com', // your frontend origin
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
