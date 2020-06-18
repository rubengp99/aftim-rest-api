import * as consult from '../../helpers/consult';
import * as links from '../../helpers/links';
import * as respuestas from '../../errors';
import { IUsuario } from './model';
const model = "usuario";


export async function getPedidosByUser (id: string | number, query: any, tenantId: string): Promise<any> {
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;

        let recurso: IUsuario = await consult.getOne(tenantId, model, id, { fields: 'id' });
        
        if (!recurso) return respuestas.ElementNotFound;

        let data: any = await consult.getOtherByMe(tenantId, model, id, 'rest_pedidos', query);
        let totalCount = await consult.countOther(tenantId, model, 'rest_pedidos', id);
        let count = data.length;
        let { limit } = query;

        if (count <= 0) return respuestas.Empty;

        for (let i = 0; i < data.length; i++) {
            let { id } = data[i];
            let pres: any[] = await consult.getOtherByMe(tenantId, 'rest_pedidos', id as string, 'rest_det_pedidos', {});
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

export async function update(params: any,body:any, tenantId: string): Promise<any>{
    let { id } = params;
    let { data } = body;
    let newUser: IUsuario = data;
    try {
        if(isNaN(id)) return respuestas.InvalidID;
        
        let { affectedRows } = await consult.update(tenantId, model, id, newUser) as any;
        let link = links.created(model, id);
        let response = Object.assign({ message: respuestas.Update.message, affectedRows }, { link: link });
        
        return { response, code: respuestas.Update.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error al consultar la base de datos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

export const get = async (query: any, tenantId: string): Promise<any> => {
    try {
        let data: IUsuario[] = await consult.get(model, query);
        let totalCount: number = await consult.count(tenantId, model);
        let count = data.length;
        let { limit } = query;

        if (count <= 0) return respuestas.Empty;

        let link = links.pages(data, model, count, totalCount, limit);
        let response = Object.assign({ totalCount, count, data }, link);
        
        return { response, code: respuestas.Ok.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error al consultar la base de datos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

/**
 * Get a user 
 * @param id id of a group
 * @param query modifier of the consult
 */
export const getOne = async (id: string | number, query: any, tenantId: string): Promise<any> => {
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;

        let data: IUsuario = await consult.getOne(tenantId, model, id, query);
        let count = await consult.count(tenantId, model);

        if (!data) return respuestas.ElementNotFound;

        let link = links.records(data, model, count);
        let response = Object.assign({ data }, link);
        
        return { response, code: respuestas.Ok.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error al consultar la base de datos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

/**
 * Delete a user
 * @param params params request object 
 */
export const remove = async (params:any, tenantId: string): Promise<any> => {
    let { id } = params;
    try {
        if(isNaN(id)) return respuestas.InvalidID;
        
        await consult.remove(tenantId, model, id);
        
        return respuestas.Deleted;
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error al consultar la base de datos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}