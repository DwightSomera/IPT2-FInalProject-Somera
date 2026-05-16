const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    }, // Name of the dish
    description: { 
        type: String, 
        required: true 
    }, // Description of the dish
    price: { 
        type: Number, 
        required: true 
    }, // Price of the dish
    photo: { 
        type: String, 
        required: false 
    }, // URL or file path for the dish image (set to false to prevent accidental demo crashes)
    category: {
        type: String,
        required: true
    } // Menu section designation (e.g., 'Silog Meals', 'Beverages')
});

module.exports = mongoose.model('Menu', menuSchema);