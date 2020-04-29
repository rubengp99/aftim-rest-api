const { Router } = require('express');
const router = Router();

const chalk = require('chalk');

const { get, getOne, getOtherByMe, create, insertMany, update, remove, query, count, countOther } = require('./consulter');


router.get('/count/:table', async (req, res) =>{
    let { table } = req.params;
    try {
        let response = await count(table);
        return res.status(200).json(response);
    } catch (error) {
        console.log(`${chalk.red('[ERROR]')} ${error}`);
        if (error.message === 'BD_SYNTAX_ERROR') return res.status(400).json({ error: 'Invalid query' });
        return res.status(500).json({ error: error });
    }           
});

router.get('/count/:table/:id/:other/', async (req, res) =>{
    let { table, id, other } = req.params;
    try {
        let response = await countOther(table, id, other);
        return res.status(200).json(response);
    } catch (error) {
        console.log(`${chalk.red('[ERROR]')} ${error}`);
        if (error.message === 'BD_SYNTAX_ERROR') return res.status(400).json({ error: 'Invalid query' });
        return res.status(500).json({ error: error });
    } 
});

router.get('/:table/', async (req, res) => {
    let { params, query } = req;
    let { table } = params;
    try {
        let response = await get(table, query);
        return res.status(200).json(response);
    } catch (error) {
        console.log(`${chalk.red('[ERROR]')} ${error}`);
        if (error.message === 'BD_SYNTAX_ERROR') return res.status(400).json({ error: 'Invalid query' });
        if (error.message === 'BD_TABLE_ERROR') return res.status(404).json({ error: 'Invalid table' });
        return res.status(500).json({ error: error });
    }

});

router.get('/:table/:id', async (req, res) => {
    let { params, query } = req;
    let { table, id } = params;
    try {
        let response = await getOne(table, id, query);
        return res.status(200).json(response);
    } catch (error) {
        console.log(`${chalk.red('[ERROR]')} ${error}`);
        if (error.message === 'BD_SYNTAX_ERROR') return res.status(400).json({ error: 'Invalid query' });
        if (error.message === 'BD_TABLE_ERROR') return res.status(404).json({ error: 'Invalid table' });
        return res.status(500).json({ error: error });
    }
});

router.get('/:table/:id/:other/', async (req, res) => {
    let { params, query } = req;
    let { table, id, other } = params;
    try {
        let response = await getOtherByMe(table, id, other, query);
        return res.status(200).json(response);
    } catch (error) {
        console.log(`${chalk.red('[ERROR]')} ${error}`);
        if (error.message === 'BD_SYNTAX_ERROR') return res.status(400).json({ error: 'Invalid query' });
        if (error.message === 'BD_TABLE_ERROR') return res.status(404).json({ error: 'Invalid table' });
        return res.status(500).json({ error: error });
    }
});

router.post('/query/', async (req, res) =>{
    try {
        let { sql } = req.body;
        let response = await query(sql);
        return res.status(200).json(response);
    } catch (error) {
        console.log(`${chalk.red('[ERROR]')} ${error}`);
        if (error.message === 'BD_SYNTAX_ERROR') return res.status(400).json({ error: 'Invalid query' });
        if (error.message === 'BD_TABLE_ERROR') return res.status(404).json({ error: 'Invalid table' });
        return res.status(500).json({ error: error });
    }
});

router.post('/:table', async (req, res)=>{
    let { params, body } = req;
    let { table } = params;
    let { data } = body;
    try {
        let response = await create(table, data);
        return res.status(201).json(response);
    } catch (error) {
        console.log(`${chalk.red('[ERROR]')} ${error}`);
        if (error.message === 'BD_SYNTAX_ERROR') return res.status(400).json({ error: 'Invalid query' });
        if (error.message === 'BD_TABLE_ERROR') return res.status(404).json({ error: 'Invalid table' });
        return res.status(500).json({ error: error });
    }
});

router.post('/:table/many',async (req, res)=>{
    let { params, body } = req;
    let { table } = params;
    let { data } = body;
    try {
        let response = await insertMany(table, data);
        return res.status(201).json(response);
    } catch (error) {
        console.log(`${chalk.red('[ERROR]')} ${error}`);
        if (error.message === 'BD_SYNTAX_ERROR') return res.status(400).json({ error: 'Invalid query' });
        if (error.message === 'BD_TABLE_ERROR') return res.status(404).json({ error: 'Invalid table' });
        return res.status(500).json({ error: error });
    }
});

router.post('/:table/:id', async (req, res)=>{
    let { params, body } = req;
    let { table, id } = params;
    let { data } = body;
    try {
        let response = await update(table, id, data);
        return res.status(201).json(response);
    } catch (error) {
        console.log(`${chalk.red('[ERROR]')} ${error}`);
        if (error.message === 'BD_SYNTAX_ERROR') return res.status(400).json({ error: 'Invalid query' });
        if (error.message === 'BD_TABLE_ERROR') return res.status(404).json({ error: 'Invalid table' });
        return res.status(500).json({ error: error });
    }
});

router.delete('/:table/:id', async (req, res)=>{
    let { params } = req;
    let { table, id } = params;
    try {
        let response = await remove(table,id);
        return res.status(200).json(response);
    } catch (error) {
        console.log(`${chalk.red('[ERROR]')} ${error}`);
        if (error.message === 'BD_SYNTAX_ERROR') return res.status(400).json({ error: 'Invalid query' });
        if (error.message === 'BD_TABLE_ERROR') return res.status(404).json({ error: 'Invalid table' });
        return res.status(500).json({ error: error });
    }
});



module.exports = router;