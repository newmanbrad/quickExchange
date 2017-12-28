const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Register User
router.post('/register', (req, res) => {
   let newUser = new User({
       name: req.body.name,
       userName: req.body.userName,
       email: req.body.email,
       password: req.body.password
   });

   User.addUser(newUser, (err, user) => {
       if (err) {
          res.json({ success : false, msg : 'Failed to register user.' });
       } else {
           res.json({ success : true, msg : 'User registered' });
       }
   });
});

// Authenticate User
router.get('/authenticate', (req, res) => {
    res.send('Register');
});

// Profile
router.get('/profile', (req, res) => {
    res.send('Register');
});

// Validate User
router.get('/validate', (req, res) => {
    res.send('Register');
});


module.exports = router;
