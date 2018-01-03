const express = require('express');
const binanceAPI = require('binance');
const router = express.Router();
const Order = require('../models/order');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/dev');

// Binance REST Endpoints
const binanceRest = new binanceAPI.BinanceRest(config.binanceConfigObj);

// ping
router.get('/ping', (req, res) => {

    binanceRest.ping()
        .then((data) => {
            res.json({success: true, data: data});
        })
        .catch((err) => {
            res.json({success: false, data: err});
        });
});

// Get All Prices
router.get('/allPrices', (req, res) => {

    binanceRest.allPrices()
        .then((data) => {
            res.json({success: true, data: data});
        })
        .catch((err) => {
            res.json({success: false, data: err});
        });
});

// Get All Book Tickers
router.get('/allBookTickers', (req, res) => {

    binanceRest.allBookTickers()
        .then((data) => {
            res.json({success: true, data: data});
        })
        .catch((err) => {
            res.json({success: false, data: err});
        });
});

// Get Depth
// symbol	string
// limit (optional)	integer	Default and maximum of 100
router.get('/depth', (req, res) => {

    if(req.limit === undefined) { req.limit = 100; }

    binanceRest.depth({ symbol: req.symbol, limit: req.limit })
        .then((data) => {
            res.json({success: true, data: data});
        })
        .catch((err) => {
            res.json({success: false, data: err});
        });
});

module.exports = router;
