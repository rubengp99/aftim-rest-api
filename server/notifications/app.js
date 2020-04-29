const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const express = require('express');
const app = express();
const router = require('./messages/push');

//settings
dotenv.config();
// MIDDLEWARES 

app.use(cors({ exposedHeaders: 'Authorization' }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('port', process.argv[2] || process.env.NOTIFICATION_PORT || 86);

// Routes
//router(app);
app.use(router);

module.exports = app;
