const mailRouter = require('./controllers/mail/router');
const pushRouter = require('./controllers/client/push');
const dbRouter   = require ('./controllers/db/router')
//const chatRouter = require('./controllers/messages/router');

module.exports = app => {
    app.use('/nots/mail/', mailRouter);
    app.use('/nots/push/', pushRouter);
    app.use('/nots/db/', dbRouter)
  //  app.use('/nots/chat/', chatRouter);
}