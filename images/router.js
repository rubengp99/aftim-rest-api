const photoRouter = require('./media/photo/route');
module.exports = app =>{
    app.use('/gallery/',photoRouter);
}