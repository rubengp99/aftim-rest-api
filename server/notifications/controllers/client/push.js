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
const unsubscribed = "push subscription has unsubscribed or expired.\n";
const notFound = "subscription not found.";
const baseURL = `${DATA_URL}/mysql`;

function getRequestBody(req) {
    let { data } = req.body;
    if (typeof data === "undefined") return void 0;
    return typeof data.subscription_data === "string"
        ? JSON.parse(req.body.data.subscription_data)
        : data.subscription_data;
}

router.post("/subscribe", validar, async (req, res) => {
    try {
        const tenantId = getTenantId(req);
        const connection = createAxios(baseURL, tenantId);
        const parsed_data = getRequestBody(req);

        if (!parsed_data)
            return res.status(400).json({ message: "bad request" });

        const { usuario_id } = req.body.data;
        const subscription_data = parsed_data;
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
        if (error.response.data.error === "duplicate entry") {
            await connection.post(`/subscripcion/${usuario_id}`, {
                data: { ...toSave },
            });
            return res
                .status(201)
                .json({ message: "updated user", target: usuario_id });
        }
        console.log(error);
        return res.status(500).json({ message: error });
    }
});

router.post("/new-message", validar, async (req, res) => {
    const reqData = req.body.data;
    const tenantId = getTenantId(req);
    const { message, usuario_id } = reqData;

    const connection = createAxios(baseURL, tenantId);

    const { data } = await connection.get(`usuario/${usuario_id}/subscripcion`);

    if (!data)
        return res.status(404).json({ message: "subscription not found." });

    const configData = {
        endpoint: data.endpoint,
        expirationTime: data.expiration_time,
        keys: {
            auth: data.auth,
            p256dh: data.p256dh,
        },
    };
    const payload = JSON.stringify({
        title: "Hoyprovoca.com",
        message,
    });
    try {
        await webPush.sendNotification(configData, payload);
        res.status(200).json({ message: "Message sent." });
    } catch (error) {
        if (error.body === unsubscribed)
            await connection.delete(`/subscripcion/${subscription_id}`);
        console.log(error);
        res.json({
            error: error.body,
            status: error.statusCode,
            message: "there is an error",
        });
    }
});
router.get("/", validar, async (req, res) => {
    const tenantId = getTenantId(req);
    const connection = createAxios(baseURL, tenantId);
    try {
        const { data } = await connection.get(`/subscripcion`);
        res.status(200).json({ message: "ok", data: data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
});

router.get("/:id", validar, async (req, res) => {
    try {
        let { id } = req.params;

        const tenantId = getTenantId(req);

        const connection = createAxios(baseURL, tenantId);

        const { data } = await connection.get(`/subscripcion`, {
            fields: { usuario_id: id },
        });

        if (!data)
            return res.status(404).json({ message: "subscription not found." });

        res.status(200).json({ data: data });
    } catch (error) {
        res.status(500).json({
            message: "there is an error",
        });
    }
});

module.exports = router;
