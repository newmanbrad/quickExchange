const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const config = require('../config/dev');

// Order Schema
const orderSchema = new Schema({
    symbol: {
        type: String,
        required: true
    },
    side: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    timeInForce: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    newClientOrderId: {
        type: String
    },
    stopPrice: {
        type: Number
    },
    icebergQty: {
        type: Number
    }
});

const Order = module.exports = mongoose.model('Order', orderSchema);

module.exports.getOrderById = function (orderId, callback) {
    Order.findById(orderId, callback);
};

module.exports.addOrder = function (newOrder, callback) {
    newOrder.save(callback);
};