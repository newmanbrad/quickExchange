const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config/dev');

// User Schema
const userSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    }
    userName: {
        type: String,
        required: true
    }
    password: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', userSchema);

module.exports.getUserById = function (userId, callback) {
    User.findById(userId, callback);
};

module.exports.getUserByUserName = function (username, callback) {
    const query = { userName : username };
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
}


