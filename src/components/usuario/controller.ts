import * as consult from '../../helpers/consult';
import * as encript from '../../helpers/encript';
import * as links from '../../helpers/links';
import * as respuestas from '../../errors';
import { tokenKey } from '../../keys';
import jwt from 'jsonwebtoken';
import { IUsuario } from './model';
const model = "usuario";

/**
 * Validate the user data
 * @param body user data
 */
export const login = async (body: any): Promise<any> => {
    let { usuario, password } = body.data;
    if (usuario === '' || password === '') return respuestas.Unauthorized;
    console.log(usuario,password);
    try {
        let user: IUsuario = await consult.getUser(usuario);
        console.log(user);
        if (!user) return respuestas.Unauthorized;
        let valido = await encript.validar(password, user.password);
        if (!valido) return respuestas.Unauthorized;
        const token: string = jwt.sign({ _id: user.login }, tokenKey || "2423503", { expiresIn: 60 * 60 * 24 });
        const response = { data: user };
        return { response, token, code: respuestas.Ok.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error en el controlador ${model}, error: ${error}`);
        return respuestas.InternalServerError;
    }
}


/**
 * Regist a new user
 * @param body user data
 */
export const signUp = async (body: any): Promise<any> => {
    const { data } = body;
    const newUser: IUsuario = data;
    console.log(data,newUser);
    newUser.password = await encript.encriptar(newUser.password);
    try {
        let { insertId } = await consult.create(model, newUser);
        const token: string = jwt.sign({ _id: newUser.login }, tokenKey || "2423503", { expiresIn: 60 * 60 * 24 });
        newUser.id = insertId;
        const response = { data: newUser }
        return { token, response, code: respuestas.Created.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error en el controlador ${model}, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

/**
 * Validate a token
 * @param headers headers request object
 */
export const validarToken = async (headers: any): Promise<any> => {
    const { user_token } = headers;
    try {
        if (!user_token) return respuestas.Unauthorized;
        let payload: any = jwt.verify(user_token, tokenKey || "2423503");
        let user: IUsuario = await consult.getUser(payload._id);

        if (!user) return respuestas.Unauthorized;
        const response = { data: user };
        return { response, code: respuestas.Ok.code };
    } catch (error) {
        if (error.name == "TokenExpiredError") return respuestas.Forbidden;
        if (error.message == "BD_SYNTAX_ERROR") return respuestas.BadRequest;
        console.log(`Error desconocido al iniciar sesion, Error: ${error}`);
        return respuestas.InternalServerError;
    }
}

export const getPedidosByUser = async (id: string | number, query: any): Promise<any> => {
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;

        let recurso: IUsuario = await consult.getOne(model, id, { fields: 'id' });
        if (!recurso) return respuestas.ElementNotFound;

        let data: any = await consult.getOtherByMe(model, id, 'rest_pedidos', query);
        let totalCount = await consult.countOther(model, 'rest_pedidos', id);
        let count = data.length;
        let { limit } = query;

        if (count <= 0) return respuestas.Empty;

        for (let i = 0; i < data.length; i++) {
            let { id } = data[i];
            let pres: any[] = await consult.getOtherByMe('rest_pedidos', id as string, 'rest_det_pedidos', {});
            data[i].detalles = pres;
        }

        let link = links.pages(data, `usuario/${id}/pedidos`, count, totalCount, limit);
        let response = Object.assign({ totalCount, count, data }, link);
        return { response, code: respuestas.Ok.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error en el controlador ${model}, error: ${error}`);
        return respuestas.InternalServerError;
    }
}