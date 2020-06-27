const { Router } = require("express");
const router = Router();
const { DATA_URL } = require("../../keys");

const { validar } = require("../../../auth/helpers/authentication");
const { createAxios, getTenantId } = require("../../../auth/helpers/axios");

const baseURL = `${DATA_URL}/mysql`;

function getRequestBody(req) {
    let { data } = req.body;
    if (typeof data === "undefined") return void 0;
    return typeof data === "string" ? JSON.parse(req.body.data) : data;
}

/*
    NOTIFICATION MODEL:
        -TITULO
        -MENSAJE
        -TIPO
        -USUARIO_ID
*/

router.post("/", validar, async (req, res) => {
    const tenantId = getTenantId(req);
    const connection = createAxios(baseURL, tenantId);
    const parsed_data = getRequestBody(req);
    console.log(req.body)
    if (!parsed_data) return res.status(400).json({ message: "bad request" });
    console.log(parsed_data)
    try {
        const { saved } = await connection.post(`/notificaciones`, {
            data: { ...parsed_data },
        });
        res.status(200).json({ message: "ok", action: saved });
    } catch (error) {
       
        console.log(error);
        return res.status(500).json({ message: error });
    }
});

router.get("/", validar, async (req, res) => {
    const tenantId = getTenantId(req);
    const connection = createAxios(baseURL, tenantId);
    
    try {
        const { data } = await connection.get(`/notificaciones`);
        res.status(200).json({ data: data });
    } catch (error) {
       
        console.log(error);
        return res.status(500).json({ message: error });
    }
});

module.exports = router;