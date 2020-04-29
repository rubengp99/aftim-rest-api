const low = require('lowdb');
const chalk = require('chalk');
const FileAsync = require('lowdb/adapters/FileAsync');

async function getConnection() {
    try {
        const adapter = new FileAsync('db.json');
        const db = await low(adapter)
        db.defaults({subscriptions: []}).write();
        console.log(`${chalk.green('[DATABASE]')} connected to db.json file`)
        return db;
    } catch (error) {
        console.log(`${chalk.red('[ERROR]')} ${error}`)
        return null;
    }
}

module.exports = {
    getConnection
}