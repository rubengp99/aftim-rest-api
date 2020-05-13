const mailRouter = require('./controllers/mail/router');
const pushRouter = require('./controllers/client/push');
const chatRouter = require('./controllers/messages/router');

module.exports = app => {
    app.use('/mail/', mailRouter);
    app.use('/push/', pushRouter);
    app.use('/chat/', chatRouter);
}