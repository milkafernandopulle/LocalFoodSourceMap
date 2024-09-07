const express = require('express');
const Review = require('../models/Review');
const router = express.Router();

// POST: Create a review
router.post('/', async (req, res) => {
    const { orderId, productId, userName, review, rating } = req.body;
    try {
        const newReview = new Review({ orderId, productId, userName, review, rating });
        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET: Get all reviews
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET: Get reviews by product ID
router.get('/product/:productId', async (req, res) => {
    try {
        const reviews = await Review.find({ productId: req.params.productId });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT: Update a review
router.put('/:id', async (req, res) => {
    const updates = req.body;
    try {
        const review = await Review.findByIdAndUpdate(req.params.id, updates, { new: true });
        res.json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE: Delete a review
router.delete('/:id', async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
