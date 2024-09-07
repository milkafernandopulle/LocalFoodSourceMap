const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String
    },
    longitude: {
        type: Number
    },
    lattitude: {
        type: Number
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
