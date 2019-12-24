import * as usuarios from '../../helpers/consult';
import * as encript from '../../helpers/encript';
import jwt from 'jsonwebtoken';
import { IUsuario } from './model';
import dotenv from 'dotenv';
dotenv.config();
const model = "usuario";

/**
 * Validate the user data
 * @param body user data
 */
export const login = async (body:any):Promise<any> =>{
    let {usuario,password} = body;
    if(usuario === '' || password === '') return {message:`Invalid access`,code:401};
    try {
        let user:IUsuario = await usuarios.getUser(usuario);
        if(!user || !encript.validar(password,user.password)) return {message:`Invalid access`,code:401};
        const token:string = jwt.sign({_id:user.login},process.env.TOKEN_KEY || "2423503",{ expiresIn: 60 * 60 * 24});
        const response = {token,data:user,code:200};
        return response;
    } catch (error) {
        throw new Error(`Error al iniciar sesion, Error: ${error}`);
    }
}


/**
 * Regist a new user
 * @param body user data
 */
export const signUp = async (body: any): Promise<any> => {
    const { data } = body;
    const newUser:IUsuario = data; 
    newUser.password = await encript.encriptar(newUser.password);
    try {
        let {insertedId} = await usuarios.create(model,newUser);
        if(!insertedId) return {message:`Error al registrar usuario`,code:500};
        const token:string = jwt.sign({_id:newUser.login},process.env.TOKEN_KEY || "2423503",{ expiresIn: 60 * 60 * 24});
        const response = {token,data:newUser,code:200};
        return response;
    } catch (error) {
        throw new Error(`Error al iniciar sesion, Error: ${error}`);
    }
}

/**
 * Validate a token
 * @param headers headers request object
 */
export const validarToken = async (headers: any): Promise<any> =>{
    const { user_token }  = headers;
    try {
        if(!user_token) return {message:`Ivalid access`,code:401};
        let payload:any = jwt.verify(user_token,process.env.TOKEN_KEY || "2423503");
        let user:IUsuario = await usuarios.getUser(payload._id);

        if(!user) return {message:`Invalid access`,code:401};
        const response = { data:user,code:200 };
        return response
    } catch (error) {
        if(error.name=="TokenExpiredError") return {message:`Token expired`,code:403};
        throw new Error(`Error desconocido al iniciar sesion, Error: ${error}`);
    }
}