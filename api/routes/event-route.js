const express = require('express');
const mongoose = require('mongoose');
const Event = require('../models/event');

const router = express.Router();

// Create a new event
router.post('/', async (req, res) => {
  const { content, title, author_id, location } = req.body;

  const event = new Event({
    _id: mongoose.Types.ObjectId(),
    content,
    title,
    author_id,
    location,
  });

  try {
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to create event' });
  }
});

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to get events' });
  }
});

// Get a single event by ID
router.get('/:eventId', async (req, res) => {
  const { eventId } = req.params;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to get event' });
  }
});

// Update an event by ID
router.patch('/:eventId', async (req, res) => {
  const { eventId } = req.params;

  try {
    const event = await Event.findByIdAndUpdate(eventId, req.body, { new: true });
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to update event' });
  }
});

// Delete an event by ID
router.delete('/:eventId', async (req, res) => {
  const { eventId } = req.params;

  try {
    const event = await Event.findByIdAndDelete(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to delete event' });
  }
});

module.exports = router;