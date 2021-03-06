import * as consult from '../../helpers/consult';
import * as respuestas from '../../errors';
import { ISubgrupo } from './model';
import * as links from '../../helpers/links';
const model = "adm_subgrupos";


/**
 * Get all subgroups
 * @param query identifier of the consult
 */
export const get = async (query: any, tenantId: string): Promise<any> => {
    try {
        let { limit, fields } = query;

        if(query.fields){
            let aux = query.fields.split(',');
            let filtrados = aux.filter((e:any) => e !== 'grupo');
            query.fields = filtrados.join(',');
        }


        let data: ISubgrupo[] = await consult.get(tenantId, model, query);
        let totalCount: number = await consult.count(tenantId, model);
        let count = data.length;

        if (count <= 0) return respuestas.Empty;

        if (fields){
            for (let i = 0; i < data.length; i++) {
                let { adm_grupos_id } = data[i];
                if(!fields || fields.includes('grupo')){
                    data[i].grupo = await consult.getOne(tenantId, 'adm_grupos', adm_grupos_id, {fields: '*'});
                }
            }
        }

        let link = links.pages(data, model, count, totalCount, limit);
        let response = Object.assign({ totalCount, count, data }, link);
        return { response, code: respuestas.Ok.code };

    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}

/**
 * Get a subgroup 
 * @param id id of a group
 * @param query modifier of the consult
 */
export const getOne = async (id: string | number, query: any, tenantId: string): Promise<any> => {
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;

        let data: ISubgrupo = await consult.getOne(tenantId, model, id, query);
        let count = await consult.count(tenantId, model);

        if (!data) return respuestas.ElementNotFound;

        let link = links.records(data, model, count);
        let response = Object.assign({ data }, link);
        return { response, code: respuestas.Ok.code };

    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}

/**
 * Get all the concepts of one subgroup
 * @param id id of the subgroup
 * @param query modifier of the consult
 */
export const getConceptosBySubgrupo = async (id: string | number, query: any, tenantId: string): Promise<any> => {
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;

        let recurso: ISubgrupo = await consult.getOne(tenantId, model, id, { fields: 'id' });
        if (!recurso) return respuestas.ElementNotFound;
        let { fields, limit } = query;

        if(query.fields){
            let aux = query.fields.split(',');
            let filtrados = aux.filter((e:any) => e !== 'presentaciones' && e!=='existencias');
            query.fields = filtrados.join(',');
        }

        let data: any = await consult.getOtherByMe(tenantId, model, id, 'adm_conceptos', query);
        let totalCount = await consult.countOther(tenantId, model, 'adm_conceptos', id);
        let count = data.length;

        if (count <= 0) return respuestas.Empty;

        for (let i = 0; i < data.length; i++) {
            let { id } = data[i];
            if(!fields || fields.includes('presentaciones')){
                let pres: any[] = await consult.getOtherByMe(tenantId, 'adm_conceptos', id as string, 'adm_presentaciones', {});
                data[i].presentaciones = pres;
            }
            if(!fields || fields.includes('existencias')){
                let movDep: any[] = await consult.getOtherByMe(tenantId, 'adm_conceptos',id as string,'adm_movimiento_deposito',{fields:'adm_depositos_id,existencia'});
                data[i].existencias = movDep;
            }
        }

        let link = links.pages(data, `grupos/${id}/conceptos`, count, totalCount, limit);
        let response = Object.assign({ totalCount, count, data }, link);
        return { response, code: respuestas.Ok.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}

export async function getSellBySubgroups(id:string | number,query:any, tenantId: string): Promise<any>{
    try {
        if(isNaN(id as number)) return respuestas.InvalidID;

        let data: ISubgrupo = await consult.getOne(tenantId, model, id, { fields: 'id,nombre' });
       
        if (!data) return respuestas.ElementNotFound;
        let conceptos: any[] = await consult.getOtherByMe(tenantId, model, id, 'adm_conceptos', {fields:'id'});
        let aux_det:any[] = [];
        for (let index = 0; index < conceptos.length; index++) {
            const element = conceptos[index];
            query.limit = await consult.count(tenantId, 'adm_det_facturas');
            let detalles:any[] = await consult.getOtherByMe(tenantId, 'adm_conceptos',element.id,'adm_det_facturas',query);
            for (let index = 0; index < detalles.length; index++) {
                const element1 = detalles[index];
                let encabezado = await consult.getOne(tenantId, 'adm_enc_facturas', element1.adm_enc_facturas_id,{fields:'id,adm_tipos_facturas_id'});
                if(encabezado.adm_tipos_facturas_id == 1 || encabezado.adm_tipos_facturas_id == 5){
                    aux_det.push(element1);
                }
            }
        }
        let ventas = 0;
        aux_det.forEach((item)=>{
            ventas += parseFloat(item.cantidad);
        });
        ventas = parseFloat(ventas.toFixed(2));
        let response = { ventas, data }
        return { response, code: respuestas.Ok.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}

export async function mostSold(query: any, tenantId: string): Promise<any> {

    try {
        let limitConcepts = await consult.count(tenantId, 'adm_conceptos');
        let where = makeWhere(query, 'adm_det_facturas');
        let sql = `SELECT adm_conceptos.id,adm_conceptos.nombre, adm_conceptos.adm_subgrupos_id , SUM(cantidad) AS vendidos FROM adm_det_facturas
        LEFT JOIN adm_conceptos ON adm_conceptos_id = adm_conceptos.id
        LEFT JOIN adm_enc_facturas ON adm_enc_facturas_id = adm_enc_facturas.id ${where}
        ${where == '' ? "WHERE" : "AND"} adm_enc_facturas.adm_tipos_facturas_id = '1' OR 
        adm_enc_facturas.adm_tipos_facturas_id = '5'
        GROUP BY adm_conceptos_id ORDER BY vendidos desc  LIMIT ${limitConcepts}`;
        let conceptos: any[] = await consult.getPersonalized(tenantId, sql);
        conceptos.sort((a, b) => parseInt(a.adm_subgrupos_id) - parseInt(b.adm_subgrupos_id));
        let limitGroups = await consult.count(tenantId, model);
        let subgroupos: any[] = await consult.get(tenantId, model, { limit: limitGroups });
        for (let i = 0; i < subgroupos.length; i++) {
            let conceptsBygroup = conceptos.filter(element => element.adm_subgrupos_id == subgroupos[i].id);
            let venta = conceptsBygroup.reduce((accum, element) => accum + parseFloat(element.vendidos), 0);
            subgroupos[i].venta = venta.toFixed(2);
        }
        subgroupos.sort((a, b) => parseFloat(b.venta) - parseFloat(a.venta));
        let data = subgroupos.splice(0, parseInt(query.limit || '10'));
        return { data, code: 200 };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}

function makeWhere(query: any, tabla: any) {
    let where = "";
    var index = 0;
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

/**
 * Create a new subgroup
 * @param body 
 */
export const create = async (body:any,file:any, tenantId: string): Promise<any> => {
    let { data } = body;
    let newGrupo: ISubgrupo = typeof data == 'string' ? JSON.parse(data) : data;
    if(file){
        let { filename = 'default.png' } = file;
        newGrupo.imagen = filename;
    }
    try {
        let { insertId } = await consult.create(tenantId, model, newGrupo) as any;
        let link = links.created(model, insertId);
        newGrupo.id = insertId;
        let response = Object.assign({ message: respuestas.Created.message, data:newGrupo }, { link: link });
        return { response, code: respuestas.Created.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}

/**
 * Update a subgroup
 * @param params params request 
 * @param body data of the subgroup
 */
export const update = async (params:any, body:any, tenantId: string): Promise<any> => {
    let { id } = params;
    let { data } = body;
    
    let newGrupo: ISubgrupo = data;
    try {
        if(isNaN(id)) return respuestas.InvalidID;
        let { affectedRows } = await consult.update(tenantId, model, id, newGrupo);
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
 * Delete a subgroup
 * @param params params requeste object
 */
export const remove = async (params:any, tenantId: string): Promise<any> => {
    let { id } = params;
    try {
        
        if(isNaN(id)) return respuestas.InvalidID;
        await consult.remove(tenantId, model, id);
        return respuestas.Deleted;
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}