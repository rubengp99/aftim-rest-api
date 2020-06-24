import * as consult from '../../helpers/consult';
import * as respuestas from '../../errors';
import { IGrupo } from './model';
import * as links from '../../helpers/links';
import { ISubgrupo } from 'components/subgrupos/model';
const model = "adm_grupos";
const submodel = "adm_subgrupos"

/**
 * Get all groups
 * @param query modifier of the consult
 */
export const get = async (query: any, tenantId: string): Promise<any> => {
    try {
        let { limit, fields } = query;

        if (query.fields) {
			let aux = query.fields.split(",");
			let filtrados = aux.filter((e: any) => e !== "subgrupos");
			query.fields = filtrados.join(",");
        }
        
        let data: IGrupo[] = await consult.get(tenantId, model, query);
        let totalCount: number = await consult.count(tenantId, model);
        let count = data.length;

        for (const group of data) {
            let { id } = group;
            if (fields && fields.includes("subgrupos")) {
                let sg: ISubgrupo[] = await consult.getOtherByMe(tenantId, model, id as string, submodel, {});
                group.subgrupos = sg;
                return data;
            }    
        }

        
        if (count <= 0) return respuestas.Empty;

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
 * Get one group
 * @param id id of the group
 * @param query modifier of the consult
 */
export const getOne = async (id: string | number, query: any, tenantId: string): Promise<any> => {
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;

        let data: IGrupo = await consult.getOne(tenantId, model, id, query);
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
 * Get all the subgroups of one group
 * @param id id of the group
 * @param query modifier of the consult
 */
export const getSubGruposByGrupo = async (id: string | number, query: any, tenantId: string): Promise<any> => {
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;

        let recurso: IGrupo = await consult.getOne(tenantId, model, id, { fields: 'id' });

        if (!recurso) return respuestas.ElementNotFound;
        
        let data: any = await consult.getOtherByMe(tenantId, model, id, 'adm_subgrupos', query);
        let totalCount = await consult.countOther(tenantId, model, 'adm_subgrupos', id);
        let count = data.length;
        let { limit } = query;

        if (count <= 0) return respuestas.Empty;

        let link = links.pages(data, `grupos/${id}/subgrupos`, count, totalCount, limit);
        let response = Object.assign({ totalCount, count, data }, link);
        
        return { response, code: respuestas.Ok.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}

/**
 * Get all concepts of one group
 * @param id id of the group
 * @param query modifier of the consult
 */
export const getConceptosByGrupo = async (id: string | number, query: any, tenantId: string): Promise<any> => {
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;

        let recurso: IGrupo = await consult.getOne(tenantId, model, id, { fields: 'id' });

        if (!recurso) return respuestas.Empty;
        let { fields, limit } = query;
        
        if(query.fields){
            let aux = query.fields.split(',');
            let filtrados = aux.filter((e:any) => e !== 'presentaciones' && e!=='existencias');
            query.fields = filtrados.join(',');
        }
        
        let data: any = await consult.getOtherByMe(tenantId, model, id, 'adm_conceptos', query);
        let totalCount = await consult.countOther(tenantId, model, 'adm_conceptos', id);
        let count = data.length;
        
        if (count < 0) return respuestas.Empty;

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

export async function getSellByGroups(id: string | number, query: any, tenantId: string): Promise<any> {
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;

        let data: IGrupo = await consult.getOne(tenantId, model, id, { fields: 'id,nombre' });

        if (!data) return respuestas.ElementNotFound;
        
        let conceptos: any[] = await consult.getOtherByMe(tenantId, model, id, 'adm_conceptos', { fields: 'id' });
        let aux_det: any[] = [];
        
        for (let index = 0; index < conceptos.length; index++) {
            const element = conceptos[index];
            query.limit = await consult.count(tenantId, 'adm_det_facturas');
            let detalles: any[] = await consult.getOtherByMe(tenantId, 'adm_conceptos', element.id, 'adm_det_facturas', query);
            for (let index = 0; index < detalles.length; index++) {
                const element1 = detalles[index];
                let encabezado = await consult.getOne(tenantId, 'adm_enc_facturas', element1.adm_enc_facturas_id, { fields: 'id,adm_tipos_facturas_id' });
                if (encabezado.adm_tipos_facturas_id == 1 || encabezado.adm_tipos_facturas_id == 5) {
                    aux_det.push(element1);
                }
            }
        }

        let ventas = 0;
        aux_det.forEach((item) => {
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
        let limitConcepts = await consult.count(tenantId, 'adm_det_facturas');
        let where = makeWhere(query, 'adm_det_facturas');
        
        let sql = `SELECT adm_conceptos.id,adm_conceptos.nombre, adm_conceptos.adm_grupos_id , SUM(cantidad) AS vendidos FROM adm_det_facturas
        LEFT JOIN adm_conceptos ON adm_conceptos_id = adm_conceptos.id
        LEFT JOIN adm_enc_facturas ON adm_enc_facturas_id = adm_enc_facturas.id ${where}
        ${where == '' ? "WHERE" : "AND"} adm_enc_facturas.adm_tipos_facturas_id = '1' OR 
        adm_enc_facturas.adm_tipos_facturas_id = '5'
        GROUP BY adm_conceptos_id ORDER BY vendidos desc  LIMIT ${limitConcepts}`;
        let conceptos: any[] = await consult.getPersonalized(tenantId, sql);
        conceptos.sort((a, b) => parseInt(a.adm_grupos_id) - parseInt(b.adm_grupos_id));
        let limitGroups = await consult.count(tenantId, model);
        let grupos: any[] = await consult.get(tenantId, model, { limit: limitGroups });
        
        for (let i = 0; i < grupos.length; i++) {
            let conceptsBygroup = conceptos.filter(element => element.adm_grupos_id == grupos[i].id);
            let venta = conceptsBygroup.reduce((accum, element) => accum + parseFloat(element.vendidos), 0);
            grupos[i].venta = venta.toFixed(2);
        
        }
        grupos.sort((a, b) => parseFloat(b.venta) - parseFloat(a.venta));
        let data = grupos.splice(0, parseInt(query.limit || '10'));
        
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
 * Create a new group
 * @param body the data of the new group
 */
export const create = async (body: any, file: any, tenantId: string): Promise<any> => {
    let { data } = body;
    let newGrupo: IGrupo = typeof data == 'string' ? JSON.parse(data) : data;
    
    if (file) {
        let { filename = 'default.png' } = file;
        newGrupo.imagen = filename;
    }
    
    try {
        let { insertId } = await consult.create(tenantId, model, newGrupo) as any;
        let link = links.created(model, insertId);
        newGrupo.id = insertId;
        let response = { message: respuestas.Created.message, data: newGrupo, link: link };
        
        return { response, code: respuestas.Created.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}

/**
 * Update the data of one group
 * @param params params request object
 * @param body data of the group
 */
export const update = async (params: any, body: any, tenantId: string): Promise<any> => {
    let { id } = params;
    let { data } = body;
    let newGrupo: IGrupo = data;
    try {
        if (isNaN(id)) return respuestas.InvalidID;
        let { affectedRows } = await consult.update(tenantId, model, id, newGrupo) as any;
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
 * Delete a group
 * @param params params request object
 */
export const remove = async (params: any, tenantId: string): Promise<any> => {
    let { id } = params;
    try {
        if (isNaN(id)) return respuestas.InvalidID;
        await consult.remove(tenantId, model, id);
        return respuestas.Deleted;
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}