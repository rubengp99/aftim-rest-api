const axiosUtils = require("./encript");
let { getTenantId } = axiosUtils;
const { Router } = require('express');
const router = Router();
const { apiAccess, login, signup,signUpClient,signUpSeller, validate, encript, sendRecuperationMail, resetPassword,validPasswordHash } = require("./auth");

router.post('/encript', async (req, res) =>{
    let { password } = req.body;
    try {
        let  validado  = await encript(password);
        return res.status(200).json({ password: validado });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ validado: false });
    }
});

router.post('/validate', async (req, res) => {
    let { token, data } = req.body;
    try {
        console.log("[AUTH] joining /validate")
        let tenantId = getTenantId(req);
        let validado  = await apiAccess(tenantId, token);
        return res.status(200).json({ validado: validado });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ validado: false });
    }
});

router.post('/login', async (req, res) =>{
    let {data} = req.body;
    try {
        let tenantId = getTenantId(req);
        let response = await login(tenantId, data.user,data.password);
        return res.status(response.code).json({...response});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Internal Error'});
    }
});

router.post('/signup', async (req, res) =>{
    let { data } = req.body;
    try {
        let tenantId = getTenantId(req);
        let response = await signup(tenantId, data);
        return res.status(200).json({...response});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Internal Error'});
    } 
});

router.post('/sesion', async(req, res) =>{
    let { token } = req.body;
    try {
        let tenantId = getTenantId(req);
        let response = await validate(tenantId, token);
        return res.status(200).json({...response});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Internal Error'});
    } 
});

router.post('/sendmail', async(req, res) =>{
    let { user } = req.body.data;
    try {
        let tenantId = getTenantId(req);
        let response = await sendRecuperationMail(tenantId, user);
        return res.status(200).json({...response});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Internal Error'});
    } 
});

router.post('/validcode', async(req, res) =>{
    let { user,hash } = req.body.data;
    try {
        let tenantId = getTenantId(req);
        let { code, message } = await validPasswordHash(tenantId, user,hash);
        return res.status(200).json(message);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Internal Error'});
    } 
});

router.post('/resetpassword', async (req, res) =>{
    let {data} = req.body;
    try {
        let tenantId = getTenantId(req);
        let { code, message} = await resetPassword(tenantId, data.user,data.password);
        return res.status(200).json(message);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Internal Error'});
    }
});

module.exports = router;