const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const routes = require('./backend/routes/auth');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("✅MongoDB connected"))
.catch(err => console.error("MongoDB error:", err));

// Routes
app.use('/api/auth', routes);

app.get('/', (req, res) => {
  res.send('Welcome to the Authentication API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
