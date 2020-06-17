const bcrypt = require("bcryptjs");
async function encriptar (password){
    try {
        
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(password,salt);
        return hash;
    } catch (error) {
        throw new Error(`Error al encriptar contraseña, Error: ${error}`);
    }
}
async function validar (password,hash){
    try {
        let valido = await bcrypt.compare(password,hash);
        console.log(valido);
        return valido;
    } catch (error) {
        throw new Error(`Error al validar contraseña, Error: ${error}`);
    }
    
}

//non ts function version
function createAxios(tenantId){
    return axios.create({
        withCredentials: false,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'tenantId': tenantId
        }
    })
}

function getTenantId(req) {
    return req.headers['tenant-id'];
}

module.exports = { encriptar, validar, createAxios, getTenantId }