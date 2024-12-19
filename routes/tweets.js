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

router.delete('/delete', (req, res) => {
    const findTweet = Tweet.(e => e.author === req.body.author);

    if (searchedWeather) {
        weather = weather.filter(e => e.cityName !== req.params.cityName);
        res.json({ result: true, weather });
    } else {
        res.json({ result: false, error: 'City not found' });
    }
});

module.exports = router;
