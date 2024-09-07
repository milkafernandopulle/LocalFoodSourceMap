const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        ref: 'User'
    },
    sellerId: {
        type: String,
        required: true,
        ref: 'User'
    },
    productId: {
        type: String,
        required: true,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'pending', // Example statuses: pending, shipped, delivered, canceled
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
