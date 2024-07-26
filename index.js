const express = require('express')
const mongoose = require('mongoose')
const Job = require('./models/JobModel');
const User = require('./models/UserModel');
const app = express()
const connectDB = require("./config/connect");
require('dotenv').config();
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');
app.use(express.json())


//routes
// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.create({ username, email, password });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Login a user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
            res.json({ token });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/', (req, res) => {
    res.send('Hello this is my jobfinder API')
})

app.get('/blog', (req, res) => {
    res.send('Hello Blog, My name Kipronoh')
})

app.get('/Jobs', async(req, res) => {
    try {
        const jobs = await Job.find({});
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.get('/Jobs/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const job = await Job.findById(id);
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.post('/Jobs', async(req, res) => {
    try {
        const job = await Job.create(req.body);
        res.status(200).json(job);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

app.put('/Jobs/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const job = await Job.findByIdAndUpdate(id, req.body, { new: true });
        if (!job) {
            return res.status(404).json({message: `Cannot find any Job with ID ${id}`});
        }
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.delete('/Jobs/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const job = await Job.findByIdAndDelete(id);
        if (!job) {
            return res.status(404).json({message: `Cannot find any Job with ID ${id}`});
        }
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

mongoose.set('strictQuery', false);
mongoose
    .connect (process.env.MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB');
        app.listen(3000, () => {
            console.log('Job Finder API app is running on port 3000');
        });
    })
    .catch((error) => {
        console.log(error);
    });