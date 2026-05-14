const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // Added for path handling
const app = express();

// Import Models
const User = require('./model/User');
const Menu = require('./model/Menu'); // Added Menu Model

// Import Middleware
const upload = require('./middleware/upload'); // Added Multer Middleware

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serving uploaded images

mongoose.connect('mongodb://127.0.0.1:27017/kuyatabs_db')
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));

// --- AUTHENTICATION ROUTES ---

// Sign Up Route
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    await newUser.save();
    res.json({ message: "User registered!" });
});

// Login Route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
        res.json({ success: true, user });
    } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
    }
});

// --- MENU CRUD ROUTES ---

// 1. CREATE: Add a new dish with a photo [cite: 12, 14]
app.post('/api/menu', upload.single('photo'), async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const newDish = new Menu({
            name,
            description,
            price,
            photo: req.file ? req.file.filename : '' // Saves the unique filename from Multer
        });
        await newDish.save();
        res.status(201).json(newDish);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. READ: Get all dishes for the landing page [cite: 4, 15]
app.get('/api/menu', async (req, res) => {
    try {
        const items = await Menu.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. UPDATE: Edit a dish [cite: 12]
app.put('/api/menu/:id', upload.single('photo'), async (req, res) => {
    try {
        const { name, description, price } = req.body;
        let updateData = { name, description, price };
        
        if (req.file) {
            updateData.photo = req.file.filename;
        }

        const updatedDish = await Menu.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.json(updatedDish);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. DELETE: Remove a dish [cite: 12]
app.delete('/api/menu/:id', async (req, res) => {
    try {
        await Menu.findByIdAndDelete(req.params.id);
        res.json({ message: "Item deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));