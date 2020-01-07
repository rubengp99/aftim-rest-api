import * as consult from '../../helpers/consult';
import * as links from '../../helpers/links';
import * as respuestas from '../../errors';
import { IEmpresa } from './model';

const model = "empresa";

/**
 * Get all companies
 * @param query modifier 
 */
export const get = async (query: any): Promise<any> => {
    try {
        let data: IEmpresa[] = await consult.get(model, query);
        let totalCount: number = await consult.count(model); // consulto el total de registros de la BD
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
 * Get one company
 * @param id id of the company
 * @param query modifier of the consult
 */
export const getOne = async (id: string | number, query: any): Promise<any> => {
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;
        let data: IEmpresa = await consult.getOne(model, id, query);
        let count: number = await consult.count(model);
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
 * Get all concepts of a company
 * @param id id of the company 
 * @param query modifier of the consult
 */
export const getConceptsByEmpresa = async (id: string | number, query: any): Promise<any> => {
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;
        let recurso: IEmpresa = await consult.getOne(model, id, { fields: 'id' });

        if (!recurso) return respuestas.ElementNotFound;

        let data: any = await consult.getOtherByMe(model, id, 'conceptos', query);
        let totalCount = await consult.countOther(model, 'conceptos', id);
        let count = data.length;
        let { limit } = query;

        if (count <= 0) return respuestas.Empty;

        let link = links.pages(data, `empresa/${id}/conceptos`, count, totalCount, limit);
        let response = Object.assign({ totalCount, count, data }, link);
        return { response, code: respuestas.Ok.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error en el controlador ${model}, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

/**
 * Get all deposits of a company
 * @param id id of the company 
 * @param query modifier of the consult
 */
export const getDepositsByEmpresa = async (id: string | number, query: any): Promise<any> => {
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;

        let recurso: IEmpresa = await consult.getOne(model, id, { fields: 'id' });

        if (!recurso) return respuestas.ElementNotFound;

        let data: any = await consult.getOtherByMe(model, id, 'depositos', query);
        let totalCount = await consult.countOther(model, 'depositos', id);
        let count = data.length;
        let { limit } = query;

        if (count <= 0) return respuestas.Empty;

        let link = links.pages(data, `empresa/${id}/depositos`, count, totalCount, limit);
        let response = Object.assign({ totalCount, count, data }, link);
        return { response, code: respuestas.Ok.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;

        console.log(`Error en el controlador ${model}, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

/**
 * Get all the groups that use a company
 * @param id id of the company
 * @param query modifier of the consult
 */
export const getGroupsByEmpresa = async (id: string | number, query: any): Promise<any> => {
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;

        let recurso: IEmpresa = await consult.getOne(model, id, { fields: 'id' });

        if (!recurso) return respuestas.ElementNotFound;

        let conceptos: any[] = await consult.getOtherByMe(model, id, 'conceptos', { fields: 'id,grupos_id', orderField: 'grupos_id' });

        if (!conceptos) return respuestas.Empty;

        let grp = conceptos[0].grupos_id;
        let data1:any[]  = [];
        let data = await consult.getOne('grupos', grp, {});
        data1.push(data);
        for (let index = 0; index < conceptos.length; index++) {
            if (conceptos[index].grupos_id !== grp) {
                let group: any = await consult.getOne('grupos', conceptos[index].grupos_id, {});
                data1.push(group[0]);
                grp = conceptos[index].grupos_id;
            }
        }
        let totalCount = await consult.count('grupos');
        let count = data.length;
        let { limit } = query;

        if (count <= 0) return respuestas.Empty;

        let link = links.pages(data, `empresa/${id}/grupos`, count, totalCount, limit);
        let response = Object.assign({ totalCount, count, data }, link);
        return { response, code: respuestas.Ok.code };

    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;

        console.log(`Error en el controlador ${model}, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

/** 
* Get all the groups that use a company
* @param id id of the company
* @param query modifier of the consult
*/
export const getSubgroupsByEmpresa = async (id: string | number, query: any): Promise<any> => {
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;

        let recurso: IEmpresa = await consult.getOne(model, id, { fields: 'id' });

        if (!recurso) return respuestas.ElementNotFound;

        let conceptos: any[] = await consult.getOtherByMe(model, id, 'conceptos', { fields: 'id,subgrupos_id', orderField: 'subgrupos_id' });

        if (!conceptos) return respuestas.Empty;

        let grp = conceptos[0].subgrupos_id;
        let data: any[] = await consult.getOne('subgrupos', grp, {});
        for (let index = 0; index < conceptos.length; index++) {
            if (conceptos[index].subgrupos_id !== grp) {
                let group: any = await consult.getOne('subgrupos', conceptos[index].subgrupos_id, {});
                data.push(group[0]);
                grp = conceptos[index].subgrupos_id;
            }
        }
        let totalCount = await consult.count('subgrupos');
        let count = data.length;
        let { limit } = query;
        
        if (count <= 0) return respuestas.Empty

        let link = links.pages(data, `empresa/${id}/subgrupos`, count, totalCount, limit);
        let response = Object.assign({ totalCount, count, data }, link);
        return { response, code: 200 };

    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;

        console.log(`Error en el controlador ${model}, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

export const getPedidosByEmpresa = async (id: string | number, query: any): Promise<any> =>{
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;

        let recurso: IEmpresa = await consult.getOne(model, id, { fields: 'id' });
        if (!recurso) return respuestas.ElementNotFound;

        let data: any = await consult.getOtherByMe(model, id, 'rest_pedidos', query);
        let totalCount = await consult.countOther(model, 'rest_pedidos', id);
        let count = data.length;
        let { limit } = query;

        if (count <= 0) return respuestas.Empty;
        let link = links.pages(data, `empresa/${id}/pedidos`, count, totalCount, limit);
        let response = Object.assign({ totalCount, count, data }, link);
        return { response, code: respuestas.Ok.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error en el controlador ${model}, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

/**
 * Create a new company
 * @param body data of the new company
 */
export const create = async (body: any): Promise<any> => {
    let { data } = body;
    let newCliente: IEmpresa = data;
    try {
        let { insertId } = await consult.create(model, newCliente);
        let link = links.created(model, insertId);
        let response = Object.assign({ message: respuestas.Created.message}, { link: link });
        return { response, code: respuestas.Created.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;

        console.log(`Error en el controlador ${model}, error: ${error}`);
        return respuestas.InternalServerError;
    }
}


/**
 * Update a company
 * @param params params request object
 * @param body data of the company
 */
export const update = async (params: any, body: any): Promise<any> => {
    const { id } = params;
    let { data } = body;
    let newCliente: IEmpresa = data;

    try {
        if(isNaN(id as number)) return respuestas.InvalidID;

        let { affectedRows } = await consult.update(model, id, newCliente);
        let link = links.created(model, id);
        let response = Object.assign({ message: respuestas.Update.message, affectedRows }, { link: link });
        return { response, code: respuestas.Update.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;

        console.log(`Error en el controlador ${model}, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

/**
 * Delete a company
 * @param params params request object
 */
export const remove = async (params: any): Promise<any> => {
    let { id } = params;
    try {

        if(isNaN(id as number)) return respuestas.InvalidID;

        await consult.remove(model, id);
        return respuestas.Deleted;
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;

        console.log(`Error en el controlador ${model}, error: ${error}`);
        return respuestas.InternalServerError;
    }
}