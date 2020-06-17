const { database } = require('../keys');
const { createPool } = require('mysql2/promise');
const chalk = require('chalk');

var connection = null;

function connect(data) {
    if (!data)
        data = database;
    try {
        database.database = data.database;
        console.log(database)
        connection = createPool(database);
        console.log(`${chalk.green('[DATABASE]')} connected to ${data.database} database`);
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