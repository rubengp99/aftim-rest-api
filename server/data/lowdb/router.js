const { Router } = require('express');
const router = Router();

const chalk = require('chalk');

const { list, get, insert, upsert, remove } = require('./consulter');


router.get('/:table/', async (req, res) => {
    let { table } = req.params;
    try {
        let response = await list(table);
        return res.status(200).json(response);
    } catch (error) {
        console.log(`${chalk.red('[ERROR]')} ${error}`);
        return res.status(500).json({ error: error });
    }

});

router.get('/:table/:id', async (req, res) => {
    let { table, id } = req.params;
    try {
        let response = await get(table, id);
        return res.status(200).json(response);
    } catch (error) {
        console.log(`${chalk.red('[ERROR]')} ${error}`);
        return res.status(500).json({ error: error });
    }
});


router.post('/:table', async (req, res)=>{
    let { params, body } = req;
    let { table } = params;
    let { data } = body;
    try {
        let response = await insert(table, data);
        return res.status(201).json(response);
    } catch (error) {
        console.log(`${chalk.red('[ERROR]')} ${error}`);
        return res.status(500).json({ error: error });
    }
});


router.post('/:table/:id', async (req, res)=>{
    let { params, body } = req;
    let { table, id } = params;
    let { data } = body;
    try {
        let response = await upsert(table, id, data);
        return res.status(201).json(response);
    } catch (error) {
        console.log(`${chalk.red('[ERROR]')} ${error}`);
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
        return res.status(500).json({ error: error });
    }
});



module.exports = router;