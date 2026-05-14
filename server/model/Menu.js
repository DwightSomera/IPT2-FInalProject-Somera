const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    }, // Name of the dish [cite: 17]
    description: { 
        type: String, 
        required: true 
    }, // Description of the dish [cite: 18]
    price: { 
        type: Number, 
        required: true 
    }, // Price of the dish [cite: 19]
    photo: { 
        type: String, 
        required: true 
    } // URL or file path for the dish image [cite: 20]
});

module.exports = mongoose.model('Menu', menuSchema);