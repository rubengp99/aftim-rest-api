const { Router } = require('express');
const axios = require('axios');
const router = Router();
const { web_push, mail, DATA_URL } = require('../keys');
const webPush = require('web-push');

webPush.setVapidDetails(`mailto:${mail.MAIL}`, web_push.WEB_PUSH_PUBLIC_KEY, web_push.WEB_PUSH_PRIVATE_KEY);
router.post('/subscribe', async (req, res) => {
    let subscriptiondata = req.body.subsdata;
    const { data } = await axios.post(`${DATA_URL}/low/subscriptions`, subscriptiondata);
    await axios.post(`${DATA_URL}/mysql/usuario`, {
        data: {
            subscription_id: data.inserted.id
        }
    });
    res.status(200).json({ message: 'ok' });
});

router.post("/new-message", async (req, res) => {
    const { message, userId } = req.body;
    const response = await axios.get(`${DATA_URL}/mysql/usuario/${userId}`);
    const { data } = await axios.get(`${DATA_URL}/low/subscription/${response.data.subscription_id}`);
    // Payload Notification
    const payload = JSON.stringify({
        title: "Hoy provoca",
        message
    });
    res.status(200).json();
    try {
        await webPush.sendNotification(data, payload);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;