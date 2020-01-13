import { IFacturas, IDetFacturas } from './model';
import * as consult from '../../helpers/consult';
import * as respuestas from '../../errors';
import * as links from '../../helpers/links';

const model = "enc_facturas";
const submodel = "det_facturas";

/**
 * Get all invoces 
 * @param query modifier of the consult
 */
export const get = async (query: any): Promise<any> => {
    try {
        let data: IFacturas[] = await consult.get(model, query);
        let totalCount: number = await consult.count(model);
        let count = data.length;
        let { limit } = query;
        if (count <= 0) return respuestas.Empty;
        for (let i = 0; i < data.length; i++) {
            let { id } = data[i];
            let pres: IDetFacturas[] = await consult.getOtherByMe(model, id as string, submodel);
            data[i].detalles = pres;
        }
        let link = links.pages(data, 'facturas', count, totalCount, limit);
        let response = Object.assign({ totalCount, count, data }, link);
        return { response, code: respuestas.Ok.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error al consultar la base de datos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

/**
 * Get one invoice
 * @param id id of the invoice
 * @param query modifier of the invoice
 */
export const getOne = async (id: string | number, query: any): Promise<any> => {
    try {
        if (isNaN(id as number)) return respuestas.InvalidID;

        let data: IFacturas = await consult.getOne(model, id, query);
        let count: number = await consult.count(model);

        if (!data) return respuestas.ElementNotFound;

        let pres: IDetFacturas[] = await consult.getOtherByMe(model, id as string, submodel);
        data.detalles = pres;
        let link = links.records(data, 'facturas', count);
        let response = Object.assign({ data }, link);
        return { response, code: respuestas.Ok.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error al consultar la base de datos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}

/**
 * Create a invoice
 * @param body data of the new invoice
 */
export const create = async (body: any): Promise<any> => {
    let { data,data1 } = body;
    let newCargo: IFacturas = data;
    let detalles: IDetFacturas[] = data1;
    try {
        let { insertId } = await consult.create(model, newCargo);
        await consult.create(submodel,detalles);
        let link = links.created('facturas', insertId);
        let response = Object.assign({ message: respuestas.Created.message }, { link: link });
        return { response, code: respuestas.Created.code };
    } catch (error) {
        if (error.message === 'BD_SYNTAX_ERROR') return respuestas.BadRequest;
        console.log(`Error al consultar la base de datos, error: ${error}`);
        return respuestas.InternalServerError;
    }
}