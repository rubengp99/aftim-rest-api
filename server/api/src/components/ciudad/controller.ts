import * as consult from '../../helpers/consult';
import * as links from '../../helpers/links'
import * as respuestas from '../../errors';
import { ICiudad } from './model';

const model = "adm_ciudad";


/**
 * Get all cities
 * @param query modifier of the consult
 */
export const get = async (query: any, tenantId: string): Promise<any> => {
    try {
        let data: ICiudad[] = await consult.get(tenantId, model, query);
        let totalCount: number = await consult.count(tenantId, model);
        let count = data.length;
        let { limit } = query;

        if (count <= 0) return respuestas.Empty;

        let link = links.pages(data, model, count, totalCount, limit);
        let response = Object.assign({ totalCount, count, data }, link);
        
        return { response, code: respuestas.Ok.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error en el controlador ${model}, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

/**
 * Get one city
 * @param id id of the city
 * @param query modifier of the consult
 */
export const getOne = async (id: string | number, query: any, tenantId: string): Promise<any> => {
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;
        
        let data: ICiudad = await consult.getOne(tenantId, model, id, query);
        let count: number = await consult.count(tenantId, model);
        
        if (!data) return respuestas.ElementNotFound;
        
        let link = links.records(data, model, count);
        let response = Object.assign({ data }, link);
        
        return { response, code: respuestas.Ok.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error en el controlador ${model}, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

/**
 * Create a new city
 * @param body data of the new city
 */
export const create = async (body: any, tenantId: string): Promise<any> => {
    let { data } = body;
    let newCargo: ICiudad = data;
    try {
        let { insertId } = await consult.create(tenantId, model, newCargo);
        let link = links.created(model, insertId);
        let response = Object.assign({ message: respuestas.Created.message}, { link: link });
        
        return { response, code: respuestas.Created.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error en el controlador ${model}, error: ${error}`);
        return respuestas.InternalServerError;
    }
}