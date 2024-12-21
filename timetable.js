const express = require('express');
const Timetable = require('../models/Timetable');

const router = express.Router();

// Add Timetable (Admin)
router.post('/', async (req, res) => {
    const { date, time, subject } = req.body;
    try {
        const timetable = new Timetable({ date, time, subject });
        await timetable.save();
        res.status(201).json({ message: 'Timetable added' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add timetable' });
    }
});

// Get Timetable (User/Admin)
router.get('/', async (req, res) => {
    try {
        const timetables = await Timetable.find();
        res.json(timetables);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch timetables' });
    }
});

module.exports = router;
