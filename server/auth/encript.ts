const bcrypt = require("bcryptjs");

async function encriptar (password: string){
    try {
        
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(password,salt);
        return hash;
    } catch (error) {
        throw new Error(`Error al encriptar contraseña, Error: ${error}`);
    }
}
async function validar (password: string ,hash: string){
    try {
        let valido = await bcrypt.compare(password,hash);
        console.log(valido);
        return valido;
    } catch (error) {
        throw new Error(`Error al validar contraseña, Error: ${error}`);
    }
    
}

module.exports = { encriptar, validar }