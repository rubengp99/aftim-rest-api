import * as consult from '../../helpers/consult';
import * as respuestas from '../../errors';
import {IMovimientosCaja} from './model';
import * as links from '../../helpers/links';
const model = "adm_movimientos_caja";



/**
 * Get all box moves
 * @param query modifier of the consult
 */
export async function get(query: any, tenantId: string): Promise<any> {
    try {
        let data: IMovimientosCaja[] = await consult.get(tenantId, model, query);
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
 * Get a bank move
 * @param id id of the bank move
 * @param query modifier of the consult
 */
export async function getOne(id: string | number, query: any, tenantId: string): Promise<any> {
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;

        let data: IMovimientosCaja = await consult.getOne(tenantId, model, id, query);
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

export const create = async (body:any,file:any, tenantId: string): Promise<any> => {
    let { data } = body;
    let newMovCaja: IMovimientosCaja = typeof data == 'string' ? JSON.parse(data) : data;
    if(file){
        let { filename = 'default.png' } = file;
        newMovCaja.imagen = filename;
    }
    try {
        let { insertId } = await consult.create(tenantId, model, newMovCaja) as any;
        let link = links.created(model, insertId);
        newMovCaja.id = insertId;
        let response = Object.assign({ message: respuestas.Created.message, data:newMovCaja }, { link: link });
        return { response, code: respuestas.Created.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error al consultar la base de datos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}
