const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/dev');

const app = express();
const port = 3000;

// Mongo
mongoose.connect(config.database.connectionString);

mongoose.connection.on('connected', () =>  {
    console.log('connected to database: ' + config.database.connectionString);
});

mongoose.connection.on('error', (error) =>  {
   console.log('database error: ' + error);
});

// Routes
const users = require('./routes/users');
const orders = require('./routes/orders');

// CORS Middleware
app.use(cors());

// Set Static Path
app.use(express.static(path.join( __dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

app.use('/users', users);
app.use('/orders', orders);

app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

// Start Server
app.listen(port, () => {
    console.log('Server started on port: ' + port);
});
