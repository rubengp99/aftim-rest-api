const cors = require('cors');
const morgan = require('morgan');
const multer = require('multer');
const express = require('express');
const router = require('./router');
const dotenv = require('dotenv');
const path = require('path');
const app = express();



// SETTINGS
dotenv.config();
const storage = multer.diskStorage({//manejador de archivos como imagenes
    destination: path.resolve('public/images'),
    filename: (req,file,cb)=>{
        cb(null,new Date().getTime()+path.extname(file.originalname));
    }
});
app.set('port', process.argv[2] || process.env.FILE_PORT || 84);


// MIDDLEWARES 

app.use(cors({ exposedHeaders: 'Authorization' }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/gallery/',multer({storage}).single('image'));

// Routes
router(app);

module.exports = app;