var express = require('express');
var router = express.Router();

require('../models/connection');
const Tweet = require('../models/tweets');
const User = require('../models/users');

router.post('/', (req, res) => {
    User.findOne({ token: req.body.token }).then((user) => {
        if (user === null) {
            res.json({ result: false, error: 'No user specified!' });
        } else {
            const newTweet = new Tweet({
                author: user._id,
                content: req.body.content,
                createdAt: new Date(),
            });
            newTweet.save().then((savedTweet) => {
                res.json({ result: true, tweet: savedTweet });
            });
        }
    });
});

router.get('/all', (req, res) => {
    User.findOne({ token: req.body.token }).then((user) => {
        if (user === null) {
            res.json({ result: false, error: 'No user specified!' });
        } else {
            Tweet.find().populate('author', ['username']).then(data => {
                res.json({ result: true, tweets: data });
            });
        }
    });
})

router.delete('/:id', (req, res) => {
    User.findOne({ token: req.body.token }).then((user) => {
        if (user === null) {
            res.json({ result: false, error: 'No user specified!' });
        } else {
            Tweet.findOneAndDelete({ _id: req.params.id }).then(deletedTweet => {
                if (deletedTweet) {
                    res.json({ result: true, message: 'Tweet successfully deleted!' });
                } else {
                    res.json({ result: false, error: 'Tweet not found!' });
                }
            });
        }
    });
});

module.exports = router;
