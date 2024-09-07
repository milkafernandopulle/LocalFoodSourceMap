// routes/events.js
const express = require('express');
const Event = require('../models/Event');
const router = express.Router();

// POST: Create an event
router.post('/', async (req, res) => {
    const { eventName, eventDescription, eventDate,eventTime, zoomLink, creatorId, creatorName } = req.body;
    try {
        const event = new Event({ eventName, eventDescription, eventDate, eventTime, zoomLink, creatorId, creatorName });
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET: Get all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET: Get a single event by ID
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
