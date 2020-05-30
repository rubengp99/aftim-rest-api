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
app.use(express.urlencoded({ extended: false }));

app.use('/admin/', history());
app.use('/admin/', express.static(path.resolve('public/pages/admin/')));
app.use('/reporteador/', history());
app.use('/reporteador/', express.static(path.resolve('public/pages/reporteador/')));
app.use(history());
app.use(express.static(path.resolve('public/pages/hoyprovoca/')));

module.exports = app;