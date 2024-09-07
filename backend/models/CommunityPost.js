const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    userName: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const CommunityPostSchema = new mongoose.Schema({
    content: { type: String, required: true },
    imageUrl: { type: String, optional: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 }, // Added field for dislikes
    comments: [CommentSchema],
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    creatorName: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CommunityPost', CommunityPostSchema);
