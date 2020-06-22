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
    return (typeof data === 'string') ? JSON.parse(req.body.data) : data;
}

router.post("/subscribe", validar, async (req, res) => {
    try {
        const parsed_data = getRequestBody(req);
        const tenantId = getTenantId(req);

        let {subscription_data, usuario_id}  = parsed_data;
        
        const connection = createAxios(baseURL,tenantId);
        const {auth,p256dh} = subscription_data.keys;
        const {endpoint,expirationTime} = subscription_data;
        const toSave = {
            auth:auth,
            p256dh:p256dh,
            endpoint:endpoint,
            expiration_time:expirationTime,
            usuario_id:usuario_id
        }
        const { data } = await connection.post(`/subscripcion`,{data:{...toSave}});
        res.status(200).json({ message: "ok", action: data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
});

router.post("/new-message", validar, async (req, res) => {
    
    const parsed_data = getRequestBody(req);
    const tenantId = getTenantId(req);

    const { message, subscription_id } = parsed_data;
    
    const connection = createAxios(baseURL,tenantId) ;
    const { data } = await connection.get(`/subscripcion/${subscription_id}`);
    const configData = {
            endpoint:data.endpoint,
            expirationTime:data.expiration_time,
            keys:{
             auth:data.value1,
             p256dh:data.value2,
            }
    }
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
