import * as consult from '../../helpers/consult';
import * as links from '../../helpers/links';
import * as respuestas from '../../errors';
import { IVendedor } from './model';

const model = "adm_vendedor";

/**
 * return all last 50 sellers
 * @param query object modifier of the consult
 */
export async function get(query:any, tenantId: string): Promise<any>{
    try {
        let data:IVendedor[] = await consult.get(tenantId, model,query);
        let totalCount: number = await consult.count(tenantId, model);
        let count = data.length;
        let { limit } = query;
        
        if(count <= 0)  return respuestas.Empty;
        
        let link = links.pages(data, model, count, totalCount, limit);
        let response = Object.assign({ totalCount, count, data }, link);
        
        return {response, code:respuestas.Ok.code};
    } catch (error) {
        if(error.message ==='DB_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}

/**
 * return one seller
 * @param id the id of the seller
 * @param query object modifier of the consult
 */
export async function getOne(id:string | number ,query:any, tenantId: string): Promise<any>{
    try {
        if(isNaN(id as number)) return respuestas.InvalidID;
        
        let data:IVendedor = await consult.getOne(tenantId, model,id,query);
        let count:number = await consult.count(tenantId, model);
        
        if(!data) return respuestas.ElementNotFound;
        
        let link = links.records(data,model,count);    
        let response = Object.assign({data},link);
        
        return {response,code:respuestas.Ok.code};
    } catch (error) {
        if(error.message ==='DB_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}

/**
 * Get the sells of one seller
 * @param params params request object
 * @param query request modifier
 */
export async function getSellsBySeller(params:any, query:any, tenantId: string): Promise<any>{
    try {
        let { id } = params;
        
        if(isNaN(id)) return respuestas.InvalidID;

        let data = await consult.getOne(tenantId, model,id,{});
        
        if(!data) return respuestas.ElementNotFound;

        let ventas_det: any[] = await consult.getOtherByMe(tenantId, model,id,'adm_det_facturas',query);
        let ventas = ventas_det.length;
        let total_ventas = ventas_det.reduce((accum,element) => accum + parseFloat(element.precio),0).toFixed(2);
        let total_ventas_dolar = ventas_det.reduce((accum,element) => accum + parseFloat(element.precio_dolar),0).toFixed(2);

        let response = { data, ventas,total_ventas, total_ventas_dolar };

        return { response, code:respuestas.Ok.code };
    } catch (error) {
        if(error.message ==='DB_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}

export async function getTopSellers(query:any, tenantId: string):Promise<any>{
    try {
        let where = makeWhere(query,'adm_det_facturas',1);

        let sql = `SELECT 
        (SELECT COUNT(*) FROM adm_enc_facturas WHERE adm_enc_facturas.adm_vendedor_id = adm_vendedor.id) AS ventas,
        SUM(precio_dolar*ROUND(cantidad)) AS venta_total_dolar,
        SUM(precio*ROUND(cantidad)) AS venta_total,
        adm_vendedor.*
        FROM adm_det_facturas
        LEFT JOIN adm_enc_facturas ON adm_enc_facturas.id = adm_det_facturas.adm_enc_facturas_id
        LEFT JOIN adm_vendedor ON adm_vendedor.id = adm_enc_facturas.adm_vendedor_id
        WHERE adm_enc_facturas.adm_tipos_facturas_id IN (5,1) ${where}
        GROUP BY  adm_enc_facturas.adm_vendedor_id ORDER BY venta_total_dolar ${query.order || 'DESC'} LIMIT ${query.limit || '10'}`;
        
        const data: any[] = await consult.getPersonalized(tenantId, sql);
        const count = data.length;
        
        if(count <= 0) return respuestas.Empty;

        let response = { data };

        return { response, code: respuestas.Ok.code};
    } catch (error) {
        if(error.message ==='DB_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}

function makeWhere(query: any, tabla: any,ind:number) {
    let where = "";
    var index = ind ||  0;
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
 * Create a new seller
 * @param body the data of the new seller
 */
export async function  create(body:any, tenantId: string): Promise<any>{
    let {data} = body;
    let newArea: IVendedor = data;
    try {
        let {insertId} = await consult.create(tenantId, model,newArea);
        let link = links.created('banco',insertId);
        newArea.id = insertId;
        let response = Object.assign({message:respuestas.Created.message, data:newArea},{link:link});
        
        return {response,code:respuestas.Created.code};
    } catch (error) {
        if(error.message ==='DB_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}

/**
 * Update a seller
 * @param params the object params request 
 * @param body the data of the seller
 */
export  async function update(params:any,body:any, tenantId: string): Promise<any>{
    const {id} = params;
    let {data} = body;
    let newArea:IVendedor = data;
    try {
        if(isNaN(id as number)) return respuestas.InvalidID;
        
        let {affectedRows}  = await consult.update(tenantId, model,id,newArea);
        let link = links.created('banco',id);
        let response = Object.assign({message:respuestas.Update.message,affectedRows},{link:link});
       
        return {response,code:respuestas.Update.code};
    } catch (error) {
        if(error.message ==='DB_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}

/**
 * Delete a seller
 * @param params object of the params request 
 */
export async function remove(params:any, tenantId: string): Promise<any> {
    let {id} = params;
    try {
        if(isNaN(id as number)) return respuestas.InvalidID;
        
        await consult.remove(tenantId, model,id);
        
        return respuestas.Deleted;   
    } catch (error) {
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}