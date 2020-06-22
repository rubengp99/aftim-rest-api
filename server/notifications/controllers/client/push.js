const { Router } = require("express");
const axios = require("axios");
const router = Router();
const { web_push, mail, DATA_URL } = require("../../keys");
const webPush = require("web-push");

const { validar } = require("../../../auth/helpers/authentication");
const { createAxios, getTenantId } = require("../../../auth/helpers/axios");

webPush.setVapidDetails(
    `mailto:${mail.MAIL}`,
    web_push.WEB_PUSH_PUBLIC_KEY,
    web_push.WEB_PUSH_PRIVATE_KEY
);

const baseURL = `${DATA_URL}/mysql`;

function getRequestBody(req) {
    let { data } = req.body;
    if (typeof data === "undefined") return void 0;
    return (typeof data === 'string') ? JSON.parse(req.body.data) : data;
}

router.post("/subscribe", validar, async (req, res) => {
    try {
        const parsed_data = getRequestBody(req);
        const tenantId = getTenantId(req);

        if (!parsed_data) return res.status(400).json({ message: "bad request" });

        let {subscription_data, usuario_id}  = parsed_data;
        
        const connection = createAxios(baseURL, tenantId); 
        
        const {auth, p256dh} = subscription_data.keys;
        const {endpoint,expirationTime} = subscription_data;
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

router.post("/new-message", validar, async (req, res) => {
    
    const parsed_data = getRequestBody(req);
    const tenantId = getTenantId(req);

    if (!parsed_data) return res.status(400).json({ message: "bad request" });

    const { message, subscription_id } = parsed_data;
    
    const connection = createAxios(baseURL,tenantId) ;

    const { result } = await connection.get(`/subscripcion/${subscription_id}`);

    if (!result) return res.status(404).json({ message: "subscription not found." }) 

    const configData = {
        endpoint: result.endpoint,
        expirationTime: result.expiration_time,
        keys: {
            auth: result.auth,
            p256dh: result.p256dh,
        },
    };
    const payload = JSON.stringify({
        title: "Hoyprovoca.com",
        message,
    });
    res.status(200).json({ message: "Message sent." });
    try {
        await webPush.sendNotification(configData, payload);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
