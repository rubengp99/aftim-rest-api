import { getTenantId } from "../api/src/helpers/axios"
const { Router } = require('express');
const router = Router();
const { apiAccess, login, signup,signUpClient,signUpSeller, validate, encript, sendRecuperationMail, resetPassword,validPasswordHash } = require("./auth");

router.post('/encript', async (req,res)=>{
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
        let tenantId = getTenantId(req);
        let { validado } = await apiAccess(tenantId, token, data);
        return res.status(200).json({ validado: validado });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ validado: false });
    }
});

router.post('/login', async (req, res)=>{
    let {data} = req.body;
    try {
        let tenantId = getTenantId(req);
        let { code, response, message, token } = await login(tenantId, data.user,data.password);
        return res.status(code).json(message || {data:response.data, token});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Internal Error'});
    }
});

router.post('/signup', async (req, res)=>{
    let { data } = req.body;
    try {
        let tenantId = getTenantId(req);
        let { code, response,token } = await signup(tenantId, data);
        return res.status(code).json({data:response.data,token});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Internal Error'});
    } 
});

router.post('/sesion', async(req, res)=>{
    let { token } = req.body;
    try {
        let tenantId = getTenantId(req);
        let { code, response, message } = await validate(tenantId, token);
        return res.status(code).json(message || response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Internal Error'});
    } 
});

router.post('/sendmail', async(req,res)=>{
    let { user } = req.body.data;
    try {
        let tenantId = getTenantId(req);
        let { code, message, token } = await sendRecuperationMail(tenantId, user);
        return res.status(code).json( message ? {message} : {token});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Internal Error'});
    } 
});

router.post('/validcode', async(req,res)=>{
    let { user,hash } = req.body.data;
    try {
        let tenantId = getTenantId(req);
        let { code, message } = await validPasswordHash(tenantId, user,hash);
        return res.status(code).json(message);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Internal Error'});
    } 
});

router.post('/resetpassword', async (req, res)=>{
    let {data} = req.body;
    try {
        let tenantId = getTenantId(req);
        let { code, message} = await resetPassword(tenantId, data.user,data.password);
        return res.status(code).json(message);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Internal Error'});
    }
});

module.exports = router;