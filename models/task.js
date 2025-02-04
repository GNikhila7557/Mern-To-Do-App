const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Task Name is required!'],
        trim: true
    },
    description:{
        type: String,
        required: [true, 'Task Description is required!'],
        trim: true
    },
    status:{
        type: String,
        enum: ['Pending', 'Done'],
        default: 'Pending',
        required: true
    }
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;