const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const router = require('./router');

const app = express();



// SETTINGS

app.set('port', process.argv[2] || process.env.DATA_PORT || 83);


// MIDDLEWARES 

app.use(cors({ exposedHeaders: 'Authorization' }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/data/',router);

module.exports = app;