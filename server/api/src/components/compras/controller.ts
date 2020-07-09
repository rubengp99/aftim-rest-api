import * as consult from '../../helpers/consult';
import * as links from '../../helpers/links';
import * as respuestas from '../../errors';
import { ICompras, IDetCompras } from './model';
import { dataURL } from 'keys';

const model = 'adm_enc_compra';
const submodel = 'adm_det_compra';

/**
 * Obtener todas las compras 
 * @param query modifier of the consult
 */
export const get = async (query: any, tenantId: string): Promise<any> => {
    try {
        let data: ICompras[] = await consult.get(tenantId, model, query);
        let totalCount: number = await consult.count(tenantId, model);
        let count = data.length;
        let { limit } = query;

        if (count <= 0) return respuestas.Empty;

        for (let i = 0; i < data.length; i++) {
            let { id } = data[i];
            let pres: IDetCompras[] = await consult.getOtherByMe(tenantId, model, id as string, submodel,{});
            data[i].detalles = pres;
        }

        let link = links.pages(data, 'compras', count, totalCount, limit);
        let response = Object.assign({ totalCount, count, data }, link);
        
        return { response, code: respuestas.Ok.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}

/**
 * Obtener una compra
 * @param id id de la compra
 * @param query modifier of the consult
 */
export const getOne = async (id: string | number, query: any, tenantId: string): Promise<any> => {
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;

        let data: ICompras = await consult.getOne(tenantId, model, id, query);
        let count: number = await consult.count(tenantId, model);

        if (!data) return respuestas.ElementNotFound;

        let pres: IDetCompras[] = await consult.getOtherByMe(tenantId, model, id as string, submodel,{});
        data.detalles = pres;
        let link = links.records(data, 'compras', count);
        let response = Object.assign({ data }, link);
        
        return { response, code: respuestas.Ok.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}

/**
 * Obtener todas las compras 
 * @param query modifier of the consult
 */
export const getCosts = async (query: any, tenantId: string): Promise<any> => {
    try {

        let where = makeWhere(query, "adm_enc_compra", 0);

        let sql = `SELECT
        SUM(subtotal) AS costo_total,
        SUM(subtotal_dolar) AS costo_total_dolar
        ${where}`;
        
        let data: any[] = await consult.getPersonalized(tenantId, sql);
		let totalCount: number = await consult.count(tenantId, model); // consulto el total de registros de la BD
		let count = data.length;

		if (count <= 0) return respuestas.Empty;

		let response = { totalCount, count, data };
		return { response, code: respuestas.Ok.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}

function makeWhere(query: any, tabla: any, ind: number) {
	let where = "";
	var index = ind || 0;
	for (const prop in query) {
		if (prop !== "fields" && prop !== "limit" && prop !== "order" && prop !== "orderField" && prop !== "offset" && !prop.includes("ext")) {
			if (prop.includes("after") || prop.includes("before")) {
				if (prop.split("-").length > 1) {
					where += index == 0 ? " WHERE " : " AND ";
					where += `${tabla}.${prop.split("-")[1]} ${prop.split("-")[0] === "before" ? "<=" : ">="} '${query[prop]}'`;
					index++;
				}
			} else if (Array.isArray(query[prop])) {
				where += index == 0 ? " WHERE " : " AND ";
				where += `${tabla}.${prop} in(${query[prop].join(",")}) `;
				index++;
			} else {
				where += index == 0 ? " WHERE " : " AND ";
				where += `${tabla}.${prop} like '%${query[prop]}%'`;
				index++;
			}
		}
	}
	return where;
}
