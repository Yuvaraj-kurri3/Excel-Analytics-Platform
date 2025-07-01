const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('✅ Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});
// login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Here you would typically check the credentials against a database
    if (username === 'admin' && password === 'password') {
        res.status(200).send({ message: 'Login successful!' });
    } else {
        res.status(401).send({ message: 'Invalid credentials' });
    }
});

app.get('/', (req, res) => {
    res.send('Welcome to the Excel Analytics Platform!');
});

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})