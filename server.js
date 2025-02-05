/*To-Do App Application */
const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskroutes');
const dotenv = require('dotenv');
dotenv.config();

const MONGO_URI = process.env.MONGO_URL;

mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Could not connect to MongoDB', err));

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({message: 'Something went wrong!'});
};

app.get('/', (req, res) => {
    res.send('Welcome to the To-Do App!');  // Or send any content
});

// Health check route
app.get('/health', (req, res) => {
    res.status(200).send('Everything is working fine!'); 
  });  

//routes
app.use('/tasks', taskRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${port}`);
});
