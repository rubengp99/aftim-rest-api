import * as consult from '../../helpers/consult';
import * as links from '../../helpers/links'
import * as respuestas from '../../errors';
import { IDescargo, IDetDescargo } from './model';

const model = "adm_enc_descargos";
const submodel = "adm_det_descargos";

/**
 * Get all descargos
 * @param query modifier of the consult 
 */
export const get = async (query: any, tenantId: string): Promise<any> => {
    try {
        let data: IDescargo[] = await consult.get(tenantId, model, query);
        let totalCount: number = await consult.count(tenantId, model);
        let count = data.length;
        let { limit } = query;

        if (count <= 0) return respuestas.Empty;

        for (let i = 0; i < data.length; i++) {
            let { id } = data[i];
            let pres: IDetDescargo[] = await consult.getOtherByMe(tenantId, model, id as string, submodel);
            data[i].detalles = pres;
        }

        let link = links.pages(data, 'descargos', count, totalCount, limit);
        let response = Object.assign({ totalCount, count, data }, link);
        
        return { response, code: respuestas.Ok.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error al consultar la base de datos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}


/**
 * Get one descargo
 * @param id id of the descargo
 * @param query modifier of the descargo
 */
export const getOne = async (id: string | number, query: any, tenantId: string): Promise<any> => {
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;

        let data: IDescargo = await consult.getOne(tenantId, model, id, query);
        let count: number = await consult.count(tenantId, model);

        if (!data) return respuestas.ElementNotFound;

        let pres: IDetDescargo[] = await consult.getOtherByMe(tenantId, model, id as string, submodel);
        data.detalles = pres;
        let link = links.records(data, 'descargos', count);
        let response = Object.assign({ data }, link);
        
        return { response, code: respuestas.Ok.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error al consultar la base de datos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}


/**
 * Create a descargo
 * @param body data of the new descargo
 */
export const create = async (body: any, tenantId: string): Promise<any> => {
    let { data,data1 } = body;
    let newCargo: IDescargo = data;
    let detalles: IDetDescargo[] = data1;
    try {
        let { insertId } = await consult.create(tenantId, model, newCargo);
        await consult.create(tenantId, submodel,detalles);
        
        for (let index = 0; index < detalles.length; index++) {
            let detalle = detalles[index];
            let movDep: any[] = await consult.get(tenantId, "movmiento_depositos", { depositos_id: detalle.adm_depositos_id, conceptos_id: detalle.adm_conceptos_id });
            await consult.update(tenantId, "movimiento_depositos", movDep[0].id, movDep[0]);
        }
        
        let link = links.created('descargos', insertId);
        let response = Object.assign({ message: respuestas.Created.message }, { link: link });
        
        return { response, code: respuestas.Created.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error al consultar la base de datos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}