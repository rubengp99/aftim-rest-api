import * as empresa from '../../helpers/consult';
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
        let data: IEmpresa[] = await empresa.get(model, query);
        let totalCount: number = await empresa.count(model); // consulto el total de registros de la BD
        let count = data.length;
        let { limit } = query;
        if (count > 0) {
            let link = links.pages(data, model, count, totalCount, limit);
            let response = Object.assign({ totalCount, count, data }, link);
            return response;
        } else {
            return { message: "No se encontraron registros" };
        }
    } catch (error) {
        throw new Error(`Error en el controlador ${model}, error: ${error}`);
    }
}

/**
 * Get one company
 * @param id id of the company
 * @param query modifier of the consult
 */
export const getOne = async (id: string | number, query: any): Promise<any> => {
    try {
        if (isNaN(id as number)) {
            return { message: `${id} no es un ID valido` };
        }
        let data: IEmpresa[] = await empresa.getOne(model, id, query);
        let count: number = await empresa.count(model);
        if (data[0]) {
            let link = links.records(data, model, count);
            let response = Object.assign({ data }, link);
            return response;
        } else {
            return { message: "No se encontro el recurso indicado" };
        }
    } catch (error) {
        throw new Error(`Error en el controlador ${model}, error: ${error}`);
    }
}


/**
 * Get all concepts of a company
 * @param id id of the company 
 * @param query modifier of the consult
 */
export const getConceptsByEmpresa = async (id: string | number, query: any): Promise<any> => {
    try {
        if (isNaN(id as number)) {
            return { message: `${id} no es un ID valido` };
        }
        let recurso: IEmpresa = await empresa.getOne(model, id, { fields: 'id' });
        if (!recurso) {
            return { response: { message: "No se encontro el recurso indicado" }, code: 404 };
        }

        let data: any = await empresa.getOtherByMe(model, id, 'conceptos', query);
        let totalCount = await empresa.countOther(model, 'conceptos', id);
        let count = data.length;
        let { limit } = query;
        if (count > 0) {
            let link = links.pages(data, `empresa/${id}/conceptos`, count, totalCount, limit);
            let response = Object.assign({ totalCount, count, data }, link);
            return { response, code: 200 };
        } else {
            return { response: { count, totalCount, message: "No se encontraron registros" }, code: 200 };
        }
    } catch (error) {
        throw new Error(`Error en el controlador ${model}, error: ${error}`);
    }
}

/**
 * Get all deposits of a company
 * @param id id of the company 
 * @param query modifier of the consult
 */
export const getDepositsByEmpresa = async (id: string | number, query: any): Promise<any> => {
    try {
        if (isNaN(id as number)) {
            return { message: `${id} no es un ID valido` };
        }
        let recurso: IEmpresa = await empresa.getOne(model, id, { fields: 'id' });
        if (!recurso) {
            return { response: { message: "No se encontro el recurso indicado" }, code: 404 };
        }

        let data: any = await empresa.getOtherByMe(model, id, 'depositos', query);
        let totalCount = await empresa.countOther(model, 'depositos', id);
        let count = data.length;
        let { limit } = query;
        if (count > 0) {
            let link = links.pages(data, `empresa/${id}/depositos`, count, totalCount, limit);
            let response = Object.assign({ totalCount, count, data }, link);
            return { response, code: 200 };
        } else {
            return { response: { count, totalCount, message: "No se encontraron registros" }, code: 200 };
        }
    } catch (error) {
        throw new Error(`Error en el controlador ${model}, error: ${error}`);
    }
}

/**
 * Get all the groups that use a company
 * @param id id of the company
 * @param query modifier of the consult
 */
export const getGroupsByEmpresa = async (id: string | number, query: any): Promise<any> => {
    try {
        if (isNaN(id as number))
            return { message: `${id} no es un ID valido` };

        let recurso: IEmpresa = await empresa.getOne(model, id, { fields: 'id' });

        if (!recurso)
            return { response: { message: "No se encontro el recurso indicado" }, code: 404 };

        let conceptos: any[] = await empresa.getOtherByMe(model, id, 'conceptos', { fields: 'id,grupos_id', orderField: 'grupos_id' });

        if (!conceptos)
            return { response: { message: "No se encontro el recurso indicado" }, code: 404 };

        let grp = conceptos[0].grupos_id;
        let data: any[] = await empresa.getOne('grupos', grp, {});
        for (let index = 0; index < conceptos.length; index++) {
            if (conceptos[index].grupos_id !== grp) {
                let group: any = await empresa.getOne('grupos', conceptos[index].grupos_id, {});
                data.push(group[0]);
                grp = conceptos[index].grupos_id;
            }
        }
        let totalCount = await empresa.count('grupos');
        let count = data.length;
        let { limit } = query;
        if (count > 0) {
            let link = links.pages(data, `empresa/${id}/grupos`, count, totalCount, limit);
            let response = Object.assign({ totalCount, count, data }, link);
            return { response, code: 200 };
        } else {
            return { response: { count, totalCount, message: "No se encontraron registros" }, code: 200 };
        }

    } catch (error) {
        throw new Error(`Error en el controlador ${model}, error: ${error}`);
    }
}

/* Get all the groups that use a company
* @param id id of the company
* @param query modifier of the consult
*/
export const getSubgroupsByEmpresa = async (id: string | number, query: any): Promise<any> => {
    try {
        if (isNaN(id as number))
            return { message: `${id} no es un ID valido` };

        let recurso: IEmpresa = await empresa.getOne(model, id, { fields: 'id' });

        if (!recurso)
            return { response: { message: "No se encontro el recurso indicado" }, code: 404 };

        let conceptos: any[] = await empresa.getOtherByMe(model, id, 'conceptos', { fields: 'id,subgrupos_id', orderField: 'subgrupos_id' });

        if (!conceptos)
            return { response: { message: "No se encontro el recurso indicado" }, code: 404 };

        let grp = conceptos[0].subgrupos_id;
        let data: any[] = await empresa.getOne('subgrupos', grp, {});
        for (let index = 0; index < conceptos.length; index++) {
            if (conceptos[index].subgrupos_id !== grp) {
                let group: any = await empresa.getOne('subgrupos', conceptos[index].subgrupos_id, {});
                data.push(group[0]);
                grp = conceptos[index].subgrupos_id;
            }
        }
        let totalCount = await empresa.count('subgrupos');
        let count = data.length;
        let { limit } = query;
        if (count > 0) {
            let link = links.pages(data, `empresa/${id}/subgrupos`, count, totalCount, limit);
            let response = Object.assign({ totalCount, count, data }, link);
            return { response, code: 200 };
        } else {
            return { response: { count, totalCount, message: "No se encontraron registros" }, code: 200 };
        }

    } catch (error) {
        throw new Error(`Error en el controlador ${model}, error: ${error}`);
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
        let { insertId } = await empresa.create(model, newCliente);
        let link = links.created(model, insertId);
        let response = Object.assign({ message: "Registro insertado en la base de datos" }, { link: link });
        return { response, code: 201 };
    } catch (error) {
        throw new Error(`Error en el controlador ${model}, error: ${error}`);
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
        let { affectedRows } = await empresa.update(model, id, newCliente);
        let link = links.created(model, id);
        let response = Object.assign({ message: "Registro actualizado en la base de datos", affectedRows }, { link: link });
        return { response, code: 201 };
    } catch (error) {
        throw new Error(`Error en el controlador ${model}, error: ${error}`);
    }
}

/**
 * Delete a company
 * @param params params request object
 */
export const remove = async (params: any): Promise<any> => {
    let { id } = params;
    try {
        await empresa.remove(model, id);
        return { response: { message: "Registro eliminado de la base de datos" }, code: 200 };
    } catch (error) {
        throw new Error(`Error en el controlador ${model}, error: ${error}`);
    }
}