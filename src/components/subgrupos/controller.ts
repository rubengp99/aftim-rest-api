import * as consult from '../../helpers/consult';
import * as respuestas from '../../errors';
import { ISubgrupo } from './model';
import * as links from '../../helpers/links';
const model = "subgrupos";


/**
 * Get all subgroups
 * @param query identifier of the consult
 */
export const get = async (query: any): Promise<any> => {
    try {
        let data: ISubgrupo[] = await consult.get(model, query);
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
 * Get a subgroup 
 * @param id id of a group
 * @param query modifier of the consult
 */
export const getOne = async (id: string | number, query: any): Promise<any> => {
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;

        let data: ISubgrupo = await consult.getOne(model, id, query);
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
 * Get all the concepts of one subgroup
 * @param id id of the subgroup
 * @param query modifier of the consult
 */
export const getConceptosBySubgrupo = async (id: string | number, query: any): Promise<any> => {
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;

        let recurso: ISubgrupo = await consult.getOne(model, id, { fields: 'id' });
        if (!recurso) return respuestas.ElementNotFound;

        let data: any = await consult.getOtherByMe(model, id, 'conceptos', query);
        let totalCount = await consult.countOther(model, 'conceptos', id);
        let count = data.length;
        let { limit } = query;

        if (count <= 0) return respuestas.Empty;
        let link = links.pages(data, `grupos/${id}/conceptos`, count, totalCount, limit);
        let response = Object.assign({ totalCount, count, data }, link);
        return { response, code: respuestas.Ok.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error al consultar la base de datos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

/**
 * Create a new subgroup
 * @param body 
 */
export const create = async (body:any,file:any): Promise<any> => {
    let { data } = body;
    let { filename = 'default.png' } = file;
    let newGrupo: ISubgrupo = data;
    newGrupo.imagen = filename;
    try {
        let { insertId } = await consult.create(model, newGrupo) as any;
        let link = links.created(model, insertId);
        newGrupo.id = insertId;
        let response = Object.assign({ message: respuestas.Created.message, data:newGrupo }, { link: link });
        return { response, code: respuestas.Created.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error al consultar la base de datos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

/**
 * Update a subgroup
 * @param params params request 
 * @param body data of the subgroup
 */
export const update = async (params:any, body:any): Promise<any> => {
    let { id } = params;
    let { data } = body;
    
    let newGrupo: ISubgrupo = data;
    try {
        if(isNaN(id)) return respuestas.InvalidID;
        let { affectedRows } = await consult.update(model, id, newGrupo);
        let link = links.created(model, id);
        let response = Object.assign({ message: respuestas.Update.message, affectedRows }, { link: link });
        return { response, code: respuestas.Update.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error al consultar la base de datos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

/**
 * Delete a subgroup
 * @param params params requeste object
 */
export const remove = async (params:any): Promise<any> => {
    let { id } = params;
    try {
        
        if(isNaN(id)) return respuestas.InvalidID;
        await consult.remove(model, id);
        return respuestas.Deleted;
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error al consultar la base de datos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}