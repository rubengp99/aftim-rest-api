const axiosUtils = require("./encript")
let { createAxios } = axiosUtils;
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const moment = require('moment');
const { DATA_URL, TOKEN_KEY, NOTS_URL } = require("./keys");
const { encriptar, compareHash } = require("./encript");
const { getForgotTemplate } = require('./templates');

const Unauthorized = {
    message: "The credentials are invalids",
    code: 401
}
const Forbidden = {
    message: "You are not allowed to use this route",
    code: 403
}

const Conflict = {
    message: "This entity already exists",
    code: 409
}

async function apiAccess(tenantId, token) {
    try {
        let connection = createAxios(DATA_URL, tenantId);
        if (!token) return false;
        
        let parsedToken = JSON.parse(token);
        const sql = `SELECT * FROM usuario WHERE login = '${parsedToken.user}' or email = '${parsedToken.user}'`;

        let { data } = await connection.post(`/mysql/query`, { sql: sql });
        if (!data[0]) return false;
        let valid = await compareHash(parsedToken.password, data[0].password)
        if (!valid) return false;

        return { validado: true };
    } catch (error) {
        throw new Error(`Error al compareHash llave, ${error}`);
    }
}

async function login(tenantId, usuario, password) {
    if (!usuario || !password) return Unauthorized;
    try {
        let connection = createAxios(DATA_URL, tenantId);

        const sql = `SELECT * FROM usuario WHERE login = '${usuario}' or email = '${usuario}'`;
        let { data } = await connection.post(`/mysql/query`, { sql: sql });


        if (!data[0]) return Unauthorized;

        let valid = await compareHash(password, data[0].password);
        if (!valid) return Unauthorized;

        const token = jwt.sign({ _id: data[0].login }, TOKEN_KEY || "2423503", { expiresIn: 60 * 60 * 24 });
        return { response: { data: data[0] }, token, code: 200 };
    } catch (error) {
        throw new Error(`Error al hacer login, ${error}`);
    }
}

async function signup(tenantId, newUser) {
    try {
        let connection = createAxios(DATA_URL, tenantId);

        const sql = `SELECT * FROM usuario WHERE login = '${newUser.login}' or email = '${newUser.email}'`;
        let  { check }  = await connection.post(`/mysql/query`, { sql: sql });
        if (check) return Conflict;

        newUser.password = await encriptar(newUser.password);
        let { data } = await connection.post(`/mysql/usuario`, { data: newUser });

        newUser.id = data.insertId
        const token = jwt.sign({ _id: newUser.login }, TOKEN_KEY || "2423503", { expiresIn: 60 * 60 * 24 });

        return { response: { data: newUser }, token, code: 200 };
    } catch (error) {
        throw new Error(`Error al hacer signup, ${error}`);
    }
}

async function validate(tenantId, user_token) {
    try {
        let connection = createAxios(DATA_URL, tenantId);
        if (!user_token) return Unauthorized;

        let payload = jwt.verify(user_token, TOKEN_KEY || "2423503");

        const sql = `SELECT * FROM usuario WHERE login = '${payload._id}' or email = '${payload._id}'`;
        let { data } = await connection.post(`/mysql/query`, { sql: sql });

        const response = { data: data[0] };

        return { response, code: 200 };
    } catch (error) {
        if (error.name == "TokenExpiredError") return Forbidden;
        throw new Error(`Error desconocido al compareHash el token, Error: ${error}`);
    }
}

async function encript(password) {
    let pass = await encriptar(password);
    return pass;
}

async function sendRecuperationMail(tenantId, mail) {
    try {
        let connection = createAxios(DATA_URL, tenantId);

        const sql = `SELECT * FROM usuario WHERE login = '${mail}' or email = '${mail}'`;
        let { data } = await connection.post(`/mysql/query`, { sql: sql });
        
        if (!data[0]) return Unauthorized;

        let hash = crypto.randomBytes(3).toString('hex').toUpperCase();
        let template = getForgotTemplate(data[0].nombre, hash);
        await connection.post(`/mysql/usuario/${data[0].id}`, { data: { recovery: hash, recoverydate: moment().format('YYYY-MM-DD hh:mm:ss') } });

        await connection.post(`${NOTS_URL}/sendmail`, {
            data: {
                message: template,
                mail: data[0].email
            }
        })

        return { code: 200, token: hash }
    } catch (error) {
        throw new Error(`Error al mandar el correo, ${error}`);
    }
}


async function validPasswordHash(tenantId, mail, hash) {
    try {
        let connection = createAxios(DATA_URL, tenantId);

        const sql = `SELECT * FROM usuario WHERE login = '${mail}' or email = '${mail}'`;
        let { data } = await connection.post(`/mysql/query`, { sql: sql });
        
        if (!data[0]) return Unauthorized;
        if (moment().isAfter(data[0].recoverydate, 'hour')) return Unauthorized;
        if (hash != data[0].recovery) return Unauthorized;
        
        await connection.post(`/mysql/usuario/${data[0].id}`, { data: { recovery: '' } });
        
        return { code: 200, message: 'valid' }
    } catch (error) {
        throw new Error(`Error al compareHash el hash de recuperacion, ${error}`);
    }
}

async function resetPassword(tenantId, usuario, password) {
    if (!usuario || !password) return Unauthorized;
    try {
        let connection = createAxios(DATA_URL, tenantId);

        const sql = `SELECT * FROM usuario WHERE login = '${usuario}' or email = '${usuario}'`;
        let { data } = await connection.post(`/mysql/query`, { sql: sql });
        
        if (!data[0]) return Unauthorized;
        let newpass = await encriptar(password);
        await connection.post(`/mysql/usuario/${data[0].id}`, { data: { password: newpass } });
        
        return { code: 201, message: 'password changed' }
    } catch (error) {
        throw new Error(`Error al cambiar la contraseña, ${error}`);
    }
}

module.exports = { apiAccess, login, signup, validate, encript, sendRecuperationMail, resetPassword, validPasswordHash }