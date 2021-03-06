import * as consult from "../../helpers/consult";
import * as links from "../../helpers/links";
import * as respuestas from "../../errors";
import { IObjetivo } from "./model";
import { dataURL } from "keys";

const model = "objetivos_ventas";

/**
 * Get all last objetivo
 * @param query modifier of the consult
 */
export const get = async (query: any, tenantId: string): Promise<any> => {
    try {

        let data: IObjetivo[] = await consult.get(tenantId, model, query);
        let totalCount: number = await consult.count(tenantId, model); // consulto el total de registros de la BD
        let count = data.length;
        let { limit } = query;

        if (count <= 0) return respuestas.Empty;

        let link = links.pages(data, model, count, totalCount, limit);
        let response = Object.assign({ totalCount, count, data }, link);
        
        return { response, code: respuestas.Ok.code };
    } catch (error) {
        if (error.message === "BD_SYNTAX_ERROR") return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
};

/**
 * Get one objetivo
 * @param id id of the objetivo
 * @param query modifier of the consult
 */
export const getOne = async (id: string | number, query: any, tenantId: string): Promise<any> => {
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;

        let data: IObjetivo[] = await consult.getOne(tenantId,model, id, query);
        let count: number = await consult.count(tenantId,model);

        if (!data) return respuestas.ElementNotFound;

        let link = links.records(data, model, count);
        let response = Object.assign({ data }, link);
        
        return { response, code: respuestas.Ok.code };
    } catch (error) {
        if (error.message === "BD_SYNTAX_ERROR") return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
};

/**
 * Create a new objetivo
 * @param body data of the new objetivo
 */
export const create = async (body: any, tenantId: string): Promise<any> => {
    let { data } = body;
    let newObjetivo: IObjetivo = data;

    try {
        let { insertId } = await consult.create(tenantId,model, newObjetivo);
        let link = links.created(model, insertId);
        let response = Object.assign({ message: respuestas.Created.message }, { link: link });
        
        return { response, code: respuestas.Created.code };
    } catch (error) {
        if (error.message == 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}
/**
 * Update an objetivo
 * @param params params request object
 * @param body data of the objetivo
 */
export const update = async (params: any, body: any, tenantId: string): Promise<any> => {
    const { id } = params;
    let { data } = body;
    let newObjetivo: IObjetivo = data;

    try {
        if (isNaN(id as number)) return respuestas.InvalidID;

        let { affectedRows } = await consult.update(tenantId, model, id, newObjetivo);
        let link = links.created(model, id);
        let response = Object.assign({ message: respuestas.Update.message, affectedRows }, { link: link });
        
        return { response, code: respuestas.Update.code };
    } catch (error) {
        if (error.message == 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}

/**
 * Delete a objetivo
 * @param params params request object
 */
export const remove = async (params: any, tenantId: string): Promise<any> => {
    let { id } = params;
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;

        await consult.remove(tenantId,model, id);
        
        return respuestas.Deleted;
    } catch (error) {
        if (error.message == 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}
