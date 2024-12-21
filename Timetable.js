const mongoose = require('mongoose');

const TimetableSchema = new mongoose.Schema({
    date: { type: String, required: true },
    time: { type: String, required: true },
    subject: { type: String, required: true },
});

module.exports = mongoose.model('Timetable', TimetableSchema);
