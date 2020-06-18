import * as consult from '../../helpers/consult';
import * as links from '../../helpers/links';
import * as respuestas from '../../errors';
import { IEmpresa } from './model';
import { ICargo } from '../cargos/model';
import { IConcepto } from '../conceptos/model';
import { getOptionals } from "../conceptos/helpers/fields"

const model = "adm_empresa";

/**
 * Get all companies
 * @param query modifier 
 */
export const get = async (query: any, tenantId: string): Promise<any> => {
    try {
        let data: IEmpresa[] = await consult.get(tenantId, model, query);
        let totalCount: number = await consult.count(tenantId, model); // consulto el total de registros de la BD
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
export const getOne = async (id: string | number, query: any, tenantId: string): Promise<any> => {
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;
        
        let data: IEmpresa = await consult.getOne(tenantId, model, id, query);
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
 * Get all concepts of a company
 * @param id id of the company 
 * @param query modifier of the consult
 */
export const getConceptsByEmpresa = async (id: string | number, query: any, tenantId: string): Promise<any> => {
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;
        let recurso: IEmpresa = await consult.getOne(tenantId, model, id, { fields: 'id' });

        if (!recurso) return respuestas.ElementNotFound;

        let { fields, limit } = query;

        if(query.fields){
            let aux = query.fields.split(',');
            let filtrados = aux.filter((e:any) => e !== 'direcciones' && e !== 'presentaciones' && e!=='existencias' && e !== 'grupo' && e !== 'subgrupo');
            query.fields = filtrados.join(',');
        }

        let data: IConcepto[] = await consult.getOtherByMe(tenantId, model, id, 'adm_conceptos', query);
        let totalCount = await consult.countOther(tenantId, model, 'adm_conceptos', id);
        let count = data.length;

        if (count <= 0) return respuestas.Empty;

        for (let concept of data) {
            concept = await getOptionals(tenantId, fields, concept);
        }

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
export const getDepositsByEmpresa = async (id: string | number, query: any, tenantId: string): Promise<any> => {
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;

        let recurso: IEmpresa = await consult.getOne(tenantId, model, id, { fields: 'id' });

        if (!recurso) return respuestas.ElementNotFound;

        let data: any = await consult.getOtherByMe(tenantId, model, id, 'adm_depositos', query);
        let totalCount = await consult.countOther(tenantId, model, 'adm_depositos', id);
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
export const getGroupsByEmpresa = async (id: string | number, query: any, tenantId: string): Promise<any> => {
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;

        let recurso: IEmpresa = await consult.getOne(tenantId, model, id, { fields: 'id' });

        if (!recurso) return respuestas.ElementNotFound;
        
        let limite = await consult.count(tenantId, 'adm_conceptos');
        let conceptos: any[] = await consult.getOtherByMe(tenantId, model, id, 'adm_conceptos', { fields: 'id,adm_grupos_id', orderField: 'adm_grupos_id', limit: limite || 50 });

        if (!conceptos) return respuestas.Empty;

        let grp = conceptos[0].adm_grupos_id;
        let data:any[]  = [];

        if(grp != null){
            let data1 = await consult.getOne(tenantId, 'adm_grupos', grp, {}); 
            data.push(data1);
        }

        for (let index = 0; index < conceptos.length; index++) {
            if (conceptos[index].adm_grupos_id !== grp && conceptos[index].adm_grupos_id !== null) {
                let group: any = await consult.getOne(tenantId, 'adm_grupos', conceptos[index].adm_grupos_id, {});
                data.push(group);
                grp = conceptos[index].adm_grupos_id;
            }
        }

        let totalCount = await consult.count(tenantId, 'adm_grupos');
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
export const getSubgroupsByEmpresa = async (id: string | number, query: any, tenantId: string): Promise<any> => {
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;

        let recurso: IEmpresa = await consult.getOne(tenantId, model, id, { fields: 'id' });

        if (!recurso) return respuestas.ElementNotFound;

        let conceptos: any[] = await consult.getOtherByMe(tenantId, model, id, 'adm_conceptos', { fields: 'id,adm_subgrupos_id', orderField: 'adm_subgrupos_id' });

        if (!conceptos) return respuestas.Empty;

        let grp = conceptos[0].adm_subgrupos_id;
        let data: any[] = [];
        
        if(grp!== null){
            let data1 =  await consult.getOne(tenantId, 'adm_subgrupos', grp, {});
            data.push(data1);
        }
        
        for (let index = 0; index < conceptos.length; index++) {
            if (conceptos[index].adm_subgrupos_id !== grp && conceptos[index].adm_subgrupos_id !== null) {
                let group: any = await consult.getOne(tenantId, 'adm_subgrupos', conceptos[index].adm_subgrupos_id, {});
                data.push(group);
                grp = conceptos[index].adm_subgrupos_id;
            }
        }
        
        let totalCount = await consult.count(tenantId, 'adm_subgrupos');
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

export const getPedidosByEmpresa = async (id: string | number, query: any, tenantId: string): Promise<any> =>{
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;

        let recurso: IEmpresa = await consult.getOne(tenantId, model, id, { fields: 'id' });
        
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
 * Get all concepts of a group ofa company
 * @param id id of the company 
 * @param query modifier of the consult
 */
export const getConceptsByGroupByEmpresa = async (eId: string | number, gId: string | number, query: any, tenantId: string): Promise<any> => {
    try {
      if (isNaN(eId as number) || isNaN(gId as number)) return respuestas.InvalidID;

        let { fields, limit } = query;

        let sql =  `SELECT * FROM adm_conceptos WHERE adm_empresa_id=${eId} AND adm_grupos_id=${gId} LIMIT ${limit ? limit : 50}`;
        
        let data = await consult.getPersonalized(tenantId, sql);
        let totalCount = await consult.count(tenantId, 'adm_conceptos');
        let count = data.length;
        
        if(query.fields){
            let aux = query.fields.split(',');
            let filtrados = aux.filter((e:any) => e !== 'direcciones' && e !== 'presentaciones' && e!=='existencias' && e !== 'grupo' && e !== 'subgrupo');
            query.fields = filtrados.join(',');

            for (let concept of data) {
                concept = await getOptionals(tenantId, fields, concept);
            }            
        }

        

        if (count <= 0) return respuestas.Empty;

        let link = links.pages(data, `empresa/${eId}/grupos/${gId}`, count, totalCount, limit);
        let response = Object.assign({ totalCount, count, data }, link);
        
        return { response, code: respuestas.Ok.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(error);
        console.log(`Error en el controlador ${model}, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

export async function getUserByCompany(id: string | number, query: any, tenantId: string): Promise<any>{
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;
        let recurso: IEmpresa = await consult.getOne(tenantId, model, id, { fields: 'id' });

        if (!recurso) return respuestas.ElementNotFound;

        let data: any = await consult.getOtherByMe(tenantId, model, id, 'usuario', query);
        let totalCount = await consult.countOther(tenantId, model, 'usuario', id);
        let count = data.length;
        let { limit } = query;

        if (count <= 0) return respuestas.Empty;

        let link = links.pages(data, `empresa/${id}/usuario`, count, totalCount, limit);
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
export const create = async (body: any, tenantId: string): Promise<any> => {
    let { data } = body;
    let newCliente: IEmpresa = data;
    try {
        let { insertId } = await consult.create(tenantId, model, newCliente);
        newCliente.id = insertId;
        let link = links.created(model, insertId);
        let response = Object.assign({data:newCliente, message: respuestas.Created.message}, { link: link });

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
export const update = async (params: any, body: any, tenantId: string): Promise<any> => {
    const { id } = params;
    let { data } = body;
    let newCliente: IEmpresa = data;

    try {
        if(isNaN(id as number)) return respuestas.InvalidID;

        let { affectedRows } = await consult.update(tenantId, model, id, newCliente);
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
export const remove = async (params: any, tenantId: string): Promise<any> => {
    let { id } = params;
    try {

        if(isNaN(id as number)) return respuestas.InvalidID;

        await consult.remove(tenantId, model, id);
        
        return respuestas.Deleted;
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;

        console.log(`Error en el controlador ${model}, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

/**
 * Get all cargos of a company
 * @param id id of the company 
 * @param query modifier of the consult
 */
export const getCargosByEmpresa = async (id: string | number, query: any, tenantId: string): Promise<any> => {
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;

        let recurso: IEmpresa = await consult.getOne(tenantId, model, id, { fields: 'id' });

        if (!recurso) return respuestas.ElementNotFound;

        let data: any = await consult.getOtherByMe(tenantId, model, id, 'adm_cargos', query);
        let totalCount = await consult.countOther(tenantId, model, 'adm_cargos', id);
        let count = data.length;
        let { limit } = query;

        for (let cargo of data) {
            let concepto =  await consult.getPersonalized(tenantId, `SELECT * FROM adm_conceptos WHERE adm_empresa_id=${id} AND id=${cargo.adm_conceptos_id}`);
            cargo.concepto = Object.assign({},concepto[0]);
            delete cargo.adm_conceptos_id;
        }

        if (count <= 0) return respuestas.Empty;

        let link = links.pages(data, `empresa/${id}/cargos`, count, totalCount, limit);
        let response = Object.assign({ totalCount, count, data }, link);
        
        return { response, code: respuestas.Ok.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;

        console.log(`Error en el controlador ${model}, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

/**
 * create cargo of a company
 * @param id id of the company 
 * @param query modifier of the consult
 */

export const createCargo = async (id: any, body: any, tenantId: string): Promise<any> => {
    body
    try {
        let recurso: IEmpresa = await consult.getOne(tenantId, model, id, { fields: 'id' });

        if (!recurso) return respuestas.ElementNotFound;
        
        let { data } = body;
        let { adm_depositos_id, adm_conceptos_id } = data;
        let newCargo: ICargo = data;
        let { insertId } = await consult.create(tenantId, 'adm_cargos', newCargo) as any;
        
        let movDep:any[] = await consult.getPersonalized(tenantId, `SELECT * FROM adm_movimiento_deposito WHERE adm_depositos_id=${adm_depositos_id} AND adm_conceptos_id=${adm_conceptos_id}`)
        movDep[0].existencia = +newCargo.cantidad + +movDep[0].existencia;
        let {affectedRows} = await consult.update(tenantId, "adm_movimiento_deposito",movDep[0].id,movDep[0]);

        let link = links.created(model, insertId);
        let response = Object.assign({ message: respuestas.Created.message}, { link: link });
        
        return { response, code: respuestas.Created.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error al consultar la base de datos, error: ${error}`);
        console.log(error);
        return respuestas.InternalServerError;
    }
}

/**
 * create cargo of a company
 * @param id id of the company 
 * @param query modifier of the consult
 */

export const adjustPrice = async (id:  string | number, body:  any, tenantId: string): Promise<any> => {
    try {

        let recurso: IEmpresa = await consult.getOne(tenantId, model, id, { fields: 'id' });

        if (!recurso) return respuestas.ElementNotFound;
        
        let { percent } = body.data;
        let conceptos: any[] = await consult.getPersonalized(tenantId, `SELECT * from adm_conceptos WHERE adm_empresa_id=${id}`)

        console.log(conceptos.length);

        for (let concepto  of conceptos) {
            concepto.precio_a = Math.round(((1 + +percent) * +concepto.precio_a) * 100) / 100;
            concepto.precio_dolar = Math.round(((1+ +percent) * +concepto.precio_dolar) * 100) / 100;
            consult.getPersonalized(tenantId, `UPDATE adm_conceptos SET precio_a=${concepto.precio_a}, precio_dolar=${concepto.precio_dolar} WHERE id=${concepto.id}`)
        }

        let response = Object.assign({ message: respuestas.Update.message});
        
        return { response, code: respuestas.Update.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error al consultar la base de datos, error: ${error}`);
        console.log(error);
        return respuestas.InternalServerError;
    }
}