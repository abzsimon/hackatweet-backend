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

module.exports = router;
