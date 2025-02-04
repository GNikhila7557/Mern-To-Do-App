const Task = require('../models/task');

const getAllTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        next(error);
    }
};

const createTask = async (req, res, next) => {
    const {name, description, status} = req.body;
    try {
        if(!name || !description || !status){
            return res.status(400).json({message: 'All fields are required!'});
        }
        if(status !== 'Pending' && status !== 'Done'){
            return res.status(400).json({message: 'Invalid status!'});
        }
        const task = new Task({name, description, status});
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        next(error);
    }
};

const updateTask = async (req, res, next) => {
    try{
        const {id} = req.params;
        const {status} = req.body;
        if(status !== 'Pending' && status !== 'Done'){
            return res.status(400).json({message: 'Status can be either Pending or Done!'});
        }
        const task = await Task.findByIdAndUpdate(
            id,
            {status}, 
            {new: true, runValidators: true}
        );
        if(!task){
            return res.status(404).json({message: 'Task not found!'});
        }
        res.json(task);
    } catch (error) {
        next(error);
    }
};

const deleteTask = async (req, res, next) => {
    try{
        const {id} = req.params;
        const task = await Task.findByIdAndDelete(id);
        if(!task){
            return res.status(404).json({message: 'Task not found!'});
        }
        res.json({message: 'Task deleted successfully!'});
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask
};