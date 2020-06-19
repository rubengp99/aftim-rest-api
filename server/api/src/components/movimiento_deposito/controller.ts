import * as consult from '../../helpers/consult';
import * as respuestas from '../../errors';
import { IMovimientoDeposito } from './model';
import * as links from '../../helpers/links';
const model = "adm_movimiento_deposito";


/**
 * Get all deposits movements
 * @param query modifier of the consult
 */
export const get = async (query: any, tenantId: string): Promise<any> => {
    try {
        let data: IMovimientoDeposito[] = await consult.get(tenantId, model, query);
        let totalCount: number = await consult.count(tenantId, model);
        let count = data.length;
        let { limit } = query;

        if (count <=  0) return respuestas.Empty;

        let link = links.pages(data, model, count, totalCount, limit);
        let response = Object.assign({ totalCount, count, data }, link);
        return response;

    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}

/**
 * Get  a deposit movement
 * @param id id of the object
 * @param query modifier of the consult
 */
export const getOne = async (id: string | number, query: any, tenantId: string): Promise<any> => {
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;

        let data: IMovimientoDeposito = await consult.getOne(tenantId, model, id, query);
        let count = await consult.count(tenantId, model);

        if (!data) return respuestas.ElementNotFound;

        let link = links.records(data, model, count);
        let response = Object.assign({ data }, link);
        
        return response;
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}

/**
 * Create a new deposit movement
 * @param body data of the object
 */
export const create = async (body: any, tenantId: string): Promise<any> => {
    let { data } = body;
    let newMovDep: IMovimientoDeposito = data;
    try {
        let { insertId } = await consult.create(tenantId, model, newMovDep) as any;
        let link = links.created(model, insertId);
        let response = Object.assign({ message: respuestas.Created.message }, { link: link });
        
        return { response, code: respuestas.Created.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}

/**
 * Update a movement
 * @param params params request object
 * @param body data of the object
 */
export const update = async (params:any, body: any, tenantId: string): Promise<any> => {
    let { id } = params;
    let { data } = body;
    let newMovDep: IMovimientoDeposito = data;
    try {
        if(isNaN(id)) return respuestas.InvalidID;
        
        let data: IMovimientoDeposito[] = await consult.getOtherByMe(tenantId, 'adm_conceptos', id, model, {fields:'id'});
        
        if(!data) return respuestas.ElementNotFound;
        
        let { affectedRows } = await consult.update(tenantId, model, data[0].id as number, newMovDep) as any;
        let link = links.created(model, id);
        let response = Object.assign({ message: respuestas.Update.message, affectedRows }, { link: link });
        
        return { response, code: respuestas.Update.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}

/**
 * Delete a movement
 * @param params params request object
 */
export const remove = async (params: any, tenantId: string): Promise<any> => {
    let { id } = params;
    try {
        if(isNaN(id)) return respuestas.InvalidID;
        
        await consult.remove(tenantId, model, id);
        
        return respuestas.Deleted
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}