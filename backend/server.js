const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5002;
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/dashboardDB';

app.use(helmet()); // Use helmet for security
app.use(cors());
app.use(express.json());

mongoose.connect(mongoUri).then(() => {
    console.log('MongoDB database connection established successfully');
}).catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process with failure
});

app.get('/', (req, res) => {
    res.send('Welcome to the data visualization dashboard!');
});

const dataRoutes = require('./routes/dataRoutes');
app.use('/api', dataRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
