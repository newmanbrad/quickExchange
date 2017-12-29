const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/dev');

// User Schema
const userSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', userSchema);

module.exports.getUserById = function (userId, callback) {
    User.findById(userId, callback);
};

module.exports.getUserByUsername = function (username, callback) {
    const query = { username : username };
    User.findOne(query, callback);
};

module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) { throw err; }
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

module.exports.comparePassword = (candidatePassword, hash, callback) => {
    bcrypt.compare(candidatePassword, hash)
        .then((isMatch) => {
            callback(null, isMatch);
        }).catch((err) => console.log('There was an error with authentication.'));
};



