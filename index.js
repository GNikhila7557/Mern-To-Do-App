/*To-Do App Application */
const express = require('express');
const port = 3000;
const app = express();
app.use(express.json());
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskroutes');
import dotenv from 'dotenv';
dotenv.config();

MONGO_URI = process.env.MONGO_URI;

mongoose
    .connect('', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Could not connect to MongoDB', err));

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({message: 'Something went wrong!'});
};

//routes
app.use('/tasks', taskRoutes);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
