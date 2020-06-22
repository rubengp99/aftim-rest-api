const { Router } = require("express");
const axios = require("axios");
const router = Router();
const { web_push, mail, DATA_URL } = require("../../keys");
const webPush = require("web-push");

const { createAxios } = require("./../../axios");

webPush.setVapidDetails(
    `mailto:${mail.MAIL}`,
    web_push.WEB_PUSH_PUBLIC_KEY,
    web_push.WEB_PUSH_PRIVATE_KEY
);

const baseURL = `${DATA_URL}/mysql`;
const tenantId = "almendras";

router.post("/subscribe", async (req, res) => {
    try {
        let { data } = req.body;
        if (typeof data === "undefined") return res.status(400).json({ message: "bad request" });
        let { subscription_data, usuario_id } = data;
        const connection = createAxios(baseURL, tenantId);
        const { auth, p256dh } = subscription_data.keys;
        const { endpoint, expirationTime } = subscription_data;
        const toSave = {
            auth: auth,
            p256dh: p256dh,
            endpoint: endpoint,
            expiration_time: expirationTime,
            usuario_id: usuario_id,
        };
        const { saved } = await connection.post(`/subscripcion`, {
            data: { ...toSave },
        });
        res.status(200).json({ message: "ok", action: saved });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
});

router.post("/new-message", async (req, res) => {
    let { data } = req.body;
    if (typeof data === "undefined") return res.status(400).json({ message: "bad request" });
    const { message, subscription_id } = data;
    const connection = createAxios(baseURL, tenantId);
    const { result } = await connection.get(`/subscripcion/${subscription_id}`);
    const configData = {
        endpoint: result.endpoint,
        expirationTime: result.expiration_time,
        keys: {
            auth: result.auth,
            p256dh: result.p256dh,
        },
    };
    const payload = JSON.stringify({
        title: "Hoy provoca",
        message,
    });
    res.status(200).json({ message: "funciona" });
    try {
        await webPush.sendNotification(configData, payload);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
