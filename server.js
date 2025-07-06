const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const routes = require('./backend/routes/auth');
const path = require('path');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "frontend/build")));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("✅MongoDB connected"))
.catch(err => console.error("MongoDB error:", err));

// Routes
app.use('/api/auth', routes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
