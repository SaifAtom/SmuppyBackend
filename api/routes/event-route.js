const express = require('express');
const mongoose = require('mongoose');
const Event = require('../models/event');
const eventController = require('../controllers/event-controller')

const router = express.Router();

// Create a new event
router.post('/',eventController.create_event);

// Get all events
router.get('/', eventController.get_All_events);

// Get a single event by ID
router.get('/:eventId', eventController.getEventById);

// Update an event by ID
router.patch('/:eventId',eventController.update_event);

// Delete an event by ID
router.delete('/:eventId', eventController.delete_event);

module.exports = router;