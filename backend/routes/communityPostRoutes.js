const express = require('express');
const router = express.Router();
const CommunityPost = require('../models/CommunityPost');

// Create a new Community Post
router.post('/', async (req, res) => {
    try {
        const post = new CommunityPost(req.body);
        console.log(req.body);
        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Save a reply to a Community Post
router.post('/reply/:postId', async (req, res) => {
    try {
        const post = await CommunityPost.findById(req.params.postId);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        post.comments.push(req.body);
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update likes for a Community Post
router.patch('/like/:postId', async (req, res) => {
    try {
        const post = await CommunityPost.findByIdAndUpdate(
            req.params.postId,
            { $inc: { likes: 1 } },
            { new: true }
        );
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update dislikes for a Community Post
router.patch('/dislike/:postId', async (req, res) => {
    try {
        const post = await CommunityPost.findByIdAndUpdate(
            req.params.postId,
            { $inc: { dislikes: 1 } },
            { new: true }
        );
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all Community Posts
router.get('/', async (req, res) => {
    try {
        const posts = await CommunityPost.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get Community Posts by User ID
router.get('/user/:userId', async (req, res) => {
    try {
        const posts = await CommunityPost.find({ creatorId: req.params.userId });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a Community Post
router.delete('/:postId', async (req, res) => {
    try {
        const result = await CommunityPost.findByIdAndDelete(req.params.postId);
        if (!result) return res.status(404).json({ message: 'Post not found' });
        res.json({ message: 'Post deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
