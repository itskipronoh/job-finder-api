const mongoose = require('mongoose')

const JobSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter a your name  name"]
        },
        quantity: {
            type: Number,
            required: true,
            default: 0
        },
        // location: {
        //     type: string,
        //     required: true,
        // },
        email: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
)


const Job = mongoose.model('Job', JobSchema);

module.exports = Job;