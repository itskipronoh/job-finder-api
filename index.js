const express = require('express')
const mongoose = require('mongoose')
const Job = require('./models/JobModel')
const app = express()

app.use(express.json())


//routes

app.get('/', (req, res) => {
    res.send('Hello this is my jobfinder API')
})

app.get('/blog', (req, res) => {
    res.send('Hello Blog, My name Kipronoh')
})

app.get('/Jobs', async(req, res) => {
    try {
        const Jobs = await Job.find({});
        res.status(200).json(Jobs);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/Jobs/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const Job = await Job.findById(id);
        res.status(200).json(Job);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


app.post('/Jobs', async(req, res) => {
    try {
        const Job = await Job.create(req.body)
        res.status(200).json(Job);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// update a job
app.put('/Jobs/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const Job = await Job.findByIdAndUpdate(id, req.body);
        // cannot find any job in database
        if(!Job){
            return res.status(404).json({message: `cannot find any Job with ID ${id}`})
        }
        const updatedJob = await Job.findById(id);
        res.status(200).json(updatedJob);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// delete a job

app.delete('/Jobs/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const Job = await Job.findByIdAndDelete(id);
        if(!Job){
            return res.status(404).json({message: `cannot find any Job with ID ${id}`})
        }
        res.status(200).json(Job);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

mongoose.set("strictQuery", false)
mongoose.
connect('mongodb+srv://user:admin@cluster0.iz8twkd.mongodb.net/job-finder-api?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log('connected to MongoDB')
    app.listen(3000, ()=> {
        console.log(`Job Finder API app is running on port 3000`)
    });
}).catch((error) => {
    console.log(error)
})