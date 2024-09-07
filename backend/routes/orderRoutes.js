const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product'); // Import the Product model
const router = express.Router();

// POST: Create an order
router.post('/', async (req, res) => {
    console.log(req.body);
    const { userId, sellerId, productId, quantity, totalPrice, status } = req.body;

    try {
        // Find the product by ID
        const product = await Product.findById(productId);

        // Check if the product exists
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if the requested quantity is available
        if (quantity > product.quantity) {
            return res.status(400).json({ message: `Only ${product.quantity} items available in stock` });
        }

        // Reduce the product's quantity by the ordered quantity
        product.quantity -= quantity;

        // Save the updated product
        await product.save();

        // Create a new order
        const order = new Order({ userId, sellerId, productId, quantity, totalPrice, status });
        await order.save();

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET: Get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT: Update an order
router.put('/:id', async (req, res) => {
    const updates = req.body;
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, updates, { new: true });
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET: Get orders by seller ID
router.get('/seller/:sellerId', async (req, res) => {
    try {
        const orders = await Order.find({ sellerId: req.params.sellerId });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET: Get orders by user ID
router.get('/user/:userId', async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET: Get a single order by ID
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
