const mongoose = require('mongoose');

// Define a schema with strict mode disabled to allow flexible document structure
const dataSchema = new mongoose.Schema({}, { strict: false });

// Create a model for the 'data' collection
const Data = mongoose.model('Data', dataSchema, 'data'); // Ensure the collection name is 'data'

module.exports = Data;
