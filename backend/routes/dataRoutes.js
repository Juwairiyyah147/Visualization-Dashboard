const express = require('express');
const router = express.Router();
const Data = require('../models/dataModel');

router.get('/data', async (req, res) => {
    const { end_year, topic, sector, region, pestle, source, country, city } = req.query;
    const query = {};

    if (end_year) query.end_year = { $lte: end_year };
    if (topic) query.topic = topic;
    if (sector) query.sector = sector;
    if (region) query.region = region;
    if (pestle) query.pestle = pestle;
    if (source) query.source = source;
    if (country) query.country = country;
    if (city) query.city = city;

    try {
        const data = await Data.find(query);
        res.json(data);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ message: err.message });
    }
});



// Create new data
router.post('/data', async (req, res) => {
    try {
        const newData = new Data(req.body);
        const savedData = await newData.save();
        res.status(201).json(savedData);
    } catch (err) {
        console.error('Error creating data:', err);
        res.status(400).json({ message: err.message });
    }
});

// Update data by ID
router.put('/data/:id', async (req, res) => {
    try {
        const updatedData = await Data.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedData) {
            return res.status(404).json({ message: 'Data not found' });
        }
        res.json(updatedData);
    } catch (err) {
        console.error('Error updating data:', err);
        res.status(400).json({ message: err.message });
    }
});

// Delete data by ID
router.delete('/data/:id', async (req, res) => {
    try {
        const deletedData = await Data.findByIdAndDelete(req.params.id);
        if (!deletedData) {
            return res.status(404).json({ message: 'Data not found' });
        }
        res.json({ message: 'Data deleted successfully' });
    } catch (err) {
        console.error('Error deleting data:', err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
