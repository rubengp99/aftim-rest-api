const { Router } = require('express');
const router = Router();
const { web_push, mail } = require('../keys');
const webPush = require('web-push');

webPush.setVapidDetails(`mailto:${mail.MAIL}`,web_push.WEB_PUSH_PUBLIC_KEY,web_push.WEB_PUSH_PRIVATE_KEY);
let subscriptiondata;
router.post('/subscribe', async (req, res) => {
    subscriptiondata = req.body;
    res.status(200).json({message:'ok'});

    const payload = {
        title: 'My first notification',
        body: 'Hi this is my first notification'
    };

    try {
        await webPush.sendNotification(subscriptiondata,JSON.stringify(payload))
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;