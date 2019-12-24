import * as usuarios from '../../helpers/consult';
import * as encript from '../../helpers/encript';
import jwt from 'jsonwebtoken';
import { IUsuario } from './model';
import dotenv from 'dotenv';
dotenv.config();
const model = "usuario";

export const login = async (body:any):Promise<any> =>{
    let {usuario,password} = body;
    if(usuario === '' || password === '') return {message:`Campo vacio, por favor llenar todos los campos`};
    try {
        let user:IUsuario = await usuarios.getUser(usuario);
        if(!user || !encript.validar(password,user.password)) return {message:`Datos de acceso invalidos`};
        const token:string = jwt.sign({_id:user.login},process.env.TOKEN_KEY || "2423503",{ expiresIn: 60 * 60 * 24});
        const response = {token,user};
        return response;
    } catch (error) {
        throw new Error(`Error al iniciar sesion, Error: ${error}`);
    }
}

export const signUp = async (body: any): Promise<any> => {
    const { data } = body;
    const newUser:IUsuario = data; 
    newUser.password = await encript.encriptar(newUser.password);
    try {
        let {insertedId} = await usuarios.create(model,newUser);
        if(!insertedId) return {message:`Error al registrar usuario`};
        const token:string = jwt.sign({_id:newUser.login},process.env.TOKEN_KEY || "2423503",{ expiresIn: 60 * 60 * 24});
        const response = {token,newUser};
        return response;
    } catch (error) {
        throw new Error(`Error al iniciar sesion, Error: ${error}`);
    }
}

export const validarToken = async (body: any): Promise<any> =>{
    const { token } = body;
    try {
        jwt.verify(token,process.env.TOKEN_KEY || "2423503");
    } catch (error) {
        
    }
}