const router = require('express').Router();
const { sendMail } = require('./controller')


router.post('/sendmail', async (req, res) => {
    let { data } = req.body;
    try {
        if (!data.message || !data.subject || !data.email || !data.link || !data.type) 
            return res.status(400).json({ message: "A message must contain: Email, Message, Type, Link and Subject." })
        
        let { code, response, message } = await sendMail(data);
        return res.status(code).json(message || { data: response.data, token });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Error', error: error });
    }
});

module.exports = router;