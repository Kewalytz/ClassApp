const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const admin = { username: 'admin', password: 'password123@' };

// Register User
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered' });
    } catch (err) {
        res.status(500).json({ error: 'Registration failed' });
    }
});

// Login User/Admin
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        if (username === admin.username && password === admin.password) {
            const token = jwt.sign({ username, role: 'admin' }, process.env.SECRET_KEY);
            return res.json({ token, role: 'admin' });
        }

        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ error: 'Invalid credentials' });

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ username, role: user.role }, process.env.SECRET_KEY);
        res.json({ token, role: user.role });
    } catch (err) {
        res.status(500).json({ error: 'Login failed' });
    }
});

module.exports = router;
