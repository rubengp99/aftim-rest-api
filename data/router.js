const sqlrouter = require('./sql/router');
const lowdbrouter = require('./lowdb/router')
module.exports = app => {
    app.use('/data/mysql/',sqlrouter);
    app.use('/data/low/',lowdbrouter);
}