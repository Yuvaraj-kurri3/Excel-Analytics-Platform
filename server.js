const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./backend/routes/auth'); // ✅ Corrected path
const session = require('express-session');
const mongooseSession = require('connect-mongodb-session')(session);
const path = require('path');

dotenv.config();
const app = express();
  const sessions_store= new  mongooseSession({
      uri: process.env.MONGODB_URI, // MongoDB connection string
      collection: "MySession" // Collection to store sessions
    });

app.use(session({
  secret: 'Excel_secret_key', // change this to a strong secret
  resave: false,
  saveUninitialized: false,
  store: sessions_store, // Use MongoDB session store
  cookie: {
    secure: false, // set true only in production with HTTPS
    maxAge: 1000 * 60 * 60 // 1 hour
  }
}));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "frontend/build")));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

app.use('/api/auth', authRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
});

 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
