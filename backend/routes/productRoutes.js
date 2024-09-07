const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// POST: Add a product
router.post('/', async (req, res) => {
    const { userId, name, description, price, quantity, imageUrl,longitude,lattitude } = req.body;
    try {
        const product = new Product({ userId, name, description, price, quantity, imageUrl, longitude, lattitude });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT: Edit a product
router.put('/:id', async (req, res) => {
    const updates = req.body;
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE: Delete a product
router.delete('/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET: Get all products
router.get('/', async (req, res) => {
    try {
        console.log("get all products");
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET: Get product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET: Get products by user ID
router.get('/user/:userId', async (req, res) => {
    try {
        const products = await Product.find({ userId: req.params.userId });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
