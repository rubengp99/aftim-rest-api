const router = require('express').Router();
const { sendMail } = require('./controller')


router.post('/sendmail', async (req, res) => {
    let { data } = req;
    try {
        let { code, response, message } = await sendMail(data.message, data.mail);
        return res.status(code).json(message || { data: response.data, token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Error' });
    }
});

module.exports = router;