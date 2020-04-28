const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const history = require('connect-history-api-fallback');
const dotenv = require('dotenv');
dotenv.config();


const app = express();

app.set('port', process.argv[2] || process.env.PAGES_PORT || 85);

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// app.use(history())
app.use(express.static(path.resolve('public/pages/admin/')));

module.exports = app;