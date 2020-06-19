const chalk = require('chalk');
const { v4 } = require('uuid');
const { getConnection } = require('./database');
var connection;

getConnection()
    .then(db => connection = db)
    .catch(e => console.log(e));

async function list(model) {
    try {
        const data = await connection.get(model).value();
        return data;
    } catch (error) {
        console.log(`${chalk.red('[ERROR]')} ${error}`);
        return [];
    }
}

async function get(model, id) {
    try {
        const data = await connection.get(model).find({id:id}).value();
        return { data }
    } catch (error) {
        console.log(`${chalk.red('[ERROR]')} ${error}`);
        return null;
    }
}

async function insert(model,data) {
    try {
        data.id = v4();
        const inserted = await connection.get(model).push(data).write();
        return { message: 'inserted', inserted }
    } catch (error) {
        console.log(`${chalk.red('[ERROR]')} ${error}`);
        return {error:'Error al guardar en el archivo'};
    }
}

async function upsert(model,id,data) {
    try {
        const upserted = await connection.get(model).find({id:id}).assign(data).write();
        return { message: 'inserted', upserted }
    } catch (error) {
        console.log(`${chalk.red('[ERROR]')} ${error}`);
        return null;
    }
}

async function remove(model,id) {
    try {
        const deleted = await connection.get(model).remove({id:id}).write();
        return { message: 'inserted', deleted }
    } catch (error) {
        console.log(`${chalk.red('[ERROR]')} ${error}`);
        return null;
    }
}

module.exports = {
    list,
    get,
    insert,
    upsert,
    remove
}