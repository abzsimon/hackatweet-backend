const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
 username: String,
 password: hash,
 token : uid2(32)
});

const User = mongoose.model('users', userSchema);

module.exports = User;