import * as usuarios from '../../helpers/consult';
import * as encript from '../../helpers/encript';
import * as links from '../../helpers/links';
import { IUsuario } from './model';

const model = "usuario";

export const login = async (body:any):Promise<any> =>{
    let {usuario,password} = body;
    if(usuario === '' || password === '') return {message:`Campo vacio, por favor llenar todos los campos`};
    try {
        let user = await usuarios.getUser(usuario);
        if(!user || !encript.validar(password,user.password)) return {message:`Datos de acceso invalidos`};
    } catch (error) {
        
    }
}