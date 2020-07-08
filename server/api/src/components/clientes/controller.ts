import * as consult from '../../helpers/consult';
import * as links from '../../helpers/links'
import * as respuestas from '../../errors'
import { ICliente } from './model';

const model = "adm_clientes";

/**
 * Get all clients
 * @param query modifier of the consult
 */
export const get = async (query: any, tenantId: string): Promise<any> => {
    try {
        let data: ICliente[] = await consult.get(tenantId, model, query);
        let totalCount: number = await consult.count(tenantId, model); // consulto el total de registros de la BD
        let count = data.length;
        let { limit } = query;

        if (count <= 0) return respuestas.Empty;

        let link = links.pages(data, model, count, totalCount, limit);
        let response = Object.assign({ totalCount, count, data }, link);
        
        return { response, code: respuestas.Ok.code };
    } catch (error) {
        if (error.message == 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}

/**
 * Get one client
 * @param id id of the client
 * @param query modifier of the consult
 */
export const getOne = async (id: string | number, query: any, tenantId: string): Promise<any> => {
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;

        let data: ICliente[] = await consult.getOne(tenantId, model, id, query);
        let count: number = await consult.count(tenantId, model);

        if (!data) return respuestas.ElementNotFound;

        let link = links.records(data, model, count);
        let response = Object.assign({ data }, link);
        
        return { response, code: respuestas.Ok.code };
    } catch (error) {
        if (error.message == 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}

export async function getBuys(params: any, query: any, tenantId: string): Promise<any> {
    try {
        let { id } = params;
        if(isNaN(id)) return respuestas.InvalidID;

        const cliente = await consult.getOne(tenantId, model,id,{});

        if(!cliente) return respuestas.ElementNotFound;

        query.adm_tipos_facturas_id = ['5','1'];
        const limit = await consult.countOther(tenantId, model,'adm_enc_facturas',id);
        query.limit = limit;
        const facturas:any[] = await consult.getOtherByMe(tenantId, model,id,'adm_enc_facturas',query);

        const compras = facturas.length;
        const totalCompras = facturas.reduce((acum,element)=> acum + parseFloat(element.subtotal),0).toFixed(2);
        const totalComprasDolar = facturas.reduce((acum,element)=> acum + parseFloat(element.subtotal_dolar),0).toFixed(2);

        let response = { data:{cliente, compras,totalCompras,totalComprasDolar} };
        return { response, code:respuestas.Ok.code };
    } catch (error) {
        if (error.message == 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}

export async function getPedidosByCliente (id: string | number, query: any, tenantId: string): Promise<any> {
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;

        let recurso: ICliente = await consult.getOne(tenantId, model, id, { fields: 'id' });
        
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

        let link = links.pages(data, `usuario/${id}/pedidos`, count, totalCount, limit);
        let response = Object.assign({ totalCount, count, data }, link);
        
        return { response, code: respuestas.Ok.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}

export async function getPagosByCliente (id: string | number, query: any, tenantId: string): Promise<any> {
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;

        let recurso: ICliente = await consult.getOne(tenantId, model, id, { fields: 'id' });
        
        if (!recurso) return respuestas.ElementNotFound;

        let data: any = await consult.getOtherByMe(tenantId, model, id, 'adm_pagos', query);
        let totalCount = await consult.countOther(tenantId, model, 'adm_pagos', id);
        let count = data.length;
        let { limit } = query;

        if (count <= 0) return respuestas.Empty;


        let link = links.pages(data, `usuario/${id}/pagos`, count, totalCount, limit);
        let response = Object.assign({ totalCount, count, data }, link);
        
        return { response, code: respuestas.Ok.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}

export async function getDevolutions(params: any, query: any, tenantId: string): Promise<any> {
    try {
        let { id } = params;
        if(isNaN(id)) return respuestas.InvalidID;

        const cliente = await consult.getOne(tenantId, model,id,{});

        if(!cliente) return respuestas.ElementNotFound;

        query.adm_tipos_facturas_id = ['2','3'];
        const limit = await consult.countOther(tenantId, model,'adm_enc_facturas',id);
        query.limit = limit;
        const facturas:any[] = await consult.getOtherByMe(tenantId, model,id,'adm_enc_facturas',query);

        const devoluciones = facturas.length;
        const totalDevoluciones = facturas.reduce((acum,element)=> acum + parseFloat(element.subtotal),0).toFixed(2);
        const totalDevolucionesDolar = facturas.reduce((acum,element)=> acum + parseFloat(element.subtotal_dolar),0).toFixed(2);

        let response = { data:{cliente, devoluciones,totalDevoluciones,totalDevolucionesDolar} };
        
        return { response, code:respuestas.Ok.code };
    } catch (error) {
        if (error.message == 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}

export async function getMostBuyers(query: any, tenantId: string): Promise<any>{
    try {
        let where = makeWhere(query,'adm_enc_facturas',1);
        
        let sql = `SELECT (SELECT COUNT(*) FROM adm_enc_facturas WHERE adm_enc_facturas.adm_clientes_id = adm_clientes.id) AS compras,
        SUM(precio_dolar*ROUND(cantidad)) AS totalDolar,
        SUM(precio*ROUND(cantidad)) AS total,
        adm_clientes.*
        FROM adm_det_facturas
        LEFT JOIN adm_enc_facturas ON adm_enc_facturas.id = adm_det_facturas.adm_enc_facturas_id
        LEFT JOIN adm_clientes ON adm_clientes.id = adm_enc_facturas.adm_clientes_id
        WHERE adm_enc_facturas.adm_tipos_facturas_id IN (5,1) ${where}
        GROUP BY  adm_enc_facturas.adm_clientes_id ORDER BY totalDolar ${query.order || 'DESC'} LIMIT ${query.limit || '10'}`;
        
        const data:any[] = await consult.getPersonalized(tenantId, sql);
        const count = data.length;
        
        if(count <= 0) return respuestas.Empty;

        let response = { count, data };

        return { response, code: respuestas.Ok.code};
    } catch (error) {
        if (error.message == 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}

function makeWhere(query:any,tabla:any,ind:number){
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

/**
 * Create a new client
 * @param body data of the new client
 */
export const create = async (body: any, tenantId: string): Promise<any> => {
    let { data } = body;
    let newCliente: ICliente = data;
    try {
        let { insertId } = await consult.create(tenantId, model, newCliente);
        let link = links.created(model, insertId);
        let response = Object.assign({ message: respuestas.Created.message, insertId }, { link: link });
        
        return { response, code: respuestas.Created.code};
    } catch (error) {
        if (error.message == 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}
/**
 * Update a client data
 * @param params params request object
 * @param body data of the cliente
 */
export const update = async (params: any, body: any, tenantId: string): Promise<any> => {
    const { id } = params;
    let { data } = body;
    let newCliente: ICliente = data;

    try {
        if (isNaN(id as number)) return respuestas.InvalidID;

        let { affectedRows } = await consult.update(tenantId, model, id, newCliente);
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
 * Delete a client
 * @param params params request object
 */
export const remove = async (params: any, tenantId: string): Promise<any> => {
    let { id } = params;
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;

        await consult.remove(tenantId, model, id);
        
        return respuestas.Deleted;
    } catch (error) {
        if (error.message == 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}
