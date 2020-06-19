import * as consult from '../../helpers/consult';
import * as respuestas from '../../errors';
import { IMovimientoBanco } from './model';
import * as links from '../../helpers/links';
const model = "adm_movimientos_bancos";

/**
 * Get all banks moves
 * @param query modifier of the consult
 */
export async function get(query: any, tenantId: string): Promise<any> {
    try {
        let data: IMovimientoBanco[] = await consult.get(tenantId, model, query);
        let totalCount: number = await consult.count(tenantId, model);
        let count = data.length;
        let { limit } = query;

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
 * Get a bank move
 * @param id id of the bank move
 * @param query modifier of the consult
 */
export async function getOne(id: string | number, query: any, tenantId: string): Promise<any> {
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;

        let data: IMovimientoBanco = await consult.getOne(tenantId, model, id, query);
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
 * Creat a new bank move
 * @param body data of the new bank move 
 */
export async function create(body: any, tenantId: string): Promise<any> {
    let { data } = body;
    let newGrupo: IMovimientoBanco = data;
    try {
        let { insertId } = await consult.create(tenantId, model, newGrupo) as any;
        newGrupo.id = insertId; 
        let link = links.created(model, insertId);
        let response = Object.assign({ message: respuestas.Created.message, data:newGrupo }, { link: link });
        
        return { response, code: respuestas.Created.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`[ERROR] on controller: ${model}. \n ${error} `);
        return respuestas.InternalServerError;
    }
}