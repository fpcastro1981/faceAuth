const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/APIBotFacebook');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(bodyParser(bodyParser.json()));

// Routes
app.use('/users', require('./routes/users'));

// Start the server
const port = process.env.port || 3000;
app.listen(port);
console.log(port);    