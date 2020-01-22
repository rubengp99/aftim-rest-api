import * as consult from '../../helpers/consult';
import { IDeposito } from './model';
import * as respuestas from '../../errors';
import * as links from '../../helpers/links';
const model = "depositos";


/**
 * Get all the deposits
 * @param query modifier of the consult
 */
export const get = async (query: any): Promise<any> => {
    try {
        let data: IDeposito[] = await consult.get(model, query);
        let totalCount: number = await consult.count(model);
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
 * Get one deposit
 * @param id id of the deposit
 * @param query modifier of the consult
 */
export const getOne = async (id: string | number, query: any): Promise<any> => {
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;

        let data: IDeposito = await consult.getOne(model, id, query);
        let count = await consult.count(model);

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
 * Get all the concepts attached to a deposit
 * @param id id of the deposit
 * @param query modifier of the consult
 */
export const getConceptosBydeposito = async (id: string | number, query: any): Promise<any> => {
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;
        
        let recurso: IDeposito = await consult.getOne(model, id, { fields: 'id' });

        if (!recurso) return respuestas.ElementNotFound;

        let data: any = await consult.getOtherByMe(model, id, 'movimiento_deposito', {});
        let conceptos: any[] = [];
        for (let index = 0; index < data.length; index++) {
            let concepto = await consult.getOne('conceptos', data[index].conceptos_id, query);
            conceptos.push(concepto);
        }

        let totalCount = await consult.count('conceptos');
        let count = conceptos.length;
        let { limit } = query;
        
        if (count <= 0) return respuestas.Empty;
        console.log(conceptos);
        let link = links.pages(conceptos, `${model}/${id}/conceptos`, count, totalCount, limit);
        let response = Object.assign({ totalCount, count, data: conceptos }, link);
        return { response, code: respuestas.Ok.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error al consultar la base de datos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

/**
 * Create a new deposit
 * @param body data of the new deposit
 */
export const create = async (body: any): Promise<any> => {
    let { data } = body;
    let newdeposito: IDeposito = data;
    try {
        let { insertId } = await consult.create(model, newdeposito) as any;
        let link = links.created(model, insertId);
        let response = Object.assign({ message: respuestas.Created.message}, { link: link });
        return { response, code: respuestas.Created.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error al consultar la base de datos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

/**
 * Update a deposit
 * @param params params request object
 * @param body data of the deposit
 */
export const update = async (params: any, body: any): Promise<any> => {
    let { id } = params;
    let { data } = body;
    let newdeposito: IDeposito = data;
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;

        let { affectedRows } = await consult.update(model, id, newdeposito) as any;
        let link = links.created('depositos', id);
        let response = Object.assign({ message: respuestas.Update.message, affectedRows }, { link: link });
        return { response, code: respuestas.Update.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error al consultar la base de datos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

/**
 * Delete one deposit
 * @param params params request object
 */
export const remove = async (params: any): Promise<any> => {
    let { id } = params;
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;

        await consult.remove(model, id);
        return respuestas.Deleted;
    } catch (error) {
        console.log(`Error al consultar la base de datos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}