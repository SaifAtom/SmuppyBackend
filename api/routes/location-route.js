const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Location = require('../models/location');
const locationController = require('../controllers/location-controller')

// Create a new location
router.post('/',locationController.create_location);

// Get all locations
router.get('/',locationController.getAllLocations);

// Update a specific location
router.patch('/:locationId', locationController.getLocationById);

// Delete a specific location
router.delete('/:locationId', locationController.deleteLocationById);

module.exports = router;