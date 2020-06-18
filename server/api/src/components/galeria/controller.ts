import * as consult from '../../helpers/consult';
import * as links from '../../helpers/links';
import * as respuestas from '../../errors';
import { IGaleria } from './model';

const model = "rest_galeria";


/**
 * Get all photos
 * @param query modifier of the consult
 */
export const get = async (query: any, tenantId: string): Promise<any> => {
    try {
        let data: IGaleria[] = await consult.get(tenantId, model, query);
        let totalCount: number = await consult.count(tenantId, model);
        let count = data.length;
        let { limit } = query;

        if (count <= 0) return respuestas.Empty;

        let link = links.pages(data, 'galeria', count, totalCount, limit);
        let response = Object.assign({ totalCount, count, data }, link);
        return { response, code: respuestas.Ok.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error al consultar la base de datos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

/**
 * Get one photo
 * @param id id of the photo
 * @param query modifier of the consult
 */
export const getOne = async (id: string | number, query: any, tenantId: string): Promise<any> => {
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;

        let data: IGaleria = await consult.getOne(tenantId, model, id, query);
        let count: number = await consult.count(tenantId, model);
        if (!data) return respuestas.ElementNotFound;
        let link = links.records(data, 'galeria', count);

        let response = Object.assign({ data }, link);
        
        return {response,code:respuestas.Ok.code};
    } catch (error) {
        if(error.message==='BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error al consultar la base de datos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

/**
 * Create a photo
 * @param body data of the new photo
 */
export const create = async (body: any, tenantId: string): Promise<any> => {
    let { data } = body;
    let newArea: IGaleria = data;
    try {
        let { insertId } = await consult.create(tenantId, model, newArea);
        let link = links.created('galeria', insertId);
        let response = Object.assign({ message: respuestas.Created.message }, { link: link });
        
        return { response, code: respuestas.Created.code };
    } catch (error) {
        if(error.message==='BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error al consultar la base de datos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

/**
 * Update a photo
 * @param params paramas request object
 * @param body data of the photo
 */
export const update = async (params: any, body: any, tenantId: string): Promise<any> => {
    const { id } = params;
    let { data } = body;
    let newArea: IGaleria = data;

    try {
        if(isNaN(id)) return respuestas.InvalidID;
        
        let { affectedRows } = await consult.update(tenantId, model, id, newArea);
        let link = links.created('galeria', id);
        let response = Object.assign({ message: respuestas.Update.message, affectedRows }, { link: link });
        
        return { response, code: respuestas.Update.code};
    } catch (error) {
        if(error.message==='BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error al consultar la base de datos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

/**
 * Delete a photo 
 * @param params params request object
 */
export const remove = async (params: any, tenantId: string): Promise<any> => {
    let { id } = params;
    try {
        if(isNaN(id)) return respuestas.InvalidID;
        
        await consult.remove(tenantId, model, id);
        
        return respuestas.Deleted;
    } catch (error) {
        if(error.message==='BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error al consultar la base de datos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}