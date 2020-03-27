const axios = require("axios");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const moment = require('moment');
const { DATA_URL, TOKEN_KEY } = require("./keys");
const { encriptar, validar } = require("./encript");
const { getForgotTemplate } = require('./templates');



const Unauthorized = {
    message: "The credentials are invalids",
    code: 401
}
const Forbidden = {
    message: "You are not allowed to use this route",
    code: 403
}


async function apiAccess(token) {
    try {
        if (!token) return false;

        let parsedToken = JSON.parse(token);
        const sql = `SELECT * FROM usuario WHERE login = '${parsedToken.user}' or email = '${parsedToken.user}'`;

        let { data } = await axios.post(`${DATA_URL}/query`, { sql: sql });
        if (!data[0]) return false;
        let valid = await validar(parsedToken.password, data[0].password)
        if (!valid) return false;

        return { validado: true };
    } catch (error) {
        throw new Error(`Error al validar llave, ${error}`);
    }
}

async function login(usuario, password) {
    if (!usuario || !password) return Unauthorized;
    try {
        const sql = `SELECT * FROM usuario WHERE login = '${usuario}' or email = '${usuario}'`;
        let { data } = await axios.post(`${DATA_URL}/query`, { sql: sql });


        if (!data[0]) return Unauthorized;

        let valid = await validar(password, data[0].password);
        if (!valid) return Unauthorized;

        const token = jwt.sign({ _id: data[0].login }, TOKEN_KEY || "2423503", { expiresIn: 60 * 60 * 24 });
        return { response: { data: data[0] }, token, code: 200 };
    } catch (error) {
        throw new Error(`Error al hacer login, ${error}`);
    }
}

async function signup(newUser) {
    try {
        newUser.password = await encriptar(newUser.password);
        let { data } = await axios.post(`${DATA_URL}/usuario`,{data:newUser});

        newUser.id = data.insertId
        const token = jwt.sign({ _id: newUser.login }, TOKEN_KEY || "2423503", { expiresIn: 60 * 60 * 24 });

        return { response: {  data: newUser },token, code: 200 };
    } catch (error) {
        throw new Error(`Error al hacer signup, ${error}`);
    }
}

async function validate(user_token) {
    try {
        if (!user_token) return Unauthorized;

        let payload = jwt.verify(user_token, TOKEN_KEY || "2423503");

        const sql = `SELECT * FROM usuario WHERE login = '${payload._id}' or email = '${payload._id}'`;
        let { data } = await axios.post(`${DATA_URL}/query`, { sql: sql });

        const response = { data: data[0] };

        return { response, code: 200 };
    } catch (error) {
        if (error.name == "TokenExpiredError") return Forbidden;
        throw new Error(`Error desconocido al validar el token, Error: ${error}`);
    }
}

async function encript(password){
    let pass = await encriptar(password);
    return pass;
}

async function sendRecuperationMail(mail){
    try {
        const sql = `SELECT * FROM usuario WHERE login = '${mail}' or email = '${mail}'`;
        let { data } = await axios.post(`${DATA_URL}/query`, { sql: sql });
        if(!data[0]) return  Unauthorized;
        let hash = crypto.randomBytes(3).toString('hex').toUpperCase();
        let template = getForgotTemplate(data[0].nombre,hash);
        await axios.post(`${dataURL}/usuario/${data[0].id}`, { data: {recovery:hash, recoverydate:moment().format('YYYY-MM-DD hh:mm:ss')} } );
        let transporter = nodemailer.createTransport({
            service:'Gmail',
            port:465,
            secure:false,
            auth:{
                user:'teamlead@somossistemas.com',
                pass:'2979Jose#$'
            }
        });

        let {messageId} = await transporter.sendMail({
            to:data[0].email,
            from:'teamlead@somossistemas.com',
            subject:'Prueba',
            html:template
        });

        if(!messageId) return { code:500, message:'error al enviar correo' };
        return { code:200, message:hash  }

    } catch (error) {
        throw new Error(`Error al mandar el correo, ${error}`);
    }
}


async function validPasswordHash(mail,hash){
    try {
        const sql = `SELECT * FROM usuario WHERE login = '${mail}' or email = '${mail}'`;
        let { data } = await axios.post(`${DATA_URL}/query`, { sql: sql });
        if(!data[0]) return  Unauthorized;
        if(moment().isAfter(data[0].recoverydate, 'hour')) return Unauthorized;
        if(hash!=data[0].recovery) return Unauthorized;
        await axios.post(`${dataURL}/usuario/${data[0].id}`, { data: {recovery:''} } );
        return { code:200, message:'valid' }
    } catch (error) {
        throw new Error(`Error al validar el hash de recuperacion, ${error}`);
    }
}

async function resetPassword(usuario,password){
    if (!usuario || !password) return Unauthorized;
    try {
        const sql = `SELECT * FROM usuario WHERE login = '${usuario}' or email = '${usuario}'`;
        let { data } = await axios.post(`${DATA_URL}/query`, { sql: sql });
        if (!data[0]) return Unauthorized;
        newpass = await encriptar(password);
        await axios.post(`${dataURL}/usuario/${data[0].id}`, { data: {password:newpass}} );
        return { code:201, message:'password changed' }
    } catch (error) {
        throw new Error(`Error al cambiar la contraseña, ${error}`);
    }
}

module.exports = { apiAccess, login, signup, validate,encript,sendRecuperationMail,resetPassword,validPasswordHash }