const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
	author: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
	content: String,
    createdAt: { type: Date, default: Date.now }
});

const Tweet = mongoose.model('tweets', tweetSchema);

module.exports = Tweet;

// schéma proposé par Matthieu que j'ai simplifié
// const tweetSchema = mongoose.Schema({
//     author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     content: { type: String, required: true, maxLength: 280 },
//     hashtags: [{ type: String }],
//     likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of user IDs who liked the tweet
//     });