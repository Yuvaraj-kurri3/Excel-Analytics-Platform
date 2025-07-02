const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Controllers= require('./backend/Controllers/SignupController');
const cors = require("cors");

const app = express();

app.use(cors());
dotenv.config();

const port = 5000;

// Middleware to parse JSON bodies
app.use(express.json());
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('✅ Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});
// Signin route
app.post("/signup", Controllers.signupController);
// login route
app.post("/login", Controllers.loginController);
 app.get('/', (req, res) => {
    res.send('Welcome to the Excel Analytics Platform!');
});

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})