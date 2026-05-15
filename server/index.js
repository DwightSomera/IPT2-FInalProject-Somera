const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); 
const app = express();

// Import Models
const User = require('./model/User');
const Menu = require('./model/Menu'); 

// Import Middleware
const upload = require('./middleware/upload'); 

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 

// Database Connection [cite: 21, 31]
mongoose.connect('mongodb://127.0.0.1:27017/kuyatabs_db')
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));

// --- AUTHENTICATION ROUTES --- 

// Sign Up Route
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const newUser = new User({ username, password, role: 'user' });
    await newUser.save();
    res.json({ message: "User registered!" });
});

// Login Route 
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
        res.json({ success: true, role: user.role, username: user.username });
    } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
    }
});

// Password Reset Route (No Internet Required)
app.post('/reset-password', async (req, res) => {
    const { username, newPassword } = req.body;
    try {
        const user = await User.findOneAndUpdate({ username }, { password: newPassword }, { new: true });
        if (user) {
            res.json({ success: true, message: "Password reset successful!" });
        } else {
            res.status(404).json({ success: false, message: "Username not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- USER MANAGEMENT ROUTES --- 

// 1. READ: Get all users
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find({}, '-password'); 
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. UPDATE: Change User Role (Promote/Demote) [cite: 31]
app.put('/api/users/:id/role', async (req, res) => {
    const { role } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. DELETE: Remove a user account [cite: 31]
app.delete('/api/users/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User account removed" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- MENU CRUD ROUTES --- [cite: 12, 14, 16]

app.post('/api/menu', upload.single('photo'), async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const newDish = new Menu({
            name, description, price,
            photo: req.file ? req.file.filename : '' 
        });
        await newDish.save();
        res.status(201).json(newDish);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/menu', async (req, res) => {
    try {
        const items = await Menu.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/menu/:id', upload.single('photo'), async (req, res) => {
    try {
        const { name, description, price } = req.body;
        let updateData = { name, description, price };
        if (req.file) updateData.photo = req.file.filename;
        const updatedDish = await Menu.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.json(updatedDish);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/menu/:id', async (req, res) => {
    try {
        await Menu.findByIdAndDelete(req.params.id);
        res.json({ message: "Item deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));