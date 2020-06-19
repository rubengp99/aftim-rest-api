const { database } = require('../keys');
const { createPool } = require('mysql2/promise');
const chalk = require('chalk');

var connection = null;

function connect(data) {
    try {
        let { id } = data;
        let db = database;
        db.database = id;
        connection = createPool(database);
        console.log(`${chalk.green('[DATABASE]')} connected to ${db.database} database`);
        return connection;
    } catch (error) {
        console.log(`${chalk.red('[ERROR]')} ${error}`)
        return null;
    }
}

async function disconnect(db) {
    await db.end();
}

module.exports = { connect, disconnect };