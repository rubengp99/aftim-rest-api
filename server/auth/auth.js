const axiosUtils = require("./encript")
let { createAxios } = axiosUtils;
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const moment = require('moment');
const { DATA_URL, TOKEN_KEY, NOTS_URL } = require("./keys");
const { encriptar, compareHash } = require("./encript");

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
        return { data: data[0] , token, code: 200 };
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

        return { data: newUser, token, code: 200 };
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
        let template = getForgotTemplate(data[0].nombre);
        
        await connection.post(`/mysql/usuario/${data[0].id}`, { data: { recovery: hash, recoverydate: moment().format('YYYY-MM-DD hh:mm:ss') } });

        connection = createAxios(NOTS_URL, tenantId);

        await connection.post(`/mail/sendmail`, {
            data: {
                message: template,
                subject: "Solicitaste un cambio de contraseña",
                email: data[0].email,
                link: `https://hoyprovoca.com/resetpassword/${data[0].email}/${hash}`,
                type: "PWD_RESET"
            }
        })

        return { code: 200, token: hash }
    } catch (error) {
        throw new Error(`Error al mandar el correo, ${error}`);
    }
}

async function sendVerifyMail(tenantId, mail) {
    try {
        let connection = createAxios(DATA_URL, tenantId);

        const sql = `SELECT * FROM usuario WHERE login = '${mail}' or email = '${mail}'`;
        let { data } = await connection.post(`/mysql/query`, { sql: sql });
        
        if (!data[0]) return Unauthorized;

        let hash = crypto.randomBytes(3).toString('hex').toUpperCase();
        let template = getVerifyTemplate(data[0].nombre);
        
        await connection.post(`/mysql/usuario/${data[0].id}`, { data: { recovery: hash, recoverydate: moment().format('YYYY-MM-DD hh:mm:ss') } });

        connection = createAxios(NOTS_URL, tenantId);

        await connection.post(`/mail/sendmail`, {
            data: {
                message: template,
                subject: "Confirma tu cuenta de hoyprovoca.com",
                email: data[0].email,
                link: `https://hoyprovoca.com/verify/${data[0].email}/${hash}`,
                type: "PWD_VERIFY"
            }
        })

        await connection.post(`/mysql/usuario/${data[0].id}`, { data: { verificado: 1 } });
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

const getForgotTemplate =function(name) {
    //TODO, NEW TEMPLATE
    return  `¡Saludos desde Hoyprovoca.com, ${name}! 
    
    Si no solicitaste este mensaje. Por favor ponte en contacto con teamlead@somossistemas.com o cambia inmediatamente tus credentiales de hoyprovoca.com.
    
    
    Para proceder a recuperar tu contraseña, por favor, haz click en el siguiente enlace.`;
}

const getVerifyTemplate =function(name) {
    //TODO, NEW TEMPLATE
    return  `¡Saludos desde Hoyprovoca.com, ${name}! 
    
    Para poder solicitar un pedido en la plataforma, requerimos que confirmes que eres el propietario de este email. Por favor, haz click en el siguiente enlace.`;
}

module.exports = { apiAccess, login, signup, validate, encript, sendRecuperationMail, sendVerifyMail, resetPassword, validPasswordHash }