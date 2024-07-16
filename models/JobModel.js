const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a your name  name"]
    },
    position: {
        type: String,
        required: [true, "Please enter a position name"]
    },
    description: {
        type: String,
        required: true,
    },
    
    email: {
        type: String,
        required: true,
    }
},
{
    timestamps: true
}
)


const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
