const router = require('express').Router();
const { sendMessageTo } = require('./controller');


router.post('/', async (req, res) => {
    try {
        let { data } = req.body;
        const { code, message } = await sendMessageTo(data.id, data.message);
        return res.status(code).json({ message });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
})

module.exports = router;