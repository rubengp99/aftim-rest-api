import * as consult from '../../helpers/consult';
import * as links from '../../helpers/links'
import * as respuestas from '../../errors';
import { ICambio } from './model';

const model = "adm_cambio";

/**
 * Get the last 50 currencies data
 * @param query object modifier of the consult
 */
export const get = async (query: any, tenantId: string): Promise<any> => {
    try {
        let data: ICambio[] = await consult.get(tenantId, model, query);
        let totalCount: number = await consult.count(tenantId, model);
        let count = data.length;
        let { limit = 10 } = query;

        if (count <= 0) return respuestas.Empty;

        let link = links.pages(data, model, count, totalCount, limit);
        let response = Object.assign({ totalCount, count, data }, link);
        return { response, code: respuestas.Ok.code };
    } catch (error) {
        if(error.message ==='BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}

/**
 * Get one currency
 * @param id id of the currency
 * @param query object modifier of the consult
 */
export const getOne = async (id: string | number, query: any, tenantId: string): Promise<any> => {
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;
        let data: ICambio = await consult.getOne(tenantId, model, id, query);
        let count: number = await consult.count(tenantId, model);

        if (!data) return respuestas.ElementNotFound;

        let link = links.records(data, model, count);
        let response = Object.assign({ data }, link);
        return {response,code:respuestas.Ok.code};
    } catch (error) {
        if(error.message ==='BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}

/**
 * Create a new currency
 * @param body data of the currency
 */
export const create = async (body: any, tenantId: string): Promise<any> => {
    let { data } = body;
    let newArea: ICambio = data;
    try {

        let { insertId } = await consult.create(tenantId, model, newArea);
        let link = links.created(model, insertId);
        let response = Object.assign({ message: respuestas.Created.message }, { link: link });

        return { response, code: respuestas.Created.code };
    } catch (error) {
        if(error.message ==='BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}

/**
 * Update a currency data
 * @param params object params request
 * @param body de data of the currency
 */
export const update = async (params: any, body: any, tenantId: string): Promise<any> => {
    const { id } = params;
    let { data } = body;
    let newArea: ICambio = data;
    try {

        if(isNaN(id)) return respuestas.InvalidID;

        let { affectedRows } = await consult.update(tenantId, model, id, newArea);
        let link = links.created(model, id);
        let response = Object.assign({ message:respuestas.Update.message, affectedRows }, { link: link });
        
        return { response, code: respuestas.Update.code };
    } catch (error) {
        if(error.message ==='BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}

/**
 * Delete a currency
 * @param params obejct params request
 */
export const remove = async (params: any, tenantId: string): Promise<any> => {
    let { id } = params;
    try {
        if(isNaN(id)) return respuestas.InvalidID;

        await consult.remove(tenantId, model, id);
        
        return respuestas.Deleted;
    } catch (error) {
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}