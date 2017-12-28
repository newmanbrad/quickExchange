const express = require('express');
const binance = require('binance');
const router = express.Router();
const Order = require('../models/order');
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Get Order
router.get('/order', (req, res) => {
    res.send('Register');
});

module.exports = router;
