import * as consult from '../../helpers/consult';
import { IDeposito } from './model';
import * as respuestas from '../../errors';
import * as links from '../../helpers/links';
const model = "adm_depositos";


/**
 * Get all the deposits
 * @param query modifier of the consult
 */
export const get = async (query: any, tenantId: string): Promise<any> => {
    try {
        let data: IDeposito[] = await consult.get(tenantId, model, query);
        let totalCount: number = await consult.count(tenantId, model);
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
export const getOne = async (id: string | number, query: any, tenantId: string): Promise<any> => {
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;

        let data: IDeposito = await consult.getOne(tenantId, model, id, query);
        let count = await consult.count(tenantId, model);

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
export const getConceptosBydeposito = async (id: string | number, query: any, tenantId: string): Promise<any> => {
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;
        
        let recurso: IDeposito = await consult.getOne(tenantId, model, id, { fields: 'id' });

        if (!recurso) return respuestas.ElementNotFound;
        
        if(query.fields){
            let aux = query.fields.split(',');
            let filtrados = aux.filter((e:any) => e !== 'presentaciones' && e!=='existencias');
            query.fields = filtrados.join(',');
        }
        let f = makeFields('adm_conceptos',query.fields);
        let where = makeWhere(query,'adm_conceptos',1);
        let sql = `SELECT ${f}, adm_movimiento_deposito.existencia FROM adm_movimiento_deposito INNER JOIN adm_conceptos 
        ON adm_conceptos_id = adm_conceptos.id WHERE adm_depositos_id = ${id} ${where} 
        order by adm_conceptos.${query.orderField || 'id'} limit ${query.limit || '50'} offset ${query.offset || '0'}`;
        let data: any[] = await consult.getPersonalized(tenantId, sql);
        console.log(sql);
        let totalCount = await consult.count(tenantId, 'adm_conceptos');
        let count = data.length;
        let {limit ,fields} = query; 
        
        for (let i = 0; i < data.length; i++) {
            let { id } = data[i];
            if(!fields || fields.includes('presentaciones')){
                let pres: any[] = await consult.getOtherByMe(tenantId, 'adm_conceptos', id as string, 'adm_presentaciones', {});
                data[i].presentaciones = pres;
            }
        }
        
        if (count <= 0) return respuestas.Empty;
        
        let link = links.pages(data, `${model}/${id}/conceptos`, count, totalCount, limit);
        let response = Object.assign({ totalCount, count, data }, link);
        
        return { response, code: respuestas.Ok.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error al consultar la base de datos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

function makeWhere(query: any, tabla: any,ind?:number) {
    let where = "";
    var index = ind || 0;
    for (const prop in query) {
        if (prop !== 'fields' && prop !== 'limit' && prop !== 'order' && prop !== 'orderField' && prop !== 'offset' && !prop.includes('ext')) {
            if (prop.includes('after') || prop.includes('before')) {
                if (prop.split('-').length > 1) {
                    where += (index == 0) ? " WHERE " : " AND ";
                    where += `${tabla}.${prop.split('-')[1]} ${prop.split('-')[0] === 'before' ? '<=' : '>='} '${query[prop]}'`;
                    index++;
                }
            } else if (Array.isArray(query[prop])) {
                where += (index == 0) ? " WHERE " : " AND ";
                where += `${tabla}.${prop} in(${query[prop].join(",")}) `;
                index++;
            } else {
                where += (index == 0) ? " WHERE " : " AND ";
                where += `${tabla}.${prop} like '%${query[prop]}%'`;
                index++;
            }
        }

    }
    return where;
}

function makeFields(tabla:string,fields:string){
    let f = fields.split(',');
    
    for (let index = 0; index < f.length; index++) {
        f[index] = `${tabla}.${f[index]}`;
    }
    
    fields = f.join(',');
    
    return fields;
}

/**
 * Create a new deposit
 * @param body data of the new deposit
 */
export const create = async (body: any, tenantId: string): Promise<any> => {
    let { data } = body;
    let newdeposito: IDeposito = data;
    try {
        let { insertId } = await consult.create(tenantId, model, newdeposito) as any;
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
export const update = async (params: any, body: any, tenantId: string): Promise<any> => {
    let { id } = params;
    let { data } = body;
    let newdeposito: IDeposito = data;
    try {
        console.log(newdeposito);
        if (isNaN(id as number)) return respuestas.InvalidID;

        let { affectedRows } = await consult.update(tenantId, model, id, newdeposito) as any;
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
export const remove = async (params: any, tenantId: string): Promise<any> => {
    let { id } = params;
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;

        await consult.remove(tenantId, model, id);
        
        return respuestas.Deleted;
    } catch (error) {
        console.log(`Error al consultar la base de datos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}