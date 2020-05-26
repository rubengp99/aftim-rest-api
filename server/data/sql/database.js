const { database } = require('../keys');
const { createPool } = require('mysql2/promise');
const chalk = require('chalk');

var connection = null;

function connect(data) {
    if (!data)
        data = database;
    try {
        connection = createPool(data);
        console.log(`${chalk.green('[DATABASE]')} connected to ${data.database} database`);
        return connection;
    } catch (error) {
        console.log(`${chalk.red('[ERROR]')} ${error}`)
        return null;
    }
}

async function disconnect() {
    await connection.end();
}

module.exports = { connect, disconnect };