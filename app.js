const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/dev');

const app = express();
const port = process.env.PORT || 3000;

// Connect to database via mongoose
mongoose.Promise = require('bluebird');
mongoose.connect(config.database.connectionString, { useMongoClient: true, promiseLibrary: require('bluebird') })
    .then(() => console.log(`Connected to database ${config.database.connectionString}`))
    .catch((err) => console.log(`Database error: ${err}`));

// Routes
const users = require('./routes/users');
const orders = require('./routes/orders');

// ******************************************
// MIDDLEWARE
// ******************************************
app.use(cors());

// Body-Parser
app.use(bodyParser.json());

// Passport
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// ******************************************
// ROUTES
// ******************************************
app.use(express.static(path.join( __dirname, 'public')));
app.use('/users', users);
app.use('/orders', orders);

// ******************************************
// API ERROR HANDLER
// ******************************************
// Error handler for 404 - Page Not Found
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    res.status(404).json({
        status: 404,
        message: err.message,
        name: err.name
    });
});

app.listen(port, () => console.log(`Server started on port ${port}`));